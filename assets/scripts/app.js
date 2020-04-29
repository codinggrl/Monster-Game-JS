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


// dialog box for user, returns the value the user entered
 const enteredValue = prompt('Maximum life for u and the monster.','100');

//hard coded starting values
let chosenMaxLife = parseInt(enteredValue);
// not a valid nuber Nan, parseInt will yield if it is not a number
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
  chosenMaxLife = 100;
}


let currentMonsterHealth = chosenMaxLife;//or 100
let currentPlayerHealth = chosenMaxLife;// or 100
let hasBonusLife = true;

// calling the function from vendor.js with chosenMaxLife as a paramether
adjustHealthBars(chosenMaxLife);

function reset() {
  let currentMonsterHealth = chosenMaxLife;//or 100
  let currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);//from vendor.js
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('You would be dead but the bonus life saved you!');
  }


  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
      alert('You won!');
      reset();// OR
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
      alert('You lost!');
      reset();
  } else if ( currentPlayerHealth <= 0 && currentMonsterHealth <=0){
      alert('You have a draw!');
      reset();
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
let maxDamage;//dynamic because of the condition
 if (attackMode === 'MODE_ATTACK') {
    maxDamage = ATTACK_VALUE;
    //could be written as maxDamage === 'STRONG_ATTACK_VALUE', LATER MODE_STRONG_ATTACK
  } else {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);//dynamic, before it was ATTACK_VALUE, DEPENDING ON MODE AND CONDITION
  currentMonsterHealth -= damage;//
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


// event listeners
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);


























