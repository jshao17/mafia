import DS from 'ember-data';

export default DS.Model.extend({
  getCard: function(role) {
    switch(role) {
      case 'mafia':
        return 'king';
      case 'detective':
        return 'jack';
      case 'witch':
        return 'queen';
      case 'townsperson':
        return 'number';
      default:
        return 'number';
    }
  },
  name: DS.attr('string'),
  firstRole: DS.attr('string'),
  secondRole: DS.attr('string'),
  game: DS.belongsTo('game'),
  hasRoles: function() {
    return this.get('firstRole') != null && this.get('secondRole') != null;
  }.property('firstRole', 'secondRole'),
  firstCard: function() {
    return this.getCard(this.get('firstRole'));
  }.property('firstRole'),
  secondCard: function() {
    return this.getCard(this.get('secondRole'));
  }.property('secondRole')
});
