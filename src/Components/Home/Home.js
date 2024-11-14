import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Home = () => {
    const [Moviename, setMoviename] = useState('');
    const [MovieResults, setMovieResults] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const fetchMovieResults = async (pageNumber = 1) => {
        if (Moviename.trim() === '') {
            setMovieResults([]);
            setError('');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await fetch(`https://www.omdbapi.com/?s=${Moviename}&apikey=98e1b3cc&page=${pageNumber}`);
            const data = await response.json();
            console.log(data);

            if (data.Response === 'True') {
                setTotalResults(parseInt(data.totalResults, 10));
                setMovieResults((prevResults) => [...prevResults, ...data.Search]);
            } else {
                setError('No results found.');
                setMovieResults([]);
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
            setMovieResults([]);
        }

        setLoading(false);
    };

    const handleSearchInput = (event) => {
        setMoviename(event.target.value);
        setPage(1);
        setMovieResults([]);
    };

    const loadMoreResults = () => {
        const nextPage = page + 1;
        if (MovieResults.length < totalResults) {
            setPage(nextPage);
            fetchMovieResults(nextPage);
        }
    };

    const displayMovieCards = (data) => {
        return data.map((movie) => {
            const { Title, Year, imdbID, Poster } = movie;

            return (
                <NavLink to={`/movie/${imdbID}`} key={imdbID}>
                    <div className='movie_result_container'>
                        <div>
                            <img src={Poster} alt='poster' className='movie_poster' />
                        </div>
                        <div>
                            <h4 className='title_heading'>{Title}</h4>
                            <p className='years'>{Year}</p>
                        </div>
                    </div>
                </NavLink>
            );
        });
    };

    useEffect(() => {
        if (Moviename) {
            const delayFetch = setTimeout(() => {
                fetchMovieResults();
            }, 500);

            return () => clearTimeout(delayFetch);
        }
    }, [Moviename]);

    return (
        <div className="home-page">
            <Header />
            <div className="home-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        className="search-input"
                        onChange={handleSearchInput}
                        value={Moviename}
                    />
                    <button className="search-button" onClick={() => fetchMovieResults(1)}>Search</button>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p className='error'>{error}</p>}
                <div className="movie-grid">
                    {MovieResults.length > 0 && displayMovieCards(MovieResults)}
                </div>
                {MovieResults.length > 0 && MovieResults.length < totalResults && (
                    <button className="load-more-button" onClick={loadMoreResults}>
                        Load More
                    </button>
                )}
            </div>
            <div className='footer_container'>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
