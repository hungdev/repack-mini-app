import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as Repack from '@callstack/repack';
import rspack from '@rspack/core';
import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// To run the app without the host app, change this to 'true'
const STANDALONE = false;

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

export default env => {
  const {platform, mode} = env;

  return {
    mode,
    context: __dirname,
    entry: './index.js',
    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      path: path.resolve(__dirname, `build/generated/${platform}`),
      uniqueName: 'RepackMiniApp',
    },
    module: {
      rules: [
        ...Repack.getJsTransformRules(),
        ...Repack.getAssetTransformRules(),
      ],
    },
    plugins: [
      new Repack.RepackPlugin({
        platform,
      }),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'MiniApp',
        filename: 'MiniApp.container.js.bundle',
        dts: false,
        exposes: {
          './App': './App.tsx',
          './AppContainer': './AppContainer.tsx',
          './HomeScreen': './src/HomeScreen.tsx',
          './RootStack': './src/RootStack.tsx',
          './slices': './store/index.ts',
        },
        remotes: {
          // RepackHostApp: `RepackHostApp@http://localhost:9009/${platform}/RepackHostApp.container.js.bundle`,
          // MiniAppSecond: `MiniAppSecond@http://localhost:9005/${platform}/MiniAppSecond.container.js.bundle`,
        },
        shared: {
          // Đảm bảo không tạo instance mới của SharedRedux
          // 'RepackHostApp/SharedRedux': {
          //   singleton: true,
          //   eager: false, // Quan trọng: Không load ngay, đợi host provide
          // },
          // Share dependencies
          ...Object.fromEntries(
            Object.entries(pkg.dependencies).map(([dep, version]) => {
              return [
                dep,
                {
                  singleton: true,
                  eager: STANDALONE,
                  requiredVersion: version,
                  version: version.replace('^', ''),
                },
              ];
            }),
          ),
        },
      }),
      // Supports for new architecture - Hermes can also use JS, it's not a requirement,
      // it will still work the same but it's for performance optimization
      new Repack.plugins.HermesBytecodePlugin({
        enabled: mode === 'production',
        test: /\.(js)?bundle$/,
        exclude: /index.bundle$/,
      }),
      // silence missing @react-native-masked-view optionally required by @react-navigation/elements
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
    ignoreWarnings: [
      /Critical dependency: require function is used in a way in which dependencies cannot be statically extracted/,
    ],
  };
};
