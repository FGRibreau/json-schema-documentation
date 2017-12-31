# Generator `option` object

The generator function only take one object as a parameter

### Example

```json
{
  "input": {
    "schemas": [
      {}
    ],
    "samples": {}
  },
  "output": {}
}
```


### Documentation

### `.input`

**input configuration**

Define what the generator will use to generate the intermediate representation of schemas

*Type*: object

### `.input.schemas`

**Schemas to generate a documentation for**

An array of json-schemas object

*Type*: array

### `.input.schemas[]`





*Type*: object

### `.input.schemas[].$id`

**schema $id**

schema.$id is required by json-schema-documentation-generator

*Type*: string

### `.input.filter`

**Filter predicate over schema**

(schema) => boolean

### `.input.samples`

**JSON-Schema Sample configuration**



*Type*: object

### `.input.samples.generator`

**sample generator function**

### `.output`

**output configuration**

Define what the generator will use to generate the representation of schema (a-k-a the documentation) based on the intermediate representation

*Type*: object

### `.output.theme`

**Theme generator**

Theme generator function to use to generate the documentation. Most of the time you will want to use `require('json-schema-documentation-theme-default')` here.

### `.output.options`

**Theme options**

Check out theme documentation to see the available options

*Type*: object