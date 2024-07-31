const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname);
const workspacesDir = path.join(rootDir, 'packages');

const envFile = path.join(rootDir, '.env');

const excludedWorkspace = 'EntryDesignSystem';

const copyEnvFile = () => {
  if (!fs.existsSync(envFile)) {
    console.error('.env file not found in the root directory.');
    process.exit(1);
  }

  fs.readdir(workspacesDir, (err, folders) => {
    if (err) {
      console.error('Failed to read packages directory:', err);
      process.exit(1);
    }

    folders.forEach((folder) => {
      if (folder === excludedWorkspace) {
        console.log(`Skipping ${folder}`);
        return;
      }

      const workspacePath = path.join(workspacesDir, folder);
      const destEnvFile = path.join(workspacePath, '.env');

      if (fs.lstatSync(workspacePath).isDirectory()) {
        fs.copyFile(envFile, destEnvFile, (err) => {
          if (err) {
            console.error(`Failed to copy .env file to ${workspacePath}:`, err);
          } else {
            console.log(`.env file copied to ${workspacePath}`);
          }
        });
      }
    });
  });
};

copyEnvFile();
