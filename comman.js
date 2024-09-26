const readLine = require('readline');
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

function t() {
  rl.question('Enter a simple equation: ', (input) => {
    if (input === 'quit') {
      rl.close();
    } else{
    try {
      const value = eval(input);
      console.log(`${value}`);
    } catch (exception) {
      console.log("i dont know how to do that");
    }

    t();
  }
  });
}

t();