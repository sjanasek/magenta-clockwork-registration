const path = require('path');

module.exports = {
  pages: {
    'index': {
      entry: './src/pages/visitor/visitor.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    'sales': {
      entry: './src/pages/sales/sales.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: ['chunk-vendors', 'chunk-common', 'sales']
    },
    'backoffice': {
      entry: './src/pages/backoffice/backoffice.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: ['chunk-vendors', 'chunk-common', 'backoffice']
    },
    'warehouse': {
      entry: './src/pages/warehouse/warehouse.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: ['chunk-vendors', 'chunk-common', 'warehouse']
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8088'
      }
    }
  },
  outputDir: path.resolve(__dirname, '../server/public')
};