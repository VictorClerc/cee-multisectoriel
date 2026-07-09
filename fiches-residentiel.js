(function(){
  var F = window.FICHES = window.FICHES || {};

 function fcA(S){ if(S<35)return 0.3; if(S<60)return 0.5; if(S<70)return 0.6; if(S<90)return 0.7; if(S<110)return 1; if(S<=130)return 1.1; return 1.6; }
  function fcB(S){ if(S<35)return 0.5; if(S<60)return 0.7; if(S<70)return 1; if(S<90)return 1.2; if(S<110)return 1.5; if(S<=130)return 1.9; return 2.5; }
  function fcC(S){ if(S<70)return 0.5; if(S<90)return 0.7; if(S<110)return 1; if(S<=130)return 1.1; return 1.6; }
  function fcD(S){ if(S<70)return 0.5; if(S<90)return 0.7; return 1; }

 F['BAR-EN-101'] = {
   secteur: 'Residentiel', nom: 'Isolation de combles ou de toiture', dureeVie: 30,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'S', label:"Surface d'isolant (m2)", type:'number'} ],
   calc: function(v){ var t={H1:1700,H2:1400,H3:920}; return t[v.zone]*v.S; }
 };

 F['BAR-EN-102'] = {
   secteur: 'Residentiel', nom: 'Isolation des murs', dureeVie: 30,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'S', label:"Surface d'isolant (m2)", type:'number'} ],
   calc: function(v){ var t={H1:1600,H2:1300,H3:880}; return t[v.zone]*v.S; }
 };

 F['BAR-EN-103'] = {
   secteur: 'Residentiel', nom: "Isolation d'un plancher", dureeVie: 30,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'S', label:"Surface d'isolant (m2)", type:'number'} ],
   calc: function(v){ var t={H1:1100,H2:890,H3:590}; return t[v.zone]*v.S; }
 };

 F['BAR-EN-104'] = {
   secteur: 'Residentiel', nom: 'Fenetre ou porte-fenetre complete avec vitrage isolant', dureeVie: 30,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'S', label:'Surface de fenetres posees (m2)', type:'number'} ],
   calc: function(v){ var t={H1:3800,H2:3100,H3:2100}; return t[v.zone]*v.S; }
 };

 F['BAR-EN-105'] = {
   secteur: 'Residentiel', nom: 'Isolation des toitures terrasses', dureeVie: 30,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'S', label:"Surface d'isolant (m2)", type:'number'} ],
   calc: function(v){ var t={H1:1200,H2:1000,H3:670}; return t[v.zone]*v.S; }
 };

 F['BAR-EN-106'] = {
   secteur: 'Residentiel', nom: 'Isolation de combles ou toitures (outre-mer)', dureeVie: 30,
   inputs: [ {key:'logement', label:'Type de logement', type:'select', options:['Existant','Neuf']}, {key:'batiment', label:'Type de batiment', type:'select', options:['Maison individuelle','Batiment collectif']}, {key:'S', label:"Surface d'isolant posee (m2)", type:'number'} ],
   calc: function(v){ var t={'Maison individuelle':{Existant:320,Neuf:210},'Batiment collectif':{Existant:380,Neuf:250}}; return t[v.batiment][v.logement]*v.S; }
 };

 F['BAR-EN-107'] = {
   secteur: 'Residentiel', nom: 'Isolation des murs (outre-mer)', dureeVie: 30,
   inputs: [ {key:'logement', label:'Type de logement', type:'select', options:['Existant','Neuf']}, {key:'batiment', label:'Type de batiment', type:'select', options:['Maison individuelle','Batiment collectif']}, {key:'r', label:'Resistance thermique R', type:'select', options:['0.5 <= R < 1.2','R >= 1.2']}, {key:'S', label:"Surface d'isolant posee (m2)", type:'number'} ],
   calc: function(v){
     var t = { 'Maison individuelle': { Existant:{'0.5 <= R < 1.2':200,'R >= 1.2':240}, Neuf:{'0.5 <= R < 1.2':130,'R >= 1.2':150} }, 'Batiment collectif': { Existant:{'0.5 <= R < 1.2':240,'R >= 1.2':280}, Neuf:{'0.5 <= R < 1.2':160,'R >= 1.2':180} } };
     return t[v.batiment][v.logement][v.r]*v.S;
   }
 };

 F['BAR-EN-108'] = {
   secteur: 'Residentiel', nom: 'Fermeture isolante', dureeVie: 30,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'S', label:'Surface de fermeture isolante posee (m2)', type:'number'} ],
   calc: function(v){ var t={H1:510,H2:420,H3:280}; return t[v.zone]*v.S; }
 };

 F['BAR-EN-109'] = {
   secteur: 'Residentiel', nom: 'Reduction des apports solaires par la toiture (outre-mer)', dureeVie: 30,
   inputs: [ {key:'batiment', label:'Type de batiment', type:'select', options:['Maison individuelle','Batiment collectif']}, {key:'S', label:'Surface de toiture protegee (m2)', type:'number'} ],
   calc: function(v){ var t={'Maison individuelle':400,'Batiment collectif':520}; return t[v.batiment]*v.S; }
 };

 F['BAR-EN-110'] = {
   secteur: 'Residentiel', nom: 'Fenetre ou porte-fenetre avec vitrage parietodynamique', dureeVie: 24,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'N', label:'Nombre de fenetres posees', type:'number', default:1} ],
   calc: function(v){ var t={H1:7100,H2:6000,H3:4200}; return t[v.zone]*v.N; }
 };

 F['BAR-EQ-115'] = {
   secteur: 'Residentiel', nom: "Dispositif d'affichage et d'interpretation des consommations d'energie", dureeVie: 4,
   inputs: [ {key:'logement', label:'Type de logement', type:'select', options:['Maison individuelle','Appartement']}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'option', label:'Option suivi du confort', type:'select', options:['Oui','Non']}, {key:'S', label:'Surface habitable (m2)', type:'number'}, {key:'N', label:"Nombre de logements equipes (si beneficiaire = bailleur)", type:'number', default:1} ],
   calc: function(v){
     var zoneVal = v.logement==='Maison individuelle' ? {H1:4400,H2:3700,H3:2700} : {H1:2600,H2:2200,H3:1700};
     var optCoef = v.option==='Oui' ? 1 : 0.8;
     var fc, partFixe;
     if(v.logement==='Maison individuelle'){
       if(v.S<35){fc=0.3; partFixe=650;} else if(v.S<60){fc=0.5; partFixe=0;} else if(v.S<70){fc=0.6; partFixe=0;} else if(v.S<90){fc=0.7; partFixe=0;} else if(v.S<110){fc=1; partFixe=0;} else if(v.S<=130){fc=1.1; partFixe=0;} else {fc=1.6; partFixe=0;}
     } else {
       if(v.S<35){fc=0.5; partFixe=410;} else if(v.S<60){fc=0.7; partFixe=0;} else if(v.S<70){fc=1; partFixe=0;} else if(v.S<90){fc=1.2; partFixe=0;} else if(v.S<110){fc=1.5; partFixe=0;} else if(v.S<=130){fc=1.9; partFixe=0;} else {fc=2.5; partFixe=0;}
     }
     var m = zoneVal[v.zone]*optCoef*fc + partFixe;
     return v.logement==='Appartement' ? m*v.N : m;
   }
 };

 F['BAR-SE-104'] = {
   secteur: 'Residentiel', nom: "Reglage des organes d'equilibrage d'une installation de chauffage a eau chaude", dureeVie: 10,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'N', label:"Nombre d'appartements", type:'number'} ],
   calc: function(v){ var t={H1:9800,H2:8000,H3:5300}; return t[v.zone]*v.N; }
 };

 F['BAR-SE-105'] = {
   secteur: 'Residentiel', nom: 'Contrat de Performance Energetique Services (CPE Services)', dureeVie: 10,
   inputs: [ {key:'duree', label:'Duree de la garantie (annees)', type:'select', options:['2','3','4','5','6','7','8','9','10']}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'N', label:"Nombre d'appartements", type:'number'} ],
   calc: function(v){
     var t = {2:{H1:2400,H2:2000,H3:1500},3:{H1:3500,H2:2900,H3:2200},4:{H1:4600,H2:3800,H3:2800},5:{H1:5600,H2:4700,H3:3400},6:{H1:6600,H2:5500,H3:4100},7:{H1:7600,H2:6300,H3:4700},8:{H1:8500,H2:7100,H3:5200},9:{H1:9400,H2:7800,H3:5800},10:{H1:10200,H2:8500,H3:6300}};
     return t[v.duree][v.zone]*v.N;
   }
 };

 F['BAR-SE-106'] = {
   secteur: 'Residentiel', nom: 'Service de suivi des consommations energie', dureeVie: 1,
   inputs: [ {key:'logement', label:'Type de logement', type:'select', options:['Maison individuelle','Appartement']}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'chauffage', label:'Chauffage suivi', type:'select', options:['Electrique','Gaz','Aucun']}, {key:'elecSpec', label:'Electricite specifique suivie', type:'select', options:['Oui','Non']} ],
   calc: function(v){
     var t = { 'Maison individuelle': { H1:{Electrique:400,Gaz:620,ElecSpec:90}, H2:{Electrique:340,Gaz:510,ElecSpec:90}, H3:{Electrique:250,Gaz:380,ElecSpec:90} }, 'Appartement': { H1:{Electrique:160,Gaz:340,ElecSpec:60}, H2:{Electrique:140,Gaz:290,ElecSpec:60}, H3:{Electrique:110,Gaz:220,ElecSpec:60} } };
     var base = v.chauffage==='Aucun' ? 0 : t[v.logement][v.zone][v.chauffage];
     var spec = v.elecSpec==='Oui' ? t[v.logement][v.zone].ElecSpec : 0;
     return base + spec;
   }
 };

 F['BAR-SE-107'] = {
   secteur: 'Residentiel', nom: 'Abaissement de la temperature de retour vers un reseau de chaleur', dureeVie: 12,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'N', label:'Nombre de logements', type:'number'} ],
   calc: function(v){ var t={H1:13000,H2:10900,H3:8500}; return t[v.zone]*v.N; }
 };

 F['BAR-SE-108'] = {
   secteur: 'Residentiel', nom: "Desembouage d'un reseau hydraulique individuel de chauffage", dureeVie: 12,
   inputs: [ {key:'logement', label:'Type de logement', type:'select', options:['Maison individuelle','Appartement']}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'N', label:'Nombre de logements', type:'number', default:1} ],
   calc: function(v){ var t={'Maison individuelle':{H1:23600,H2:19700,H3:14100},'Appartement':{H1:12200,H2:10200,H3:7300}}; return t[v.logement][v.zone]*v.N; }
 };

 F['BAR-TH-101'] = {
   secteur: 'Residentiel', nom: 'Chauffe-eau solaire individuel', dureeVie: 20,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']} ],
   calc: function(v){ var t={H1:18500,H2:21000,H3:24200}; return t[v.zone]; }
 };

 F['BAR-TH-102'] = {
   secteur: 'Residentiel', nom: 'Chauffe-eau solaire collectif', dureeVie: 22,
   inputs: [ {key:'B', label:'Besoin annuel ECS solaire (kWh/an, etude)', type:'number'}, {key:'T', label:'Taux de couverture solaire T (%, etude)', type:'number'} ],
   calc: function(v){ return v.B*v.T*0.196; }
 };

 F['BAR-TH-110'] = {
   secteur: 'Residentiel', nom: 'Radiateur basse temperature pour un chauffage central', dureeVie: 35,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'logement', label:'Type de logement', type:'select', options:['Maison individuelle','Appartement chauffage individuel','Appartement chauffage collectif']}, {key:'N', label:'Nombre de radiateurs', type:'number'} ],
   calc: function(v){ var t={H1:{'Maison individuelle':1700,'Appartement chauffage individuel':1100,'Appartement chauffage collectif':1000},H2:{'Maison individuelle':1400,'Appartement chauffage individuel':880,'Appartement chauffage collectif':850},H3:{'Maison individuelle':910,'Appartement chauffage individuel':590,'Appartement chauffage collectif':560}}; return t[v.zone][v.logement]*v.N; }
 };

 F['BAR-TH-111'] = {
   secteur: 'Residentiel', nom: 'Regulation par sonde de temperature exterieure', dureeVie: 11,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'energie', label:'Energie de chauffage', type:'select', options:['Electricite','Combustible']}, {key:'S', label:'Surface habitable (m2)', type:'number'} ],
   calc: function(v){ var t={H1:{Electricite:2200,Combustible:3300},H2:{Electricite:1800,Combustible:2700},H3:{Electricite:1200,Combustible:1800}}; return t[v.zone][v.energie]*fcA(v.S); }
 };

 F['BAR-TH-112'] = {
   secteur: 'Residentiel', nom: 'Appareil independant de chauffage au bois', dureeVie: 15,
   inputs: [ {key:'etas', label:'Efficacite energetique saisonniere (Etas)', type:'select', options:['66% <= Etas < 72%','72% <= Etas < 80%','Etas >= 80%']}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']} ],
   calc: function(v){ var t={'66% <= Etas < 72%':{H1:9400,H2:7700,H3:5100},'72% <= Etas < 80%':{H1:23500,H2:19300,H3:12800},'Etas >= 80%':{H1:35300,H2:28900,H3:19200}}; return t[v.etas][v.zone]; }
 };

 F['BAR-TH-113'] = {
   secteur: 'Residentiel', nom: 'Chaudiere biomasse individuelle', dureeVie: 17,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']} ],
   calc: function(v){ var t={H1:41300,H2:33800,H3:26300}; return t[v.zone]; }
 };

 F['BAR-TH-116'] = {
   secteur: 'Residentiel', nom: 'Plancher chauffant hydraulique a basse temperature', dureeVie: 50,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'logement', label:'Type de logement', type:'select', options:['Maison individuelle','Appartement chauffage individuel','Appartement chauffage collectif']}, {key:'S', label:'Surface chauffee (m2)', type:'number'} ],
   calc: function(v){ var t={H1:{'Maison individuelle':300,'Appartement chauffage individuel':210,'Appartement chauffage collectif':280},H2:{'Maison individuelle':250,'Appartement chauffage individuel':170,'Appartement chauffage collectif':230},H3:{'Maison individuelle':160,'Appartement chauffage individuel':110,'Appartement chauffage collectif':150}}; return t[v.zone][v.logement]*v.S; }
 };

 F['BAR-TH-117'] = {
   secteur: 'Residentiel', nom: 'Robinet thermostatique', dureeVie: 20,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'logement', label:'Type de logement', type:'select', options:['Maison individuelle','Appartement chauffage individuel','Appartement chauffage collectif']}, {key:'N', label:'Nombre de robinets installes', type:'number'} ],
   calc: function(v){ var t={H1:{'Maison individuelle':1700,'Appartement chauffage individuel':1200,'Appartement chauffage collectif':1600},H2:{'Maison individuelle':1400,'Appartement chauffage individuel':980,'Appartement chauffage collectif':1300},H3:{'Maison individuelle':930,'Appartement chauffage individuel':650,'Appartement chauffage collectif':890}}; return t[v.zone][v.logement]*v.N; }
 };

 F['BAR-TH-122'] = {
   secteur: 'Residentiel', nom: 'Recuperateur de chaleur a condensation (collectif)', dureeVie: 11,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'N', label:"Nombre d'appartements", type:'number'}, {key:'R', label:'Facteur R', type:'number', default:1} ],
   calc: function(v){ var t={H1:16300,H2:14000,H3:10200}; return t[v.zone]*v.N*v.R; }
 };

 F['BAR-TH-123'] = {
   secteur: 'Residentiel', nom: 'Optimiseur de relance en chauffage collectif', dureeVie: 15,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'N', label:"Nombre d'appartements", type:'number'} ],
   calc: function(v){ var t={H1:6400,H2:5200,H3:3500}; return t[v.zone]*v.N; }
 };

 F['BAR-TH-124'] = {
   secteur: 'Residentiel', nom: 'Chauffe-eau solaire individuel (outre-mer)', dureeVie: 20,
   inputs: [ {key:'geo', label:'Zone geographique', type:'select', options:['Guadeloupe/Martinique/Mayotte','Reunion','Guyane']}, {key:'logement', label:'Type de logement', type:'select', options:['Existant','Neuf']}, {key:'S', label:'Superficie de capteurs solaires (m2)', type:'number'} ],
   calc: function(v){ var t={'Guadeloupe/Martinique/Mayotte':{Existant:5300,Neuf:2600},'Reunion':{Existant:4300,Neuf:2100},'Guyane':{Existant:5400,Neuf:3000}}; return t[v.geo][v.logement]*v.S; }
 };

 F['BAR-TH-125'] = {
   secteur: 'Residentiel', nom: 'Ventilation double flux a haute performance', dureeVie: 17,
   inputs: [ {key:'type', label:"Type d'installation", type:'select', options:['Collective - autoreglable','Individuelle - autoreglable','Individuelle - modulee']}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'N', label:'Nombre de logements (si collective)', type:'number', default:1}, {key:'S', label:'Surface habitable m2 (si individuelle)', type:'number'} ],
   calc: function(v){
     if(v.type==='Collective - autoreglable'){ var t={H1:23000,H2:18800,H3:12500}; return t[v.zone]*v.N; }
     if(v.type==='Individuelle - autoreglable'){ var t={H1:39700,H2:32500,H3:21600}; return t[v.zone]*fcA(v.S); }
     var t2={H1:42000,H2:34400,H3:22900}; return t2[v.zone]*fcA(v.S);
   }
 };

 F['BAR-TH-127'] = {
   secteur: 'Residentiel', nom: 'Ventilation mecanique simple flux hygroreglable', dureeVie: 17,
   inputs: [ {key:'type', label:"Type d'installation", type:'select', options:['Collective','Individuelle']}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'N', label:'Nombre de logements (si collective)', type:'number', default:1}, {key:'S', label:'Surface habitable m2 (si individuelle)', type:'number'}, {key:'R', label:'Facteur correctif R', type:'number', default:1} ],
   calc: function(v){ if(v.type==='Collective'){ var t={H1:21800,H2:17800,H3:11900}; return t[v.zone]*v.N*v.R; } var t2={H1:31600,H2:25900,H3:17200}; return t2[v.zone]*fcA(v.S)*v.R; }
 };

 F['BAR-TH-129'] = {
   secteur: 'Residentiel', nom: 'Pompe a chaleur de type air/air', dureeVie: 17,
   inputs: [ {key:'logement', label:'Type de logement', type:'select', options:['Appartement','Maison individuelle']}, {key:'scop', label:'SCOP', type:'select', options:['3.9 <= SCOP < 4.3 (maison)','SCOP >= 4.3 (maison)','SCOP >= 3.9 (appartement)']}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'S', label:'Surface chauffee (m2)', type:'number'} ],
   calc: function(v){
     if(v.logement==='Appartement'){ var t={H1:21300,H2:17400,H3:11600}; return t[v.zone]*fcB(v.S); }
     var t2 = v.scop==='3.9 <= SCOP < 4.3 (maison)' ? {H1:77900,H2:63700,H3:42500} : {H1:80200,H2:65600,H3:43700};
     return t2[v.zone]*fcA(v.S);
   }
 };

 F['BAR-TH-130'] = {
   secteur: 'Residentiel', nom: 'Surperformance energetique pour un batiment neuf (etude RE2020 requise)', dureeVie: 30,
   inputs: [ {key:'Cefmax', label:'Cef max (etude RE2020)', type:'number'}, {key:'Cef', label:'Cef du batiment (etude RE2020)', type:'number'}, {key:'Sref', label:'Surface de reference RE2020 (m2)', type:'number'} ],
   calc: function(v){ return (v.Cefmax - v.Cef) * v.Sref * 17.984; }
 };

 F['BAR-TH-135'] = {
   secteur: 'Residentiel', nom: 'Chauffe-eau solaire collectif (outre-mer)', dureeVie: 20,
   inputs: [ {key:'logement', label:'Type de logement', type:'select', options:['Existant','Neuf']}, {key:'appoint', label:"Type d'appoint", type:'select', options:['Individualise','Centralise']}, {key:'geo', label:'Zone geographique (si neuf)', type:'select', options:['Guyane','Autre DOM']}, {key:'B', label:'Besoin annuel ECS solaire B (etude)', type:'number'}, {key:'T', label:'Taux de couverture T en % (etude)', type:'number'} ],
   calc: function(v){
     var f = v.appoint==='Individualise' ? 0.148 : 0.086;
     if(v.logement==='Existant') return f*v.B*v.T;
     var offset = v.geo==='Guyane' ? 44 : 50;
     return f*v.B*(v.T-offset);
   }
 };

 F['BAR-TH-137'] = {
   secteur: 'Residentiel', nom: "Raccordement d'un batiment residentiel a un reseau de chaleur", dureeVie: 30,
   inputs: [ {key:'type', label:"Type d'installation", type:'select', options:['Logement collectif','Maison individuelle']}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'N', label:"Nombre d'appartements raccordes (si collectif)", type:'number', default:1}, {key:'S', label:'Surface habitable m2 (si maison)', type:'number'} ],
   calc: function(v){ if(v.type==='Logement collectif'){ var t={H1:47700,H2:39500,H3:30800}; return t[v.zone]*v.N; } var t2={H1:48300,H2:40200,H3:29600}; return t2[v.zone]*fcD(v.S); }
 };

 F['BAR-TH-139'] = {
   secteur: 'Residentiel', nom: 'Systeme de variation electronique de vitesse sur une pompe', dureeVie: 15,
   inputs: [ {key:'P', label:'Puissance nominale du moteur (kW)', type:'number'} ],
   calc: function(v){ return 14600*v.P; }
 };

 F['BAR-TH-141'] = {
   secteur: 'Residentiel', nom: 'Climatiseur performant (outre-mer)', dureeVie: 9,
   inputs: [ {key:'puissance', label:'Puissance frigorifique', type:'select', options:['2.05 kW (7000 BTU/h)','2.64 kW (9000 BTU/h)']}, {key:'classe', label:"Classe d'efficacite (SEER)", type:'select', options:['A (5.1<=SEER<5.6)','A+ (5.6<=SEER<6.1)','A++ (6.1<=SEER<8.5)','A+++ (SEER>=8.5)']}, {key:'N', label:'Nombre de climatiseurs', type:'number', default:1} ],
   calc: function(v){ var t={'2.05 kW (7000 BTU/h)':{'A (5.1<=SEER<5.6)':1300,'A+ (5.6<=SEER<6.1)':2500,'A++ (6.1<=SEER<8.5)':3400,'A+++ (SEER>=8.5)':6300},'2.64 kW (9000 BTU/h)':{'A (5.1<=SEER<5.6)':1600,'A+ (5.6<=SEER<6.1)':2900,'A++ (6.1<=SEER<8.5)':4000,'A+++ (SEER>=8.5)':7400}}; return t[v.puissance][v.classe]*v.N; }
 };

 F['BAR-TH-143'] = {
   secteur: 'Residentiel', nom: 'Systeme solaire combine', dureeVie: 20,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']} ],
   calc: function(v){ var t={H1:134800,H2:121000,H3:100500}; return t[v.zone]; }
 };

 F['BAR-TH-148'] = {
   secteur: 'Residentiel', nom: 'Chauffe-eau thermodynamique a accumulation', dureeVie: 17,
   inputs: [ {key:'logement', label:'Type de logement', type:'select', options:['Maison individuelle','Appartement']} ],
   calc: function(v){ var t={'Maison individuelle':14700,'Appartement':11800}; return t[v.logement]; }
 };

 F['BAR-TH-155'] = {
   secteur: 'Residentiel', nom: 'Ventilation hybride hygroreglable', dureeVie: 17,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'N', label:"Nombre d'appartements", type:'number'}, {key:'type', label:'Type de ventilation hybride', type:'select', options:['Type A','Type B']}, {key:'extracteur', label:'Extracteur', type:'select', options:['Basse consommation','Standard']} ],
   calc: function(v){
     var base={H1:17700,H2:14500,H3:9700};
     var r = { 'Type A': {'Basse consommation':0.98,'Standard':0.93}, 'Type B': {'Basse consommation':1,'Standard':0.95} };
     return base[v.zone]*v.N*r[v.type][v.extracteur];
   }
 };

 F['BAR-TH-158'] = {
   secteur: 'Residentiel', nom: 'Emetteur electrique a regulation electronique a fonctions avancees', dureeVie: 16,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'logement', label:'Type de logement', type:'select', options:['Maison individuelle','Appartement']}, {key:'N', label:"Nombre d'emetteurs installes", type:'number'} ],
   calc: function(v){ var t={H1:{'Maison individuelle':1800,'Appartement':1500},H2:{'Maison individuelle':1500,'Appartement':1200},H3:{'Maison individuelle':1100,'Appartement':900}}; return t[v.zone][v.logement]*v.N; }
 };

 F['BAR-TH-159'] = {
   secteur: 'Residentiel', nom: 'Pompe a chaleur hybride individuelle', dureeVie: 17,
   inputs: [ {key:'logement', label:'Type de logement', type:'select', options:['Appartement','Maison individuelle']}, {key:'etas', label:'Efficacite energetique saisonniere (Etas)', type:'select', options:['111-120%','120-130%','130-140%','140-150%','150-160%','>=160%']}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'S', label:'Surface chauffee (m2)', type:'number'} ],
   calc: function(v){
     var appt = {'111-120%':{H1:39600,H2:33900,H3:25600},'120-130%':{H1:48200,H2:41300,H3:31200},'130-140%':{H1:55900,H2:47900,H3:36200},'140-150%':{H1:62600,H2:53600,H3:40500},'150-160%':{H1:68400,H2:58600,H3:44200},'>=160%':{H1:73400,H2:62900,H3:47500}};
     var maison = {'111-120%':{H1:74100,H2:62800,H3:45600},'120-130%':{H1:90300,H2:76500,H3:55400},'130-140%':{H1:104800,H2:88800,H3:64400},'140-150%':{H1:117200,H2:99400,H3:72000},'150-160%':{H1:128000,H2:108500,H3:78700},'>=160%':{H1:137500,H2:116600,H3:84500}};
     if(v.logement==='Appartement') return appt[v.etas][v.zone]*fcB(v.S);
     return maison[v.etas][v.zone]*fcC(v.S);
   }
 };

 F['BAR-TH-161'] = {
   secteur: 'Residentiel', nom: "Isolation de points singuliers d'un reseau", dureeVie: 10,
   inputs: [ {key:'dn', label:'Diametre nominal DN (mm)', type:'select', options:['20-65','65-100','>100']}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'tfluide', label:'Temperature du fluide', type:'select', options:['50-120°C','>120°C']}, {key:'N', label:'Nombre de housses isolantes', type:'number'} ],
   calc: function(v){
     var t = { '20-65': {H1:{'50-120°C':11700,'>120°C':12900},H2:{'50-120°C':10500,'>120°C':11600},H3:{'50-120°C':8800,'>120°C':9700}}, '65-100': {H1:{'50-120°C':25100,'>120°C':27800},H2:{'50-120°C':22700,'>120°C':25100},H3:{'50-120°C':18900,'>120°C':20900}}, '>100': {H1:{'50-120°C':40900,'>120°C':45400},H2:{'50-120°C':37000,'>120°C':41000},H3:{'50-120°C':30800,'>120°C':34100}} };
     return t[v.dn][v.zone][v.tfluide]*v.N;
   }
 };

 F['BAR-TH-162'] = {
   secteur: 'Residentiel', nom: 'Systeme energetique capteurs solaires photovoltaiques et thermiques', dureeVie: 20,
   inputs: [ ],
   calc: function(v){ return 20900; }
 };

 F['BAR-TH-165'] = {
   secteur: 'Residentiel', nom: 'Chaudiere biomasse collective', dureeVie: 22,
   inputs: [ {key:'puissance', label:'Puissance de la chaudiere', type:'select', options:['<= 500 kW','> 500 kW']}, {key:'Q', label:'Chaleur nette utile produite Q (kWh/an, etude)', type:'number'} ],
   calc: function(v){ return v.puissance==='<= 500 kW' ? v.Q*4.8 : v.Q*3.4; }
 };

 F['BAR-TH-168'] = {
   secteur: 'Residentiel', nom: 'Dispositif solaire thermique', dureeVie: 25,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'usage', label:'Usage', type:'select', options:['ECS seule','ECS et Chauffage']}, {key:'S', label:'Surface de capteurs (m2)', type:'number'} ],
   calc: function(v){ var t={H1:{'ECS seule':6000,'ECS et Chauffage':14000},H2:{'ECS seule':7200,'ECS et Chauffage':12700},H3:{'ECS seule':9600,'ECS et Chauffage':10300}}; return t[v.zone][v.usage]*v.S; }
 };

 F['BAR-TH-169'] = {
   secteur: 'Residentiel', nom: "Pompe a chaleur collective air/eau ou eau/eau pour l'ECS", dureeVie: 22,
   inputs: [ {key:'cop', label:'COP de la PAC', type:'select', options:['2.8-3.2','3.2-3.6','3.6-4','4-4.4','4.4-4.8','>=4.8']}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'N', label:"Nombre d'appartements", type:'number'}, {key:'R', label:'Facteur R', type:'number', default:1} ],
   calc: function(v){
     var t = {'2.8-3.2':{H1:49200,H2:46800,H3:44000},'3.2-3.6':{H1:51000,H2:48500,H3:45500},'3.6-4':{H1:52400,H2:49800,H3:46800},'4-4.4':{H1:53500,H2:50900,H3:47800},'4.4-4.8':{H1:54400,H2:51800,H3:48600},'>=4.8':{H1:55000,H2:52300,H3:49200}};
     return t[v.cop][v.zone]*v.N*v.R;
   }
 };

 F['BAR-TH-170'] = {
   secteur: 'Residentiel', nom: 'Recuperation de chaleur fatale de serveurs informatiques pour ECS collective', dureeVie: 14,
   inputs: [ {key:'Pelec', label:'Puissance electrique installee des serveurs (kW)', type:'number'} ],
   calc: function(v){ return 82300*v.Pelec; }
 };

 F['BAR-TH-171'] = {
   secteur: 'Residentiel', nom: 'Pompe a chaleur de type air/eau', dureeVie: 17,
   inputs: [ {key:'logement', label:'Type de logement', type:'select', options:['Appartement','Maison individuelle']}, {key:'etas', label:'Efficacite energetique saisonniere (Etas)', type:'select', options:['111-140%','>=140%']}, {key:'S', label:'Surface chauffee (m2)', type:'number'}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']} ],
   calc: function(v){
     var base = v.logement==='Appartement' ? (v.etas==='111-140%'?48700:58900) : (v.etas==='111-140%'?90900:109200);
     var fs = v.logement==='Appartement' ? (v.S<35?0.5:(v.S<60?0.7:1)) : fcD(v.S);
     var fz = {H1:1.2,H2:1,H3:0.7}[v.zone];
     return base*fs*fz;
   }
 };

 F['BAR-TH-172'] = {
   secteur: 'Residentiel', nom: 'Pompe a chaleur de type eau/eau ou eau glycolee/eau', dureeVie: 20,
   inputs: [ {key:'etas', label:'Efficacite energetique saisonniere (Etas)', type:'select', options:['111-170%','>=170%']}, {key:'S', label:'Surface chauffee (m2)', type:'number'}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']} ],
   calc: function(v){
     var base = v.etas==='111-170%' ? 101400 : 119400;
     var fs = fcD(v.S);
     var fz = {H1:1.2,H2:1,H3:0.7}[v.zone];
     return base*fs*fz;
   }
 };

 F['BAR-TH-173'] = {
   secteur: 'Residentiel', nom: 'Regulation par programmation horaire piece par piece', dureeVie: 15,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'logement', label:'Type de logement', type:'select', options:['Maison','Appartement']}, {key:'N', label:"Nombre d'emetteurs equipes (2 a 9)", type:'number', default:2} ],
   calc: function(v){ var t={H1:{Maison:3200,Appartement:2500},H2:{Maison:2600,Appartement:2100},H3:{Maison:1900,Appartement:1500}}; return t[v.zone][v.logement]*v.N; }
 };

 F['BAR-TH-174'] = {
   secteur: 'Residentiel', nom: "Renovation d'ampleur d'une maison individuelle", dureeVie: 30,
   inputs: [ {key:'sauts', label:'Nombre de sauts de classe DPE', type:'select', options:['2','3','4 ou plus']}, {key:'S', label:'Surface habitable (m2)', type:'number'} ],
   calc: function(v){
     var t = {'2':360200,'3':447900,'4 ou plus':568600};
     var fc; if(v.S<35)fc=0.4; else if(v.S<60)fc=0.5; else if(v.S<90)fc=0.8; else if(v.S<110)fc=1; else if(v.S<=130)fc=1.2; else fc=1.3;
     return t[v.sauts]*fc;
   }
 };

 F['BAR-TH-175'] = {
   secteur: 'Residentiel', nom: "Renovation d'ampleur d'un appartement", dureeVie: 30,
   inputs: [ {key:'sauts', label:'Nombre de sauts de classe DPE', type:'select', options:['2','3','4 ou plus']}, {key:'S', label:'Surface habitable (m2)', type:'number'} ],
   calc: function(v){
     var t = {'2':360200,'3':447900,'4 ou plus':568600};
     var fc; if(v.S<35)fc=0.4; else if(v.S<60)fc=0.5; else if(v.S<90)fc=0.8; else if(v.S<110)fc=1; else if(v.S<=130)fc=1.2; else fc=1.3;
     return t[v.sauts]*fc;
   }
 };

 F['BAR-TH-176'] = {
   secteur: 'Residentiel', nom: "Regulation de la consommation d'un chauffe-eau electrique a effet Joule", dureeVie: 15,
   inputs: [ {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'logement', label:'Type de logement', type:'select', options:['Maison','Appartement']}, {key:'V', label:'Volume du ballon (litres)', type:'select', options:['10-150 L','>150 L']} ],
   calc: function(v){ var t={H1:{Maison:9000,Appartement:7100},H2:{Maison:8600,Appartement:7100},H3:{Maison:8000,Appartement:6500}}; var fc = v.V==='10-150 L'?0.96:1.04; return t[v.zone][v.logement]*fc; }
 };

 F['BAR-TH-177'] = {
   secteur: 'Residentiel', nom: "Renovation globale d'un batiment residentiel collectif", dureeVie: 30,
   inputs: [ {key:'S', label:'Surface habitable apres renovation (m2)', type:'number'} ],
   calc: function(v){ return 2100*v.S; }
 };

 F['BAR-TH-178'] = {
   secteur: 'Residentiel', nom: 'Systeme geothermique (collectif)', dureeVie: 25,
   inputs: [
     {key:'puissance', label:'Puissance thermique de la PAC', type:'select', options:['<= 400 kW','> 400 kW']},
     {key:'niveau', label:"Efficacite (Etas si <=400kW, COP si >400kW)", type:'select', options:['Niveau 1','Niveau 2','Niveau 3','Niveau 4','Niveau 5']},
     {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']},
     {key:'usage', label:'Usage', type:'select', options:['Chauffage','Chauffage et ECS']},
     {key:'N', label:"Nombre d'appartements chauffes", type:'number'}, {key:'R', label:'Facteur R', type:'number', default:1}
     ],
   calc: function(v){
     var basse = { 'Niveau 1':{H1:{Chauffage:108700,'Chauffage et ECS':157900},H2:{Chauffage:90600,'Chauffage et ECS':137400},H3:{Chauffage:64700,'Chauffage et ECS':108600}},
                  'Niveau 2':{H1:{Chauffage:115000,'Chauffage et ECS':167100},H2:{Chauffage:95900,'Chauffage et ECS':145300},H3:{Chauffage:68500,'Chauffage et ECS':115000}},
                  'Niveau 3':{H1:{Chauffage:120300,'Chauffage et ECS':174800},H2:{Chauffage:100300,'Chauffage et ECS':152000},H3:{Chauffage:71600,'Chauffage et ECS':120200}},
                  'Niveau 4':{H1:{Chauffage:123900,'Chauffage et ECS':180000},H2:{Chauffage:103300,'Chauffage et ECS':156600},H3:{Chauffage:73800,'Chauffage et ECS':123900}},
                  'Niveau 5':{H1:{Chauffage:126200,'Chauffage et ECS':183200},H2:{Chauffage:105100,'Chauffage et ECS':159400},H3:{Chauffage:75100,'Chauffage et ECS':126100}} };
     var haute = { 'Niveau 1':{H1:{Chauffage:118500,'Chauffage et ECS':172200},H2:{Chauffage:98800,'Chauffage et ECS':149800},H3:{Chauffage:70600,'Chauffage et ECS':118500}},
                  'Niveau 2':{H1:{Chauffage:122300,'Chauffage et ECS':177700},H2:{Chauffage:101900,'Chauffage et ECS':154600},H3:{Chauffage:72800,'Chauffage et ECS':122200}},
                  'Niveau 3':{H1:{Chauffage:125400,'Chauffage et ECS':182100},H2:{Chauffage:104500,'Chauffage et ECS':158400},H3:{Chauffage:74600,'Chauffage et ECS':125300}},
                  'Niveau 4':{H1:{Chauffage:127800,'Chauffage et ECS':185700},H2:{Chauffage:106500,'Chauffage et ECS':161500},H3:{Chauffage:76100,'Chauffage et ECS':127800}},
                  'Niveau 5':{H1:{Chauffage:127800,'Chauffage et ECS':185700},H2:{Chauffage:106500,'Chauffage et ECS':161500},H3:{Chauffage:76100,'Chauffage et ECS':127800}} };
     var table = v.puissance==='<= 400 kW' ? basse : haute;
     return table[v.niveau][v.zone][v.usage]*v.N*v.R;
   }
 };

 F['BAR-TH-179'] = {
   secteur: 'Residentiel', nom: 'Pompe a chaleur collective de type air/eau', dureeVie: 22,
   inputs: [ {key:'etas', label:'Efficacite energetique saisonniere (Etas)', type:'select', options:['111-126%','126-150%','150-175%','175-190%','>=190%']}, {key:'usage', label:'Usage', type:'select', options:['Chauffage','Chauffage et ECS']}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'N', label:"Nombre d'appartements", type:'number'}, {key:'R', label:'Facteur correctif R', type:'number', default:1} ],
   calc: function(v){
     var t = { '111-126%':{Chauffage:{H1:100000,H2:84000,H3:60000},'Chauffage et ECS':{H1:146000,H2:127000,H3:100000}},
              '126-150%':{Chauffage:{H1:107000,H2:89000,H3:64000},'Chauffage et ECS':{H1:155000,H2:135000,H3:107000}},
              '150-175%':{Chauffage:{H1:112000,H2:93000,H3:67000},'Chauffage et ECS':{H1:163000,H2:142000,H3:112000}},
              '175-190%':{Chauffage:{H1:115000,H2:96000,H3:69000},'Chauffage et ECS':{H1:167000,H2:146000,H3:115000}},
              '>=190%':{Chauffage:{H1:117000,H2:97000,H3:70000},'Chauffage et ECS':{H1:170000,H2:148000,H3:117000}} };
     return t[v.etas][v.usage][v.zone]*v.N*v.R;
   }
 };

 F['BAR-TH-180'] = {
   secteur: 'Residentiel', nom: 'Pompe a chaleur collective de type eau/eau ou eau glycolee/eau', dureeVie: 22,
   inputs: [ {key:'etas', label:'Efficacite energetique saisonniere (Etas)', type:'select', options:['111-126%','126-150%','150-175%','175-190%','>=190%']}, {key:'usage', label:'Usage', type:'select', options:['Chauffage','Chauffage et ECS']}, {key:'zone', label:'Zone climatique', type:'select', options:['H1','H2','H3']}, {key:'N', label:"Nombre d'appartements", type:'number'}, {key:'R', label:'Facteur correctif R', type:'number', default:1} ],
   calc: function(v){
     var t = { '111-126%':{Chauffage:{H1:100000,H2:84000,H3:60000},'Chauffage et ECS':{H1:146000,H2:127000,H3:100000}},
              '126-150%':{Chauffage:{H1:107000,H2:89000,H3:64000},'Chauffage et ECS':{H1:155000,H2:135000,H3:107000}},
              '150-175%':{Chauffage:{H1:112000,H2:93000,H3:67000},'Chauffage et ECS':{H1:163000,H2:142000,H3:112000}},
              '175-190%':{Chauffage:{H1:115000,H2:96000,H3:69000},'Chauffage et ECS':{H1:167000,H2:146000,H3:115000}},
              '>=190%':{Chauffage:{H1:117000,H2:97000,H3:70000},'Chauffage et ECS':{H1:170000,H2:148000,H3:117000}} };
     return t[v.etas][v.usage][v.zone]*v.N*v.R;
   }
 };

})();
