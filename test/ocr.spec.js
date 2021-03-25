describe.skip("Scanning numbers", () => {
  it("reads 9 0s", () => {
    const input = `
 _  _  _  _  _  _  _  _  _
| || || || || || || || || |
|_||_||_||_||_||_||_||_||_|
    `
    expect(scanNumbers(input)).toBe("000000000")
  })
  it("reads 9 1s", () => {
    const input = `

  |  |  |  |  |  |  |  |  |
  |  |  |  |  |  |  |  |  |
    `
    expect(scanNumbers(input)).toBe("111111111")
  })
  it("read 9 2s", () => {
    const input = `
 _  _  _  _  _  _  _  _  _
 _| _| _| _| _| _| _| _| _|
|_ |_ |_ |_ |_ |_ |_ |_ |_
    `
    expect(scanNumbers(input)).toBe("111111111")
  })
  it("read 9 3s", () => {
    const input = `
 _  _  _  _  _  _  _  _  _
 _| _| _| _| _| _| _| _| _|
 _| _| _| _| _| _| _| _| _|
    `
    expect(scanNumbers(input)).toBe("333333333")
  })
  it("read 9 4s", () => {
    const input = `
|_||_||_||_||_||_||_||_||_|
  |  |  |  |  |  |  |  |  |
    `
    expect(scanNumbers(input)).toBe("444444444")
  })
  it("read 9 5s", () => {
    const input = `
 _  _  _  _  _  _  _  _  _
|_ |_ |_ |_ |_ |_ |_ |_ |_
 _| _| _| _| _| _| _| _| _|
    `
    expect(scanNumbers(input)).toBe("555555555")
  })
  it("read 9 6s", () => {
    const input = `
 _  _  _  _  _  _  _  _  _
|_ |_ |_ |_ |_ |_ |_ |_ |_
|_||_||_||_||_||_||_||_||_|
    `
    expect(scanNumbers(input)).toBe("666666666")
  })
  it("read 9 7s", () => {
    const input = `
 _  _  _  _  _  _  _  _  _
  |  |  |  |  |  |  |  |  |
  |  |  |  |  |  |  |  |  |
    `
    expect(scanNumbers(input)).toBe("777777777")
  })
  it("read 9 8s", () => {
    const input = `
 _  _  _  _  _  _  _  _  _
|_||_||_||_||_||_||_||_||_|
|_||_||_||_||_||_||_||_||_|
    `
    expect(scanNumbers(input)).toBe("888888888")
  })
  it("read 9 9s", () => {
    const input = `
 _  _  _  _  _  _  _  _  _
|_||_||_||_||_||_||_||_||_|
 _| _| _| _| _| _| _| _| _|
    `
    expect(scanNumbers(input)).toBe("999999999")
  })
  it("read 1-9", () => {
    const input = `
    _  _     _  _  _  _  _
  | _| _||_||_ |_   ||_||_|
  ||_  _|  | _||_|  ||_| _|
    `
    expect(scanNumbers(input)).toBe("123456789")
  })
})

describe("scanNumber", () => {
  it("scans a 0", () => {
    const input = `
 _ 
| |
|_|
    `
    expect(scanNumber(input)).toBe("0")
  })
})
