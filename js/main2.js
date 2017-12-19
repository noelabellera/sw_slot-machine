/*---- Constants ------*/
var minBet = 0.25;
var maxBetting = 2;
var betFive = 5;
var betTen = 10;
var betTwenty = 20;

var odds = [ 0, 0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
var pics = ['https://i.imgur.com/2hkRWJz.jpg', 'https://i.imgur.com/gB2K6Zz.png', 
'https://i.imgur.com/kHZg1os.png','https://i.imgur.com/WjBoP9N.png',
'https://i.imgur.com/u1Qvt20.png','https://i.imgur.com/8hab90D.png'
];

var winners = [
    [0, 0, 0], [0, 0, 1], [0, 0, 2], [0, 0, 3], [0, 0, 4], [0, 0, 5], // 100
    [1, 1, 1], [1, 1, 0], [1, 1, 2], [1, 1, 3], [1, 1, 4], [1, 1, 5], // 75
    [2, 2, 2], [2, 2, 0], [2, 2, 1], [2, 2, 3], [2, 2, 4], [2, 2, 5], // 50
    [3, 3, 3], [3, 3, 0], [3, 3, 2], [3, 3, 1], [3, 3, 4], [3, 3, 5], // 25
    [4, 4, 4], [4, 4, 0], [4, 4, 2], [4, 4, 3], [4, 4, 1], [4, 4, 5], // 10
    [5, 5, 5], [5, 5, 0], [5, 5, 2], [5, 5, 3], [5, 5, 4], [5, 5, 1], // 5
]
/*---- app state variables  -----*/
 var betTotal, winVal, userBalance, amtBuyIn;
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
    console.log(betTotal);
    render();
});

document.getElementById("cashIn")
.addEventListener('click', function(e) {
    amtBuyIn = parseInt(e.target.id.replace('bill-', ''));
    addToAmt(amtBuyIn);
    render();
});

/*----- function  ------*/
function addToAmt(amt) {
    userBalance += amt;
    balanceConsole.innerHTML = "$ " + userBalance.toFixed(2);
    return userBalance;
    console.log(userBalance);
}

function spinReel(){
    if(userBalance < betTotal || userBalance === 0 || betTotal === 0) {
        userBalance = userBalance;
    } else {
        reelResults = [ pics[odds[Math.floor(Math.random()*odds.length)]], 
                    pics[odds[Math.floor(Math.random()*odds.length)]], 
                    pics[odds[Math.floor(Math.random()*odds.length)]] ];
    
    userBalance = userBalance - betTotal;
    console.log(reelResults);
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
    if (userBalance === 0 || userBalance < betTotal || betTotal === 0) {
        msgEl.innerHTML = "Place Your Bets!";
    } else {
        console.log('Here are the reelResults', reelResults)
        reelResults.forEach(function(picture_url, i) {
            document.querySelectorAll(".reel")[i].src = picture_url;
        });
    }   
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
    
}

function init () {
    betTotal = 0;
    userBalance = 0;
    winVal = 0;
    reelResults = [];
    amtBuyIn = 0;
}

init();
render();
