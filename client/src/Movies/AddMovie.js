import React, { useState } from 'react';
import axios from 'axios';

const initialMovie = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const AddMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    
    const changeHandler = e => {
        let value = e.target.value;
        if (e.target.name === 'metascore') {
            value = parseInt(value, 10);
        }

        if (e.target.name === 'stars') {
            value = value.split(",")
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        axios
        .post(`http://localhost:5000/api/movies`, movie)
        .then(res => {
            console.log(res.data)
            props.setMovie(res.data);
            props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='updateForm'>
            <h2>Add Movie</h2>
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
                <textarea
                 type='text'
                 name='stars'
                 placeholder='Stars'
                 onChange={changeHandler}
                 value={movie.stars}
                />
                <button className='updateBtn'>Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie;