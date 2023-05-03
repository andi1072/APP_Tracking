<div class="panel-body container-fluid">
    <div class="col-md-12">
        <div class="col">
            <div class="row">
                <div class="col-md-1">
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