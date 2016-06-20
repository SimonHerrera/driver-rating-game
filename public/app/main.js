angular.module('driving', ['ngRoute']);

//bottom of page

$('#logout').click(function() {
  console.log("running sign out function" );
  firebase.auth().signOut();
});