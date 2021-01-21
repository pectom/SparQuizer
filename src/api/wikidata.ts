import axios, { AxiosInstance } from "axios";

class Wikidata {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: "https://query.wikidata.org/bigdata/namespace/wdq",
    });
  }

  public async sendQuery(query: string) {
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

export default new Wikidata();
