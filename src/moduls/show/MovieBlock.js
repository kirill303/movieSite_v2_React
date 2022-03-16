import React, { useState } from "react";
import check from "./checkedBlockMovie";
let checked = check();
function MovieBlock({ el, func }) {
   return (
      <div className="movie__block">
         <div className="block-movie__prev">
            <img 
            className="block-movie__img" 
            src={el.posterUrl} 
            id={el.filmId} 
            onClick={e => { func(e) }} 
            />
            <div className="block-movie__genres">{(!el.genres && el.genres.length === 0) ? "Жабагадюшник" : el.genres[0].genre}</div>
            <div className={checked.rating(el.rating) + ' block-movie__rev'}>
               <p>{(typeof (+el.rating) === "number" && el.rating) ? (+el.rating).toFixed(1) : "N"}</p>
            </div>
         </div>
         <div className="block-movie__info">
            <div className="block-movie__author">{el.nameRu || el.nameEn}</div>
         </div>
      </div>
   )
}
export default MovieBlock;