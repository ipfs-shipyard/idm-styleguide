# nomios-web-uikit

Nomios' living Web UIkit.


## Base technology

- React
- CSS modules
- [PostCSS](https://github.com/postcss/postcss) with [MOXY's preset](https://github.com/moxystudio/postcss-preset-moxy)
- Automatically enables [keyboard-online-outlines](https://github.com/moxystudio/js-keyboard-only-outlines) so that outlines are only shown when necessary


## Setup

It's assumed that you will consume this package in an application bundled with Webpack. Follow the steps below:

1. Activate CSS modules

    Activate [CSS modules](https://github.com/webpack-contrib/css-loader#modules) for this package directory (or for your whole project if you like):

    ```js
    {
        test: /\.css$/,
        include: path.resolve(__dirname, 'node_modules/@nomios/web-uikit'),
        loader: [
            {
                loader: require.resolve('style-loader'),
            },
            {
                loader: require.resolve('css-loader'),
                options: {
                    modules: true,
                    sourceMap: true,
                    importLoaders: 1,
                    localIdentName: '[name]__[local]___[hash:base64:5]!',
                },
            },
        ],
    },
    ```

    If you are going to use any of the CSS variables or mixins, please add `postcss-loader` after `css-loader`:

    ```js
    {
        loader: require.resolve('postcss-loader'),
        options: require('postcss-preset-moxy')({
            url: 'rebase',
        }),
    }
    ```

2. Add SVG rule

    Support inline SVGs by using `raw-loader` for this package directory (or for your whole project if you like):

    ```js
    {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'node_modules/@nomios/web-uikit'),
        use: [
            require.resolve('raw-loader'),
            {
                loader: require.resolve('svgo-loader'),
                options: {
                    plugins: [
                        { removeTitle: true },
                        { removeDimensions: true },
                        { cleanupIDs: false },
                    ],
                },
            },
            // Uniquify classnames and ids so they don't conflict with each other
            {
                loader: require.resolve('svg-css-modules-loader'),
                options: {
                    transformId: true,
                },
            },
        ],
    },
    ```

3. Import base styles

    Import the styleguide base styles in the app's entry CSS file:

    ```css
    /* src/index.css */
    @import "@nomios/web-uikit/styles";
    ```

    ..or in your entry JavaScript file:

    ```js
    // src/index.js
    import "@nomios/web-uikit/styles/index.css";
    ```

4. Use the components

    ```js
    import { TypingIndicator } from '@nomios/web-uikit';

    <TypingIndicator />
    ```

    You may take a look at all the components by [running the Storybook](https://github.com/ipfs-shipyard/discussify-styleguide#start).

    If you are using the `Modal` component, please call `setAppElement` with your app element:

    ```js
    import { setAppElement } from '@nomios/web-uikit';

    setAppElement('#root');
    ```

## Commands

### start

```sh
$ npm start
```

Starts [Storybook](https://storybook.js.org/).

### build

```sh
$ npm run build
```

Builds the project.

### lint

```sh
$ npm run lint
```

Checks if the project has any linting errors.

### test

```sh
$ npm test
```

Runs the project tests.

### release

```sh
$ npm run release
```

Releases the package. Runs tests, lints and builds the project beforehand. If successful, you may publish the release to npm by running `$ npm publish`.

This command uses [`standard-version`](https://github.com/conventional-changelog/standard-version) underneath. The version is automatically inferred from the [conventional commits](https://conventionalcommits.org/).


## Using a linked version of nomios-web-uikit

In some cases, you may want to make changes to Nomios's Web UIkit at the same time as you work on your project which uses the web-uikit. In order to use a local version of [nomios-web-uikit](https://github.com/ipfs-shipyard/nomios-web-uikit) and have any web-uikit modifications be reflected live on your project, some pages have to be made in your main project.

Some of the instructions below assume you are using Webpack in your main project.

### Install and update dependencies

Run the following command in your main project to install `postcss-import-webpack-resolver`.

```sh
$ npm i postcss-import-webpack-resolver
```

NOTE: if using `postcss-preset-moxy`, it should be of version '^3.0.0' or older.

### Make required changes to your Webpack config

Add two new dependencies. `fs` and `postcss-import-webpack-resolver`.

```js
const fs = require('fs');
const createResolver = require('postcss-import-webpack-resolver');
```

Before exporting the webpack configuration, add the following line to the file. This will check if there is a linked version of `nomios-web-uikit`.

```js
const existsWebUikitSrc = fs.existsSync(path.join(projectDir, 'node_modules/@nomios/web-uikit/src'));
```

In the `resolve` option of your webpack configuration, insert the following. This will allow your project to update when changes occur to `js` files in the web-uikit, without requiring a new web-uikit build.

```js
alias: process.env.NODE_ENV === 'development' && existsWebUikitSrc ? {
    '@nomios/web-uikit': path.join(projectDir, 'node_modules/@nomios/web-uikit/src'),
} : undefined,
```

Pass a [`resolve`](https://github.com/postcss/postcss-import#resolve) option to [`postcss-import` plugin](https://github.com/postcss/postcss-import). This option will create a new alias for the `styles` folder in the web-uikit's `src/` directory. This will have a similar effect as the previous bit of code, but for CSS imports.

```js
resolve: createResolver({
    alias: process.env.NODE_ENV === 'development' && existsWebUikitSrc ? {
        '@nomios/web-uikit/styles': path.join(projectDir, 'node_modules/@nomios/web-uikit/src/styles'),
        } : undefined,
})
```

NOTE: if using `postcss-preset-moxy`, this `resolve` option should be wrapped in the [`import`](https://github.com/moxystudio/postcss-preset-moxy#usage) option.


### Link `nomios-web-uikit` to your main project

Link the projects by running `npm link` inside the root directory of the `nomios-web-uikit` project, then run `npm link @nomios/web-uikit` inside your main project. NOTE: this step has to be retaken every time you run an `npm i` command in your main project, because `npm i` will replace your linked version with an installed version.


## Contributing

If you want to contribute for the project, we encourage you to read over the [Nomios](https://github.com/ipfs-shipyard/pm-idm) repository README.


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php), except for the GT Sectra font files.

Due to the Grilli Type [End User License Agreement (EULA)](https://grillitype.com/api/v1/download/eula_web/Grilli-Type-Web-EULA-1_7.pdf), the GT Sectra font files should not be used outside of this project.
