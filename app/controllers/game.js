import Ember from 'ember';

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
  actions: {
  }
});
