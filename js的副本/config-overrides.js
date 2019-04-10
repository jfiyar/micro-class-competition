const path = require('path');

const {override,fixBabelImports} = require('customize-cra');
module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    }),function(config){
        config.resolve.alias={"@":path.resolve(__dirname,'./src')};
        return config;
    }
)