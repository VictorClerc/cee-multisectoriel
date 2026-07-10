var dossier = [];
var ficheCourante = null;

var SECTEUR_LABELS = {
  'Agriculture': 'Agriculture',
  'Residentiel': 'Résidentiel',
  'Tertiaire': 'Tertiaire',
  'Industrie': 'Industrie',
  'Reseau': 'Réseau',
  'Transport': 'Transport'
};
function secteurLabel(s){ return SECTEUR_LABELS[s] || s; }

/* ---------- Liste des fiches (chips) ---------- */

function fabriquerChip(code, avecSecteur){
  var f = FICHES[code];
  var b = document.createElement('button');
  b.type = 'button';
  b.setAttribute('data-code', code);
  if(avecSecteur){
    var tag = document.createElement('span');
    tag.className = 'tag-secteur';
    tag.textContent = secteurLabel(f.secteur);
    b.appendChild(tag);
  }
  var strong = document.createElement('b');
  strong.textContent = code;
  b.appendChild(strong);
  b.appendChild(document.createTextNode(' — ' + f.nom));
  b.onclick = function(){ ouvrirFiche(code); };
  return b;
}

function majChipActive(){
  var chips = document.querySelectorAll('#listeFiches button[data-code]');
  chips.forEach(function(c){
    c.classList.toggle('chip-active', c.getAttribute('data-code') === ficheCourante);
  });
}

function listerFichesSecteur(sec){
  var cont = document.getElementById('listeFiches');
  var note = document.getElementById('listeNote');
  cont.innerHTML = '';
  if(!sec){
    note.textContent = 'Choisis un secteur ou tape une recherche pour afficher les fiches.';
    return;
  }
  var codes = Object.keys(FICHES).filter(function(c){ return FICHES[c].secteur === sec; }).sort();
  note.textContent = codes.length + ' fiche' + (codes.length > 1 ? 's' : '') + ' — secteur ' + secteurLabel(sec);
  codes.forEach(function(code){ cont.appendChild(fabriquerChip(code, false)); });
  majChipActive();
}

document.getElementById('secteur').addEventListener('change', function(){
  document.getElementById('recherche').value = '';
  listerFichesSecteur(this.value);
});

document.getElementById('recherche').addEventListener('input', function(){
  var q = this.value.trim().toLowerCase();
  var cont = document.getElementById('listeFiches');
  var note = document.getElementById('listeNote');
  if(q.length < 2){
    listerFichesSecteur(document.getElementById('secteur').value);
    return;
  }
  cont.innerHTML = '';
  var codes = Object.keys(FICHES).filter(function(c){
    return c.toLowerCase().indexOf(q) !== -1 || FICHES[c].nom.toLowerCase().indexOf(q) !== -1;
  }).sort().slice(0, 30);
  note.textContent = codes.length === 0
    ? 'Aucune fiche ne correspond à « ' + this.value.trim() + ' ».'
    : codes.length + ' résultat' + (codes.length > 1 ? 's' : '') + ' pour « ' + this.value.trim() + ' » (30 max affichés)';
  codes.forEach(function(code){ cont.appendChild(fabriquerChip(code, true)); });
  majChipActive();
});

/* ---------- Fiche courante ---------- */

function ouvrirFiche(code){
  ficheCourante = code;
  var f = FICHES[code];
  document.getElementById('ficheDetailCard').style.display = 'block';
  var titre = document.getElementById('ficheTitre');
  titre.innerHTML = '';
  var pill = document.createElement('span');
  pill.className = 'code-pill';
  pill.textContent = code;
  titre.appendChild(pill);
  titre.appendChild(document.createTextNode(f.nom));
  document.getElementById('ficheMeta').textContent =
    'Secteur : ' + secteurLabel(f.secteur) + '   |   Durée de vie conventionnelle : ' + f.dureeVie + ' ans';
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
  majChipActive();
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
  try { resultat = f.calc(values); } catch(e){ resultat = 0; }
  if(!isFinite(resultat) || isNaN(resultat)){ resultat = 0; }
  resultat = Math.round(resultat);
  document.getElementById('ficheResultat').textContent = resultat.toLocaleString('fr-FR');
  return resultat;
}

