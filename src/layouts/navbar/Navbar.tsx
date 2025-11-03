
import { Button } from '@/components/ui/button'
import React from 'react'

const Navbar: React.FC = () => {
  return (
    <nav className='sticky top-0 left-0 z-50 border-b flex items-center justify-between border-foreground/60 p-2'>
      <img 
        src="/images/logo.jpeg"
        alt="logo image" 
        className="h-20 w-auto" 
      />
      <header>

      </header>
     <div>
       <Button>Login</Button>
      <Button>sign Up</Button>
     </div>
    </nav>
  )
}

export default Navbar
