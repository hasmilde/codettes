angular.module('starter.services', [])
    .factory('dataService', ['$q', '$http', dataService]);

function dataService($q, $http) {
    var self = this;
    var recipeIsRetrieved = false;
    var sustainabilityIsRetrieved = false;

    return {
        getMeal: getMeal,
        getUser: getUser,
        getRecipeIsRetrieved: getRecipeIsRetrieved,
        setRecipeIsRetrieved: setRecipeIsRetrieved,
        getSustainabilityIsRetrieved: getSustainabilityIsRetrieved,
        setSustainabilityIsRetrieved: setSustainabilityIsRetrieved
    };

    function getMeal() {
        var deferred = $q.defer();
        $http.get('json/lasagna.json')
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function getUser() {
        var deferred = $q.defer();
        $http.get('json/user.json')
            .success(function(data) {
                deferred.resolve(data);
            })
            .error(function(data) {
                deferred.reject(data);
            });
        return deferred.promise;
    }

    function getRecipeIsRetrieved () {
        return recipeIsRetrieved;
    }

    function setRecipeIsRetrieved (val) {
        recipeIsRetrieved = val;
    }

    function getSustainabilityIsRetrieved () {
        return sustainabilityIsRetrieved;
    }

    function setSustainabilityIsRetrieved (val) {
        sustainabilityIsRetrieved = val;
    }
}
