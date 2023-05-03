<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
    @include('includes.head')
    @include('includes.errors.errcss')
</head>
<body class="animsition page-error page-error-503 layout-full">
    <div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
        <div class="page-content vertical-align-middle">
            <header>
                <h1 class="animation-slide-top">503</h1>
                <p>Page Not Found !</p>
            </header>
            <p class="error-advise">YOU SEEM TO BE TRYING TO FIND A WAY</p>
            <a class="btn btn-primary btn-round" href="#" onclick="goBack()">TAKE ME BACK</a>
    
            @include('includes.errors.errfooter')
        </div>
    </div>
    @include('includes.script')
    <script>
        function goBack() {
            window.history.back()
        }
    </script>
</body>
</html>
