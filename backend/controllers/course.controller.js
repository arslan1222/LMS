import Course from "../models/course.model.js";
import Purchase from "../models/purchase.model.js";



export const getAllCourses = async (req, res) => {

    try {
        const courses = await Course.find({isPublished: true}).select(['-courseContent', '-enrolledStudents']).populate({path: 'educator'});

        res.json({success: true, courses});

    } catch (error) {
        res.json({success: false, message: error.message})
    }

}

// Get COurse id
export const getCourseId = async (req, res) => {
    const {id} = req.params;

    try {
        const courseData = await Course.findById(id).populate({path: 'educator'});

        // Remove lecture url if preview false

        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if(!lecture.isPreviewFree) {
                    lecture.lectureUrl = '';
                }
            })
        })

        res.json({success: true, courseData});


    } catch (error) {
        
        res.json({success: false, message: error.message});

    }
}

