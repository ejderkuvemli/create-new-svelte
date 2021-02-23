function NoTranspiler(bundler) {
    this.init = () => {
        
        bundler.app.config.v('preprocessOptions', () => (
            {
                sourceMap: true
            }
        ));
        bundler.s('build', 'parcel build src/main.js -o bundle.js -d public/build --public-url ./', ['parcel-bundler']);
        bundler.s('watch', 'parcel watch src/main.js -o bundle.js -d public/build --public-url ./', ['parcel-bundler']);
    }
}

module.exports = NoTranspiler;