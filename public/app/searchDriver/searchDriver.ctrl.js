angular.module('driving')
  .controller('SearchDriverCtrl', function(AuthFactory, $timeout) {
    const searchDriver = this;
    searchDriver.someVar = false;

    console.log("Search Driver Controller is Working" );
    var myUserId = AuthFactory.getUser();
    console.log("my currentUid OR myUserId", myUserId);
    firebase.database().ref('license').orderByChild('uid').equalTo(myUserId).on('value', (snapshot) => {
      // console.log("Satuday snapshot val from user page!!!", snapshot.val() );
      var currentUserObj = snapshot.val()
      //pass current

      for(var key in currentUserObj) {
        searchDriver.userName = currentUserObj[key].userName;
        searchDriver.plate = currentUserObj[key].plate;
        searchDriver.score = currentUserObj[key].score;
          $timeout()
      }
    });

    searchDriver.searchDriverInfo = function() {
         //THEN if no, then show a message saying - no plate matches and - display somehow and then clear seach
        firebase.database().ref('license').orderByChild('plate').equalTo(searchDriver.plate1).on('value', (snapshot) => {
            var searchedPlateObj = snapshot.val()
        if (searchedPlateObj === null) {
          alert('THAT DRIVER DOES NOT EXITS')
        } else {
            searchDriver.someVar = true;
          for(var key in searchedPlateObj) {
            searchDriver.searchedUserName = searchedPlateObj[key].userName;
            searchDriver.searchedPlate = searchedPlateObj[key].plate;
            searchDriver.searchedScore = searchedPlateObj[key].score;
        }

//new
            firebase.database().ref('messages').orderByChild('plate').equalTo(searchDriver.searchedPlate).limitToLast(25).on('value', (snapshot) => {
              var searchedUserMessages = snapshot.val();
              // userPage.messages = searchedUserMessages (was old code before converting to array)
                var array = $.map(searchedUserMessages, function(value, index) {
                  return [value];
              });
              searchDriver.messages = array

              $timeout()//move down 2 lines
            });
          }

        })
    }
  });