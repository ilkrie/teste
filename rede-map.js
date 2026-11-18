/* Mapa interativo da rede BR.Digital (Leaflet). Dados ilustrativos de pontos e rotas. */
/* Para trocar o mapa base por um provedor com chave (MapTiler, Mapbox, Google), defina window.BR_MAP_CONFIG antes deste script. */
(function () {
    var CFG = window.BR_MAP_CONFIG || { tiles: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', attr: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ', maxZoom: 16 };
    // id, nome, lat, lng, tipos (p=POP, i=IDC, x=saída internacional), código, país
    var N = [
        ['for', 'Fortaleza', -3.7319, -38.5267, 'ix', 'FLZ', 'Brasil'], ['rec', 'Recife', -8.0476, -34.877, 'i', 'RCE', 'Brasil'], ['ssa', 'Salvador', -12.9777, -38.5016, 'pix', 'SDR', 'Brasil'],
        ['rio', 'Rio de Janeiro', -22.9068, -43.1729, 'ix', 'RJO', 'Brasil'], ['sao', 'São Paulo', -23.5505, -46.6333, 'ix', 'SPO', 'Brasil'], ['cwb', 'Curitiba', -25.4284, -49.2733, 'i', 'CTA', 'Brasil'],
        ['fln', 'Florianópolis', -27.5954, -48.548, 'i', 'FNS', 'Brasil'], ['poa', 'Porto Alegre', -30.0346, -51.2177, 'i', 'PAE', 'Brasil'], ['bsb', 'Brasília', -15.7939, -47.8828, 'i', 'BSA', 'Brasil'],
        ['gyn', 'Goiânia', -16.6869, -49.2648, 'i', 'GNA', 'Brasil'], ['sor', 'Sorriso', -12.5453, -55.7211, 'i', '', 'Brasil'], ['bhz', 'Belo Horizonte', -19.9167, -43.9345, 'p', 'BHE', 'Brasil'],
        ['vix', 'Vitória', -20.3155, -40.3128, 'p', 'VTA', 'Brasil'], ['cgb', 'Cuiabá', -15.6014, -56.0979, 'p', 'CBA', 'Brasil'], ['cgr', 'Campo Grande', -20.4697, -54.6201, 'p', 'CPE', 'Brasil'],
        ['mao', 'Manaus', -3.119, -60.0217, 'p', 'MNS', 'Brasil'], ['bel', 'Belém', -1.4558, -48.4902, 'p', 'BLM', 'Brasil'], ['slz', 'São Luís', -2.5307, -44.3068, 'p', 'SLS', 'Brasil'],
        ['the', 'Teresina', -5.0892, -42.8019, 'p', 'TSA', 'Brasil'], ['nat', 'Natal', -5.7945, -35.211, 'p', 'NTL', 'Brasil'], ['jpa', 'João Pessoa', -7.1195, -34.845, 'p', 'JPA', 'Brasil'],
        ['mcz', 'Maceió', -9.6498, -35.7089, 'p', 'MCO', 'Brasil'], ['aju', 'Aracaju', -10.9472, -37.0731, 'p', 'AJU', 'Brasil'], ['pmw', 'Palmas', -10.2491, -48.3243, 'p', '', 'Brasil'],
        ['pvh', 'Porto Velho', -8.7612, -63.9004, 'p', '', 'Brasil'], ['mcp', 'Macapá', 0.0349, -51.0694, 'p', 'MPA', 'Brasil'], ['foz', 'Foz do Iguaçu', -25.5163, -54.5854, 'p', 'FOZ', 'Brasil'],
        ['asu', 'Assunção', -25.2637, -57.5759, 'x', '', 'Paraguai'], ['bue', 'Buenos Aires', -34.6037, -58.3816, 'x', '', 'Argentina'], ['scl', 'Santiago', -33.4489, -70.6693, 'x', '', 'Chile'],
        ['aric', 'Arica', -18.4783, -70.3126, 'p', '', 'Chile'], ['lim', 'Lima', -12.0464, -77.0428, 'x', '', 'Peru'], ['vvi', 'Santa Cruz de la Sierra', -17.7833, -63.1822, 'p', '', 'Bolívia'],
        ['mia', 'Miami', 25.7617, -80.1918, 'x', '', 'Estados Unidos'], ['nyc', 'Nova York', 40.7128, -74.006, 'x', '', 'Estados Unidos'], ['ash', 'Ashburn', 39.0438, -77.4874, 'p', '', 'Estados Unidos'],
        ['dal', 'Dallas', 32.7767, -96.797, 'p', '', 'Estados Unidos'], ['mad', 'Madri', 40.4168, -3.7038, 'x', '', 'Espanha'], ['lon', 'Londres', 51.5072, -0.1276, 'p', '', 'Reino Unido'],
        ['ams', 'Amsterdã', 52.3676, 4.9041, 'p', '', 'Holanda'], ['fra', 'Frankfurt', 50.1109, 8.6821, 'p', '', 'Alemanha'], ['sof', 'Sófia', 42.6977, 23.3219, 'p', '', 'Bulgária']
    ];
    var DC = { for: [90, 50], rec: [70, 36], bsb: [201.5, 120], gyn: [87.5, 32], sor: [80, 32], rio: [406.3, 28], sao: [60, 36], cwb: [220, 132], fln: [60, 36], poa: [200, 120] };
    var B = [['poa', 'fln'], ['fln', 'cwb'], ['cwb', 'sao'], ['sao', 'rio'], ['rio', 'vix'], ['vix', 'ssa'], ['ssa', 'aju'], ['aju', 'mcz'], ['mcz', 'rec'], ['rec', 'jpa'], ['jpa', 'nat'], ['nat', 'for'], ['for', 'the'], ['the', 'slz'], ['slz', 'bel'], ['bel', 'mcp'], ['bel', 'mao'], ['sao', 'bhz'], ['bhz', 'bsb'], ['bhz', 'vix'], ['bsb', 'gyn'], ['gyn', 'sao'], ['bsb', 'pmw'], ['pmw', 'bel'], ['bsb', 'cgb'], ['cgb', 'sor'], ['cgb', 'pvh'], ['pvh', 'mao'], ['sao', 'cgr'], ['cgr', 'cgb'], ['cwb', 'foz'], ['foz', 'asu'], ['poa', 'bue'], ['sao', 'bue'], ['cgb', 'vvi'], ['vvi', 'aric'], ['aric', 'lim'], ['aric', 'scl'], ['scl', 'bue'], ['ssa', 'bsb'], ['rec', 'the'], ['mia', 'dal'], ['nyc', 'ash'], ['mad', 'lon'], ['mad', 'ams'], ['mad', 'fra'], ['mad', 'sof']];
    var S = [['for', 'mia'], ['for', 'nyc'], ['for', 'mad'], ['rio', 'mia'], ['sao', 'mia'], ['sao', 'nyc'], ['nyc', 'mad']];
    var KIND = { p: 'Principal POP', i: 'IDC (data center)', x: 'Saída internacional' };
    function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
    /* Cabos submarinos: pontos intermediários pelo oceano (nunca por terra), suavizados em curva. */
    var SEA = {
        'for-mia': [[-3.7, -38.5], [-1, -33], [6, -40], [14, -52], [20, -62], [24, -72], [25.76, -80.19]],
        'for-nyc': [[-3.7, -38.5], [-1, -33], [8, -40], [20, -52], [30, -60], [37, -68], [40.71, -74]],
        'for-mad': [[-3.7, -38.5], [0, -32], [10, -27], [22, -21], [33, -14], [38.5, -10], [40.42, -3.7]],
        'rio-mia': [[-22.9, -43.2], [-23.6, -39], [-18, -31], [-5, -32], [6, -40], [14, -52], [20, -62], [24, -72], [25.76, -80.19]],
        'sao-mia': [[-23.55, -46.6], [-24.2, -45.8], [-24.8, -40], [-18, -31], [-5, -32], [6, -40], [14, -52], [20, -62], [24, -72], [25.76, -80.19]],
        'sao-nyc': [[-23.55, -46.6], [-24.2, -45.8], [-24.5, -39], [-15, -31], [0, -33], [12, -45], [25, -58], [35, -67], [40.71, -74]],
        'nyc-mad': [[40.71, -74], [41, -65], [42, -45], [41, -25], [39, -12], [38.5, -9.5], [40.42, -3.7]]
    };
    function smooth(P) {
        var out = [], q = [P[0]].concat(P, [P[P.length - 1]]);
        for (var i = 1; i < q.length - 2; i++) {
            for (var t = 0; t < 1; t += 0.1) {
                var t2 = t * t, t3 = t2 * t;
                out.push([0, 1].map(function (k) { return 0.5 * ((2 * q[i][k]) + (-q[i - 1][k] + q[i + 1][k]) * t + (2 * q[i - 1][k] - 5 * q[i][k] + 4 * q[i + 1][k] - q[i + 2][k]) * t2 + (-q[i - 1][k] + 3 * q[i][k] - 3 * q[i + 1][k] + q[i + 2][k]) * t3); }));
            }
        }
        out.push(P[P.length - 1]);
        return out;
    }
    function arc(a, b) {
        var p = [], dx = b[1] - a[1], dy = b[0] - a[0], d = Math.sqrt(dx * dx + dy * dy), nx = -dy / d, ny = dx / d, off = d * 0.22, sg = ny < 0 ? -1 : 1;
        var cx = (a[0] + b[0]) / 2 + ny * off * sg * 0 + Math.abs(nx) * off * 0 + (sg * Math.abs(ny)) * off, cy = (a[1] + b[1]) / 2 + nx * off * sg;
        for (var t = 0; t <= 1.001; t += 0.04) { p.push([(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * cx + t * t * b[0], (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * cy + t * t * b[1]]); }
        return p;
    }
    window.BRMap = {
        mount: function (sec) {
            if (typeof L === 'undefined' || !sec) { return; }
            var fig = sec.querySelector('figure'); if (!fig) { return; }
            var byId = {}; N.forEach(function (n) { byId[n[0]] = { id: n[0], name: n[1], ll: [n[2], n[3]], kinds: n[4], code: n[5], country: n[6], links: [] }; });
            fig.className = 'brmap';
            fig.innerHTML = '<div class="brmap-canvas" id="brmap"></div><div class="brmap-ui"><div class="brmap-toggle"><button type="button" class="is-on" data-m="rede">REDE</button><button type="button" data-m="idc">IDCs</button></div><div class="brmap-search"><input type="search" placeholder="Buscar cidade, POP ou IDC" aria-label="Buscar no mapa"><ul class="brmap-results" hidden></ul></div></div><aside class="brmap-panel" hidden></aside>';
            var map = L.map('brmap', { zoomControl: true, minZoom: 2, scrollWheelZoom: false, worldCopyJump: true }).setView([-15, -52], 4);
            L.tileLayer(CFG.tiles, { attribution: CFG.attr, maxZoom: CFG.maxZoom || 18 }).addTo(map);
            map.on('focus', function () { map.scrollWheelZoom.enable(); }); map.on('blur', function () { map.scrollWheelZoom.disable(); });
            var lines = L.layerGroup().addTo(map), pts = L.layerGroup().addTo(map), edges = [], marks = {}, sel = null, mode = 'rede';
            function addEdge(a, b, kind) {
                var A = byId[a], B2 = byId[b]; A.links.push(b); B2.links.push(a);
                var st = kind === 's' ? { color: '#e66e25', weight: 2.2, opacity: .85, dashArray: '6 6' } : { color: '#243a76', weight: 2, opacity: .8 };
                var pl = L.polyline(kind === 's' ? smooth(SEA[a + '-' + b] || [A.ll, B2.ll]) : [A.ll, B2.ll], st); pl._k = kind; pl._a = a; pl._b = b; pl._st = st; edges.push(pl);
            }
            B.forEach(function (e) { addEdge(e[0], e[1], 'b'); }); S.forEach(function (e) { addEdge(e[0], e[1], 's'); });
            function panel(n) {
                var p = sec.querySelector('.brmap-panel'), kinds = n.kinds.split('').map(function (k) { return KIND[k]; }).join(' · '), d = DC[n.id], idc = n.kinds.indexOf('i') > -1;
                var tem = function (k) { return edges.some(function (pl) { return (pl._a === n.id || pl._b === n.id) && pl._k === k; }); };
                var leg = [];
                if (idc) { leg.push('<span><i class="lg-i"></i>IDC (data center)</span>'); }
                if (n.kinds.indexOf('x') > -1) { leg.push('<span><i class="lg-x"></i>Saída internacional</span>'); }
                if (n.kinds.indexOf('p') > -1) { leg.push('<span><i class="lg-p"></i>Principal POP</span>'); }
                if (tem('b')) { leg.push('<span><i class="lg-b"></i>Rede Backbone</span>'); }
                if (tem('s')) { leg.push('<span><i class="lg-s"></i>Capacidade Submarina</span>'); }
                p.innerHTML = '<button type="button" class="brmap-x" aria-label="Fechar">×</button><p class="mp-k">SITE / PRAÇA DE ATUAÇÃO</p><h3>' + esc(n.name) + (idc ? '<img class="mp-logo" src="assets/brand/simbolo-roleta.png" alt="BR.Digital">' : '') + '</h3>' + (n.code ? '<p class="mp-l">Código</p><p class="mp-v">' + n.code + '</p>' : '') + '<p class="mp-l">Perfil</p><p class="mp-v">' + kinds + '</p>' + (d ? '<p class="mp-l">Datacenter</p><p class="mp-v">' + d[0].toString().replace('.', ',') + ' m²</p>' : '') + '<p class="mp-l">País</p><p class="mp-v">' + esc(n.country) + '</p><p class="mp-l">Conexões próximas</p><p class="mp-v">' + n.links.map(function (i) { return esc(byId[i].name); }).join(', ') + '</p><div class="mp-leg">' + leg.join('') + '</div>';
                p.hidden = false; p.classList.remove('in'); void p.offsetWidth; p.classList.add('in');
                p.querySelector('.brmap-x').onclick = function () { choose(null); };
            }
            function style() {
                edges.forEach(function (pl) { var on = sel && (pl._a === sel || pl._b === sel); pl.setStyle(on ? { color: '#00bfdf', weight: 4, opacity: 1 } : (sel ? { color: pl._st.color, weight: pl._st.weight, opacity: .22 } : pl._st)); if (on) { pl.bringToFront(); } });
                Object.keys(marks).forEach(function (k) { var m = marks[k], on = k === sel; if (m.setStyle) { m.setStyle({ weight: on ? 4 : m._w, radius: on ? m._r + 3 : m._r }); } else if (m._icon) { m._icon.classList.toggle('is-sel', on); } });
            }
            function choose(id, fly) {
                sel = id; style();
                if (!id) { sec.querySelector('.brmap-panel').hidden = true; return; }
                panel(byId[id]); if (fly) { map.flyTo(byId[id].ll, Math.max(map.getZoom(), 5), { duration: .9 }); }
            }
            function build() {
                lines.clearLayers(); pts.clearLayers(); marks = {};
                if (mode === 'rede') { edges.forEach(function (e) { lines.addLayer(e); }); }
                Object.keys(byId).forEach(function (k) {
                    var n = byId[k], idc = n.kinds.indexOf('i') > -1, x = n.kinds.indexOf('x') > -1;
                    if (mode === 'idc' && !idc) { return; }
                    var o = idc ? { r: 9, c: '#fff', s: '#d1304a', w: 3 } : x ? { r: 8, c: '#e66e25', s: '#fff', w: 2 } : { r: 6, c: '#243a76', s: '#00bfdf', w: 2 };
                    var m = idc ? L.marker(n.ll, { icon: L.divIcon({ className: 'idc-ic', html: '<span><img src="assets/brand/simbolo-roleta.png" alt=""></span>', iconSize: [28, 28], iconAnchor: [14, 14] }) }) : L.circleMarker(n.ll, { radius: o.r, fillColor: o.c, color: o.s, weight: o.w, fillOpacity: 1 }); m._r = o.r; m._w = o.w;
                    m.bindTooltip(n.name + (n.code ? ' · ' + n.code : ''), { direction: 'top' }); m.on('click', function (e) { L.DomEvent.stopPropagation(e); choose(k, true); }); pts.addLayer(m); marks[k] = m;
                });
                style();
            }
            map.on('click', function () { choose(null); });
            build();
            [].forEach.call(sec.querySelectorAll('.brmap-toggle button'), function (b) { b.addEventListener('click', function () { mode = b.getAttribute('data-m'); [].forEach.call(sec.querySelectorAll('.brmap-toggle button'), function (x) { x.classList.toggle('is-on', x === b); }); sel = null; sec.querySelector('.brmap-panel').hidden = true; build(); }); });
            var inp = sec.querySelector('.brmap-search input'), res = sec.querySelector('.brmap-results');
            inp.addEventListener('input', function () {
                var q = inp.value.toLowerCase().trim(); if (!q) { res.hidden = true; return; }
                var L2 = Object.keys(byId).map(function (k) { return byId[k]; }).filter(function (n) { return (n.name + ' ' + n.code + ' ' + (n.kinds.indexOf('i') > -1 ? 'idc datacenter' : '') + ' ' + (n.kinds.indexOf('p') > -1 ? 'pop' : '')).toLowerCase().indexOf(q) > -1; }).slice(0, 6);
                res.innerHTML = L2.map(function (n) { return '<li data-id="' + n.id + '">' + esc(n.name) + '<small>' + (n.code || n.country) + '</small></li>'; }).join('') || '<li class="none">Nada encontrado</li>'; res.hidden = false;
            });
            res.addEventListener('click', function (e) { var li = e.target.closest('li[data-id]'); if (li) { res.hidden = true; inp.value = byId[li.getAttribute('data-id')].name; choose(li.getAttribute('data-id'), true); } });
            setTimeout(function () { map.invalidateSize(); }, 300);
        }
    };
})();
