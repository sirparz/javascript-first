// The Not-so-ultimate Credit Card Checker
// Made by Sir Parz ^_^
// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
const screwCred = cred => {
  const len = cred.length;
  const screwed = [];
  //console.log(cred)
  //console.log(`Before: ${credTester}`)
  for(let i = 1; i <= len; i++) {
    screwed.unshift(cred[len-i])
    if (i % 2 === 0) {
      //console.log(len-i)
      screwed[0] *= 2;
      if (screwed[0] > 9) {
        screwed[0] -= 9;
      }
    }
  }
  return screwed;
}

const validateCred = cred => {
  const screwedCred = screwCred(cred)
  let sumCred = 0;
  screwedCred.forEach(item => {sumCred+=item});
  //console.log(cred)
  return sumCred % 10 === 0;
}

const findInvalidCard = batchParam => batchParam.filter(card => {
  return !validateCred(card)
})

const cardIdentifier = (cardNumber) => {
  cardProvider = '';
  switch (cardNumber[0]) {
    case 3:
      cardProvider = 'Amex (American Express)';
      break;
    case 4:
      cardProvider = 'Visa';
      break;
    case 5:
      cardProvider = 'MasterCard';
      break;
    case 6:
      cardProvider = 'Discover';
      break;
    default:
      cardProvider = 'Company Not Found';
      break;
  }
  return {
    number: cardNumber,
    validity: validateCred(cardNumber),
    provider: cardProvider,
  }
}

const idInvalidCard = batchParam => {
  invCards = findInvalidCard(batchParam);
  invIdenifiedCard = [];
  for (let card of invCards) {
    invIdenifiedCard.push(cardIdentifier(card))
  }
  return invIdenifiedCard;
}

const usableNumArray = number => String(number).split('').map(Number) 
// turns numbers into array of digit ^_^

const makeCardValid = card => {
  // limitation: only the last digit and third last digit is altered
  if (!validateCred(card)) {
    const len = card.length;
    let coeff = card[len-3] + card[len-1]
    let newCoeff = coeff;

    screwedCred = screwCred(card);
    let sumCred = 0;
    screwedCred.forEach(item => {sumCred+=item});
    //console.log('sumcred: ' + sumCred)

    if (coeff < 10) { //increase
      newCoeff += 10 - (sumCred % 10)
    } else { // decrease
      newCoeff -= (sumCred % 10)
    }
    //console.log('coeff: ' + coeff)
    //console.log('newCoeff: ' + newCoeff)
    let first = 0;
    let alterer = newCoeff - 9;
    if (newCoeff < 10) { 
      first = Math.floor(Math.random() * (newCoeff + 1));
    } else { // newCoeff >= 10
      first = alterer + Math.floor(Math.random() * (10 - alterer + 1));
    }
    let second = newCoeff - first;
    console.log('first: ' + first)
    console.log('second: ' + second)

    newDigits = [first, second].sort(function () {
      return Math.random() - 0.5;
    });
    //console.log(newDigits);
    
    let newCard = card;
    newCard[len-3] = newDigits[0];
    newCard[len-1] = newDigits[1];
    return newCard;
  } else {
    return card;
  }
}

// Console Logs
console.log('Identify a batch of credit cards:')
console.log(idInvalidCard(batch))

console.log('Your Turn Here. Here Is Your Card!')
let yourTurn = usableNumArray(4539087854047379); // From the card generator. Not a real one
yourCard = cardIdentifier(yourTurn)
console.log(yourCard)

console.log('Let\'s try an invalid card:')
console.log(cardIdentifier(invalid4))
fixedCard = makeCardValid(invalid4)
console.log(cardIdentifier(fixedCard))
