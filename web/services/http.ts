class Http {
  private readonly $baseUrl = process.env.BE_API_URL;

  public async get<T>(url: string): Promise<T> {
    return fetch(this.$baseUrl + url).then((res) => res.json());
  }
}

const http = new Http();

export default http;
