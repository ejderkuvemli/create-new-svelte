const sveltePlugin = () => (
    ['@snowpack/plugin-svelte', { options }]
)

sveltePlugin.requires = ['svelte', '@snowpack/plugin-svelte']

const typescriptPlugin = () => (
    ['@snowpack/plugin-typescript']
)

typescriptPlugin.requires = ['typescript', '@snowpack/plugin-typescript', '@tsconfig/svelte']

const webpackPlugin = () => (
    ['@snowpack/plugin-webpack',
        {
            extendConfig: (config) => {
                config = {
                    entry: '/src/main.js',
                    output: {
                        path: path.resolve(__dirname, 'public/build'),
                        filename: 'main.js'
                    },
                    module: {
                        rules: [
                            {
                                test: /\.svelte$/,
                                use: {
                                    loader: 'svelte-loader',
                                    options: {
                                        compilerOptions: {
                                            dev: !prod
                                        },
                                        emitCss: false,
                                        hotReload: !prod
                                    }
                                }
                            }
                        ]
                    },
                    optimization: {
                        minimize: false
                    },
                    resolve: {
                        extensions: [
                            '.mjs', '.js', '.svelte'
                        ]
                    },
                    plugins: [
                        new CleanWebpackPlugin()
                    ]
                };

                return config;
            }
        },
    ]
)

webpackPlugin.imports = ['@snowpack/plugin-webpack']

const coffeeScriptPlugin = () => (
    ['@snowpack/plugin-run-script', {
        cmd: 'coffee -o public/build src/',
        watch: 'coffee --no-header --map --watch -o public/build src/'
    }]
)

coffeeScriptPlugin.requires = ['@snowpack/plugin-run-script']

module.exports = {
    sveltePlugin,
    typescriptPlugin,
    coffeeScriptPlugin,
    webpackPlugin
}