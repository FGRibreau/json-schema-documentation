'use strict';
const debug = require('debug')('default-theme');

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
  const documentationGenerator = require('./documentation-generator')(options);
  const files = intermediateRepresentation.map(documentationGenerator);

  files.push(require('./readme-generator')(files));

  return writer(files, options.directory);
};
