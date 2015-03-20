import Ember from 'ember';
import Firebase from 'firebase';

export default Ember.Route.extend({
  player: null,
  playerRef: null,
  deactivate: function() {
    var self = this;
    this.controller.model.store.find('game', this.controller.model.id).then(game => {
      game.get('players').removeObject(self.player);
      game.save();
      self.playerRef.onDisconnect().cancel();
    });
  },
  setupController: function(controller, game) {
    var self = this;
    this._super(controller, game);

    var connectedRef = new Firebase('https://sweltering-inferno-359.firebaseio.com/.info/connected');

    this.player = controller.store.createRecord('player', {
      name: 'Test Player Joined!'
    });
    this.playerRef = new Firebase('https://sweltering-inferno-359.firebaseio.com/games/' + game.id + '/players/' + this.player.id);
    connectedRef.on('value', function(snap) {
      if (snap.val() === true) {
        self.playerRef.onDisconnect().remove();

        self.controller.store.find('game', game.id).then(data =>
        {
          data.get('players').addObject(self.player);
          data.save();
        });
      }
    });
  },
});
