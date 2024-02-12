import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure,signInSuccess,signInstart } from "../redux/user/userSlice";

export default function sigin() {
  const [formData, setFromData] = useState({});
const{loading,error} =useSelector((state)=>state.user)
  const navigate = useNavigate();
  const dispacth=useDispatch();

  const handlechnage = (e) => {
    setFromData({
      ...formData, //it is just spread opertaor for data arranging you can change on console
      [e.target.id]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();                //it avoids refreshing page

    try {
      dispacth(signInstart());

      // setLoading(true); 
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      //error handling
      const data = await res.json();

      if (data.success == false) {
        dispacth(signInFailure(data.message));
        return;
      }
    dispacth(signInSuccess(data))
      console.log(formData);
      navigate("/");
    } catch (error) {
     dispacth(signInFailure(error.message))
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handlesubmit} className="flex flex-col gap-4">
       
        <input
          type="email"
          placeholder="email "
          className="border focus:outline-transparent p-3 rounded-lg"
          id="email"
          onChange={handlechnage}
        />
        <input
          type="password"
          placeholder="password "
          className="border focus:outline-transparent p-3 rounded-lg"
          id="password"
          onChange={handlechnage}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase 
                           hover:opacity-95 disabled:80"
        >
          {loading ? "Loading...." : " Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont an account?</p>
        <Link to={"/Signup"}>
          <span className="text-blue-700">sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
