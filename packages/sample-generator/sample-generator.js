const ExampleDataExtractor = require('json-schema-example-loader/lib/example-data-extractor');

/**
 *
 * @param  {Object} jsonSchema json-schema to generate a sample for
 * @return {Promise} promise with sample object
 */
module.exports = jsonSchema => {
  let res;
  try {
    res = ExampleDataExtractor.extract(jsonSchema, jsonSchema);
  } catch (err) {
    return Promise.reject(err);
  }

  return Promise.resolve(res);
};
