angular.module('driving')

  .config(($routeProvider) => {
    $routeProvider
    //routes
    .when("/", {
      templateUrl: "app/landing/landing.html",
      controller: "LandingCtrl",
      controllerAs: "landing"
    })
    .when("/login", {
      templateUrl: "app/auth/login.html",
      controller: "LoginCtrl",
      controllerAs: "auth"
    })
    .when("/register", {
      templateUrl: "app/auth/register.html",
      controller: "RegisterCtrl",
      controllerAs: "auth"
    });
  });