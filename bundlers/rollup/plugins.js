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
function sveltePlugin() {
    svelte({
        compilerOptions: {
            // enable run-time checks when not in production
            dev: !production
        }
    })
}

sveltePlugin.prototype.imports = ['rollup-plugin-svelte'];

function sveltePluginWithPreprocess() {
    svelte({
        preprocess: sveltePreprocess({ sourceMap: !production }),
        compilerOptions: {
            // enable run-time checks when not in production
            dev: !production
        }
    })
}

sveltePluginWithPreprocess.prototype.imports = ['rollup-plugin-svelte', 'svelte-preprocess'];

function cssPlugin() {
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' })
}

cssPlugin.prototype.imports = ['rollup-plugin-css-only'];

function resolvePlugin() {

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
        browser: true,
        dedupe: ['svelte']
    })
}

resolvePlugin.prototype.imports = ['@rollup/plugin-node-resolve']

function commonjsPlugin() {
    commonjs()
}

commonjsPlugin.prototype.imports = ['@rollup/plugin-commonjs']

function typescriptPlugin() {
    typescript({
        sourceMap: !production,
        inlineSources: !production
    })
}

typescriptPlugin.prototype = { imports: ['@rollup/plugin-typescript'], requires: ['typescript', '@tsconfig/svelte'] }

function servePlugin() {

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve()
}

servePlugin.prototype.needs = [serve]

function livereloadPlugin() {

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public')
}

livereloadPlugin.prototype.imports = ['rollup-plugin-livereload'];

function terserPlugin() {

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
}

terserPlugin.prototype.imports = ['rollup-plugin-terser'];


module.exports = {
    serve,
    sveltePlugin,
    sveltePluginWithPreprocess,
    cssPlugin,
    resolvePlugin,
    commonjsPlugin,
    typescriptPlugin,
    servePlugin,
    livereloadPlugin,
    terserPlugin
}