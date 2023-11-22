const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs/promises');

async function upload() {
  if (!fs.existsSync('codeyet.json')) {
    console.log('No codeyet.json file found');
    return;
  }

  const metricsContent = await fs.readFile('codeyet.json', 'utf8');
  const metrics = JSON.parse(metricsContent);
  console.log(metrics);
}

try {
  const token = core.getInput('token');
  console.log(`Token: ${token}!`);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  upload();
} catch (error) {
  core.setFailed(error.message);
}
