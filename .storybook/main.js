const path = require('path')
const fs = require('fs')

function findStories() {
  function findStoriesPathsInDirectory(lookupPath) {
    const stories = []

    fs.readdirSync(lookupPath).forEach((fileName) => {
      const filePath = lookupPath + '/' + fileName

      const stats = fs.statSync(filePath)

      if (stats.isDirectory()) {
        stories.push(...findStoriesPathsInDirectory(filePath))
      } else if (filePath.endsWith('.stories.tsx')) {
        stories.push(filePath)
      }
    })

    return stories
  }

  const rootPath = path.join(__dirname, '..', 'src')

  return findStoriesPathsInDirectory(rootPath)
}

module.exports = {
  "stories": findStories,
  // uncomment default config to make it work again
  // "stories": [
  //   "../src/**/*.stories.mdx",
  //   "../src/**/*.stories.@(js|jsx|ts|tsx)"
  // ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  "webpackFinal": (config) => {
      const path = require('path');
      // add monorepo root as a valid directory to import modules from
      config.resolve.plugins.forEach((p) => {
        if (Array.isArray(p.appSrcs)) {
          p.appSrcs.push(path.join(__dirname, '..', '..', '..', 'storybook'));
        }
      });
      return config;
    }
    
}