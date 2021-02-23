function CoffeeScriptTranspiler(bundler) {
    this.init = () => {
        
        bundler.app.config.config.exports.preprocess = true;
        bundler.app.config.v('preprocessOptions', () => (
            {
                defaults: {
                    markup: 'html',
                    script: 'coffeescript',
                    style: 'css'
                },
                sourceMap: false
            }
        ));

        bundler.app.packager.add('coffeescript');
        bundler.s('build', 'parcel build src/main.coffee -o bundle.js -d public/build --public-url ./', ['parcel-bundler']);
        bundler.s('watch', 'parcel watch src/main.coffee -o bundle.js -d public/build --public-url ./', ['parcel-bundler']);
    }
}

module.exports = CoffeeScriptTranspiler;