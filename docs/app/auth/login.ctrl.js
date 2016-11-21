angular.module('driving')
  .controller('LoginCtrl', function($location, AuthFactory) {
    const auth = this;
    console.log("Controller is Working" );

    auth.login = function () {
      AuthFactory.login(auth.user.email, auth.user.password)
        .then(() => $location.path('/userPage'))
        .catch(() => alert('Login Failed'))
    }

  })