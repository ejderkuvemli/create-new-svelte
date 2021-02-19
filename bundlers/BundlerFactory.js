const RollupBundler = require('./rollup');
const WebpackBundler = require('./webpack');

function BundlerFactory(app) {
    this.create = function () {
        let bundler;
 
        if (app.o.bundler === "rollup") {
            bundler = new RollupBundler(app);
        } else if (app.o.bundler === "webpack") {
            bundler = new WebpackBundler(app);
        }
 
        return bundler;
    }
}

module.exports = BundlerFactory;