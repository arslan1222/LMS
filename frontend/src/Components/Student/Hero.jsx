
import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import SearchBar from './SearchBar';

const Hero = () => {
  const fullText = [
    "Unlock your potential with industry-ready skills",
    "Learn at your own pace from top instructors",
  ];

  const [index, setIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState(["", ""]);
  const speed = 5;

  useEffect(() => {
    let typingTimeout;

    if (lineIndex < fullText.length) {
      if (index < fullText[lineIndex].length) {
        typingTimeout = setTimeout(() => {
          setDisplayedLines((prev) => {
            const updated = [...prev];
            updated[lineIndex] = fullText[lineIndex].slice(0, index + 1);
            return updated;
          });
          setIndex((prev) => prev + 1);
        }, 300 / speed);
      } else {
        // Move to next line after current line is done
        if (lineIndex + 1 < fullText.length) {
          setTimeout(() => {
            setLineIndex((prev) => prev + 1);
            setIndex(0);
          }, 200); // short delay between lines
        } else {
          // All lines done, wait 30 seconds and restart
          setTimeout(() => {
            setIndex(0);
            setLineIndex(0);
            setDisplayedLines(["", ""]);
          }, 120000);
        }
      }
    }

    return () => clearTimeout(typingTimeout);
  }, [index, lineIndex, fullText]);

  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-primary3'>
      <h1 className="md:text-home-heading-small text-home-heading-small relative font-bold text-gray-800 max-w-2xl mx-auto">
        {displayedLines[0]}<br />
        <span className=" text-primary2">{displayedLines[1]}</span> <img className='md:block hidden absolute -bottom-7 right-20' src={assets.sketch} alt="" />
      </h1>

      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
        Gain real-world experience with hands-on projects, expert-led content, and career-focused learning paths designed to elevate your tech journey.
      </p>
      <p className='md:hidden text-gray-500 max-w-sm mx-auto'>
        Learn practical tech skills from industry experts and build a career you're proud of — all at your own pace.
      </p>

      <SearchBar />
    </div>
  );
};

export default Hero;



