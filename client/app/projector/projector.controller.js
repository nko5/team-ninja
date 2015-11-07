'use strict';

angular.module('teamNinjaApp')
    .controller('ProjectorCtrl', function (Veronica, GameApi, $interval,$scope,User,Auth,$timeout) {
        var self = this;
        self.number;
        $scope.showMessage = false;

        $scope.getCurrentUser = Auth.getCurrentUser;

        GameApi.list(function(data){
            self.game = data.games[0];
            startCalling();
        });

        var promise;

        var startCalling = function () {
            if (!promise) {
                promise = $interval(callNumber, 1000);
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
    }
    });
