import React from 'react'
import LoginButton from './LoginButton'
import Logo from './Logo';

const Navbar = () => {
  return (
      <header className="w-full fixed bg-white z-50 p-4">
          <div className="w-[80%] mx-auto flex justify-between">
              <Logo />
              <LoginButton />
          </div>
      </header>
  )
}

export default Navbar
