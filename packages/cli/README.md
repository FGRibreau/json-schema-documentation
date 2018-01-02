# JSON-Schema documentation generator CLI

Generate documentation for JSON schemas through a command line interface.

> ## ❤️ Shameless plug
> - [**Charts, simple as a URL**. No more server-side rendering pain, 1 url = 1 chart](https://image-charts.com)
> - [Looking for a free **Redis GUI**?](http://redsmin.com) [Or for **real-time alerting** & monitoring for Redis?](http://redsmin.com)

<!--
### Install (docker)

[add a terminal gif here

```bash
docker run -it fgribreau/json-schema-documentation-cli
```

 -->

### Install (nodejs)

```bash
npm install json-schema-documentation-cli --global
```

```
json-schema-documentation-cli --help

Options:
  --version        Show version number  [boolean]
  --schemas        schemas files to document  [array] [required]
  --theme          JSON-schema documentation theme  [default: "json-schema-documentation-theme-default"]
  --mapFilename    Mapping function to change each schema filename  [default: "(schema) => slug(schema.$id)"]
  --filter-regexp  Only keep schemas where $id match the specified regexp  [default: ".*"]
  --sample         JSON-schema sample generator  [default: "json-schema-documentation-sample-generator"]
  --output         Output directory  [required]
  -h, --help       Show help  [boolean]

JSON-Schema documentation generator - https://fgribreau.com

Missing required arguments: schemas, output
Please provide a `schemas` and a `output` arguments that specify JSON schema files to document and output directory
```

### Basic usage

Read every json files from `path/to/schemas` and output documentation in the `static` directory.

```bash
json-schema-documentation-cli --schemas path/to/schemas/*.json --output ./static
```

### Advanced usage

Only keep schema where `schema.$id` contains `org.company` and change generated filename to each `schema.$id` value.

```bash
json-schema-documentation-cli --schemas path/to/schemas/*.json --output ./static --filter-regexp "org.company" --mapFilename "(schema) => schema.$id"
```

### [Changelog](./CHANGELOG.md)
