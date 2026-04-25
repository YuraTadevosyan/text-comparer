/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DiffLine {
  type: 'added' | 'removed' | 'unchanged' | 'modified';
  leftLineNumber?: number;
  rightLineNumber?: number;
  content: string;
}

export interface ComparisonResult {
  id: string;
  timestamp: number;
  originalText: string;
  changedText: string;
  diffLines: DiffLine[];
  stats: {
    additions: number;
    removals: number;
    changes: number;
    similarity: number;
  };
}
