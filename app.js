var dossier = [];
var ficheCourante = null;

function ficheLabel(code){
    var f = FICHES[code];
    return code + ' - ' + f.nom;
}

function listerFichesSecteur(sec){
    var cont = document.getElementById('recommandations');
    cont.innerHTML = '';
    if(!sec) return;
    Object.keys(FICHES).filter(function(c){return FICHES[c].secteur === sec;}).sort().forEach(function(code){
          var b = document.createElement('button');
          b.textContent = ficheLabel(code);
          b.onclick = function(){ ouvrirFiche(code); };
          cont.appendChild(b);
    });
}

document.getElementById('secteur').addEventListener('change', function(){
    listerFichesSecteur(this.value);
});

document.getElementById('recherche').addEventListener('input', function(){
    var q = this.value.trim().toLowerCase();
    var cont = document.getElementById('resultatsRecherche');
    cont.innerHTML = '';
    if(q.length < 2) return;
    Object.keys(FICHES).filter(function(c){
          return c.toLowerCase().indexOf(q) !== -1 || FICHES[c].nom.toLowerCase().indexOf(q) !== -1;
    }).slice(0,25).forEach(function(code){
          var b = document.createElement('button');
          b.textContent = ficheLabel(code);
          b.onclick = function(){ ouvrirFiche(code); };
          cont.appendChild(b);
    });
});
function ouvrirFiche(code){
    ficheCourante = code;
    var f = FICHES[code];
    document.getElementById('ficheDetailCard').style.display = 'block';
    document.getElementById('ficheTitre').textContent = code + ' - ' + f.nom;
    document.getElementById('ficheMeta').textContent = 'Secteur : ' + f.secteur + '  |  Duree de vie conventionnelle : ' + f.dureeVie + ' ans';
    var inputsDiv = document.getElementById('ficheInputs');
    inputsDiv.innerHTML = '';
    (f.inputs || []).forEach(function(inp){
          var wrap = document.createElement('div');
          var lab = document.createElement('label');
          lab.textContent = inp.label;
          wrap.appendChild(lab);
          var el;
          if(inp.type === 'select'){
                  el = document.createElement('select');
                  (inp.options || []).forEach(function(o){
                            var op = document.createElement('option');
                            op.value = o;
                            op.textContent = o;
                            el.appendChild(op);
                  });
          } else {
                  el = document.createElement('input');
                  el.type = 'number';
                  el.step = 'any';
                  if(inp.default !== undefined){ el.value = inp.default; }
          }
          el.id = 'inp_' + inp.key;
          el.addEventListener('input', calculerFicheCourante);
          el.addEventListener('change', calculerFicheCourante);
          wrap.appendChild(el);
          inputsDiv.appendChild(wrap);
    });
    calculerFicheCourante();
    document.getElementById('ficheDetailCard').scrollIntoView({behavior:'smooth'});
}

function lireValeursFiche(){
    var f = FICHES[ficheCourante];
    var values = {};
    (f.inputs || []).forEach(function(inp){
          var el = document.getElementById('inp_' + inp.key);
          if(!el) return;
          if(inp.type === 'select'){
                  values[inp.key] = el.value;
          } else {
                  values[inp.key] = parseFloat(el.value) || 0;
          }
    });
    return values;
}

function calculerFicheCourante(){
    if(!ficheCourante) return 0;
    var f = FICHES[ficheCourante];
    var values = lireValeursFiche();
    var resultat = 0;
    try {
          resultat = f.calc(values);
    } catch(e){
          resultat = 0;
    }
    if(!isFinite(resultat) || isNaN(resultat)){ resultat = 0; }
    resultat = Math.round(resultat);
    document.getElementById('ficheResultat').textContent = 'Montant estime : ' + resultat.toLocaleString('fr-FR') + ' kWh cumac';
    return resultat;
}

document.getElementById('btnAjouter').addEventListener('click', function(){
    if(!ficheCourante) return;
    var f = FICHES[ficheCourante];
    var values = lireValeursFiche();
    var kwh = calculerFicheCourante();
    dossier.push({code: ficheCourante, nom: f.nom, secteur: f.secteur, dureeVie: f.dureeVie, values: values, kwh: kwh});
    rafraichirDossier();
});

