import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  handleSearch(term: string, success: any) {
    axios.get('https://itunes.apple.com/search?term=' + term)
      .then(response => { success(response.data.results) })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  },
}