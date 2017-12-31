const debug = require('debug')('default-theme:writer');
const path = require('path');
const writeFile = require('write');

module.exports = (files, options) => {
  return Promise.all(
    files.map(file => {
      const filePah = path.resolve(options.path, file.name);
      debug('Writing files in %s', filePah);
      return writeFile(filePah, file.content);
    })
  );
};
