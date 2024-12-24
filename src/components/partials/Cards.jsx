import React from 'react'
import { Link } from 'react-router-dom'

function Cards({data,title}) {
    console.log(data);
  return (
    <div className='flex flex-wrap gap-8 w-full mt-3 justify-center'>
        {data.map((card,index) => (
            <Link key={index} className='relative'>
                <img className='h-72 w-56 rounded-lg object-cover' src={`https://image.tmdb.org/t/p/original${
                  card.poster_path || card.backdrop_path || card.profile_path
                }`} alt="" />
                <h3 className='text-sm text-zinc-300 font-semibold mt-2'>{card.title || card.name || card.original_title || card.original_name}</h3>

                {card.vote_average && <div className='absolute top-0 right-[-10%] bg-yellow-600 w-12 h-12 text-white font-semibold flex justify-center items-center rounded-full'>{(card.vote_average * 10).toFixed()}%</div>}
            </Link>
        ))}
    </div>
  )
}

export default Cards