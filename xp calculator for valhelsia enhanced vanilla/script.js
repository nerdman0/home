multiplier = 0.07
base = 50
max_xp = 10000
max_level = 40
exponent = 2

function change_stats(){
  multiplier = parseFloat(document.getElementById("Multiplier").value)
  base = Math.floor(parseInt(document.getElementById("Base").value))
  max_xp = Math.floor(parseInt(document.getElementById("Max_XP").value))
  max_level = Math.floor(parseInt(document.getElementById("Max_Level").value))
  exponent = Math.floor(parseInt(document.getElementById("Exponent").value))
  if(isNaN(multiplier)){
    multiplier = 0.07
  } else if (multiplier < 0){
    multiplier = 0
    document.getElementById("Multiplier").value = 0
  }
  if(isNaN(base)){
    base = 50
  } else if (base < 0){
    base = 0
    document.getElementById("Base").value = 0
  }
  if(isNaN(max_xp)){
    max_xp = 10000
  } else if (max_xp < 0){
    max_xp = 0
    document.getElementById("Max_XP").value = 0
  }
  if(isNaN(max_level)){
    max_level = 40
  } else if (max_level < 0){
    max_level = 0
    document.getElementById("Max_Level").value = 0
  }
  if(isNaN(exponent)){
    exponent = 2
  } else if (exponent < 0){
    exponent = 0
    document.getElementById("Exponent").value = 0
  }
  document.getElementById("Lultiplier").innerHTML = `Current multiplier is ${multiplier}`
  document.getElementById("Lase").innerHTML = `Current base is ${base}`
  document.getElementById("Base").value = base
  document.getElementById("Lax_XP").innerHTML = `Current max XP is ${max_xp}`
  document.getElementById("Max_XP").value = max_xp
  document.getElementById("Lax_Level").innerHTML = `Current max level is ${max_level}`
  document.getElementById("Max_Level").value = max_level
  document.getElementById("Lexponent").innerHTML = `Current exponent is ${exponent}`
  document.getElementById("Exponent").value = exponent
  document.getElementById("Equation").innerHTML = `Floor(level<sup>${exponent}</sup>*${multiplier}+${base})`
  document.getElementById("Caps").innerHTML = `With a maximum output of ${max_xp} XP and a maximum input of level ${(max_level*12)-1}.`
  if(max_xp == 0){
    document.getElementById("Lax_XP").innerHTML = "There is no XP cap"
    document.getElementById("Caps").innerHTML = `With no maximum XP and a maximum input of level ${(max_level*12)-1}.`
  }
}

function calculate_levels(x){
  if(x >= max_level*12){
    return 0
  } else if(max_xp == 0){
    return Math.floor(((x**exponent)*multiplier)+base)
  } else if(((x**exponent)*multiplier)+base > max_xp){
    return max_xp
  } else {
    return Math.floor(((x**exponent)*multiplier)+base)
  }
}

function xp_to_level(x){
  let xp = 0
  console.log(x)
  for(let i = 0; i < x; i++){
    xp += calculate_levels(i)
  }
  return xp
}

function xp_from_level_to_level(x,y){
  if(x >= max_level*12 || y >= max_level*12){
    return `The maximum level is ${max_level*12}, going higher than this causes bugs which is why you're seeing this.`
  }
  let xp1 = 0
  let xp2 = 0
  for(let i = 0; i < x; i++){
    xp1 += calculate_levels(i)
  }
  for(let i = 0; i < y; i++){
    xp2 += calculate_levels(i)
  }
  if(xp1 == xp2){
    return `That's the same level silly!`
  } else if(xp1 > xp2){
    return `You can't go down a level!`
  } else {
    return xp2-xp1
  }
}

function function1(){
  document.getElementById("LevelXP").value = Math.floor(parseInt(document.getElementById("LevelXP").value))
  if(document.getElementById("LevelXP").value < 0){
    document.getElementById("LevelXP").value = 0
  }
  let output1 = calculate_levels(Math.floor(parseInt(document.getElementById("LevelXP").value)))
  let LevelXP = document.getElementById("LevelXP").value
  document.getElementById("output1").innerHTML = `${output1} XP to level up from level ${LevelXP}`
}

function function2(){
  document.getElementById("LevelToReach").value = Math.floor(parseInt(document.getElementById("LevelToReach").value))
  if(document.getElementById("LevelToReach").value < 0){
    document.getElementById("LevelToReach").value = 0
  }
  let output2 = xp_to_level(Math.floor(parseInt(document.getElementById("LevelToReach").value)))
  let LevelToReach = document.getElementById("LevelToReach").value
  document.getElementById("output2").innerHTML = `${output2} XP needed to get from level 0 to level ${LevelToReach}`
}

function function3(){
  document.getElementById("YourLevel").value = Math.floor(parseInt(document.getElementById("YourLevel").value))
  if(document.getElementById("YourLevel").value < 0){
    document.getElementById("YourLevel").value = 0
  }
  document.getElementById("LevelToReach2").value = Math.floor(parseInt(document.getElementById("LevelToReach2").value))
  if(document.getElementById("LevelToReach2").value < 0){
    document.getElementById("LevelToReach2").value = 0
  }
  let output3 = document.getElementById("output3").innerHTML = xp_from_level_to_level(Math.floor(parseInt(document.getElementById("YourLevel").value)),Math.floor(parseInt(document.getElementById("LevelToReach2").value)))
  let YourLevel = document.getElementById("YourLevel").value
  let LevelToReach2 = document.getElementById("LevelToReach2").value
  if(typeof output3 === 'string' || output3 instanceof String){
    document.getElementById("output3").innerHTML = `${output3}`
  } else {
    document.getElementById("output3").innerHTML = `${output3} XP needed to get from level ${YourLevel} to level ${LevelToReach2}`
  }
}
