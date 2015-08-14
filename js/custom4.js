var cardHeight = 308;
var cardWidth = 220;



var deck = [];
for (var value = 0; value < 13; value++) {
    for (var suit = 0; suit < 4; suit++) {
      deck.push(value + '_' + suit)
    };
}

draw = function(){
   if(deck.length <=1) {
    $('.display').addClass('game-over');
        $('.display-title').hide();
        $('.display-rule').hide();
   }  else {
    var deckPositionAtRandom = Math.floor(Math.random() * deck.length);
    var coords = deck[deckPositionAtRandom];
    var index = deck.indexOf(coords);
    var value = coords.split('_')[0];
    var suit = coords.split('_')[1];
    $(".card.hidden").removeClass("hidden");
    $('.display-title').html(rules[value]["title"]);
    $('.display-rule').html(rules[value]["rule"]);
    $('.card').css("background-position-y", (cardHeight * suit) * -1 );
    $('.card').css("background-position-x", (cardWidth * value) * -1 );
    return deck.splice(index,1)[0];
  }
};

$('.deck').click(draw);



var rules = {
  0: {"title": 'Waterfall', "rule": "Start the drinking train!, you cannot stop until the person to the right."},
  1: {"title": 'You', "rule": "Enjoy the power while it lasts, big guy"},
  2: {"title": 'ME', "rule": "Oh...you're so excited to make everyone else drink?? Why don't you join the party"},
  3: {"title": 'Ladies', "rule": "keep drinking..those boys actually get cute"},
  4: {"title": 'Thumb Master', "rule": "You're the thumb master until someone else draws it."},
  5: {"title": 'Fellas', "rule": "Alright you strapping men, time to cowboy up"},
  6: {"title": 'Touch the Ceiling', "rule": "Reach for the sky"},
  7: {"title": 'Pick a Mayte', "rule": "Hey,beats drinking alone. pick a drinking mate for the rest of the game."},
  8: {"title": 'Bust-A-Rhyme', "rule": "Start the rhyme, and you cant take your time."},
  9: {"title": 'Catagories', "rule": "like beer--hop venom, natty ice, etc."},
  10: {"title": 'Never-Ever', "rule": "Never ever, say never ever"},
  11: {"title": 'QUESTIONS', "rule": "Do you know what the x5 is?"},
  12: {"title": 'Make a Rule', "rule": "like everything must be said in MacGruber quotes."},
}
