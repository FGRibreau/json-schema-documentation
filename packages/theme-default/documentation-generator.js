const last = require('lodash/last');
const debug = require('debug')('default-theme:schema');
const traverse = require('json-schema-traverse');
const slug = require('slug');

module.exports = options => {
  const filenameMapper =
    options.directory.mapFilename || (schema => slug(schema.$id));

  return ir => {
    const { source: schema, documentation, sample } = ir;

    const fileName = `${filenameMapper(schema)}.md`;
    debug('Generating File %s', fileName);
    return {
      name: fileName,
      content: `
# ${schema.title || ''}

${schema.description || ''}

### Example

\`\`\`json
${JSON.stringify(sample, null, 2)}
\`\`\`


### Documentation

${mapSchemaKeys(schema, toMarkdown).join('\n\n')}

`.trim(),
      raw: ir,
    };
  };
};

function reduceSchemaKeys(data, iterator, init) {
  traverse(data, { allKeys: true }, (...args) => {
    if (!args[1]) {
      // root
      return init;
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
  // console.log(schema);
  return `
### \`${humanizeJsonPtr(jsonPtr)}\`

${iff(schema.title, () => `**${schema.title}**`)}

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

function humanizeJsonPtr(ptr) {
  return ptr
    .split('/')
    .map(x => (x === 'properties' ? '.' : x === 'items' ? '[]' : x))
    .join('');
}
