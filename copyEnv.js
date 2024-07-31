const fs = require('fs');
const path = require('path');

// 루트 디렉토리와 워크스페이스 디렉토리 경로
const rootDir = path.resolve(__dirname);
const workspacesDir = path.join(rootDir, 'packages');

// 복사할 파일 경로
const envFile = path.join(rootDir, '.env');

// 제외할 워크스페이스 이름
const excludedWorkspace = 'EntryDesignSystem';

// .env 파일을 읽고 각 워크스페이스 디렉토리에 복사하는 함수
const copyEnvFile = () => {
  // .env 파일이 존재하는지 확인
  if (!fs.existsSync(envFile)) {
    console.error('.env file not found in the root directory.');
    process.exit(1);
  }

  // packages 디렉토리 내의 모든 워크스페이스 디렉토리를 읽음
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

      // 디렉토리인지 확인
      if (fs.lstatSync(workspacePath).isDirectory()) {
        // .env 파일을 워크스페이스 디렉토리로 복사
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

// 스크립트 실행
copyEnvFile();
