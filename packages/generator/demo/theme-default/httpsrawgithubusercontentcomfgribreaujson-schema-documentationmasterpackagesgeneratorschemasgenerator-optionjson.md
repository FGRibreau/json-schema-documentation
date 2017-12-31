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

### `Generator `option` object`

The generator function only take one object as a parameter

*Type*: object

### `input configuration`

Define what the generator will use to generate the intermediate representation of schemas

*Type*: object

### `Schemas to generate a documentation for`

An array of json-schemas object

*Type*: array

### `/properties/input/properties/schemas/items`



*Type*: object

### `schema $id`

schema.$id is required by json-schema-documentation-generator

*Type*: string

### `Filter predicate over schema`

(schema) => boolean

### `JSON-Schema Sample configuration`



*Type*: object

### `sample generator function`

### `output configuration`

Define what the generator will use to generate the representation of schema (a-k-a the documentation) based on the intermediate representation

*Type*: object

### `Theme generator`

Theme generator function to use to generate the documentation

### `theme options`



*Type*: object