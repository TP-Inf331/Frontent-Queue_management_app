# 🌱 Creating 10 Sample Services - Quick Guide

## You now have 2 options to create services:

### Option 1: Use the Admin Panel (RECOMMENDED ✅)

1. **Login as Admin**
   - Navigate to: `http://localhost:4001/admin/login`
   - Use your admin credentials

2. **Go to Seed Queues Page**
   - Navigate to: `http://localhost:4001/admin/seed-queues`
   
3. **Click One Button**
   - Click "Créer les 10 services"
   - Wait for the progress bar to complete
   - Done! 🎉

The page will show you:
- ✅ Which services were created successfully
- ⏭️ Which services already existed (skipped)
- ❌ Any errors that occurred

### Option 2: Manual Creation (if needed)

If the automated method fails, you can create each service manually:

1. Go to: `http://localhost:4001/admin/create-queue`
2. Fill in the form for each service:

#### Service 1: Service Scolarité
- **Nom**: Service Scolarité
- **Description**: Inscription, relevés de notes, attestations et services académiques
- **Statut**: Activer immédiatement ✓

#### Service 2: Service Facturation
- **Nom**: Service Facturation
- **Description**: Paiements, factures et questions financières
- **Statut**: Activer immédiatement ✓

#### Service 3: Consultation Médicale
- **Nom**: Consultation Médicale
- **Description**: Consultation générale et urgences non critiques
- **Statut**: Activer immédiatement ✓

#### Service 4: Service Carte Étudiante
- **Nom**: Service Carte Étudiante
- **Description**: Création, renouvellement et remplacement de cartes étudiantes
- **Statut**: Activer immédiatement ✓

#### Service 5: Bureau des Admissions
- **Nom**: Bureau des Admissions
- **Description**: Candidatures, orientations et informations sur les programmes
- **Statut**: Activer immédiatement ✓

#### Service 6: Service Bibliothèque
- **Nom**: Service Bibliothèque
- **Description**: Emprunts, retours et assistance documentaire
- **Statut**: Activer immédiatement ✓

#### Service 7: Guichet Banque
- **Nom**: Guichet Banque
- **Description**: Opérations bancaires courantes et retraits
- **Statut**: Activer immédiatement ✓

#### Service 8: Service Restauration
- **Nom**: Service Restauration
- **Description**: Commandes, réservations et réclamations cafétéria
- **Statut**: Activer immédiatement ✓

#### Service 9: Support IT
- **Nom**: Support IT
- **Description**: Assistance technique, réseaux et comptes informatiques
- **Statut**: Activer immédiatement ✓

#### Service 10: Service Logement
- **Nom**: Service Logement
- **Description**: Attribution, gestion et réclamations résidences universitaires
- **Statut**: Activer immédiatement ✓

##  Verification

After creating the services, verify they appear:

1. **Admin View**: `http://localhost:4001/admin/queues`
   - Should show all 10 services
   - Each should be marked as "Active"

2. **User Registration**: `http://localhost:4001/auth/register`
   - The dropdown should show all 10 services
   - Users can select any service to get a ticket

3. **Services Page**: `http://localhost:4001/services`
   - Should display all available services
   - Users can join any queue from here

## 🎯 What This Enables

With 10 diverse services created, you can now:

- ✅ Test client registration with different service selections
- ✅ Demo the queue management system realistically
- ✅ Show ticket distribution across multiple queues
- ✅ Test the admin dashboard with meaningful data
- ✅ Demonstrate the full user flow from registration to service

## 📊 Expected Result

After completion, your database should have:
- 10 active queues/services
- Each with unique names and descriptions
- All available for client registration
- Ready for ticket management

🎉 **Happy Testing!**
