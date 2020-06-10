module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('autoprefixer')({
      grid: true
    })
  ]
};