const fs = require('fs');
const JSZip = require('jszip');
const YAML = require('js-yaml');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const readJSON = (repo, name) =>
  repo
    .file(`${name}.json`)
    .async('string')
    .then(res => JSON.parse(res));

const load = async (filename) => {
  const file = await readFile(filename);
  const repo = await JSZip.loadAsync(file);
  const meta = await readJSON(repo, '$meta');
  const { config, book, docs } = JSON.parse(meta.meta);
  const toc = YAML.load(book.tocYml);
  return {
    file,
    repo,
    meta,
    config,
    book,
    docs,
    toc,
  };
};

module.exports = {
  load,
};