@section('page_title')
    {{ "Device Tracking Map" }}
@endsection
<x-default>
    @include('pages.tracking.thead')
    @push('isstyles')
    <link href="{{ asset('global/js/dtpicker/css/bootstrap-datetimepicker.min.css')}}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('global/vendor/ladda/ladda.css')}}">
    {{-- <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.1/css/dataTables.bootstrap4.min.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/jszip-2.5.0/dt-1.13.1/af-2.5.1/b-2.3.3/b-colvis-2.3.3/b-html5-2.3.3/b-print-2.3.3/cr-1.6.1/date-1.2.0/fc-4.2.1/fh-3.3.1/kt-2.8.0/r-2.4.0/rg-1.3.0/rr-1.3.1/sc-2.0.7/sb-1.4.0/sp-2.1.0/sl-1.5.0/sr-1.2.0/datatables.min.css"/> --}}
    @endpush
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
                            <a href="{{ route('tracking_status',$deviceData->deviceRelay->ftdevice_id) }}" class="nav-link small text-uppercase">
                                Status
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('tracking_map',$deviceData->deviceRelay->ftdevice_id) }}" class="nav-link small text-uppercase active">
                                OBU Tracking
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('tracking_geo',$deviceData->deviceRelay->ftdevice_id) }}" class="nav-link small text-uppercase">
                                Geofence
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('tracking_mlff',$deviceData->deviceRelay->ftdevice_id) }}" class="nav-link small text-uppercase">
                                Toll Declaration
                            </a>
                        </li>
                        {{-- <li class="nav-item">
                            <a href="{{ route('tracking_live',$deviceData->deviceRelay->ftdevice_id) }}" class="nav-link small text-uppercase">
                                🔴Live Tracking
                            </a>
                        </li> --}}
                    </ul>
                    <div class="py-4"></div>
                    <div id="tabsContent" class="tab-content">
                        <div class="row">
                            <div class="col-xl-12">
                                
                                    <input type="hidden" name="device_id" value="{{ $deviceData->deviceRelay->ftdevice_id }}">
                                    <div id="log" class="tab-pane fade active show">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <label>Datetime Filter</label>
                                            </div>
                                        </div>
                                        <form method="POST" id="formMapTrack" enctype="multipart/form-data" autocomplete="off">
                                            @csrf
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <input type="text" id="txtdtfrom" name="txtdtfrom" class="form-control datepicker" required/>
                                                </div>
                                                <div class="col-md-4">
                                                    <input type="text" id="txtdtto" name="txtdtto" class="form-control datepicker" required/>
                                                </div>
                                                <div class="col-md-4">
                                                    <button type="submit" class="btn btn-info ladda-button" data-style="expand-left" data-plugin="ladda">
                                                        <span class="ladda-label"><i class="icon md-arrows mr-10" aria-hidden="true"></i>
                                                            Submit
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                        <div class="row py-4">
                                            <div class="col-lg-12">
                                                <div id="trackingmap"></div>
                                            </div>
                                        </div>
                                    </div>
                                
                            </div>
                            {{-- <div class="col-xl-12">
                                <div class="lt-body text-center p-20">
                                    <button class="btn btn-md btn-primary" onclick="showLogs()">Data Log</button>
                                </div>
                            </div> --}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    <div class="modal fade" id="modallogdetail" tabindex="-1" role="dialog" aria-labelledby="modallogdetailLongTitle" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modaltitleLogs">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="col-md-12">
                        <table class="table table-bordered dt-responsive table-hover dataTable table-striped w-full"  id="tbllogsdet">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Accuracy(CEP)</th>
                                    <th>Direction</th>
                                    <th>Speed(Km/h)</th>
                                    <th>Altitude(Meters)</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    @include('pages.tracking.tfoot')
    
    @push('isscript')
    <script src="{{ asset('global/js/dtpicker/js/bootstrap-datetimepicker.min.js')}}"></script>
    {{-- <script src="{{ asset('global/vendor/datatables.net/jquery.dataTables.min.js')}}"></script>
    <script src="{{ asset('global/vendor/datatables.net-bs4/dataTables.bootstrap4.min.js')}}"></script>
    <script src="{{ asset('global/vendor/bootbox/bootbox.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/datatables.js')}}"></script> --}}
    {{-- <script type="text/javascript" src="https://cdn.datatables.net/1.13.1/js/jquery.dataTables.min.js"></script> --}}
    {{-- <script type="text/javascript" src="https://cdn.datatables.net/1.13.1/js/dataTables.bootstrap4.min.js"></script> --}}
    {{-- <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs4/jszip-2.5.0/dt-1.13.1/af-2.5.1/b-2.3.3/b-colvis-2.3.3/b-html5-2.3.3/b-print-2.3.3/cr-1.6.1/date-1.2.0/fc-4.2.1/fh-3.3.1/kt-2.8.0/r-2.4.0/rg-1.3.0/rr-1.3.1/sc-2.0.7/sb-1.4.0/sp-2.1.0/sl-1.5.0/sr-1.2.0/datatables.min.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/datetime/1.2.0/js/dataTables.dateTime.min.js"></script> --}}
    <script src="{{ asset('global/vendor/ladda/spin.min.js')}}"></script>
    <script src="{{ asset('global/vendor/ladda/ladda.min.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/ladda.js')}}"></script>

    @vite([
        'resources/js/pages/tracking_map.js'
    ])
    <script>
        
        function showLogs() {
            $('#modallogdetail').modal('show');
        }
        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        var _dtfrom = today + ' 00:00:00', _dtto = today + ' 23:59:59';
        
        // var el_down = document.getElementById("txtdtfrom");
        // var inputF = document.getElementById("txtdtto");
        // inputF.innerHTML = today + ' 00:00:00';
        // el_down.innerHTML = today + ' 00:00:00';
        $("#txtdtfrom").val(_dtfrom);
        $("#txtdtto").val(_dtto);
        // console.log(today)
        $('.datepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss'
        });
    </script>
    @endpush
    
</x-default>