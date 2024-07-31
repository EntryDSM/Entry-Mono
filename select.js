const { default: inquirer } = require('inquirer');
const { spawn } = require('child_process');

const questions = [
  {
    type: 'list',
    name: 'file',
    message: 'Whats the project you want to run?:',
    choices: ['Admission-LTS', 'Entry-Auth', 'EntryDesignSystem'],
  },
];

inquirer.prompt(questions).then((answers) => {
  let command, args;

  if (answers.file === 'Entry-Auth') {
    command = 'yarn';
    args = ['workspace', '@entrydsm/auth', 'run', 'dev'];
  } else if (answers.file === 'EntryDesignSystem') {
    command = 'yarn';
    args = ['workspace', '@entrydsm/design-system', 'run', 'start'];
  } else if (answers.file === 'Admission-LTS') {
    command = 'yarn';
    args = ['workspace', '@entrydsm/admission', 'run', 'dev'];
  }

  const child = spawn(command, args, { shell: true });

  child.stdout.on('data', (data) => {
    console.log(`${data}`);
  });

  child.stderr.on('data', (data) => {
    console.error(`${data}`);
  });

  child.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
});
