import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white '>
      <div className="my container flex justify-between items-center px-4 h-14 py-5">
        <div className="logo font-bold text-2xl">
          <span className='text-green-700'> &lt;</span>
          <span className='text-2xl'>Pass</span>
          <span className='text-green-700'>OP/&gt;</span>

        </div>
        <ul>
          <li className='flex gap-4'>
            <a href="#" className='hover:font-bold'>Home</a>
            <a href="#" className='hover:font-bold'>About</a>
            <a href="#" className='hover:font-bold'>Contact</a>
            <a href="">
              <lord-icon
                src="https://cdn.lordicon.com/jjxzcivr.json"
                trigger="hover"
                colors="primary:#109121,secondary:#30e849"

              >
              </lord-icon>
            </a>
          </li>
        </ul>
      </div>


    </nav>
  )
}

export default Navbar
