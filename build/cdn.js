"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// @ts-ignore
const esdk_obs_nodejs_new_1 = tslib_1.__importDefault(require("esdk-obs-nodejs-new"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const obsConfig = JSON.parse(fs_1.default.readFileSync('obs.json').toString());
const obs = new esdk_obs_nodejs_new_1.default({
    access_key_id: obsConfig.ak,
    secret_access_key: obsConfig.sk,
    server: obsConfig.url
});
const fileNames = fs_1.default.readdirSync('lib');
const pk = JSON.parse(fs_1.default.readFileSync('package.json').toString());
const projectName = pk.name;
upload();
function upload() {
    fileNames.forEach(name => {
        let ContentType = '';
        let realFileName = name;
        let encoding = null;
        if (name.endsWith('.gz')) {
            realFileName = name.replace('.gz', '');
            encoding = 'gzip';
        }
        if (realFileName.endsWith('.js')) {
            ContentType = 'text/javascript';
        }
        else if (realFileName.endsWith('.css')) {
            ContentType = 'text/css';
        }
        const Key = `${projectName}/${pk.version}/${name}`;
        obs.putObject({
            Bucket: 'aegis-public-assets',
            Key,
            SourceFile: 'lib/' + name,
            ContentType,
            ContentEncoding: encoding
        }).then((res) => {
            if (res.CommonMsg.Status === 200) {
                console.log('上传文件【' + name + '】成功, 发布的地址为:\nhttps://public-file.aegis-info.com/' + Key);
            }
        });
    });
}
