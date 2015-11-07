var api_key = 'key-b19a57ae6f2fdd5888e187726fb0536f';
var domain = 'sandbox87987b79f80d4a16a0ae63c55c39934e.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


exports.sendMail = function(data, callback){
  var obj = {
    from: data.sender || "noreply-housie@gmail.com",
    to: data.receiver,
    subject: 'Lets play Housie',
    text: 'Enter code : ' + data.gameId + ' to join the game.'
  };

  mailgun.messages().send(obj, function (error, body) {
    console.log(">>>>>>>>>>>>>>", error,body);
    if(error)
    callback(error, null);
    else
    callback(null, body);
  });
};
