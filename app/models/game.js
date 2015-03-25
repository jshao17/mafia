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
  }.property('players')
});
