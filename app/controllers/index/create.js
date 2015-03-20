import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createGame: function() {
      var self = this;

      var newGame = this.store.createRecord('game', {
        phase: 0
      });

      newGame.save().then(function(data) {
        self.setProperties({
          playerCount: ''
        });
        self.transitionToRoute('game', data);
      });
    }
  }
});
