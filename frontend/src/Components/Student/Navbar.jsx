import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const isCourseListPage = location.pathname.includes("/course-list");

  const { openSignIn } = useClerk();
  const { user } = useUser();

  const {navigate, isEducator, backendUrl, setIsEducator, getToken} = useContext(AppContext);

  const becomeEducator = async () => {

    try {
      if(isEducator) {
        navigate('/');
        return;
      }

      const token = await getToken();
      const {data} = await axios.get(backendUrl + '/api/educator/update-role', {headers: {Authorization : `Bearer ${token}`}});

      if(data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <div
      className={`flex items-cneter justify-between px-4 sm:px-10 md:px-14 lg:px-36 bg-primaryHover border-b border-primary py-3 ${
        isCourseListPage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img onClick={()=>navigate('/')} src={assets.logo} alt="" className="w-28 lg:w-32 cursor-pointer" />
      <div className="hidden md:flex items-center gap-5 text-primary2">
        <div className="flex items-center gap-5">
          {user && (
            <>
              <button onClick={()=>{navigate(becomeEducator)}}>{isEducator ? 'Educator' : 'Become Educator'}</button>|{" "}
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full bg-primary"
          >
            Create Account
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 sm:gap-5 text-gray-500 md:hidden ">
        <div className="flex items-center gap-1 ms:gap-2 max-sm:text-xs text-primary2">
          {user && (
            <>
              <button onClick={()=>{navigate(becomeEducator)}}>{isEducator ? 'Educator' : 'Become Educator'}</button>|{" "}
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {
          user ? <UserButton /> : <button onClick={() => openSignIn()}>
          <img src={assets.user_icon} alt="" />
        </button>
        }
        
      </div>
    </div>
  );
};

export default Navbar;
