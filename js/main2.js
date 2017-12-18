/*---- Constants ------*/
var minBet = 0.25;
var maxBetting = 2;
var betFive = 5;
var betTen = 10;
var betTwenty = 20;
var initBal = 0;
var betTotal = 0;


// console.log(betFive);

var pics = ['https://i.imgur.com/2hkRWJz.jpg', 
'https://i.imgur.com/gB2K6Zz.png', 
'https://i.imgur.com/PMI0f0l.png',
'https://i.imgur.com/WjBoP9N.png',
'https://i.imgur.com/u1Qvt20.png',
'https://i.imgur.com/8hab90D.png'
];

/*---- app state variables  -----*/
var userBalance, addBet, winVal;



/*----- cached element preferences  ------*/
var msgEl = document.getElementById('prompt');
userBalance = document.getElementById('amount');
addBet = document.getElementById('bet');



/*---- event listeners ----*/
document.querySelector("btn")
.addEventListener('click', handleClick);

// document.getElementById("max")
// .addEventListener('click', maxBet);

// document.getElementById("betOne")
// .addEventListener('click', bettingOne);

// document.getElementById("cashOut")
// .addEventListener('click', cashingOut);

// document.getElementById("clear")
// .addEventListener('click', clearBet);

// document.getElementById("fiveBill")
// .addEventListener('click', addToAmtFive);

// document.getElementById("tenBill")
// .addEventListener('click', addToAmtTen);

// document.getElementById("twentyBill")
// .addEventListener('click', addToAmtTwenty);


/*---- function ----*/
function spinReel(){
    var randomNum = Math.floor(Math.random() * pics.length);
    document.getElementById("firstSlot").src = pics[randomNum];
    console.log(randomNum);
}

function addToAmtFive() {
    initBal += betFive;
    userBalance.innerHTML = "$ " + initBal;
    //console.log();
}

function addToAmtTen() {
    initBal += betTen;
    userBalance.innerHTML = "$ " + initBal;
    //console.log();
}

function addToAmtTwenty() {
    initBal += betTwenty;
    userBalance.innerHTML = "$ " + initBal;
    //console.log();
}

function maxBet() {
    betTotal = maxBetting;
    addBet.innerHTML = "$ " + maxBetting;
}

function clearBet() {
    betTotal = minBet;
    addBet.innerHTML= "$ " + betTotal;
}

function bettingOne() {
    betTotal += minBet;
    addBet.innerHTML = "$ " + betTotal;

}

function cashingOut() {
    msgEl.innerHTML = "You're cashing out: $ " + initBal;
}

function handleCLick() {
    var run;
    switch(run){
        
    }
}

