const ATTACK_VALUE = 10;// hard coded global variable
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;


let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;//or 100
let currentPlayerHealth = chosenMaxLife;// or 100


adjustHealthBars(chosenMaxLife);


function endRound() {
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert('You won!');
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
      alert('You lost!');
  } else if ( currentPlayerHealth <= 0 && currentMonsterHealth <=0){
      alert('You have a draw!');
  }
}

function attackMonster(attackMode) {
let maxDamage;//dynamic because of the condition
 if (attackMode === 'ATTACK') {
    maxDamage = ATTACK_VALUE;
    //could be written as maxDamage === 'STRONG_ATTACK_VALUE'
  } else {
    maxDamage = STRONG_ATTACK_VALUE;
  }
  const damage = dealMonsterDamage(maxDamage);//dynamic, before it was ATTACK_VALUE, DEPENDING ON MODE AND CONDITION
  currentMonsterHealth -= damage;//
  endRound();
}

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
// attck monster function or on click
function attackHandler() {
  attackMonster('ATTACK')

}

function strongAttackHandler() {
  attackMonster('STRONG_ATTACK');

}



attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);



