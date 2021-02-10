# Create Svelte App

Create Svelte Apps easily. <img alt="Logo" align="right" src="https://svelte.dev/svelte-logo-horizontal.svg"  />

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

### npx (requires `npm` 5.2+)

```sh
npx create-new-svelte my-app
```

### npm (requires `npm` 6+)

```sh
npm init new-svelte my-app
```

## Folder structure

```sh
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── rollup.config.js
├── scripts
│   └── setupTypeScript.js
├── public
│   ├── favicon.png
│   ├── global.css
│   └── index.html
└── src
    ├── App.svelte
    └── main.js
```

After creating the app you can go to the application directory:

```sh
cd my-app
```

and run:

```sh 
npm start
```

After starting the application you can browse to [http://localhost:5000](http://localhost:5000) to view your new app in the browser.