document.getElementById('btnAjouter').addEventListener('click', function(){
  if(!ficheCourante) return;
  var f = FICHES[ficheCourante];
  var values = lireValeursFiche();
  var kwh = calculerFicheCourante();
  dossier.push({code: ficheCourante, nom: f.nom, secteur: f.secteur, dureeVie: f.dureeVie, values: values, kwh: kwh});
  rafraichirDossier();
  var btn = this;
  btn.textContent = '✓ Ajoutée au dossier';
  setTimeout(function(){ btn.textContent = '+ Ajouter au dossier'; }, 1400);
});

/* ---------- Dossier ---------- */

function retirerDuDossier(idx){
  dossier.splice(idx, 1);
  rafraichirDossier();
}

function rafraichirDossier(){
  var body = document.getElementById('dossierBody');
  var foot = document.getElementById('dossierFoot');
  body.innerHTML = '';
  foot.innerHTML = '';
  var total = 0;
  if(dossier.length === 0){
    var trv = document.createElement('tr');
    trv.className = 'vide';
    var tdv = document.createElement('td');
    tdv.colSpan = 5;
    tdv.textContent = 'Aucune fiche pour l\'instant — choisis un secteur, ouvre une fiche puis « Ajouter au dossier ».';
    trv.appendChild(tdv);
    body.appendChild(trv);
  }
  dossier.forEach(function(item, idx){
    total += item.kwh;
    var tr = document.createElement('tr');
    var tdCode = document.createElement('td'); tdCode.innerHTML = '<b>' + item.code + '</b>';
    var tdNom = document.createElement('td'); tdNom.textContent = item.nom;
    var tdSecteur = document.createElement('td'); tdSecteur.textContent = secteurLabel(item.secteur);
    var tdKwh = document.createElement('td'); tdKwh.className = 'num'; tdKwh.textContent = Math.round(item.kwh).toLocaleString('fr-FR');
    var tdBtn = document.createElement('td');
    var btn = document.createElement('button');
    btn.textContent = '✕ Retirer';
    btn.className = 'btn-retirer';
    btn.onclick = function(){ retirerDuDossier(idx); };
    tdBtn.appendChild(btn);
    tr.appendChild(tdCode); tr.appendChild(tdNom); tr.appendChild(tdSecteur); tr.appendChild(tdKwh); tr.appendChild(tdBtn);
    body.appendChild(tr);
  });
  if(dossier.length > 0){
    var trf = document.createElement('tr');
    var tdl = document.createElement('td'); tdl.colSpan = 3; tdl.textContent = 'TOTAL — ' + dossier.length + ' fiche' + (dossier.length > 1 ? 's' : '');
    var tdt = document.createElement('td'); tdt.className = 'num'; tdt.textContent = Math.round(total).toLocaleString('fr-FR');
    var tde = document.createElement('td');
    trf.appendChild(tdl); trf.appendChild(tdt); trf.appendChild(tde);
    foot.appendChild(trf);
  }
  document.getElementById('nbFiches').textContent = dossier.length + ' fiche' + (dossier.length > 1 ? 's' : '');
  document.getElementById('btnExporter').disabled = dossier.length === 0;
}
rafraichirDossier();

/* ---------- Export Excel (ExcelJS : mise en forme complète) ---------- */

var XL = {
  vertFonce: 'FF065F46',
  vert:      'FF059669',
  nuit:      'FF0E2433',
  menthe:    'FFD1FAE5',
  mentheClair:'FFF2FAF6',
  bordure:   'FFB9D6C9',
  texteSec:  'FF35544C'
};

function bordsFins(){
  var c = { style:'thin', color:{argb: XL.bordure} };
  return { top:c, left:c, bottom:c, right:c };
}

function celluleDate(iso){
  if(!iso) return '';
  var p = iso.split('-');
  return new Date(+p[0], +p[1] - 1, +p[2]);
}

function slug(s){
  return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '')
    .toLowerCase().substring(0, 30);
}

/* Style appliqué à CHAQUE cellule d'une plage (les fusions ExcelJS
   n'héritent pas fond/bordures sur toute la plage sinon). */
function stylerPlage(ws, ligne, c1, c2, style){
  for(var c = c1; c <= c2; c++){
    var cell = ws.getCell(ligne, c);
    if(style.fill){ cell.fill = style.fill; }
    if(style.border){ cell.border = style.border; }
    if(style.font){ cell.font = style.font; }
    if(style.alignment){ cell.alignment = style.alignment; }
  }
}

