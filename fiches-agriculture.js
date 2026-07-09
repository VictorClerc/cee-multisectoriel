(function(){
var F = window.FICHES = window.FICHES || {};

F['AGRI-EQ-101'] = {
  secteur: 'Agriculture', nom: "Module d'integration de temperature sur ordinateur climatique", dureeVie: 5,
    inputs: [
        {key:'type', label:'Type de serre', type:'select', options:['Maraichere','Horticole']},
            {key:'S', label:'Surface de serre chauffee equipee (m2)', type:'number'}
              ],
                calc: function(v){ return (v.type==='Maraichere'?83:70) * v.S; }
                };

                F['AGRI-EQ-102'] = {
                  secteur: 'Agriculture', nom: 'Double ecran thermique', dureeVie: 8,
                    inputs: [
                        {key:'type', label:'Type de serre', type:'select', options:['Maraichere','Horticole']},
                            {key:'S', label:'Surface de serre equipee (m2)', type:'number'}
                              ],
                                calc: function(v){ return (v.type==='Maraichere'?290:240) * v.S; }
                                };

                                F['AGRI-EQ-104'] = {
                                  secteur: 'Agriculture', nom: 'Ecrans thermiques lateraux', dureeVie: 8,
                                    inputs: [
                                        {key:'type', label:'Type de serre', type:'select', options:['Maraichere','Horticole']},
                                            {key:'S', label:'Surface au sol de serre equipee (m2)', type:'number'}
                                              ],
                                                calc: function(v){ return (v.type==='Maraichere'?48:22) * v.S; }
                                                };

                                                F['AGRI-EQ-105'] = {
                                                  secteur: 'Agriculture', nom: "Stop and Start pour vehicules agricoles a moteur", dureeVie: 10,
                                                    inputs: [
                                                        {key:'N', label:'Nombre de vehicules', type:'number', default:1}
                                                          ],
                                                            calc: function(v){ return 18400 * v.N; }
                                                            };

                                                            F['AGRI-EQ-106'] = {
                                                              secteur: 'Agriculture', nom: 'Regulation de la ventilation des silos et installations de stockage en vrac de cereales', dureeVie: 13,
                                                                inputs: [
                                                                    {key:'type', label:'Type de regulation', type:'select', options:['Capteurs thermiques seuls','Capteurs thermiques + regulation de vitesse']},
                                                                        {key:'V', label:'Volume de cereales (m3)', type:'number'}
                                                                          ],
                                                                            calc: function(v){ return (v.type==='Capteurs thermiques seuls'?10:12) * v.V; }
                                                                            };

                                                                            F['AGRI-EQ-107'] = {
                                                                              secteur: 'Agriculture', nom: 'Isolation des parois de serre', dureeVie: 15,
                                                                                inputs: [
                                                                                    {key:'type', label:'Type de serre', type:'select', options:['Maraichere','Horticole']},
                                                                                        {key:'S', label:'Surface de serre equipee (m2)', type:'number'}
                                                                                          ],
                                                                                            calc: function(v){ return (v.type==='Maraichere'?170:92) * v.S; }
                                                                                            };

                                                                                            F['AGRI-EQ-108'] = {
                                                                                              secteur: 'Agriculture', nom: "Stockage d'eau pour une serre bioclimatique", dureeVie: 10,
                                                                                                inputs: [
                                                                                                    {key:'S', label:'Surface de serre equipee (m2)', type:'number'}
                                                                                                      ],
                                                                                                        calc: function(v){ return 390 * v.S; }
                                                                                                        };
                                                                                                        
                                                                                                        F['AGRI-EQ-109'] = {
                                                                                                          secteur: 'Agriculture', nom: 'Couverture performante de serre', dureeVie: 20,
                                                                                                            inputs: [
                                                                                                                {key:'paroi', label:'Type de paroi', type:'select', options:['Double ou simple paroi ETFE ou verre-ETFE','Double paroi verre']},
                                                                                                                    {key:'type', label:'Type de serre', type:'select', options:['Maraichere','Horticole']},
                                                                                                                        {key:'S', label:'Surface de serre equipee (m2)', type:'number'}
                                                                                                                          ],
                                                                                                                            calc: function(v){
                                                                                                                                var table = {
                                                                                                                                      'Double ou simple paroi ETFE ou verre-ETFE': {Maraichere:1060, Horticole:490},
                                                                                                                                            'Double paroi verre': {Maraichere:1930, Horticole:900}
                                                                                                                                                };
                                                                                                                                                    return table[v.paroi][v.type] * v.S;
                                                                                                                                                      }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-EQ-110'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: 'Sechage solaire par insufflation des produits et co-produits agricoles et forestiers', dureeVie: 15,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
                                                                                                                                                      {key:'systeme', label:'Type de systeme', type:'select', options:['Systeme complet neuf','Toiture solaire couplee a un systeme existant']},
                                                                                                                                                      {key:'produit', label:'Type de produit', type:'select', options:['Agricole','Forestier']},
                                                                                                                                                      {key:'P', label:'Puissance thermique totale installee (kW)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){
                                                                                                                                                      var table = {
                                                                                                                                                      'Systeme complet neuf': { H1:{Agricole:42700,Forestier:102600}, H2:{Agricole:48500,Forestier:116600}, H3:{Agricole:55700,Forestier:134100} },
                                                                                                                                                      'Toiture solaire couplee a un systeme existant': { H1:{Agricole:12200,Forestier:16900}, H2:{Agricole:13900,Forestier:19300}, H3:{Agricole:17400,Forestier:24100} }
                                                                                                                                                      };
                                                                                                                                                      return table[v.systeme][v.zone][v.produit] * v.P;
                                                                                                                                                      }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-EQ-111'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: 'Simple ecran thermique', dureeVie: 8,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'type', label:'Type de serre', type:'select', options:['Maraichere','Horticole']},
                                                                                                                                                      {key:'S', label:'Surface de serre equipee (m2)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){ return (v.type==='Maraichere'?360:240) * v.S; }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-EQ-112'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: 'Double paroi gonflable sur serres maraicheres ou horticoles', dureeVie: 5,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'type', label:'Type de serre', type:'select', options:['Maraichere','Horticole']},
                                                                                                                                                      {key:'S', label:'Surface de serre equipee (m2)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){ return (v.type==='Maraichere'?410:290) * v.S; }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-SE-101'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: "Controle et preconisations de reglage du moteur d'un tracteur", dureeVie: 2,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'puissance', label:'Puissance du moteur du tracteur (chevaux)', type:'number'},
                                                                                                                                                      {key:'N', label:'Nombre de tracteurs controles', type:'number', default:1}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){
                                                                                                                                                      var unit = v.puissance <= 78 ? 8000 : (v.puissance <= 133 ? 16800 : 22400);
                                                                                                                                                      return unit * v.N;
                                                                                                                                                      }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-TH-101'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: "Dispositif de stockage d'eau chaude de type Open Buffer", dureeVie: 15,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'S', label:'Surface de serre chauffee par le dispositif (m2)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){ return 96 * v.S; }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-TH-102'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: "Dispositif de stockage d'eau chaude (serres horticoles)", dureeVie: 15,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'S', label:'Surface de serre chauffee par le dispositif (m2)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){ return 130 * v.S; }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-TH-103'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: 'Pre-refroidisseur de lait', dureeVie: 14,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'P', label:'Production laitiere annuelle (litres/an)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){ return 0.113 * v.P; }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-TH-104'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: 'Recuperation de chaleur sur un groupe de production de froid hors tank a lait (etude de dimensionnement requise)', dureeVie: 14,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'D', label:'Duree annuelle utilisation chaleur recuperee (heures, issue etude)', type:'number'},
                                                                                                                                                      {key:'Precup', label:'Puissance thermique recuperee (kW, issue etude)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){ return v.D * 9.9 * v.Precup; }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-TH-105'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: 'Recuperateur de chaleur sur tank a lait', dureeVie: 14,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'P', label:'Production laitiere annuelle (litres/an)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){ return 0.138 * v.P; }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-TH-108'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: 'Pompe a chaleur air/eau ou eau/eau pour serres', dureeVie: 17,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'type', label:'Type de serre', type:'select', options:['Maraichere','Horticole']},
                                                                                                                                                      {key:'regime', label:'Regime de la PAC', type:'select', options:['<=400kW, 111%<=etaS<126%','<=400kW, etaS>=126%','>400kW, 3.4<=COP<4','>400kW, COP>=4']},
                                                                                                                                                      {key:'S', label:'Surface de serre chauffee (m2)', type:'number'},
                                                                                                                                                      {key:'P', label:'Puissance thermique nominale de la PAC (kW)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){
                                                                                                                                                      var table = {
                                                                                                                                                      '<=400kW, 111%<=etaS<126%': {Maraichere:800, Horticole:380},
                                                                                                                                                      '<=400kW, etaS>=126%': {Maraichere:970, Horticole:460},
                                                                                                                                                      '>400kW, 3.4<=COP<4': {Maraichere:780, Horticole:370},
                                                                                                                                                      '>400kW, COP>=4': {Maraichere:1040, Horticole:490}
                                                                                                                                                      };
                                                                                                                                                      var facteur = v.type==='Maraichere' ? 15 : 31;
                                                                                                                                                      var Smin = Math.min(v.S, facteur * v.P);
                                                                                                                                                      return table[v.regime][v.type] * Smin;
                                                                                                                                                      }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-TH-109'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: 'Recuperateur de chaleur a condensation pour serres', dureeVie: 11,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'type', label:'Type de serre', type:'select', options:['Horticole','Maraichere']},
                                                                                                                                                      {key:'S', label:'Surface de serre chauffee (m2)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){ return (v.type==='Horticole'?86:9) * v.S; }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-TH-110'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: 'Chaudiere a haute performance energetique pour serres (plus de 400 kW)', dureeVie: 22,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'type', label:'Type de serre', type:'select', options:['Horticole','Maraichere']},
                                                                                                                                                      {key:'S', label:'Surface de serre chauffee (m2)', type:'number'},
                                                                                                                                                      {key:'P', label:'Puissance thermique nominale (kW)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){
                                                                                                                                                      var facteur = v.type==='Horticole' ? 31 : 5.9;
                                                                                                                                                      var Smin = Math.min(v.S, facteur * v.P);
                                                                                                                                                      return (v.type==='Horticole'?150:19) * Smin;
                                                                                                                                                      }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-TH-113'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: "Echangeur-recuperateur de chaleur air/air en batiment d'elevage de volailles", dureeVie: 15,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'S', label:'Surface de batiment equipe (m2)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){ return 250 * v.S; }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-TH-117'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: 'Systeme de deshumidification thermodynamique fixe pour serres chauffees', dureeVie: 17,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'S', label:'Surface de serre equipee (m2)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){ return 710 * v.S; }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-TH-119'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: "Systeme de deshumidification avec air exterieur (serres)", dureeVie: 17,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'S', label:'Surface de serre equipee (m2)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){ return 440 * v.S; }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-UT-101'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: 'Moto-variateur synchrone a aimants permanents ou a reluctance', dureeVie: 20,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'application', label:'Application', type:'select', options:["Pompage d'irrigation","Ventilation de batiments d'elevage","Ventilation en serre","Pompe a vide d'une salle de traite","Chaufferie d'une serre","Autres applications"]},
                                                                                                                                                      {key:'P', label:'Puissance nominale du moto-variateur (kW)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){
                                                                                                                                                      var table = {"Pompage d'irrigation":2100,"Ventilation de batiments d'elevage":18300,"Ventilation en serre":14900,"Pompe a vide d'une salle de traite":2100,"Chaufferie d'une serre":6400,"Autres applications":4500};
                                                                                                                                                      return table[v.application] * v.P;
                                                                                                                                                      }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-UT-102'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: 'Systeme de variation electronique de vitesse sur un moteur asynchrone', dureeVie: 15,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'application', label:'Application', type:'select', options:["Pompe d'irrigation","Ventilateur de batiments d'elevage","Ventilation d'une serre","Pompe a vide d'une salle de traite","Chauffage d'une serre","Autres applications"]},
                                                                                                                                                      {key:'P', label:'Puissance nominale du moteur (kW)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){
                                                                                                                                                      var table = {"Pompe d'irrigation":1600,"Ventilateur de batiments d'elevage":19600,"Ventilation d'une serre":11500,"Pompe a vide d'une salle de traite":2800,"Chauffage d'une serre":7700,"Autres applications":2300};
                                                                                                                                                      return table[v.application] * v.P;
                                                                                                                                                      }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-UT-103'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: 'Regulation basse pression flottante sur groupe de production de froid', dureeVie: 14,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'P', label:'Puissance electrique nominale du groupe (kW)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){ return 830 * v.P; }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      F['AGRI-UT-104'] = {
                                                                                                                                                      secteur: 'Agriculture', nom: 'Regulation haute pression flottante sur groupe de production de froid', dureeVie: 14,
                                                                                                                                                      inputs: [
                                                                                                                                                      {key:'zone', label:'Zone climatique', type:'select', options:['H1 ou H2','H3']},
                                                                                                                                                      {key:'condensation', label:'Type de condensation', type:'select', options:['Par rapport a l atmosphere','A eau seule']},
                                                                                                                                                      {key:'P', label:'Puissance electrique nominale totale du groupe (kW)', type:'number'}
                                                                                                                                                      ],
                                                                                                                                                      calc: function(v){
                                                                                                                                                      var table = { 'H1 ou H2': {'Par rapport a l atmosphere':10600, 'A eau seule':6200}, 'H3': {'Par rapport a l atmosphere':9700, 'A eau seule':5400} };
                                                                                                                                                      return table[v.zone][v.condensation] * v.P;
                                                                                                                                                      }
                                                                                                                                                      };
                                                                                                                                                      
                                                                                                                                                      })();
                                                                                                                                                      
