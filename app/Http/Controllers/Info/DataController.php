<?php

namespace App\Http\Controllers\Info;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Hlp;
class DataController extends Controller
{
    public function geo_info_js($geoid) {
        $res = Hlp::apiGet('/info/geo/'. $geoid);
        return response()->json([
            'data' => $res->data
        ], 200);
    }

    public function device_info_js($deviceid) {
        $res = Hlp::apiGet('/info/device/'. $deviceid);
        return response()->json([
            'data' => $res->data
        ], 200);
    }

    public function device_geonotif_js($deviceid, $geoid) {
        $resDevice = Hlp::apiGet('/info/device/'. $deviceid);
        $resGeo = Hlp::apiGet('/info/geo/'. $geoid);
        return response()->json([
            'dataDevice' => $resDevice->data,
            'dataGeo' => $resGeo->data
        ], 200);
    }

    
}
