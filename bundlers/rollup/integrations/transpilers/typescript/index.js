const plugins = require('../../../plugins');

function TypescriptTranspiler(bundler) {
    this.init = () => {
        bundler.config.entry = `'src/main.ts'`;
        bundler.p(plugins.sveltePlugin, () => ({
            preprocess: sveltePreprocess({ sourceMap: !prod }),
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !prod
            }
        }), ['svelte-preprocess']);
        bundler.p(plugins.typescriptPlugin);
    }
}

module.exports = TypescriptTranspiler;