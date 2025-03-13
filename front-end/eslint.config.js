import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
// Importa il plugin Tailwind (da installare prima con --legacy-peer-deps)
import tailwindcss from 'eslint-plugin-tailwindcss'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      // Aggiungi il plugin tailwindcss
      tailwindcss: tailwindcss,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': "off",
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Disabilita la regola che verifica le classi non definite per essere compatibile con Tailwind 4.0
      'tailwindcss/no-custom-classname': 'off',
      // Puoi attivare queste regole se desideri l'ordinamento delle classi
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-contradicting-classname': 'error',
    },
    // Aggiungi le impostazioni per tailwindcss
    settings: {
      tailwindcss: {
        config: './tailwind.config.js',
        removeDuplicates: true,
        skipClassAttribute: false,
      },
    },
  },
]