const compact = require('lodash/compact');
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
  console.log('ok', schema);
  return `
### \`${humanizeJsonPtr(jsonPtr)}\`

${compact([
    iff(schema.title, () => `**${schema.title}**`),
    iff(schema.description, () => schema.description),
    iff(schema.type, () => `*Type*: ${schema.type}`),
    iff(
      schema.enum,
      () =>
        `*Allowed values*: ${schema.enum.map(ex => '`' + ex + '`').join(' ')}`
    ),
    iff(schema.minItems, () => `*Minimum items*: ${schema.minItems}`),
    iff(schema.maxItems, () => `*Maximum items*: ${schema.maxItems}`),
    iff(schema.minLength, () => `*Minimum length*: ${schema.minLength}`),
    iff(schema.maxLength, () => `*Maximum length*: ${schema.maxLength}`),
    iff(schema.minimum, () => `*Minimum*: ${schema.minimum}`),
    iff(schema.maximum, () => `*Maximum*: ${schema.maximum}`),
    iff(schema.pattern, () => `*Pattern*: \`${schema.pattern}\``),
    iff(schema.example, () => `*Example*: \`${schema.example}\``),
    iff(
      schema.examples,
      () => `*Examples*: ${schema.examples.map(ex => '`' + ex + '`').join(' ')}`
    ),
  ]).join('\n\n')}
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
