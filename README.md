# vue2.0+wenpack+vant

> A Vue.js project

## Install

``` bash
# install vue-cli
npm install -g vue-cli

# set up project
vue init webpack vue-project

# entry vue-project/
cd vue-project/

# install vant
npm install --save vant

# install babel-plugin-import plug-in
npm i babel-plugin-import -D

# .babelrc set up
{
  "plugins": [
    ["import", {
      "libraryName": "vant",
      "libraryDirectory": "es",
      "style": true
    }]
  ]
}
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
