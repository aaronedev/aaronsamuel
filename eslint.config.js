import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  eslintConfigPrettier, // Prettier configuration
  ...pluginVue.configs['flat/recommended'], // Vue 3 flat config

  {
    files: ['**/*.vue'], // Apply rules only to .vue files
    rules: {
      'vue/multi-word-component-names': 'off', // Disable multi-word component name rule
      // Add other custom rules here
    },
  },
];