function retirerDuDossier(idx){
    dossier.splice(idx, 1);
    rafraichirDossier();
}

function rafraichirDossier(){
    var body = document.getElementById('dossierBody');
    body.innerHTML = '';
    var total = 0;
    dossier.forEach(function(item, idx){
          total += item.kwh;
          var tr = document.createElement('tr');
          var tdCode = document.createElement('td'); tdCode.textContent = item.code;
          var tdNom = document.createElement('td'); tdNom.textContent = item.nom;
          var tdSecteur = document.createElement('td'); tdSecteur.textContent = item.secteur;
          var tdKwh = document.createElement('td'); tdKwh.textContent = Math.round(item.kwh).toLocaleString('fr-FR');
          var tdBtn = document.createElement('td');
          var btn = document.createElement('button');
          btn.textContent = 'Retirer';
          btn.className = 'secondaire';
          btn.onclick = function(){ retirerDuDossier(idx); };
          tdBtn.appendChild(btn);
          tr.appendChild(tdCode); tr.appendChild(tdNom); tr.appendChild(tdSecteur); tr.appendChild(tdKwh); tr.appendChild(tdBtn);
          body.appendChild(tr);
    });
    document.getElementById('nbFiches').textContent = dossier.length + ' fiche' + (dossier.length > 1 ? 's' : '');
    document.getElementById('totalCumac').textContent = 'Total : ' + Math.round(total).toLocaleString('fr-FR') + ' kWh cumac';
}

document.getElementById('btnExporter').addEventListener('click', exporterExcel);

function exporterExcel(){
    if(dossier.length === 0){ alert('Le dossier est vide. Ajoutez au moins une fiche.'); return; }
    var wb = XLSX.utils.book_new();
    var recap = [['Code fiche','Operation','Secteur','Duree de vie (ans)','kWh cumac']];
    var total = 0;
    var nomsUtilises = {};
    dossier.forEach(function(item){
          total += item.kwh;
          recap.push([item.code, item.nom, item.secteur, item.dureeVie, Math.round(item.kwh)]);
          var rows = [];
          rows.push(['PARTIE A - Elements a archiver par le beneficiaire']);
          rows.push([]);
          rows.push(['Fiche', item.code + ' - ' + item.nom]);
          rows.push(['Secteur', item.secteur]);
          rows.push(['Duree de vie conventionnelle (annees)', item.dureeVie]);
          rows.push([]);
          rows.push(['Beneficiaire', document.getElementById('infoNom').value]);
          rows.push(['Adresse du site', document.getElementById('infoAdresse').value]);
          rows.push(['Code postal', document.getElementById('infoCP').value]);
          rows.push(['Ville', document.getElementById('infoVille').value]);
          rows.push(['Date d engagement', document.getElementById('infoDateEngagement').value]);
          rows.push(['Date de preuve de realisation', document.getElementById('infoDatePreuve').value]);
          rows.push(['Reference facture', document.getElementById('infoFacture').value]);
          rows.push([]);
          rows.push(['Parametres de calcul saisis']);
          Object.keys(item.values).forEach(function(k){
                  rows.push([k, item.values[k]]);
          });
          rows.push([]);
          rows.push(['Montant de certificats (kWh cumac)', Math.round(item.kwh)]);
          var ws = XLSX.utils.aoa_to_sheet(rows);
          var base = item.code.replace(/[\\\/\?\*\[\]\:]/g,'-').substring(0,28);
          var nomFeuille = base;
          var n = 1;
          while(nomsUtilises[nomFeuille]){ n++; nomFeuille = base + '-' + n; }
          nomsUtilises[nomFeuille] = true;
          XLSX.utils.book_append_sheet(wb, ws, nomFeuille);
    });
    recap.push(['TOTAL','','','', Math.round(total)]);
    var wsRecap = XLSX.utils.aoa_to_sheet(recap);
    XLSX.utils.book_append_sheet(wb, wsRecap, 'Recapitulatif');
    wb.SheetNames.unshift(wb.SheetNames.pop());
    XLSX.writeFile(wb, 'dossier-CEE.xlsx');
}
