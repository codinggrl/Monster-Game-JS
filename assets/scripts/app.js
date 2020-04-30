// hard coded global variables
const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;


// key static values
// USE THEM IN IF CONDITION AND ALSO THE FUNCTION
// IDEA IS TO AVOID MISSSPELING AND TYPING STRINGS , WE ONLY DO IT HERE
// WE CAN ALSO WORK WITH NUMBERS
const MODE_ATTACK = 'ATTACK'; // MODE_ATTACK = 0
const MODE_STRONG_ATTACK = 'STRONG_ATTACK'; // MODE_STRONG_ATTACK = 1
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL ='PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

// dialog box for user, returns the value the user entered
 const enteredValue = prompt('Maximum life for u and the monster.','100');


//hard coded starting values
let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];
// not a valid nuber Nan, parseInt will yield if it is not a number
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}


let currentMonsterHealth = chosenMaxLife;//or 100
let currentPlayerHealth = chosenMaxLife;// or 100
let hasBonusLife = true;

// calling the function from vendor.js with chosenMaxLife as a paramether
adjustHealthBars(chosenMaxLife);

//write differents events fo a log
function writeToLog(eve, val, monsterHealth, playerHealth) {
  let logEntry = {
      event: eve,
      value: val,
      finalMOnsterHealth: monsterHealth,
      finalPlayerHealth: playerHealth
    };
    switch (eve) {
      case  LOG_EVENT_PLAYER_ATTACK:
        logEntry.target = 'MONSTER';
        break;
      case LOG_EVENT_PLAYER_STRONG_ATTACK:
        logEntry = {
          event: eve,
          value: val,
          target: 'MONSTER',
          finalMOnsterHealth: monsterHealth,
          finalPlayerHealth: playerHealth
      };
       break;
      case LOG_EVENT_MONSTER_ATTACK:
         logEntry = {
            event: eve,
            value: val,
            target: 'PLAYER',
            finalMOnsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
      };
        break;
      case LOG_EVENT_PLAYER_HEAL:
         logEntry = {
            event: eve,
            value: val,
            target: 'PLAYER',
            finalMOnsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
      };
        break;
      case LOG_EVENT_GAME_OVER:
          logEntry = {
            event: eve,
            value: val,
            finalMOnsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth
    };
        break;
      default:
        logEntry = {};
  }
   battleLog.push(logEntry);
}

function reset() {
  let currentMonsterHealth = chosenMaxLife;//or 100
  let currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);//from vendor.js
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
    );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('You would be dead but the bonus life saved you!');
  }


  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      alert('You won!');
      //reset();// OR
       writeToLog(
        LOG_EVENT_GAME_OVER,
        'PLAYER_WON',
        currentMonsterHealth,
        currentPlayerHealth
        );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
      alert('You lost!');
      //reset();
       writeToLog(
        LOG_EVENT_GAME_OVER,
        'MONSTER_WON',
        currentMonsterHealth,
        currentPlayerHealth
        );
  } else if ( currentPlayerHealth <= 0 && currentMonsterHealth <=0){
      alert('You have a draw!');
      //reset();
       writeToLog(
        LOG_EVENT_GAME_OVER,
        'A_DRAW',
        currentMonsterHealth,
        currentPlayerHealth
        );
  }
}

/* OR
Shortened version

if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0 ){
  reset();
  }
}
*/

function attackMonster(attackMode) {
const maxDamage = attackMode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;//dynamic because of the condition
const logEvent = attackMode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

 /*if (attackMode === 'MODE_ATTACK') {
    maxDamage = ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_ATTACK
  } else if (attackMode === MODE_STRONG_ATTACK) {
    maxDamage = STRONG_ATTACK_VALUE;
    logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
  }*/


  const damage = dealMonsterDamage(maxDamage);//dynamic, before it was ATTACK_VALUE, DEPENDING ON MODE AND CONDITION
  currentMonsterHealth -= damage;//
   writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth

  );
    endRound();
}

// heal player
function healPlayerHandler() {
  let healValue;//dynamic because of the condition
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more then max health!");
    healValue = chosenMaxLife - currentPlayerHealth;// we hel the player to his initial health but not above that
  } else {
    healValue = HEAL_VALUE;
  }

  increasePlayerHealth(healValue);//dynamic, before it was HEAL_VALUE
  currentPlayerHealth += healValue;// dynamic,before it was HEAL_VALUE
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
 );
     endRound();
}

//functions that lovers the bar value
// could be called attck monster function or on click
function attackHandler() {
  attackMonster('ATTACK')

}
// strong attack on monster
function strongAttackHandler() {
  attackMonster('STRONG_ATTACK');

}


function printLogHandler() {
  // have acces to the index as well
//  for  (let i = 0; i < battleLog.length; i++) {
//    console.log(battleLog[i]);
// } // have acces to the index as well

for (const logEntry of battleLog) {
 console.log(logEntry);
  }
}


// event listeners
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);

























