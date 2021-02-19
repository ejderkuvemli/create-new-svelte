function svelteRule() {
    rule(
        {
            test: /\.svelte$/,
            use: {
                loader: 'svelte-loader',
                options: {
                    compilerOptions: {
                        dev: !prod
                    },
                    emitCss: prod,
                    hotReload: !prod
                }
            }
        }
    )
}

svelteRule.prototype.requires = ['svelte', 'svelte-loader']

function svelteRuleWithPreprocess() {
    rule(
        {
            test: /\.svelte$/,
            use: {
                loader: 'svelte-loader',
                options: {
                    compilerOptions: {
                        dev: !prod
                    },
                    emitCss: prod,
                    hotReload: !prod,
                    preprocess: sveltePreprocess({ sourceMap: !prod })
                }
            }
        }
    )
}

svelteRuleWithPreprocess.prototype = { imports: ['svelte-preprocess'], requires: ['svelte', 'svelte-loader'] }

function cssRule() {
    rule(
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }
    )
}

cssRule.prototype = { requires: ['css-loader'], requiresPlugin: [miniCssExtractPlugin] }

function typescriptRule() {
    rule(
        {
            test: /\.ts(x)?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }
    )
}

typescriptRule.prototype.requires = ['ts-loader', '@tsconfig/svelte']

function miniCssExtractPlugin() {
    new MiniCssExtractPlugin({
        filename: '[name].css'
    })
}

miniCssExtractPlugin.prototype.imports = ['mini-css-extract-plugin']

module.exports = {
    svelteRule,
    svelteRuleWithPreprocess,
    cssRule,
    typescriptRule,
    miniCssExtractPlugin
}