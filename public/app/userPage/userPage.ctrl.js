angular.module('driving')
  .controller('UserPageCtrl', function(AuthFactory) {
    console.log("User Page Controller is Working" );
    const userPage = this;

//need to pull these things to populate page


    userPage.userName = "***how to pull userName from Firebase***"
    userPage.plateNum = "***plateID from Firebase***";
    userPage.score = "***score from Firebasae***";
    userPage.rank = "***rank# from Firebase***";
    //show all messages below - buttons will be in a fixed footer
  });