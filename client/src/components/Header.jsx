import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currrentUser } = useSelector(state => state.user);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Rohu</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
          <input type='text' placeholder='search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
          <FaSearch className='text-slate-500'></FaSearch>
        </form>
        <ul className='flex gap-4'>
          <Link to='/Home'>
            <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>Home</li>
          </Link>

          <Link to='/About'>
            <li className='hidden sm:inline text-slate-700 hover:underline cursor-pointer'>About</li>
          </Link>

          {currrentUser ? (
           <>
           <Link to='/profile'>
                <img
                  className='rounded-full h-7 w-7 object-cover'
                  src={currrentUser.avatar}
                  alt='profile'
                />
              </Link>
           </>
              
        
          ) : (
            <Link to='/signin'>
              <li className='text-slate-700 hover:underline'>Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}
