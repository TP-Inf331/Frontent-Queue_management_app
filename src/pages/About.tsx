import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Clock, BarChart2, Check, Award, Heart, Lightbulb, Shield } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Jean Dupont',
      role: 'CEO & Fondateur',
      bio: 'Expert en expérience client avec 10 ans d\'expérience dans la gestion des services.',
      image: '/images/team/jean-dupont.jpg'
    },
    {
      name: 'Marie Martin',
      role: 'Directrice Technique',
      bio: 'Développeuse chevronnée spécialisée dans les solutions SaaS innovantes.',
      image: '/images/team/marie-martin.jpg'
    },
    {
      name: 'Thomas Leroy',
      role: 'Responsable Commercial',
      bio: 'Passionné par la création de relations client durables et fructueuses.',
      image: '/images/team/thomas-leroy.jpg'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Nous repoussons les limites pour offrir des solutions toujours plus performantes.',
      icon: <Lightbulb className="w-8 h-8 text-blue-600" />
    },
    {
      title: 'Qualité',
      description: 'L\'excellence est au cœur de chacune de nos réalisations.',
      icon: <Award className="w-8 h-8 text-blue-600" />
    },
    {
      title: 'Confiance',
      description: 'La transparence et la fiabilité guident chacune de nos actions.',
      icon: <Shield className="w-8 h-8 text-blue-600" />
    },
    {
      title: 'Passion',
      description: 'Nous croyons en ce que nous faisons et cela se ressent dans notre travail.',
      icon: <Heart className="w-8 h-8 text-blue-600" />
    }
  ];

  const stats = [
    { value: '2025', label: 'Année de création', icon: <Award className="w-6 h-6" /> },
    { value: '50+', label: 'Clients satisfaits', icon: <Users className="w-6 h-6" /> },
    { value: '1M+', label: 'Utilisateurs', icon: <Users className="w-6 h-6" /> },
    { value: '24/7', label: 'Support client', icon: <Clock className="w-6 h-6" /> },
  ];

  const testimonials = [
    {
      quote: "NoWait a transformé la façon dont nous gérons nos files d'attente. Nos clients sont ravis !",
      author: 'Sophie Dubois',
      role: 'Gérante, Clinique Médicale'
    },
    {
      quote: "Une solution intuitive qui a considérablement amélioré l'expérience de nos visiteurs.",
      author: 'Pierre Lambert',
      role: 'Directeur, Mairie de Paris'
    },
    {
      quote: 'L\'outil parfait pour gérer efficacement notre flux de clients sans stress.',
      author: 'Émilie Roux',
      role: 'Responsable d\'agence bancaire'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>À Propos - NoWait | Votre partenaire en gestion de files d'attente</title>
        <meta name="description" content="Découvrez l'équipe et les valeurs de NoWait, la solution innovante de gestion des files d'attente pour les professionnels." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Notre mission : transformer l'attente en expérience
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chez NoWait, nous croyons que le temps est précieux. Notre objectif est de révolutionner la façon dont les entreprises gèrent leurs files d'attente pour créer des expériences client exceptionnelles.
            </p>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre histoire</h2>
              <div className="space-y-6 text-gray-600">
                <p>
                  Fondée en 2025, NoWait est née d'un constat simple : l'attente est souvent source de frustration pour les clients et de stress pour les équipes en place.
                </p>
                <p>
                  Notre équipe d'experts en expérience client et en technologie s'est donné pour mission de développer une solution qui simplifie la gestion des files d'attente tout en améliorant l'expérience des utilisateurs finaux.
                </p>
                <p>
                  Aujourd'hui, NoWait équipe des centaines d'entreprises à travers la France, leur permettant de gagner en efficacité tout en offrant une expérience client d'exception.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-4">2025</div>
                <p className="text-xl text-gray-700">Année de création de NoWait</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notre équipe
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre équipe</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Une équipe passionnée qui met tout en œuvre pour votre succès
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <Users className="w-20 h-20 text-gray-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Nos valeurs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos valeurs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident chacune de nos actions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-6">
                <div className="flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ils nous font confiance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez ce que nos clients disent de NoWait
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-yellow-400 text-2xl mb-4">"</div>
                <p className="text-gray-700 italic mb-6">{testimonial.quote}</p>
                <div className="font-medium text-gray-900">{testimonial.author}</div>
                <div className="text-blue-600 text-sm">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Prêt à transformer l'expérience d'attente de vos clients ?</h2>
          <p className="text-xl text-gray-600 mb-8">Rejoignez les centaines d'entreprises qui font déjà confiance à NoWait</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full text-lg transition-colors inline-flex items-center">
            Démarrer maintenant
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
