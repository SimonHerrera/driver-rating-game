angular.module('driving')
  .controller('RateDriverCtrl', function($location, RateDriverFactory, $http, AuthFactory) {
    const rateDriver = this;
    rateDriver.modifier = 0;

    console.log("Rate Driver Controller is Working" );

    rateDriver.sendRateInfo = function () {
        //no matter what - send plate and message to messages
        RateDriverFactory.sendRateInfo(rateDriver.plate, rateDriver.message)
        //then check IF plate key exists add modifier if not run ELSE create this record below
        .then(() => {
          firebase.database().ref('license').orderByChild('plate').equalTo(rateDriver.plate).once('value', (snapshot) => {
            var foundUser = snapshot.val()
            if (foundUser) {
              for (var key in foundUser) {
                $http.patch(`https://hows-my-driving-65bc4.firebaseio.com/license/${key}.json`, {
                  score: foundUser[key].score + rateDriver.modifier
                })
              }
            } else {
              //need to send this info with userName, city, state, zip all empty
              AuthFactory.sendLicenseInfo(rateDriver.plate, "", "", "", "", rateDriver.modifier)
            }
          // console.log(snapshot.val() );
          // console.log(rateDriver.plate );
          })
        })
        .then(() => $location.path('/userPage'))
        .catch(() => alert('Failed'))
    }
  });