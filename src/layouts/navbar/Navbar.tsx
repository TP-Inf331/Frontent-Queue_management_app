import { Button } from '@/components/ui/button';
import React, {useEffect, useState} from 'react';
import Logo from '@/components/custom/utils/Logo';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [Scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const  handleScroll = () =>{
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll',handleScroll);
    return() => window.removeEventListener('scroll', handleScroll)
  }, []);

  return (
    <nav className={`sticky left-0 top-0 z-50 flex h-24 items-center justify-between  p-2 ${Scrolled ? 'backdrop-blur-md border-b border-primary/60 shadow-md'
      : 'bg-transparent border-b  border-primary/60'}`}>
      <Logo />
      <div className="flex items-center justify-around gap-8">
        <Link to="/login">
          <Button className="bg-neutral rounded-2xl border-2 border-primary hover:bg-primary/30 hover:text-black transition- duration-700  p-6 text-primary">
            Connexion
          </Button>
        </Link>
        {/* <Link to="/signup">
          <Button className="bg-neutral rounded-2xl border-2 border-primary p-6 text-primary">
            sign Up
          </Button>
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
