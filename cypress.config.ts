import { defineConfig } from "cypress";


module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000/',
  },
  env: {
    "input": "[class^='input_input']",
    "circle": "[class*=circle_content]",
  }
})
