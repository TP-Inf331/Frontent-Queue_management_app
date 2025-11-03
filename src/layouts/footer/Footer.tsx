import React from 'react'
import { Button } from '@/components/ui/button.tsx';
import { Link } from 'react-router-dom';

/**
 * Functional component for rendering a footer
 * @parmams
 * @returns JSX element representing the footer
 * */

const Footer: React.FC = () => {
  return (
    <footer className='w-full border-t mx-auto space-y-4 text-center py-10 border-t-foreground/80'>
      <Button className=" py-10 px-6 text-lg font-semibold text-white">Commencer maintenant  →</Button>
      <img src="/images/wait.svg" alt="" className="h-[7rem] w-[20rem] mx-auto "/>
     <div className="flex gap-2  items-center justify-center"><img src="/images/email.svg" alt="" className="h-6 w-6"/>
     <Link to="/"><span className="text-lg font-semibold underline">nowait@gmail.com</span></Link>
     </div>
      <div className="flex gap-2  items-center justify-center"><img src="/images/Book.svg" alt="" className="h-6 w-6"/>
       <span className="text-lg text-gray-400 font-bold">Mentions légales</span>
      </div>
      <hr className="border-gray-400 border"/>
      <h1 className="text-lg font-bold tracking-wide">2025 NoWait.  Tous droits réservés</h1>
    </footer>
  )
}

export default Footer
