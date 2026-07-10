// Fiches Tertiaire
(function(){
  var F = window.FICHES = window.FICHES || {};

 F['BAT-EN-101'] = { secteur: 'Tertiaire', nom: "Isolation de combles ou de toitures", dureeVie: 30,
                      inputs: [
                        {key:'secteur', label:"Secteur d'activite", type:'select', options:['Bureaux/Enseignement/Commerces','Hotellerie-Restauration','Sante','Autres secteurs']},
                        {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                        {key:'S', label:"Surface d'isolant (m2)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {H1:2600,H2:2100,H3:1400}[v.zone];
                            var f = {'Bureaux/Enseignement/Commerces':0.6,'Hotellerie-Restauration':0.7,'Sante':1.2,'Autres secteurs':0.6}[v.secteur];
                            return base*f*v.S;
                      }
                   };

 F['BAT-EN-102'] = { secteur: 'Tertiaire', nom: "Isolation des murs", dureeVie: 30,
                      inputs: [
                        {key:'secteur', label:"Secteur d'activite", type:'select', options:['Bureaux/Enseignement/Commerces','Hotellerie-Restauration','Sante','Autres secteurs']},
                        {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                        {key:'energie', label:'Energie de chauffage', type:'select', options:['Electricite','Combustible']},
                        {key:'S', label:"Surface d'isolant (m2)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {H1:{Electricite:3000,Combustible:4800},H2:{Electricite:2500,Combustible:3900},H3:{Electricite:1600,Combustible:2600}}[v.zone][v.energie];
                            var f = {'Bureaux/Enseignement/Commerces':0.6,'Hotellerie-Restauration':0.7,'Sante':1.3,'Autres secteurs':0.6}[v.secteur];
                            return base*f*v.S;
                      }
                   };

 F['BAT-EN-103'] = { secteur: 'Tertiaire', nom: "Isolation d'un plancher", dureeVie: 30,
                      inputs: [
                        {key:'secteur', label:"Secteur d'activite", type:'select', options:['Bureaux/Enseignement/Commerces','Hotellerie-Restauration','Sante','Autres secteurs']},
                        {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                        {key:'S', label:"Surface d'isolant (m2)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {H1:5200,H2:4200,H3:2800}[v.zone];
                            var f = {'Bureaux/Enseignement/Commerces':0.6,'Hotellerie-Restauration':0.7,'Sante':1.2,'Autres secteurs':0.6}[v.secteur];
                            return base*f*v.S;
                      }
                   };

 F['BAT-EN-104'] = { secteur: 'Tertiaire', nom: "Fenetre ou porte-fenetre complete avec vitrage isolant", dureeVie: 30,
                      inputs: [
                        {key:'secteur', label:"Secteur d'activite", type:'select', options:['Bureaux/Enseignement/Commerces','Hotellerie-Restauration','Sante','Autres secteurs']},
                        {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                        {key:'S', label:'Surface totale de fenetres (m2)', type:'number'}
                          ],
                      calc: function(v){
                            var base = {H1:5300,H2:4300,H3:2900}[v.zone];
                            var f = {'Bureaux/Enseignement/Commerces':0.6,'Hotellerie-Restauration':0.7,'Sante':1.3,'Autres secteurs':0.6}[v.secteur];
                            return base*f*v.S;
                      }
                   };

 F['BAT-EN-106'] = { secteur: 'Tertiaire', nom: "Isolation de combles ou de toitures (France d'outre-mer)", dureeVie: 30,
                      inputs: [
                        {key:'secteur', label:"Secteur d'activite", type:'select', options:['Bureaux','Commerce','Hotellerie','Enseignement','Sante','Autres secteurs']},
                        {key:'batiment', label:'Batiment', type:'select', options:['Existant','Neuf']},
                        {key:'S', label:"Surface d'isolant pose (m2)", type:'number'}
                          ],
                      calc: function(v){
                            var t = {Bureaux:[1400,1000],Commerce:[1800,1300],Hotellerie:[2800,2000],Enseignement:[1600,1100],Sante:[2500,1800],'Autres secteurs':[1400,1000]}[v.secteur];
                            var val = v.batiment==='Existant'? t[0] : t[1];
                            return val*v.S;
                      }
                   };

 F['BAT-EN-107'] = { secteur: 'Tertiaire', nom: "Isolation des toitures-terrasses", dureeVie: 30,
                      inputs: [
                        {key:'secteur', label:"Secteur d'activite", type:'select', options:['Bureaux/Enseignement/Commerces','Hotellerie-Restauration','Sante','Autres secteurs']},
                        {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                        {key:'energie', label:'Energie de chauffage', type:'select', options:['Electricite','Combustible']},
                        {key:'S', label:"Surface d'isolant (m2)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {H1:{Electricite:1800,Combustible:2800},H2:{Electricite:1500,Combustible:2300},H3:{Electricite:1000,Combustible:1500}}[v.zone][v.energie];
                            var f = {'Bureaux/Enseignement/Commerces':0.6,'Hotellerie-Restauration':0.7,'Sante':1.3,'Autres secteurs':0.6}[v.secteur];
                            return base*f*v.S;
                      }
                   };

 F['BAT-EN-108'] = { secteur: 'Tertiaire', nom: "Isolation des murs (France d'outre-mer)", dureeVie: 30,
                      inputs: [
                        {key:'secteur', label:"Secteur d'activite", type:'select', options:['Bureaux','Commerce','Hotellerie','Enseignement','Sante','Autres secteurs']},
                        {key:'batiment', label:'Batiment', type:'select', options:['Existant','Neuf']},
                        {key:'S', label:"Surface d'isolant pose (m2)", type:'number'}
                          ],
                      calc: function(v){
                            var t = {Bureaux:[920,660],Commerce:[760,540],Hotellerie:[1400,1000],Enseignement:[810,580],Sante:[1300,960],'Autres secteurs':[760,540]}[v.secteur];
                            var val = v.batiment==='Existant'? t[0] : t[1];
                            return val*v.S;
                      }
                   };

 F['BAT-EN-109'] = { secteur: 'Tertiaire', nom: "Reduction des apports solaires par la toiture (France d'outre-mer)", dureeVie: 30,
                      inputs: [
                        {key:'montant', label:'Montant unitaire (kWh cumac/m2) - voir fiche officielle selon secteur/localisation', type:'number'},
                        {key:'S', label:'Surface de toiture protegee (m2)', type:'number'}
                          ],
                      calc: function(v){ return v.montant*v.S; }
                   };

 F['BAT-EN-110'] = { secteur: 'Tertiaire', nom: "Protections des baies contre le rayonnement solaire (France d'outre-mer)", dureeVie: 15,
                      inputs: [
                        {key:'montant', label:'Montant unitaire (kWh cumac/m2) - voir fiche officielle selon FS/secteur', type:'number'},
                        {key:'S', label:'Surface totale de baie protegee (m2)', type:'number'}
                          ],
                      calc: function(v){ return v.montant*v.S; }
                   };

 F['BAT-EN-111'] = { secteur: 'Tertiaire', nom: "Fenetre ou porte-fenetre complete avec vitrage parietodynamique", dureeVie: 24,
                      inputs: [
                        {key:'secteur', label:'Secteur', type:'select', options:['Bureaux','Hotellerie-restauration','Commerces','Enseignement','Sante','Autres']},
                        {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                        {key:'S', label:'Surface de fenetres/portes-fenetres (m2)', type:'number'}
                          ],
                      calc: function(v){
                            var t = {Bureaux:[3300,2800,2100],'Hotellerie-restauration':[3700,3200,2300],Commerces:[3300,2900,2100],Enseignement:[4000,3500,2500],Sante:[6600,5500,3900],Autres:[3300,2800,2100]}[v.secteur];
                            var i = {H1:0,H2:1,H3:2}[v.zone];
                            return t[i]*v.S;
                      }
                   };

 F['BAT-EN-112'] = { secteur: 'Tertiaire', nom: "Revetements reflectifs en toiture", dureeVie: 20,
                      inputs: [
                        {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                        {key:'S', label:'Surface de toiture couverte (m2)', type:'number'}
                          ],
                      calc: function(v){ return {H1:160,H2:170,H3:270}[v.zone]*v.S; }
                   };

 F['BAT-EN-113'] = { secteur: 'Tertiaire', nom: "Facade rideau ou semi-rideau avec vitrage isolant", dureeVie: 30,
                      inputs: [
                        {key:'secteur', label:"Secteur d'activite", type:'select', options:['Bureaux/Enseignement/Commerces','Hotellerie-Restauration','Sante','Autres secteurs']},
                        {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                        {key:'S', label:'Surface totale de facade (m2)', type:'number'}
                          ],
                      calc: function(v){
                            var base = {H1:5900,H2:4800,H3:3200}[v.zone];
                            var f = {'Bureaux/Enseignement/Commerces':0.6,'Hotellerie-Restauration':0.7,'Sante':1.3,'Autres secteurs':0.6}[v.secteur];
                            return base*f*v.S;
                      }
                   };

 F['BAT-EQ-117'] = { secteur: 'Tertiaire', nom: "Installation frigorifique utilisant du CO2 subcritique ou transcritique", dureeVie: 15,
                      inputs: [
                        {key:'cas', label:'Cas', type:'select', options:['Cas 1 - Positif CO2 diphasique','Cas 2 - Negatif seul cascade CO2 subcritique','Cas 3 - Transcritique Option 0','Cas 3 - Transcritique Option 1/1bis','Cas 3 - Transcritique Option 2']},
                        {key:'saturee', label:'Avec alimentation evaporateurs en regime sature (Cas 3)', type:'select', options:['Non','Oui']},
                        {key:'Pf', label:'Puissance frigorifique utile (kW)', type:'number'}
                          ],
                      calc: function(v){
                            var vals = {
                                    'Cas 1 - Positif CO2 diphasique': 7300,
                                    'Cas 2 - Negatif seul cascade CO2 subcritique': 8400,
                                    'Cas 3 - Transcritique Option 0': v.saturee==='Oui'?12500:8500,
                                    'Cas 3 - Transcritique Option 1/1bis': v.saturee==='Oui'?14100:10300,
                                    'Cas 3 - Transcritique Option 2': v.saturee==='Oui'?16300:12700
                            };
                            return vals[v.cas]*v.Pf;
                      }
                   };

 F['BAT-EQ-123'] = { secteur: 'Tertiaire', nom: "Moto-variateur synchrone a aimants permanents ou a reluctance", dureeVie: 20,
                      inputs: [
                        {key:'application', label:'Application', type:'select', options:['Chauffage/pompage','Ventilation/renouvellement air','Refrigeration','Climatisation','Autres applications']},
                        {key:'P', label:'Puissance electrique nominale (kW)', type:'number'}
                          ],
                      calc: function(v){
                            var t = {'Chauffage/pompage':13700,'Ventilation/renouvellement air':16300,'Refrigeration':8000,'Climatisation':2000,'Autres applications':2000};
                            return t[v.application]*v.P;
                      }
                   };

 F['BAT-EQ-124'] = { secteur: 'Tertiaire', nom: "Fermeture des meubles frigorifiques de vente a temperature positive", dureeVie: 7,
                    inputs: [
                      {key:'L', label:'Longueur lineaire de porte en verre (m)', type:'number'}
                      ],
                    calc: function(v){ return 25600*v.L; }
                   };

 F['BAT-EQ-125'] = { secteur: 'Tertiaire', nom: "Fermeture des meubles frigorifiques de vente a temperature negative", dureeVie: 7,
                    inputs: [
                      {key:'type', label:'Type de meuble', type:'select', options:['Simple','Double','Combine']},
                      {key:'L', label:'Longueur totale de couvercles (m)', type:'number'}
                      ],
                    calc: function(v){ return {Simple:6700,Double:8200,Combine:4600}[v.type]*v.L; }
                   };

 F['BAT-EQ-129'] = { secteur: 'Tertiaire', nom: "Lanterneaux d'eclairage zenithal (France Metropolitaine)", dureeVie: 20,
                    inputs: [
                      {key:'secteur', label:"Secteur d'activite", type:'select', options:['Commerces','Autres secteurs']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'S', label:'Aire de la projection horizontale (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var t = {H1:{Commerces:9500,'Autres secteurs':3400},H2:{Commerces:10800,'Autres secteurs':4000},H3:{Commerces:16000,'Autres secteurs':6400}};
                      return t[v.zone][v.secteur]*v.S;
                    }
                   };

 F['BAT-EQ-130'] = { secteur: 'Tertiaire', nom: "Systeme de condensation frigorifique a haute efficacite", dureeVie: 15,
                    inputs: [
                      {key:'montant', label:'Montant unitaire (kWh cumac/kW) - voir fiche officielle selon type de condenseur, deltaT et application', type:'number'},
                      {key:'P', label:'Puissance electrique nominale totale (kW)', type:'number'}
                      ],
                    calc: function(v){ return v.montant*v.P; }
                   };

 F['BAT-EQ-131'] = { secteur: 'Tertiaire', nom: "Conduits de lumiere naturelle", dureeVie: 20,
                    inputs: [
                      {key:'secteur', label:'Secteur', type:'select', options:['Commerce','Bureaux','Autres Secteurs']},
                      {key:'zoneOM', label:'Zone', type:'select', options:["France metropolitaine","France d'outre-mer"]},
                      {key:'S', label:'Section totale des conduits (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var fs = {Commerce:1,Bureaux:0.75,'Autres Secteurs':0.6}[v.secteur];
                      var fz = v.zoneOM==='France metropolitaine'?1:1.5;
                      return 28500*fs*fz*v.S;
                    }
                   };

 F['BAT-EQ-134'] = { secteur: 'Tertiaire', nom: "Meuble frigorifique de vente performant avec groupe de production de froid integre", dureeVie: 10,
                    inputs: [
                      {key:'classe', label:'Classe energetique', type:'select', options:['D','C','A']},
                      {key:'type', label:'Type de meuble', type:'select', options:['Armoires verticales/semi-verticales/mixtes','Armoires horizontales','Congelateurs verticaux/mixtes','Congelateurs horizontaux']},
                      {key:'L', label:'Longueur totale installee (m)', type:'number'}
                      ],
                    calc: function(v){
                      var t = {
                        D:{'Armoires verticales/semi-verticales/mixtes':22600,'Armoires horizontales':6300,'Congelateurs verticaux/mixtes':18400,'Congelateurs horizontaux':9900},
                        C:{'Armoires verticales/semi-verticales/mixtes':31000,'Armoires horizontales':8700,'Congelateurs verticaux/mixtes':30800,'Congelateurs horizontaux':14700},
                        A:{'Armoires verticales/semi-verticales/mixtes':43800,'Armoires horizontales':12100,'Congelateurs verticaux/mixtes':49400,'Congelateurs horizontaux':21900}
                      };
                      return t[v.classe][v.type]*v.L;
                    }
                   };

 F['BAT-EQ-135'] = { secteur: 'Tertiaire', nom: "Dispositif performant d'alimentation sans interruption", dureeVie: 15,
                    inputs: [
                      {key:'tranche', label:'Tranche de puissance', type:'select', options:['100 kW < P <= 200 kW','P > 200 kW']},
                      {key:'P', label:'Puissance active de sortie assignee (kW)', type:'number'}
                      ],
                    calc: function(v){ return (v.tranche==='100 kW < P <= 200 kW'?3100:2500)*v.P; }
                   };

 F['BAT-SE-103'] = { secteur: 'Tertiaire', nom: "Reglage des organes d'equilibrage d'une installation de chauffage a eau chaude", dureeVie: 10,
                    inputs: [
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'S', label:'Surface chauffee (m2)', type:'number'}
                      ],
                    calc: function(v){ return {H1:120,H2:100,H3:67}[v.zone]*v.S; }
                   };

 F['BAT-SE-104'] = { secteur: 'Tertiaire', nom: "Contrat de Performance Energetique Services (CPE Services) Chauffage", dureeVie: 10,
                    inputs: [
                      {key:'duree', label:'Duree de la garantie (annees pleines, 2-10)', type:'select', options:['2','3','4','5','6','7','8','9','10']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'F', label:"Facteur correctif F lie au perimetre du contrat (defaut 1)", type:'number', default:1},
                      {key:'S', label:'Surface chauffee (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var t = {2:{H1:23,H2:19,H3:13},3:{H1:34,H2:28,H3:18},4:{H1:44,H2:36,H3:24},5:{H1:54,H2:44,H3:30},6:{H1:64,H2:52,H3:35},7:{H1:73,H2:60,H3:40},8:{H1:82,H2:67,H3:45},9:{H1:90,H2:74,H3:49},10:{H1:99,H2:81,H3:54}};
                      return t[parseInt(v.duree)][v.zone]*(v.F||1)*v.S;
                    }
                   };

 F['BAT-SE-105'] = { secteur: 'Tertiaire', nom: "Abaissement de la temperature de retour vers un reseau de chaleur", dureeVie: 12,
                    inputs: [
                      {key:'secteur', label:'Secteur', type:'select', options:['Bureaux','Enseignement','Sante','Commerces','Hotellerie/restauration','Autres']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'S', label:'Surface chauffee (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var base = {H1:130,H2:110,H3:72}[v.zone];
                      var f = {Bureaux:1.2,Enseignement:0.8,Sante:1,Commerces:0.9,'Hotellerie/restauration':1.3,Autres:0.8}[v.secteur];
                      return base*f*v.S;
                    }
                   };

 F['BAT-TH-103'] = { secteur: 'Tertiaire', nom: "Plancher chauffant hydraulique a basse temperature", dureeVie: 50,
                    inputs: [
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'secteur', label:"Secteur d'activite", type:'select', options:['Bureaux','Enseignement','Commerce','Hotellerie, restauration','Sante','Autres secteurs']},
                      {key:'S', label:'Surface chauffee (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var base = {H1:210,H2:170,H3:110}[v.zone];
                      var f = {Bureaux:1.2,Enseignement:0.8,Commerce:0.9,'Hotellerie, restauration':1.3,Sante:0.9,'Autres secteurs':0.8}[v.secteur];
                      return base*f*v.S;
                    }
                   };

 F['BAT-TH-108'] = { secteur: 'Tertiaire', nom: "Systeme de regulation par programmation d'intermittence", dureeVie: 12,
                    inputs: [
                      {key:'secteur', label:"Secteur d'activite", type:'select', options:['Bureaux','Enseignement','Commerces','Hotellerie-Restauration','Sante','Autres secteurs']},
                      {key:'energie', label:'Energie de chauffage', type:'select', options:['Combustible','Electricite']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'S', label:'Surface chauffee (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var t = {Bureaux:{Combustible:66,Electricite:37},Enseignement:{Combustible:43,Electricite:24},Commerces:{Combustible:47,Electricite:27},'Hotellerie-Restauration':{Combustible:78,Electricite:29},Sante:{Combustible:54,Electricite:31},'Autres secteurs':{Combustible:43,Electricite:24}};
                      var zf = {H1:1.1,H2:0.9,H3:0.6}[v.zone];
                      return t[v.secteur][v.energie]*zf*v.S;
                    }
                   };

 F['BAT-TH-109'] = { secteur: 'Tertiaire', nom: "Systeme de regulation par optimiseur", dureeVie: 15,
                    inputs: [
                      {key:'secteur', label:"Secteur d'activite", type:'select', options:['Bureaux','Enseignement','Sante','Commerce','Hotellerie/Restauration','Autres secteurs']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'S', label:'Surface chauffee (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var t = {Bureaux:69,Enseignement:43,Sante:53,Commerce:55,'Hotellerie/Restauration':82,'Autres secteurs':43};
                      var zf = {H1:1.1,H2:0.9,H3:0.6}[v.zone];
                      return t[v.secteur]*zf*v.S;
                    }
                   };

 F['BAT-TH-110'] = { secteur: 'Tertiaire', nom: "Recuperateur de chaleur a condensation", dureeVie: 11,
                    inputs: [
                      {key:'usage', label:'Usage de la chaudiere', type:'select', options:['Chauffage','Chauffage et eau chaude sanitaire']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'secteur', label:"Secteur d'activite", type:'select', options:['Bureaux','Enseignement','Sante','Commerces','Hotellerie restauration','Autres secteurs']},
                      {key:'R', label:'Coefficient R (defaut 1)', type:'number', default:1},
                      {key:'S', label:'Surface chauffee (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var base, f;
                      if (v.usage==='Chauffage') {
                        base = {H1:150,H2:130,H3:80}[v.zone];
                        f = {Bureaux:1.2,Enseignement:0.8,Sante:1.0,Commerces:0.9,'Hotellerie restauration':1.4,'Autres secteurs':0.8}[v.secteur];
                      } else {
                        base = {H1:190,H2:160,H3:120}[v.zone];
                        f = {Bureaux:1.1,Enseignement:0.7,Sante:1.1,Commerces:0.8,'Hotellerie restauration':1.6,'Autres secteurs':0.7}[v.secteur];
                      }
                      return base*f*(v.R||1)*v.S;
                    }
                   };

 F['BAT-TH-111'] = { secteur: 'Tertiaire', nom: "Chauffe-eau solaire collectif", dureeVie: 22,
                    inputs: [
                      {key:'B', label:"Besoin annuel ECS solaire (kWh/an, etude de dimensionnement)", type:'number'},
                      {key:'T', label:'Taux de couverture solaire T (%)', type:'number'}
                      ],
                    calc: function(v){ return v.B*(v.T/100)*0.196; }
                   };

 F['BAT-TH-112'] = { secteur: 'Tertiaire', nom: "Moteur a variation electronique de vitesse", dureeVie: 15,
                    inputs: [
                      {key:'application', label:'Application', type:'select', options:['Chauffage/pompage','Ventilation/renouvellement air','Refrigeration','Climatisation','Autres applications']},
                      {key:'P', label:'Puissance nominale du moteur (kW)', type:'number'}
                      ],
                    calc: function(v){
                      var t = {'Chauffage/pompage':9600,'Ventilation/renouvellement air':11400,'Refrigeration':3900,'Climatisation':990,'Autres applications':990};
                      return t[v.application]*v.P;
                    }
                   };

 F['BAT-TH-115'] = { secteur: 'Tertiaire', nom: "Climatiseur performant (France d'outre-mer)", dureeVie: 9,
                    inputs: [
                      {key:'branche', label:"Branche d'activite", type:'select', options:['Bureaux','Enseignement','Commerce','Hotellerie - restauration','Sante','Autres']},
                      {key:'classe', label:"Classe d'efficacite energetique", type:'select', options:['A','A+','A++','A+++']},
                      {key:'puissance', label:'Puissance frigorifique (kW)', type:'select', options:['2.05 (7000 BTU/h)','2.64 (9000 BTU/h)','3.52 (12000 BTU/h)','4.40 (15000 BTU/h)','5.28 (18000 BTU/h)','6.16 (21000 BTU/h)','7.03 (24000 BTU/h)','8.21 (28000 BTU/h)']}
                      ],
                    calc: function(v){
                      var base = {Bureaux:{A:1100,'A+':2000,'A++':2700,'A+++':5100},Enseignement:{A:900,'A+':1600,'A++':2200,'A+++':4100},Commerce:{A:1800,'A+':3200,'A++':4400,'A+++':8200},'Hotellerie - restauration':{A:1300,'A+':2300,'A++':3200,'A+++':5900},Sante:{A:2000,'A+':3700,'A++':5100,'A+++':9500},Autres:{A:900,'A+':1600,'A++':2200,'A+++':4100}}[v.branche][v.classe];
                      var fp = {'2.05 (7000 BTU/h)':0.58,'2.64 (9000 BTU/h)':0.75,'3.52 (12000 BTU/h)':1,'4.40 (15000 BTU/h)':1.25,'5.28 (18000 BTU/h)':1.5,'6.16 (21000 BTU/h)':1.75,'7.03 (24000 BTU/h)':2,'8.21 (28000 BTU/h)':2.33}[v.puissance];
                      return base*fp;
                    }
                   };

 F['BAT-TH-116'] = { secteur: 'Tertiaire', nom: "Systeme de gestion technique du batiment (GTB)", dureeVie: 15,
                    inputs: [
                      {key:'montant', label:'Montant unitaire (kWh cumac/m2) - voir fiche officielle selon secteur/usage', type:'number'},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'S', label:'Surface geree par le systeme (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var zf = {H1:1.1,H2:0.9,H3:0.6}[v.zone];
                      return v.montant*zf*v.S;
                    }
                   };

 F['BAT-TH-121'] = { secteur: 'Tertiaire', nom: "Chauffe-eau solaire (France d'outre-mer)", dureeVie: 20,
                    inputs: [
                      {key:'type', label:'Type de chauffe-eau solaire', type:'select', options:['CESI et CES collectif a appoint individualise','CES collectif a appoint centralise']},
                      {key:'B', label:"Besoin annuel ECS solaire (kWh/an)", type:'number'},
                      {key:'T', label:'Taux de couverture solaire T (%, 50 a 100)', type:'number'}
                      ],
                    calc: function(v){
                      var f = v.type==='CESI et CES collectif a appoint individualise'?0.148:0.086;
                      var T = Math.min(v.T, 90);
                      return f*v.B*(T/100);
                    }
                   };

 F['BAT-TH-122'] = { secteur: 'Tertiaire', nom: "Programmateur d'intermittence pour la climatisation", dureeVie: 12,
                    inputs: [
                      {key:'secteur', label:"Secteur d'activite", type:'select', options:['Bureaux','Commerce','Hotellerie','Enseignement','Sante','Autres secteurs']},
                      {key:'S', label:'Surface climatisee (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var t = {Bureaux:560,Commerce:180,Hotellerie:340,Enseignement:460,Sante:210,'Autres secteurs':180};
                      return t[v.secteur]*v.S;
                    }
                   };

 F['BAT-TH-125'] = { secteur: 'Tertiaire', nom: "Ventilation mecanique simple flux", dureeVie: 17,
                    inputs: [
                      {key:'type', label:'Type de ventilation', type:'select', options:['Modulee proportionnelle','Modulee a detection de presence','Debit constant']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'secteur', label:'Secteur', type:'select', options:['Bureaux','Enseignement','Restauration','Autres locaux']},
                      {key:'S', label:'Surface ventilee (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var tbl = {
                        'Modulee proportionnelle': {base:{H1:770,H2:630,H3:420}, f:{Bureaux:0.48,Enseignement:1,Restauration:0.59,'Autres locaux':0.54}},
                        'Modulee a detection de presence': {base:{H1:690,H2:560,H3:380}, f:{Bureaux:0.4,Enseignement:1,Restauration:0.45,'Autres locaux':0.51}},
                        'Debit constant': {base:{H1:400,H2:330,H3:220}, f:{Bureaux:0.4,Enseignement:1,Restauration:0.53,'Autres locaux':0.58}}
                      };
                      var e = tbl[v.type];
                      return e.base[v.zone]*e.f[v.secteur]*v.S;
                    }
                   };

 F['BAT-TH-126'] = { secteur: 'Tertiaire', nom: "Ventilation mecanique double flux avec echangeur", dureeVie: 17,
                    inputs: [
                      {key:'type', label:'Type de ventilation', type:'select', options:['Modulee proportionnelle','Modulee a detection de presence']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'secteur', label:'Secteur', type:'select', options:['Bureaux','Enseignement','Restauration','Etablissement sportif','Autres locaux','Salles > 250 m3']},
                      {key:'S', label:'Surface ventilee (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var tbl = {
                        'Modulee proportionnelle': {base:{H1:1000,H2:830,H3:560}, f:{Bureaux:0.53,Enseignement:1,Restauration:0.68,'Etablissement sportif':0.22,'Autres locaux':0.71,'Salles > 250 m3':1.88}},
                        'Modulee a detection de presence': {base:{H1:850,H2:700,H3:460}, f:{Bureaux:0.48,Enseignement:1,Restauration:0.61,'Etablissement sportif':0.52,'Autres locaux':0.71,'Salles > 250 m3':1.44}}
                      };
                      var e = tbl[v.type];
                      return e.base[v.zone]*e.f[v.secteur]*v.S;
                    }
                   };

 F['BAT-TH-127'] = { secteur: 'Tertiaire', nom: "Raccordement d'un batiment tertiaire a un reseau de chaleur", dureeVie: 30,
                    inputs: [
                      {key:'puissance', label:'Puissance souscrite', type:'select', options:['<= 400 kW','> 400 kW']},
                      {key:'usage', label:'Usage de la chaleur du reseau', type:'select', options:['Chauffage','Chauffage et eau chaude sanitaire']},
                      {key:'secteur', label:'Secteur', type:'select', options:['Bureaux','Enseignement','Sante','Commerces','Hotellerie/Restauration','Autres']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'S', label:'Surface chauffee (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var tbl = {
                        '<= 400 kW': {Chauffage:{Bureaux:480,Enseignement:310,Sante:400,Commerces:370,'Hotellerie/Restauration':540,Autres:310}, 'Chauffage et eau chaude sanitaire':{Bureaux:510,Enseignement:360,Sante:540,Commerces:420,'Hotellerie/Restauration':680,Autres:330}},
                        '> 400 kW': {Chauffage:{Bureaux:370,Enseignement:240,Sante:310,Commerces:280,'Hotellerie/Restauration':410,Autres:240}, 'Chauffage et eau chaude sanitaire':{Bureaux:390,Enseignement:270,Sante:410,Commerces:320,'Hotellerie/Restauration':520,Autres:260}}
                      };
                      var base = tbl[v.puissance][v.usage][v.secteur];
                      var zf = {H1:1.1,H2:0.9,H3:0.6}[v.zone];
                      return base*zf*v.S;
                    }
                   };

 F['BAT-TH-134'] = { secteur: 'Tertiaire', nom: "Systeme de regulation sur un groupe de production de froid a haute pression flottante (France metropolitaine)", dureeVie: 14,
                    inputs: [
                      {key:'application', label:'Application', type:'select', options:['Climatisation de confort (hors datacenter)','Climatisation datacenter','Autres applications (refrigeration/conditionnement)']},
                      {key:'condensation', label:'Type de condensation', type:'select', options:["Par rapport a l'atmosphere",'A eau seul']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'P', label:'Puissance electrique nominale totale (kW)', type:'number'}
                      ],
                    calc: function(v){
                      var tbl = {
                        'Climatisation de confort (hors datacenter)': {H1:[2000,670],H2:[1800,480],H3:[1600,290]},
                        'Climatisation datacenter': {H1:[22800,14500],H2:[20500,13900],H3:[20200,11300]},
                        'Autres applications (refrigeration/conditionnement)': {H1:[19100,13400],H2:[17000,12800],H3:[16400,10500]}
                      };
                      var i = v.condensation==="Par rapport a l'atmosphere"?0:1;
                      return tbl[v.application][v.zone][i]*v.P;
                    }
                   };

 F['BAT-TH-135'] = { secteur: 'Tertiaire', nom: "Systeme de regulation sur un groupe de production de froid a haute pression flottante (France d'outre-mer)", dureeVie: 10,
                    inputs: [
                      {key:'application', label:'Application', type:'select', options:['Refrigeration','Climatisation hors datacenter','Climatisation datacenter']},
                      {key:'P', label:'Puissance electrique nominale totale (kW)', type:'number'}
                      ],
                    calc: function(v){
                      var t = {'Refrigeration':2700,'Climatisation hors datacenter':2500,'Climatisation datacenter':4700};
                      return t[v.application]*v.P;
                    }
                   };

 F['BAT-TH-139'] = { secteur: 'Tertiaire', nom: "Systeme de recuperation de chaleur sur un groupe de production de froid", dureeVie: 14,
                    inputs: [
                      {key:'D', label:"Duree annuelle d'utilisation de la chaleur recuperee (h)", type:'number'},
                      {key:'Pcompresseurs', label:'Puissance electrique nominale des compresseurs (kW)', type:'number'},
                      {key:'PdejaRecuperee', label:'Puissance deja recuperee le cas echeant (kW)', type:'number', default:0},
                      {key:'Precuperee', label:'Puissance thermique recuperee mesuree (kW)', type:'number'}
                      ],
                    calc: function(v){
                      var limite = 2*v.Pcompresseurs - (v.PdejaRecuperee||0);
                      var P = Math.min(v.Precuperee, limite);
                      return v.D*9.9*P;
                    }
                   };

 F['BAT-TH-142'] = { secteur: 'Tertiaire', nom: "Systeme de destratification d'air (France metropolitaine)", dureeVie: 15,
                    inputs: [
                      {key:'type', label:'Type de systeme', type:'select', options:['Convectif','Radiatif']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'P', label:'Puissance nominale du systeme de chauffage (kW)', type:'number'}
                      ],
                    calc: function(v){
                      var t = {H1:{Convectif:3900,Radiatif:1400},H2:{Convectif:4500,Radiatif:1600},H3:{Convectif:4600,Radiatif:1600}};
                      return t[v.zone][v.type]*v.P;
                    }
                   };

 F['BAT-TH-143'] = { secteur: 'Tertiaire', nom: "Ventilo-convecteurs haute performance", dureeVie: 15,
                    inputs: [
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'secteur', label:'Secteur', type:'select', options:['Sante avec hebergement','Hotels et autres hebergements','Sante sans hebergement','Bureaux/restauration/commerces','Autres secteurs']},
                      {key:'Sch', label:'Surface totale chauffee (m2)', type:'number'},
                      {key:'Sra', label:'Surface totale rafraichie (m2)', type:'number', default:0}
                      ],
                    calc: function(v){
                      var baseCh = {H1:65,H2:57,H3:48}[v.zone];
                      var fCh = {'Sante avec hebergement':{H1:2.30,H2:2.35,H3:2.35},'Hotels et autres hebergements':{H1:2.20,H2:2.20,H3:2.20},'Sante sans hebergement':{H1:0.65,H2:0.60,H3:0.65},'Bureaux/restauration/commerces':{H1:0.60,H2:0.60,H3:0.60},'Autres secteurs':{H1:0.45,H2:0.45,H3:0.40}}[v.secteur][v.zone];
                      var baseRa = {H1:9,H2:13,H3:24}[v.zone];
                      var fRa = {'Sante avec hebergement':{H1:2.05,H2:2.10,H3:2.05},'Hotels et autres hebergements':{H1:3.10,H2:3.35,H3:2.60},'Sante sans hebergement':{H1:0,H2:0,H3:0.80},'Bureaux/restauration/commerces':{H1:1.85,H2:1.55,H3:0.95},'Autres secteurs':{H1:0,H2:0,H3:0}}[v.secteur][v.zone];
                      var Mch = baseCh*fCh*v.Sch;
                      var Mra = baseRa*fRa*(v.Sra||0);
                      return Mch+Mra;
                    }
                   };

 F['BAT-TH-145'] = { secteur: 'Tertiaire', nom: "Systeme de regulation sur un groupe de production de froid a basse pression flottante (France metropolitaine)", dureeVie: 14,
                    inputs: [
                      {key:'application', label:'Application', type:'select', options:['Refrigeration/conditionnement hors confort','Climatisation de confort']},
                      {key:'P', label:'Puissance electrique nominale totale (kW)', type:'number'}
                      ],
                    calc: function(v){ return (v.application==='Refrigeration/conditionnement hors confort'?3600:310)*v.P; }
                   };

 F['BAT-TH-153'] = { secteur: 'Tertiaire', nom: "Systeme de confinement des allees froides et allees chaudes dans un Data Center", dureeVie: 15,
                    inputs: [
                      {key:'deltaT', label:'Gain sur les temperatures de consigne (deg C)', type:'number'},
                      {key:'P', label:'Puissance electrique nominale du groupe de production de froid (kW)', type:'number'}
                      ],
                    calc: function(v){ return 1500*v.deltaT*v.P; }
                   };

 F['BAT-TH-154'] = { secteur: 'Tertiaire', nom: "Recuperation instantanee de chaleur sur eaux grises", dureeVie: 15,
                    inputs: [
                      {key:'cas', label:'Cas', type:'select', options:['Cas 1 - Debits inegaux','Cas 2 - Debits egaux']},
                      {key:'usage', label:'Usage du batiment', type:'select', options:['Hotellerie','Etablissement sportif','Sante','Terrain de camping','Salon de coiffure','Piscine (renouvellement + lavage filtres)','Piscine (renouvellement seul)']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'N', label:"Nombre d'unites (chambres/douches/salons/baigneurs par an)", type:'number'},
                      {key:'epsilon', label:'Efficacite du recuperateur (%)', type:'number'}
                      ],
                    calc: function(v){
                      var tbl = {
                        'Cas 1 - Debits inegaux': {
                          'Hotellerie':{H1:13000,H2:12200,H3:10900}, 'Etablissement sportif':{H1:18100,H2:17100,H3:15300}, 'Sante':{H1:6400,H2:6000,H3:5300},
                          'Terrain de camping':{H1:72200,H2:67900,H3:60900}, 'Salon de coiffure':{H1:33300,H2:27100,H3:17900}
                        },
                        'Cas 2 - Debits egaux': {
                          'Hotellerie':{H1:16500,H2:15500,H3:13800}, 'Etablissement sportif':{H1:22900,H2:21600,H3:19300}, 'Sante':{H1:8100,H2:7600,H3:6800},
                          'Terrain de camping':{H1:91400,H2:86000,H3:77000}, 'Salon de coiffure':{H1:42100,H2:34300,H3:22700},
                          'Piscine (renouvellement + lavage filtres)':{H1:35,H2:32,H3:27}, 'Piscine (renouvellement seul)':{H1:11,H2:10,H3:8}
                        }
                      };
                      var v1 = tbl[v.cas][v.usage][v.zone];
                      return v1*v.N*(v.epsilon/100);
                    }
                   };

 F['BAT-TH-156'] = { secteur: 'Tertiaire', nom: "Freecooling par eau de refroidissement en substitution d'un groupe froid", dureeVie: 14,
                    inputs: [
                      {key:'secteur', label:'Secteur', type:'select', options:['Climatisation hors Data Center','Climatisation Data Center']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'plage', label:'Plage de temperature de consigne du reseau', type:'select', options:['[15 a 18[ degC','[18 a 20] degC']},
                      {key:'P', label:'Puissance electrique nominale des compresseurs (kW)', type:'number'}
                      ],
                    calc: function(v){
                      var base = {H1:{'[15 a 18[ degC':5100,'[18 a 20] degC':6400},H2:{'[15 a 18[ degC':4200,'[18 a 20] degC':5900},H3:{'[15 a 18[ degC':3000,'[18 a 20] degC':4700}}[v.zone][v.plage];
                      var coef = v.secteur==='Climatisation hors Data Center'?1:4.5;
                      return base*coef*v.P;
                    }
                   };

 F['BAT-TH-157'] = { secteur: 'Tertiaire', nom: "Chaudiere biomasse collective", dureeVie: 22,
                    inputs: [
                      {key:'puissance', label:'Puissance de la chaudiere', type:'select', options:['<= 500 kW','> 500 kW']},
                      {key:'Q', label:"Chaleur nette utile produite (kWh/an, etude de dimensionnement)", type:'number'}
                      ],
                    calc: function(v){ return v.Q*(v.puissance==='<= 500 kW'?4.8:3.4); }
                   };

 F['BAT-TH-158'] = { secteur: 'Tertiaire', nom: "Pompe a chaleur reversible de type air/air (France metropolitaine)", dureeVie: 22,
                    inputs: [
                      {key:'cas', label:'Cas', type:'select', options:['PAC <= 12 kW','PAC > 12 kW','PAC en toiture (rooftop)']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'secteur', label:'Secteur', type:'select', options:['Hotellerie, restauration','Sante','Enseignement','Bureaux','Commerces','Autres']},
                      {key:'S', label:'Surface totale chauffee/traitee (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var base = {'PAC <= 12 kW':{H1:860,H2:760,H3:620},'PAC > 12 kW':{H1:870,H2:770,H3:630},'PAC en toiture (rooftop)':{H1:660,H2:540,H3:360}}[v.cas][v.zone];
                      var f = {'Hotellerie, restauration':0.7,'Sante':1.1,'Enseignement':0.8,'Bureaux':1.2,'Commerces':0.9,'Autres':0.7}[v.secteur];
                      return base*f*v.S;
                    }
                   };

 F['BAT-TH-159'] = { secteur: 'Tertiaire', nom: "Raccordement d'un batiment tertiaire a un reseau de froid", dureeVie: 36,
                    inputs: [
                      {key:'secteur', label:'Secteur', type:'select', options:['Data Center','Cafes, hotels, restaurants','Sante','Enseignement, recherche','Sport, loisirs, culture','Bureaux','Commerces','Autres']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'P', label:'Puissance thermique (kW)', type:'number'}
                      ],
                    calc: function(v){
                      var base = {'Data Center':26000,'Cafes, hotels, restaurants':10400,'Sante':26000,'Enseignement, recherche':4900,'Sport, loisirs, culture':19800,'Bureaux':7800,'Commerces':11300,'Autres':4900}[v.secteur];
                      var zf = {H1:1,H2:1.3,H3:1.8}[v.zone];
                      return base*zf*v.P;
                    }
                   };

 F['BAT-TH-161'] = { secteur: 'Tertiaire', nom: "Maintien en temperature des groupes electrogenes de secours par PAC air/eau", dureeVie: 11,
                    inputs: [
                      {key:'puissance', label:'Puissance nominale du groupe electrogene', type:'select', options:['800 a 1200 kW','> 1200 kW']},
                      {key:'N', label:'Nombre de groupes electrogenes equipes', type:'number', default:1}
                      ],
                    calc: function(v){ return (v.puissance==='800 a 1200 kW'?167800:279600)*(v.N||1); }
                   };

 F['BAT-TH-162'] = { secteur: 'Tertiaire', nom: "Systeme geothermique", dureeVie: 25,
                    inputs: [
                      {key:'puissance', label:'Puissance thermique nominale de la PAC', type:'select', options:['<= 400 kW','> 400 kW']},
                      {key:'critere', label:'Etas (si <=400kW) ou COP (si >400kW)', type:'select', options:['111% <= Etas < 126%','126% <= Etas < 175%','175% <= Etas','4 <= COP < 5','5 <= COP']},
                      {key:'usage', label:'Usage', type:'select', options:['Chauffage','Chauffage et ECS']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'secteur', label:'Secteur', type:'select', options:['Hotellerie, restauration','Sante','Enseignement','Bureaux','Commerces','Autres']},
                      {key:'R', label:'Facteur R (defaut 1)', type:'number', default:1},
                      {key:'S', label:'Surface chauffee par le systeme (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var tbl = {
                        '111% <= Etas < 126%': {H1:{Chauffage:1400,'Chauffage et ECS':1600},H2:{Chauffage:1100,'Chauffage et ECS':1400},H3:{Chauffage:800,'Chauffage et ECS':1000}},
                        '126% <= Etas < 175%': {H1:{Chauffage:1500,'Chauffage et ECS':1800},H2:{Chauffage:1200,'Chauffage et ECS':1500},H3:{Chauffage:800,'Chauffage et ECS':1100}},
                        '175% <= Etas': {H1:{Chauffage:1600,'Chauffage et ECS':1900},H2:{Chauffage:1300,'Chauffage et ECS':1600},H3:{Chauffage:900,'Chauffage et ECS':1200}},
                        '4 <= COP < 5': {H1:{Chauffage:1500,'Chauffage et ECS':1800},H2:{Chauffage:1300,'Chauffage et ECS':1500},H3:{Chauffage:800,'Chauffage et ECS':1100}},
                        '5 <= COP': {H1:{Chauffage:1600,'Chauffage et ECS':1900},H2:{Chauffage:1300,'Chauffage et ECS':1600},H3:{Chauffage:900,'Chauffage et ECS':1200}}
                      };
                      var base = tbl[v.critere][v.zone][v.usage];
                      var f = {'Hotellerie, restauration':0.7,'Sante':1.1,'Enseignement':0.8,'Bureaux':1.2,'Commerces':0.9,'Autres':0.7}[v.secteur];
                      return base*f*(v.R||1)*v.S;
                    }
                   };

 F['BAT-TH-163'] = { secteur: 'Tertiaire', nom: "Pompe a chaleur de type air/eau", dureeVie: 22,
                    inputs: [
                      {key:'puissance', label:'Puissance thermique nominale de la PAC', type:'select', options:['<= 400 kW','> 400 kW']},
                      {key:'critere', label:'Etas (si <=400kW) ou COP (si >400kW)', type:'select', options:['111% <= Etas < 126%','126% <= Etas < 175%','175% <= Etas','3.4 <= COP < 4.5','4.5 <= COP']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'secteur', label:'Secteur', type:'select', options:['Hotellerie, restauration','Sante','Enseignement','Bureaux','Commerces','Autres']},
                      {key:'R', label:'Facteur R (defaut 1)', type:'number', default:1},
                      {key:'S', label:'Surface totale chauffee (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var tbl = {
                        '111% <= Etas < 126%': {H1:1100,H2:900,H3:600},
                        '126% <= Etas < 175%': {H1:1200,H2:1000,H3:700},
                        '175% <= Etas': {H1:1300,H2:1000,H3:700},
                        '3.4 <= COP < 4.5': {H1:1100,H2:900,H3:600},
                        '4.5 <= COP': {H1:1200,H2:1000,H3:700}
                      };
                      var base = tbl[v.critere][v.zone];
                      var f = {'Hotellerie, restauration':0.7,'Sante':1.1,'Enseignement':0.8,'Bureaux':1.2,'Commerces':0.9,'Autres':0.7}[v.secteur];
                      return base*f*(v.R||1)*v.S;
                    }
                   };

 F['BAT-TH-164'] = { secteur: 'Tertiaire', nom: "Pompe a chaleur de type eau/eau ou eau glycolee/eau", dureeVie: 22,
                    inputs: [
                      {key:'puissance', label:'Puissance thermique nominale de la PAC', type:'select', options:['<= 400 kW','> 400 kW']},
                      {key:'critere', label:'Etas (si <=400kW) ou COP (si >400kW)', type:'select', options:['111% <= Etas < 126%','126% <= Etas < 175%','175% <= Etas','3.4 <= COP < 4.5','4.5 <= COP']},
                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                      {key:'secteur', label:'Secteur', type:'select', options:['Hotellerie, restauration','Sante','Enseignement','Bureaux','Commerces','Autres']},
                      {key:'R', label:'Facteur R (defaut 1)', type:'number', default:1},
                      {key:'S', label:'Surface totale chauffee (m2)', type:'number'}
                      ],
                    calc: function(v){
                      var tbl = {
                        '111% <= Etas < 126%': {H1:1100,H2:900,H3:600},
                        '126% <= Etas < 175%': {H1:1200,H2:1000,H3:700},
                        '175% <= Etas': {H1:1300,H2:1000,H3:700},
                        '3.4 <= COP < 4.5': {H1:1100,H2:900,H3:600},
                        '4.5 <= COP': {H1:1200,H2:1000,H3:700}
                      };
                      var base = tbl[v.critere][v.zone];
                      var f = {'Hotellerie, restauration':0.7,'Sante':1.1,'Enseignement':0.8,'Bureaux':1.2,'Commerces':0.9,'Autres':0.7}[v.secteur];
                      return base*f*(v.R||1)*v.S;
                    }
                   };

})();
