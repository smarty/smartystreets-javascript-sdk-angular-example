angular.module('usAutocomplete', [])
.controller('usAutocompleteCtrl',function($scope) {
  $scope.auth = {
    // Get the website key value from one of your API keys on your Smarty account page.
    // Make sure the key has a host name that matches the URL or IP Address you are calling it from.
    websiteKey: ""
  };

  $scope.input = {
    value: "1080 Pasito"
  };

  $scope.suggestions = [];

  $scope.SmartyCall = function(input, auth) {
    // set up the client with the website key
    var SmartyCore = SmartySDK.core;
    var websiteKey = new SmartyCore.SharedCredentials(auth.websiteKey);
    var clientBuilder = new SmartyCore.ClientBuilder(websiteKey);
    var client = clientBuilder.buildUsAutocompleteClient();

    // create the lookup
    var Lookup = SmartySDK.usAutocomplete.Lookup;
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
