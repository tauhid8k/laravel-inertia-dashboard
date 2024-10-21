<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Activitylog\Models\Activity;

class ActivityLogsController extends Controller
{
    // Get all activity logs
    public function index()
    {
        $logs = Activity::with(['causer:id,first_name,last_name'])->latest()->paginate();
        return inertia('Dashboard/Company/Logs', ['logs' => $logs]);
    }

    // Store activity logs
    public function store(Request $request)
    {
        $url = $request->input('url');
        $activeTime = $request->input('activeTime');
        $userId = Auth::id();

        // Current Time (Asia/Dhaka timezone)
        $currentTime = Carbon::now('Asia/Dhaka');

        // Get the last log with the same URL
        $lastActivity = Activity::where('causer_id', $userId)
            ->where('causer_type', Auth::user()::class)
            ->latest()
            ->first();

        if ($lastActivity) {
            $lastActiveTime = Carbon::parse($lastActivity->properties['lastActiveAt'], 'Asia/Dhaka');
            $lastActivityUrl = $lastActivity->properties['url'];

            // Calculate the time difference in minutes
            $timeSinceLastActive = (int)$lastActiveTime->diffInMinutes($currentTime);

            // Check if the lastActiveTime is more than 2 minutes ago and url has changed
            if ($timeSinceLastActive >= 2 || $lastActivityUrl != $url) {
                activity()->causedBy(Auth::user())
                    ->withProperties([
                        'sessionId' => uniqid(),
                        'url' => $url,
                        'lastActiveAt' => $currentTime,
                        'activeTime' => $activeTime,
                    ])
                    ->event('Page visit')
                    ->log("User visited {$url} (new session after inactivity)");
            } else {
                // Update the last activity log with accumulated active time
                $existingActiveTime = $lastActivity->properties['activeTime'];
                $updatedActiveTime = $existingActiveTime + $activeTime;

                // Update the existing log
                $lastActivity->update([
                    'properties->lastActiveAt' => $currentTime,
                    'properties->activeTime' => $updatedActiveTime,
                ]);
            }
        } else {
            // Store new log in the same timezone (Asia/Dhaka)
            activity()->causedBy(Auth::user())
                ->withProperties([
                    'sessionId' => uniqid(),
                    'url' => $url,
                    'lastActiveAt' => $currentTime,
                    'activeTime' => $activeTime,
                ])
                ->event('Page visit')
                ->log("User visited {$url} for the first time");
        }
    }
}
