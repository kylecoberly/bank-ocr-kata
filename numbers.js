let zero  = " _ "
zero     += "| |"
zero     += "|_|"

let one  = "   "
one     += "  |"
one     += "  |"

let two = " _ "
two    += " _|"
two    += "|_ "

let three = " _ "
three    += " _|"
three    += " _|"

let four = "   "
four    += "|_|"
four    += "  |"

let five = " _ "
five    += "|_ "
five    += " _|"

let six = " _ "
six    += "|_ "
six    += "|_|"

let seven = " _ "
seven    += "  |"
seven    += "  |"

let eight = " _ "
eight    += "|_|"
eight    += "|_|"

let nine = " _ "
nine    += "|_|"
nine    += " _|"

const numbers = {}
numbers[zero] = "0"
numbers[one] = "1"
numbers[two] = "2"
numbers[three] = "3"
numbers[four] = "4"
numbers[five] = "5"
numbers[six] = "6"
numbers[seven] = "7"
numbers[eight] = "8"
numbers[nine] = "9"

function getNumber(numberScan){
  return numbers[numberScan]
    ? numbers[numberScan]
    : "?"
}

module.exports = {
  numbers,
  getNumber,
}
