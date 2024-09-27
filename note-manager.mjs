import {dirname, join} from 'path';
import { fileURLToPath } from 'url';
import { access, constants, writeFile, readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const jsonFile = join(__dirname, 'notes.json'); 
// console.log(jsonFile);

export async function getNotes() {
  try {
    await access(jsonFile, constants.F_OK);
  } catch (error) {
    await writeFile(jsonFile, JSON.stringify([]));
  }
  const notes = await readFile(jsonFile, {encoding: 'utf-8'});
  return JSON.parse(notes);
}

export async function saveNotes(notes) {
  await writeFile(jsonFile, JSON.stringify(notes));
}