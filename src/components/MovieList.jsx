import React from 'react';
import { useState, useEffect } from 'react';
import MovieCard from './MovieCard.jsx';
import Header from './Header.jsx';
import Button from './Button.jsx';
import './MovieList.css';
import SearchMovies from './SearchMovies.jsx';


export default function MovieList () {
    const [movieList, setMovieList] = useState([]);
    const [pagination, setPagination] = useState(1);
    const [displayPage, setDisplayPage] = useState(1);
    
    async function fetchPopularMovies(page) {

        const apiUrl = `https://api.themoviedb.org/3/movie/popular?language=es-ES&page=${page}`;
        
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

    const prevPage = () => {
        if (pagination > 1) {
        setPagination(pagination - 1);
        }
    };

    const nextPage = () => {
        setPagination(pagination + 1);  
    }

    const changeDisplayPage = (pageId) => {
        setDisplayPage(pageId);
    }
    
    //fetchPopularMovies();

    //useEffect (() => {});
    //useEffect (() => {}, []);
    //useEffect (() => {}, [param1, param2, paramN]);

    useEffect(() => {
        async function getMovies () {
            const movies = await fetchPopularMovies(pagination);
            setMovieList(movies);
        }
        getMovies();
    }, [pagination]);

    let content;
    if (displayPage === 1) {
        content = (
            <>
            <div className="fixed-buttons d-flex justify-content-between px-5">
                <Button handleClick={prevPage}>Anterior</Button>
                <Button handleClick={nextPage}>Siguiente</Button>
            </div>
            {movieList.map((movie, index) => (
                <MovieCard key={index} movie={movie}/>
            ))} 
            </>
        );
    }

    if (displayPage === 2) {
        content = (
            <>
                <SearchMovies />
            </>
        );
    }

    return (
        <>
            <Header handleClick={changeDisplayPage} />
            {content}
        </>
    )
}