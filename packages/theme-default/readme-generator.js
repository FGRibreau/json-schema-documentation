const debug = require('debug')('default-theme:readme');

module.exports = files => {
  debug('Generating README for %s schemas..', files.length);
  return {
    name: 'README.md',
    content: `
# Table of content

${files.map(f => `* [${f.raw.source.$id}](${f.name})`).join('\n')}
`.trim(),
    raw: {},
  };
};
