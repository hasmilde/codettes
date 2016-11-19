angular.module('starter.services', [])
    .factory('dataService', ['$q', '$http', dataService]);

function dataService($q, $http) {
    var self = this;

    return {
        getMeal: getMeal,
        getUser: getUser
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
}
