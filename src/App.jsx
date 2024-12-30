import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import TvShows from './components/TvShows'
import People from './components/People'
import MovieDetails from './components/MovieDetails'
import TvDetails from './components/TvDetails'
import PeopleDetails from './components/PeopleDetails'

function App() {
  return (
    <div className='w-full min-h-screen bg-[#1f1e24] flex'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/movie/details/:id' element={<MovieDetails />} />
        <Route path='/tv' element={<TvShows />} />
        <Route path='/tv/details/:id' element={<TvDetails />} />
        <Route path='/people' element={<People />} />
        <Route path='/people/details/:id' element={<PeopleDetails />} />
      </Routes>
    </div>
  )
}

export default App