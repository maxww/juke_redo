juke.directive("player", function (PlayerFactory) {
    return {
        restrict: "E",
        templateUrl: "/js/player/templates/player.html",
        link: function (s, e, a) {
            angular.extend(s, PlayerFactory);
            s.toggle = function () {
                if (PlayerFactory.isPlaying()) PlayerFactory.pause();
                else PlayerFactory.resume();
            };

            s.getPercent = function () {
                return PlayerFactory.getProgress() * 100;
            };
        }
    }
})
