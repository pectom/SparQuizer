import axios from "axios";

export class Wikidata {
  static axios = axios.create({
      baseURL: "https://query.wikidata.org/bigdata/namespace/wdq",
  });

  public static async sendQuery(query: string) {
    return this.axios
      .get("/sparql", {
        params: {
          query,
          'format': "json"
        }
      })
      .then((resp) => resp.data);
  }

}
