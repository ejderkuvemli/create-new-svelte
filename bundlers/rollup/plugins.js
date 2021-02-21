function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        }
    };
}

//  plugins
const sveltePlugin = () => (
    svelte({options})
)

sveltePlugin.imports = ['rollup-plugin-svelte'];

const cssPlugin = () => (
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' })
)

cssPlugin.imports = ['rollup-plugin-css-only'];

const resolvePlugin = () => (

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
        browser: true,
        dedupe: ['svelte']
    })
)

resolvePlugin.imports = ['@rollup/plugin-node-resolve']

const commonjsPlugin = () => (
    commonjs()
)

commonjsPlugin.imports = ['@rollup/plugin-commonjs']

const typescriptPlugin = () => (
    typescript({
        sourceMap: !prod,
        inlineSources: !prod
    })
)

typescriptPlugin.imports = ['@rollup/plugin-typescript'];
typescriptPlugin.requires =  ['typescript', '@tsconfig/svelte'];

const servePlugin = () => (

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !prod && serve()
)

servePlugin.needs = [serve]

const livereloadPlugin = () => (

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !prod && livereload('public')
)

livereloadPlugin.imports = ['rollup-plugin-livereload'];

const terserPlugin = () => (

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    prod && terser()
)

terserPlugin.imports = ['rollup-plugin-terser'];

const coffeeScriptPlugin = () => (
    coffee({sourceMap: true})
)

coffeeScriptPlugin.imports = ['rollup-plugin-coffee-script'];
coffeeScriptPlugin.requires =  ['coffeescript'];

module.exports = {
    serve,
    sveltePlugin,
    cssPlugin,
    resolvePlugin,
    commonjsPlugin,
    typescriptPlugin,
    coffeeScriptPlugin,
    servePlugin,
    livereloadPlugin,
    terserPlugin
}