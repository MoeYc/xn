const fs = require('fs')
const chalk = require('chalk')

const msgPath = process.argv[2];
if (!msgPath) process.exit();

const msg = fs.readFileSync(msgPath, "utf-8").trim();
const commitRE =
  /^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release|dep|Merge|example)(\(.+\))?: .{1,50}/i;

if (!commitRE.test(msg)) {
  console.error(
    `  ${chalk.bgRed.white(" ERROR ")} ${chalk.red(
      `invalid commit message format.`
    )}\n\n` +
      chalk.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      ) +
      `    ${chalk.green(`feat(bundler-webpack): add 'comments' option`)}\n` +
      `    ${chalk.green(`fix(core): handle events on blur (close #28)`)}\n`
  );
  process.exit(1);
}
