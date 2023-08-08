@section('page_title')
    {{ "Device Toll Declaration" }}
@endsection
<x-default>
    <input type="hidden" name="_deviceid" value="{{ $deviceData->deviceRelay->ftdevice_id }}">
    <input type="hidden" name="_lat" value="{{ $deviceData->deviceRelay->fflat }}">
    <input type="hidden" name="_lon" value="{{ $deviceData->deviceRelay->fflon }}">
    @include('pages.tracking.thead')
    @push('isstyles')
    <link rel="stylesheet" href="{{ asset('global/vendor/datatables.net-bs4/dataTables.bootstrap4.min.css')}}">
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
                <div class="modal" id="modallog" tabindex="-1" role="dialog">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title"></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div id="trackingmlff_log"></div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
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
                            <a href="{{ route('tracking_map',$deviceData->deviceRelay->ftdevice_id) }}" class="nav-link small text-uppercase">
                                OBU Tracking
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('tracking_geo',$deviceData->deviceRelay->ftdevice_id) }}" class="nav-link small text-uppercase">
                                Geofence
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="{{ route('tracking_mlff',$deviceData->deviceRelay->ftdevice_id) }}" class="nav-link small text-uppercase active">
                                Toll Declaration
                            </a>
                        </li>
                    </ul>
                    <div class="py-4"></div>
                    <div id="tabsContent" class="tab-content">
                        <div class="tab-pane fade active show">
                            <div class="row">
                                <div class="col-lg-12">
                                    <table class="table table-hover dataTable table-striped w-full" id="tblmlff_sec">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Entry Time</th>
                                                <th>Entry Gate</th>
                                                <th>Entry Point</th>
                                                <th>Entry Section</th>
                                                <th>Exit Time</th>
                                                <th>Exit Gate</th>
                                                <th>Exit Point</th>
                                                <th>Exit Section</th>
                                                <th>Distance</th>
                                                <th>Speed (Avg)</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @include('pages.tracking.tfoot')
    @push('isscript')
    <script src="{{ asset('global/vendor/datatables.net/jquery.dataTables.min.js')}}"></script>
    <script src="{{ asset('global/vendor/datatables.net-bs4/dataTables.bootstrap4.min.js')}}"></script>
    <script src="{{ asset('global/vendor/bootbox/bootbox.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/datatables.js')}}"></script>
    @endpush
    @vite([
    'resources/js/pages/tracking_mlff_history_section.js',
    ])
</x-default>
