import { defineConfig, type UserConfigExport } from '@tarojs/cli'

export default defineConfig(async (merge) => {
  const config: UserConfigExport = {
    projectName: 'ethioshop-macle',
    date: '2026-11-15',
    designWidth: 375,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [
      '@tarojs/plugin-framework-react',
      [
        '@macle-community/taro-plugin-macle',
        {
          tailwindcss: false,
          maui: {
            autoCopy: false,
            autoInjectComponents: false,
          },
        },
      ],
    ],
    framework: 'react',
    compiler: 'webpack5',
    cache: {
      enable: false,
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false,
        },
      },
    },
  }
  return merge({}, config)
})
