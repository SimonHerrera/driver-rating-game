angular.module('driving')
  .factory('AuthFactory', function($timeout, $location, $http) {
    let currentUser = null
//* let currentUserObj = null


    firebase.auth().onAuthStateChanged(function(user) { console.log("state change running");
      if (user) {
        currentUser = user.uid;
//* currentUserObj = getCurrentUserObj();
        console.log("show Firebase currentUser",user.uid);
//* console.log("first currentUserObj", currentUserObj );
        $location.path('/userPage');
      } else {
        console.log("logged out");
        $location.path('/');
      }
    });

//*
    // function getCurrentUserObj() {
    // // var myUserId = AuthFactory.getUser();
    //   console.log("my currentUid OR myUserId", currentUser);
    //   firebase.database().ref('license').orderByChild('uid').equalTo(myUserId).on('value', (snapshot) => {
    //     // console.log("Satuday snapshot val from user page!!!", snapshot.val() );
    //     var currentUserObj = snapshot.val()
    //     console.log("AFTER GETCURRENTUSEROBJ RUNS", currentUserObj );
    //     return currentUserObj
    //   });
    // }


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

      updateLicenseInfo(key, userName, city, state, zip) { //somehow this was working, would just populate uid before
        var updateLicenseObj = {
          userName: userName,
          city: city,
          state: state,
          zip: zip,
          uid: currentUser //works but missing uid, I had made changes to UID was currentUser?
        }
        $http.patch(`https://hows-my-driving-65bc4.firebaseio.com/license/${key}.json`, updateLicenseObj)
      },

      getUser () {
        // console.log("hey, this is the currentUser!", currentUser );
        //this is getting the current firebaseUser
        return currentUser;
      },

      // getCurrentUserObj() {
      //   var myUserId = AuthFactory.getUser();
      //   console.log("my currentUid OR myUserId", myUserId);
      //   firebase.database().ref('license').orderByChild('uid').equalTo(myUserId).on('value', (snapshot) => {
      //     var currentUserObj = snapshot.val()
      //     console.log("TRY THIS NEW FUNCTION!!!", snapshot.val() );
      //     return currentUserObj;
      //   });
      // },

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



