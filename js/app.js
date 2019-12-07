var app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: "./page/home.html"
		});
});

app.controller('mainCtrl', function ($scope, $location, $http) {
	//Khai báo địa chỉ data
	var student_url = "./data/students.json";

	//Lấy nội dung data
	$http.get(student_url).then(function (response) {
		//Lưu data vao $scope.listUser
		$scope.listUser = response.data;
	});

	//Lấy user_login trong sessionStorage vao $scope.user_login
	$scope.user_login = sessionStorage.user_login ? angular.fromJson(sessionStorage.user_login) : [];

	// console.log($scope.listUser);

	//Hàm xem
	$scope.xem = function (i) {
		$scope.xemUser = $scope.listUser[i];
		$('#modal-show').modal();
	}

	//Hàm đăng nhập
	$scope.login = function () {
		//Duyệt từng phần tử trong $scope.listUser
		for (i in $scope.listUser) {
			var account = $scope.listUser[i];

			//Kiểm tra user và pass trùng với điều kiện 
			if (
				$scope.username == account.username
				&& $scope.password == account.password
			) {
				//Lưu thông tin tài khoản vào sessionStorage.user_login
				sessionStorage.user_login = angular.toJson(account);
				//Lấy thông tin từ sessionStorage.user_login vào $scope.user_login
				$scope.user_login = angular.fromJson(sessionStorage.user_login);
				break;
			}
		}
	}

	//Hàm thoát
	$scope.thoat = function () {
		//Lưu sessionStorage.user_login thành 1 mảng rỗng
		sessionStorage.user_login = angular.toJson([]);
		//Lấy thông tin từ sessionStorage.user_login vào $scope.user_login
		$scope.user_login = angular.fromJson(sessionStorage.user_login);
	}
})