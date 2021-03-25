const { getNumber } = require("./numbers")
const { flow, map } = require("lodash/fp")
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

module.exports = {
  scanNumber,
  splitAccountNumber,
  scanNumbers,
  validateAccountNumber,
  getAccountValidationReport,
  generateAccountValidationReport,
}
