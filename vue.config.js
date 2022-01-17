// export const css = {
//     loaderOptions: {
//         sass: {
//             prependData: '@import "@/assets/styles.scss"'
//         }
//     }
// };
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/vue-test-1/'
      : '/'
  }