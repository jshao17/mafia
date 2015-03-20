import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  firstRole: DS.attr('string'),
  secondRole: DS.attr('string'),
  game: DS.belongsTo('game')
});
