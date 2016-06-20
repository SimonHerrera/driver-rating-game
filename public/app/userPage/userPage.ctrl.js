angular.module('driving')
  .controller('UserPageCtrl', function(AuthFactory) {
    console.log("User Page Controller is Working" );
    const userPage = this;

    userPage.userName = "***userName from Firebase***"
    userPage.plateNum = "***plateID from Firebase***";
    userPage.score = "***score from Firebasae***";
    userPage.rank = "***rank# from Firebase***";
  });