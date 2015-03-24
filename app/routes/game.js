import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Route.extend({
  deactivate: function() {
    // Delete and commit the deletion of the player in the store
    this.player.deleteRecord();
    this.player.save();
  },
  setupController: function(controller, game) {
    var self = this;
    this._super(controller, game);

    // Special Firebase location that tells us if we are connected
    var connectedRef = new Firebase('https://doublemafia.firebaseio.com/.info/connected');
    var gameRef = new Firebase('https://doublemafia.firebaseio.com/games/' + game.id);

    connectedRef.on('value', function(snap) {
      // Once we are connected ...
      if (snap.exists()) {
        // Create a reference to a player that 'belongsTo' a game
        // which will take care of the 'hasMany' relationship.
        // This doesn't actually add the player to the game

        self.player = controller.store.createRecord('player', {
          game: game
        });

        // Register a 'onDisconnect' handler that will remove the player
        // Do this before committing to prevent race conditions where user disconnects before save
        var innerPlayerRef = gameRef.child('players/' + self.player.id);
        var playerRef = new Firebase('https://doublemafia.firebaseio.com/players/' + self.player.id);
        innerPlayerRef.onDisconnect().remove();
        playerRef.onDisconnect().remove();

        // Save the record
        self.player.save().then(function() {
          game.save();
          gameRef.on('value', function(snap) {
            var g = snap.val();
            if (g.players) {
              if (Object.keys(g.players)[0] === self.player.id) {
                game.set('adminControls', true);
                controller.set('model', game);
              }
            }
          });
        });
      }
    });
  }
});
