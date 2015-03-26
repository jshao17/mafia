import Ember from 'ember';
import random from '../utils/random';

export default Ember.Controller.extend({
  range: function(num) {
    num = Math.max(num, 1);
    return new Array(num).join().split(',').map(function(e, i) {
      return i;
    });
  },
  possibleFrMafia: function() {
    return this.range(this.get('model.players.length') - this.get('model.frCop') - this.get('model.frWitch'));
  }.property('model.frMafia', 'model.frCop', 'model.frWitch', 'model.players'),
  possibleSrMafia: function() {
    return this.range(this.get('model.players.length') - this.get('model.srCop'));
  }.property('model.srMafia', 'model.srCop', 'model.players'),
  possibleFrCop: function() {
    return this.range(this.get('model.players.length') - this.get('model.frMafia') - this.get('model.frWitch'));
  }.property('model.frMafia', 'model.frCop', 'model.frWitch', 'model.players'),
  possibleSrCop: function() {
    return this.range(this.get('model.players.length') - this.get('model.srMafia'));
  }.property('model.srMafia', 'model.srCop', 'model.players'),
  possibleFrWitch: function() {
    return this.range(this.get('model.players.length') - this.get('model.frMafia') - this.get('model.frCop'));
  }.property('model.frMafia', 'model.frCop', 'model.frWitch', 'model.players'),
  assignRole: function(role, roleName, count, players) {
    while(count > 0) {
      var player = players.objectAt(random(1, players.get('length')));
      if (!player.get(roleName)) {
        player.set(roleName, role);
        --count;
      }
    }
  },
  actions: {
    assignRoles: function() {
      var players = this.get('model.players');
      players.forEach(player => {
        player.set('firstRole', null);
        player.set('secondRole', null);
      });

      this.assignRole('mafia', 'firstRole', this.get('model.frMafia'), players);
      this.assignRole('mafia', 'secondRole', this.get('model.srMafia'), players);
      this.assignRole('detective', 'firstRole', this.get('model.frCop'), players);
      this.assignRole('detective', 'secondRole', this.get('model.srCop'), players);
      this.assignRole('witch', 'firstRole', this.get('model.frWitch'), players);

      players.forEach(player => {
        if (!player.get('firstRole')) {
          player.set('firstRole', 'civilian');
        }
        if (!player.get('secondRole')) {
          player.set('secondRole', 'civilian');
        }
        player.save();
      });
    }
  }
});
