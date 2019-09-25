function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr){

  const OPERATORS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
      if (b == 0){
        throw Error("TypeError: Devision by zero.");
      }
      return a / b;
    }
  }

  let accum = 0, op = '+', current = "", fPOps = false;
  let pAccum = 0, mOp = '', bCounter = 0;
  for (let i = 0; i < expr.length; i++){
      if (expr[i] === ' '){
          continue;
      } else if (expr[i] in OPERATORS){
          if (expr[i] === '*' || expr[i] === '/'){
              if (!fPOps){
                  fPOps = true;
                  pAccum = Number(current);
              } else {
                  pAccum = OPERATORS[mOp](pAccum, Number(current));
              }
              mOp = expr[i];
          } else {
              let n = Number(current);
              if (fPOps){
                  pAccum = OPERATORS[mOp](pAccum, n);
                  accum = OPERATORS[op](accum, pAccum);
                  pAccum = 0;
                  fPOps = false
              } else {
                  accum = OPERATORS[op](accum, n);
              }
              op = expr[i];
          }
          current = "";
      } else if (expr[i] == '('){
          ++bCounter;
          let j = i + 1;
          for (; j < expr.length; j++){
              if (expr[j] == ')'){
                  --bCounter;
              } else if (expr[j] == '('){
                  ++bCounter;
              }
              if (bCounter == 0){
                  evaluated = false;
                  current = expressionCalculator(expr.slice(i + 1, j));
                  break;
              }
          }
          if (bCounter !== 0){
              throw Error("ExpressionError: Brackets must be paired");
          }
          i = j;
      } else if (expr[i] == ')'){
          throw Error("ExpressionError: Brackets must be paired");
      } else {
          current += expr[i];
      }
  }
  if (fPOps && mOp == '*' && pAccum === 0){
    pAccum = OPERATORS[mOp](pAccum, Number(current));
  } else if (pAccum !== 0){
      pAccum = OPERATORS[mOp](pAccum, Number(current));
      accum = OPERATORS[op](accum, pAccum);
  } else {
      accum = OPERATORS[op](accum, Number(current));
  }
  return accum;
}

module.exports = {
    expressionCalculator
}