@section('page_title')
    {{ "MLFF Section History" }}
@endsection
<x-default>
    @push('isstyles')
        <link rel="stylesheet" href="{{ asset('leaflet/leaflet.css') }}"/>
        <link rel="stylesheet" href="{{ asset('leaflet/fullscreen/leaflet.fullscreen.css')}}" />
        <link rel="stylesheet" href="{{ asset('global/vendor/datatables.net-bs4/dataTables.bootstrap4.min.css')}}">
        <link rel="stylesheet" href="{{ asset('global/vendor/ladda/ladda.css')}}">
        <link rel="stylesheet" href="{{ asset('global/vendor/select2/select2.css')}}">
        <link rel="stylesheet" href="{{ asset('global/vendor/bootstrap-select/bootstrap-select.css')}}">
        <style>
            .modal-open .select2-container {
                z-index: 0;
            }
        </style>
    @endpush
    <div class="page-content container-fluid">
        <div class="row" data-plugin="matchHeight" data-by-row="true">
            <div class="col-xxl-12 col-lg-12">
                <div class="card card-shadow">
                    <div class="card-header">
                        <h3>MLFF Section History
                    </div>
                    <div class="card-body card-block p-0">
                        <div class="col-lg-12">
                            <div class="py-4"></div>
                            <div class="col-md-4">
                                Select Device :
                                <input type="text" id="sel_device" name="sel_device" data-plugin="ionRangeSlider" style="width:100%"/>
                            </div>
                            <table class="table table-hover dataTable table-striped w-full" id="tblmlff_sec">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Entry Time</th>
                                        <th>Entry Location</th>
                                        <th>Exit Time</th>
                                        <th>Exit Location</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                            <div class="py-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
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
    @push('isscript')
        <script src="{{ asset('leaflet/leaflet.js')}}"></script>
        <script src="{{ asset('leaflet/fullscreen/Leaflet.fullscreen.min.js')}}"></script>
        <script src="{{ asset('global/vendor/datatables.net/jquery.dataTables.min.js')}}"></script>

        <script src="{{ asset('global/vendor/datatables.net-bs4/dataTables.bootstrap4.min.js')}}"></script>
        <script src="{{ asset('global/vendor/bootbox/bootbox.js')}}"></script>
        <script src="{{ asset('global/js/Plugin/datatables.js')}}"></script>
        <script src="{{ asset('global/vendor/select2/select2.full.min.js')}}"></script>
        <script src="{{ asset('global/js/Plugin/select2.js')}}"></script>
    @endpush
    @vite([
        'resources/js/pages/mlff_history_section.js',
    ])
</x-default>
