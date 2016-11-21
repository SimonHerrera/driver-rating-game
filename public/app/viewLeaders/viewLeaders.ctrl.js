angular.module('driving')
  .controller('ViewLeadersCtrl', function(AuthFactory, $timeout) {
      const viewLeaders = this;

    console.log("ViewLeaders Controller is Working" );
    var myUserId = AuthFactory.getUser();
    console.log("my currentUid OR myUserId", myUserId);
    firebase.database().ref('license').orderByChild('uid').equalTo(myUserId).on('value', (snapshot) => {
      // console.log("Satuday snapshot val from user page!!!", snapshot.val() );
      var currentUserObj = snapshot.val()
      //pass current

      for(var key in currentUserObj) {
        console.log("THIS IS CURRENT APP Object", currentUserObj );
        console.log("Show the currentUser", currentUserObj[key].userName);
        viewLeaders.userName = currentUserObj[key].userName;
        viewLeaders.plate = currentUserObj[key].plate;
        viewLeaders.score = currentUserObj[key].score;

          firebase.database().ref('license').orderByChild('score').on('value', (snapshot) => {
              var leaderScoresObj = snapshot.val();
              // viewLeaders.score = leaderScores
              console.log("HERE ARE YOUR LEADERS!!!", leaderScoresObj );

              var licenseScoresArray = $.map(leaderScoresObj, function(value, index) {
                return [value];
              });
              // console.log("CHECK THIS OUT", array);
              viewLeaders.leaderData = licenseScoresArray
          $timeout()
          });
      }
    });
  });
