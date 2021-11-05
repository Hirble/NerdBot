const factorPrimes = (message, args) => {
  // create an array of prime numbers to factor the given number by
  const primeNums = [2, 3, 5, 7, 11, 17, 23];

  // we will update the corresponding element in the array for each prime 
  // used to factor. for example, 6 would be:
  // [1, 1, 0, 0, 0, 0, 0]
  // for one 2 and one 3
  let primeNumsUsed = [0, 0, 0, 0, 0, 0, 0];

  // get the input number 
  let number = args[0];

  // a surprise tool that will help us later
  let i = primeNums.length();

  // factor until number is 1
  while (number != 1) {

    // factor the number from the highest element in primeNums to the lowest
    while (number % primeNums[i] == 0) {
      primeNumsUsed[i] += 1;
      number = number / primeNums[i];
    }

    // decrement i, going to the next prime number
    --i;
  }

  // this will be used to check whether or not there's a number before
  // the current number, so we don't add a random "*"
  let numBefore = false;

  let output = "";

  // create the string to return
  for (let i = 0; i < primeNums.length(); ++i) {
    if (primeNumsUsed[i] != 0 && numBefore) {
      output += " * " + primeNums[i] + "^" + primeNumsUsed[i];
      continue;
    }
    else if (primeNumsUsed[i] != 0) {
      output += primeNums[i] + "^" + primeNumsUsed[i];
      numBefore = true;
      continue;
    }
  }

  // return answer
  return message.channel.send('The unique prime factorization is: ' + output);
}



module.exports = {
  name: 'primefactor',
  description: 'finds the numbers unique prime representation',
  cooldown: 0,
  execute(client, message, cmd, args) {

    factorPrimes(message, args);

  }
}