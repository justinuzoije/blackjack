$(function domReady() {
  $('#play-again').hide();

  var deck, dealerHand, playerHand;

  setupNewGame();

  updateScoreDisplay();

  $('#deal-button').click(function() {
    var card, cardUrl;

    dealACard(playerHand, '#player-hand');
    dealACard(dealerHand, '#dealer-hand');
    dealACard(playerHand, '#player-hand');
    dealACard(dealerHand, '#dealer-hand');

    console.log('playerHand', playerHand);
    console.log('dealerHand', dealerHand);

    $('#deal-button').hide();
  });

  $('#hit-button').click(function() {
    dealACard(playerHand, '#player-hand');
    // check for bust
    if (calculatePoints(playerHand) > 21) {
      $('#messages').text('You bust!');
      gameOver();
    }
  });

  $('#stand-button').click(function() {
    while (calculatePoints(dealerHand) < 17) {
      dealACard(dealerHand, '#dealer-hand');
    }
    // check for bust
    if (calculatePoints(dealerHand) > 21) {
      // dealer busts
      $('#messages').text('Dealer busts! You win!');
    } else if (calculatePoints(playerHand) > 21) {
      // player busts
      $('#messages').text('You bust!');
    } else {
      // determine winner
      var dealerPoints = calculatePoints(dealerHand);
      var playerPoints = calculatePoints(playerHand);
      var message;
      if (dealerPoints > playerPoints) {
        message = 'You lose!';
      } else if (dealerPoints < playerPoints) {
        message = 'You win!';
      } else {
        message = 'Push.'
      }
      $('#messages').text(message);
    }
    gameOver();
  });

  $('#play-again').click(function() {
    $('#deal-button').show();
    $('#hit-button').show();
    $('#stand-button').show();
    $('#play-again').hide();
    $('#player-hand').html('');
    $('#dealer-hand').html('');
    $('#messages').text('');
    $('#player-points').text('');
    $('#dealer-points').text('');
    setupNewGame();
  });

  function gameOver() {
    $('#hit-button').hide();
    $('#stand-button').hide();
    $('#play-again').show();
  }

  function updateScoreDisplay() {
    var dealerPoints = calculatePoints(dealerHand);
    $('#dealer-points').text(dealerPoints);
    var playerPoints = calculatePoints(playerHand);
    $('#player-points').text(playerPoints);
  }

  function dealACard(handArray, elementSelector) {
    card = deck.pop();
    handArray.push(card);
    cardUrl = getCardImageUrl(card);
    $(elementSelector).append(
      '<img src="' + cardUrl + '">'
    );
    updateScoreDisplay();
  }

  function setupNewGame() {
    deck = newDeck();
    deck = _.shuffle(deck);
    dealerHand = [];
    playerHand = [];
  }

}); // End of dom ready
