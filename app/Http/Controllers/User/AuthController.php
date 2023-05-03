<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Hlp;
use Illuminate\Support\Facades\Validator;
use Cookie;
use Session;
class AuthController extends Controller
{

    public function login_js(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|max:100',
            'password' => 'required|max:100',
        ]);
        if ($validator->fails()) {
            return redirect()->route('auth-index')
            ->cookie('err', $validator->messages()->first(), 0.3);
        }
        $email = $request->input('email');
        $password = $request->input('password');
        $remember = $request->input('ckremember');
        if ($remember == 'on') {
            $remember = 1;
        }else{
            $remember = 0;
        }
        $body = [
            'email' => $email,
            'password' => $password,
            'remember' => $remember
        ];
        $res = Hlp::apiPost('/auth', $body);
        $res = $res->object();

        if (isset($res->error)) {
            return redirect()->route('auth-index')
            ->cookie('err', $res->error, 0.30);
        }
        
        return redirect()->route('dashboard')
        ->cookie('EMAIL', $res->email, $res->expires_in_minute)
        ->cookie('API_TOKEN', $res->access_token, $res->expires_in_minute)
        ->cookie('EXPIRES_IN', $res->expires_in_minute, $res->expires_in_minute)
        ->cookie('USRID', $res->uid, $res->expires_in_minute);
    }

    public function index(Request $request) {
        $res = Hlp::apiGet('/check');
        if (isset($res->data)) {
            return redirect()->route('dashboard');
        }
        return view('pages.auth.auth');
    }

    public function logout(Request $request) {
        try {
            Hlp::apiPost('/auth/logout',[]);
        } catch (\Throwable $th) {}
        // Session::flush();
        // return redirect()->route('auth-index')->withCookie(
        //     Cookie::forget('EMAIL'),
        //     Cookie::forget('API_TOKEN'),
        //     Cookie::forget('EXPIRES_IN'),
        //     Cookie::forget('USRID'),
        //     Session::flush()
        // );
        return redirect()->route('auth-index')
        ->cookie('EMAIL', null, 0.01)
        ->cookie('API_TOKEN', null, 0.01)
        ->cookie('EXPIRES_IN', null, 0.01)
        ->cookie('USRID', null, 0.01);
    }
}
