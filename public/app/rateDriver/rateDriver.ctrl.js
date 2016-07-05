angular.module('driving')
  .controller('RateDriverCtrl', function($location, RateDriverFactory, $http, AuthFactory) {
    const rateDriver = this;
    rateDriver.modifier = 0;

    console.log("Search Driver Controller is Working" );
    var myUserId = AuthFactory.getUser();
    console.log("my currentUid OR myUserId", myUserId);
    firebase.database().ref('license').orderByChild('uid').equalTo(myUserId).on('value', (snapshot) => {
      // console.log("Satuday snapshot val from user page!!!", snapshot.val() );
      var currentUserObj = snapshot.val()
      //pass current

      for(var key in currentUserObj) {
        console.log("THIS IS CURRENT APP Object", currentUserObj );
        console.log("Show the currentUser", currentUserObj[key].userName);
        rateDriver.userName = currentUserObj[key].userName;
        rateDriver.plate = currentUserObj[key].plate;
        rateDriver.score = currentUserObj[key].score;
          // $timeout() - This is causing an error - but still works
      }
    });

    rateDriver.sendRateInfo = function () {
      //check to see if current user is typing their plate*
      if (rateDriver.plate === rateDriver.plate1){
        rateDriver.plate1 = "";
        rateDriver.message = "";
        alert("Nice Try, you cannot rate your own driving!");
      } else {

        //no matter what - send plate and message to messages using RateDriverFactory
        let messageTimeStamp = new Date();
        messageTimeStamp = messageTimeStamp.toDateString()
        console.log("SHOW UPDATE TIME VAR", messageTimeStamp );
        RateDriverFactory.sendRateInfo(rateDriver.plate1, rateDriver.message, messageTimeStamp)

        //then check IF plate key exists and add modifier or run ELSE
        .then(() => {
          firebase.database().ref('license').orderByChild('plate').equalTo(rateDriver.plate1).once('value', (snapshot) => {
            var foundUser = snapshot.val()

            if (foundUser) {
              for (var key in foundUser) {
                $http.patch(`https://hows-my-driving-65bc4.firebaseio.com/license/${key}.json`, {
                  score: foundUser[key].score + rateDriver.modifier
                })
              }
            } else { //Create this record with empty values and a plate and score
              //send this with userName, city, state, zip, uid all empty
              AuthFactory.sendLicenseInfo(rateDriver.plate1, "", "City-NA", "State-NA", "Zip-NA", rateDriver.modifier, "")
            }
          })
        })
        .then(() => $location.path('/userPage'))
        .catch(() => alert('Failed'))
      }
    }
  });