<x-default>
    <input type="hidden" name="_deviceid" value="{{ $deviceData->deviceRelay->ftdevice_id }}">
    <input type="hidden" name="_lat" value="{{ $deviceData->deviceRelay->fflat }}">
    <input type="hidden" name="_lon" value="{{ $deviceData->deviceRelay->fflon }}">
    @include('pages.tracking.thead')
    <div class="page-header page-header-bordered">
        <h1 class="page-title">{{ $cfg['title'] }}</h1>
        <div class="page-header-actions">
            <a href="{{ route('tracking_list') }}" type="button" class="btn btn-sm btn-outline btn-primary btn-round waves-effect waves-classic">
                <span class="text hidden-sm-down">Vehicle Tracking</span>
                <i class="icon md-chevron-right" aria-hidden="true"></i>
            </a>
        </div>
    </div>
    <div class="container">
        <div class="page-content">
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title"></h3>
                </div>
                
                <div class="panel-body container-fluid">
                    <ul id="tabs" class="nav nav-tabs">
                        <li class="nav-item">
                            <a href="{{ route('tracking_status',$deviceData->deviceRelay->ftdevice_id) }}" class="nav-link small text-uppercase active">
                                Status
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('tracking_map',$deviceData->deviceRelay->ftdevice_id) }}" class="nav-link small text-uppercase">
                                Tracking Map
                            </a>
                        </li>
                        {{-- <li class="nav-item">
                            <a href="{{ route('tracking_geo',$deviceData->deviceRelay->ftdevice_id) }}" class="nav-link small text-uppercase">
                                Geofence
                            </a>
                        </li> --}}
                        <li class="nav-item">
                            <a href="{{ route('tracking_mlff',$deviceData->deviceRelay->ftdevice_id) }}" class="nav-link small text-uppercase">
                                Toll Declaration
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('tracking_live',$deviceData->deviceRelay->ftdevice_id) }}" class="nav-link small text-uppercase">
                                🔴Live Tracking
                            </a>
                        </li>
                    </ul>
                    <div class="py-4"></div>
                    <div id="tabsContent" class="tab-content">
                        <div id="status" class="tab-pane fade active show">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="row">
                                        <div class="col">
                                            <div class="panel-body container-fluid">
                                                <div class="col-md-12">
                                                    <div class="col">
                                                        <div class="row">
                                                            <div class="col-md-2">
                                                                <i class="icon ion-ios-car icon-4x md-assignment green-400" aria-hidden="true"></i>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <h3>
                                                                    <span id="obutitle">{{$deviceData->deviceRelay->ftasset_id}}</span>
                                                                </h3>
                                                                <label class="text-capitalize font-size-12">{{$deviceData->deviceRelay->ftasset_name}}</label>
                                                            </div>
                                                        </div>
                                                        <div class="row py-4">
                                                            <div class="col-md-12">
                                                                <div class="row">
                                                                    <div class="col">
                                                                        <h3>
                                                                            Device Information
                                                                        </h3>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-sm-6">
                                                                        <ul style="list-style-type: none;">
                                                                            <li><label class="text-capitalize font-size-12">Ignition Time</label></i>
                                                                            <li><label class="text-capitalize font-size-12">Device ID</label></i>
                                                                            <li><label class="text-capitalize font-size-12">Device Type</label></i>
                                                                            <li><label class="text-capitalize font-size-12">Device Name</label></i>
                                                                            <li><label class="text-capitalize font-size-12">Power By</label></i>
                                                                            <li><label class="text-capitalize font-size-12">Battery</label></i>
                                                                            <li><label class="text-capitalize font-size-12">Sattelite</label></i>
                                                                            <li><label class="text-capitalize font-size-12">Signal</label></i>
                                                                            <li><label class="text-capitalize font-size-12">Cellular</label></i>
                                                                        </ul>
                                                                    </div>
                                                                    <div class="col-sm-6">
                                                                        <ul style="list-style-type: none;">
                                                                            <li><label id="ignitiondate" class="text-capitalize font-size-12 font-weight-bold green-400">{{$deviceData->deviceIgnition->created_at}}</label></li>
                                                                            <li><label class="text-capitalize font-size-12 font-weight-bold green-400">{{$deviceData->deviceRelay->ftdevice_id}}</label></li>
                                                                            @if ($deviceData->deviceRelay->fncategory === 1)
                                                                            <li><label class="text-capitalize font-size-12 font-weight-bold green-400">GSM</label></i>
                                                                            @elseif ($deviceData->deviceRelay->fncategory === 2)
                                                                            <li><label class="text-capitalize font-size-12 font-weight-bold green-400">SIGFOX</label></i>
                                                                            @endif
                                                                            <li><label class="text-capitalize font-size-12 font-weight-bold green-400">{{$deviceData->deviceRelay->ftdevice_name}}</label></i>
                                                                            <li><label class="text-capitalize font-size-12 font-weight-bold green-400">{{$deviceData->deviceIgnition->fbpower ? "Battery" : "USB"}}</label></i>    
                                                                            <li><label class="text-capitalize font-size-12 font-weight-bold green-400">{{$deviceData->deviceIgnition->ffbattery}}%</label></i>
                                                                            <li><label class="text-capitalize font-size-12 font-weight-bold green-400">{{$deviceData->deviceIgnition->fnsattelite}}</label></i>
                                                                            <li><label class="text-capitalize font-size-12 font-weight-bold green-400">{{\Hlp::betweenNumb($deviceData->deviceIgnition->fnsignal)}}</label></i>
                                                                            <li><label class="text-capitalize font-size-12 font-weight-bold green-400">{{$deviceData->deviceIgnition->ftcellular}}</label></i>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <h3>
                                                        Last Activity
                                                    </h3>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col">
                                                    <span class="badge badge-default text-uppercase text-left">Date Time</span>
                                                </div>
                                                <div class="col">
                                                    <span class="badge badge-default text-uppercase text-left">GNSS Point</span>
                                                </div>
                                                <div class="col">
                                                    <span class="badge badge-default text-uppercase text-left">Location</span>
                                                </div>
                                            </div>
                                            <div class="border-top my-3"></div>
                                            <div class="row">
                                                <div class="col">
                                                    <span id="datetime" class="badge badge-default text-wrap text-left">{{$deviceData->deviceRelay->created_at}}</span>
                                                </div>
                                                <div class="col">
                                                    <span id="entrypoint" class="badge badge-default text-wrap text-left">{{ $deviceData->deviceRelay->fflat . ', '. $deviceData->deviceRelay->fflon}}</span>
                                                </div>
                                                <div class="col">
                                                    <span id="exitpoint" class="badge badge-default text-wrap text-left">n/a</span>
                                                </div>
                                            </div>
                                            
                                            <div class="row py-4">
                                                <div class="col">
                                                    <div id="statusmap"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @include('pages.tracking.tfoot')
    @vite([
    'resources/js/pages/tracking_status.js',
    ])
</x-default>
