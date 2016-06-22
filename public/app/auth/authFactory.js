angular.module('driving')
  .factory('AuthFactory', function($timeout, $location, $http) {
    let currentUser = null

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        currentUser = user.uid
        console.log("show user",user.uid);
        $location.path('/userPage')
      } else {
        currentUser = null
        console.log("logged out")
        $location.path('/');
      }
    });


    return {
      login (email, password) {
        return $timeout().then(() => (
          firebase.auth().signInWithEmailAndPassword(email, password)
        ))
      },

      sendRegInfo (email, password) {
        return $timeout().then(() => (
        firebase.auth().createUserWithEmailAndPassword(email, password)
        ))
      },
      //items passed into fn below are put into licenseObj and sent to firebase
      sendLicenseInfo(plate, userName, city, state, zip, modifier, uid) { console.log("here is plate", plate);
        var licenseObj = {
          plate: plate,
          userName: userName,
          city: city,
          state: state,
          zip: zip,
          score: 5000 + modifier,
          uid: uid
        } //tried a put wanting it to update but it created a new entry - postman updates empty fields
        console.log(licenseObj );
        return $http.post('https://hows-my-driving-65bc4.firebaseio.com/license.json', licenseObj)

      },

      updateLicenseInfo(key, userName,city, state, zip) {
        var updateLicenseObj = {
          userName: userName,
          city: city,
          state: state,
          zip: zip,
          uid: currentUser
        }
        $http.patch(`https://hows-my-driving-65bc4.firebaseio.com/license/${key}.json`, updateLicenseObj)
      },

      getUser () {
        console.log("hey, this is the currentUser", currentUser );
        return currentUser
      }

      // getUserAuth: function() {
      //   return $q.when(firebase.auth().currentUser);
      // }

    }
  })



