var cardHeight = 308;
var cardWidth = 220;



var deck = [];
for (var value = 0; value < 13; value++) {
    for (var suit = 0; suit < 4; suit++) {
      deck.push(value + '_' + suit)
    };
}

draw = function(){
   if(deck.length <1) {
    $('#kingscup').addClass('game-over');
   }  else {
    var deckPositionAtRandom = Math.floor(Math.random() * deck.length);
    var coords = deck[deckPositionAtRandom];
    var index = deck.indexOf(coords);
    var value = coords.split('_')[0];
    var suit = coords.split('_')[1];
    $('.display').html(rules[value]);
    $('.card').css("background-position-y", (cardHeight * suit) * -1 );
    $('.card').css("background-position-x", (cardWidth * value) * -1 );
    return deck.splice(index,1)[0];
  }
};

$('.deck').click(draw);



var rules = {
  0: 'waterfall',
  1: 'YOU!',
  2: 'ME...Damnit',
  3: 'Ladies',
  4: 'thumbbb mastah',
  5: 'fellas',
  6: 'touch the ceiling',
  7: 'pick a mate',
  8: 'bust-a-rhyme',
  9: 'catagories',
  10: 'Never-Ever',
  11: 'QUESTIONS',
  12: 'make a rule',
}
