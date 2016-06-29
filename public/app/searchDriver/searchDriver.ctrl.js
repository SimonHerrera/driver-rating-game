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

    searchDriver.searchDriverInfo = function() {
      //could it be an input box that populates as you type, doubtful w firebase
      //check input and see IF any plates match the input
        //IF yes then Show that userName, and Score and
        //list messages just like on the user page but for that plate
          //
        //THEN if no, then show a message saying - no plate matches and - display somehow and then clear seach
        firebase.database().ref('license').orderByChild('plate').equalTo(searchDriver.plate1).on('value', (snapshot) => {
            var searchedPlateObj = snapshot.val()
            console.log("SEARCHED DRIVER PLATE", searchedPlateObj );

          for(var key in searchedPlateObj) {
            console.log("THIS IS CURRENT APP Object", searchedPlateObj );
            console.log("Show UserName of Searched Plate", searchedPlateObj[key].userName);
            searchDriver.searchedUserName = searchedPlateObj[key].userName;
            searchDriver.searchedPlate = searchedPlateObj[key].plate;
            searchDriver.searchedScore = searchedPlateObj[key].score;

//new
            firebase.database().ref('messages').orderByChild('plate').equalTo(searchDriver.searchedPlate).limitToLast(25).on('value', (snapshot) => {
              var searchedUserMessages = snapshot.val();
              console.log("user message", searchedUserMessages);
              // userPage.messages = searchedUserMessages (was old code before converting to array)
                var array = $.map(searchedUserMessages, function(value, index) {
                  return [value];
              });
              console.log("CHECK THIS OUT", array);
              searchDriver.messages = array

              $timeout()//move down 2 lines
            });
          }

        })
    }
  });