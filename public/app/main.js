// angular.module('driving', ['ngRoute']);
angular.module('driving', ['ui.bootstrap', 'ngRoute'])

//bottom of page

$('#logout').click(function() {
  console.log("running sign out function" );
  firebase.auth().signOut();
});