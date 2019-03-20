angular.module('usAutocomplete', [])
.controller('usAutocompleteCtrl',function($scope) {
  $scope.auth = {
    // Get the website key value from one of your API keys on your SmartyStreets account page. 
    // Make sure the key has a host name that matches the URL or IP Address you are calling it from.
    websiteKey: ""
  };

  $scope.input = {
    value: "1080 Pasito"
  };

  $scope.suggestions = [];

  $scope.SmartyStreetsCall = function(input, auth) {
    // set up the client with the website key
    var SmartyStreetsCore = SmartyStreetsSDK.core;
    var websiteKey = new SmartyStreetsCore.SharedCredentials(auth.websiteKey);
    var clientBuilder = new SmartyStreetsCore.ClientBuilder(websiteKey);
    var client = clientBuilder.buildUsAutocompleteClient();

    // create the lookup
    var Lookup = SmartyStreetsSDK.usAutocomplete.Lookup;
    var lookup = new Lookup(input.value);

    // send the lookup
    client.send(lookup)
      .then(handleSuccess)
      .catch(handleError);
  }

  function handleSuccess(response) {
    // displays the suggestions for autocompleting the text provided
    $scope.suggestions = response.result;
    $scope.$apply();
  }

  function handleError(response) {
    console.log(response)
  }
});
