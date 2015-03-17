import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    return { game_id: params.game_id };
  }
});
