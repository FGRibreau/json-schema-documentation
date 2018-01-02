const path = require('path');
const slug = require('slug');
const generator = require('json-schema-documentation-generator');

const argv = require('yargs')
  .wrap(null) //  specify no column limit (no right-align)
  .count('Usage:  $0 <command> [options]');

argv
  .env('JSON_SCHEMA_DOCUMENTATION_CLI')
  .demandOption(
    ['schemas', 'output'],
    'Please provide a `schemas` and a `output` arguments that specify JSON schema files to document and output directory'
  )
  .option('schemas', {
    describe: 'schemas files to document',
  })
  .array('schemas')
  .option('theme', {
    default: 'json-schema-documentation-theme-default',
    describe: 'JSON-schema documentation theme',
    coerce: theme => {
      try {
        return require(theme);
      } catch (err) {
        if (err.message.toLowerCase().includes('cannot find module')) {
          console.error(
            '⛔️  Theme "%s" not found or invalid. Please run "npm install %s" ⛔️',
            theme,
            theme
          );
        }

        throw err;
      }
    },
  })
  .option('mapFilename', {
    describe: 'Mapping function to change each schema filename',
    default: '(schema) => slug(schema.$id)',
    coerce: mapper => {
      const vm = require('vm');
      return new vm.Script(mapper);
    },
  })
  .option('filter-regexp', {
    describe: 'Only keep schemas where $id match the specified regexp',
    default: '.*',
    coerce: regexp => {
      const reg = new RegExp(regexp);
      return schema => reg.test(schema.$id);
    },
  })
  .option('sample', {
    default: 'json-schema-documentation-sample-generator',
    describe: 'JSON-schema sample generator',
    coerce: sampleGenerator => {
      try {
        return require(sampleGenerator);
      } catch (err) {
        if (err.message.toLowerCase().includes('cannot find module')) {
          console.error(
            '⛔️  Sample generator module "%s" not found or invalid. Please run "npm install %s" ⛔️',
            sampleGenerator,
            sampleGenerator
          );
        }

        throw err;
      }
    },
  })
  .option('output', {
    describe: 'Output directory',
    coerce: outputDirectory => path.resolve(process.cwd(), outputDirectory),
  });

const args = argv
  .help()
  .alias('h', 'help')
  .epilog('JSON-Schema documentation generator - https://fgribreau.com')
  .alias('v', 'verbose').argv;

generator({
  input: {
    // (required) json-schemas object list
    schemas: args.schemas.map(filePath =>
      require(path.resolve(process.cwd(), filePath))
    ),

    filter: args.filterRegexp,

    // (required) schema sample generator
    samples: {
      generator: args.sample,
    },
  },
  output: {
    // (required) visual theme
    theme: args.theme,

    // (optional) theme option
    options: {
      // (required) override this to specify another generator
      directory: {
        path: args.output,
        mapFilename: args.mapFilename.runInNewContext({
          path: path,
          slug: slug,
        }),
      },
    },
  },
}).then(
  () => {
    console.log('Documentation generated');
  },
  err => {
    console.error('Could not generate documentation %s', err);
    process.exit(1);
  }
);
