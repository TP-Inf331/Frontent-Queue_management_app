import {z} from "zod"

const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export  const loginSchema = z.object({
  email:z.string().min(1, "veuillez entrer votre adresse email administrateur.").regex(emailRegex, "Veuillez entrer une adresse email valide (ex: nom@entreprise.com)."),
  password: z.string().min(8, "le mot de pass doit contenir aumoins 8 caracteres.").regex(passwordRegex,"Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.")
})

export type LoginFormData = z.infer<typeof  loginSchema>;

export const companyRequestSchema = z.object({
  companyName: z.string()
    .min(3, "Le nom de l’entreprise doit contenir au moins 3 caractères"),
  mainAgency: z.string()
    .min(3, "L’agence principale est obligatoire"),
  sector: z.string()
    .min(1, "Veuillez sélectionner un secteur d’activité"),
  adminEmail: z.string()
    .email("Email invalide. Exemple : admin@entreprise.com"),
  adminName: z.string()
    .regex(/^[A-ZÀ-ÿ'.\-\s]+$/i, "Nom invalide, utilisez uniquement des lettres et espaces"),
  phone: z.string()
    .regex(/^(\+237)?\s?6[0-9]{8}$/, "Numéro de téléphone invalide (ex: +237 699887976)"),
  acceptedTerms: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions d’utilisation"
  })
});

export type CompanyRequestFormData = z.infer<typeof companyRequestSchema>;