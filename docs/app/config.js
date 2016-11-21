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
      controllerAs: "register"
    })
    .when("/deleteAccount", {
      templateUrl: "app/auth/deleteAccount.html",
      controller: "RegisterCtrl",
      controllerAs: "register",
      resolve: {
        function ($location) {
          if (!firebase.auth().currentUser) {
           $location.path('/')
          }
        }
      }
    })

    //user page
    .when("/userPage", {
      templateUrl: "app/userPage/userPage.html",
      controller: "UserPageCtrl",
      controllerAs: "userPage",
      resolve: {
        function ($location) {
          if (!firebase.auth().currentUser) {
           $location.path('/')
          }
        }
      }
    })

    //user options
    .when("/rateDriver", {
      templateUrl: "app/rateDriver/rateDriver.html",
      controller: "RateDriverCtrl",
      controllerAs: "rateDriver",
      resolve: {
        function ($location) {
          if (!firebase.auth().currentUser) {
           $location.path('/')
          }
        }
      }
    })
    .when("/searchDriver", {
      templateUrl: "app/searchDriver/searchDriver.html",
      controller: "SearchDriverCtrl",
      controllerAs: "searchDriver",
      resolve: {
        function ($location) {
          if (!firebase.auth().currentUser) {
           $location.path('/')
          }
        }
      }
    })
    .when("/viewLeaders", {
      templateUrl: "app/viewLeaders/viewLeaders.html",
      controller: "ViewLeadersCtrl",
      controllerAs: "viewLeaders",
      resolve: {
        function ($location) {
          if (!firebase.auth().currentUser) {
           $location.path('/')
          }
        }
      }
    })

    //option from all pages except auth
    .when("/help", {
      templateUrl: "app/help/help.html",
      controller: "HelpCtrl",
      controllerAs: "help",
      resolve: {
        function ($location) {
          if (!firebase.auth().currentUser) {
           $location.path('/')
          }
        }
      }
    })

  });