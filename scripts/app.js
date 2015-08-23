var app = angular.module("user", []);



app.filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});

app.filter('titleCase', function () {
      return function (input) {
          input = input || '';
          return input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
      };
})

app.directive("userDetail", function () {
    return {
        restrict: "E",
        templateUrl:"partials/user-detail.html"
    };
});
app.controller("UserController", ['$scope','$http',function ($scope,$http) {
    $scope.usersPerPage = 5;
    $scope.currentPage = 0;
    $scope.users = [];
    $scope.showList = true;
    $scope.ajaxLoading = true;
    $http.get('http://api.randomuser.me/?results=50').success(function (data) {      
        $scope.users = data.results;
        $scope.ajaxLoading = false;
    }).error(function (data, status) {
        alert('Error getting data');
        $scope.ajaxLoading = false;
    });
    $scope.range = function () {
        var rangeSize = 5;
        var ret = [];
        var start;
        start = $scope.currentPage;
        if (start > $scope.pageCount() - rangeSize) {
            start = $scope.pageCount() - rangeSize + 1;
        }
        for (var i = start; i < start + rangeSize; i++) {
            ret.push(i);
        }
        return ret;
    };
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };   
    $scope.pageCount = function () {
        return Math.ceil($scope.users.length / $scope.usersPerPage) - 1;
    };
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    }; 
    $scope.setPage = function (n) {
        $scope.currentPage = n;
    };
    $scope.showDetails = function (index) {
        $scope.curUser = $scope.users[index].user;
        $scope.showList = !$scope.showList;
        
    };

}]);