const plugins = require('../../../plugins');

function NoTranspiler(bundler) {
    this.init = () => {
        bundler.config.entry = `{ 'build/bundle': ['./src/main.js'] }`;
        bundler.r(plugins.svelteRule, () => ({
            compilerOptions: {
                dev: !prod
            },
            emitCss: prod,
            hotReload: !prod
        }));
    }
}

module.exports = NoTranspiler;