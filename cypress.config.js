const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    numTestsKeptInMemory: 0,
    setupNodeEvents(on, config) {
      const envFilePath = path.join(__dirname, '.cypress.env.json');
      if (fs.existsSync(envFilePath)) {
        const fileContent = fs.readFileSync(envFilePath, 'utf8');
        const fileEnv = JSON.parse(fileContent);
        config.env = {
          ...config.env,
          ...fileEnv
        };
      }

      return config;
    },
  },
});
