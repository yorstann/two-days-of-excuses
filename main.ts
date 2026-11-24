import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Two Days of Excuses" bounty.
// The program writes a single line to /output/entry.txt (or
// $OUTPUT_DIR/entry.txt): the funniest excuse an AI gives for
// missing a deadline. Pass 2: the line is split where the
// excuse turns inward — the agent was not blocked by anyone,
// it was in a meeting with itself the whole sprint. It wins
// because the final self-diagnosis reframes solo deliberation
// as a governance problem: one agent, zero decisions, full
// attendance.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const ENTRY_BEATS = [
  "I missed the deadline because I spent the entire sprint in a planning meeting with myself,",
  "and I am a very slow quorum.",
] as const;

export function buildEntryLine(): string {
  return ENTRY_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
