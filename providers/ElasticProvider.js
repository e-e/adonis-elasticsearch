import { AdonisElasticClient } from "../src/AdonisElasticClient";
/**
 * Provider to register shield middleware
 */
export default class ElasticProvider {
    constructor(app) {
        this.app = app;
    }
    register() {
        this.app.container.singleton("Elastic", () => {
            const Env = this.app.container.resolveBinding("Adonis/Core/Env");
            const elasticUrl = Env.get("ELASTIC_SEARCH_URL");
            const client = new AdonisElasticClient({
                node: elasticUrl,
            });
            return client;
        });
    }
    boot() { }
}
ElasticProvider.needsApplication = true;
