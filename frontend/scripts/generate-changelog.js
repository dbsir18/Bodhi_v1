/**
 * Build-time script: reads recent git commits and writes them
 * to src/data/changelog.json so the app can display them.
 *
 * Runs automatically before every build via the "prebuild" npm script.
 * Also runs before "start" via "prestart".
 *
 * Commits that start with "chore:", "merge", or "wip" are skipped.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SKIP_PATTERNS = [
  /^merge/i,
  /^wip/i,
  /^chore:/i,
  /^fixup!/i,
  /^squash!/i,
  /^updates?$/i,
];

const MAX_ENTRIES = 4;

function run() {
  let raw;
  try {
    // Get recent commits: hash, date, subject
    raw = execSync(
      `git log --pretty=format:"%H|||%ai|||%s" -n 50`,
      { cwd: path.resolve(__dirname, '..', '..'), encoding: 'utf-8' }
    );
  } catch {
    console.warn('[changelog] git not available, using empty changelog');
    raw = '';
  }

  const entries = raw
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [hash, dateStr, subject] = line.split('|||');
      return { hash, date: dateStr, subject };
    })
    .filter(({ subject }) => !SKIP_PATTERNS.some((p) => p.test(subject)))
    .slice(0, MAX_ENTRIES)
    .map(({ hash, date, subject }) => ({
      date: formatDate(date),
      entry: cleanMessage(subject),
      hash: hash.slice(0, 7),
    }));

  const outPath = path.join(__dirname, '..', 'src', 'data', 'changelog.json');
  fs.writeFileSync(outPath, JSON.stringify(entries, null, 2));
  console.log(`[changelog] wrote ${entries.length} entries to changelog.json`);
}

function formatDate(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function cleanMessage(s) {
  // Strip conventional commit prefixes (feat:, fix:, etc.)
  let msg = s.replace(/^(feat|fix|refactor|style|docs|test|perf|build|ci)(\(.+?\))?:\s*/i, '');
  // Remove trailing periods
  msg = msg.replace(/\.+$/, '');
  // Capitalise first letter
  msg = msg.charAt(0).toUpperCase() + msg.slice(1);
  return msg;
}

run();
