import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createPlayer: function() {
      var self = this;
      var newPlayer = this.store.createRecord('player', {
        name: this.get('name'),
      });
      var game = this.model;
      game.get('players').addObject(newPlayer);
      game.save();
    }
  }
});
