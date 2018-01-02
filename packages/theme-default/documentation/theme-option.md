# theme option object

The theme generator function only take one object as a parameter

### Example

```json
{
  "directory": {
    "path": "static/",
    "mapFilename": "(schema) => slug(schema.$id)"
  }
}
```


### Documentation

### `.directory`

**Output directory configuration**



*Type*: object

### `.directory.path`

**Output directory path**



*Type*: string





*Example*: static/

### `.directory.mapFilename`

**Filename Mapper**

Function that takes a schema and yield a filename without the extension.







*Example*: (schema) => slug(schema.$id)