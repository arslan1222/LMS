import React, { useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [input, setInput] = useState(data ? data : '');
  const [isActive, setIsActive] = useState(false);

  const onSearchHandler = (event) => {
    event.preventDefault();
    if (input.trim()) {
      navigate('/course-list/' + input);
    }
  };

  const handleClick = () => {
    setIsActive(!isActive);
    if (!isActive && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full h-10 flex items-center bg-white border border-primaryHover rounded relative"
      onClick={handleClick}
    >
      
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for courses"
        className={`bg-white text-black text-lg h-[40px] px-4 border-0 focus:outline-none rounded-l-full transition-all duration-300 absolute left-0 ${
          isActive
            ? 'w-[200px] opacity-100 pointer-events-auto'
            : 'w-[50px] opacity-0 pointer-events-none'
        }`}
      />
      <button
        type="submit"
        onClick={handleClick}
        className={`flex items-center justify-center whitespace-nowrap text-white text-sm md:text-base rounded bg-primary transition-all duration-300 ease-in-out h-10 px-4 ml-auto ${
          isActive ? 'ml-auto' : ''
        }`}
      >
        <FaSearch className='mr-2' />
        Search
      </button>
    </form>
  );
};

export default SearchBar;