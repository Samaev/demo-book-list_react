import React from "react";

const genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy"];
genres.unshift('');
const genresList = genres.map((el) => <option key={el}>{el}</option>);

export default function genreLists() {
  return genresList;
}
