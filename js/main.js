/*---- Constants ------*/
var minBet = 0.25;
var maxBetting = 2;
var betFive = 5;
var betTen = 10;
var betTwenty = 20;

var odds = [ 
    0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 
    3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
            
var symbols = [
    {img: 'https://i.imgur.com/2hkRWJz.jpg', payout: 1000, payout2: 20}, //Vader Pic
    {img: 'https://i.imgur.com/u1Qvt20.png', payout: 100, payout2: 10}, //Yoda Pic
    {img: 'https://i.imgur.com/gB2K6Zz.png', payout: 75, payout2: 5}, //R2D2 Pic
    {img: 'https://i.imgur.com/WjBoP9N.png', payout: 50, payout2: 5}, //BB8 Pic
    {img: 'https://i.imgur.com/kHZg1os.png', payout: 25, payout2: 5}, //Chewy Pic
    {img: 'https://i.imgur.com/8hab90D.png', payout: 10, payout2: 2}, //Millennium Falcon Pic
    {img: 'https://i.imgur.com/3LvSBq8.png', payout: 5, payout2: 1} //Boba Fett Pic
]; 


/*---- app state variables  -----*/
 var betTotal, winVal, userBalance, amtBuyIn, message;
 var reelResults; //array for winning results. 

/*----- cached element preferences  ------*/
var reelEls = document.querySelectorAll(".reel");
var msgEl = document.querySelector('h1');
var subMsgEl = document.querySelector('h2');
var betConsole = document.getElementById('showBet');
var balanceConsole = document.getElementById('showBalance');
var winConsole = document.getElementById('showWin');

/*----- event listener  ------*/
document.getElementById("spin")
.addEventListener('click', spinReel);

document.getElementById("max")
.addEventListener('click', maxBet);

document.getElementById("betOne")
.addEventListener('click', bettingOne);

document.getElementById("cashOut")
.addEventListener('click', cashingOut);

document.getElementById("clear")
.addEventListener('click', function() {
    betTotal = 0;
    render();
});

document.getElementById("cashIn")
.addEventListener('click', function(e) {
    amtBuyIn = parseInt(e.target.id.replace('bill-', ''));
    addToAmt(amtBuyIn);
    renderMsg();
    console.log(amtBuyIn);
});

/*----- function  ------*/
function addToAmt(amt) {
    userBalance += amt;
    renderMsg();
}

function spinReel(){
    if(betTotal > 0 && userBalance >= betTotal) {
        for(var i = 0; i < 3; i++) {
            var randomNum = odds[Math.floor(Math.random()*odds.length)];
            reelResults[i] = randomNum;
        }
        userBalance = userBalance - betTotal;
        console.log(reelResults);
        checkForWinner();
        render();
        }
}

function maxBet() {
   if(userBalance === 0) {
       betTotal = 0;
   } else {
       betTotal = maxBetting;
       render();
   }
}

function bettingOne() {
    if(userBalance === 0) {
        betTotal = 0;
    } else if (betTotal === maxBetting) {
        betTotal = maxBetting;
    } else {
        betTotal += minBet;
        renderMsg();
    }
    
}

function render() {
    reelResults.forEach(function(symIdx, i) {
        reelEls[i].src = symbols[symIdx].img;
    });  
    renderMsg();
}

function renderMsg() {
    betConsole.innerHTML = "$ " + betTotal.toFixed(2);
    balanceConsole.innerHTML = "$ " + userBalance.toFixed(2);
    winConsole.innerHTML = "$ " + winVal.toFixed(2); 
    subMsgEl.innerHTML = "Balance $ " + userBalance.toFixed(2);
    if (userBalance < betTotal || userBalance === 0 || betTotal === 0) {
        msgEl.innerHTML = "Place Your Bets & May The Force Be With You!";
    } else if(winVal > 0){
        msgEl.innerHTML = 'You Win $ ' + winVal.toFixed(2);
    }
    else {
        msgEl.innerHTML = "Current Bet: $ " + betTotal.toFixed(2);
    }
}

function cashingOut() {
    betTotal = 0;
    winVal = 0
    subMsgEl.innerHTML = "Balance $ 0.00"
    msgEl.innerHTML = "You're cashing out: $ " + userBalance.toFixed(2);
    balanceConsole.innerHTML = "$ 0.00";
    winConsole.innerHTML = "$ " + winVal.toFixed(2);
    betConsole.innerHTML = "$ " + betTotal.toFixed(2);
    msgEl.innerHTML = "You've cashed out $ " + userBalance.toFixed(2);
    init();
    
    //render();
}

function init () {
    betTotal = 0;
    userBalance = 0;
    winVal = 0;
    reelResults = [];
    amtBuyIn = 0;
    message = "Place your Bets!";
}

function multiplier(multiple) {
    winVal = betTotal * multiple;
    userBalance = userBalance + winVal;

}

function checkForWinner(){
    //var payout = 0;
    if (reelResults[0] === reelResults[1] && reelResults[0] === reelResults[2]) {
        // handle three the same
        //symbols[reelResults[0]].payout;
        multiplier(symbols[reelResults[0]].payout);
        console.log(symbols[reelResults[0]].payout);
        console.log(symbols[reelResults[0]]);
    } else if (reelResults[0] === reelResults[1]) {
        // handle two the same
        //symbols[reelResults[0]].payout2;
        multiplier(symbols[reelResults[0]].payout2);
        console.log(symbols[reelResults[0]].payout2);
        console.log(symbols[reelResults[0]]);
    }else {
        winVal = 0;
    }

    // if((reelResults[0] === 0) && 
    //     (reelResults[0] === reelResults[1]) && (reelResults[0] === reelResults[2])) {
    //     payOut(100)
    // } else if((reelResults[0] === 1) && 
    //     (reelResults[0] === reelResults[1]) && (reelResults[0] === reelResults[2])) {
    //     payOut(75)
    // } else if((reelResults[0] === 2) && 
    //     (reelResults[0] === reelResults[1]) && (reelResults[0] === reelResults[2])) {
    //     payOut(50)
    // } else if((reelResults[0] === 3) && 
    //     (reelResults[0] === reelResults[1]) && (reelResults[0] === reelResults[2])) {
    //     payOut(25)
    // } else if((reelResults[0] === 4) && 
    //     (reelResults[0] === reelResults[1]) && (reelResults[0] === reelResults[2])) {
    //     payOut(15)
    // } else if((reelResults[0] === 5) && 
    //     (reelResults[0] === reelResults[1]) && (reelResults[0] === reelResults[2])) {
    //     payOut(10)
    // } else if((reelResults[0] === 6) && 
    //     (reelResults[0] === reelResults[1]) && (reelResults[0] === reelResults[2])) {
    //     payOut(5)
    // } else if (reelResults[0] === reelResults[1]) {
    //     payOut(2)
    // } else {
    //     winVal = 0;
    // }
    render();
}
init();
render();
