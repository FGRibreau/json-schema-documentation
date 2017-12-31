test('should work, yep', () => {
  const sampleGenerator = require('.');
  const schema = {
    title: 'Person',
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        example: 'dupont',
      },
      lastName: {
        type: 'string',
        example: 'dupont',
      },
      age: {
        description: 'Age in years',
        type: 'integer',
        minimum: 0,
        example: 10,
      },
    },
    required: ['firstName', 'lastName'],
  };

  sampleGenerator(schema, schema).then(
    result => {
      expect(result).toMatchSnapshot();
    },
    err => {
      throw err;
    }
  );
});
