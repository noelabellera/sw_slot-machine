/*---- Constants ------*/
var minBet = 0.25;
var maxBetting = 2;
var betFive = 5;
var betTen = 10;
var betTwenty = 20;

var odds = [ 0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 
            3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 
            6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];
            
var pics = ['https://i.imgur.com/2hkRWJz.jpg', //Vader Pic
            'https://i.imgur.com/u1Qvt20.png', //Yoda Pic
            'https://i.imgur.com/gB2K6Zz.png', //R2D2 Pic
            'https://i.imgur.com/WjBoP9N.png', //BB8 Pic
            'https://i.imgur.com/kHZg1os.png', //Chewy Pic
            'https://i.imgur.com/8hab90D.png',//Millennium Falcon Pic
            'https://i.imgur.com/3LvSBq8.png']; //Boba Fett Pic


/*---- app state variables  -----*/
 var betTotal, winVal, userBalance, amtBuyIn
 var reelResults; //array for winning results. 

/*----- cached element preferences  ------*/
var msgEl = document.querySelector('h1');
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
    reelResults.forEach(function(picture_url, i) {
            document.querySelectorAll(".reel")[i].src = pics[picture_url];
        });  
    renderMsg();
}

function renderMsg() {
    
    betConsole.innerHTML = "$ " + betTotal.toFixed(2);
    balanceConsole.innerHTML = "$ " + userBalance.toFixed(2);
    winConsole.innerHTML = "$ " + winVal.toFixed(2); 
    msgEl.innerHTML = "Buying In $ " + amtBuyIn.toFixed(2);
    if (userBalance < betTotal || userBalance === 0) {
        msgEl.innerHTML = "Please Buy-In & Place Your Bets";
    } else if(betTotal === 0) {
        msgEl.innerHTML = "Please Place Your Bets";
    } else {
        msgEl.innerHTML = "Current Bet: $ " + betTotal.toFixed(2);
    }
}

function cashingOut() {
    msgEl.innerHTML = "You're cashing out: $ " + userBalance.toFixed(2);
    balanceConsole.innerHTML = "$ 0.00";
    init();
    
    //render();
    
}

function init () {
    betTotal = 0;
    userBalance = 0;
    winVal = 0;
    reelResults = [];
    amtBuyIn = 0;
}

function payOut(multiplier, string) {
    console.log(string)
    winVal = betTotal * multiplier;
    userBalance = userBalance + winVal;

}

function checkForWinner(){
    if((reelResults[0] === 0) && 
        (reelResults[0] === reelResults[1]) && (reelResults[0] === reelResults[2])) {
        payOut(100, 'You Win Vader')
    } else if((reelResults[0] === 1) && 
        (reelResults[0] === reelResults[1]) && (reelResults[0] === reelResults[2])) {
        payOut(75, 'You Win Yoda')
    } else if((reelResults[0] === 2) && 
        (reelResults[0] === reelResults[1]) && (reelResults[0] === reelResults[2])) {
        payOut(50, 'You Win R2')
    } else if((reelResults[0] === 3) && 
        (reelResults[0] === reelResults[1]) && (reelResults[0] === reelResults[2])) {
        payOut(25, 'You Win BB8')
    } else if((reelResults[0] === 4) && 
        (reelResults[0] === reelResults[1]) && (reelResults[0] === reelResults[2])) {
        payOut(15, 'You Win Chewy')
    } else if((reelResults[0] === 5) && 
        (reelResults[0] === reelResults[1]) && (reelResults[0] === reelResults[2])) {
        payOut(10, 'You Win The Falcon')
    } else if((reelResults[0] === 6) && 
        (reelResults[0] === reelResults[1]) && (reelResults[0] === reelResults[2])) {
        payOut(5, 'Boba Fett')
    } else if (reelResults[0] === reelResults[1]) {
        payOut(2, "May the force be with you")
    }
    render();
}
init();
render();
