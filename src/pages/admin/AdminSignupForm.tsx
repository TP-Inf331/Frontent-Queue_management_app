import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyRequestSchema, type CompanyRequestFormData } from "@/pages/admin/utils/validation";



const AdminSignupForm = () =>{
   const {
     register,
     handleSubmit,
     formState: { errors, isSubmitting },
   } = useForm<CompanyRequestFormData>({
     resolver: zodResolver(companyRequestSchema),
   });

   const onSubmit = (data: CompanyRequestFormData) => {
     console.log("Formulaire soumis :", data);
   };

  return(
    <div className="bg-[#E6EDFC] grid grid-cols-2 h-[100%] relative">
      <aside className=" relative z-50">
        <Link to="/">
          <div className="flex items-center">
            <p className="h-10 w-10 m-2  rounded-md bg-gradient-to-b from-primary to-secondary ">
              <ChevronLeft className="bg-white font-bold relative left-2 top-2 " color="black" size={24}/>
            </p>
            <span className="text-lg font-semibold">Retour à l’acceuil</span>
          </div>
        </Link>
        <div className="bg-gradient-to-b from-[#0071ff] to-[#00d4b0] py-8 rounded-3xl z-0">
          <div className="relative flex flex-col gap-y-6 text-white ">
            <img src="/images/LogoDark.png" alt="" className="top-0 relative w-3/4 h-[15rem]"/>
            <p className="font-bold text-lg tracking-wide pl-20">Créer votre compte entreprise</p>
            <p className="font-medium text-md tracking-tighter pl-20">Commencez à optimiser vos files d'attente dès maintenant</p>
          </div>
        </div>
        <div className=" bg-white relative z-10 top-[-2rem]">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 container py-4">
            {/* Nom de l’entreprise */}
            <div>
              <label htmlFor="companyName" className="font-medium">Nom de l’entreprise *</label>
              <input
                id="companyName"
                type="text"
                placeholder="Ex: Banque Atlantique"
                {...register("companyName")}
                className={`w-full border p-3 rounded mt-1 outline-none ${
                  errors.companyName ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
            </div>

            {/* Agence principale */}
            <div>
              <label htmlFor="mainAgency" className="font-medium">Agence principale de l’entreprise *</label>
              <input
                id="mainAgency"
                type="text"
                placeholder="Ex: Avenue Kennedy, Yaoundé, Cameroun"
                {...register("mainAgency")}
                className={`w-full border p-3 rounded mt-1 outline-none ${
                  errors.mainAgency ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.mainAgency && <p className="text-red-500 text-sm">{errors.mainAgency.message}</p>}
            </div>

            <div>
              <label htmlFor="sector" className="font-medium">Secteur d’activité *</label>
              <select
                id="sector"
                {...register("sector")}
                className={`w-full border p-3 rounded mt-1 outline-none ${
                  errors.sector ? "border-red-500" : "border-gray-400"
                }`}
              >
                <option value="">Sélectionnez le secteur</option>
                <option value="Banque">Banque</option>
                <option value="Télécommunications">Télécommunications</option>
                <option value="Commerce">Commerce</option>
                <option value="Éducation">Éducation</option>
                <option value="Autre">Autre</option>
              </select>
              {errors.sector && <p className="text-red-500 text-sm">{errors.sector.message}</p>}
            </div>

            <div>
              <label htmlFor="adminEmail" className="font-medium">Email professionnel de l’Admin principal *</label>
              <input
                id="adminEmail"
                type="email"
                placeholder="Ex: admin@banqueatlantique.com"
                {...register("adminEmail")}
                className={`w-full border p-3 rounded mt-1 outline-none ${
                  errors.adminEmail ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.adminEmail && <p className="text-red-500 text-sm">{errors.adminEmail.message}</p>}
            </div>

            <div>
              <label htmlFor="adminName" className="font-medium">Nom de l’administrateur principal *</label>
              <input
                id="adminName"
                type="text"
                placeholder="Ex: ATANGANA JEAN LUC"
                {...register("adminName")}
                className={`w-full border p-3 rounded mt-1 outline-none ${
                  errors.adminName ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.adminName && <p className="text-red-500 text-sm">{errors.adminName.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="font-medium">Numéro de téléphone *</label>
              <input
                id="phone"
                type="text"
                placeholder="Ex: +237 699887976"
                {...register("phone")}
                className={`w-full border p-3 rounded mt-1 outline-none ${
                  errors.phone ? "border-red-500" : "border-gray-400"
                }`}
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <div className="flex items-start gap-2 mt-2">
              <input
                id="acceptedTerms"
                type="checkbox"
                {...register("acceptedTerms")}
                className="mt-1"
              />
              <label htmlFor="acceptedTerms" className="text-sm">
                J’accepte les{" "}
                <Link to="#" className="text-primary underline">
                  conditions d’utilisation
                </Link>{" "}
                et la{" "}
                <Link to="#" className="text-primary underline">
                  politique de confidentialité
                </Link>{" "}
                de NoWait.
              </label>
            </div>
            {errors.acceptedTerms && <p className="text-red-500 text-sm">{errors.acceptedTerms.message}</p>}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="text-white w-full mx-auto font-bold text-lg p-6 h-20 rounded-md bg-gradient-to-r from-primary to-secondary "
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
            </Button>
            <hr className="border-gray-400 border"/>
            <div className="flex gap-2 mx-auto">
              <p>Vous avez deja un compte ?</p>
              <Link to="/admin/login">
                <span className="text-primary font-semibold"> Se connecter</span>
              </Link>

            </div>
          </form>
        </div>
      </aside>
      <aside className="fixed h-[30rem] w-full right-[-20rem] z-0 bottom-20">
        <img src="/images/signup.svg" alt="" className=" h-[30rem] w-full -right-0 bottom-[20rem]"/>
      </aside>
    </div>
  )
}

 export default  AdminSignupForm;