// rollup.config.js
import path from 'path';
import { fileURLToPath } from 'url';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import copy from 'rollup-plugin-copy';
import alias from '@rollup/plugin-alias';

// Fix para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/main.js',
  output: [
    {
      dir: 'dist',
      format: 'es',
      sourcemap: !isProduction,
      entryFileNames: 'bundle.esm.js',
      chunkFileNames: '[name]-[hash].js',
    },
  ],
  external: isProduction ? ['preact', 'preact/hooks', 'preact/compat'] : [],
  plugins: [
    alias({
      entries: [
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: '@loopr', replacement: path.resolve(__dirname, 'src/loopr') },
      ],
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
      dedupe: ['preact'],
    }),
    copy({
      targets: [
        {
          src: 'src/index.html',
          dest: 'dist',
          transform: contents => {
            let html = contents.toString();
            // Solo agregar livereload en desarrollo
            if (!isProduction) {
              html = html.replace(
                '</body>',
                '  <script src="http://localhost:35729/livereload.js?snipver=1"></script>\n  </body>'
              );
            }
            return html;
          },
        },
      ],
    }),
    postcss({
      plugins: [postcssImport()],
      extract: 'style.css',
      minimize: isProduction,
      sourceMap: !isProduction,
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx'],
      presets: [['@babel/preset-react', { pragma: 'h' }]],
    }),

    // Plugins solo para desarrollo
    !isProduction &&
      serve({
        contentBase: 'dist',
        port: 3000,
        host: 'localhost',
        open: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }),
    !isProduction &&
      livereload({
        watch: 'dist',
        verbose: true,
        port: 35729,
      }),

    // Plugin solo para producción
    isProduction &&
      terser({
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        mangle: {
          reserved: ['h', 'render'],
        },
      }),
  ].filter(Boolean),
};
