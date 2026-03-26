import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest', // 最新版本的 ECMAScript
      sourceType: 'module',
      globals: {
        console: 'readonly', // 允许使用 console
        process: 'readonly', // 允许使用 process
        ElMessage: 'readonly',
        setTimeout: 'readonly',
        ElNotification: 'readonly',
        ElMessageBox: 'readonly',
        document: 'readonly',
        HTMLDivElement: 'readonly',
        window: 'readonly',
        requestAnimationFrame: 'readonly',
        ElLoading: 'readonly',
        fetch: 'readonly',
        HTMLElement: 'readonly',
        clearTimeout: 'readonly',
        WebSocket: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly'
      },
    },
  },
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    rules: {
      /* --------- 基础 JS 代码质量 --------- */
      'no-var': 'error',
      'prefer-const': 'warn',
      'no-unused-vars': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-unexpected-multiline': 'warn',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-trailing-spaces': 'warn',
      eqeqeq: ['warn', 'always'],

      /* --------- 风格优化类 --------- */
      'comma-dangle': ['warn', 'always-multiline'],
      semi: ['warn', 'never'],
      quotes: ['warn', 'single'],
      'object-curly-spacing': ['warn', 'always'],
      'max-len': [
        'warn',
        {
          code: 100,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
        },
      ],

      /* --------- 最实用的逻辑限制 --------- */
      'no-duplicate-imports': 'error',
      'no-undef': ['error'],
      'no-unsafe-finally': 'error',
      'no-case-declarations': 'warn',

      /* -------- Vue 相关 -------- */
      'vue/no-unused-vars': 'warn',
      'vue/multi-word-component-names': ['warn', { ignores: ['index'] }],
      'vue/no-v-html': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/html-self-closing': [
        'warn',
        {
          html: { void: 'never', normal: 'always', component: 'always' },
        },
      ],

      /* -------- TypeScript 常用 -------- */
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn'],
    },
  },
)
