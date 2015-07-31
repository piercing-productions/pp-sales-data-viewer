'use strict';

/**
 * @ngdoc overview
 * @name ppBaseAppSeedApp
 * @description
 * # ppBaseAppSeedApp
 *
 * Main module of the application.
 */

var salesApp = angular.module('salesApp', ['ui.bootstrap', 'googlechart']);

salesApp.controller('listCtrl', ['$scope', '$http', function($scope, $http) {

  $http.get('data/sales.json').success(function(data) {
    $scope.raw = data;
    $scope.customers = [];
    $scope.selectedCustomer = {};
    $scope.years = ['2010', '2011', '2012', '2013', '2014', '2015'];
    $scope.curTonsData = [0, 0, 0, 0, 0, 0];
    $scope.resetTonsData = function() {
      $scope.curTonsData = [0, 0, 0, 0, 0, 0];
    };
    // $scope.resetTonsData();

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
      // console.log($scope.curTonsData);
    };

    // get unique list of customers (cus_no)
    for (var i = 0; i < $scope.raw.length; i++) {
      $scope.customers.push($scope.raw[i].cus_no.trim());
    }
    $scope.customers = $.unique( $scope.customers );

    // ... to autocomplete in the search input
    $( '#tags' ).autocomplete({ source: $scope.customers });

  });

  // $scope.showSelected = function(q) {
  //   //alert('starting showSelected, q = ' + q + ', raw.length = ' + $scope.raw.length);
  //   for (var i = 0; i < $scope.raw.length; i++) {
  //     if ($scope.raw[i].cus_no.trim() === q) {
  //       for (var j = 0; j < $scope.raw[i].shipTos.length; i++) {
  //         console.log($scope.raw[i].shipTos[j].tons[0]);
  //       }
  //     }
  //   }
  // };

  // SELECT CUSTOMER
  // $scope.selectCustomer = function() {
  //   // cache array of nodes
  //
  //   $scope.selectedCustomer =
  //   //
  // };

  // RENDER


  $(':submit').click(function() {
    if ($('#tags').val() !== $scope.selectedCustomer) {
      $scope.$apply(function() {
        // sync up vars
        $scope.query = $scope.selectedCustomer = $('#tags').val();
        // get tons for selected customer
        $scope.calcTotalTons();
        // update the chart
        $scope.chartObject.data = [
          ['Year', 'Tons'],
          [$scope.years[0], $scope.curTonsData[0]],
          [$scope.years[1], $scope.curTonsData[1]],
          [$scope.years[2], $scope.curTonsData[2]],
          [$scope.years[3], $scope.curTonsData[3]],
          [$scope.years[4], $scope.curTonsData[4]],
          [$scope.years[5] + ' YTD', $scope.curTonsData[5]]
        ];
      });
    }
  });

  $scope.chartObject = {};

  // $scope.chartObject.data = {'cols': [
  //     {id: 't', label: 'Year', type: 'string'},
  //     {id: 's', label: 'Tons', type: 'number'}
  // ], 'rows': [
  //     {c: [
  //         {v: '2010'},
  //         {v: 300},
  //     ]},
  //     {c: [
  //         {v: '2011'},
  //         {v: 275},
  //     ]},
  //     {c: [
  //         {v: '2012'},
  //         {v: 178}
  //     ]},
  //     {c: [
  //         {v: '2013'},
  //         {v: 489},
  //     ]},
  //     {c: [
  //         {v: '2014'},
  //         {v: 267},
  //     ]},
  //     {c: [
  //         {v: '2015'},
  //         {v: 679},
  //     ]}
  // ]};

  $scope.chartObject.type = 'ColumnChart';
  $scope.chartObject.options = {
    height: 300,
    colors: ['#1b9e77'],
    chartArea: {width: '80%'},
    bar: { groupWidth: '75%' },
    legend: { position: 'none' },
    vAxis: { minValue: 0 }
  };

}]);
