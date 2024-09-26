#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import { execa } from 'execa';
import * as path from 'path';
import fs from 'fs-extra';
import ora from 'ora';

const program = new Command();

const createFile = (filepath, content) => {
    fs.outputFileSync(filepath, content);
};

const createReactApp = async (projectName, language, cssFramework, useRouter, useRedux) => {
    const projectPath = path.join(process.cwd(), projectName);

    console.log(`Creating project folder at ${projectPath}...`);
    fs.ensureDirSync(projectPath);

    // Create essential folders
    fs.ensureDirSync(path.join(projectPath, 'public'));
    fs.ensureDirSync(path.join(projectPath, 'src'));

    // Create public/index.html
    createFile(
        path.join(projectPath, 'public', 'index.html'),
        `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${projectName}</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="bundle.js"></script>
    </body>
    </html>`
    );

    // Create src/index.js
    createFile(
        path.join(projectPath, 'src', 'index.js'),
        `import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    ReactDOM.render(<App />, document.getElementById('root'));`
    );

    // Create src/App.js
    createFile(
        path.join(projectPath, 'src', 'App.js'),
        `import React from 'react';

    function App() {
      return (
        <div>
          <h1>Welcome to ${projectName}!</h1>
        </div>
      );
    }

    export default App;`
    );

    // Create .gitignore
    createFile(
        path.join(projectPath, '.gitignore'),
        `node_modules
    .env`
    );

    // Create .babelrc
    createFile(
        path.join(projectPath, '.babelrc'),
        `{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}`
    );

    // Create webpack.config.js
    createFile(
        path.join(projectPath, 'webpack.config.js'),
        `const path = require('path');
        const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Regex to match .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Add support for .jsx file extensions
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Update this line
    },
    compress: true,
    port: 9000,
  },
plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'), // Adjust path as needed
    }),
  ],
  mode: 'development', // Set mode to development
};
`
    );
    // Create package.json
    createFile(
        path.join(projectPath, 'package.json'),
        `{
      "name": "${projectName}",
      "version": "1.0.0",
      "private": true,
      "dependencies": {},
      "scripts": {
        "start": "webpack serve --mode development --open",
        "build": "webpack --mode production"
      }
    }`
    );

    // Navigate into project folder
    process.chdir(projectPath);

    // Install dependencies
    const spinner = ora('Installing dependencies...').start();
    await execa('npm', ['init', '-y']);
    await execa('npm', ['install', 'react', 'react-dom']);

    await execa('npm', ['install', '--save-dev', 'webpack', 'webpack-cli', 'webpack-dev-server']);
    await execa('npm', ['install', '--save-dev', 'html-webpack-plugin']);
    await execa('npm', ['install', '--save-dev', 'babel-loader', '@babel/core', '@babel/preset-env', '@babel/preset-react']);

    if (language === 'TypeScript') {
        await execa('npm', ['install', '--save-dev', 'typescript', '@types/react', '@types/react-dom']);
        console.log('TypeScript installed');
    }

    if (cssFramework === 'TailwindCSS') {
        await execa('npm', ['install', 'tailwindcss']);
        console.log('TailwindCSS installed');
    }

    if (useRouter) {
        await execa('npm', ['install', 'react-router-dom']);
        console.log('React Router installed');
    }

    if (useRedux) {
        await execa('npm', ['install', 'redux', 'react-redux']);
        console.log('Redux installed');
    }
    spinner.succeed('React app setup complete!');
};

program
    .command('create <project-name>')
    .description('Create a new React project')
    .action(async (projectName) => {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'language',
                message: 'Choose language:',
                choices: ['JavaScript', 'TypeScript'],
            },
            {
                type: 'list',
                name: 'cssFramework',
                message: 'Choose CSS framework:',
                choices: ['None', 'TailwindCSS', 'Styled Components'],
            },
            {
                type: 'confirm',
                name: 'useRouter',
                message: 'Include React Router?',
            },
            {
                type: 'confirm',
                name: 'useRedux',
                message: 'Include Redux for state management?',
            },
        ]);

        await createReactApp(projectName, answers.language, answers.cssFramework, answers.useRouter, answers.useRedux);
    });

program.parse(process.argv);
