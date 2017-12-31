# JSON-Schema sample generator

Based on [json-schema-example-loader](https://github.com/cloudflare/json-schema-example-loader/) (for the current time being) used in [json-schema-documentationgenerator](https://github.com/FGRibreau/json-schema-documentation) project.

Requires that you put `example` or `default` field in every properties of your json-schema.

### Install

```
npm install json-schema-documentation-sample-generator --save
```

### Basic usage

```js
// Code below will generate a
const sampleGenerator = require('json-schema-documentation-sample-generator');

sampleGenerator({
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
}).then(
  output => {
    console.log(output);
    /*
    {
      "firstName": "dupont",
      "lastName": "dupont",
      "age": 10,
    }
     */
  },
  err => {
    console.error('Could not generate sample %s', err);
  }
);
```

### [Changelog](./CHANGELOG.md)
