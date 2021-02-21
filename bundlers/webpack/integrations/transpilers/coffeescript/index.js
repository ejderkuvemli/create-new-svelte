const plugins = require('../../../plugins');

function CoffeeScriptTranspiler(bundler) {
    this.init = () => {
        bundler.config.entry = `{ 'build/bundle': ['./src/main.coffee'] }`;
        bundler.r(plugins.svelteRule, () => ({
            compilerOptions: {
                dev: !prod
            },
            emitCss: prod,
            hotReload: !prod,
            preprocess: sveltePreprocess()
        }), ['svelte-preprocess']);
        bundler.r(plugins.coffeeScriptRule);
        bundler.config.extensions.push('.coffee');
    }
}

module.exports = CoffeeScriptTranspiler;