angular.module('users')
   .factory('Auth', ['$http', '$localStorage','urls', function ($http, $localStorage, urls) {
       function urlBase64Decode(str) {
           var output = str.replace('-', '+').replace('_', '/');
           switch (output.length % 4) {
               case 0:
                   break;
               case 2:
                   output += '==';
                   break;
               case 3:
                   output += '=';
                   break;
               default:
                   throw 'Illegal base64url string!';
           }
           return window.atob(output);
       }

       function getClaimsFromToken() {
           var token = $localStorage.token;
           var user = {};
           if (typeof token !== 'undefined') {
               var encoded = token.split('.')[1];
               user = JSON.parse(urlBase64Decode(encoded));
           }
           return user;
       }

       var tokenClaims = getClaimsFromToken();

       return {
           signin: function (data, success, error) {
               $http.post('/api/users/authenticate', data).success(success).error(error)
           },
           logout: function (success) {
               tokenClaims = {};
               delete $localStorage.token;
               success();
           },
           getTokenClaims: function () {
               return tokenClaims;
           }
       };
   }
   ]);

angular.module('users').factory('UserResource', function($resource) {
     return $resource('/api/users/:id'); // Note the full endpoint address
   });

angular.module('users')
  .factory('UserService',['UserResource','popupService','$localStorage','$location',
    function(UserResource,popupService,$localStorage,$location){
        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
  }

  function getClaimsFromToken() {
      var token = $localStorage.token;
      var user = {};
      if (typeof token !== 'undefined') {
          var encoded = token.split('.')[1];
          user = JSON.parse(urlBase64Decode(encoded));
      }
      return user;
  }

  var tokenClaims = getClaimsFromToken();

  return {
      signup: function (data, success, error) {
          var user = new UserResource(data);
          user.$save(success,error);
      },
      get: function(userId, success,error){
          console.log("userid is"+userId);
          if(userId!=undefined)
            UserResource.get({id:userId},success,error);
          else{
              if (popupService.showPopup('Login to Continue')) {
                    $location.path("/users/signin");
          }
      }},
      getTokenClaims: function () {
          return tokenClaims;
      }
  };
}]);
