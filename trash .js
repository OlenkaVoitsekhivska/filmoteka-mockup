// async function fetchGenre() {
//     const genrePrelim = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=7a92417a5af1e8667d171d8c5ef3af4e&language=en-US");
//     const final = await (genrePrelim.json());
//     const genreArry = final.genres;
//     const obj = {};

//     genreArry.map(el => {
//         let k = Object.values(el)[0];
//         let v = Object.values(el)[1];
//         obj[k] = v;
//     })
//  console.log(obj)
//     return obj;
// }
// fetchGenre().then(data=>console.log(data["12"]))