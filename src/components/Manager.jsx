import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import {v4 as uuid} from "uuid";

const Manager = () => {
  const iconRef = useRef(null);
  const passwordRef = useRef(null); // 🔥 New ref for the input
  const [passwordArray, setPasswordArray] = useState([]);
  const [form, setForm] = useState({
    User: "",
    Pass: "",
    Site: ""
  });

  // Load passwords from localStorage
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
      console.log(passwordArray)
    }
  }, []);

  const showPassword = () => {
    if (iconRef.current && passwordRef.current) {
      const currentColor = iconRef.current.getAttribute("color"); // ✅ Correct attribute
      if (currentColor === "primary:#242424") {
        iconRef.current.setAttribute("color", "primary:#e83a30");
        passwordRef.current.setAttribute("type", "text"); // ✅ Change type on input
      } else {
        iconRef.current.setAttribute("color", "primary:#242424");
        passwordRef.current.setAttribute("type", "password");
      }
    }
  };
  function handleCopy(e) {
    navigator.clipboard.writeText(e);
    toast.success('Copied to Clipboard', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
  const savePassword = () => {
    if(form.Pass=="" || form.Site=="" || form.User=="")
    {
      toast("Null Values cannot be saved",{ theme: "dark",
         position: "top-right",
      });
    }
    else{
       const updatedArray = [...passwordArray, {...form,id:uuid()}];
    setPasswordArray(updatedArray);
    localStorage.setItem("passwords", JSON.stringify(updatedArray));
    setForm({Pass:"",User:"",Site:""})
    }  };
  function deletePassword (id)  {
    setPasswordArray(passwordArray.filter(item=>item.id!==id));
    localStorage.setItem("passwords", JSON.stringify(updatedArray));
    
  };
  function editPassword(id)
  {
    const f=passwordArray.find(item=>item.id==id);
    setForm(f);
     setPasswordArray(passwordArray.filter(item=>item.id!==id));
    localStorage.setItem("passwords", JSON.stringify(updatedArray));
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (

    <div className="relative w-full min-h-screen">
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {/* Background Layer */}
      <div
        className="absolute inset-0 -z-10 w-full h-full"
        style={{
          background: `
            radial-gradient(125% 125% at 50% 10%, #e6f4ea 40%, #22c55e 100%),
            repeating-linear-gradient(0deg, rgba(34,197,94,0.05), rgba(34,197,94,0.05) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(90deg, rgba(34,197,94,0.05), rgba(34,197,94,0.05) 1px, transparent 1px, transparent 20px)
          `,
          backgroundBlendMode: "overlay",
        }}
      ></div>

      {/* Foreground Content */}
      <div className="mx-auto max-w-2xl mycontainer relative z-10 p-4">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">Your own Password Manager</p>

        <div className="text-white flex flex-col p-4 gap-8 items-center">
          <input
            placeholder="Enter Website URL"
            onChange={handleChange}
            className="rounded-full border border-green-500 w-full text-black p-4 py-1"
            type="text"
            value={form.Site}
            name="Site"
          />
          <div className="flex justify-between w-full gap-5">
            <input
              placeholder="Enter Username"
              type="text"
              onChange={handleChange}
              className="rounded-full border border-green-500 w-full text-black p-4 py-1"
              value={form.User}
              name="User"
            />
            <div className="relative w-full flex items-center">
              <input
                ref={passwordRef} // 🔥 Attach ref here
                placeholder="Enter Password"
                type="password"
                onChange={handleChange}
                className="rounded-full border border-green-500 w-full text-black p-4 py-1"
                value={form.Pass}
                name="Pass"
              />
              <span className="absolute right-2 text-gray-400" onClick={showPassword}>
                <lord-icon
                  ref={iconRef}
                  src="https://cdn.lordicon.com/glremacu.json"
                  trigger="hover"
                  color="primary:#242424" // ✅ Correct default
                ></lord-icon>
              </span>
            </div>
          </div>
          <button
            className="text-black flex justify-center gap-2 items-center bg-green-500 rounded-full w-fit px-3 py-1 border-2 border-green-900 hover:bg-green-300"
            onClick={savePassword}
          >
            <lord-icon src="https://cdn.lordicon.com/dcfmsmpr.json" trigger="hover"></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords mt-8">
          <h1 className='font-bold text-2xl text-center'>Your Passwords</h1>

          {passwordArray.length === 0 && <div className="text-center mt-2">No Passwords to Show</div>}

          {passwordArray.length > 0 && (
            <table className="table-auto w-full text-center rounded-lg overflow-hidden mt-4">
              <thead className='bg-green-600'>
                <tr>
                  <th className='py-2 w-32'>Sites</th>
                  <th className='py-2 w-32'>Usernames</th>
                  <th className='py-2 w-32'>Passwords</th>
                  <th className='py-2 w-32'>Actions</th>
                  
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="w-32">
                      <div className='flex justify-center items-center gap-2 '>
                        <a href={item.Site} target='_blank' rel="noopener noreferrer">{item.Site} </a>
                      </div>
                    </td>
                    <td className="w-32">
                      <div className='flex justify-center items-center gap-2'>
                        {item.User}
                        <span className="material-symbols-outlined cursor-pointer" onClick={() => handleCopy(item.User)}>
                          content_copy
                        </span>
                      </div>
                    </td>
                    <td className="w-32">
                      <div className='flex justify-center items-center gap-2 '>{item.Pass}
                        <span className="material-symbols-outlined cursor-pointer" onClick={() => handleCopy(item.Pass)}>
                          content_copy
                        </span>
                      </div>
                    </td>
                    <td >
                      <span className="material-symbols-outlined cursor-pointer" onClick={()=>{editPassword(item.id)}}>
                        edit
                      </span>
                      <span className="material-symbols-outlined cursor-pointer" onClick={()=>{deletePassword(item.id)}}>
                        delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
