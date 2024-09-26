import * as readLine from 'readline';
import { stdin as input, stdout as output } from 'process';

const rl  = readLine.createInterface({input,output});

function question(query){
  return new Promise(resolve=>{
    rl.question(query,resolve);
  })
}

let ans = await question('Enter a simple equation: ');

while(ans !== 'quit'){
  try{
    const value = eval(ans);
    console.log(`${value}`);
  }catch(exception){
    console.log('i dont know how to do that');
  }
  ans = await question('Enter a simple equation: ');
}
rl.close();