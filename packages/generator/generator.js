// const { defaultsDeep } = require('lodash/defaultsDeep');
const errors = require('./errors');
const curry = require('lodash/curry');
const flatten = require('./flatten');
const Ajv = require('ajv');

const GeneratorOptionSchema = require('./schemas/generator-option.json');

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

  schemas: [GeneratorOptionSchema],
});

module.exports = options => {
  const validationResult = internalSchemas.validate(
    GeneratorOptionSchema.$id,
    options
  );

  if (!validationResult) {
    const err = new errors.InvalidParameter();
    err.parameter = 'options';
    err.details = internalSchemas.errors;
    return Promise.reject(err);
  }

  const schemas = new Ajv({
    // check all rules collecting all errors. Default is to return after the first error.
    allErrors: true,

    // clude the reference to the part of the schema (schema and parentSchema) and validated data in errors (false by default).
    verbose: true,

    // validation of other keywords when $ref is present in the schema
    extendRefs: 'fail',

    //  if the reference cannot be resolved during compilation the exception is thrown
    missingRefs: true,

    // check all rules collecting all errors. Default is to return after the first error.
    allErrors: true,

    // change data type of data to match type keyword
    coerceTypes: false,

    schemas: options.input.schemas,
  });

  const sampleGenerator = options.input.samples.generator;
  const themeGenerator = curry(options.output.theme)(options.output.options);

  return Promise.all(
    Object.keys(schemas._schemas)
      .map(schema => flatten(schemas.getSchema(schema)))
      .filter(options.input.filter || (() => true))
      .map(rawSchema =>
        sampleGenerator(rawSchema).then(sample => ({
          source: rawSchema,
          // @todo
          documentation: {},
          sample: sample,
        }))
      )
  ).then(intermediateRepresentation =>
    themeGenerator(intermediateRepresentation)
  );
};
