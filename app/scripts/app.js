// main app module
'use strict';

(function(){

  var salesApp = angular.module('salesApp', ['ui.bootstrap']);

  salesApp.controller('listCtrl', ['$scope', '$http', function($scope, $http) {

    $http({method: 'GET', url:'/Commercial/GetCustomerData'})
      .then(function(response) {
        $scope.customerSearch = [];
        var data = response.data;
        for (var i = 0; i < data.length; i++) {
          $scope.customerSearch.push(data[i].cus_no.trim() + ' : ' + data[i].cus_name.trim());
        }

        // ... to autocomplete in the search input
        $( '#tags' ).autocomplete({ source: $scope.customerSearch });
      }, function(response) {
        console.log('Error loading customer JSON data.');
        events.emit('alert');
      });

    $http({method: 'GET', url:'/Commercial/GetSalesData'})
      .then(function(response) {
        $scope.raw = response.data;
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
      }, function(response) {
        console.log('Error loading annual sales JSON data.');
        events.emit('alert');
      });

    $(':submit').click(function() {
      var $tagVal = $('#tags').val().toUpperCase();
      var i = $tagVal.substring(0,6);
      var j = $tagVal.substring(9, $tagVal.length);

      $scope.$apply(function() {
        // sync up vars
        $scope.query = i;
        $scope.selectedCustomer = i; // $('#tags').val().toUpperCase();
        // get tons for selected customer
        $scope.calcTotalTons();
        // start the magic
        $('#table-grid').show();
        events.emit('customerChanged', [i, j, $scope.curTonsData]);
      });
    });

    $('#tags').on('click', function() {
      events.emit('pickingCustomer');
      $('#tags').val('');
      $('#table-grid').hide();
    })

  }]);

})();
