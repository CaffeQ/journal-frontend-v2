import axios from "axios";

const BASE_URL = "http://localhost:8083";

class SearchService{
    postSearch(term){
        return axios.post(BASE_URL + "/quotes/request?value="+term);
    }
    async getSearch() {
        try {
          const response = await fetch(`${BASE_URL}/quotes`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
     
            const searchData = await response.json();
            console.log('Search results:', searchData);
            return searchData; 
          } else {
            console.error('Failed to get search results:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
    
}

export default new SearchService()