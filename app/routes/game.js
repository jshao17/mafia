import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Route.extend({
  // TODO: replace with game player
  player: null,
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
      if (snap.val() === true) {
        // Create a reference to a player that 'belongsTo' a game
        // which will take care of the 'hasMany' relationship.
        // This doesn't actually add the player to the game
        self.player = controller.store.createRecord('player', {
          name: 'Test Player Joined!',
          game: game
        });

        // Register a 'onDisconnect' handler that will remove the player
        // Do this before committing to prevent race conditions where user disconnects before save
        var playerRef = gameRef.child('players/' + self.player.id);
        playerRef.onDisconnect().remove();

        // Save the record
        game.save();
      }
    });
  },
});
