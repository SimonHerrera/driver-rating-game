angular.module('driving')
  .controller('SearchDriverCtrl', function(AuthFactory, $timeout) {
    const searchDriver = this;

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
        searchDriver.userName = currentUserObj[key].userName;
        searchDriver.plate = currentUserObj[key].plate;
        searchDriver.score = currentUserObj[key].score;
          $timeout()
      }
    });
  });