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
    @endpush
    <div class="page-content container-fluid">
        <div class="row" data-plugin="matchHeight" data-by-row="true">
            <div class="col-xxl-12 col-lg-12">
                <div class="card card-shadow">
                    <div class="card-header">
                        <div class="col-md-4">
                            Devices :
                            <input type="text" id="sel_device" name="sel_device" data-plugin="ionRangeSlider" style="width:100%"/>
                        </div>
                    </div>
                    <div class="card-body card-block p-0">
                        <div class="col-lg-12">
                            <div class="py-4"></div>
                            <table class="table table-hover dataTable table-striped w-full" id="tblmlff_sec">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Entry Time</th>
                                        <th>Exit Time</th>
                                        <th>Exit Gate</th>
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
