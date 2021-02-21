const svelteRule = () => (
    {
        test: /\.svelte$/,
        use: {
            loader: 'svelte-loader',
            options: { options }
        }
    }
)

svelteRule.requires = ['svelte', 'svelte-loader']

const miniCssExtractPlugin = () => (
    new MiniCssExtractPlugin({
        filename: '[name].css'
    })
)

miniCssExtractPlugin.imports = ['mini-css-extract-plugin']

const cssRule = () => (
    {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
        ]
    }
)

cssRule.requires = ['css-loader'];
cssRule.requiresPlugin = [miniCssExtractPlugin];

const typescriptRule = () => (
    {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
    }
)

typescriptRule.requires = ['ts-loader', '@tsconfig/svelte']

const coffeeScriptRule = () => (
    {
        test: /\.coffee$/,
        loader: 'coffee-loader',
        exclude: /node_modules/
    }
)

coffeeScriptRule.requires = ['coffeescript', 'coffee-loader'];

module.exports = {
    svelteRule,
    cssRule,
    typescriptRule,
    coffeeScriptRule,
    miniCssExtractPlugin
}