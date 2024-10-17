<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;

class ActivityLogsController extends Controller
{
    // Get all activity logs
    public function index()
    {
        $logs = Activity::with(['causer:id,first_name,last_name'])->latest()->paginate();
        return inertia('Dashboard/Company/Logs', ['logs' => $logs]);
    }
}
