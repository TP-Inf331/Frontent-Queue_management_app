import  type { Ibegin } from '@/interface/interface.tsx';

export const BeginSection = () => {
  return (
    <div className="space-y-4 bg-gray-200 py-6">
      <h1 className="font-bold text-lg text-center tracking-wide">Comment commencer ?</h1>
      <p className="text-md font-semibold text-center tracking-normal">Trois étapes simples pour révolutionner votre gestion des files d'attente</p>
      <div className="space-y-12">
        <Begin title="Statistiques d'accueil simples" description="Créez votre compte en quelques minutes et paramétrez votre établissement."/>
        <Begin title="Configurez vos services" description="Définissez vos différentes files d'attente et types de service proposés."/>
        <Begin title="Configurez vos services" description="Démarrez immédiatement et améliorez l'expérience de vos clients."/>
      </div>
    </div>
      )
}



export const Begin = (props:Ibegin) =>{
  return(
    <div className="text-center space-y-2">
      <p className="h-10 w-10 bg-secondary rounded-full mx-auto text-white">{props.icon}</p>
      <h1 className="tracking-wide font-bold text-lg text-primary text-pretty">{props.title}</h1>
      <p className="font-bold tracking-normal">{props.description}</p>
    </div>
  )
}