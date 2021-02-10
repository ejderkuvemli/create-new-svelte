# Create New Svelte

Create a new Svelte app easily. You can either select `default` (javascript) or `typescript` as a project template.

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

  -V, --version                      output the version number
  -t, --template <project-template>  specify a project template for the project (choices: "default", "typescript", "ts", default: "default")
  -h, --help                         display help for command
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
├── rollup.config.js
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
├── rollup.config.js
├── tsconfig.json
├── public
│   ├── favicon.png
│   ├── global.css
│   └── index.html
└── src
    ├── App.svelte
    └── main.ts
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
