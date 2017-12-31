'use strict';
const debug = require('debug')('default-theme');
const slug = require('slug');
const writer = require('./writer');

const Ajv = require('ajv');
const errors = require('./errors');

const ThemeOptionSchema = require('./schemas/theme-option.json');

const internalSchemas = new Ajv({
  // check all rules collecting all errors. Default is to return after the first error.
  allErrors: true,
  // clude the reference to the part of the schema (schema and parentSchema) and validated data in errors (false by default).
  verbose: true,

  // validation of other keywords when $ref is present in the schema
  extendRefs: 'fail',

  // check all rules collecting all errors. Default is to return after the first error.
  allErrors: true,

  // change data type of data to match type keyword
  coerceTypes: false,

  schemas: [ThemeOptionSchema],
});

module.exports = (options, intermediateRepresentation) => {
  const validationResult = internalSchemas.validate(
    ThemeOptionSchema.$id,
    options
  );

  if (!validationResult) {
    const err = new errors.InvalidParameter();
    err.parameter = 'options';
    err.details = internalSchemas.errors;
    return Promise.reject(err);
  }

  // @todo extract
  const files = intermediateRepresentation.map(ir => {
    const { source, documentation, sample } = ir;
    const fileName = `${slug(source.$id)}.md`;
    debug('Generating File %s', fileName);
    return {
      name: fileName,
      content: `
# ${source.title}


### Example

\`\`\`json
${JSON.stringify(sample, null, 2)}
\`\`\`
`.trim(),
      raw: ir,
    };
  });

  debug('Generating README..');
  files.push({
    name: 'README.md',
    content: `
# Table of content

${files.map(f => `[${f.raw.source.$id}](${f.name})`).join('\n')}
`.trim(),
    raw: {},
  });

  return writer(files, options.directory);
};
