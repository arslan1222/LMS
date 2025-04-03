import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill' // quill is used for formatting text
import { assets } from '../../assets/assets'

const AddCourse = () => {

  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle, setCoureTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [courseDiscount, setCourseDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([])
  const [currentChapterId, setCurrentChapterId] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
    })

    const handleChapter = (action, chapterId) => {
      if (action === "add") {
        const title = prompt("Enter Chapter Name:");
        if (title) {
          const newChapter = {
            chapterId: uniqid(),
            chapterTitle: title,
            chapterContent: [],
            collapsed: false,
            chapterOrder: chapters.length > 0 ? chapters[chapters.length - 1].chapterOrder + 1 : 1,
          };
          setChapters([...chapters, newChapter]);
        }
      } 
      else if (action === "remove") {
        setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
      } 
      else if (action === "toggle") {
        setChapters(
          chapters.map((chapter) =>
            chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
          )
        );
      }
    };

    const handleLecture = (action, chapterId, lectureIndex) => {
      if(action ==='add'){
        setCurrentChapterId(chapterId);
        setShowPopup(true);

      } else if(action === 'remove') {
        setChapters(
          chapters.map((chapter) => {
            if(chapter.chapterId === chapterId) {
              chapter.chapterContent.splice(lectureIndex, 1);
            }
          return chapter
      }))
      } 
    }

    const addLecture = ()=> {
      setChapters(
        chapters.map((chapter) => {
          if(chapter.chapterId === currentChapterId) {
            const newLecture = {
              ...lectureDetails,
              lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
              lectureId: uniqid()
            };

            chapter.chapterContent.push(newLecture)
          }
          return chapter
        })
      );

      setShowPopup(false);
      setLectureDetails({
        lectureTitle: '',
        lectureDuration: '',
        lectureUrl: '',
        isPreviewFree: false,
      });
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Form submitted!");
    };
    


    useEffect(()=>{
      // Initiate quill only once
      if(!quillRef.current && editorRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow'
        });
      }
    }, [])

  return (
    <div className='h-screen overflow-scoll flex flex-col items-start justify-between ms:pb-0 p-4 p-8 pb-0'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          {/* in this feild anything written will be store in the courseTitle state variable */}
          <input onChange={event => setCoureTitle(event.target.value)} value={courseTitle} type="text" className='outline-none md:py-2.5 py-2 px-3 rounded border border border-gray-500' required />
        </div>
        <div className='flex flex-col gap-1'>
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className='flex items-center justify-between flex-wrap'>
          <div className='flex flex-col gap-1'>
            <p className=''>Course Price</p>
            <input onChange={event => setCoursePrice(event.target.value)} value={coursePrice} placeholder='0' type="number" className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required />
          </div>


          <div className='flex md:flex-row flex-col items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className='felx items-center gap-3'>  {/* Here I have used thumbnailImage id that is in input field so when I click on upload image then it will be called and new window will be opened */}
              <img src={assets.file_upload_icon} alt="" className='p-3 bg-blue-500 rounded cursor-pointer' />
              <input type="file" id='thumbnailImage' onChange={event => (event.target.files[0])} accept='image/*' hidden />
              <img src={image ? URL.createObjectURL(image) : ''} alt="" />
            </label>
          </div>
          
        </div>
        <div>
          <p>Discount %</p>
          <input type="number" onChange={event => setCourseDiscount(event.target.value)} value={courseDiscount} className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' min={0} max={100} />
        </div>
        {/* Adding chapters and lectures */}
        <div>
          {
            chapters.map((chapter, chapterIndex)=>(
              <div key={chapterIndex} className='bg-white rounded-lg mb-4 border'>
                <div className='flex justify-between items-center p-4 border-b'>
                  <div className='flex items-center'>
                    <img src={assets.dropdown_icon} onClick={()=> handleChapter('toggle', chapter.chapterId)} alt="" width={14} className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && '-rotate-90'}`} />
                    <span className='font-semibold'>{chapterIndex + 1} {chapter.chapterTitle}</span>
                  </div>
                  <span className='text-gray-500'>{chapter.chapterContent.length} Lectures</span>
                  <img src={assets.cross_icon} onClick={()=> handleChapter('remove', chapter.chapterId)} className='cursor-pointer' alt="" />
                </div>
                {
                  !chapter.collapsed && (
                    <div className='p-4'>
                      {chapter.chapterContent.map((lecture, lectureIndex)=>(
                        <div key={lectureIndex} className='flex justify-between items-center mb-2'>
                          <span>
                            {lectureIndex + 1} {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target='
                            _blank' className='text-blue-500'>Link</a> -{lecture.isPreviewFree ? 'Free Preview' : 'Paid' }
                          </span>
                          <img src={assets.cross_icon} onClick={()=> handleLecture('remove', chapter.chapterId, lectureIndex)} alt="" className='cursor-pointer' />
                        </div>

                      ))}
                      <div onClick={()=> handleLecture('add', chapter.chapterId)} className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2'>+ Add lecture</div>
                    </div>
                  )
                }
                </div>
                ))
              }

                <div onClick={()=>handleChapter('add')} className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer'>+ Add Chapter</div>
                {
                  showPopup && (
                    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                      <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80'>
                        <h2 className='text-lg font-smibold mb-4'>Add Lecture</h2>
                        <div className='mb-2'>
                          <p>Lecture Title</p>
                          <input type="text" className='mt-1 block w-full border rounded py-1 px-2'  onChange={(event) => setLectureDetails({...lectureDetails, lectureTitle: event.target.value})} value={lectureDetails.lectureTitle} />
                        </div>
                        <div className='mb-2'>
                          <p>Duration (minutes)</p>
                          <input type="number" className='mt-1 block w-full border rounded py-1 px-2'  onChange={(event) => setLectureDetails({...lectureDetails, lectureDuration: event.target.value})} value={lectureDetails.lectureDuration} />
                        </div>

                        <div className='mb-2'>
                          <p>Lecture URL</p>
                          <input type="text" className='mt-1 block w-full border rounded py-1 px-2'  onChange={(event) => setLectureDetails({...lectureDetails, lectureUrl: event.target.value})} value={lectureDetails.lectureUrl} />
                        </div>

                        <div className='flex gap-2 my-4'>
                          <p>Is Preview Free?</p>
                          <input type="checkbox" className='mt-1 scale-125'  onChange={(event) => setLectureDetails({...lectureDetails, isPreviewFree: event.target.checked})} value={lectureDetails.isPreviewFree} />
                        </div>
                        <button onClick={addLecture} type='button' className='w-full bg-blue-400 text-white px-4 py-2 rounded'>Add</button>
                        <img src={assets.cross_icon} onClick={()=> setShowPopup(false)} className='absolute top-4 right-4 w-4 cursor-pointer' alt="" />

                      </div>
                    </div>
                  )
                }

            
        </div>

        <button type='submit' className='bg-black text-white w-max py-2.5 px-8 rounded my-4'>ADD</button>
      </form>
      
    </div>
  )
}

export default AddCourse
