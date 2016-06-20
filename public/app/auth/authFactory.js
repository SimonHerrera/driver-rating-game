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
      sendLicenseInfo(plate, userName, city, state, zip) { console.log("here is plate", plate);
        var licenseObj = {
          plate: plate,
          userName: userName,//should camelcase?
          city: city,
          state: state,
          zip: zip
        } //tried a put wanting it to update but it created a new entry - postman updates empty fields
        $http.post('https://hows-my-driving-65bc4.firebaseio.com/license.json', licenseObj)
      }


      //this allows to tie current user to rate and reg ctrl
      //which will create username, state, zip, city and then
      //in ctrl creates and calls rate or reg factory
      //rate or reg factory will do an $http Post
      //see new pin ctrl and factory
      // getUser () {
      //   // return currentUser
      //   return firebase.auth().currentUser
      // }

      // getUserAuth () {
      //   return $q.when(firebase.auth().currentUser);
      // }
    }
  })



