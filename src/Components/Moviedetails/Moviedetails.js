import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Moviedetails.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


const Moviedetails = () => {
    const { imdbID } = useParams();
    const [movieData, setMovieData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchMovieDetails = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=98e1b3cc`);
            const data = await response.json();
            if (data.Response === 'True') {
                setMovieData(data);
                console.log(data);
            } else {
                setError('Movie details not found.');
            }
        } catch (error) {
            setError('Failed to load movie details.');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMovieDetails();
    }, [imdbID]);

    return (
        <div>
            <Header />
            <div className="movie-details-container">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : movieData ? (
                    <div className="movie-details-content">
                        <h1>{movieData.Title}</h1>
                        <img src={movieData.Poster} alt={movieData.Title} className="movie-poster" />
                        <p><strong>Plot:</strong> {movieData.Plot}</p>
                        <p><strong>Director:</strong> {movieData.Director}</p>
                        <p><strong>Cast:</strong> {movieData.Actors}</p>
                        <p><strong>Release Date:</strong> {movieData.Released}</p>
                        <p><strong>Runtime:</strong> {movieData.Runtime}</p>
                        <p><strong>IMDb Rating:</strong> {movieData.imdbRating}</p>
                    </div>
                ) : (
                    <p>No data available.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Moviedetails;
