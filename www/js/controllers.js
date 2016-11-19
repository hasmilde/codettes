angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, dataService) {

    $scope.getEnergy = getEnergy;
    $scope.getNutrients = getNutrients;
    $scope.changeMeal = changeMeal;
    $scope.getMeal = getMeal;

    dataService.getUser().then(function(res) {
        $scope.user = res;
        getEnergy($scope.user)
    })

    function getEnergy(user) {
        var restEnergy;

        if (user.gender === 'f') {
            restEnergy = 447.593 + (9.247 * user.weight) + (3.098 * user.length) - (4.33 * user.age);
        } else {
            restEnergy = 88.362 + (13.397 * user.weight) + (4.799 * user.length) - (5.677 * user.age);
        }

        user.energy = Math.floor(restEnergy * user.PAL) + parseInt(user.diet);
        user.breakfast = user.energy * 0.25;
        user.lunch = user.energy * 0.25;
        user.diner = user.energy * 0.25;
        user.rest = user.energy * 0.25;

        getNutrients()
    }

    function getNutrients() {
        var user = $scope.user;
        if (user.body == 'muscle') {
            user.carbs = Math.floor(user.energy * 0.50 * 0.25);
            user.fat = Math.floor(user.energy * 0.20 * 0.11);
            user.protein = Math.floor(user.energy * 0.30 * 0.25);
        } else if (user.body == 'fat') {
            user.carbs = Math.floor(user.energy * 0.17 * 0.25);
            user.fat = Math.floor(user.energy * 0.37 * 0.11);
            user.protein = Math.floor(user.energy * 0.46 * 0.25);
        } else {
            user.carbs = Math.floor(user.energy * 0.40 * 0.25);
            user.fat = Math.floor(user.energy * 0.30 * 0.11);
            user.protein = Math.floor(user.energy * 0.30 * 0.25);
        }
    }

    function changeMeal(meal) {
        if (meal == 'b') {
            $scope.user.lunch = Math.floor(($scope.user.energy - $scope.user.breakfast) / 3);
            $scope.user.diner = Math.floor(($scope.user.energy - $scope.user.breakfast) / 3);
            $scope.user.rest = Math.floor(($scope.user.energy - $scope.user.breakfast) / 3);
        } else if (meal == 'l') {
            $scope.user.diner = Math.floor(($scope.user.energy - $scope.user.breakfast - $scope.user.lunch) / 2);
            $scope.user.rest = Math.floor(($scope.user.energy - $scope.user.breakfast - $scope.user.lunch) / 2);
        } else if (meal == 'd') {
            $scope.user.rest = Math.floor($scope.user.energy - $scope.user.breakfast - $scope.user.lunch - $scope.user.diner);
        } else {
            $scope.user.lunch = Math.floor(($scope.user.energy - $scope.user.rest) / 3);
            $scope.user.diner = Math.floor(($scope.user.energy - $scope.user.rest) / 3);
            $scope.user.breakfast = Math.floor(($scope.user.energy - $scope.user.rest) / 3);
        }
    }

    function getMeal() {
      dataService.getMeal($scope.user, $scope.meal).then(function(res){
        $scope.recipe = res;
      })
    }
})

.controller('ChatsCtrl', function($scope, dataService) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    dataService.all().then(function(res) {
        $scope.chats = res;
    });

    $scope.remove = function(chat) {
        dataService.remove(chat);
    };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, dataService) {
    $scope.chat = dataService.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
