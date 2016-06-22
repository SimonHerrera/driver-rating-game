angular.module('driving')
  .factory('AuthFactory', function($timeout, $location, $http) {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
        $location.path('/userPage')
      } else {
        console.log("logged out")
        $location.path('/');
      }
    });

    let currentUser = null

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
      sendLicenseInfo(plate, userName, city, state, zip, modifier) { console.log("here is plate", plate);
        var licenseObj = {
          plate: plate,
          userName: userName,//should camelcase?
          city: city,
          state: state,
          zip: zip,
          score: 5000 + modifier
        } //tried a put wanting it to update but it created a new entry - postman updates empty fields
        return $http.post('https://hows-my-driving-65bc4.firebaseio.com/license.json', licenseObj)
      },

      updateLicenseInfo(key, userName,city, state, zip) {
        var updateLicenseObj = {
          userName: userName,
          city: city,
          state: state,
          zip: zip
        }
        $http.patch(`https://hows-my-driving-65bc4.firebaseio.com/license/${key}.json`, updateLicenseObj)
      }

      // getUser () {
      //   // return currentUser
      //   return firebase.auth().currentUser
      // }

      // getUserAuth () {
      //   return $q.when(firebase.auth().currentUser);
      // }
    }
  })



