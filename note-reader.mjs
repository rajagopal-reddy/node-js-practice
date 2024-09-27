import {getNotes, saveNotes} from './note-manager.mjs';
import {question,close} from './rl.mjs';
import axios from 'axios';
import Parser from 'rss-parser';
// import https from 'https';


const notes = await getNotes();
const parser  = new Parser();

let input = await question('Enter command (list, add, del, read, quit): ');

while (input !== 'quit') {
  let cmdParts = input.trim().split(' ');
  let cmd = cmdParts[0];

  if (cmd === 'list') {
    notes.forEach((note, index) => console.log(`${index}\t ${note}`));
  }

  if (cmd === 'add') {
    if (cmdParts.length < 2) {
      console.log('invalid command');
    } else {
      notes.push(cmdParts[1]);
    }
  }

  if (cmd === 'del') {
    if (cmdParts.length < 2) {
      console.log('invalid command');
    } else {
      let index = parseInt(cmdParts[1], 10);
      if (index > -1 && index < notes.length) {
        notes.splice(index, 1);
      } else {
        console.log('invalid index');
        
      }
    }
  }

  if (cmd === 'read') {
    if (cmdParts.length < 2) {
      console.log('invalid command');
    } else {
      let index = parseInt(cmdParts[1], 10);
      if (index > -1 && index < notes.length) {
      let {data} = await axios.get('https://www.reddit.com/r/node.rss');
    // console.log(data);

      let note = await parser.parseString(data);
      note.items.forEach((item) => console.log(`${item.title}`));
    }else {
      console.log('invalid index');
    
    }
  }
}


  // if (cmd === 'read') {
  //   https.get('https://www.reddit.com/r/node.rss', (res) => {
  //     let content = '';
  //     res.on('data', (chunk) => {
  //       content += chunk;
  //     });
  //     res.on('end', () => {   //we need to know when it ends and send the content
  //       console.log(content);
  //     });
  //   });

  // }


  input = await question('Enter command (list, add, del, read, quit): '); 
}

await saveNotes(notes);
close();