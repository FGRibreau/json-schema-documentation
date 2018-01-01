# JSON-Schema documentation generator

## Philosophy

Unlike many documentation generator we want to delegate as much as possible the logic on the theme side. It might be perceived as quite an unusual move but the direct consequence is that you'll never be limited by an intermediate representation of your raw data.

Since the raw data will always be a valid JSON-schema (the generator first validate it), the data structure won't change for a defined json-schema draft version and your interface is thus guaranteed.

> ## ❤️ Shameless plug
> - [**Charts, simple as a URL**. No more server-side rendering pain, 1 url = 1 chart](https://image-charts.com)
> - [Looking for a free **Redis GUI**?](http://redsmin.com) [Or for **real-time alerting** & monitoring for Redis?](http://redsmin.com)

## Install

```
npm install json-schema-documentation-generator --save
```

## Basic usage

```js
// Code below will generate a
const generator = require('json-schema-documentation-generator');

generator({
  input: {
    // (required) json-schemas object list
    schemas: [require('./my-schema.json'), require('./my-second-schema.json')],

    // (required) schema sample generator
    samples: {
      generator: require('json-schema-documentation-sample-generator'),
    },
  },
  output: {
    // (required) visual theme
    theme: require('json-schema-documentation-default-theme'),

    // (optional) theme option
    options:{
      // (required) override this to specify another generator
      directory: {
        path: path.resolve(__dirname, 'static'),
      },
    },
  },
}).then(
  () => {
    console.log('Documentation generated');
  },
  err => {
    console.error('Could not generate documentation %s', err);
  }
);
```

## Features

* [v] schema samples
* [v] theme support

## [Changelog](./CHANGELOG.md)
