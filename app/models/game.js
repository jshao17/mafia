import DS from 'ember-data';

export default DS.Model.extend({
  frMafia: DS.attr('number', { defaultValue: 0 }),
  srMafia: DS.attr('number', { defaultValue: 0 }),
  frCop: DS.attr('number', { defaultValue: 0 }),
  srCop: DS.attr('number', { defaultValue: 0 }),
  frWitch: DS.attr('number', { defaultValue: 0 }),
  players: DS.hasMany('player', { async: true }),
  eligiblePlayers: function() {
    return Math.max(this.get('players.length') - 1, 0);
  }.property('players'),
  firstRoundRoles: function() {
    return this.get('frMafia') + this.get('frCop') + this.get('frWitch');
  }.property('frMafia', 'frCop', 'frWitch'),
  secondRoundRoles: function() {
    return this.get('srMafia') + this.get('srCop');
  }.property('srMafia', 'srCop'),
  assigned: DS.attr('boolean'),
  rolesAssigned: function() {
    if (this.get('eligiblePlayers') === 0) {
      return false;
    }
    for(var i = 1; i < this.get('players.length'); ++i) {
      if (!this.get('players').objectAt(i).get('hasRoles')) {
        return false;
      }
    }
    return true;
  }.property('players', 'assigned')
});
