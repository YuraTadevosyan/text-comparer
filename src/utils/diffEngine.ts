import * as Diff from 'diff';
import { DiffLine } from '../types';

export function calculateDiff(original: string, changed: string): DiffLine[] {
  const diff = Diff.diffLines(original, changed);
  const result: DiffLine[] = [];
  
  let leftLine = 1;
  let rightLine = 1;

  diff.forEach((part) => {
    const lines = part.value.split('\n');
    // Remove the last empty string if the value ended with a newline
    if (lines[lines.length - 1] === '') lines.pop();

    lines.forEach((line) => {
      if (part.added) {
        result.push({
          type: 'added',
          rightLineNumber: rightLine++,
          content: line,
        });
      } else if (part.removed) {
        result.push({
          type: 'removed',
          leftLineNumber: leftLine++,
          content: line,
        });
      } else {
        result.push({
          type: 'unchanged',
          leftLineNumber: leftLine++,
          rightLineNumber: rightLine++,
          content: line,
        });
      }
    });
  });

  return result;
}

export function calculateWordDiff(oldStr: string, newStr: string) {
  return Diff.diffWords(oldStr, newStr);
}

export function calculateCharDiff(oldStr: string, newStr: string) {
  return Diff.diffChars(oldStr, newStr);
}

export function calculateStats(diffLines: DiffLine[], original: string, changed: string) {
  const additions = diffLines.filter(l => l.type === 'added').length;
  const removals = diffLines.filter(l => l.type === 'removed').length;
  
  // Basic word difference for "Changed words" metric
  const originalWords = original.trim().split(/\s+/).filter(Boolean);
  const changedWords = changed.trim().split(/\s+/).filter(Boolean);
  const wordDiff = Diff.diffWords(original, changed);
  const changedWordsCount = wordDiff.filter(p => p.added || p.removed).length;

  // Similarity calculation (Levenshtein based or simple ratio)
  const totalLength = Math.max(original.length, changed.length);
  if (totalLength === 0) return { additions, removals, changes: 0, similarity: 100 };
  
  const distance = Diff.diffChars(original, changed).reduce((acc, part) => {
    return acc + (part.added || part.removed ? part.value.length : 0);
  }, 0);
  
  const similarity = Math.max(0, Math.round(((totalLength - distance) / totalLength) * 100));

  return {
    additions,
    removals,
    changes: changedWordsCount,
    similarity,
  };
}
