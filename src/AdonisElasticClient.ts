import { Client, ClientOptions, ApiResponse } from "@elastic/elasticsearch";

export interface AdonisElasticClient extends Client {
  paginate(response): PaginatedResults;
}

export interface PaginatedResults {
  total: number;
  perPage: number;
  page: number;
  lastPage: number;
  data: any[];
}

export class AdonisElasticClient extends Client implements AdonisElasticClient {
  constructor(opts: ClientOptions) {
    super(opts);
  }

  paginate(response: ApiResponse): PaginatedResults {
    const queryString = response.meta.request.params.querystring;
    const params = new URLSearchParams(queryString);

    const total = response.body.hits.total.value;
    const from = parseInt(params.get("from"), 10);
    const size = parseInt(params.get("size"), 10) || 10;
    return {
      total,
      perPage: size,
      page: from && size && size !== 0 ? Math.floor(from / size) + 1 : 1,
      lastPage: Math.ceil(total / size),
      data: response.body.hits.hits.map((hit) => hit._source),
    };
  }
}
