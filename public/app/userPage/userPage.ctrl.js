angular.module('driving')
  .controller('UserPageCtrl', function(AuthFactory, $timeout) {
    const userPage = this;



    var myUserId = AuthFactory.getUser();
    console.log("my currentUid OR myUserId", myUserId);
    firebase.database().ref('license').orderByChild('uid').equalTo(myUserId).on('value', (snapshot) => {
      console.log("Satuday snapshot val from user page!!!", snapshot.val() );
      var currentUserObj = snapshot.val()
      //pass current

      for(var key in currentUserObj) {
        console.log("THIS IS CURRENT APP Object", currentUserObj );
        console.log("Show the currentUser", currentUserObj[key].userName);
        userPage.userName = currentUserObj[key].userName;
        userPage.plate = currentUserObj[key].plate;
        userPage.score = currentUserObj[key].score;

        firebase.database().ref('messages').orderByChild('plate').equalTo(userPage.plate).on('value', (snapshot) => {
          // console.log("this is user plate snapshot", snapshot.val() );
          var currentUserMessages = snapshot.val();
          // console.log("user message", currentUserMessages);
          userPage.messages = currentUserMessages
            $timeout()
        });
      }
    });
  });