function sectionTitre(ws, ligne, texte, nbCol){
  stylerPlage(ws, ligne, 1, nbCol, {
    fill: { type:'pattern', pattern:'solid', fgColor:{argb: XL.menthe} },
    font: { bold: true, size: 11, color: {argb: XL.vertFonce} },
    alignment: { vertical:'middle' }
  });
  ws.mergeCells(ligne, 1, ligne, nbCol);
  ws.getCell(ligne, 1).value = texte;
  ws.getRow(ligne).height = 18;
}

function paireLigne(ws, ligne, label, valeur, opts){
  opts = opts || {};
  var cl = ws.getCell(ligne, 1);
  cl.value = label;
  cl.font = { bold: true, size: 10, color: {argb: XL.texteSec} };
  cl.alignment = { vertical:'top', wrapText: true };
  var cv = ws.getCell(ligne, 2);
  cv.value = (valeur === '' || valeur === undefined || valeur === null) ? '—' : valeur;
  cv.font = { size: 10, bold: !!opts.gras };
  cv.alignment = { vertical:'top', horizontal:'left', wrapText: true };
  if(opts.numFmt){ cv.numFmt = opts.numFmt; }
  var bas = { bottom: { style:'hair', color:{argb:'FFE3EFE9'} } };
  cl.border = bas; cv.border = bas;
}

