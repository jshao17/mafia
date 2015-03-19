import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createGame: function() {
      var self = this;
      var adminPlayer = this.store.createRecord('player', {
        name: this.get('name')
      })

      var newGame = this.store.createRecord('game', {
        playerCount: this.get('playerCount'),
        adminId: adminPlayer.id,
        phase: 0,
      });

      newGame.get('players').addObject(adminPlayer);

      newGame.save().then(function(data) {
        self.setProperties({
          playerCount: ''
        });
        self.transitionToRoute('game', data);
      });
    }
  }
});
