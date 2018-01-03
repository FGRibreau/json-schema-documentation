const assert = require('assert');
const ptr = require('json-ptr');
const cloneDeep = require('lodash/cloneDeep');
const extend = require('lodash/extend');
const traverse = require('json-schema-traverse');

// Flatten a json-schema
module.exports = getSchemaResult => {
  assert(getSchemaResult.schema);
  assert(getSchemaResult.refs);
  assert(getSchemaResult.refVal);

  const { schema: schemaRaw, refs, refVal } = getSchemaResult;

  const schema = cloneDeep(schemaRaw);

  traverse(
    schema,
    { allKeys: true },
    (
      schema,
      jsonPtr,
      rootSchema,
      parentJsonPtr,
      parentKeyword,
      parentSchema,
      keyIndex
    ) => {
      if (!jsonPtr) {
        // root
        return;
      }

      if (schema.$ref) {
        ptr.set(
          rootSchema,
          jsonPtr,
          extend({}, schema, refVal[refs[schema.$ref]])
        );
      }
    }
  );

  return schema;
};
