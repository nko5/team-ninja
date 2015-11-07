var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var request = require('request');

exports.setup = function (User, config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL,
        profileFields: ['id', 'emails', 'displayName']
    },
    function (accessToken, refreshToken, profile, done) {
      request({
        url: 'https://graph.facebook.com/v2.5/' + profile.id + '/picture?redirect=false&access_token=' + accessToken,
        headers: {
          'Accept': "application/json"
        }
      }, function (error, response, body) {

        var userObj = {
          name: profile.displayName,
          email: profile.emails[0].value,
          role: 'user',
          username: profile.username,
          provider: 'facebook',
          facebook: {
            id: profile.id
          }
        };
        if (!error && response.statusCode == 200) {
          userObj.profile_image_icon = JSON.parse(body).data.url;
        }

        User.findOne({
            'facebook.id': profile.id
          },
          function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              user = new User(userObj);
              user.save(function (err) {
                if (err) return done(err);
                done(err, user);
              });
            } else {
              return done(err, user);
            }
          });
      })
    })
  )
};

