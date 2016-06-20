angular.module('driving')
  .controller('RegisterCtrl', function ($location, AuthFactory) {
    const register = this;
    console.log("Register Controller is Working" );

    register.sendRegInfo = function () {
      AuthFactory.sendRegInfo(register.email, register.password)
      // AuthFactory.sendLicenseInfo(register.plate)
      //how come .sendRegInfo can be register or sendRegInfo and still work?
      //what about register.email and register password
      //need to add a PUT that updates userName, city, state, zip
      //something needs to see that plate exists and then just post
      //if nothing exits send all info - POST

        //next line passes these items to authFactoy into sendLicenseInfo
        .then(() => AuthFactory.sendLicenseInfo
        (register.plate, register.userName, register.city, register.state, register.zip))
        .then(() => $location.path('/userPage'))
        .catch(() => alert('It appears you may already be registered!'))
    }

  });