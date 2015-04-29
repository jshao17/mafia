import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Route.extend({
  deactivate: function() {
    // Delete and commit the deletion of the player in the store
    this.player.destroyRecord();
  },
  setupController: function(controller, model) {
    var self = this;
    this._super(controller, model);

    // Special Firebase location that tells us if we are connected
    var connectedRef = new Firebase('https://doublemafia.firebaseio.com/.info/connected');
    var gameRef = this.store.adapterFor('game')._getRef('game').child(model.id).child('players');

    connectedRef.on('value', function(snap) {
      // Once we are connected ...
      if (snap.exists()) {
        // Create a reference to a player that 'belongsTo' a game
        // which will take care of the 'hasMany' relationship.
        // This doesn't actually add the player to the game
        self.player = controller.store.createRecord('player', {
          game: model
        });

        // Register a 'onDisconnect' handler that will remove the player
        // Do this before committing to prevent race conditions where user disconnects before save
        var innerPlayerRef = gameRef.child(self.player.id);
        var playerRef = self.store.adapterFor('player')._getRef('player').child(self.player.id);
        innerPlayerRef.onDisconnect().remove();
        playerRef.onDisconnect().remove();

        // Save the record
        self.player.save().then(function() {
          return model.save();
        }).then(m => {
          if (m.get('players.length') === 1) {
            self.player.set('showControl', true);
          }
          controller.set('model.player', self.player);

          gameRef.on('child_removed', function() {
            model.reload().then(game => {
              var player = game.get('players').objectAt(0);
              if (player && player.id === self.player.id) {
                self.player.set('showControl', true);
                controller.set('model.player', self.player);
              }
              if(game.get('eligiblePlayers') < game.get('firstRoundRoles') ||
                 game.get('eligiblePlayers') < game.get('secondRoundRoles')) {
                game.rollback();
              }
            });
          });
        });
      }
    });
  }
});
