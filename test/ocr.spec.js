const { writeFile } = require("fs").promises
jest.mock("fs", () => ({
  promises: {
    writeFile: jest.fn().mockResolvedValue(),
    readFile: jest.fn().mockResolvedValue(),
  },
}));

const {
  scanNumber, splitAccountNumber, scanNumbers,
  validateAccountNumber, getAccountValidationReport,
  generateAccountValidationReport,
} = require("../index")

const { invert } = require("lodash/fp")
const numbers = invert(require("../numbers").numbers)

describe("Scanning numbers", () => {
  it("reads 9 0s", () => {
    let input =   " _  _  _  _  _  _  _  _  _ \n"
    input +=      "| || || || || || || || || |\n"
    input +=      "|_||_||_||_||_||_||_||_||_|\n"

    expect(scanNumbers(input)).toBe("000000000")
  })
  it("reads 9 1s", () => {
    let input =   "                           \n"
    input +=      "  |  |  |  |  |  |  |  |  |\n"
    input +=      "  |  |  |  |  |  |  |  |  |\n"

    expect(scanNumbers(input)).toBe("111111111")
  })
  it("reads 1-9", () => {
    let input =   "    _  _     _  _  _  _  _ \n"
    input +=      "  | _| _||_||_ |_   ||_||_|\n"
    input +=      "  ||_  _|  | _||_|  ||_| _|\n"

    expect(scanNumbers(input)).toBe("123456789")
  })
})

describe("scanNumber", () => {
  it("scans a 0", () => {
    let input  = numbers["0"]
    expect(scanNumber(input)).toBe("0")
  })
  it("scans a 1", () => {
    let input  = numbers["1"]
    expect(scanNumber(input)).toBe("1")
  })
  it("scans a 2", () => {
    let input  = numbers["2"]
    expect(scanNumber(input)).toBe("2")
  })
  it("scans a 3", () => {
    let input  = numbers["3"]
    expect(scanNumber(input)).toBe("3")
  })
  it("scans a 4", () => {
    let input  = numbers["4"]
    expect(scanNumber(input)).toBe("4")
  })
  it("scans a 5", () => {
    let input  = numbers["5"]
    expect(scanNumber(input)).toBe("5")
  })
  it("scans a 6", () => {
    let input  = numbers["6"]
    expect(scanNumber(input)).toBe("6")
  })
  it("scans a 7", () => {
    let input  = numbers["7"]
    expect(scanNumber(input)).toBe("7")
  })
  it("scans a 8", () => {
    let input  = numbers["8"]
    expect(scanNumber(input)).toBe("8")
  })
  it("scans a 9", () => {
    let input  = numbers["9"]
    expect(scanNumber(input)).toBe("9")
  })
  it("scans an illegible number ", () => {
    let input  = " - "
    input     += "|  "
    input     += " _|"
    expect(scanNumber(input)).toBe("?")
  })
})

describe("splitAccountNumber", () => {
  it("splits a 9 digit account number into 9 element array", () => {
    let input =   " _  _  _  _  _  _  _  _  _ \n"
    input +=      "| || || || || || || || || |\n"
    input +=      "|_||_||_||_||_||_||_||_||_|\n"
    const zero = numbers["0"]
    const output = [zero, zero, zero, zero, zero, zero, zero, zero, zero]

    expect(splitAccountNumber(input)).toEqual(output)
  })
})

describe("validateAccountNumber", () => {
  it("returns false for an invalid account number", () => {
    const accountNumber = "111111111"

    expect(validateAccountNumber(accountNumber)).toBe(false)
  })
  it("returns true for a valid account number", () => {
    const accountNumber = "345882865"

    expect(validateAccountNumber(accountNumber)).toBe(true)
  })
})

describe("getAccountValidationReport", () => {
  it("return a report for mixed valid, invalid, and illegible accounts", () => {
    const accountNumber1 = "345882865"
    const accountNumber2 = "111111111"
    const accountNumber3 = "?11111111"
    const accountNumber4 = "457508000"
    const accountNumbers = [accountNumber1, accountNumber2, accountNumber3, accountNumber4]

    let   output =  "345882865\n"
          output += "111111111 ERR\n"
          output += "?11111111 ILL\n"
          output += "457508000"
    
    expect(getAccountValidationReport(accountNumbers)).toBe(output)
  })
})

describe("generateAccountValidationReport", () => {
  it("writes a file containing a report", async (done) => {
    let input =   "    _  _     _  _  _  _  _ \n"
    input +=      "  | _| _||_||_ |_   ||_||_|\n"
    input +=      "  ||_  _|  | _||_|  ||_| _|\n"

    await generateAccountValidationReport(input)

    expect(writeFile).toHaveBeenCalledTimes(1)
    done()
  })
})
