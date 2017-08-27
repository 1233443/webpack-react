const postcssConditionals=require("postcss-conditionals")();
const postcssSimpleVars=require("postcss-simple-vars")();
const postcssEach=require("postcss-each")();
const postcssFor=require("postcss-for")();
const postcssMixins=require("postcss-mixins")();
const postcssImport=require("postcss-import")();
const postcssNested=require("postcss-nested")();
const postcssAtroot=require("postcss-atroot")();
const postcssCssnext=require("cssnext")({
  features:{
    rem:false
  }
});
const extend=require("postcss-extend");
const autoprefixer =require("autoprefixer")({
  browsers: ['ie>=8', '>1% in CN']
})
module.exports={
  plugins:[
    postcssConditionals,
    postcssSimpleVars,
    postcssEach,
    postcssFor,
    postcssMixins,
    postcssImport,
    postcssNested,
    postcssAtroot,
    postcssCssnext,
    extend,
    autoprefixer
]}
