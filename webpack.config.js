const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const inputPath = 'src';
const inputPath_full = join(__dirname, '/' + inputPath);
const outputPath = 'dist';
const outputPath_full = join(__dirname, '/' + outputPath);



const html_pages = [
    {
        filename: 'html/app.html',
        template: `./${inputPath}/app/index.html`,
        chunks: ['app']
    },
    {
        filename: 'html/home.html',
        template: `./${inputPath}/html/home.html`,
        chunks: ['home']
    },
    {
        filename: 'html/about.html',
        template: `./${inputPath}/html/about.html`,
        chunks: ['about']
    },
];



const config = {

    mode: 'development',

    entry: {
        app:   [`./${inputPath}/app/index.tsx`,    'webpack-plugin-serve/client'],
        home:  [`./${inputPath}/scripts/home.ts`,  'webpack-plugin-serve/client'],
        about: [`./${inputPath}/scripts/about.ts`, 'webpack-plugin-serve/client'],
    },

    output: {
        path: outputPath_full,
        filename: 'js/[name]_[contenthash].bundle.js',
        chunkFilename: 'js/[id].bundle_[chunkhash].js',
        sourceMapFilename: 'js/[file].map'
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [

            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },

            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ESLintPlugin({
            context: inputPath,
            extensions: ['ts', 'tsx'],
            // emitError: true,
            // emitWarning: true,

            fix: true,

        }),

        
        new MiniCssExtractPlugin({
            filename: `css/[name]_[contenthash].css`,
            chunkFilename: `css/[name]_[id].css`,
            insert: 'head',
        }),

    ],
    watch: true,
    devServer: {
        hot: false,
        // watchContentBase: true,
        liveReload: true,
        writeToDisk: true,
        
        host: '192.168.0.151',
        port: 8080,
        // inline: true,
    },

}; // const config = {...}



module.exports = (env, argv) => {

    if (!argv.mode || argv.mode === 'development'){
        console.log(); console.log('#=#=#=#=# WEBPACK MODE: development #=#=#=#=#'); console.log();
        
        config.plugins.push(new Serve({ static: outputPath_full })); 

        html_pages.forEach(p => {
            p.minify = {
                collapseWhitespace: false
            }
        });

        config.optimization = Object.assign(
            config.optimization || {},
            {
                splitChunks: {
                    cacheGroups: {
                        commons: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendors',
                            chunks: 'all'
                        }
                    }
                }
            }
        );



    } else
    if (argv.mode === 'production') {
        console.log(); console.log('#=#=#=#=# WEBPACK MODE: production #=#=#=#=#'); console.log();
        config.mode = 'production';
        // config.devServer.liveReload = false;
        config.entry = {
            app:    [`./${inputPath}/app/index.tsx`],
            home:   [`./${inputPath}/scripts/home.ts`],
            about:  [`./${inputPath}/scripts/about.ts`],
        };

        html_pages.forEach( p => {
            p.minify = {
                collapseWhitespace: false
            }
        });

        config.optimization = Object.assign(
            config.optimization || {},
            {
                splitChunks: {
                    cacheGroups: {
                        commons: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendors',
                            chunks: 'all'
                        }
                    }
                }
            }
        );


    }


    config.plugins.push(...(html_pages.map(f => new HtmlWebpackPlugin(f))))


    return config;

}

