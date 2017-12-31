const generator = require('.');
const pathExists = require('path-exists').sync;
const path = require('path');

test('yield an error promise if no option are given', () => {
  expect.assertions(1);
  generator().then(
    () => {},
    err => {
      expect(() => {
        throw err;
      }).toThrowErrorMatchingSnapshot();
    }
  );
});
test('yield an error promise if an empty option object was given', () => {
  expect.assertions(1);
  generator({}).then(
    () => {},
    err => {
      expect(() => {
        throw err;
      }).toThrowErrorMatchingSnapshot();
    }
  );
});

test('yield error is a schema does not have an id', () => {
  expect.assertions(1);
  generator({
    input: {
      schemas: [
        require('./fixtures/sample.json'),
        require('./fixtures/sample-without-id.json'),
      ],

      samples: {
        generator: require('json-schema-documentation-sample-generator'),
      },
    },
    output: {
      theme: require('json-schema-documentation-theme-default'),
      options: {
        directory: {
          path: require('path').resolve(__dirname, 'demo'),
        },
      },
    },
  }).then(
    () => {},
    err => {
      expect(() => {
        throw err;
      }).toThrowErrorMatchingSnapshot();
    }
  );
});

test('generate a complete documentation (default configuration)', () => {
  expect.assertions(3);
  return generator({
    input: {
      schemas: [
        require('./schemas/generator-option.json'),
        require('./fixtures/sample.json'),
      ],

      samples: {
        generator: require('json-schema-documentation-sample-generator'),
      },
    },
    output: {
      theme: require('json-schema-documentation-theme-default'),

      options: {
        directory: {
          path: require('path').resolve(__dirname, 'demo/theme-default-full'),
        },
      },
    },
  }).then(
    () => {
      expect(
        pathExists(path.resolve(__dirname, 'demo/theme-default-full/README.md'))
      ).toBe(true);
      expect(
        pathExists(path.resolve(__dirname, 'demo/theme-default-full/Person.md'))
      ).toBe(true);
      expect(
        pathExists(
          path.resolve(
            __dirname,
            'demo/theme-default-full/httpsrawgithubusercontentcomfgribreaujson-schema-documentationmasterpackagesgeneratorschemasgenerator-optionjson.md'
          )
        )
      ).toBe(true);
    },
    err => {
      throw err;
    }
  );
});

test('generate a complete documentation (restrict)', () => {
  expect.assertions(3);
  return generator({
    input: {
      schemas: [
        require('./schemas/generator-option.json'),
        require('./fixtures/sample.json'),
      ],

      filter: schema => {
        return !schema.$id.includes('http://json-schema.org/');
      },

      samples: {
        generator: require('json-schema-documentation-sample-generator'),
      },
    },
    output: {
      theme: require('json-schema-documentation-theme-default'),

      options: {
        directory: {
          path: require('path').resolve(__dirname, 'demo/theme-default'),
        },
      },
    },
  }).then(
    () => {
      expect(
        pathExists(path.resolve(__dirname, 'demo/theme-default/README.md'))
      ).toBe(true);
      expect(
        pathExists(path.resolve(__dirname, 'demo/theme-default/Person.md'))
      ).toBe(true);
      expect(
        pathExists(
          path.resolve(
            __dirname,
            'demo/theme-default/httpsrawgithubusercontentcomfgribreaujson-schema-documentationmasterpackagesgeneratorschemasgenerator-optionjson.md'
          )
        )
      ).toBe(false);
    },
    err => {
      throw err;
    }
  );
});
