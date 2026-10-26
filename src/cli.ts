#!/usr/bin/env node

import { addEntry, listEntries, getEntryById, deleteEntry } from './diary';

function printUsage() {
  console.log(`
Usage: node dist/cli.js <command> [arguments]

Commands:
  add <title> <content>     - Add a new diary entry
  list                      - List all diary entries
  view <id>                 - View a specific entry by ID
  delete <id>               - Delete an entry by ID
  help                      - Show this help message
`);
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'add': {
      if (args.length < 3) {
        console.log('Usage: node dist/cli.js add <title> <content>');
        return;
      }
      const title = args[1];
      const content = args.slice(2).join(' ');
      const entry = addEntry(title, content);
      console.log(`Entry added successfully! ID: ${entry.id}`);
      break;
    }
    case 'list': {
      const entries = listEntries();
      if (entries.length === 0) {
        console.log('No entries found.');
        return;
      }
      entries.forEach(entry => {
        const date = new Date(entry.date).toLocaleString();
        console.log(`\n[${entry.id}] ${entry.title}`);
        console.log(`Date: ${date}`);
        console.log(`Content: ${entry.content}`);
      });
      break;
    }
    case 'view': {
      if (args.length < 2) {
        console.log('Usage: node dist/cli.js view <id>');
        return;
      }
      const id = parseInt(args[1], 10);
      const entry = getEntryById(id);
      if (!entry) {
        console.log(`Entry with ID ${id} not found.`);
        return;
      }
      const date = new Date(entry.date).toLocaleString();
      console.log(`\n[${entry.id}] ${entry.title}`);
      console.log(`Date: ${date}`);
      console.log(`Content: ${entry.content}`);
      break;
    }
    case 'delete': {
      if (args.length < 2) {
        console.log('Usage: node dist/cli.js delete <id>');
        return;
      }
      const id = parseInt(args[1], 10);
      if (deleteEntry(id)) {
        console.log(`Entry ${id} deleted successfully!`);
      } else {
        console.log(`Entry with ID ${id} not found.`);
      }
      break;
    }
    case 'help':
    default:
      printUsage();
      break;
  }
}

main();
