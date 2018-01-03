const Ajv = require('ajv');

test('flatten schema', () => {
  expect.assertions(1);

  const flatten = require('./flatten');

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

    schemas: [require('./fixtures/test.json'), require('./fixtures/defs.json')],
  });

  expect(flatten(schemas.getSchema('FullTest'))).toMatchSnapshot();
});
