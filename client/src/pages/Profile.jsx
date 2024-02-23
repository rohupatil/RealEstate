import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react"; //used for if user clicked on profile img the img file should open rathen yhan clicking on  input make input as hidden
import { getStorage, ref, uploadBytesResumable,getDownloadURL } from "firebase/storage";
import { app } from "../firebase";
import { Link } from "react-router-dom";

export default function Profile() {
  const fileref = useRef(null);
  const { currrentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});

  const [fileUploadError, setFileUploadError] = useState(false);

  const[filePerc,setFilePerc]=useState(0);
  


  //firebase storage
  // allow read;
  //     allow write :if
  //     request.resource.size < 2 * 1024 *1024 &&
  //     request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileupload(file);
    }
  }, [file]);
  const handleFileupload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePerc(Math.round(progress))            //now we will get rounded %
      },
      (error) => {
        setFileUploadError(true);
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const signout=()=>{
    localStorage.clear();

    
    window.location.reload();
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileref}
          hidden
          accept="image/*"
        />{" "}
        {/* accept='image/*' this is or only img wont show any thing other than img */}
        <img
          onClick={() => fileref.current.click()}
          src={formData.avatar || currrentUser.avatar}
          alt="PROFILE"
          className="rounded-full h-24 object-cover cursor-pointer self-center"
        />
        <p className="text-sm self-center">
        {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
        />
        <button
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90
                          disabled:opacity-85 "
        >
          update
        </button>
      </form>

      <div className="flex justify-between mt-5">
      
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <Link > <span className="text-red-700 cursor-pointer" onClick={signout}>Sign out</span></Link>
       
      </div>
    </div>
  );
}
