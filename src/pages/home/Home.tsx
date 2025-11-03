import { Button} from '@/components/ui/button.tsx';
import React from 'react'
import { FunctionalitySection } from '@/pages/sections/FunctionalitySection.tsx';
import { BeginSection } from '@/pages/sections/BeginSection.tsx';
const Home: React.FC = () => {
    return (
      <main>
        <div className="h-[22rem] w-screen bg-gradient-to-l from-white pt-8 leading-2  to-blue-100">
            <h3 className="text-center font-bold text-2xl tracking-wider">Fluidifiez vos files d'attente et <em className="text-primary">améliorez</em> la <em className="text-secondary">satisfaction client</em></h3>
            <p className="w-1/2 p-4 leading-50 font-light text-md tracking-light">NoWait transforme l'expérience d'attente dans votre établissement grâce à une gestion intelligente et automatisée des files d'attente.</p>
            <Button className="text-white font-bold text-md p-6 rounded-md bg-gradient-to-r from-primary to-secondary m-4">Découvrir maintenant  →</Button>
        </div>
        <div className="p-6">
          <FunctionalitySection/>
        </div>
        <BeginSection/>
      </main>
    )
}

export default Home
