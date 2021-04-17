# Adonis Elastic Search

This service provider makes it easier to integrate and to work with [the official Elasticsearch client library](https://github.com/elastic/elasticsearch-js) for Node.js

It is built on top of @elastic/elasticsearch and proxies all the methods keeping them 100% original. So you can follow official [Elasticsearch API reference](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html).

## Installation

```bash
npm install adonis-elasticsearch
```

## Set the environment variable

Make sure you set the `ELASTIC_SEARCH_URL` environment variable in your .env file. This will be used to access your Elasticsearch server.

```bash
ELASTIC_SEARCH_URL=http://localhost:9200
```

## Registering the provider

Make sure to register the provider inside `start/app.js` file.

```js
const providers = [
  // ...
  "adonis-v5-elasticsearch/providers/ElasticProvider",
];
```

That's all! Now you can use the provider by pulling it from IoC container

```ts
import { ApiResponse } from "@elastic/elasticsearch";
import Elastic from "@ioc:Elastic";

const response: ApiResponse = await Elastic.search({
  index: "my-index",
  body: {
    query: {
      match_all: {},
    },
  },
});
```

## Paginate results the Adonis way!

The `Elastic.paginate()` helper will paginate the results and return the same payload as Lucid's pagination method.

```js
const Elastic = use("Elastic");

const response = await Elastic.search({
  index: "my-index",
  body: {
    query: {
      match_all: {},
    },
  },
});

return Elastic.paginate(response);
```

## Contributing

You are more than welcome to contribute to Vue Flags. Just submit changes via pull request and I will review them before merging.

1. Fork it! 🤙

2. Create your feature branch: `git checkout -b my-new-feature`

3. Commit your changes: `git commit -am "Add some feature"`

4. Push to the branch: `git push origin my-new-feature`

5. Submit a pull request 👍

The documentation is available in the `docs` folder. The Vue Flags components are available in the `lib` folder.

## License

The Adonis Elasticsearch Service Provider is [MIT licensed](LICENSE).
