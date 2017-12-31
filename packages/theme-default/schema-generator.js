const last = require('lodash/last');
const debug = require('debug')('default-theme:schema');
const traverse = require('json-schema-traverse');
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


### Documentation

${mapSchemaKeys(source, toMarkdown).join('\n\n')}

`.trim(),
    raw: ir,
  };
};

function reduceSchemaKeys(data, iterator, init) {
  traverse(data, { allKeys: true }, (...args) => {
    if (last(args) === 0) {
      // keyIndex
      return;
    }

    init = iterator(init, ...args);
  });

  return init;
}

function mapSchemaKeys(data, iterator) {
  return reduceSchemaKeys(
    data,
    (memo, ...args) => {
      memo.push(iterator(...args));
      return memo;
    },
    []
  );
}

function toMarkdown(
  schema,
  jsonPtr,
  rootSchema,
  parentJsonPtr,
  parentKeyword,
  parentSchema,
  keyIndex
) {
  console.log(schema);
  return `
### ${iff(schema.type, () => `(${schema.type})`)} \`${schema.title || jsonPtr}\`

${iff(schema.description, () => schema.description)}

${iff(schema.type, () => `*Type*: ${schema.type}`)}
${iff(schema.minimum, () => `*Minimum*: ${schema.minimum}`)}
${iff(schema.maximum, () => `*Maximum*: ${schema.maximum}`)}
${iff(schema.example, () => `*Example*: ${schema.example}`)}

  `.trim();
}

function iff(v, f) {
  if (!v) {
    return '';
  }

  return f();
}
