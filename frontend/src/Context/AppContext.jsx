import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-Duration'
import {useAuth, useUser} from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from "react-toastify";


export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [userData, setUserData] = useState(null);

    const currency = import.meta.env.VITE_CURRENCY;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const navigate = useNavigate();

    const {getToken} = useAuth()
    const {user} = useUser()

    const fetchAllCOurses = async () => {

        try {
            const { data } = await axios.get(backendUrl + '/api/course/all');
            console.log(data.courses);
            

            if(data.success) {
                setAllCourses(data.courses);
            } else {
                toast.error(data.message);
            }

            // setAllCourses(dummyCourses);
 
        } catch (error) {
            toast.error(error.message);
        }

    }

    // fetch user data

    const fetchUserData = async () => {

        if(user.publicMetadata.role === 'educator') {
            setIsEducator(true);
        }

        try {
            const token = await getToken();

            console.log(token);
            

            const {data} = await axios.get(backendUrl + '/api/user/data', {headers: {Authorization: `Bearer ${token}`}});

            if(data.success) {
                setUserData(data.success);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) {
            return 0;
        }
    
        let totalRating = 0;
    
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating;
        });
    
        return Math.floor(totalRating / course.courseRatings.length);
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

    const fetchUserEnrolledCourses = async () => {

        try {
            const token = await getToken();

            const {data} = await axios.get(backendUrl + '/api/user/enrolled-courses', {headers: {Authorization: `Bearer ${token}`}});

            if(data.success) {
                setEnrolledCourses(data.enrolledCourses.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }

    }

    useEffect(()=>{
        fetchAllCOurses();
    }, []);

   

    useEffect(()=>{
        if(user) {
            fetchUserData();
            // fetchUserEnrolledCourses();
        }
    }, [user])



    const value = {
        currency,
        allCourses,
        fetchAllCOurses,
        navigate,
        calculateRating,
        isEducator, setIsEducator,
        calculateChapterTime, calculateLectures, calculateCourseDuration,
        enrolledCourses,
        backendUrl,
        userData, setUserData,
        getToken, fetchUserData,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}
