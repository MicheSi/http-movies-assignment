import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    const {id} = useParams();

    useEffect(() => {
        console.log(props.movies)
        const movieToUpdate = props.movies.find(movie => `${movie.id}` === id);
        console.log(movieToUpdate);

        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    }, [props.movies, id])
    
    const changeHandler = e => {
        let value = e.target.value;
        if (e.target.name === 'metascore') {
            value = parseInt(value, 10);
        }

        // if (e.target.name === 'stars') {
        //     setMovie({
        //         ...movie,
        //         [e.target.name]: value.split(",")
        //     })
        // }
    
        setMovie({
            ...movie,
            [e.target.name]: value
        });
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            console.log(res.data)
            props.setMovie(res.data);
            props.history.push(`/movies/${id}`)
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='updateForm'>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                 type='text'
                 name='title'
                 placeholder='Movie Title'
                 onChange={changeHandler}
                 value={movie.title}
                />
                <input
                 type='text'
                 name='director'
                 placeholder='Director'
                 onChange={changeHandler}
                 value={movie.director}
                />
                <input
                 type='number'
                 name='metascore'
                 placeholder='Metascore'
                 onChange={changeHandler}
                 value={movie.metascore}
                />
                <input
                 type='textarea'
                 name='stars'
                 placeholder='Stars'
                 onChange={changeHandler}
                 value={movie.stars}
                />
                <button className='updateBtn'>Update Movie</button>
            </form>
        </div>
    )
}

export default UpdateMovie;