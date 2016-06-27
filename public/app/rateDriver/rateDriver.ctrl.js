angular.module('driving')
  .controller('RateDriverCtrl', function($location, RateDriverFactory, $http, AuthFactory) {
    const rateDriver = this;
    rateDriver.modifier = 0;

    rateDriver.sendRateInfo = function () {
//*check to see if current user is typing their plate*
        //no matter what - send plate and message to messages using RateDriverFactory
        RateDriverFactory.sendRateInfo(rateDriver.plate, rateDriver.message)
        //then check IF plate key exists and add modifier or run ELSE
        .then(() => {
          firebase.database().ref('license').orderByChild('plate').equalTo(rateDriver.plate).once('value', (snapshot) => {
            var foundUser = snapshot.val()

            if (foundUser) {
              for (var key in foundUser) {
                $http.patch(`https://hows-my-driving-65bc4.firebaseio.com/license/${key}.json`, {
                  score: foundUser[key].score + rateDriver.modifier
                })
              }
            } else { //Create this record with empty values and a plate and score
              //send this with userName, city, state, zip, uid all empty
              AuthFactory.sendLicenseInfo(rateDriver.plate, "", "", "", "", rateDriver.modifier, "")
            }
          })
        })
        .then(() => $location.path('/userPage'))
        .catch(() => alert('Failed'))
    }
  });