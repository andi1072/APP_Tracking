
<!DOCTYPE html>
<html class="no-js css-menubar" lang="en">
  <head>
    @include('includes.head')
    @stack('isstyles')
  </head>
  <body class="animsition">
    @include('includes.nav')
    @include('includes.menubar')
    <div class="page">
      {{ $slot }}
    </div>
    @include('includes.footer')
    @include('includes.script')
    @stack('isscript')
  </body>
</html>
