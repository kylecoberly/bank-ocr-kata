const numbers = require("./numbers")

function scanNumbers(accountNumber){
  return splitAccountNumber(accountNumber)
    .map(scanNumber)
    .join("")
}

function scanNumber(number){
  return numbers[number]
}

function splitAccountNumber(accountNumber){
  const lines = accountNumber.split("\n").map(line => line.split(""))

  const splitNumbers = []
  for (let number = 0; number < 9; number++){
    let extractedNumber  = ""
    for (let line = 0; line < 3; line++){
      for (let column = 0; column < 3; column++){
        extractedNumber += lines[line].shift()
      }
    }
    splitNumbers.push(extractedNumber)
  }

  return splitNumbers
}

module.exports = {
  scanNumber,
  splitAccountNumber,
  scanNumbers,
}
