/*---- Constants ------*/
var minBet = 0.25;
var maxBetting = 2;
var betFive = 5;
var betTen = 10;
var betTwenty = 20;
var initBal = 0;
var betTotal = 0;

var pics = ['https://i.imgur.com/2hkRWJz.jpg', 
'https://i.imgur.com/gB2K6Zz.png', 
'https://i.imgur.com/PMI0f0l.png',
'https://i.imgur.com/WjBoP9N.png',
'https://i.imgur.com/u1Qvt20.png',
'https://i.imgur.com/8hab90D.png'
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
var userBalance, addBet, winMsg;
var winVal = 0;
var reelResults = [];

/*----- cached element preferences  ------*/
var msgEl = document.querySelector('h1');
winMsg = document.getElementById('showWin')
userBalance = document.getElementById('showBalance');
addBet = document.getElementById('showBet');
var slotOne = document.getElementById('firstSlot');


/*---- event listeners ----*/
document.getElementById("spin")
.addEventListener('click', spinReel);

document.getElementById("max")
.addEventListener('click', maxBet);

document.getElementById("betOne")
.addEventListener('click', bettingOne);

document.getElementById("cashOut")
.addEventListener('click', cashingOut);

document.getElementById("clear")
.addEventListener('click', clearBet);

document.getElementById("fiveBill")
.addEventListener('click', addToAmtFive);

document.getElementById("tenBill")
.addEventListener('click', addToAmtTen);

document.getElementById("twentyBill")
.addEventListener('click', addToAmtTwenty);


/*---- functions ----*/
function spinReel(){
    if(initBal <= 0 || initBal < betTotal) {
        msgEl.innerHTML = "Please Buy In";
    } else {
        for (var i = 0; i < 3; i++) {
            var randomNum = Math.floor(Math.random() * pics.length);
            reelResults[i] = randomNum;
        }
    }
    winMsg.innerHTML = "$0.00";
    render();
    winningConditions();
    console.log(reelResults);
}

function addToAmtFive() {
    initBal += betFive;
    userBalance.innerHTML = "$ " + initBal.toFixed(2);
    msgEl.innerHTML = "Buying in $ " + betFive.toFixed(2);
}

function addToAmtTen() {
    initBal += betTen;
    userBalance.innerHTML = "$ " + initBal.toFixed(2);
    msgEl.innerHTML = "Buying in $ " + betTen.toFixed(2);
}

function addToAmtTwenty() {
    initBal += betTwenty;
    userBalance.innerHTML = "$ " + initBal.toFixed(2);
    msgEl.innerHTML = "Buying in $ " + betTwenty.toFixed(2);
}

function maxBet() {
   if(initBal === 0) {
        msgEl.innerHTML = "Please Buy In!";
    }
    else {
    betTotal = maxBetting;
    addBet.innerHTML = "$ " + maxBetting.toFixed(2);
    msgEl.innerHTML = "Max Bet: $2.00"
    }
}

function clearBet() {
    betTotal = minBet;
    addBet.innerHTML= "$ " + betTotal.toFixed(2);
    init();
    
}

function bettingOne() {
    if(betTotal === maxBetting) {
        msgEl.innerHTML = "You've Reached The Max Bet!";
        console.log("You cannot bet");
    } 
    else if(initBal === 0) {
        msgEl.innerHTML = "Please Buy In!";
    }
    else {
        betTotal += minBet;
        addBet.innerHTML = "$ " + betTotal.toFixed(2);
        msgEl.innerHTML = "Betting: $ " + betTotal.toFixed(2);
    }
    
}

function cashingOut() {
    if (initBal <= 0) {
        msgEl.innerHTML = "You have no balance";
    }else {
        msgEl.innerHTML = "You're cashing out: $ " + initBal.toFixed(2);
        initBal = 0;
        userBalance.innerHTML = "$ " + initBal.toFixed(2);
    }
}

function init() {
    msgEl.innerHTML = "Current Bet: $ " + minBet; 
    winMsg.innerHTML = "$ 0.00";
    userBalance.innerHTML = '$ ' + initBal;
}

function render(){
    if (initBal === 0 || initBal < betTotal) {
        msgEl.innerHTML = "You Don't Have Enough Balance For This";
    } else {
        initBal = initBal - betTotal;
        userBalance.innerHTML = '$ ' + initBal.toFixed(2);
        msgEl.innerHTML = "Current Bet: $ " + betTotal.toFixed(2);
        reelResults.forEach(function(res, i) {
            document.querySelectorAll(".reel")[i].src = pics[res];
        });
    }
    // document.querySelectorAll('.reel').forEach( (r, i) => {
    //     r.src = pics[reelResults[i]]
    // })
}

// function winningConditions() {
//     if(JSON.stringify(winner[0]) === JSON.stringify(reelResults)) {
//         initBal = betTotal * 100
//     } else if(JSON.stringify(winner[1]) === JSON.stringify(reelResults)) {
//         initBal = betTotal * 100
//     } else if
// }

function winningConditions(){
   // var didWin;
    winners.forEach(function(win) {
        if(JSON.stringify(win) === JSON.stringify(reelResults)) {
            console.log("You Win")
            msgEl.innerHTML = "You win!!";
            //didWin = true;
        }
    });
    // if (didWin) {
    //     var multiplier = determineMultiplier(reelResults)
    //     console.log(multiplier)
    //     payOut(multiplier)
    // }
    // function payOut(multiplier) {
    //     winVal = betTotal * multiplier;
    //     initBal = winVal + initBal;
    //     msgEl.innerHTML = "You won $ " + winVal;
    //     userBalance.innerHTML = "$ " + initBal;
    // }
    // function determineMultiplier(winCondition) {
    //     var threeKind = winCondition[0] === winCondition[1] && 
    //         winCondition[1] === winCondition[2]
    //     var twoKind = winCondition[0] === winCondition[1]
        
    //     if (threeKind && winCondition[0] < 3) {
    //         return 100;
    //     } else if (threeKind && winCondition[0] >= 3) {
    //         return 75;
    //     } else if (twoKind && winCondition[0] < 4) {
    //         return 50;
    //     } else if (twoKind && winCondition[0] >= 4) {
    //         return 25;
    //     } else {
    //         return 2;
    //     }
    // }

    if(JSON.stringify(reelResults) === JSON.stringify(winners[0])) {
        initBal = (betTotal * 100) + initBal;
        winVal = betTotal * 100;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[1])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);

    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[2])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);

    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[3])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);

    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[4])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);

    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[5])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    //Start of 2nd picture winning conditions
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[6])) {
        initBal = (betTotal * 100) + initBal;
        winVal = betTotal * 100;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[7])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[8])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[9])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[10])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[11])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    //start of 3rd picture winning condtion
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[12])) {
        initBal = (betTotal * 75) + initBal;
        winVal = betTotal * 75;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[13])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[14])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[15])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[16])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[17])) {
        initBal = (betTotal * 5) + initBal;
        winVal = betTotal * 5;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    //start of 4th picture winning condition
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[18])) {
        initBal = (betTotal * 50) + initBal;
        winVal = betTotal * 50;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[19])) {
        initBal = (betTotal * 4) + initBal;
        winVal = betTotal * 4;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[20])) {
        initBal = (betTotal * 4) + initBal;
        winVal = betTotal * 4;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[21])) {
        initBal = (betTotal * 4) + initBal;
        winVal = betTotal * 4;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[22])) {
        initBal = (betTotal * 4) + initBal;
        winVal = betTotal * 4;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[23])) {
        initBal = (betTotal * 4) + initBal;
        winVal = betTotal * 4;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    //start of 5th picture
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[24])) {
        initBal = (betTotal * 25) + initBal;
        winVal = betTotal * 25;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[25])) {
        initBal = (betTotal * 3) + initBal;
        winVal = betTotal * 3;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[26])) {
        initBal = (betTotal * 3) + initBal;
        winVal = betTotal * 3;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[27])) {
        initBal = (betTotal * 3) + initBal;
        winVal = betTotal * 3;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[28])) {
        initBal = (betTotal * 3) + initBal;
        winVal = betTotal * 3;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[29])) {
        initBal = (betTotal * 3) + initBal;
        winVal = betTotal * 3;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    //start of the 6th picture
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[30])) {
        initBal = (betTotal * 10) + initBal;
        winVal = betTotal * 10;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[31])) {
        initBal = (betTotal * 2) + initBal;
        winVal = betTotal * 2;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[32])) {
        initBal = (betTotal * 2) + initBal;
        winVal = betTotal * 2;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[33])) {
        initBal = (betTotal * 2) + initBal;
        winVal = betTotal * 2;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[34])) {
        initBal = (betTotal * 2) + initBal;
        winVal = betTotal * 2;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } else if(JSON.stringify(reelResults) === JSON.stringify(winners[35])) {
        initBal = (betTotal * 2) + initBal;
        winVal = betTotal * 2;
        msgEl.innerHTML = "You won $ " + winVal;
        userBalance.innerHTML = "$ " + initBal;
        winMsg.innerHTML = "$ " + winVal.toFixed(2);
    } 
} 

init();
clearBet();
