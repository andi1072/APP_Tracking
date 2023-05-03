<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
<head>
    @include('includes.head')
    @include('includes.errors.errcss')
</head>
<body class="animsition page-error page-error-500 layout-full">
    <div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
        <div class="page-content vertical-align-middle">
            <header>
                <h1 class="animation-slide-top">500</h1>
                <p>Page Not Found !</p>
            </header>
            <p class="error-advise">OOPS! LOOKS LIKE THE SYSTEM FOUND SOMETHING STRANGE</p>
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
