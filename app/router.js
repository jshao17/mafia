import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.route('index', { path: '/' }, function() {
    this.route('create');
    this.route('join');
  });
  this.resource('game', { path: '/:game_id'}, function() {
    this.resource('mafia');
    this.resource('detective');
    this.resource('witch');
    this.route('waiting');
  });
});

export default Router;
