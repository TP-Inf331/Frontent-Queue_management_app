import React from 'react'
import Logo from '@/components/custom/utils/Logo';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '@/pages/admin/utils/validation.ts';
const AdminLogin = () => {
  const  {
    register, handleSubmit,formState:{errors, isSubmitting}
  } = useForm<LoginFormData>(
    {
      resolver:zodResolver(loginSchema)
    }
  );

  const  onSubmit = (data: LoginFormData) => {
    console.log("data submitted",data)
  }
  return (
    <div className="relative min-h-screen bg-[#E6EDFC]">
      <div className="bg-white left-0 top-0 h-[6rem] gap-8 sticky  z-50 flex items-center">
        <Logo/>
      </div>
       <div className="my-8 z-0  w-4/5 mx-auto rounded-md h-[50rem] bg-white">
         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12 justify-center  p-12">
           <Button className="text-white bg-gradient-to-l from-[#007BFF] to-[#007BFF] font-bold text-lg h-20 rounded-lg">Connexion entreprise</Button>
           <p className="italic text-center mx-auto w-4/5">Connectez-vous avec votre email professionnel et le mot de passe envoyé par mail pour accéder à votre espace NoWait.</p>
           <div className="flex flex-col gap-2">
             <label htmlFor="email">Email professionnel de l’Admin principal *</label>
             <input
               id="email"
               type="email"
               placeholder="example@admin.com"
               {...register("email")}
               className={`border p-3 rounded bg-transparent outline-none border-black ${
                 errors.email ? "border-red-500" : "border-black"
               }`}
              required
             />
             {errors.email && (
               <p className="text-red-600 text-sm mt-1">
                 {errors.email.message}
               </p>
             )}
           </div>
           <div className="flex flex-col gap-2">
             <label htmlFor="email">Mot de passe*</label>
             <input
               id="password"
               type="password"
               placeholder="********"
               {...register("password")}
               className={`border p-3 rounded bg-transparent outline-none border-black ${
                 errors.password ? "border-red-500" : "border-black"
               }`}
               required
             />
             {errors.password && (
               <p className="text-red-600 text-sm mt-1">
                 {errors.password.message}
               </p>
             )}
           </div>
            <Link to="/admin/forgot-password"><span className="flex flex-row-reverse text-primary font-bold text-lg">Mot de passe oublié ?</span></Link>
           <Button type="submit" disabled={isSubmitting} className="text-white w-1/2 mx-auto font-bold text-lg p-6 h-20 rounded-md bg-gradient-to-r from-primary to-secondary ">{isSubmitting ? "Connexion..." : "Se connecter →"}</Button>
           <hr className="border-gray-400 border"/>
           <div className="flex gap-2 mx-auto">
             <p>Vous n'avez pas encore un compte ?</p>
             <Link to="/admin/signup">
               <span className="text-primary font-semibold"> Creez un compte </span>
             </Link>

           </div>
         </form>
       </div>
    </div>
  )
}

export default AdminLogin
