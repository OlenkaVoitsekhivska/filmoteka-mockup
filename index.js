import { API_service } from "./API-service.js";



const container = document.querySelector('.container');
const form = document.querySelector('form');
const list = document.querySelector('.list');
const showMoreBtn = document.querySelector('.show-more-btn');
const api_service = new API_service();



function markup(data) {
    return data.map(el => {
        let picDirectory = `https://image.tmdb.org/t/p/w500/${el.poster_path}`;
        if (el.poster_path === null) {
            picDirectory = "./Poster unavailable.png";
        }
        if (!el.release_date) {
        return `<li ><p id = "movie_id">${el.id}</p><img src = "${picDirectory}"><p>${el.original_title}</p><p>${el.genre_ids}</p><p>release date unknown</p><p>${el.vote_average}</p></li>`;
        }
        return `<li ><p id = "movie_id">${el.id}</p><img src = "${picDirectory}"><p>${el.original_title}</p><p>${el.genre_ids}</p><p>${el.release_date.slice(0,4)}</p><p>${el.vote_average}</p></li>`;

    }).join('');
    
}



form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    reset();
    api_service.query = evt.target.elements.query.value;
    api_service.fetchMovies().then(data => {
        api_service.page = 1;
        list.insertAdjacentHTML('beforeend', markup(data.results))
        if (data.total_pages > api_service.page) {
            addPagination(data.total_results, api_service.page);
        }     
    }
    )
})

function reset() {
    list.innerHTML = "";
}


list.addEventListener('click', (evt) => {

    if (evt.target.nodeName === 'IMG') {
        const li = evt.target.closest('li');
        const movieId = li.querySelector('#movie_id').innerHTML;
        api_service.query = movieId;
        api_service.fetchMovieById();

        const instance = basicLightbox.create(
            `<div><a><img><p><span>Title</span></p>
           <p><span>Vote/votes</span></p>
           <p><span>Popularity</span></p>
           <p><span>Original title</span></p>
           <p><span>Genre</span></p>
           <button>add to watched</button>
           <button>add to queue</button>
           </a></div>`
            , {
        onShow: (instance) => {
        instance.element().querySelector('a').onclick = instance.close
    }
})
        instance.show()
        }
    
})

//tui pagination

// function addPagination(totalPages, currentPage) {
    function addPagination(totalResults, currentPage) {
    var pagination = new tui.Pagination('tui-pagination-container', {
        // totalItems: totalPages,
        totalItems: totalResults,
            itemsPerPage: 20,
            visiblePages: 5,

        template: {
            page: '<a href="#" class="tui-page-btn">{{page}}</a>',
            currentPage: `<strong class="tui-page-btn tui-is-selected">{{page}}</strong>`,
            moveButton:
                '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
                    '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</a>',
            disabledMoveButton:
                '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
                    '<span class="tui-ico-{{type}}">{{type}}</span>' +
                '</span>',
            moreButton:
                '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
                    '<span class="tui-ico-ellip">...</span>' +
                '</a>'
        }
    });
pagination.on('afterMove', (event) => {
     const currentPage = event.page;
    api_service.page = currentPage;
     api_service.fetchMovies().then(data => {
            list.innerHTML =  markup(data.results);
    })
});

}

    

// instance.getCurrentPage();

