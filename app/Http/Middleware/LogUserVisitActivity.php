<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class LogUserVisitActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check() && $request->isMethod('get')) {

            // Get the current session's last activity
            $active_session = DB::table('sessions')
                ->select('last_activity')
                ->where('id', $request->session()->getId())
                ->first();

            // Convert time for readability
            $last_active_at = Carbon::createFromTimestamp($active_session->last_activity)->diffForHumans();

            // Activity Log
            activity()->causedBy(Auth::user())
                ->withProperties([
                    'url' => $request->fullUrl(),
                    "last_active_at" => $last_active_at
                ])
                ->event('Page visit')
                ->log("User visited {$request->fullUrl()}");
        }

        return $next($request);
    }
}
