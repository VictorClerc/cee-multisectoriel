// Fiches Industrie
(function(){
    var F = window.FICHES = window.FICHES || {};

 F['IND-BA-110'] = { secteur: 'Industrie', nom: "Déstratification d'air pour local industriel de grande hauteur", dureeVie: 15,
                      inputs: [
                        {key:'zone', label:"Zone climatique", type:'select', options:['H1','H2','H3']},
                        {key:'systeme', label:"Système de chauffage", type:'select', options:['convectif','radiatif']},
                        {key:'P', label:"Puissance nominale du système de chauffage (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {H1:{convectif:7200,radiatif:2500},H2:{convectif:8000,radiatif:2800},H3:{convectif:8500,radiatif:3000}}[v.zone][v.systeme];
                            return base*v.P;
                      }
                   };

 F['IND-BA-113'] = { secteur: 'Industrie', nom: "Lanterneaux d'éclairage zénithal (France métropolitaine)", dureeVie: 20,
                      inputs: [
                        {key:'zone', label:"Zone climatique", type:'select', options:['H1','H2','H3']},
                        {key:'S', label:"Aire de la projection horizontale de la surface éclairante (m²)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {H1:3400,H2:4000,H3:6400}[v.zone];
                            return base*v.S;
                      }
                   };

 F['IND-BA-114'] = { secteur: 'Industrie', nom: "Conduits de lumière naturelle", dureeVie: 20,
                      inputs: [
                        {key:'zone', label:"Zone", type:'select', options:['France métropolitaine',"France d'outre-mer"]},
                        {key:'S', label:"Section totale S des conduits (m²)", type:'number'}
                          ],
                      calc: function(v){
                            var coef = {'France métropolitaine':1, "France d'outre-mer":1.5}[v.zone];
                            return 17100*coef*v.S;
                      }
                   };

 F['IND-BA-117'] = { secteur: 'Industrie', nom: "Chauffage décentralisé performant", dureeVie: 17,
                      inputs: [
                        {key:'type', label:"Type d'appareil", type:'select', options:['Panneaux et tubes radiants','Aérothermes non modulants','Aérothermes modulants']},
                        {key:'zone', label:"Zone climatique", type:'select', options:['H1','H2','H3']},
                        {key:'mode', label:"Mode d'occupation des locaux", type:'select', options:['1x8','2x8','3x8 avec arrêt le week-end','3x8 sans arrêt le week-end']},
                        {key:'P', label:"Puissance utile totale installée (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {'Panneaux et tubes radiants':{H1:650,H2:740,H3:790},'Aérothermes non modulants':{H1:1300,H2:1100,H3:590},'Aérothermes modulants':{H1:2100,H2:1700,H3:1000}}[v.type][v.zone];
                            var coef = {'1x8':1,'2x8':2.2,'3x8 avec arrêt le week-end':3,'3x8 sans arrêt le week-end':4.2}[v.mode];
                            return base*coef*v.P;
                      }
                   };

 F['IND-EN-101'] = { secteur: 'Industrie', nom: "Isolation des murs (France d'outre-mer)", dureeVie: 30,
                      inputs: [
                        {key:'batiment', label:"Type de bâtiment", type:'select', options:['Existant','Neuf']},
                        {key:'S', label:"Surface d'isolant posé (m²)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {'Existant':270,'Neuf':240}[v.batiment];
                            return base*v.S;
                      }
                   };

 F['IND-EN-102'] = { secteur: 'Industrie', nom: "Isolation de toiture (France d'outre-mer)", dureeVie: 30,
                      inputs: [
                        {key:'batiment', label:"Type de bâtiment", type:'select', options:['Existant','Neuf']},
                        {key:'S', label:"Surface d'isolant posé (m²)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {'Existant':1600,'Neuf':1400}[v.batiment];
                            return base*v.S;
                      }
                   };

 F['IND-UT-102'] = { secteur: 'Industrie', nom: "Variateur électronique de vitesse (VEV) sur moteur asynchrone", dureeVie: 15,
                      inputs: [
                        {key:'application', label:"Application", type:'select', options:['Pompage','Ventilation',"Compresseur d'air",'Compresseur frigorifique','Autres applications']},
                        {key:'P', label:"Puissance nominale du moteur (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {'Pompage':12400,'Ventilation':12200,"Compresseur d'air":11900,'Compresseur frigorifique':7100,'Autres applications':5500}[v.application];
                            return base*v.P;
                      }
                   };

 F['IND-UT-103'] = { secteur: 'Industrie', nom: "Récupération de chaleur sur un compresseur d'air", dureeVie: 13,
                      inputs: [
                        {key:'usage', label:"Usage de la chaleur", type:'select', options:['Chauffage de locaux ou ECS','Procédé industriel']},
                        {key:'mode', label:"Mode de fonctionnement du site", type:'select', options:['1x8h','2x8h','3x8h avec arrêt le week-end','3x8h sans arrêt le week-end']},
                        {key:'zone', label:"Zone climatique (si chauffage de locaux)", type:'select', options:['H1','H2','H3']},
                        {key:'P', label:"Puissance thermique de l'échangeur ou électrique du compresseur (kW)", type:'number'}
                          ],
                      calc: function(v){
                            if(v.usage==='Chauffage de locaux ou ECS'){
                                    var t={'1x8h':{H1:6400,H2:6000,H3:5000},'2x8h':{H1:15900,H2:15000,H3:12600},'3x8h avec arrêt le week-end':{H1:19700,H2:18600,H3:15600},'3x8h sans arrêt le week-end':{H1:26700,H2:25200,H3:21100}};
                                    return t[v.mode][v.zone]*v.P;
                            } else {
                                    var t2={'1x8h':10300,'2x8h':25600,'3x8h avec arrêt le week-end':31800,'3x8h sans arrêt le week-end':43100};
                                    return t2[v.mode]*v.P;
                            }
                      }
                   };

 F['IND-UT-104'] = { secteur: 'Industrie', nom: "Économiseur sur effluents gazeux d'une chaudière", dureeVie: 10,
                      inputs: [
                        {key:'mode', label:"Mode de fonctionnement du site", type:'select', options:['1x8h','2x8h','3x8h avec arrêt le week-end','3x8h sans arrêt le week-end']},
                        {key:'P', label:"Puissance utile nominale de la chaudière (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {'1x8h':330,'2x8h':720,'3x8h avec arrêt le week-end':990,'3x8h sans arrêt le week-end':1400}[v.mode];
                            return base*v.P;
                      }
                   };

 F['IND-UT-105'] = { secteur: 'Industrie', nom: "Brûleur micro-modulant sur chaudière industrielle", dureeVie: 15,
                      inputs: [
                        {key:'mode', label:"Mode de fonctionnement du site", type:'select', options:['1x8h','2x8h','3x8h avec arrêt le week-end','3x8h sans arrêt le week-end']},
                        {key:'P', label:"Puissance utile nominale de la chaudière (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {'1x8h':550,'2x8h':1200,'3x8h avec arrêt le week-end':1600,'3x8h sans arrêt le week-end':2300}[v.mode];
                            return base*v.P;
                      }
                   };

 F['IND-UT-113'] = { secteur: 'Industrie', nom: "Condensation frigorifique à faible différence de température", dureeVie: 15,
                      inputs: [
                        {key:'montantUnitaire', label:"Montant unitaire (kWh cumac/kW) - voir tableau selon type de condenseur et ΔT dans la fiche officielle IND-UT-113", type:'number'},
                        {key:'mode', label:"Mode de fonctionnement du site", type:'select', options:['1x8h','2x8h','3x8h avec arrêt le week-end','3x8h sans arrêt le week-end']},
                        {key:'P', label:"Puissance électrique nominale de l'installation frigorifique (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var coef = {'1x8h':1,'2x8h':2.2,'3x8h avec arrêt le week-end':3,'3x8h sans arrêt le week-end':4.2}[v.mode];
                            return v.montantUnitaire*coef*v.P;
                      }
                   };

 F['IND-UT-114'] = { secteur: 'Industrie', nom: "Moto-variateur synchrone à aimants permanents ou à réluctance", dureeVie: 20,
                      inputs: [
                        {key:'application', label:"Application", type:'select', options:['Pompage','Ventilation',"Compresseur d'air",'Compresseur frigorifique','Autre application']},
                        {key:'P', label:"Puissance nominale du moto-variateur (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {'Pompage':17800,'Ventilation':17600,"Compresseur d'air":9200,'Compresseur frigorifique':14500,'Autre application':11400}[v.application];
                            return base*v.P;
                      }
                   };

 F['IND-UT-115'] = { secteur: 'Industrie', nom: "Régulation à basse pression flottante sur groupe de production de froid", dureeVie: 14,
                      inputs: [
                        {key:'P', label:"Puissance électrique nominale du groupe de production de froid (kW)", type:'number'}
                          ],
                      calc: function(v){
                            return 500*v.P;
                      }
                   };

 F['IND-UT-116'] = { secteur: 'Industrie', nom: "Régulation à haute pression flottante sur groupe de production de froid", dureeVie: 14,
                      inputs: [
                        {key:'zone', label:"Zone climatique", type:'select', options:['H1 ou H2','H3']},
                        {key:'condensation', label:"Type de condensation", type:'select', options:["Condensation par rapport à l'atmosphère",'Condensation à eau seule']},
                        {key:'P', label:"Puissance électrique nominale du groupe de production de froid (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {'H1 ou H2':{"Condensation par rapport à l'atmosphère":14300,'Condensation à eau seule':11700},'H3':{"Condensation par rapport à l'atmosphère":13500,'Condensation à eau seule':10400}}[v.zone][v.condensation];
                            return base*v.P;
                      }
                   };

 F['IND-UT-118'] = { secteur: 'Industrie', nom: "Brûleur auto-récupérateur, brûleur régénératif ou récupérateur de chaleur sur fumées", dureeVie: 15,
                      inputs: [
                        {key:'type', label:"Type d'équipement", type:'select', options:['Brûleur auto-récupérateur','Brûleur régénératif','Récupérateur de chaleur (transformation)']},
                        {key:'T', label:"Température des fumées T à la sortie du four (°C) - si brûleur neuf", type:'select', options:['600-750','750-1000','1000-1250','>1250']},
                        {key:'mode', label:"Mode de fonctionnement du site", type:'select', options:['1x8','2x8','3x8 avec arrêt le week-end','3x8 sans arrêt le week-end']},
                        {key:'P', label:"Somme des puissances thermiques nominales des brûleurs (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var coef = {'1x8':1,'2x8':2.2,'3x8 avec arrêt le week-end':3,'3x8 sans arrêt le week-end':4.2}[v.mode];
                            if(v.type==='Récupérateur de chaleur (transformation)'){
                                    var base = {'1x8':1000,'2x8':2300,'3x8 avec arrêt le week-end':3100,'3x8 sans arrêt le week-end':4300}[v.mode];
                                    return base*v.P;
                            }
                            var tables = {'Brûleur auto-récupérateur':{'600-750':1600,'750-1000':2500,'1000-1250':4100,'>1250':5800}, 'Brûleur régénératif':{'600-750':2300,'750-1000':3500,'1000-1250':5600,'>1250':7800}};
                            return tables[v.type][v.T]*coef*v.P;
                      }
                   };

 F['IND-UT-120'] = { secteur: 'Industrie', nom: "Compresseur d'air à vis ou centrifuge < 400 kW", dureeVie: 15,
                      inputs: [
                        {key:'P', label:"Puissance électrique nominale du compresseur (kW)", type:'number'}
                          ],
                      calc: function(v){
                            return 19300*v.P;
                      }
                   };

 F['IND-UT-122'] = { secteur: 'Industrie', nom: "Sécheur d'air comprimé à adsorption", dureeVie: 15,
                      inputs: [
                        {key:'mode', label:"Mode de fonctionnement du site", type:'select', options:['1x8h','2x8h','3x8h avec arrêt le week-end','3x8h sans arrêt le week-end']},
                        {key:'P', label:"Puissance électrique nominale des compresseurs (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {'1x8h':2300,'2x8h':5000,'3x8h avec arrêt le week-end':6800,'3x8h sans arrêt le week-end':9500}[v.mode];
                            return base*v.P;
                      }
                   };

 F['IND-UT-124'] = { secteur: 'Industrie', nom: "Séquenceur électronique pour compresseurs d'air comprimé", dureeVie: 13,
                      inputs: [
                        {key:'nb', label:"Nombre de compresseurs pilotés", type:'select', options:['2','3','4','5','6','7','8']},
                        {key:'type', label:"Type de séquenceur", type:'select', options:["Sans optimisation d'énergie","Avec optimisation d'énergie"]},
                        {key:'P', label:"Puissance électrique nominale totale des compresseurs pilotés (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var t = {'2':{sans:560,avec:2400},'3':{sans:1100,avec:3000},'4':{sans:1700,avec:3600},'5':{sans:2200,avec:4100},'6':{sans:2700,avec:4600},'7':{sans:3200,avec:5100},'8':{sans:3700,avec:5600}};
                            var key = v.type==="Avec optimisation d'énergie" ? 'avec':'sans';
                            return t[v.nb][key]*v.P;
                      }
                   };

 F['IND-UT-125'] = { secteur: 'Industrie', nom: "Traitement d'eau performant pour chaudière(s) de production de vapeur", dureeVie: 10,
                      inputs: [
                        {key:'mode', label:"Mode de fonctionnement du site", type:'select', options:['1x8h','2x8h','3x8h avec arrêt le week-end','3x8h sans arrêt le week-end']},
                        {key:'zone', label:"Zone géographique (dureté d'eau, voir liste des départements dans la fiche officielle)", type:'select', options:['A','B','C','D']},
                        {key:'P', label:"Puissance des chaudières (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var t = {'1x8h':{A:70,B:230,C:460,D:650},'2x8h':{A:160,B:520,C:1000,D:1400},'3x8h avec arrêt le week-end':{A:220,B:700,C:1400,D:1900},'3x8h sans arrêt le week-end':{A:300,B:990,C:2000,D:2700}};
                            return t[v.mode][v.zone]*v.P;
                      }
                   };

 F['IND-UT-127'] = { secteur: 'Industrie', nom: "Transmission par poulie-courroie synchrone ou transmission directe", dureeVie: "3 ans (poulie-courroie) ou 15 ans (transmission directe)",
                      inputs: [
                        {key:'type', label:"Type de transmission", type:'select', options:['Transmission par poulie et courroie synchrone (dentée)','Transmission directe']},
                        {key:'P', label:"Puissance électrique nominale du moteur associé (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var base = v.type==='Transmission directe' ? 1900 : 820;
                            return base*v.P;
                      }
                   };

 F['IND-UT-129'] = { secteur: 'Industrie', nom: "Presse à injecter tout électrique ou hybride", dureeVie: "15 ans (presse neuve) ou 10 ans (transformation)",
                      inputs: [
                        {key:'type', label:"Type d'opération", type:'select', options:['Neuve tout électrique','Neuve hybride 2','Neuve hybride 1','Transformation hybride 2','Transformation hybride 1']},
                        {key:'mode', label:"Mode de fonctionnement du site", type:'select', options:['1x8h','2x8h','3x8h avec arrêt le week-end','3x8h sans arrêt le week-end']},
                        {key:'P', label:"Puissance électrique nominale de la presse (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var t = {
                                    'Neuve tout électrique': {'1x8h':12000,'2x8h':26300,'3x8h avec arrêt le week-end':36000,'3x8h sans arrêt le week-end':50300},
                                    'Neuve hybride 2': {'1x8h':7700,'2x8h':17000,'3x8h avec arrêt le week-end':23100,'3x8h sans arrêt le week-end':32400},
                                    'Neuve hybride 1': {'1x8h':4500,'2x8h':9900,'3x8h avec arrêt le week-end':13500,'3x8h sans arrêt le week-end':18900},
                                    'Transformation hybride 2': {'1x8h':4200,'2x8h':9200,'3x8h avec arrêt le week-end':12600,'3x8h sans arrêt le week-end':17600},
                                    'Transformation hybride 1': {'1x8h':2800,'2x8h':6200,'3x8h avec arrêt le week-end':8400,'3x8h sans arrêt le week-end':11700}
                            };
                            return t[v.type][v.mode]*v.P;
                      }
                   };

 F['IND-UT-130'] = { secteur: 'Industrie', nom: "Condenseur sur effluents gazeux d'une chaudière équipée d'un économiseur", dureeVie: 10,
                      inputs: [
                        {key:'mode', label:"Mode de fonctionnement du site", type:'select', options:['1x8h','2x8h','3x8h avec arrêt le week-end','3x8h sans arrêt le week-end']},
                        {key:'P', label:"Puissance utile nominale de la chaudière (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {'1x8h':340,'2x8h':740,'3x8h avec arrêt le week-end':1000,'3x8h sans arrêt le week-end':1400}[v.mode];
                            return base*v.P;
                      }
                   };

 F['IND-UT-131'] = { secteur: 'Industrie', nom: "Isolation thermique sur surfaces planes ou cylindriques (-80°C à 500°C)", dureeVie: 10,
                      inputs: [
                        {key:'diametre', label:"Type de surface", type:'select', options:['Tuyauterie/cylindrique < 508mm (par mètre linéaire L)','Surface plane ou cylindrique ≥ 508mm (par m² S)']},
                        {key:'T', label:"Température du fluide", type:'select', options:['-80°C à -10°C','-10°C à 10°C','40°C à 100°C','100°C à 300°C','> 300°C']},
                        {key:'mode', label:"Mode de fonctionnement de l'installation", type:'select', options:['1x8h','2x8h','3x8h avec arrêt le week-end','3x8h sans arrêt le week-end']},
                        {key:'Q', label:"Longueur isolée L (m) ou surface isolée S (m²)", type:'number'}
                          ],
                      calc: function(v){
                            var petit = {'-80°C à -10°C':300,'-10°C à 10°C':180,'40°C à 100°C':1050,'100°C à 300°C':1900,'> 300°C':1850};
                            var grand = {'-80°C à -10°C':450,'-10°C à 10°C':400,'40°C à 100°C':1300,'100°C à 300°C':2050,'> 300°C':1850};
                            var base = v.diametre.indexOf('< 508')>=0 ? petit[v.T] : grand[v.T];
                            var coef = {'1x8h':1,'2x8h':2.2,'3x8h avec arrêt le week-end':3,'3x8h sans arrêt le week-end':4.2}[v.mode];
                            return base*coef*v.Q;
                      }
                   };

 F['IND-UT-132'] = { secteur: 'Industrie', nom: "Moteur asynchrone haut rendement IE4", dureeVie: "15 ans (P≤15kW) ou 20 ans (P>15kW)",
                      inputs: [
                        {key:'P', label:"Puissance utile P du moteur (kW)", type:'number'}
                          ],
                      calc: function(v){
                            if(v.P<=0.75) return 4900*v.P+2600;
                            if(v.P<=375) return 700*v.P+12000;
                            return 1600*v.P;
                      }
                   };

 F['IND-UT-133'] = { secteur: 'Industrie', nom: "Récupération de l'énergie de freinage d'un moteur électrique (levage/manutention)", dureeVie: 15,
                      inputs: [
                        {key:'H', label:"Durée de fonctionnement annuelle H (heures)", type:'number'},
                        {key:'F', label:"Pourcentage de temps en phase de freinage F (%)", type:'number'},
                        {key:'P', label:"Puissance nominale du moteur (kW)", type:'number'}
                          ],
                      calc: function(v){
                            return v.H*(v.F/100)*9.25*v.P;
                      }
                   };

 F['IND-UT-134'] = { secteur: 'Industrie', nom: "Système de mesurage d'Indicateurs de Performance Énergétique (IPE)", dureeVie: 6,
                      inputs: [
                        {key:'mode', label:"Mode de fonctionnement du site", type:'select', options:['1x8h, avec ou sans arrêt le week-end','2x8h, avec ou sans arrêt le week-end','3x8h avec arrêt le week-end','3x8h sans arrêt le week-end']},
                        {key:'P', label:"Puissance nominale P des équipements instrumentés (kW)", type:'number'},
                        {key:'duree', label:"Durée du contrat de location du logiciel (années)", type:'select', options:['1','2','3','4','5','6 ou plus']}
                          ],
                      calc: function(v){
                            var coef = {'1x8h, avec ou sans arrêt le week-end':1,'2x8h, avec ou sans arrêt le week-end':2.2,'3x8h avec arrêt le week-end':3,'3x8h sans arrêt le week-end':4.2}[v.mode];
                            var F = {'1':1,'2':1.96,'3':2.89,'4':3.78,'5':4.63,'6 ou plus':5.45}[v.duree];
                            return 29.4*coef*v.P*F;
                      }
                   };

 F['IND-UT-135'] = { secteur: 'Industrie', nom: "Freecooling par eau de refroidissement en production de froid", dureeVie: 14,
                      inputs: [
                        {key:'zone', label:"Zone climatique", type:'select', options:['H1','H2','H3']},
                        {key:'temp', label:"Température de consigne du réseau hydraulique", type:'select', options:['[12°C;15°C[','[15°C;18°C[','[18°C;21°C]']},
                        {key:'mode', label:"Durée de fonctionnement de l'usage du froid", type:'select', options:['1x8','2x8 (5j/7 ou 6j/7)','3x8 avec arrêt le week-end','3x8 sans arrêt le week-end']},
                        {key:'P', label:"Puissance électrique nominale du/des compresseur(s) (kW)", type:'number'}
                          ],
                      calc: function(v){
                            var t = {H1:{'[12°C;15°C[':7400,'[15°C;18°C[':9900,'[18°C;21°C]':12300}, H2:{'[12°C;15°C[':4900,'[15°C;18°C[':8200,'[18°C;21°C]':11500}, H3:{'[12°C;15°C[':3300,'[15°C;18°C[':5800,'[18°C;21°C]':9000}};
                            var coef = {'1x8':1,'2x8 (5j/7 ou 6j/7)':2.2,'3x8 avec arrêt le week-end':3,'3x8 sans arrêt le week-end':4.2}[v.mode];
                            return t[v.zone][v.temp]*coef*v.P;
                      }
                   };

 F['IND-UT-138'] = { secteur: 'Industrie', nom: "Récupération de chaleur fatale sur effluents d'un équipement industriel", dureeVie: 20,
                      inputs: [
                        {key:'D', label:"Durée annuelle de fonctionnement D (heures)", type:'number'},
                        {key:'Precup', label:"Puissance thermique apportée par le fluide caloporteur Précup (kW thermique)", type:'number'},
                        {key:'eta', label:"Rendement brut estimé de la machine thermodynamique η (%)", type:'number'},
                        {key:'Pconso', label:"Puissance électrique absorbée par les auxiliaires Pconso (kW électrique)", type:'number'}
                          ],
                      calc: function(v){
                            return 14.134*v.D*(v.Precup*(v.eta/100)-v.Pconso);
                      }
                   };

 F['IND-UT-139'] = { secteur: 'Industrie', nom: "Stockage de chaleur fatale", dureeVie: 20,
                      inputs: [
                        {key:'eta', label:"Rendement du système de stockage η (%)", type:'number'},
                        {key:'C', label:"Capacité maximale de stockage de chaleur C (kWh)", type:'number'},
                        {key:'Nc', label:"Nombre annuel de cycles équivalents à 100% de la capacité Nc", type:'number'}
                          ],
                      calc: function(v){
                            return 14.134*(v.eta/100)*v.C*v.Nc;
                      }
                   };

 F['IND-UT-140'] = { secteur: 'Industrie', nom: "Mise en veille automatique d'une machine industrielle utilisant de l'air comprimé", dureeVie: 15,
                      inputs: [
                        {key:'D', label:"Débit d'air comprimé D à la pression de service (L/min)", type:'number'},
                        {key:'mode', label:"Durée de fonctionnement de la machine", type:'select', options:['1x8h avec arrêt le weekend','2x8h avec arrêt le weekend','3x8h avec arrêt le weekend','3x8h sans arrêt le weekend']}
                          ],
                      calc: function(v){
                            var base = {'1x8h avec arrêt le weekend':71,'2x8h avec arrêt le weekend':57,'3x8h avec arrêt le weekend':45,'3x8h sans arrêt le weekend':30}[v.mode];
                            return base*v.D;
                      }
                   };

})();
