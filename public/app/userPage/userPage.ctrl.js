angular.module('driving')
  .controller('UserPageCtrl', function(AuthFactory, $timeout) {
    console.log("User Page Controller is Working" );
    const userPage = this;


    var myUserId = AuthFactory.getUser();
    console.log("my user id", myUserId);
    firebase.database().ref('license').orderByChild('uid').equalTo(myUserId).on('value', (snapshot) => {
      console.log("snapshot", snapshot.val() );
      var currentUser = snapshot.val()
      for(var key in currentUser) {
        console.log("Show the currentUser", currentUser[key].userName);
        userPage.userName = currentUser[key].userName;
        userPage.plate = currentUser[key].plate;
        userPage.score = currentUser[key].score;

        firebase.database().ref('messages').orderByChild('plate').equalTo(userPage.plate).on('value', (snapshot) => {
          console.log("this is user plate snapshot", snapshot.val() );
          var currentUserMessages = snapshot.val();

          userPage.messages = currentUserMessages[key].plate

          // for(var key in currentUserPlate) {
          //   console.log("Here are your messages", currentUserPlate[key].plate);
          //   userPage.plate = currentUserPlate[key].plate;
          // }
            $timeout()
        });
      }
    });

    // var myUserPlate = AuthFactory.getUser() - currentuser;
    // console.log("user plate", myUserPlate );

    //Lookinging License at plate, will always = itself - Do I need to look in messages at license.plate
    //and IF messages.plate = license.plate THEN display messages.message

    //buttons will be in a fixed footer
  });
