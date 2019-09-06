import ObsClient from 'esdk-obs-nodejs';
import fs from 'fs';

const obsConfig = JSON.parse(fs.readFileSync('obs.json').toString());
const obs = new ObsClient({
  access_key_id: obsConfig.ak,
  secret_access_key: obsConfig.sk,
  server: obsConfig.url
});
const fileNames = fs.readdirSync('lib');
const content = fs
  .readFileSync('.git/config')
  .toString();
const urlLine = content.split('\n').map(it => it.trim()).find(it => it.startsWith('url = '));
const url = urlLine.replace('url = ', '');
const urlParts = url.split('/');
const projectName = urlParts[urlParts.length - 1].substr(0, urlParts[urlParts.length - 1].lastIndexOf('.'));

const json = fs.readFileSync('package.json').toString();
const pk = JSON.parse(json);

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
    } else if (realFileName.endsWith('.css')) {
      ContentType = 'text/css';
    }
    const Metadata: any = {};
    if (encoding) {
      Metadata['content-encoding'] = encoding;
    }
    const Key = `${projectName}/${pk.version}/${name}`;
    obs.putObject({
      Bucket: 'aegis-public-assets',
      Key,
      SourceFile: 'lib/' + name,
      ContentType,
      Metadata
    }).then((res) => {
      if (res.CommonMsg.Status === 200) {
        console.log('上传文件【' + name + '】成功, 发布的地址为:\nhttps://public-file.aegis-info.com/' + Key);
      }
    });
  });

}
