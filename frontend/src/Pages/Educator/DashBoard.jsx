import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { assets, dummyDashboardData } from "../../assets/assets";
import Loading from "../../Components/Student/Loading";

const DashBoard = () => {
  const [dashBoardData, setDashBoardData] = useState(null);

  const { currency } = useContext(AppContext);

  const fetchDashBoardData = async () => {
    setDashBoardData(dummyDashboardData);
  };

  useEffect(() => {
    fetchDashBoardData();
  }, []);

  return dashBoardData ? (
    <div className="min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-5 items-center">
          <div className="flex items-center gap-3 shadow-card border border-primary hover:bg-primaryHover p-4 w-56 rounded-md">
            <img src={assets.patients_icon} alt="" />
            <div>
              <p className="text-primary2">{dashBoardData.enrolledStudentsData.length}</p>
              <p className="tet-base text-primary2">Total Enrolments</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shadow-card border border-primary hover:bg-primaryHover p-4 w-56 rounded-md">
            <img src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-primary2">{dashBoardData.totalCourses}</p>
              <p className="tet-base text-primary2">Total Courses</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shadow-card border border-primary hover:bg-primaryHover p-4 w-56 rounded-md">
            <img src={assets.earning_icon} alt="" />
            <div>
              <p className="text-primary2">
                {currency}
                {dashBoardData.totalEarnigs}
              </p>
              <p className="tet-base text-primary2">Total Earnings</p>
            </div>
          </div>
        </div>

      <div>
        <h2 className="pb-4 text-lg font-medium text-primary2" >Latest Enrollments</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="table-fixed md:table-auto w-full overflow-hidden">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell text-primary2">#</th>
                <th className="px-4 py-3 font-semibold text-primary2">Student Name</th>
                <th className="px-4 py-3 font-semibold text-primary2">Course Title</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {
                dashBoardData.enrolledStudentsData.map((item, index)=>(
                  <tr key={index} className="border-b border-gray-500/20">
                    <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                    <td className="flex md:px-4 px-2 py-3 text-center space-x-3">
                      <img className="w-9 h-9 rounded-full" src={item.student.imageUrl} alt="" />
                      <span className="truncate">{item.student.name}</span>
                    </td>
                    <td className="px-4 py-3 truncate">{item.courseTitle}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default DashBoard;
