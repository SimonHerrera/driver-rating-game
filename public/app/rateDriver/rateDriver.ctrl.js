angular.module('driving')
  .controller('RateDriverCtrl', function($location, RateDriverFactory) {
    const rateDriver = this;

    console.log("Rate Driver Controller is Working" );

    rateDriver.sendRateInfo = function () {

        RateDriverFactory.sendRateInfo(rateDriver.plate, rateDriver.message)
        //need to send this info with userName, city, state, zip all empty
        .then(() => //check if plate key exists add modifier if not create this record below
          AuthFactory.sendLicenseInfo
        (rateDriver.plate, "", "", "", "")) //modifier at end pulled from radio
        .then(() => $location.path('/userPage'))
        .catch(() => alert('Failed'))
    }
  });