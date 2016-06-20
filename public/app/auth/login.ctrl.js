angular.module('driving')
  .controller('LoginCtrl', function($location, AuthFactory) {
    const auth = this;
    console.log("Controller is Working" );

    auth.login = function () {
      AuthFactory.login(auth.user.email, auth.user.password)
        .then(() => $location.path('/userPage'))
        .catch(() => alert('Login Failed'))
    }

    // auth.register = function () {
    //   AuthFactory.register(auth.email, auth.password)
    //     .then(() => $location.path('/userPage'))
    //     .catch(() => alert('It appears you may already be registered!'))
    // }



    // auth.deleteAccount = function () {

    // }

  })