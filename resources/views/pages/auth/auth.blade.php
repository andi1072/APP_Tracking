<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
    @include('includes.head')
    <link rel="stylesheet" href="{{ asset('global/vendor/ladda/ladda.css')}}">
</head>
<body class="animsition page-login-v3 layout-full">
    <input type="hidden" name="_err" value="{{ Cookie::get('err') }}">
    <div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">>
        <div class="page-content vertical-align-middle">
            <div class="panel">
                <div class="panel-body">
                    <div class="brand">
                        <img style="width: 300px" class="brand-img" src="{{ asset('assets/images/TRANSDIGI.png')}}" alt="TRANSDIGI ADMINISTRATOR"></br>
                        <label class="font-size-15" class="brand-text font-size-18">E-TOLL MLFF OBU Provider</label>
                    </div>
                    <form action="{{ route('login-js') }}" enctype="multipart/form-data" method="post" autocomplete="off">
                        @csrf
                        <div class="form-group form-material floating" data-plugin="formMaterial">
                            <input type="email" class="form-control" name="email" />
                            <label class="floating-label">Email</label>
                        </div>
                        <div class="form-group form-material floating" data-plugin="formMaterial">
                            <input type="password" class="form-control" name="password" />
                            <label class="floating-label">Password</label>
                        </div>
                        <div class="form-group clearfix">
                            <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-lg float-left">
                                <input type="checkbox" id="ckremember" name="ckremember">
                                <label for="ckremember">Remember me</label>
                            </div>
                            <a class="float-right" href="#">Forgot password?</a>
                        </div>
                        <div class="form-group clearfix">
                        <button type="submit" class="btn btn-info ladda-button" data-style="expand-left" data-plugin="ladda">
                            <span class="ladda-label"><i class="icon md-arrows mr-10" aria-hidden="true"></i>
                                Login
                            </span>
                        </button>
                    </div>
                    </form>
                </div>
            </div>

            <footer class="page-copyright page-copyright-inverse">
                <p>WEBSITE BY GNSS Labs</p>
                <p>© 2023. All RIGHT RESERVED.</p>
                <div class="social">
                    <a class="btn btn-icon btn-pure" href="javascript:void(0)">
                        <i class="icon bd-twitter" aria-hidden="true"></i>
                    </a>
                    <a class="btn btn-icon btn-pure" href="javascript:void(0)">
                        <i class="icon bd-facebook" aria-hidden="true"></i>
                    </a>
                    <a class="btn btn-icon btn-pure" href="javascript:void(0)">
                        <i class="icon bd-google-plus" aria-hidden="true"></i>
                    </a>
                </div>
            </footer>
        </div>
    </div>
    @include('includes.script')
    <script src="{{ asset('global/vendor/ladda/spin.min.js')}}"></script>
    <script src="{{ asset('global/vendor/ladda/ladda.min.js')}}"></script>
    <script src="{{ asset('global/js/Plugin/ladda.js')}}"></script>
</body>
</html>
