module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
    'pre-commit': 'npm run format:check',
    'pre-push': './bin/preflight.sh'
  }
};
