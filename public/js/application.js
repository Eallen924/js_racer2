

function Player(id, keycode) {
  this.id = id;
  this.keycode = keycode;
}

Player.prototype.advance = function() {
  var playerTrack = $('#player' + this.id);
  var playerPosition = playerTrack.find('li.active');
  playerPosition.removeClass("active").next().addClass("active"); //can delegate this to another function
};

var Game = {
  playerArray: [],
  startTime: null,
  endTime: null,
  gameIsOver: function() {
    return $('li:last-child').hasClass('active');
  },

  winner: function() {
    return $('ol').find('li:last-child.active').parent().data('player-id');
  },

  persistGameResults: function(players, winner_id, elapsed_time) {
    $.post('/game_over', {player_ids: this.playerArray.map(function(player){ return player.id; }), 
      winner_id: this.winner(), 
      elapsed_time: this.elapsedTime()});
  },

  findPlayerByKeyCode: function(keyCode) {
    return this.playerArray.filter( function(player) {
      return (player.keycode == keyCode);
    })[0];
  },
  started: function() {
    return this.startTime !== null;
  },
  start: function() {
    this.startTime = new Date();
  },
  finish: function() {
    this.endTime = new Date();
    $('.reset').removeClass('hidden');
  },
  elapsedTime: function() {
    return (this.endTime - this.startTime) / 1000;
  },
  handleKeyUp: function(event){
    var keycode = event.which;
    if(!Game.started()) {
      Game.start();
    }

    var player = Game.findPlayerByKeyCode(keycode);
    player.advance();

    if (Game.gameIsOver()) {  //Handle keyup event
      Game.finish();
      $(document).off('keyup');
      Game.persistGameResults();
    }
  },
  loadGameFromDom: function(){
    $(document).on('keyup', this.handleKeyUp);

    var eachTrack = $('ol.track');

    for(var i = 0; i < eachTrack.length; i++){
      var newPlayerId = $(eachTrack[i]).data('player-id');
      var newPlayerKeyCode = $(eachTrack[i]).data('player-key');
      this.playerArray.push(new Player(newPlayerId, newPlayerKeyCode));
    }
  }
};

$(document).ready(function() {
  Game.loadGameFromDom();
  $('.reset').on('click', function() { //can pull this function out and name it
    location.reload();
  });
});





