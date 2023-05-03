<x-default>
    @push('isstyles')
    <link rel="stylesheet" href="{{ asset('leaflet/leaflet.css') }}" />
    <link rel="stylesheet" href="{{ asset('leaflet/fullscreen/leaflet.fullscreen.css')}}" />
    <link href="{{ asset('global/js/dtpicker/css/bootstrap-datetimepicker.min.css')}}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('global/vendor/ladda/ladda.css')}}">
    <link rel="stylesheet" href="{{ asset('global/vendor/select2/select2.css')}}">
    <link rel="stylesheet" href="{{ asset('global/vendor/bootstrap-select/bootstrap-select.css')}}">
    @endpush
    <div class="page-content container-fluid">
        <div class="row" data-plugin="matchHeight" data-by-row="true">
            <div class="col-xxl-12 col-lg-12">
                <!-- Widget Jvmap -->
                
                <div class="card card-shadow">
                    <div class="card-block p-20">
                        <div class="col">
                            <form method="POST" id="formMapTrackDev" enctype="multipart/form-data" autocomplete="off">
                                @csrf
                                <div class="row">
                                    <div class="col-md-4">
                                        <input type="text" id="sel_device" name="sel_device" data-plugin="ionRangeSlider" style="width:100%"/>
                                    </div>
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
                        </div>
                        <div class="col mt-25">
                            <div id="devicesmap"></div>
                        </div>
                    </div>
                </div>
                <!-- End Widget Jvmap -->
            </div>
        </div>
    </div>
    @push('isscript')
    <script src="{{ asset('global/js/dtpicker/js/bootstrap-datetimepicker.min.js')}}"></script>
    <script src="{{ asset('global/vendor/select2/select2.full.min.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/select2.js')}}"></script>

    <script src="{{ asset('leaflet/leaflet.js')}}"></script>
    <script src="{{ asset('leaflet/fullscreen/Leaflet.fullscreen.min.js')}}"></script>
    <script src="{{ asset('global/vendor/jquery-placeholder/jquery.placeholder.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/jquery-placeholder.js')}}"></script>

    <script>
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        var _dtfrom = today + ' 00:00:00', _dtto = today + ' 23:59:59';
        
        $("#txtdtfrom").val(_dtfrom);
        $("#txtdtto").val(_dtto);
        $('.datepicker').datetimepicker({
            format: 'YYYY-MM-DD HH:mm:ss'
        });
    </script>
    @endpush
    @vite([
    'resources/js/pages/dev_tracking_map.js',
    ])
</x-default>
