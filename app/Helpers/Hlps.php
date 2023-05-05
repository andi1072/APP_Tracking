<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

use GuzzleHttp\Client;
class Hlps
{
    public static function csrf($value = null)
    {
        $geo_location = Session::get(Cookie::get('USERNAME') . 'location');
        if ($geo_location) {
            $geo_location = json_decode($geo_location);
            $_lat = $geo_location->latitude;
            $_long = $geo_location->longitude;
        } else {
            $_lat = 'n/a';
            $_long = 'n/a';
        }
        $message = json_encode([
            'host' => request()->getHttpHost(),
            'app_id' => env('APP_ID'),
            'public_ip' => UserSystemInfo::get_ip(),
            'browser' => UserSystemInfo::get_browsers(),
            'devices' => UserSystemInfo::get_device(),
            'os' => UserSystemInfo::get_os(),
            'user_agent' => request()->userAgent(),
            'url' => URL::current(),
            'geo_latitude' => $_lat,
            'geo_longitude' => $_long,
            'message' => $value
        ]);
        $method = env('CSRF_METHOD');
        $secret = env('CSRF_SECRET');
        $message = substr(date('c'), 0, 19) . "$message";
        $iv = substr(bin2hex(openssl_random_pseudo_bytes(16)), 0, 16);
        $enc = base64_encode($iv) . openssl_encrypt($message, $method, $secret, 0, $iv);
        $hmac = hash_hmac('md5', $enc, $secret);
        return $hmac . '.' . $enc;
    }
    
    public static function apiGet($url)
    {
        $response = Http::withToken(Cookie::get('API_TOKEN'))
        ->get(env('APP_API'). '/api' . $url);
        return $response->object();

        // $client = new Client();
        // dd(env('APP_API'));
        // $res = $client->get('/api' . $url);
        // echo $res->getStatusCode();
        // // "200"
        // // echo $res->getHeader('content-type');
        // // 'application/json; charset=utf8'
        // echo $res->getBody();
        // // {"type":"User"...'
        // // var_export($res->json());
        // dd($res);

        // $headers = [
        //     'Authorization' => 'Bearer ' . Cookie::get('API_TOKEN'),        
        //     'Accept'        => 'application/json',
        // ];
        // $response = $client->request('GET', env('APP_API'). '/api' . $url, [
        //     'headers' => $headers
        // ]);
        // echo $response->getStatusCode();
        // echo $response->getBody();
        // dd($response);
    }

    public static function apiPost($url, $body)
    {
        $response = Http::withToken(Cookie::get('API_TOKEN'))
        ->acceptJson()->post(env('APP_API'). '/api' . $url, $body);
        return $response;
    }

    public static function apiPut($url, $body)
    {
        $response = Http::withToken(Cookie::get('API_TOKEN'))
        ->acceptJson()->put(env('APP_API'). '/api' . $url, $body);
        return $response;
    }

    public static function apiPostVarFile($url, $body, $fparam = null, $tfile = null, $fname = null, $multiple = null)
    {
        if ($multiple) {
            $response = Http::withToken(Cookie::get('API_TOKEN'));
            foreach ($multiple as $a_value) {
                $response = $response->attach($a_value[0], $a_value[1], $a_value[2]);
            }
            $response = $response->acceptJson()->post(env('APP_API') . $url, $body);
        }else{
            $response = Http::withToken(Cookie::get('API_TOKEN'))
            ->attach($fparam, $tfile, $fname)
                ->acceptJson()->post(env('APP_API') . $url, $body);
        }
        return $response;
    }

    public static function string_limit($string,$limit = 100,$with_dot = true) {
        if (strlen($string) > $limit) {
            $stringCut = substr($string, 0, $limit);
            $endPoint = strrpos($stringCut, ' ');
            $string = $endPoint? substr($stringCut, 0, $endPoint) : substr($stringCut, 0);
            if ($with_dot) {
                return $string . '...';
            }
        }
        return $string;
    }

    public static function text_clean($string) {
        $string = str_replace(' ', '-', $string); // Replaces all spaces with hyphens.
        $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string); // Removes special chars.
        return preg_replace('/-+/', '-', $string); // Replaces multiple hyphens with single one.
    }

    public static function chkActive($_url) {
        // dd(strpos($_url, URL::current()),strlen($_url)); // Request::path()
        // dd(request()->path());
        
        if (stristr($_url, request()->path())) {
            return 'active';
        } else {
            return '';
        }
    }

    public static function dtHumanToUTC($dtString,$dtTzName) {
        $date = Carbon::createFromFormat('Y-m-d H:i:s', $dtString, $dtTzName);
        $date->setTimezone('UTC');
        return $date->toDateTimeString();
    }

    public static function betweenNumb($x) {
        if (($x <= 9)) {
            return 'Low';
        }else if(($x >= 10 && $x <= 14)) {
            return 'Ok';
        }else if(($x >= 15 && $x <= 19)) {
            return 'Good';
        }else if(($x >= 20 && $x <= 31)) {
            return 'Excellent';
        }else{
            return 'Not Detectable';
        }
        //|| ($x > 40 && $x < 50)
    }
}
