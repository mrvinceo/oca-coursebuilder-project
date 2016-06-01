angular
  .module('MyApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
  .controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;

      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
  })
  .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close LEFT is done");
        });

    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });

angular
   .module('headApp',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('yellow')
      .accentPalette('blue');
  
    // Define a theme for the Login dialogs; 
    // @see <md-dialog md-theme="login">...</md-dialog>
  
    $mdThemingProvider.theme('login')
      .primaryPalette('brown')
      .accentPalette('yellow');
    
  })
  .controller('appController',function($scope,$mdDialog){
    $scope.showLogin = function() {
        $mdDialog.show({
        controller: 'LoginController',
        templateUrl: 'login.tmpl.html',
        parent: angular.element(document.body),
        clickOutsideToClose:true
      });      
    }  
  })
  .controller('LoginController', function($scope, $mdDialog, $log) {
    $scope.cancel = function() {
      $mdDialog.hide();
    };
    $scope.login = function() {
      $log.debug("login()...");
      $mdDialog.hide();
    };
    $scope.user = {
      company: 'Google, Inc.',
      email: 'ThomasBurleson@Gmail.com',
      phone: ''
    };
  })


/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
**/