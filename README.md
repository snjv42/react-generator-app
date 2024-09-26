# React Scaffold CLI

![npm](https://img.shields.io/npm/v/react-generator-app) ![npm](https://img.shields.io/npm/dm/react-generator-app) ![license](https://img.shields.io/github/license/your-username/react-generator-app)

## Description

**React Starter CLI** is a powerful command-line tool that helps you set up a React application with best practices and optional features such as CSS preprocessors (Sass, Less), React Router, and Redux. It automates the initial project setup, allowing you to focus on building your application.

## Features

- **Latest React Version**: Always uses the latest version of React.
- **JavaScript or TypeScript**: Choose between JavaScript and TypeScript.
- **CSS Preprocessors**: Optionally include Sass or Less for styling.
- **React Router Integration**: Optional routing setup with React Router.
- **Redux Integration**: Add Redux for state management if needed.
- **Optimized Folder Structure**: Project structure based on best practices.
- **Webpack Setup**: Automatic Webpack configuration for development and production builds.

## Installation

### Global Installation

Install the CLI tool globally using npm:

```bash
npm install -g react-generator-app
```

### Local Installation

Alternatively, you can install it locally within your project:

```bash
npm install --save-dev react-generator-app
```

## Usage

After installing the tool, you can use it to scaffold a new React project with customizable options.

### Create a New React App

```bash
react-generator-app create <project-name>
```

The CLI will prompt you for several configuration options:

1. **Language**: Choose between `JavaScript` and `TypeScript`.
2. **CSS Preprocessor**: Choose between `Sass`, `Less`, or `None`.
3. **React Router**: Option to include `React Router` for routing.
4. **Redux**: Option to include `Redux` for state management.

### Example

```bash
react-generator-app create my-react-app
```

### Sample Prompt Flow:

```bash
? Choose the language: (Use arrow keys)
❯ JavaScript
  TypeScript

? Choose a CSS preprocessor: (Use arrow keys)
  Sass
  Less
❯ None

? Include React Router? (y/n)
❯ Yes
  No

? Include Redux? (y/n)
❯ Yes
  No
```

This will create a new React project in a directory named `my-react-app` with the selected options.

### Run the Project

Once the project is scaffolded, navigate into the project directory:

```bash
cd my-react-app
```

You can now run the development server using:

```bash
npm start
```

### Build the Project

To create a production build, run:

```bash
npm run build
```

## Folder Structure

The CLI sets up your project with the following structure:

```
my-react-app/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.js
│   └── index.js
├── public/
│   └── index.html
├── dist/
├── package.json
├── webpack.config.js
└── .babelrc
```

- **src/components/**: For reusable components.
- **src/pages/**: For page components when using React Router.
- **src/assets/**: For images, fonts, and other static files.
- **webpack.config.js**: Configured with Babel, Webpack, and CSS preprocessors if selected.

## Scripts

After scaffolding the project, the following npm scripts are available:

- `npm start`: Starts the Webpack Dev Server in development mode.
- `npm run build`: Builds the project for production.
- `npm test`: Runs tests (if testing setup is included in the future).

## Contributing

Contributions are welcome! If you find any issues or have suggestions for new features, feel free to open an issue or submit a pull request.

### Local Development

To work on the CLI tool itself:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/react-generator-app.git
   ```

2. Install dependencies:

   ```bash
   cd react-generator-app
   npm install
   ```

3. Test the CLI locally:

   ```bash
   npm link
   ```

4. Now you can use the CLI locally for development:

   ```bash
   react-generator-app create test-project
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Sass](https://sass-lang.com/)
- [Less](https://lesscss.org/)
