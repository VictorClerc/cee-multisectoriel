// Fiches Transport
(function(){
      var F = window.FICHES = window.FICHES || {};

 F['TRA-EQ-101'] = { secteur: 'Transport', nom: "Acquisition d'une unité de transport intermodal (UTI) neuve - rail-route", dureeVie: 12,
                      inputs: [
                          {key:'type', label:"Type d'UTI", type:'select', options:['UTI >= 9m ou UTI < 9m avec PTC > 30t','UTI < 9m avec PTC <= 30t']},
                          {key:'N', label:"Nombre de voyages moyen réalisé sur un an (N)", type:'number'}
                            ],
                      calc: function(v){
                              var base = v.type==='UTI < 9m avec PTC <= 30t' ? 9300 : 18500;
                              return base*v.N;
                      }
                   };

 F['TRA-EQ-103'] = { secteur: 'Transport', nom: "Télématique embarquée pour véhicules", dureeVie: 4,
                      inputs: [
                          {key:'categorie', label:"Catégorie des véhicules", type:'select', options:['M1','N1','N2 et N3','M2 et M3']},
                          {key:'N', label:"Nombre de véhicules équipés", type:'number'}
                            ],
                      calc: function(v){
                              var base = {'M1':1600,'N1':2700,'N2 et N3':27000,'M2 et M3':19900}[v.categorie];
                              return base*v.N;
                      }
                   };

 F['TRA-EQ-104'] = { secteur: 'Transport', nom: "Lubrifiant économiseur d'énergie pour véhicules M1", dureeVie: 1,
                      inputs: [
                          {key:'type', label:"Type de lubrifiant", type:'select', options:['Diesel','Essence','Mixte']},
                          {key:'X', label:"Volume de lubrifiant utilisé (litres)", type:'number'},
                          {key:'Y', label:"Performance Fuel Economy Y (ex: pour 1,5% saisir 1.5)", type:'number'}
                            ],
                      calc: function(v){
                              var coef = {'Diesel':33,'Essence':19.4,'Mixte':29.1}[v.type];
                              return coef*v.X*v.Y;
                      }
                   };

 F['TRA-EQ-106'] = { secteur: 'Transport', nom: "Pneumatiques de remplacement à faible résistance au roulement (M1/N1)", dureeVie: 1,
                      inputs: [
                          {key:'classe', label:"Classe d'efficacité en carburant des pneumatiques", type:'select', options:['A','B','C']},
                          {key:'N', label:"Nombre de pneumatiques", type:'number'},
                          {key:'Y', label:"Kilométrage annuel moyen parcouru (km)", type:'number'}
                            ],
                      calc: function(v){
                              var coef = {'A':0.011,'B':0.008,'C':0.006}[v.classe];
                              return coef*v.N*v.Y;
                      }
                   };

 F['TRA-EQ-107'] = { secteur: 'Transport', nom: "Acquisition d'une UTI neuve dédiée au transport fluvial-route", dureeVie: 12,
                      inputs: [
                          {key:'bateau', label:"Type de bateau", type:'select', options:['Bateau DEK (1000 t)','Bateau RHK (1350 t)','Bateau Grand Rhénan (2500 t)','Bateau Convois (4400 t)']},
                          {key:'bassin', label:"Bassin de navigation", type:'select', options:['Seine','Rhône','Nord Pas-de-Calais','Rhin/Moselle','Interbassin']},
                          {key:'V', label:"Nombre de voyages par an (V)", type:'number'}
                            ],
                      calc: function(v){
                              var t = {
                                        'Bateau DEK (1000 t)': {'Seine':3800,'Rhône':3200,'Nord Pas-de-Calais':3300,'Rhin/Moselle':1200,'Interbassin':2900},
                                        'Bateau RHK (1350 t)': {'Seine':7900,'Rhône':7500,'Nord Pas-de-Calais':4000,'Rhin/Moselle':2600,'Interbassin':5500},
                                        'Bateau Grand Rhénan (2500 t)': {'Seine':8500,'Rhône':7800,'Nord Pas-de-Calais':4700,'Rhin/Moselle':4100,'Interbassin':6300},
                                        'Bateau Convois (4400 t)': {'Seine':9000,'Rhône':8500,'Nord Pas-de-Calais':8300,'Rhin/Moselle':6500,'Interbassin':8000}
                              };
                              return t[v.bateau][v.bassin]*v.V;
                      }
                   };

 F['TRA-EQ-108'] = { secteur: 'Transport', nom: "Wagon d'autoroute ferroviaire neuf", dureeVie: 30,
                      inputs: [
                          {key:'ligne', label:"Ligne", type:'select', options:['Ligne standard','Calais - Folkestone']},
                          {key:'montantUnitaire', label:"Montant unitaire par voyage (kWh cumac/voyage) - si ligne standard, voir formule Ga selon la fiche officielle TRA-EQ-108", type:'number'},
                          {key:'V', label:"Nombre de voyages (V)", type:'number'}
                            ],
                      calc: function(v){
                              if(v.ligne==='Calais - Folkestone') return 6290*2*v.V;
                              return v.montantUnitaire*v.V;
                      }
                   };

 F['TRA-EQ-109'] = { secteur: 'Transport', nom: "Barge fluviale neuve", dureeVie: 40,
                      inputs: [
                          {key:'bassin', label:"Bassin de navigation", type:'select', options:['Seine','Rhône','Nord Pas-de-Calais','Rhin/Moselle','Interbassin']},
                          {key:'TK', label:"Tonnes-kilomètres réalisées par an (TK)", type:'number'}
                            ],
                      calc: function(v){
                              var coef = {'Seine':3.4,'Rhône':3.3,'Nord Pas-de-Calais':3.2,'Rhin/Moselle':2.7,'Interbassin':3.1}[v.bassin];
                              return coef*v.TK;
                      }
                   };

 F['TRA-EQ-110'] = { secteur: 'Transport', nom: "Automoteur fluvial neuf", dureeVie: 40,
                      inputs: [
                          {key:'type', label:"Type d'automoteur", type:'select', options:['Bateau Freycinet (350 t)','Bateau Campinois (600 t)','Bateau DEK (1000 t)','Bateau RHK (1350 t)','Bateau Grand Rhénan (2500 t)']},
                          {key:'bassin', label:"Bassin de navigation", type:'select', options:['Seine','Rhône','Nord Pas-de-Calais','Rhin/Moselle','Interbassin']},
                          {key:'TK', label:"Tonnes-kilomètres réalisées par an (TK)", type:'number'}
                            ],
                      calc: function(v){
                              var t = {
                                        'Bateau Freycinet (350 t)': {'Seine':1.2,'Rhône':0.8,'Nord Pas-de-Calais':1.2,'Rhin/Moselle':0.6,'Interbassin':0.9},
                                        'Bateau Campinois (600 t)': {'Seine':1.5,'Rhône':1.3,'Nord Pas-de-Calais':1.5,'Rhin/Moselle':0.7,'Interbassin':1.2},
                                        'Bateau DEK (1000 t)': {'Seine':1.9,'Rhône':1.7,'Nord Pas-de-Calais':1.7,'Rhin/Moselle':1.1,'Interbassin':1.6},
                                        'Bateau RHK (1350 t)': {'Seine':3.1,'Rhône':3.0,'Nord Pas-de-Calais':2.0,'Rhin/Moselle':1.5,'Interbassin':2.5},
                                        'Bateau Grand Rhénan (2500 t)': {'Seine':3.3,'Rhône':3.1,'Nord Pas-de-Calais':2.2,'Rhin/Moselle':2.0,'Interbassin':2.7}
                              };
                              return t[v.type][v.bassin]*v.TK;
                      }
                   };

 F['TRA-EQ-111'] = { secteur: 'Transport', nom: "Groupe frigorifique diesel à haute efficacité énergétique (autonome)", dureeVie: 10,
                      inputs: [
                          {key:'Rg', label:"Rg pondéré (voir note de calcul de la fiche officielle)", type:'number'}
                            ],
                      calc: function(v){
                              return 187700*(v.Rg-1.93);
                      }
                   };

 F['TRA-EQ-113'] = { secteur: 'Transport', nom: "Lubrifiant économiseur d'énergie pour véhicules de transport personnes/marchandises", dureeVie: 1,
                      inputs: [
                          {key:'X', label:"Volume de lubrifiant utilisé (m³)", type:'number'},
                          {key:'Y', label:"Gain Fuel Economy Y (ex: pour 1,5% saisir 1.5)", type:'number'}
                            ],
                      calc: function(v){
                              return 38700*v.X*v.Y;
                      }
                   };

 F['TRA-EQ-115'] = { secteur: 'Transport', nom: "Véhicule N3 neuf optimisé PTRA >= 40 tonnes", dureeVie: 10,
                      inputs: [
                          {key:'N', label:"Nombre de véhicules neufs optimisés", type:'number'}
                            ],
                      calc: function(v){
                              return 181300*v.N;
                      }
                   };

 F['TRA-EQ-118'] = { secteur: 'Transport', nom: "Lubrifiant économiseur d'énergie pour la pêche professionnelle", dureeVie: 1,
                      inputs: [
                          {key:'G', label:"Gain G (kWh cumac/m³/navire pour 1% d'économie) - voir tableau selon façade maritime, taille et type d'engin dans la fiche officielle TRA-EQ-118", type:'number'},
                          {key:'X', label:"Volume de lubrifiant utilisé (m³)", type:'number'},
                          {key:'Y', label:"Gain de consommation du lubrifiant Y (ex: pour 1,5% saisir 1.5)", type:'number'}
                            ],
                      calc: function(v){
                              return v.Y*v.G*v.X;
                      }
                   };

 F['TRA-EQ-119'] = { secteur: 'Transport', nom: "Auxiliaire d'optimisation de la combustion pour moteurs diesel", dureeVie: 1,
                      inputs: [
                          {key:'type', label:"Type d'acquisition", type:'select', options:["Auxiliaire d'optimisation utilisé pur",'Carburant pré-traité avec auxiliaire']},
                          {key:'X', label:"Volume d'auxiliaire utilisé X (m³) - si auxiliaire pur", type:'number'},
                          {key:'Z', label:"Concentration Z (L auxiliaire / L gazole traité) - si auxiliaire pur", type:'number'},
                          {key:'W', label:"Volume de carburant traité W (m³) - si carburant pré-traité", type:'number'},
                          {key:'Y', label:"Gain de consommation Y (%)", type:'number'}
                            ],
                      calc: function(v){
                              if(v.type==='Carburant pré-traité avec auxiliaire') return 9700*v.W*(v.Y/100);
                              return 9700*(v.X/v.Z)*(v.Y/100);
                      }
                   };

 F['TRA-EQ-120'] = { secteur: 'Transport', nom: "Hélices avec tuyère sur unité de transport fluvial", dureeVie: 30,
                      inputs: [
                          {key:'Ga', label:"Gain Ga (kWh cumac/t.km) - voir tableau selon capacité de chargement et bassin de navigation dans la fiche officielle TRA-EQ-120", type:'number'},
                          {key:'TK', label:"Tonnes-kilomètres réalisées (TK)", type:'number'}
                            ],
                      calc: function(v){
                              return v.Ga*v.TK;
                      }
                   };

 F['TRA-EQ-121'] = { secteur: 'Transport', nom: "Cycle neuf à pédalage assisté (particulier)", dureeVie: "10 ans (achat) ou 5 ans (location)",
                      inputs: [
                          {key:'type', label:"Type d'acquisition", type:'select', options:['Achat','Location']},
                          {key:'N', label:"Nombre de cycles", type:'number'}
                            ],
                      calc: function(v){
                              var base = v.type==='Location' ? 4000 : 8700;
                              return base*v.N;
                      }
                   };

 F['TRA-EQ-122'] = { secteur: 'Transport', nom: "Engin automoteur non routier neuf avec système Stop & Start", dureeVie: 8,
                      inputs: [
                          {key:'N', label:"Nombre d'engins automoteurs non routiers concernés", type:'number'}
                            ],
                      calc: function(v){
                              return 72900*v.N;
                      }
                   };

 F['TRA-EQ-123'] = { secteur: 'Transport', nom: "Simulateur neuf d'apprentissage de la conduite", dureeVie: 3,
                      inputs: [
                          {key:'type', label:"Type de véhicule", type:'select', options:['Véhicules M1 et N1','Autres véhicules (M2, M3, N2, N3)']},
                          {key:'N', label:"Nombre de simulateurs", type:'number'}
                            ],
                      calc: function(v){
                              var base = v.type==='Autres véhicules (M2, M3, N2, N3)' ? 39000 : 87400;
                              return base*v.N;
                      }
                   };

 F['TRA-EQ-124'] = { secteur: 'Transport', nom: "Infrastructure d'alimentation électrique à quai", dureeVie: 16,
                      inputs: [
                          {key:'type', label:"Type de port", type:'select', options:['Maritime','Fluvial']},
                          {key:'Q', label:"Consommation électrique à quai Q (kWh, relevée sur 6 mois max)", type:'number'}
                            ],
                      calc: function(v){
                              var coef = v.type==='Fluvial' ? 45 : 13.4;
                              return coef*v.Q;
                      }
                   };

 F['TRA-EQ-125'] = { secteur: 'Transport', nom: "Système Stop & Start sur véhicule ferroviaire diesel", dureeVie: 15,
                      inputs: [
                          {key:'type', label:"Type de véhicule ferroviaire", type:'select', options:['Fret','Travaux sur voies','Manœuvres/triage']},
                          {key:'N', label:"Nombre total d'heures de fonctionnement du moteur (N)", type:'number'}
                            ],
                      calc: function(v){
                              var base = {'Fret':800,'Travaux sur voies':1800,'Manœuvres/triage':950}[v.type];
                              return base*v.N;
                      }
                   };

 F['TRA-EQ-126'] = { secteur: 'Transport', nom: "Remotorisation en propulsion électrique ou hybride d'un bateau (eaux intérieures)", dureeVie: 17,
                      inputs: [
                          {key:'motorisationInitiale', label:"Motorisation initiale", type:'select', options:['Thermique','Diesel-électrique']},
                          {key:'typeBateau', label:"Type de bateau", type:'select', options:['Bateau de réception/travail','Petit bateau à passagers','Bateau restaurant/promenade/automoteur/plaisance/péniche-hôtel']},
                          {key:'R', label:"Nombre total d'heures d'utilisation (R)", type:'number'},
                          {key:'Wi', label:"Puissance de la motorisation initiale remplacée Wi (kW)", type:'number'}
                            ],
                      calc: function(v){
                              var t = {
                                        'Thermique': {'Bateau de réception/travail':147.567,'Petit bateau à passagers':103.285,'Bateau restaurant/promenade/automoteur/plaisance/péniche-hôtel':71.655},
                                        'Diesel-électrique': {'Bateau de réception/travail':54.024,'Petit bateau à passagers':40.809,'Bateau restaurant/promenade/automoteur/plaisance/péniche-hôtel':29.212}
                              };
                              return t[v.motorisationInitiale][v.typeBateau]*v.R*v.Wi;
                      }
                   };

 F['TRA-EQ-127'] = { secteur: 'Transport', nom: "Bateau neuf à propulsion électrique ou hybride (eaux intérieures)", dureeVie: 40,
                      inputs: [
                          {key:'montantUnitaire', label:"Coefficient (kWh cumac par heure par kW) - voir tableau selon motorisation et type de bateau dans la fiche officielle TRA-EQ-127", type:'number'},
                          {key:'R', label:"Nombre total d'heures d'utilisation (R)", type:'number'},
                          {key:'W', label:"Puissance de la motorisation W (kW)", type:'number'}
                            ],
                      calc: function(v){
                              return v.montantUnitaire*v.R*v.W;
                      }
                   };

 F['TRA-EQ-130'] = { secteur: 'Transport', nom: "Quadricycle électrique neuf", dureeVie: 12,
                      inputs: [
                          {key:'acheteur', label:"Type d'acheteur", type:'select', options:['Particulier, vendeur ou loueur','Collectivité locale ou Etat','Autre personne morale']},
                          {key:'categorie', label:"Catégorie du véhicule", type:'select', options:['L7e-C','L6e-B']},
                          {key:'N', label:"Nombre de véhicules", type:'number'}
                            ],
                      calc: function(v){
                              var t = {
                                        'Particulier, vendeur ou loueur': {'L7e-C':36400,'L6e-B':19000},
                                        'Collectivité locale ou Etat': {'L7e-C':86100,'L6e-B':48800},
                                        'Autre personne morale': {'L7e-C':72900,'L6e-B':41300}
                              };
                              return t[v.acheteur][v.categorie]*v.N;
                      }
                   };

 F['TRA-EQ-131'] = { secteur: 'Transport', nom: "Vélos-cargos (cargos-cycles)", dureeVie: 6,
                      inputs: [
                          {key:'N', label:"Nombre de vélos-cargos", type:'number'}
                            ],
                      calc: function(v){
                              return 83000*v.N;
                      }
                   };

 F['TRA-EQ-132'] = { secteur: 'Transport', nom: "Appareil de mesure et d'optimisation de la consommation de carburant (navire de pêche/école)", dureeVie: "4 ans (pêche professionnelle) ou 6 ans (navires-écoles)",
                      inputs: [
                          {key:'longueur', label:"Longueur du navire", type:'select', options:['<= 16 m','> 16 m et < 24 m','>= 24 m']},
                          {key:'type', label:"Type", type:'select', options:['Art traînant','Art dormant','Navire-école']},
                          {key:'N', label:"Nombre de jours de mer (N)", type:'number'}
                            ],
                      calc: function(v){
                              var t = {
                                        '<= 16 m': {'Art traînant':2600,'Art dormant':1000,'Navire-école':1400},
                                        '> 16 m et < 24 m': {'Art traînant':6200,'Art dormant':1800,'Navire-école':2600},
                                        '>= 24 m': {'Art traînant':7800,'Art dormant':4000,'Navire-école':4000}
                              };
                              return t[v.longueur][v.type]*v.N;
                      }
                   };

 F['TRA-SE-101'] = { secteur: 'Transport', nom: "Formation d'un chauffeur de transport à la conduite économe", dureeVie: 3,
                      inputs: [
                          {key:'categorie', label:"Type de formation", type:'select', options:['Véhicules de marchandises N2 ou N3','Véhicules de personnes M2 ou M3']},
                          {key:'N', label:"Nombre de personnes formées", type:'number'}
                            ],
                      calc: function(v){
                              var base = v.categorie==='Véhicules de personnes M2 ou M3' ? 9100 : 12400;
                              return base*v.N;
                      }
                   };

 F['TRA-SE-102'] = { secteur: 'Transport', nom: "Formation d'un chauffeur à la conduite économe (M1/N1)", dureeVie: 3,
                      inputs: [
                          {key:'categorie', label:"Catégorie de véhicule", type:'select', options:['M1','N1']},
                          {key:'N', label:"Nombre de personnes formées", type:'number'}
                            ],
                      calc: function(v){
                              var base = {'M1':2900,'N1':2400}[v.categorie];
                              return base*v.N;
                      }
                   };

 F['TRA-SE-104'] = { secteur: 'Transport', nom: "Contrat d'entretien pour stations de gonflage des pneumatiques", dureeVie: 1,
                      inputs: [
                          {key:'type', label:"Type de station de gonflage", type:'select', options:['Type A (autoroute/voie grande circulation)','Type B (zone urbaine/agglomération)','Type C (parking privé entreprise)']},
                          {key:'N', label:"Nombre de stations de gonflage", type:'number'}
                            ],
                      calc: function(v){
                              var base = {'Type A (autoroute/voie grande circulation)':534200,'Type B (zone urbaine/agglomération)':148400,'Type C (parking privé entreprise)':39600}[v.type];
                              return base*v.N;
                      }
                   };

 F['TRA-SE-105'] = { secteur: 'Transport', nom: "Recreusage de pneumatiques neufs ou rechapés", dureeVie: 1,
                      inputs: [
                          {key:'N', label:"Nombre de pneumatiques recreusés", type:'number'}
                            ],
                      calc: function(v){
                              return 360*v.N;
                      }
                   };

 F['TRA-SE-106'] = { secteur: 'Transport', nom: "Matériel de mesure et d'optimisation de la consommation de carburant (automoteur/pousseur)", dureeVie: 5,
                      inputs: [
                          {key:'C', label:"Consommation énergétique actualisée C (kWh cumac/t.km) - voir tableau selon capacité de chargement et bassin dans la fiche officielle TRA-SE-106", type:'number'},
                          {key:'Y', label:"Gain de consommation Y (fraction, ex: 0.05 pour 5%)", type:'number'},
                          {key:'TK', label:"Tonnes-kilomètres (TK)", type:'number'}
                            ],
                      calc: function(v){
                              return v.C*v.Y*v.TK;
                      }
                   };

 F['TRA-SE-107'] = { secteur: 'Transport', nom: "Carénage (mise à sec, nettoyage, peinture anti-salissures) d'unité de transport fluvial", dureeVie: 3,
                      inputs: [
                          {key:'Ga', label:"Gain Ga (kWh cumac/t.km) - voir tableau selon type d'unité et bassin dans la fiche officielle TRA-SE-107", type:'number'},
                          {key:'TK', label:"Tonnes-kilomètres (TK)", type:'number'}
                            ],
                      calc: function(v){
                              return v.Ga*v.TK;
                      }
                   };

 F['TRA-SE-108'] = { secteur: 'Transport', nom: "Gestion externalisée du poste pneumatique (flotte N2/N3)", dureeVie: 1,
                      inputs: [
                          {key:'type', label:"Type de véhicule", type:'select', options:['Ensemble articulé','Porteur']},
                          {key:'N', label:"Nombre en gestion externalisée", type:'number'}
                            ],
                      calc: function(v){
                              var base = v.type==='Porteur' ? 1700 : 4700;
                              return base*v.N;
                      }
                   };

 F['TRA-SE-109'] = { secteur: 'Transport', nom: "Gestion externalisée du poste pneumatique (flotte M2/M3)", dureeVie: 1,
                      inputs: [
                          {key:'N', label:"Nombre de véhicules en gestion externalisée", type:'number'}
                            ],
                      calc: function(v){
                              return 580*v.N;
                      }
                   };

 F['TRA-SE-110'] = { secteur: 'Transport', nom: "Gestion optimisée du poste pneumatique (flotte N2/N3)", dureeVie: 1,
                      inputs: [
                          {key:'type', label:"Type de véhicule", type:'select', options:['Ensemble articulé','Porteur']},
                          {key:'N', label:"Nombre en gestion optimisée", type:'number'}
                            ],
                      calc: function(v){
                              var base = v.type==='Porteur' ? 1400 : 3900;
                              return base*v.N;
                      }
                   };

 F['TRA-SE-111'] = { secteur: 'Transport', nom: "Gestion optimisée du poste pneumatique (flotte M2/M3)", dureeVie: 1,
                      inputs: [
                          {key:'N', label:"Nombre de véhicules en gestion optimisée", type:'number'}
                            ],
                      calc: function(v){
                              return 430*v.N;
                      }
                   };

 F['TRA-SE-112'] = { secteur: 'Transport', nom: "Abonnement à un service d'autopartage en boucle", dureeVie: 5,
                      inputs: [
                          {key:'N', label:"Nombre d'abonnements annuels", type:'number'}
                            ],
                      calc: function(v){
                              return 6000*v.N;
                      }
                   };

 F['TRA-SE-113'] = { secteur: 'Transport', nom: "Cartes privatives carburant avec suivi des consommations (M1/N1)", dureeVie: 4,
                      inputs: [
                          {key:'N', label:"Nombre de cartes affectées à un véhicule", type:'number'}
                            ],
                      calc: function(v){
                              return 750*v.N;
                      }
                   };

 F['TRA-SE-116'] = { secteur: 'Transport', nom: "Contrat de prestation de service de fret ferroviaire", dureeVie: 1,
                      inputs: [
                          {key:'typeFlux', label:"Type de flux", type:'select', options:['Flux existants (précédemment routiers)','Nouveaux flux']},
                          {key:'categorie', label:"Catégorie de marchandises (si nouveaux flux)", type:'select', options:['01, 03, 04, 09','07, 08, 12','Autres catégories']},
                          {key:'C', label:"Durée du contrat C (mois)", type:'number'},
                          {key:'R', label:"Durée du relevé de trafic R (mois)", type:'number'},
                          {key:'tkm', label:"Nombre de tonnes-kilomètres (t.km)", type:'number'}
                            ],
                      calc: function(v){
                              var coef;
                              if(v.typeFlux==='Nouveaux flux'){
                                        coef = {'01, 03, 04, 09':0.172,'07, 08, 12':0.142,'Autres catégories':0.105}[v.categorie];
                              } else {
                                        coef = 0.190;
                              }
                              return coef*(v.C/v.R)*v.tkm;
                      }
                   };

 F['TRA-SE-117'] = { secteur: 'Transport', nom: "Contrat de prestation de service de fret fluvial", dureeVie: 1,
                      inputs: [
                          {key:'Ga', label:"Gain Ga (kWh cumac/t.km) - voir tableau selon type de bateau et voie fluviale dans la fiche officielle TRA-SE-117", type:'number'},
                          {key:'C', label:"Durée du contrat C (mois)", type:'number'},
                          {key:'R', label:"Durée du relevé de trafic fluvial R (mois)", type:'number'},
                          {key:'tkm', label:"Nombre de tonnes-kilomètres (t.km)", type:'number'}
                            ],
                      calc: function(v){
                              return (v.C/v.R)*v.Ga*v.tkm;
                      }
                   };

})();
