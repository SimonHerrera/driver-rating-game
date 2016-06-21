angular.module('driving')
  .controller('RateDriverCtrl', function($location, RateDriverFactory, $http, AuthFactory) {
    const rateDriver = this;
    rateDriver.modifier = 0;

    console.log("Rate Driver Controller is Working" );

    rateDriver.sendRateInfo = function () {

        RateDriverFactory.sendRateInfo(rateDriver.plate, rateDriver.message)
        //need to send this info with userName, city, state, zip all empty
              //check if plate key exists add modifier if not create this record below

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
              AuthFactory.sendLicenseInfo(rateDriver.plate, "", "", "", "", rateDriver.modifier)
            }

          // console.log(snapshot.val() );
          // console.log(rateDriver.plate );

          })
        })//modifier at end pulled from radio button

        .then(() => $location.path('/userPage'))
        .catch(() => alert('Failed'))
    }
  });