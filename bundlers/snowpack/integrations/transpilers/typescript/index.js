const plugins = require('../../../plugins');

function TypescriptTranspiler(bundler) {
    this.init = () => {
        bundler.p(plugins.sveltePlugin, () => ({
            compilerOptions: {
                dev: !prod
            },
            emitCss: prod,
            hotReload: !prod,
            preprocess: sveltePreprocess({ sourceMap: !prod })
        }), ['svelte-preprocess']);
        bundler.p(plugins.typescriptPlugin);

    }
}

module.exports = TypescriptTranspiler;