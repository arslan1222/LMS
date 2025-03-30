import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-Duration'


export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [allCourses, setALlCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const currency = "$";
    const navigate = useNavigate();

    const fetchAllCOurses = async () => {
        setALlCourses(dummyCourses);
    }

    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) {
            return 0;
        }
    
        let totalRating = 0;
    
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating;
        });
    
        return totalRating / course.courseRatings.length;
    }

    // Caculate course chapter time

    const calculateChapterTime = (chapter) => {
        let time = chapter.chapterContent.reduce((total, lecture) => total + lecture.lectureDuration, 0);
        
        return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
    };

    // Calculate the total course duration
    const calculateCourseDuration = (course) => {
        let time = course.courseContent.reduce((total, chapter) => {
            return total + chapter.chapterContent.reduce((chapTotal, lecture) => chapTotal + lecture.lectureDuration, 0);
        }, 0);

        return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'] });
    };

    // Calculate total number of lectures in the course
    const calculateLectures = (course) => {
        return course.courseContent.reduce((total, chapter) => total + (Array.isArray(chapter.chapterContent) ? chapter.chapterContent.length : 0), 0);
    };

    // Fetch user enrolled courses

    const fetchUserEnrolledCourses = () => {
        setEnrolledCourses(dummyCourses);
    }

    useEffect(()=>{
        fetchAllCOurses();
        fetchUserEnrolledCourses();
    }, []);



    const value = {
        currency,
        allCourses,
        fetchAllCOurses,
        navigate,
        calculateRating,
        isEducator, setIsEducator,
        calculateChapterTime, calculateLectures, calculateCourseDuration,
        enrolledCourses, fetchUserEnrolledCourses,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}
