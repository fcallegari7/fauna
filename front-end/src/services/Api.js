import 'isomorphic-fetch';

export default class Api {
  constructor() {
    this.root_url = 'http://api.inaturalist.org/v1/';
  }

  get(url) {
    return fetch(this.root_url+url).then(results => {
      return results.json();
    });
  }
}