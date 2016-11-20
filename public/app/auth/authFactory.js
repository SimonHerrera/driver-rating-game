angular.module('driving')
  .factory('AuthFactory', function($timeout, $location, $http) {
    let currentUser = null

    // Checks if user is = user id and allows access to userPage
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        currentUser = user.uid;
        console.log("show Firebase currentUser",user.uid);
        $location.path('/userPage');
      } else {
        console.log("logged out");
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
      //These items passed into below are put into licenseObj and sent to firebase
      sendLicenseInfo(plate, userName, city, state, zip, modifier, uid) {
        var licenseObj = {
          plate: plate,
          userName: userName,
          city: city,
          state: state,
          zip: zip,
          score: 5000 + modifier,
          uid: uid
        }
        return $http.post('https://hows-my-driving-65bc4.firebaseio.com/license.json', licenseObj)

      },

      updateLicenseInfo(key, userName, city, state, zip) {
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
        //currentUSer - this is getting the current firebaseUser
        return currentUser;
      },

      // remove these keys
      deleteUserLicenseInfo(delkey, userName, city, state, zip, uid) {
        var deleteUserObj = {
          userName: userName,
          city: city,
          state: state,
          zip: zip,
          uid: uid
        }
        return $http.patch(`https://hows-my-driving-65bc4.firebaseio.com/license/${delkey}.json`, deleteUserObj)
        // deleteFirebaseUser()
      },

      deleteFirebaseUser() {
        var user = firebase.auth().currentUser;
        user.delete()
          $location.path('/')
      }
    }
  })



