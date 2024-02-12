import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function sigin() {
  const [formData, setFromData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  const handlechnage = (e) => {
    setFromData({
      ...formData, //it is just spread opertaor for data arranging you can change on console
      [e.target.id]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();                //it avoids refreshing page

    try {
      setLoading(true); 
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
        setLoading(false);
        setError(data.message);

        return;
      }
      setLoading(false);
      console.log(formData);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
