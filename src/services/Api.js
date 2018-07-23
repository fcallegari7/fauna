import axios from 'axios'
import cachios from 'cachios';

export default class Api {
  constructor() {
    this.root_url = 'http://api.inaturalist.org/v1/';
    const axiosInstance = axios.create({
      baseURL: this.root_url,
    });
    this.http = cachios.create(axiosInstance, {
      stdTTL: 300
    });
  }

  get(url) {
    return this.http.get(url).then(results => results.data);
  }
}
