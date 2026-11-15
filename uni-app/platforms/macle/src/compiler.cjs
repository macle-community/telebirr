'use strict'

const path = require('node:path')
const {
  COMPONENT_CUSTOM_HIDDEN,
  getNativeTags,
  registerPlatform,
  transformComponentLink,
  transformRef,
} = require('@dcloudio/uni-cli-shared')
const { default: initMiniProgramPlugin } = require('@dcloudio/uni-mp-vite')

registerPlatform('macle')

const weixinPackage = '@dcloudio/uni-mp-weixin/dist/'
const apiRuntime = path.resolve(__dirname, 'runtime/api.mjs')
const platformRuntime = path.resolve(__dirname, 'runtime/platform.mjs')
const projectConfig = path.resolve(__dirname, '../project.config.json')

const templateOptions = {
  class: {
    array: true,
  },
  slot: {
    fallbackContent: false,
    dynamicSlotNames: true,
  },
  event: {
    key: true,
  },
  directive: 'ma:',
  component: {
    dir: 'maclecomponents',
    vShow: COMPONENT_CUSTOM_HIDDEN,
    normalizeName: (name) => name,
  },
  customElements: [
    'ad-custom',
    'keyboard-accessory',
    'navigation-bar',
    'page-container',
    'page-meta',
    'share-element',
    'voip-room',
    ...getNativeTags(process.env.UNI_INPUT_DIR, process.env.UNI_PLATFORM),
  ],
  filter: {
    lang: 'sjs',
    extname: '.sjs',
    generate(filter, filename) {
      if (filename) {
        return `<sjs src="${filename}.sjs" module="${filter.name}"/>`
      }
      return `<sjs module="${filter.name}">\n${filter.code}\n</sjs>`
    },
  },
  compilerOptions: {
    nodeTransforms: [transformRef, transformComponentLink],
  },
}

const options = {
  vite: {
    alias: {
      '@dcloudio/uni-platform': platformRuntime,
      'uni-mp-runtime': require.resolve(`${weixinPackage}uni.mp.esm.js`),
    },
    inject: {
      uni: [require.resolve(`${weixinPackage}uni.api.esm.js`), 'default'],
      wx: [apiRuntime, 'wx'],
      ma: [apiRuntime, 'ma'],
    },
    copyOptions: {
      assets: [],
      targets: [
        {
          src: [projectConfig],
          get dest() {
            return process.env.UNI_OUTPUT_DIR
          },
        },
      ],
    },
  },
  global: 'ma',
  app: {
    subpackages: true,
    usingComponents: true,
  },
  project: {
    filename: 'project.config.json',
    config: ['project.config.json'],
    source: {
      compileType: 'macle',
    },
  },
  template: {
    ...templateOptions,
    extname: '.maml',
  },
  style: {
    extname: '.mass',
  },
}

const plugin = {
  name: 'uni:platform-macle',
  config() {
    return {
      define: {
        __VUE_CREATED_DEFERRED__: false,
      },
    }
  },
}

module.exports.default = [plugin, ...initMiniProgramPlugin(options)]
