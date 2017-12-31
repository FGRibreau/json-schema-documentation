const debug = require('debug')('default-theme:schema');
const slug = require('slug');

module.exports = ir => {
  const { source, documentation, sample } = ir;
  const fileName = `${slug(source.$id)}.md`;
  debug('Generating File %s', fileName);
  return {
    name: fileName,
    content: `
# ${source.title || ''}

${source.description || ''}

### Example

\`\`\`json
${JSON.stringify(sample, null, 2)}
\`\`\`


### Attributes



`.trim(),
    raw: ir,
  };
};
