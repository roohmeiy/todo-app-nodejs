module.exports = {
  "env": {
      "node": true,
      "es6": true,  // This enables ES6 support
      "jest": true  // This is for your test files
  },
  "extends": "eslint:recommended",
  "parserOptions": {
      "ecmaVersion": 2018,  // This allows modern JavaScript features
      "sourceType": "module"
  },
  "rules": {
      "no-unused-vars": "warn",
      "no-console": "off"
  }
}