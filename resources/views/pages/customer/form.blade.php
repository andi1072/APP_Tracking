@if (isset($d))
@section('page_title')
    {{ "User Detail" }}
@endsection
@else
@section('page_title')
    {{ "Add New User" }}
@endsection
@endif
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
            <a href="{{ route('customer_list') }}" type="button" class="btn btn-sm btn-outline btn-primary btn-round waves-effect waves-classic">
                <span class="text hidden-sm-down">User List</span>
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
                    <form method="POST" id="formCustomer" enctype="multipart/form-data" autocomplete="off">
                        @csrf
                        <input type="hidden" name="_backurl" value="{{ route('customer_list') }}">
                        <input type="hidden" name="_id" value="{{ isset($d) ? $d->uid : $cfg['uid'] }}">
                        <input type="hidden" name="_isEdit" value="{{ isset($d) ? 1 : 0 }}">
                        <div class="row row-lg">
                            <div class="col-xl-6">
                                <div class="form-group form-material floating" data-plugin="formMaterial">
                                    @if (isset($d))
                                    <input type="email" class="form-control" name="txtemail" required="" readonly value="{{ isset($d) ? $d->email : '' }}">
                                    @else
                                    <input type="email" class="form-control" name="txtemail" required="">
                                    @endif
                                    <label class="floating-label">Email
                                        <span class="required">*</span>
                                    </label>
                                </div>
                                <div class="form-group form-material floating" data-plugin="formMaterial">
                                    <input type="text" class="form-control" name="txtfirstname" required="" value="{{ isset($d) ? $d->ftfirst_name : '' }}">
                                    <label class="floating-label">First Name
                                        <span class="required">*</span>
                                    </label>
                                </div>
                                <div class="form-group form-material floating" data-plugin="formMaterial">
                                    <input type="text" class="form-control" name="txtlastname" required="" value="{{ isset($d) ? $d->ftlast_name : '' }}">
                                    <label class="floating-label">Last Name
                                        <span class="required">*</span>
                                    </label>
                                </div>
                                <div class="form-group form-material floating" data-plugin="formMaterial">
                                    <input type="text" class="form-control" name="txttelephone" value="{{ isset($d) ? $d->fttelphone : '' }}">
                                    <label class="floating-label">Telphone
                                        <span class="required">*</span>
                                    </label>
                                </div>
                            </div>

                            <div class="col-xl-6 form-horizontal">
                                <div class="form-group form-material floating" data-plugin="formMaterial">
                                    <textarea class="form-control" name="txtaddress" rows="5" maxlength="255">{{ isset($d) ? $d->ftaddress : '' }}</textarea>
                                    <label class="floating-label">Address</label>
                                </div>
                                <div class="form-group form-material floating" data-plugin="formMaterial">
                                    <input type="password" class="form-control" name="txtpassword" required="" autocomplete="off">
                                    <label class="floating-label">Password
                                        <span class="required">*</span>
                                    </label>
                                </div>
                                <div class="form-group form-material floating" data-plugin="formMaterial">
                                    <select class="form-control" id="status" data-plugin="selectpicker" data-style="btn-info" name="selstatus" required="">
                                        <option value="0">Status</option>
                                        <option value="1">Active</option>
                                        <option value="2">Deactive</option>
                                    </select>
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
        $("select[name=selstatus]").val(`{{ isset($d) ? $d->fnstatus : 0 }}`);
    </script>
    @vite([
    'resources/js/pages/customer.js',
    ])
    @endpush
</x-default>
