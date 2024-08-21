import React from 'react';
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard.jsx';

export default function SearchMovies() {
    const [query, setQuery] = useState("");
    const [movieList, setMovieList] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        setQuery(e.target.elements.search.value);

    }

    async function fetchMoviesByName(queryTerm) {

        const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${queryTerm}`;
        
        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 
                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNjc2ZmJiZWJjZjM5NmU3MWNlMDdjZjY4OTliMjJjNiIsIm5iZiI6MTcyMjAzOTYyMS41OTI2NjksInN1YiI6IjY2YTQzYWM2YWZhY2ZhNGRmYmI0YWJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i8-lluRXHOHUg_qZVS-6nRD8TeB6ocbwMUaQmDMDOvI'
            }
        };
        
        try {
            const response = await fetch(apiUrl, options);
            const data = await response.json();
            console.log(data);
            return data.results;
        } catch (error) {
            console.error('Error al obtener las peliculas: ', error);
        }
    };

    useEffect(() => {
        async function getMovies () {
            const movies = await fetchMoviesByName(query);
            setMovieList(movies);
        }
        getMovies();
    },[query])
    return (
        <>
        <div className="container">
            <h1>Buscar peliculas</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input type="text" id="search" className="form-control"></input>
                        <button type="submit" className="btn btn-secondary">Buscar Peliculas</button>
                    </div>
                </form>
                {movieList.map((movie, index) => (
                    <MovieCard key={index} movie={movie}/>
                ))}
        </div>
        </>
    );
}