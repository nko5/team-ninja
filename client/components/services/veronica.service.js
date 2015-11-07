'use strict';

angular.module('teamNinjaApp')
    .service('VeronicaService', function () {
        var self = this;
        var veronica = new SpeechSynthesisUtterance("");
        var voiceArr = speechSynthesis.getVoices();
        veronica.voice = voiceArr[2];


        var _splitMessage = function (message) {
            var arr = message.split(" ");
            var chunks = [];
            var text = "";
            arr.forEach(function (word) {
                if ((text.length + word.length) < 160) {
                    text += (word + " ");
                } else {
                    chunks.push(text);
                    text = word + " ";
                }

            });
            chunks.push(text);
            return chunks;

        };

        self.say = function (message) {
            var chunks = _splitMessage(message) || [];
            chunks.forEach(function (message) {
                veronica.text = message;
                window.speechSynthesis.speak(veronica);
            });
        };

    });
