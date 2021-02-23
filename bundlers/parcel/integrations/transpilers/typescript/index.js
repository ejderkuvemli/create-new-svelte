function TypescriptTranspiler(bundler) {
    this.init = () => {
        
        bundler.app.config.config.exports.preprocess = true;
        bundler.app.config.v('preprocessOptions', () => (
            {
                sourceMap: true
            }
        ));
        bundler.app.packager.add('@tsconfig/svelte');
        bundler.app.packager.add('typescript');
        bundler.s('build', 'parcel build src/main.ts -o bundle.js -d public/build --public-url ./', ['parcel-bundler']);
        bundler.s('watch', 'parcel watch src/main.ts -o bundle.js -d public/build --public-url ./', ['parcel-bundler']);
    }
}

module.exports = TypescriptTranspiler;