angular.module('usStreet', [])
.controller('usStreetCtrl',function($scope) {
  $scope.auth = {
    // Get the website key value from one of your API keys on your SmartyStreets account page. 
    // Make sure the key has a host name that matches the URL or IP Address you are calling it from.
    websiteKey: ""
  };

  $scope.inputs = [{
      name: "street",
      value: "3214 n university"
    },
    {
      name: "city",
      value: "provo"
    },
    {
      name: "state",
      value: "ut"
    },
    {
      name: "zip",
      value: ""
    }
  ];

  $scope.SmartyStreetsCall = function(inputs, auth) {
    // set up the client with the website key
    var SmartyStreetsCore = SmartyStreetsSDK.core;
    var websiteKey = new SmartyStreetsCore.SharedCredentials(auth.websiteKey);
    var clientBuilder = new SmartyStreetsCore.ClientBuilder(websiteKey);
    var client = clientBuilder.buildUsStreetApiClient();

    // create the lookup
    var Lookup = SmartyStreetsSDK.usStreet.Lookup;
    var lookup = new Lookup();

    // assign values to the lookup
    lookup.street = inputs[0].value;
    lookup.city = inputs[1].value;
    lookup.state = inputs[2].value;
    lookup.zipCode = inputs[3].value;

    // create a new batch and add the lookup to it
    var batch = new SmartyStreetsCore.Batch();
    batch.add(lookup);

    // send the batch
    client.send(batch)
      .then(handleSuccess)
      .catch(handleError);
  }

  function handleSuccess(response) {
    // Updates the inputs with the correct spelling, punctuation, and other validated values.
    // Will also fill in the missing zipcode value.
    $scope.inputs[0].value = response.lookups[0].result[0].deliveryLine1;
    $scope.inputs[1].value = response.lookups[0].result[0].components.cityName;
    $scope.inputs[2].value = response.lookups[0].result[0].components.state;
    $scope.inputs[3].value = response.lookups[0].result[0].components.zipCode;
    $scope.$apply();
  }

  function handleError(response) {
    console.log(response)
  }
});
