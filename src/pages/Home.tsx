import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown, Check, ArrowRight, Smartphone, Users as UsersIcon, Clock as ClockIcon, BarChart2, Phone, Mail, Zap } from 'lucide-react';

const Home: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'Combien de temps pour configurer ?',
      answer: '→ 2 minutes pour créer votre première file',
    },
    {
      question: 'Fonctionne sans internet ?',
      answer: '→ Oui, mode hors ligne disponible',
    },
    {
      question: 'Sécurité des données ?',
      answer: '→ Chiffrement AES',
    },
    {
      question: 'Support technique ?',
      answer: '→ Support email, et téléphone inclus',
    },
  ];

  const features = [
    {
      title: 'Gestion des agents et responsables',
      description: 'Gérez facilement votre équipe et les droits d\'accès',
      icon: <UsersIcon className="w-8 h-8 text-white" />,
      button: 'Gestion des agents assignés',
    },
    {
      title: 'Estimation du temps d\'attente',
      description: 'Informez vos clients en temps réel',
      icon: <ClockIcon className="w-8 h-8 text-white" />,
      button: 'Estimation du temps d\'attente',
    },
    {
      title: 'Statistiques & rapports',
      description: 'Analysez les performances de votre établissement',
      icon: <BarChart2 className="w-8 h-8 text-white" />,
      button: 'Statistiques et rapports',
    },
  ];

  const logoPartners = [
    'images/logo-partners/logo1.png',
    'images/logo-partners/logo2.png',
    'images/logo-partners/logo3.png',
    'images/logo-partners/logo4.png',
    'images/logo-partners/logo5.png',
  ]

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>NoWait - Solution de gestion de file d'attente</title>
        <meta name="description" content="Optimisez l'expérience d'attente de vos clients avec NoWait. Solution complète de gestion de file d'attente en temps réel." />
        <link rel="canonical" href="https://nowait.com/" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-4 md:gap-6 items-center text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Digitalisez vos files d'attente et boostez la satisfaction client
              </h1>
              <h2 className="text-2xl text-blue-600 font-medium mb-6">
                Simplicité. Fluidité. Zéro attente.
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                NoWait transforme l'expérience d'attente dans votre établissement grâce à une gestion intelligente et automatisée des files d'attente.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full text-lg transition-colors">
                Découvrir maintenant
              </button>
             </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Plusieurs institutions nous font confiance
          </h2>
          <div className="mx-auto grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center">
            {logoPartners.map((item) => (
              <div key={item} className="h-16 w-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <img src={item} alt="Logo partenaire" className="max-h-12 max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Help You Avoid Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Ce que nous vous évitons
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Fini les files encombrantes et interminables
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="grid grid-cols-2 gap-4 w-full md:w-1/2">
              {['Files physiques', 'Stress des clients', 'Temps perdu', 'Gestion manuelle'].map((item) => (
                <div key={item} className="bg-white p-4 rounded-lg shadow-md flex items-center justify-center text-center h-32">
                  <p className="font-medium text-gray-800">{item}</p>
                </div>
              ))}
            </div>
            
            <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <img src="images/illustration.png" alt="Illustration de file d'attente" className="w-full h-full object-contain rounded-lg" />
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We're Changing Everything Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comment nous changeons tout !!
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              NoWait offre des fonctionnalités incroyables pour transformer l'expérience de vos files d'attente
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Column - Image */}
            <div className="w-full lg:w-5/12">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="aspect-w-4 aspect-h-5 w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="bg-white rounded-full p-4 inline-block mb-6 shadow-md">
                          <UsersIcon className="w-12 h-12 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Expérience client optimisée</h3>
                        <p className="text-gray-600">Vos clients attendent moins et sont plus satisfaits</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
              </div>
            </div>
            
            {/* Right Column - Features */}
            <div className="w-full lg:w-7/12 space-y-8">
              {[
                {
                  title: 'Files virtuelles',
                  description: 'Éliminez les files d\'attente physiques avec notre solution digitale',
                  color: 'bg-blue-100',
                  icon: <Check className="w-6 h-6 text-blue-600" />
                },
                {
                  title: 'Clients calmes',
                  description: 'Gardez vos clients informés en temps réel pour réduire leur stress',
                  color: 'bg-green-100',
                  icon: <Check className="w-6 h-6 text-green-600" />
                },
                {
                  title: 'Tout automatisé',
                  description: 'Automatisez la gestion des files pour gagner en efficacité',
                  color: 'bg-purple-100',
                  icon: <Check className="w-6 h-6 text-purple-600" />
                },
                {
                  title: 'Gain de temps',
                  description: 'Gagnez jusqu\'à 30% de temps sur la gestion des files',
                  color: 'bg-yellow-100',
                  icon: <Check className="w-6 h-6 text-yellow-600" />
                }
              ].map((item, index) => (
                <div key={index} className="group relative">
                  {/* Chevron shape */}
                  <div className={`absolute left-0 top-0 h-full w-3 ${item.color} rounded-l-lg`}></div>
                  <div className="ml-4 pl-8 py-5 pr-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border-l-4 border-transparent group-hover:border-blue-500">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 ${item.color} p-2 rounded-full`}>
                        {item.icon}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: '95%', label: 'Satisfaction client' },
              { value: '30%', label: 'Temps gagné' },
              { value: '10x', label: 'Plus efficace' },
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Certaines fonctionnalités principales
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            NoWait offre des fonctionnalités incroyables pour transformer l'expérience de vos files d'attente
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-blue-600 text-white p-8 rounded-t-2xl h-64 flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:bg-blue-700">
                  <div className="bg-blue-500 p-4 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-blue-100">{feature.description}</p>
                </div>
                <button className="w-full py-4 bg-white text-blue-600 font-semibold rounded-b-2xl border border-t-0 border-gray-200 hover:bg-gray-50 transition-colors">
                  {feature.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Questions fréquentes
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${activeFaq === index ? 'transform rotate-180' : ''}`} 
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">VOULEZ-VOUS TRANSFORMER L'EXPÉRIENCE</h2>
          <p className="text-xl mb-8">
            Rejoignez les nombreux établissements qui font confiance à NoWait
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-900 hover:bg-blue-100 font-bold py-3 px-8 rounded-full text-lg flex items-center justify-center transition-colors">
              Essayer gratuitement
              <ArrowRight className="ml-2" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold py-3 px-8 rounded-full text-lg flex items-center justify-center transition-colors">
              Voir la démo
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-2 text-blue-200">
            <Zap className="w-5 h-5" />
            <p>Support email et téléphone inclus</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
