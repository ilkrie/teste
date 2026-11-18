/* Vagas publicadas pela BR.Digital no InfoJobs. Para atualizar, edite a lista abaixo. */
window.BR_VAGAS = [{"t": "Executivo de Negócios Corporativos PJ", "c": "Cuiabá", "u": "MT", "a": "Telecomunicações", "d": "08/10/2026", "url": "https://www.infojobs.com.br/vaga-de-executivo-negocios-corporativos-pj-cuiaba-mt-em-mato-grosso__12101290.aspx"}, {"t": "Assistente Administrativo", "c": "Flórida Paulista", "u": "SP", "a": "Telecomunicações", "d": "05/10/2026", "url": "https://www.infojobs.com.br/vaga-de-assistente-administrativo-florida-sp-em-sao-paulo__12087390.aspx"}, {"t": "Téc. de Apoio Redes Comp Jr (Call Center)", "c": "Porto Alegre", "u": "RS", "a": "TI", "d": "01/10/2026", "url": "https://www.infojobs.com.br/vaga-de-tec-apoio-redes-comp-jr-call-center-porto-alegre-rs-em-rio-grande-do-sul__12075662.aspx"}, {"t": "Auxiliar Técnico em Telecomunicações", "c": "Cuiabá", "u": "MT", "a": "Telecomunicações", "d": "22/09/2026", "url": "https://www.infojobs.com.br/vaga-de-auxiliar-tecnico-telecomunicacoes-cuiaba-mt-em-mato-grosso__12040720.aspx"}, {"t": "Auxiliar de Projetista", "c": "Cuiabá", "u": "MT", "a": "Telecomunicações", "d": "22/09/2026", "url": "https://www.infojobs.com.br/vaga-de-auxiliar-projetista-cuiaba-mt-em-mato-grosso__12040689.aspx"}, {"t": "Analista de Contas a Pagar", "c": "Porto Alegre", "u": "RS", "a": "Contas a Pagar e Receber", "d": "Há mais de um mês", "url": "https://www.infojobs.com.br/vaga-de-analista-contas-pagar-porto-alegre-rs-em-rio-grande-do-sul__11995229.aspx"}, {"t": "Técnico em Fibra Óptica", "c": "Cascavel", "u": "PR", "a": "Telecomunicações", "d": "Há mais de um mês", "url": "https://www.infojobs.com.br/vaga-de-tecnico-fibra-optica-cascavel-pr-em-parana__11941104.aspx"}, {"t": "Executivo Comercial PJ", "c": "Goiânia", "u": "GO", "a": "Telecomunicações", "d": "Há mais de um mês", "url": "https://www.infojobs.com.br/vaga-de-executivo-comercial-pj-goiania-go-em-goias__11898433.aspx"}];
window.BR_VAGAS_URL = "https://www.infojobs.com.br/emprego-brdigital-telecomunicacoes__-89332.aspx";
(function () {
    var box = document.getElementById('vagas-app'); if (!box) { return; }
    var V = window.BR_VAGAS, ufs = [], areas = [];
    V.forEach(function (v) { if (ufs.indexOf(v.u) < 0) { ufs.push(v.u); } if (areas.indexOf(v.a) < 0) { areas.push(v.a); } });
    ufs.sort(); areas.sort();
    box.innerHTML = '<div class="job-filters"><label class="job-f job-q"><span>Buscar vaga</span><input type="search" id="vq" placeholder="Cargo ou palavra-chave"></label><label class="job-f"><span>Localidade</span><select id="vu"><option value="">Todas as localidades</option>' + ufs.map(function (u) { return '<option>' + u + '</option>'; }).join('') + '</select></label><label class="job-f"><span>Área</span><select id="va"><option value="">Todas as áreas</option>' + areas.map(function (a) { return '<option>' + a + '</option>'; }).join('') + '</select></label><button type="button" class="job-clear" id="vc">Limpar filtros</button></div><p class="job-count" id="vn" aria-live="polite"></p><div class="job-grid" id="vg"></div><p class="job-all"><a class="btn btn-cyan" href="' + window.BR_VAGAS_URL + '" target="_blank" rel="noopener">Ver todas as vagas no InfoJobs</a></p>';
    function rel(d) {
        var m = /^(\d\d)\/(\d\d)\/(\d{4})$/.exec(d); if (!m) { return ''; }
        var days = Math.floor((new Date() - new Date(+m[3], +m[2] - 1, +m[1])) / 86400000);
        if (days <= 0) { return 'hoje'; } if (days === 1) { return 'ontem'; } if (days < 7) { return 'há ' + days + ' dias'; }
        if (days < 14) { return 'há 1 semana'; } if (days < 30) { return 'há ' + Math.floor(days / 7) + ' semanas'; }
        var mo = Math.floor(days / 30); return mo === 1 ? 'há 1 mês' : 'há ' + mo + ' meses';
    }
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
    function draw() {
        var q = document.getElementById('vq').value.toLowerCase().trim(), u = document.getElementById('vu').value, a = document.getElementById('va').value;
        var L = V.filter(function (v) { return (!q || (v.t + ' ' + v.c + ' ' + v.a).toLowerCase().indexOf(q) > -1) && (!u || v.u === u) && (!a || v.a === a); });
        document.getElementById('vn').textContent = L.length + (L.length === 1 ? ' vaga encontrada' : ' vagas encontradas');
        document.getElementById('vg').innerHTML = L.length ? L.map(function (v, ix) {
            return '<article class="job-card" style="animation-delay:' + (ix * 70) + 'ms"><div class="job-top"><span class="job-area">' + esc(v.a) + '</span><span class="job-date">' + esc(rel(v.d)) + '</span></div><h3>' + esc(v.t) + '</h3><p class="job-loc"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>' + esc(v.c) + ' - ' + esc(v.u) + '</p>' + (/\bPJ\b/.test(v.t) ? '<p class="job-tags"><span>PJ</span></p>' : '') + '<div class="job-actions"><a class="btn btn-cyan" href="' + v.url + '" target="_blank" rel="noopener">Aplicar-se</a><a class="job-more" href="' + v.url + '" target="_blank" rel="noopener">Mais detalhes</a></div></article>';
        }).join('') : '<p class="job-empty">Nenhuma vaga encontrada com esses filtros.</p>';
    }
    ['vq', 'vu', 'va'].forEach(function (id) { document.getElementById(id).addEventListener(id === 'vq' ? 'input' : 'change', draw); });
    document.getElementById('vc').addEventListener('click', function () { document.getElementById('vq').value = ''; document.getElementById('vu').value = ''; document.getElementById('va').value = ''; draw(); });
    draw();
})();
