angular.module('driving')
  .controller('UserPageCtrl', function(AuthFactory, $timeout) {
    const userPage = this;



    var myUserId = AuthFactory.getUser();
    // console.log("my user id", myUserId);
    firebase.database().ref('license').orderByChild('uid').equalTo(myUserId).on('value', (snapshot) => {
      console.log("Satuday snapshot val from user page!!!", snapshot.val() );
      var currentUser = snapshot.val()
      //pass current

      for(var key in currentUser) {
        console.log("THIS IS CURRENT USER", currentUser );
        // console.log("Show the currentUser", currentUser[key].userName);
        userPage.userName = currentUser[key].userName;
        userPage.plate = currentUser[key].plate;
        userPage.score = currentUser[key].score;

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
