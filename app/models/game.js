import DS from 'ember-data';

export default DS.Model.extend({
  playerCount: DS.attr('number'),
  phase: DS.attr('number'),
  adminId: DS.attr('string'),
  players: DS.hasMany('player', { embedded: true })
});
