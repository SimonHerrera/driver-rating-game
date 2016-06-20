angular.module('driving')
  .controller('RateDriverCtrl', function($location, RateDriverFactory) {
    const rateDriver = this;

    console.log("Rate Driver Controller is Working" );

    rateDriver.sendRateInfo = function () {
      // RateDriverFactory.sendRateInfo(rateDriver.plate, rateDriver.autoMessage, rateDriver.userMessage)
        RateDriverFactory.sendRateInfo(rateDriver.plate, rateDriver.message)
        .then(() => $location.path('/userPage'))
        .catch(() => alert('Failed'))
    }
  });