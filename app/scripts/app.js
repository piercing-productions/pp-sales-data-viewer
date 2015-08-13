// main app module
'use strict';

(function(){

  var salesApp = angular.module('salesApp', ['ui.bootstrap']);

  salesApp.controller('listCtrl', ['$scope', '$http', function($scope, $http) {

    $http.get('data/customers.json').success(function(data) {
      $scope.customers = [];
      // get unique list of customers (cus_no)
      for (var i = 0; i < data.length; i++) {
        $scope.customers.push(data[i].cus_no.trim());
      }
      // $scope.customers = $.unique( $scope.customers );

      // ... to autocomplete in the search input
      //$( '#tags' ).autocomplete({ source: $scope.customers });
    });

    $http.get('data/sales-real.json').success(function(data) {
      $scope.raw = data;
      $scope.customers = [];
      $scope.selectedCustomer = {};
      $scope.curTonsData = [];

      // dynamically get array of current year + 5 previous calendar years
      $scope.years = [];
      var year = new Date().getFullYear(), timePeriod = 5;
      for (var i = timePeriod; i >= 0; i--) {
        $scope.years.push((year - i).toString());
      }

      $scope.resetTonsData = function() {
        for (var i = 0; i < $scope.years.length; i++) {
          $scope.curTonsData[i] = 0;
        }
      };
      $scope.resetTonsData();

      $scope.calcTotalTons = function() {
        $scope.resetTonsData();
        for (var i = 0; i < $scope.raw.length; i++) {
          if ($scope.raw[i].cus_no.trim() === $scope.selectedCustomer) {
            for (var j = 0; j < $scope.years.length; j++) {
              var n = $scope.raw[i][$scope.years[j]];
              if (!isNaN(parseFloat(n))) {
                $scope.curTonsData[j] += parseInt(n);
              }
            }
          }
        }
      };

      // // get unique list of customers (cus_no)
      // for (var i = 0; i < $scope.raw.length; i++) {
      //   $scope.customers.push($scope.raw[i].cus_no.trim());
      // }
      // $scope.customers = $.unique( $scope.customers );

      // // ... to autocomplete in the search input
      // $( '#tags' ).autocomplete({ source: $scope.customers });

    });

    $(':submit').click(function() {
      if ($('#tags').val().toUpperCase() !== $scope.selectedCustomer) {
        $scope.$apply(function() {
          // sync up vars
          $scope.query = $scope.selectedCustomer = $('#tags').val().toUpperCase();
          // get tons for selected customer
          $scope.calcTotalTons();
          // start the magic
          $('#table-grid').show();
          events.emit('customerChanged', [$scope.selectedCustomer, $scope.curTonsData]);
        });
      }
    });

    $('#tags').on('click', function() {
      events.emit('pickingCustomer');
      $('#tags').val('');
      $('#table-grid').hide();
    })

  }]);

})();
