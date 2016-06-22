angular.module('driving')
  .controller('UserPageCtrl', function(AuthFactory) {
    console.log("User Page Controller is Working" );
    const userPage = this;

//need to pull these things to populate page


    userPage.userName = "***how to pull userName from Firebase***"
    userPage.plateNum = "***plateID from Firebase***";
    userPage.score = "***score from Firebasae***";
    userPage.rank = "***rank# from Firebase***";


    // var myUserId = firebase.auth().currentUser.uid;
    // var currentUserName = firebase.database().ref('license/' + myUserId).orderByChild('userName');
    // console.log("currentUserName", currentUserName);

    //works - shows current user id
    // var myUserId = firebase.auth().currentUser.uid;
    // console.log("Show User ID", myUserId );



    var myUserId = firebase.auth().currentUser.uid;
    firebase.database().ref('license/' + myUserId + 'userName').equalTo(myUserId).once('value', (snapshot) => {
    var currentUserName = snapshot.val()
    console.log("currentUserName", currentUserName);
    });
    //show all messages below - buttons will be in a fixed footer
  });