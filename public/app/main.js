// angular.module('driving', ['ngRoute']);
angular.module('driving', ['ui.bootstrap', 'ngRoute'])

//bottom of page

$('#logout').click(function() {
  console.log("running sign out function" );
  firebase.auth().signOut();
});

// function changePlateToUpperCase(t) {
//    var eleVal = document.getElementById(t.id);
//    eleVal.value= eleVal.value.trim().charAt(0).toUpperCase()
//    + eleVal.value.trim().charAt(1).toUpperCase()
//    + eleVal.value.trim().slice(2).toLowerCase().replace("o", "0").substring(0, 8);
// }

function changePlateToUpperCase(t) {
   var eleVal = document.getElementById(t.id);
    eleVal.value = eleVal.value.toUpperCase().replace("O", "0").substring(0, 10);
    eleVal.value = eleVal.value.replace(/(?:\b)(\w)/g, function(str, p1)
      { return p1.toUpperCase()})
}

function changeToUpperCase(t) {
   var eleVal = document.getElementById(t.id);
   eleVal.value= eleVal.value.trim().charAt(0).toUpperCase()
   + eleVal.value.trim().slice(1).toLowerCase();
}


function changeToUpperCaseCity(t) {
  var eleVal = document.getElementById(t.id);
    eleVal.value = eleVal.value.toLowerCase();
    eleVal.value = eleVal.value.replace(/(?:\b)(\w)/g, function(str, p1)
      { return p1.toUpperCase()})
}

// function changeToUpperCaseCity(t) {
//    var eleVal = document.getElementById(t.id);
//     eleVal.value = eleVal.value.toLowerCase().split(' ').map(i => i[0].toUpperCase()
//     + i.substring(1)).join(' ');
// }

function changeToUpperCaseState(t) {
  var eleVal = document.getElementById(t.id);
    eleVal.value = eleVal.value.toLowerCase();
    eleVal.value = eleVal.value.replace(/(?:\b)(\w)/g, function(str, p1)
      { return p1.toUpperCase()})
}

function changeZipCode(t) {
   var eleVal = document.getElementById(t.id);
   eleVal.value= eleVal.value.trim().substring(0, 5);
}


