import BigNumber from 'bignumber.js'

function MathExpressionParser(expression: string) {
  // + - * / ( ) [ ]
  const tokens = expression.match(/(\d+(\.\d+)?|[+\-*/()])/g)
  if (!tokens) {
    throw new Error('Invalid expression')
  }

  const outputQueue: (BigNumber | string)[] = []
  const operatorStack: string[] = []

  const precedence: { [key: string]: number } = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  }

  const applyOperator = () => {
    const operator = operatorStack.pop()
    const b = outputQueue.pop() as BigNumber
    const a = outputQueue.pop() as BigNumber
    let result: BigNumber
    switch (operator) {
      case '+':
        result = a.plus(b)
        break
      case '-':
        result = a.minus(b)
        break
      case '*':
        result = a.multipliedBy(b)
        break
      case '/':
        result = a.dividedBy(b)
        break
      default:
        throw new Error('Unknown operator')
    }
    outputQueue.push(result)
  }

  for (const token of tokens) {
    if (!isNaN(Number(token))) {
      outputQueue.push(new BigNumber(token))
    } else if ('+-*/'.includes(token)) {
      while (operatorStack.length && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
        applyOperator()
      }
      operatorStack.push(token)
    } else if (token === '(') {
      operatorStack.push(token)
    } else if (token === ')') {
      while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
        applyOperator()
      }
      operatorStack.pop() // Remove '('
    }
  }

  while (operatorStack.length) {
    applyOperator()
  }

  if (outputQueue.length !== 1) {
    throw new Error('Invalid expression')
  }

  return outputQueue[0].toString()
}

export default MathExpressionParser
