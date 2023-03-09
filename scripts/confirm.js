const { expect } = require('expect')
const {
    multiplyNumbers,
    combineStrings,
    equals,
    addNumbers,
    subtractNumbers,
} = require('../dist/main')

const getCleanedMessage = (e) => {
    const [, cleaned] = e.matcherResult.message.split('Expected:')
    return `Expected:${cleaned}`
}

const runExpect = (f) => {
    try {
        f()
        return true
    } catch (e) {
        return getCleanedMessage(e)
    }
}

const tests = {
    'add-numbers': () => expect(addNumbers(1, 2)).toEqual(3),
    'multiply-numbers': () => expect(multiplyNumbers(2, 2)).toEqual(4),
    'combine-strings': () => expect(combineStrings('a', 'b')).toEqual('ab'),
    'subtract-numbers': () => expect(subtractNumbers(3, 1)).toEqual(2),
    equals: () => expect(equals(1, 1)).toEqual(true),
}

const runTests = async () => {
    const { default: chalk } = await import('chalk')
    const resultMap = Object.keys(tests).reduce((memo, testName) => {
        const f = tests[testName]
        const result = runExpect(f)
        return {
            ...memo,
            [testName]: result,
        }
    }, {})

    Object.keys(resultMap).forEach((testName) => {
        const result = resultMap[testName]
        if (result === true) {
            console.log(chalk.green(`${testName}  \u2713 \n`))
            return
        }

        console.log(chalk.red(`${testName}  \u2715 \n`))
        console.log(`${result}\n`)
    })
}

runTests()
