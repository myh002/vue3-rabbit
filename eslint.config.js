import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import pluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,

  {
    files: ['**/*.{js,vue}'],
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true, // 单引号
          semi: false, // 无分号
          printWidth: 100, // 每行宽度至多80字符
          trailingComma: 'none', // 不加对象|数组最后逗号
          endOfLine: 'auto' // 换行符号不限制（win mac 不一致）
        }
      ],
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['index']
        }
      ],
      'vue/no-setup-props-destructure': 'off',
      'no-undef': 'error'
    },
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  }
]
