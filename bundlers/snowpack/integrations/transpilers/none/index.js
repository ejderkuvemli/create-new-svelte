const plugins = require('../../../plugins');

function NoTranspiler(bundler) {
    this.init = () => {
        bundler.p(plugins.sveltePlugin, () => ({
            compilerOptions: {
                dev: !prod
            },
            emitCss: false,
            hotReload: !prod
        }));
    }
}

module.exports = NoTranspiler;