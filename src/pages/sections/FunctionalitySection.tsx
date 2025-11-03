import type { Ifunctionalty } from '@/interface/interface.tsx';
export const FunctionalitySection =()=>{
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg text-center tracking-wide">Fonctionnalités principales</h1>
      <p className="text-md font-semibold text-center tracking-normal">Des outils puissants pour transformer l'expérience d'attente de vos clients</p>
   <div className="space-y-12">
     <Functionality title="Gestion de file en temps réel" description="Suivez en direct l'état de vos files d'attente et optimisez le flux de vos clients instantanément."/>
     <Functionality title="Réduction du temps d'attente" description="Diminuez jusqu'à 40% le temps d'attente grâce à une distribution intelligente des clients."/>
     <Functionality title="Statistiques d'accueil simples" description="Visualisez vos performances avec des tableaux de bord clairs et des insights exploitables."/>
   </div>
    </div>
  )
}


export const Functionality = (props:Ifunctionalty) =>{
  return(
    <div className="border-2 border-gray-400 p-4 w-4/5 mx-auto text-center space-y-6 rounded-lg">
      <h1 className="text-primary text-pretty tracking-wide text-lg font-bold">{props.title}</h1>
      <p ClassName="text-md font-light tracking-normal">{props.description}</p>
    </div>
  )
}