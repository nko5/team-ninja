'use strict';

angular.module('teamNinjaApp')
<<<<<<< HEAD
    .controller('ProjectorCtrl', function (VeronicaService, GameApi, $interval, $scope, AppConstants, SocketIO) {
        VeronicaService.say("yipikaye ahem ahem!");

=======
    .controller('ProjectorCtrl', function (Veronica, GameApi, $interval,$scope,User,Auth,$timeout,$stateParams) {
>>>>>>> fe23a099f2926f522520807c8979dae596090649
        var self = this;
        self.number;
        $scope.showMessage = false;

        $scope.getCurrentUser = Auth.getCurrentUser;

        GameApi.get({id:$stateParams.id},function(data){
            self.game = data;
            startCalling();
        });

        var promise;

        var startCalling = function () {
            if (!promise) {
                promise = $interval(callNumber, 7000);
            }
        };

        var clearInterval = function () {
            $interval.cancel(promise);
        };

        var callNumber = function () {
            GameApi.callNumber({id: self.game._id}, function(number){
                self.number = number;
                Veronica.say(number.description, [{
                    delay: 1000,
                    message: number.inWords
                }]);
            });
        };

<<<<<<< HEAD
        $scope.$on("socket:" + AppConstants.Events.CHAT, function (evt, data) {
            console.log(data);
        });
=======
    $scope.sendInvite = function(user){
      console.log(user);
      if(user){
        User.invitePlayer({sender : user.email, receiver : $scope.inviteEmail, gameId:self.game._id}, function(result){
          $scope.showMessage = true;
          if(result.sent) {
            $scope.alertMessage = "Invite sent successfully.";
          }
          else{
            $scope.alertMessage = "Error sending invite. Please try again later.";
          }
          $timeout(function(){
            $scope.showMessage = false;
          },3000);
        });
      }
    };
>>>>>>> fe23a099f2926f522520807c8979dae596090649
    });
