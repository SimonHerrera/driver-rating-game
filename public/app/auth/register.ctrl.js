angular.module('driving')
  .controller('RegisterCtrl', function ($location, AuthFactory) {
    const register = this;

    register.sendRegInfo = function () {
      //no matter what - register this email and password
      AuthFactory.sendRegInfo(register.email, register.password)
      //IF input plate exits - Only add to UserName, City, State, Zip (plate and score remain)
      //new code starts on line 11
      .then(() => {
        firebase.database().ref('license').orderByChild('plate').equalTo(register.plate).once('value', (snapshot) => {
          var foundPlate = snapshot.val()
          if (foundPlate) {
            console.log("IF FOUND PLATE SHOW OBJ", foundPlate );//then says currentUid not defined
            // console.log("SHOW ME CURRENT UID", currentUid );
            for (var key in foundPlate) {
              AuthFactory.updateLicenseInfo
              (key, register.userName, register.city, register.state, register.zip)
            }
          } else {
            //ELSE - do a full registration and set score at 5000
            AuthFactory.sendLicenseInfo
            (register.plate, register.userName, register.city, register.state, register.zip, 0, AuthFactory.getUser())
            .then(() => $location.path('/userPage'))
            .catch(() => alert('It appears you may already be registered!'))
          }
        })
      })
    },

    register.deleteAccount = function() {
      var myUserId = AuthFactory.getUser();
      firebase.database().ref('license').orderByChild('uid').equalTo(myUserId).once('value', (snapshot) => {
      var currentUserObj = snapshot.val()
        console.log("SUNDAY currentUserObj", currentUserObj );

        for (var delkey in currentUserObj) {
          AuthFactory.deleteUserLicenseInfo
          (delkey, "", "City-NA", "State-NA", "Zip-NA", "")
          .then(() => $location.path('/'))
          .catch(() => alert('Uhhm, not working'))
        }
    })

      AuthFactory.deleteFirebaseUser()
    }
  });