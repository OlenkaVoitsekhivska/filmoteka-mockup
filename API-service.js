const API_KEY = "7a92417a5af1e8667d171d8c5ef3af4e";
const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
const showMoreBtn = document.querySelector('.show-more-btn');
/**
 * path for reelase dates
 * https://api.themoviedb.org/3/movie/{movie_id}/release_dates?api_key=<<api_key>>
 */

export class API_service{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchMovies() {
      const first = await fetch(`${URL}${this.searchQuery}&language=en-US&page=${this.page}`);
   
      const results = await first.json();
      this.page++;
        console.log(results)
        return results;
  
  }   
  async fetchMovieById() {
   
        const second = await fetch(`https://api.themoviedb.org/3/movie/${this.searchQuery}?api_key=${API_KEY}&language=en-US&page=${this.page}`)
    
    const movie = await second.json();
    


}

    get query() {
    return this.searchQuery;
  }

    set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
