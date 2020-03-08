const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/js/game.js',
  output: {
    filename: 'game_compiled.js',
    path: path.join(__dirname, 'src')
  }
};