const plugins = require('../../../plugins');

function TypescriptTranspiler(bundler) {
    this.init = () => {
        bundler.r(plugins.typescriptRule);
        bundler.config.entry = `{ 'build/bundle': ['./src/main.ts'] }`;
        bundler.r(plugins.svelteRule, () => ({
            compilerOptions: {
                dev: !prod
            },
            emitCss: prod,
            hotReload: !prod,
            preprocess: sveltePreprocess({ sourceMap: !prod })
        }), ['svelte-preprocess']);
        bundler.config.extensions.push('.tsx', '.ts');
    }
}

module.exports = TypescriptTranspiler;