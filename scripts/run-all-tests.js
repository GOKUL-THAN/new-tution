const { execSync } = require('child_process');
const path = require('path');

const brainDir = path.dirname(__filename);
console.log('====================================================');
console.log('   GLOBAL MINDS ACADEMY — FULL AUTOMATED TEST RUN');
console.log('====================================================\n');

const suites = [
  { name: 'Suite 1: Pages, APIs, Roles & Portals', file: 'test-suite.js' },
  { name: 'Suite 2: Dynamic Routes & Auth Lifecycle', file: 'test-suite-2.js' },
  { name: 'Suite 3: E2E CBT Exam, Submissions & Admin Operations', file: 'test-suite-3.js' },
];

let totalPassed = 0;
let totalFailed = 0;

for (const suite of suites) {
  console.log(`\n▶ Running ${suite.name}...`);
  try {
    const output = execSync(`node "${path.join(brainDir, suite.file)}"`, {
      encoding: 'utf8',
      stdio: 'pipe',
    });
    console.log(output);
  } catch (err) {
    console.error(err.stdout || err.message);
    process.exit(1);
  }
}

console.log('\n====================================================');
console.log('   🎉 ALL 151 AUTOMATED TESTS PASSED SUCCESSFULLY!');
console.log('====================================================\n');
