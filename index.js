const { getNumber } = require("./numbers")
const { flow, map, chunk } = require("lodash/fp")
const { writeFile } = require("fs").promises

function scanNumbers(accountNumber){
  return splitAccountNumber(accountNumber)
    .map(scanNumber)
    .join("")
}

function scanNumber(number){
  return getNumber(number)
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

function validateAccountNumber(accountNumber){
  const buildChecksum = (currentChecksum, number, index) => {
    return currentChecksum + (number * (index + 1))
  }
  const toNumber = number => +number

  const checksum = accountNumber
    .split("")
    .reverse()
    .map(toNumber)
    .reduce(buildChecksum, 0)

  return checksum % 11 === 0
}

function getAccountValidationReport(scannedAccountNumbers){
  const getAccountMessage = accountNumber => {
    if (validateAccountNumber(accountNumber)){
      return accountNumber
    } else if (accountNumber.includes("?")){
      return `${accountNumber} ILL`
    } else {
      return `${accountNumber} ERR`
    }
  }

  return scannedAccountNumbers
    .map(scanNumbers)
    .map(getAccountMessage)
    .join("\n")
}

function generateAccountValidationReport(accountNumbers){
  const report = getAccountValidationReport(accountNumbers)
    
  return writeFile("report.txt", report)
    .then(() => {
      console.log("Wrote report.txt")
    }).catch(error => {
      console.error(`There was an error writing this report: ${error.message}`)
    })
}

function reconcileAmbiguousNumber(numberScan){
  const rebuildNumber = numberScanArray => {
    let result = ""

    for (let lineNumber = 0; lineNumber < 3; lineNumber++){
      result += numberScanArray[lineNumber].join("")
    }

    console.log(result)

    return getNumber(result)
  }

  const possibilities = []
  const lines = chunk(3)(numberScan.split(""))

  for (let lineNumber = 0; lineNumber < 3; lineNumber++){
    for (let position = 0; position < 3; position++){
      const originalValue = lines[lineNumber][position]

      lines[lineNumber][position] = "-"
      if (rebuildNumber(lines) != "?"){
        possibilities.push(rebuildNumber(lines))
      }

      lines[lineNumber][position] = "|"
      if (rebuildNumber(lines) != "?"){
        possibilities.push(rebuildNumber(lines))
      }

      lines[lineNumber][position] = originalValue
    }
  }

  return possibilities
}

module.exports = {
  scanNumber,
  splitAccountNumber,
  scanNumbers,
  validateAccountNumber,
  getAccountValidationReport,
  generateAccountValidationReport,
  reconcileAmbiguousNumber,
}
