import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createGame: function() {
      var newMessage = this.store.createRecord('game', {
        playerCount: this.get('playerCount')
      });

      newMessage.save();
      this.setProperties({
        playerCount: '',
        id: newMessage.id
      });
    }
  }
});
