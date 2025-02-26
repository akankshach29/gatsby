const { stripIndent } = require(`common-tags`)

const errorMap = {
  "": {
    text: context => {
      const sourceMessage = context.sourceMessage
        ? context.sourceMessage
        : `There was an error`
      return sourceMessage
    },
    level: `ERROR`,
  },
  "95312": {
    text: context =>
      `"${context.ref}" is not available during server side rendering.`,
    level: `ERROR`,
    docsUrl: `https://gatsby.dev/debug-html`,
  },
  "95313": {
    text: context =>
      `Building static HTML failed${
        context.errorPath ? ` for path "${context.errorPath}"` : ``
      }`,
    level: `ERROR`,
    docsUrl: `https://gatsby.dev/debug-html`,
  },
  "98123": {
    text: context => `${context.stageLabel} failed\n\n${context.message}`,
    type: `WEBPACK`,
    level: `ERROR`,
  },
  "85901": {
    text: context =>
      `There was an error in your GraphQL query:\n\n${context.sourceMessage}`,
    type: `GRAPHQL`,
    level: `ERROR`,
  },
  "85907": {
    text: context =>
      `There was an error in your GraphQL query:\n\n${context.message}`,
    type: `GRAPHQL`,
    level: `ERROR`,
  },
  "85908": {
    text: context => {
      const closetFragment = context.closestFragment
        ? `\n\nDid you mean to use ` + `"${context.closestFragment}"?`
        : ``

      return `There was an error in your GraphQL query:\n\nThe fragment "${context.fragmentName}" does not exist.${closetFragment}`
    },
    type: `GRAPHQL`,
    level: `ERROR`,
  },
  "85909": {
    text: context => context.sourceMessage,
    type: `GRAPHQL`,
    level: `ERROR`,
  },
  // Config errors
  "10123": {
    text: context =>
      `We encountered an error while trying to load your site's ${context.configName}. Please fix the error and try again.`,
    type: `CONFIG`,
    level: `ERROR`,
  },
  "10124": {
    text: context =>
      `It looks like you were trying to add the config file? Please rename "${context.nearMatch}" to "${context.configName}.js"`,
    type: `CONFIG`,
    level: `ERROR`,
  },
  "10125": {
    text: context =>
      `Your ${context.configName} file is in the wrong place. You've placed it in the src/ directory. It must instead be at the root of your site next to your package.json file.`,
    type: `CONFIG`,
    level: `ERROR`,
  },
  "10126": {
    text: context =>
      `${context.path}/${context.configName} cannot export a function.` +
      `\n\nA ${context.configName} exported as a Function can only be used as a theme and not run directly.` +
      `\nIf you are trying to run a theme directly, use the theme in an example site or starter instead and run that site to test.` +
      `\nIf you are in the root gatsby-config.js for your site, change the export to be an object and not a function as functions` +
      `\nare not supported in the root gatsby-config.`,
    type: `CONFIG`,
    level: `ERROR`,
  },
  // Plugin errors
  "11321": {
    text: context =>
      `"${context.pluginName}" threw an error while running the ${context.api} lifecycle:\n\n${context.message}`,
    type: `PLUGIN`,
    level: `ERROR`,
  },
  "11322": {
    text: context =>
      `${
        context.pluginName
      } created a page and didn't pass the path to the component.\n\nThe page object passed to createPage:\n${JSON.stringify(
        context.pageObject,
        null,
        4
      )}\n\nSee the documentation for the "createPage" action — https://www.gatsbyjs.org/docs/actions/#createPage`,
    level: `ERROR`,
  },
  "11323": {
    text: context =>
      `${
        context.pluginName
      } must set the page path when creating a page.\n\nThe page object passed to createPage:\n${JSON.stringify(
        context.pageObject,
        null,
        4
      )}\n\nSee the documentation for the "createPage" action — https://www.gatsbyjs.org/docs/actions/#createPage`,
    level: `ERROR`,
  },
  "11324": {
    text: context =>
      `${context.message}\n\nSee the documentation for the "createPage" action — https://www.gatsbyjs.org/docs/actions/#createPage`,
    level: `ERROR`,
  },
  "11325": {
    text: context =>
      `${
        context.pluginName
      } created a page with a component that doesn't exist.\n\nThe path to the missing component is "${
        context.component
      }"\n\nThe page object passed to createPage:\n${JSON.stringify(
        context.pageObject,
        null,
        4
      )}\n\nSee the documentation for the "createPage" action — https://www.gatsbyjs.org/docs/actions/#createPage`,
    level: `ERROR`,
  },
  "11326": {
    text: context =>
      `${
        context.pluginName
      } must set the absolute path to the page component when create creating a page.\n\nThe (relative) path you used for the component is "${
        context.component
      }"\n\nYou can convert a relative path to an absolute path by requiring the path module and calling path.resolve() e.g.\n\nconst path = require("path")\npath.resolve("${
        context.component
      }")\n\nThe page object passed to createPage:\n${JSON.stringify(
        context.pageObject,
        null,
        4
      )}\n\nSee the documentation for the "createPage" action — https://www.gatsbyjs.org/docs/actions/#createPage`,
    level: `ERROR`,
  },
  "11327": {
    text: context =>
      `You have an empty file in the "src/pages" directory at "${context.relativePath}". Please remove it or make it a valid component`,
    level: `ERROR`,
  },
  "11328": {
    text: context =>
      `A page component must export a React component for it to be valid. Please make sure this file exports a React component:\n\n${context.fileName}`,
    level: `ERROR`,
  },
  // invalid or deprecated APIs
  "11329": {
    text: context =>
      [
        stripIndent(`
          Your plugins must export known APIs from their gatsby-${context.exportType}.js.
      
          See https://www.gatsbyjs.org/docs/${context.exportType}-apis/ for the list of Gatsby ${context.exportType} APIs.
        `),
      ]
        .concat([``].concat(context.errors))
        .concat(
          context.fixes.length > 0
            ? [
                ``,
                `Some of the following may help fix the error(s):`,
                ``,
                ...context.fixes.map(fix => `- ${fix}`),
              ]
            : []
        )
        .join(`\n`),
    level: `ERROR`,
  },
  // node object didn't pass validation
  "11467": {
    text: context =>
      [
        `The new node didn't pass validation: ${context.validationErrorMessage}`,
        `Failing node:`,
        JSON.stringify(context.node, null, 4),
        `Note: there might be more nodes that failed validation. Output is limited to one node per type of validation failure to limit terminal spam.`,
        context.codeFrame,
      ]
        .filter(Boolean)
        .join(`\n\n`),
    level: `ERROR`,
    docsUrl: `https://www.gatsbyjs.org/docs/actions/#createNode`,
  },
  // local SSL certificate errors
  "11521": {
    text: () =>
      `for custom ssl --https, --cert-file, and --key-file must be used together`,
    level: `ERROR`,
    docsUrl: `https://www.gatsbyjs.org/docs/local-https/#custom-key-and-certificate-files`,
  },
  "11522": {
    text: () => `Failed to generate dev SSL certificate`,
    level: `ERROR`,
    docsUrl: `https://www.gatsbyjs.org/docs/local-https/#setup`,
  },
  // cli new command errors
  "11610": {
    text: context =>
      `It looks like you gave wrong argument orders . Try running instead "gatsby new ${context.starter} ${context.rootPath}"`,
    level: `ERROR`,
    docsUrl: `https://www.gatsbyjs.org/docs/gatsby-cli/#new`,
  },
  "11611": {
    text: context =>
      `It looks like you passed a URL to your project name. Try running instead "gatsby new new-gatsby-project ${context.rootPath}"`,
    level: `ERROR`,
    docsUrl: `https://www.gatsbyjs.org/docs/gatsby-cli/#new`,
  },
  "11612": {
    text: context =>
      `Could not create a project in "${context.path}" because it's not a valid path`,
    level: `ERROR`,
    docsUrl: `https://www.gatsbyjs.org/docs/gatsby-cli/#new`,
  },
  "11613": {
    text: context => `Directory ${context.rootPath} is already an npm project`,
    level: `ERROR`,
    docsUrl: `https://www.gatsbyjs.org/docs/gatsby-cli/#new`,
  },
}

module.exports = { errorMap, defaultError: errorMap[``] }
