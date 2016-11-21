angular.module('driving')
  .factory('RateDriverFactory', function($timeout, $location, $http) {

    return {

      // sendRateInfo(ratedPlate, autoMessage, userMessage) {
      sendRateInfo(ratedPlate, ratedMessage, messageTime) {
      var messageObj = {
        plate: ratedPlate,
        message: ratedMessage,
        time: messageTime
        }

      return $http.post('https://hows-my-driving-65bc4.firebaseio.com/messages.json', messageObj)
      }
    }


  });