/** @type {import('next').NextConfig} */
const config = {
  output:'export',
  reactStrictMode: true,
  trailingSlash: true,
  compress: false,
  poweredByHeader: false,
  env:{},
  publicRuntimeConfig:{},
  images:{
    disableStaticImages:true
  },
  webpack:function(config,options){
    config.module.rules.push({
      test: /\.(jpg|png|gif|webp|ogg|mp3|mp4)$/i,
      exclude: config.exclude,
      use: [
        options.defaultLoaders.babel,
        {
          loader: require.resolve('file-loader'),
          options: {
            name: '[contenthash:8].[ext]',
            publicPath: '/_next/static/media/',
            outputPath: 'static/media/',
            esModule: config.esModule || false
          }
        }
      ]
    });
    return config;
  }
};

module.exports = config;
