<x-default>
    @push('isstyles')
    <link rel="stylesheet" href="{{ asset('global/vendor/ladda/ladda.css')}}">
    <link rel="stylesheet" href="{{ asset('global/vendor/bootstrap-sweetalert/sweetalert.css')}}">
    <link rel="stylesheet" href="{{ asset('global/vendor/select2/select2.css')}}">
    <link rel="stylesheet" href="{{ asset('global/vendor/bootstrap-select/bootstrap-select.css')}}">
    @endpush
    <div class="page-header page-header-bordered">
        <h1 class="page-title">{{ $cfg['title'] }}</h1>
        <div class="page-header-actions">
            <a href="{{ route('device_list') }}" type="button" class="btn btn-sm btn-outline btn-primary btn-round waves-effect waves-classic">
                <span class="text hidden-sm-down">Device List</span>
                <i class="icon md-chevron-right" aria-hidden="true"></i>
            </a>
        </div>
    </div>
    <div class="container-fluid">
        <div class="page-content">
            <div class="panel">
                <div class="panel-heading">
                    <h3 class="panel-title"></h3>
                </div>
                <div class="panel-body container-fluid">
                    <form method="POST" id="formDevice" enctype="multipart/form-data" autocomplete="off">
                        @csrf
                        <input type="hidden" name="_backurl" value="{{ route('device_list') }}">
                        <input type="hidden" name="_id" value="{{ isset($d) ? $d->ftdevice_id : '0' }}">
                        <div class="row row-lg">
                            <div class="col-xl-6">
                                <div class="form-group form-material floating" data-plugin="formMaterial">
                                    {{-- <div class="col">
                                        <label class="floating-label">Tracking Category</label>
                                    </div> --}}
                                    <select class="form-control" id="trackcategory" data-plugin="selectpicker" data-style="btn-info" name="seltrackcategory" required="">
                                        <option value="0">Device Type</option>
                                        <option value="1">GSM</option>
                                        <option value="2">SIGFOX</option>
                                    </select>
                                </div>
                                <div class="form-group form-material floating" data-plugin="formMaterial">
                                    <input type="text" class="form-control" name="txtdevice_id" required="" value="{{ isset($d) ? $d->ftdevice_id : '' }}">
                                    <label class="floating-label">Device ID
                                        <span class="required">*</span>
                                    </label>
                                </div>
                                <div class="form-group form-material floating" data-plugin="formMaterial">
                                    <input type="text" class="form-control" name="txtdevicename" required="" value="{{ isset($d) ? $d->ftdevice_name : '' }}">
                                    <label class="floating-label">Device Name
                                        <span class="required">*</span>
                                    </label>
                                </div>
                            </div>

                            <div class="col-xl-6 form-horizontal">
                                <div class="form-group form-material floating" data-plugin="formMaterial">
                                    <input type="text" class="form-control" name="txtassetid" required="" value="{{ isset($d) ? $d->ftasset_id : '' }}">
                                    <label class="floating-label">Vehicle ID
                                        <span class="required">*</span>
                                    </label>
                                </div>
                                <div class="form-group form-material floating" data-plugin="formMaterial">
                                    <input type="text" class="form-control" name="txtassetname" required="" value="{{ isset($d) ? $d->ftasset_name : '' }}">
                                    <label class="floating-label">Vehicle Name
                                        <span class="required">*</span>
                                    </label>
                                </div>
                                <div class="form-group form-material floating" data-plugin="formMaterial">
                                    <textarea class="form-control" name="txtassetdescription" rows="3">{{ isset($d) ? $d->ftasset_description : '' }}</textarea>
                                    <label class="floating-label">Description</label>
                                </div>
                            </div>

                            <div class="form-group form-material col-xl-12 text-right padding-top-m">
                                <button type="submit" class="btn btn-info ladda-button" data-style="expand-left" data-plugin="ladda">
                                    <span class="ladda-label"><i class="icon md-arrows mr-10" aria-hidden="true"></i>
                                        Submit
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    @push('isscript')
    <script src="{{ asset('global/vendor/jquery-placeholder/jquery.placeholder.min.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/jquery-placeholder.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/material.js')}}"></script>
    <script src="{{ asset('global/vendor/ladda/spin.min.js')}}"></script>
    <script src="{{ asset('global/vendor/ladda/ladda.min.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/ladda.js')}}"></script>
    
    <script src="{{ asset('global/vendor/select2/select2.full.min.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/select2.js')}}"></script>
    <script src="{{ asset('global/vendor/bootstrap-select/bootstrap-select.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/bootstrap-select.js')}}"></script>
    <script>
        $("select[name=seltrackcategory]").val(`{{ isset($d) ? $d->fncategory : 0 }}`);
    </script>
    @vite([
    'resources/js/pages/device.js',
    ])
    @endpush
</x-default>
