'use strict';

angular.module('teamNinjaApp')
    .service('Veronica', function () {
        var self = this;
        var veronica = new SpeechSynthesisUtterance("");
        var voiceArr = speechSynthesis.getVoices();
        veronica.rate = 0.8;
        veronica.lang = 'en-US';

        console.log(veronica.voice);


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

        self.say = function (message, delayedMessage) {
            var chunks = _splitMessage(message) || [];
            chunks.forEach(function (message) {
                veronica.text = message;
                veronica.onend = function () {
                    if(delayedMessage.length){
                        var item = delayedMessage.pop();
                        setTimeout(function(){
                            veronica.text = item.message;
                            window.speechSynthesis.speak(veronica);
                        }, item.delay)
                    }
                };
                window.speechSynthesis.speak(veronica);

            });
        };

    });
