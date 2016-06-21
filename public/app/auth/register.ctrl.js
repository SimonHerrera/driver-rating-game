angular.module('driving')
  .controller('RegisterCtrl', function ($location, AuthFactory) {
    const register = this;
    console.log("Register Controller is Working" );

    register.sendRegInfo = function () {
      //no matter what - register this email and password
      AuthFactory.sendRegInfo(register.email, register.password)
      //IF input plate exits - Only add to UserName, City, State, Zip (plate and score remain)
      //new code starts on line 11
      .then(() => {
        firebase.database().ref('license').orderByChild('plate').equalTo(register.plate).once('value', (snapshot) => {
          var foundPlate = snapshot.val()//need.val()?
          if (foundPlate) { //could call method in AuthFactory - right?
            for (var key in foundPlate) {
              AuthFactory.updateLicenseInfo
              (key, register.userName, register.city, register.state, register.zip)
            }
          } else {
            //ELSE - do a full registration and set score at 5000
            AuthFactory.sendLicenseInfo
            (register.plate, register.userName, register.city, register.state, register.zip, 0)
            .then(() => $location.path('/userPage'))
            .catch(() => alert('It appears you may already be registered!'))
          }
        })
      })
    }
  });