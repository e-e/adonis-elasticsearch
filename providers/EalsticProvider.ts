import { ApplicationContract } from "@ioc:Adonis/Core/Application";
import { Client, ClientOptions } from "@elastic/elasticsearch";
import { AdonisElasticClient } from "../src/AdonisElasticClient";

/**
 * Provider to register shield middleware
 */
export default class ElasticProvider {
  constructor(protected app: ApplicationContract) {}
  public static needsApplication = true;

  public register() {
    this.app.container.singleton("Elastic", () => {
      const Env = this.app.container.resolveBinding("Adonis/Core/Env");
      const elasticUrl: string = Env.get("ELASTIC_SEARCH_URL");
      const client: AdonisElasticClient = new AdonisElasticClient({
        node: elasticUrl,
      });

      return client;
    });
  }

  public boot() {}
}
