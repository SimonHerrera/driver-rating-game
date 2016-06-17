angular.module('driving')
  .controller('UserPageCtrl', function() {
    console.log("User Page Controller is Working" );
    const userPage = this;

    userPage.plateNum = "***plateID from FB***";
    userPage.score = "***score from FB***";
    userPage.rank = "***rank# from FB***";
  });