function exporterExcel(){
  if(dossier.length === 0){ return; }
  var btn = document.getElementById('btnExporter');
  var txtInitial = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Génération…';

  var infos = {
    nom: document.getElementById('infoNom').value.trim(),
    adresse: document.getElementById('infoAdresse').value.trim(),
    cp: document.getElementById('infoCP').value.trim(),
    ville: document.getElementById('infoVille').value.trim(),
    dateEng: document.getElementById('infoDateEngagement').value,
    datePreuve: document.getElementById('infoDatePreuve').value,
    facture: document.getElementById('infoFacture').value.trim()
  };

  var wb = new ExcelJS.Workbook();
  wb.creator = 'Calculateur CEE multi-secteurs';
  wb.created = new Date();

  /* ===== Feuille 1 : Récapitulatif ===== */
  var ws = wb.addWorksheet('Récapitulatif', { views: [{ state:'frozen', ySplit: 10 }] });
  [16, 56, 24, 18, 16].forEach(function(w, i){ ws.getColumn(i + 1).width = w; });
  ws.pageSetup = { orientation:'landscape', fitToPage:true, fitToWidth:1, fitToHeight:0, paperSize:9,
                   margins:{left:0.4, right:0.4, top:0.5, bottom:0.5, header:0.2, footer:0.2} };

  stylerPlage(ws, 1, 1, 5, {
    fill: { type:'pattern', pattern:'solid', fgColor:{argb: XL.vertFonce} },
    font: { bold: true, size: 15, color: {argb:'FFFFFFFF'} },
    alignment: { vertical:'middle', horizontal:'left', indent: 1 }
  });
  ws.mergeCells('A1:E1');
  ws.getCell('A1').value = 'Dossier CEE — ' + (infos.nom || 'bénéficiaire non renseigné');
  ws.getRow(1).height = 28;

  ws.mergeCells('A2:E2');
  var sousTitre = ws.getCell('A2');
  var maintenant = new Date();
  sousTitre.value = 'Exporté le ' + maintenant.toLocaleDateString('fr-FR') + ' à ' + maintenant.toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'}) + ' — Calculateur CEE multi-secteurs';
  sousTitre.font = { italic: true, size: 9, color: {argb:'FF6B7F78'} };

  sectionTitre(ws, 4, 'Identification du site', 5);
  var infoPaires = [
    ['Bénéficiaire', infos.nom, 'Date d\'engagement', celluleDate(infos.dateEng), 'dd/mm/yyyy'],
    ['Adresse du site', infos.adresse, 'Date de preuve de réalisation', celluleDate(infos.datePreuve), 'dd/mm/yyyy'],
    ['Code postal', infos.cp, 'Référence facture', infos.facture, null],
    ['Ville', infos.ville, '', '', null]
  ];
  infoPaires.forEach(function(p, i){
    var r = 5 + i;
    var c1 = ws.getCell(r, 1); c1.value = p[0]; c1.font = { bold:true, size:10, color:{argb: XL.texteSec} };
    var c2 = ws.getCell(r, 2); c2.value = p[1] || (p[0] ? '—' : ''); c2.font = { size:10 };
    var c3 = ws.getCell(r, 3); c3.value = p[2]; c3.font = { bold:true, size:10, color:{argb: XL.texteSec} };
    ws.mergeCells(r, 4, r, 5);
    var c4 = ws.getCell(r, 4);
    c4.value = (p[3] === '' || p[3] === undefined) ? (p[2] ? '—' : '') : p[3];
    c4.font = { size:10 };
    if(p[4] && p[3]){ c4.numFmt = p[4]; }
  });

  var enTetes = ['Code fiche', 'Opération', 'Secteur', 'Durée de vie (ans)', 'kWh cumac'];
  var ligneEnTete = 10;
  enTetes.forEach(function(h, i){
    var c = ws.getCell(ligneEnTete, i + 1);
    c.value = h;
    c.font = { bold: true, size: 10.5, color: {argb:'FFFFFFFF'} };
    c.fill = { type:'pattern', pattern:'solid', fgColor:{argb: XL.vert} };
    c.alignment = { vertical:'middle', horizontal: i >= 3 ? 'center' : 'left', wrapText: true };
    c.border = bordsFins();
  });
  ws.getRow(ligneEnTete).height = 20;
  ws.autoFilter = { from: {row: ligneEnTete, column: 1}, to: {row: ligneEnTete, column: 5} };

  var total = 0;
  dossier.forEach(function(item, i){
    total += item.kwh;
    var r = ligneEnTete + 1 + i;
    var vals = [item.code, item.nom, secteurLabel(item.secteur), item.dureeVie, Math.round(item.kwh)];
    vals.forEach(function(v, j){
      var c = ws.getCell(r, j + 1);
      c.value = v;
      c.font = { size: 10, bold: j === 0 };
      c.border = bordsFins();
      c.alignment = { vertical:'middle', wrapText: j === 1, horizontal: j === 3 ? 'center' : (j === 4 ? 'right' : 'left') };
      if(i % 2 === 1){ c.fill = { type:'pattern', pattern:'solid', fgColor:{argb: XL.mentheClair} }; }
    });
    ws.getCell(r, 5).numFmt = '#,##0';
  });

  var ligneTotal = ligneEnTete + 1 + dossier.length;
  stylerPlage(ws, ligneTotal, 1, 5, {
    fill: { type:'pattern', pattern:'solid', fgColor:{argb: XL.menthe} },
    font: { bold: true, size: 11, color: {argb: XL.vertFonce} },
    alignment: { horizontal:'right', vertical:'middle' },
    border: bordsFins()
  });
  ws.mergeCells(ligneTotal, 1, ligneTotal, 4);
  ws.getCell(ligneTotal, 1).value = 'TOTAL — ' + dossier.length + ' fiche' + (dossier.length > 1 ? 's' : '');
  var cv = ws.getCell(ligneTotal, 5);
  cv.value = Math.round(total);
  cv.numFmt = '#,##0';
  ws.getRow(ligneTotal).height = 20;

  var noteFin = ws.getCell(ligneTotal + 2, 1);
  ws.mergeCells(ligneTotal + 2, 1, ligneTotal + 2, 5);
  noteFin.value = 'Montants estimés en kWh cumac — à vérifier sur les fiches d\'opérations standardisées en vigueur avant dépôt du dossier.';
  noteFin.font = { italic: true, size: 9, color: {argb:'FF6B7F78'} };

  /* ===== Une feuille par fiche : PARTIE A ===== */
  var nomsUtilises = {};
  dossier.forEach(function(item){
    var base = item.code.replace(/[\\\/\?\*\[\]\:]/g, '-').substring(0, 28);
    var nomFeuille = base;
    var n = 1;
    while(nomsUtilises[nomFeuille]){ n++; nomFeuille = base + '-' + n; }
    nomsUtilises[nomFeuille] = true;

    var wf = wb.addWorksheet(nomFeuille);
    wf.getColumn(1).width = 44;
    wf.getColumn(2).width = 52;
    wf.pageSetup = { orientation:'portrait', fitToPage:true, fitToWidth:1, fitToHeight:0, paperSize:9,
                     margins:{left:0.5, right:0.5, top:0.6, bottom:0.6, header:0.2, footer:0.2} };

    stylerPlage(wf, 1, 1, 2, {
      fill: { type:'pattern', pattern:'solid', fgColor:{argb: XL.nuit} },
      font: { bold: true, size: 12, color: {argb:'FFFFFFFF'} },
      alignment: { vertical:'middle', indent: 1 }
    });
    wf.mergeCells('A1:B1');
    wf.getCell('A1').value = 'PARTIE A — Éléments à archiver par le bénéficiaire';
    wf.getRow(1).height = 24;

    wf.mergeCells('A2:B2');
    var t2 = wf.getCell('A2');
    t2.value = item.code + ' — ' + item.nom;
    t2.font = { bold: true, size: 11, color: {argb: XL.vertFonce} };
    t2.alignment = { wrapText: true, vertical:'middle' };
    wf.getRow(2).height = 18;

    sectionTitre(wf, 4, 'Identification de l\'opération', 2);
    paireLigne(wf, 5, 'Fiche d\'opération standardisée', item.code);
    paireLigne(wf, 6, 'Intitulé de l\'opération', item.nom);
    paireLigne(wf, 7, 'Secteur', secteurLabel(item.secteur));
    paireLigne(wf, 8, 'Durée de vie conventionnelle', item.dureeVie, { numFmt: '0" ans"' });

    sectionTitre(wf, 10, 'Bénéficiaire et site de l\'opération', 2);
    paireLigne(wf, 11, 'Nom du bénéficiaire', infos.nom);
    paireLigne(wf, 12, 'Adresse du site', infos.adresse);
    paireLigne(wf, 13, 'Code postal / Ville', (infos.cp + ' ' + infos.ville).trim());
    paireLigne(wf, 14, 'Date d\'engagement', celluleDate(infos.dateEng), { numFmt: 'dd/mm/yyyy' });
    paireLigne(wf, 15, 'Date de preuve de réalisation', celluleDate(infos.datePreuve), { numFmt: 'dd/mm/yyyy' });
    paireLigne(wf, 16, 'Référence facture', infos.facture);

    sectionTitre(wf, 18, 'Paramètres de calcul saisis', 2);
    var r = 19;
    var f = FICHES[item.code];
    (f.inputs || []).forEach(function(inp){
      var v = item.values[inp.key];
      paireLigne(wf, r, inp.label, v, typeof v === 'number' ? { numFmt: '#,##0.###' } : {});
      r++;
    });

    r += 1;
    stylerPlage(wf, r, 1, 2, {
      fill: { type:'pattern', pattern:'solid', fgColor:{argb: XL.menthe} },
      font: { bold: true, size: 12, color: {argb: XL.vertFonce} },
      alignment: { vertical:'middle', horizontal:'center' },
      border: bordsFins()
    });
    wf.mergeCells(r, 1, r, 2);
    wf.getCell(r, 1).value = 'Montant de certificats : ' + Math.round(item.kwh).toLocaleString('fr-FR') + ' kWh cumac';
    wf.getRow(r).height = 24;
  });

  /* ===== Téléchargement ===== */
  var jour = new Date();
  var ymd = jour.getFullYear() + '-' + String(jour.getMonth() + 1).padStart(2, '0') + '-' + String(jour.getDate()).padStart(2, '0');
  var nomFichier = 'dossier-CEE-' + (slug(infos.nom) || 'sans-nom') + '-' + ymd + '.xlsx';

  wb.xlsx.writeBuffer().then(function(buffer){
    var blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = nomFichier;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    btn.textContent = '✓ Fichier téléchargé';
    setTimeout(function(){ btn.textContent = txtInitial; btn.disabled = dossier.length === 0; }, 1600);
  }).catch(function(e){
    console.error('Export Excel :', e);
    btn.textContent = 'Erreur — réessayer';
    setTimeout(function(){ btn.textContent = txtInitial; btn.disabled = dossier.length === 0; }, 2500);
  });
}

document.getElementById('btnExporter').addEventListener('click', exporterExcel);
