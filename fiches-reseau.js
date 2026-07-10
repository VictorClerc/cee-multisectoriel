// Fiches Reseau
(function(){
    var F = window.FICHES = window.FICHES || {};

 F['RES-CH-103'] = { secteur: 'Reseau', nom: "Réhabilitation d'un poste de livraison de chaleur (secteur tertiaire)", dureeVie: 20,
                      inputs: [
                        {key:'secteurActivite', label:"Secteur d'activité", type:'select', options:['Bureaux','Enseignement','Santé','Commerces','Hôtellerie-Restauration','Autres']},
                        {key:'zone', label:"Zone climatique", type:'select', options:['H1','H2','H3']},
                        {key:'S', label:"Surface chauffée (m²)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {'Bureaux':210,'Enseignement':140,'Santé':200,'Commerces':170,'Hôtellerie-Restauration':260,'Autres':140}[v.secteurActivite];
                            var coef = {H1:1.1,H2:0.9,H3:0.6}[v.zone];
                            return base*coef*v.S;
                      }
                   };

 F['RES-CH-104'] = { secteur: 'Reseau', nom: "Réhabilitation d'un poste de livraison de chaleur (secteur résidentiel)", dureeVie: 20,
                      inputs: [
                        {key:'zone', label:"Zone climatique", type:'select', options:['H1','H2','H3']},
                        {key:'N', label:"Nombre d'appartements", type:'number'}
                          ],
                      calc: function(v){
                            var base = {H1:18300,H2:15200,H3:11200}[v.zone];
                            return base*v.N;
                      }
                   };

 F['RES-CH-105'] = { secteur: 'Reseau', nom: "Passage d'un réseau de chaleur haute pression à basse température", dureeVie: 30,
                      inputs: [
                        {key:'DN', label:"Diamètre nominal DN du réseau avant passage en basse température (mm)", type:'select', options:['32','40','50','65','80','100','125','150','175','200','250','300','350','400','450','500','550','600','700','800','900','1000']},
                        {key:'duree', label:"Durée annuelle d'utilisation du réseau", type:'select', options:['12 mois','11 mois','10 mois','9 mois','8 mois','7 mois','6 mois']},
                        {key:'L', label:"Longueur de la portion de canalisation (m)", type:'number'}
                          ],
                      calc: function(v){
                            var base = {'32':3200,'40':3500,'50':3900,'65':4500,'80':5000,'100':5800,'125':6500,'150':7200,'175':8000,'200':8700,'250':10000,'300':11300,'350':12600,'400':13800,'450':14900,'500':16100,'550':17300,'600':18400,'700':20700,'800':22900,'900':25300,'1000':27800}[v.DN];
                            var coef = {'12 mois':1.00,'11 mois':0.92,'10 mois':0.83,'9 mois':0.75,'8 mois':0.67,'7 mois':0.58,'6 mois':0.50}[v.duree];
                            return base*coef*v.L;
                      }
                   };

 F['RES-CH-106'] = { secteur: 'Reseau', nom: "Calorifugeage des canalisations d'un réseau de chaleur", dureeVie: 30,
                      inputs: [
                        {key:'montantUnitaire', label:"Montant unitaire (kWh cumac/m) - voir tableau selon classe d'isolation, DN et type de fluide dans la fiche officielle RES-CH-106", type:'number'},
                        {key:'duree', label:"Durée annuelle d'utilisation du réseau", type:'select', options:['12 mois','11 mois','10 mois','9 mois','8 mois','7 mois','6 mois']},
                        {key:'L', label:"Longueur de la canalisation calorifugée (m)", type:'number'}
                          ],
                      calc: function(v){
                            var coef = {'12 mois':1.00,'11 mois':0.92,'10 mois':0.83,'9 mois':0.75,'8 mois':0.67,'7 mois':0.58,'6 mois':0.50}[v.duree];
                            return v.montantUnitaire*coef*v.L;
                      }
                   };

 F['RES-CH-108'] = { secteur: 'Reseau', nom: "Récupération de chaleur fatale valorisée vers un réseau de chaleur", dureeVie: 20,
                      inputs: [
                        {key:'Q', label:"Quantité de chaleur nette utilisée ou valorisée Q (kWh/an)", type:'number'}
                          ],
                      calc: function(v){
                            return v.Q*14.134;
                      }
                   };

 F['RES-EC-104'] = { secteur: 'Reseau', nom: "Rénovation d'éclairage extérieur (LED)", dureeVie: 30,
                      inputs: [
                        {key:'type', label:"Type de fonctionnement", type:'select', options:['Gradation seule','Gradation et détection de présence']},
                        {key:'N', label:"Nombre de luminaires remplacés ou rééquipés", type:'number'}
                          ],
                      calc: function(v){
                            var base = v.type==='Gradation et détection de présence' ? 5600 : 4000;
                            return base*v.N;
                      }
                   };

})();
