import * as fs from 'fs';
import * as path from 'path';

interface DiaryEntry {
  id: number;
  title: string;
  content: string;
  date: string;
}

const DATA_FILE = path.join(__dirname, '../diary.json');

export function loadEntries(): DiaryEntry[] {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

export function saveEntries(entries: DiaryEntry[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2));
}

export function addEntry(title: string, content: string): DiaryEntry {
  const entries = loadEntries();
  const entry: DiaryEntry = {
    id: entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1,
    title,
    content,
    date: new Date().toISOString()
  };
  entries.push(entry);
  saveEntries(entries);
  return entry;
}

export function listEntries(): DiaryEntry[] {
  return loadEntries();
}

export function getEntryById(id: number): DiaryEntry | undefined {
  return loadEntries().find(entry => entry.id === id);
}

export function deleteEntry(id: number): boolean {
  const entries = loadEntries();
  const index = entries.findIndex(entry => entry.id === id);
  if (index === -1) return false;
  entries.splice(index, 1);
  saveEntries(entries);
  return true;
}
