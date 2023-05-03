<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Hlp;
class RedirectIfAuth
{
    public function handle(Request $request, Closure $next)
    {
        $res = Hlp::apiGet('/check');
        if ($res) {
            return $next($request);
        }
        return redirect()->route('auth-index');
    }
}
