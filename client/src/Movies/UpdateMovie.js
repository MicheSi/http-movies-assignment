import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: []
}

useEffect(() => {
    console.log(props.movies)
}, [])

const changeHandler = e => {
    let value = e.target.value;
    if (e.target.name === 'metascore') {
        value = parseInt(value, 10);
    }

    setMovie({
        ...movie,
        [e.target.name]: value
    });
}

const handleSubmit = e => {
    e.preventDefault();
    axios
    .put(`http://localhost:5000/movies/${id}`, movie)
    .then(res => {
        console.log(res)
    })
    .catch(err => console.log(err))
}


const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    const {id} = useParams();

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