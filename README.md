# Create New Svelte

Create a new [Svelte](https://svelte.dev/) app easily. 

Supported Bundlers:

[Rollup](https://rollupjs.org/) | [Webpack](https://webpack.js.org/) | [Snowpack](https://www.snowpack.dev/)

Languages / Transpilers:

[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) | [TypeScript](https://www.typescriptlang.org/) | [CoffeeScript](https://coffeescript.org/)

## Installing the package

```sh
npm install -g create-new-svelte
```

## Creating an app

After installing `create-new-svelte`, following methods will help you to create a new Svelte app:

### create-new-svelte CLI
```sh
create-new-svelte my-app
```
### FULL USAGE

```sh
create-new-svelte <project-name> [options]

options:

  -V, --version                  output the version number
  -t, --transpiler <transpiler>  specify a transpiler (choices: "none", "typescript", "ts", "coffeescript", "cs", default: "none (javascript)")
  -b, --bundler <bundler-type>   specify the bundler (choices: "rollup", "webpack", "snowpack", default: "rollup")
  --no-install                   create the app only, no package installation
  -h, --help                     display help for command
```


### npx (requires `npm` 5.2+)

```sh
npx create-new-svelte my-app
```

### npm (requires `npm` 6+)

```sh
npm init new-svelte my-app
```

## Folder structure for `default` (javascript template)

```sh
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── rollup.config.js (webpack.config.js for `webpack` bundler)
├── public
│   ├── favicon.png
│   ├── global.css
│   └── index.html
└── src
    ├── App.svelte
    └── main.js
```

## Folder structure for `typescript` or `ts` (typescript template)

```sh
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── rollup.config.js (webpack.config.js for `webpack` bundler)
├── tsconfig.json
├── public
│   ├── favicon.png
│   ├── global.css
│   └── index.html
└── src
    ├── App.svelte
    └── main.ts
```

## Folder structure for `coffeescript` or `cs` (coffeescript template)

```sh
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── rollup.config.js (webpack.config.js for `webpack` bundler)
├── public
│   ├── favicon.png
│   ├── global.css
│   └── index.html
└── src
    ├── App.svelte
    └── main.coffee
```

After creating the app you can go to the application directory:

```sh
cd my-app
```

and run:

```sh 
npm run dev
```

After starting the application you can browse to [http://localhost:5000](http://localhost:5000) to view your new app in the browser.
