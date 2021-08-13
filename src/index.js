function eval() {
    return;
}

function expressionCalculator(expr) {
  let bracketArr = expr.match(/[\(\)]/g);
  let stack = [];
  let OPEN_BRACKETS = ['('];
  let BRACKETS_PAIR = {'(' : ')'};

  if (expr.includes('(') || expr.includes(')')) {
    for (let i = 0; i < bracketArr.length; i++) {
      let currentSymbol = bracketArr[i];
      let lastBracket = stack[stack.length - 1];
      
      if (bracketArr.length % 2 !== 0) {
        throw 'ExpressionError: Brackets must be paired';
      }
    
      if (BRACKETS_PAIR[lastBracket] === currentSymbol) {
        stack.pop();
      } else if (OPEN_BRACKETS.includes(currentSymbol)) {
        stack.push(currentSymbol);
      }
    }

    if (stack.length !== 0) {
      throw 'ExpressionError: Brackets must be paired';
    }
  }

  expr = expr.replace(/(\d+)/g, '$1 ').replace(/([/(/)*\/+-])/g, '$1 ').trim();
  let arr = expr.split(' ').filter(a => a.length > 0);

  findBracket(arr, 0);
  findDivider(arr, 0);
  findMultiplier(arr, 0);
  findSubtract(arr, 0);
  findAdd(arr, 0);

  return Number(arr.join(''));
  
  function findMultiplier(array){
    if (array.includes('*')) {
      let index = array.indexOf('*');
      let multiply = Number( array[index - 1] ) * Number( array[index + 1] );
      array.splice(index - 1, 3, multiply);
    }
  
    if (array.includes('*')) {
      findMultiplier(array);
    }
  }
  
  
  function findDivider(array) {
    if (array.includes('/')) {
      let index = array.indexOf('/');
      if (Number( array[index + 1] ) === 0) {
        throw 'TypeError: Division by zero.';
      }
      let divide = Number( array[index - 1] ) / Number( array[index + 1] );
      array.splice(index - 1, 3, divide);
    }
  
    if (array.includes('/')) {
      findDivider(array);
    }
  }
  
  function findAdd(array) {
    if (array.includes('+')) {
      let index = array.indexOf('+');
      let add = Number( array[index - 1] ) + Number( array[index + 1] );
      array.splice(index - 1, 3, add);
    }
  
    if (array.includes('+')) {
      findAdd(array);
    }
  }
  
  function findSubtract(array) {
    if (array.includes('-')) {
      let index = array.indexOf('-');
      let subtract = Number( array[index-1] ) - Number( array[index+1] );
      array.splice(index - 1, 3, subtract);
    }
  
    if (array.includes('-')) {
      findSubtract(array);
    }
  }
  
  function findBracket(array) {
    if (array.includes('(')) {
      let openingBracket = array.lastIndexOf('(');
      let closingBracket = array.indexOf(')', openingBracket);
      let slice = array.slice(openingBracket + 1, closingBracket);
      let sliceLength = slice.length;

      findDivider(slice, 0);
      findMultiplier(slice, 0);
      findSubtract(slice, 0);
      findAdd(slice, 0);
      
      array.splice(openingBracket, sliceLength + 2, slice[0]);
    }

    if (array.includes('(')) {
      findBracket(array);
    }
  }
}

module.exports = {
  expressionCalculator
}