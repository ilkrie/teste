(function () {
    var page = (window.location.pathname.split('/').pop().toLowerCase().replace('.html', '')) || 'index';
    var themed = { wholesale: 1, governo: 1, corporate: 1, provider: 1 };
    document.body.classList.add('theme-' + (themed[page] ? page : 'neutral'));
    var CATALOG = [
        ["Conectividade", [["ADSL - Firstline (Wholesale)", "adsl-firstline", "internet"], ["Dados L2L P2P", "dados-l2l", "link"], ["Espectro Óptico DWDM", "espectro-optico-dwdm", "spectrum"], ["Fibra Apagada", "fibra-apagada", "fiber"], ["FWA", "fwa", "satellite"], ["Fibre Channel", "fibre-channel", "channel"], ["IP VPN (MPLS)", "ip-vpn-mpls", "vpn"], ["Cloud Connect", "cloud-connect", "clouds"], ["Transporte SFP", "transporte-sfp", "fiber"]]],
        ["Data Center", [["Co-location", "colocation", "colocation"], ["Cross Connect", "cross-connect", "link"], ["Dutos", "dutos", "fiber"], ["Locação de Ativos", "locacao-de-ativos", "colocation"], ["Locação de Espaço em Torre", "locacao-espaco-torre", "internet"], ["Pure Storage", "pure-storage", "channel"]]],
        ["Internet", [["IP CDN", "ip-cdn", "ip"], ["IP Corp", "ip-corp", "internet"], ["IP BGP", "ip-bgp", "ip"], ["IP ISP", "ip-isp", "ip"], ["Internet Satelital", "internet-satelital", "satellite"], ["Peering Remoto", "peering-remoto", "peering"], ["Transporte CIX", "transporte-cix", "peering"], ["Transporte PIX", "transporte-pix", "peering"]]],
        ["Segurança", [["Anti-DDoS", "anti-ddos", "shield"], ["SD-WAN", "sd-wan", "vpn"], ["SOC", "soc", "shield"]]],
        ["BR Cloud", [["BR Cloud", "br-cloud", "clouds"]]],
        ["Infra Digital", [["NOC & NG-Broker", "noc-ng-broker", "infra"], ["SOC | Segurança da Informação", "soc-seguranca-da-informacao", "infra"], ["SD-WAN & NGFW", "sd-wan-ngfw", "infra"], ["Engenharia de Redes & Telecom", "engenharia-redes-telecom", "infra"], ["Consultoria Especializada N3 & N4", "consultoria-n3-n4", "infra"]]]
    ];
    var ICONS = {"ip": "<circle cx=\"21\" cy=\"21\" r=\"16\"/><path d=\"M5 21h32M21 5c-9 9-9 23 0 32M21 5c9 9 9 23 0 32\"/><circle cx=\"35\" cy=\"35\" r=\"9\"/><g stroke-width=\".9\"><path d=\"M29 32v6h2a1.5 1.5 0 0 0 0-3h-2m2 0a1.5 1.5 0 0 0 0-3h-2\"/><path d=\"M38.2 33.4a2.4 2.4 0 1 0 0 3.2v-1.3H37\"/><path d=\"M40 38v-6h1.3a1.5 1.5 0 0 1 0 3H40\"/></g>", "internet": "<path d=\"M9 42V6h18v36M27 18h13v24M4 42h40\"/><path d=\"M13 11h1m3 0h1m3 0h1M13 16h1m3 0h1m3 0h1M13 21h1m3 0h1m3 0h1M13 26h1m3 0h1m3 0h1M13 31h1m3 0h1m3 0h1M13 36h1m3 0h1m3 0h1M31 24h6M31 28h6M31 32h6M31 36h6\"/>", "peering": "<path d=\"M27 9A17 17 0 0 0 8 29M33 9A17 17 0 0 1 41 30\"/><circle cx=\"30\" cy=\"7\" r=\"3\"/><circle cx=\"7\" cy=\"32\" r=\"3\"/><circle cx=\"41\" cy=\"33\" r=\"3\"/><path d=\"M20 20v8M25 20l6 8m0-8-6 8\"/>", "shield": "<path d=\"M24 4 40 9v13c0 10-7 17-16 22-9-5-16-12-16-22V9Z\"/><g stroke-width=\"1.1\"><path d=\"M13 21v7h1.8a3.5 3.5 0 0 0 0-7zM20 21v7h1.8a3.5 3.5 0 0 0 0-7z\"/><circle cx=\"29.5\" cy=\"26\" r=\"1.8\"/><path d=\"M37 23.2c-.8-1-3.3-1-3.3.6 0 1.8 3.8 1 3.8 2.8 0 1.5-2.9 1.6-3.9.3\"/></g>", "wave": "<path d=\"M5 5C8 5 8 43 11 43S14 5 17 5 20 43 23 43 26 5 29 5 32 43 35 43 38 5 41 5\"/>", "link": "<rect x=\"6\" y=\"6\" width=\"36\" height=\"36\" rx=\"2\"/><path d=\"M12 12h24v19h-6v5H18v-5h-6z\"/><path stroke-width=\"3\" d=\"M17 17h1m4 0h1m4 0h1m4 0h1\"/>", "satellite": "<path d=\"M5 14 27 6l6 13-22 8Z\"/><path d=\"M22 23v6m0 0-10 12m10-12 10 12\"/><path d=\"M33 4a11 11 0 0 1 11 11M33 9a6 6 0 0 1 6 6\"/>", "fiber": "<path d=\"M12 7h14M12 41h14M12 7c-4 0-6 8-6 17s2 17 6 17\"/><path d=\"M26 7c-4 0-6 8-6 17s2 17 6 17\"/><path d=\"M22 17h11M22 24h13M22 31h11\"/><circle cx=\"36\" cy=\"17\" r=\"3\"/><circle cx=\"38\" cy=\"24\" r=\"3\"/><circle cx=\"36\" cy=\"31\" r=\"3\"/>", "spectrum": "<path d=\"M12 6h3c7 0 9 11 13 22 3 8 6 14 13 14\"/><path d=\"M23 24 10 42\"/>", "colocation": "<path d=\"M5 10 27 5v37L5 38Z\"/><path d=\"M27 12h14v29H27M31 15v23M5 16l22-4M5 22l22-4M5 28l22-4M5 34l22-4M11 8.5v30M17 7v33M22 6v35\"/>", "vpn": "<path d=\"M9 40h24a8 8 0 0 0 1-16 12 12 0 0 0-22 2 7.5 7.5 0 0 0-3 14Z\"/><circle cx=\"34\" cy=\"13\" r=\"8\"/><g stroke-width=\".9\"><path d=\"M28.5 10.5l2 5 2-5M33.8 15.5v-5h1.3a1.4 1.4 0 0 1 0 2.8h-1.3M37.3 15.5v-5l3 5v-5\"/></g>", "channel": "<rect x=\"2\" y=\"8\" width=\"17\" height=\"30\" rx=\"1\"/><rect x=\"29\" y=\"8\" width=\"17\" height=\"30\" rx=\"1\"/><path d=\"M2 18h17M2 28h17M29 18h17M29 28h17M6 13h.1m3 0h6M6 23h.1m3 0h6M6 33h.1m3 0h6M33 13h.1m3 0h6M33 23h.1m3 0h6M33 33h.1m3 0h6M22 23h.1m2.5 0h.1m2.5 0h.1\"/>", "clouds": "<path d=\"M10 28h27a8 8 0 0 0 0-16 11 11 0 0 0-21-2 9 9 0 0 0-6 18Z\"/><circle cx=\"14\" cy=\"35\" r=\"2.5\"/><circle cx=\"24\" cy=\"35\" r=\"2.5\"/><circle cx=\"34\" cy=\"35\" r=\"2.5\"/><path d=\"M14 28v4.5M24 28v4.5M34 28v4.5M14 37.5v5.5h20v-5.5M24 37.5V43\"/>", "gateway": "<circle cx=\"23\" cy=\"21\" r=\"15\"/><path d=\"M14 9c-6 6-6 17-1 24\"/><ellipse cx=\"23\" cy=\"40\" rx=\"16\" ry=\"3.5\"/>"};
    ICONS.infra = '<path d="M7 17 24 7l17 10v17L24 44 7 34zM7 17l17 10 17-10M24 27v17"/>';
    function ico(n) { return '<svg class="sol-icon" data-ico="' + n + '" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' + ICONS[n] + '</svg>'; }
    var nav = document.querySelector('.site-header .nav'), main = document.getElementById('main');
    if (nav) {
        var kids = [].slice.call(nav.children);
        function item(t) { return kids.filter(function (li) { var b = li.querySelector(':scope > button.top'); return b && b.textContent.trim() === t; })[0]; }
        var inst = item('Institucional'), tec = item('Tecnologia');
        if (inst) { inst.remove(); }
        if (!nav.querySelector('.drop.mega')) {
            var svc = document.createElement('li');
            svc.className = 'svc-menu';
            function mi(n) { return n ? '<svg data-ico="' + n + '" viewBox="0 0 48 48" aria-hidden="true" focusable="false">' + ICONS[n] + '</svg>' : ''; }
            svc.innerHTML = '<a class="top" href="servicos.html">Serviços</a><button class="svc-toggle" type="button" aria-label="Abrir categorias de serviços" aria-expanded="false" aria-controls="services-mega-menu">+</button><div class="mega2" id="services-mega-menu"><ul class="mega2-cats">' + CATALOG.map(function (c, i) {
                if (c[1].length === 1 && c[1][0][0] === c[0]) { return '<li><a href="servico-' + c[1][0][1] + '.html">' + c[0] + '</a></li>'; }
                return '<li data-i="' + i + '"><button class="mega2-category" type="button" aria-expanded="false">' + c[0] + '<i class="chev"></i></button></li>';
            }).join('') + '</ul><div class="mega2-panels">' + CATALOG.map(function (c, i) {
                if (c[1].length === 1 && c[1][0][0] === c[0]) { return ''; }
                return '<ul class="mega2-panel" data-i="' + i + '">' + c[1].map(function (p) { return '<li><a href="servico-' + p[1] + '.html">' + mi(p[2]) + '<span>' + p[0] + '</span></a></li>'; }).join('') + '</ul>';
            }).join('') + '</div></div>';
            var mc = svc.querySelectorAll('.mega2-cats li[data-i]'), mp = svc.querySelectorAll('.mega2-panel');
            function act(i) {
                [].forEach.call(mc, function (c) {
                    var active = c.getAttribute('data-i') === i;
                    c.classList.toggle('is-active', active);
                    c.querySelector('.mega2-category').setAttribute('aria-expanded', active);
                });
                [].forEach.call(mp, function (p) { p.classList.toggle('is-active', p.getAttribute('data-i') === i); });
            }
            [].forEach.call(mc, function (c) {
                c.addEventListener('mouseenter', function () { act(c.getAttribute('data-i')); });
                c.addEventListener('focusin', function () { act(c.getAttribute('data-i')); });
                c.querySelector('.mega2-category').addEventListener('click', function () {
                    act(c.getAttribute('data-i'));
                });
            });
            svc.addEventListener('mouseleave', function () { act('-1'); });
            var svcToggle = svc.querySelector(':scope > button.svc-toggle');
            svcToggle.addEventListener('click', function () {
                var open = svc.classList.toggle('is-open');
                svcToggle.setAttribute('aria-expanded', open);
                svcToggle.textContent = open ? '−' : '+';
                svcToggle.setAttribute('aria-label', open ? 'Fechar categorias de serviços' : 'Abrir categorias de serviços');
                if (!open) { act('-1'); }
            });
            if (tec) { tec.insertAdjacentElement('afterend', svc); } else { nav.insertBefore(svc, nav.firstChild); }
        }
    }
    if (!main) { return; }
    [].forEach.call(document.querySelectorAll('.pres-block'), function (b) { if (/^\s*Clientes/.test(b.textContent)) { b.remove(); } });
    [].forEach.call(document.querySelectorAll('.government-clients'), function (b) { b.remove(); });
    if (page === 'index') {
        var vals = document.querySelector('.values');
        if (vals && !document.querySelector('.about-band')) {
            var ab = document.createElement('section');
            ab.className = 'about-band';
            ab.innerHTML = '<div class="wrap"><p class="pres-kicker">Desde 1995</p><h2>31 anos promovendo a transformação digital</h2><p>Baseada em Porto Alegre, a Compuline deu seu primeiro passo no mercado de telecom em 1995. Hoje, como Grupo BR.Digital, trabalha para ser uma alternativa eficiente para o desenvolvimento tecnológico da América Latina.</p><p>Nossa missão é ser referência global em telecomunicações, aplicando a melhor tecnologia e infraestrutura para oferecer soluções personalizadas aos nossos clientes.</p><div class="actions"><a class="btn btn-cyan" href="nossa-historia.html">Saiba mais sobre nossa história</a><a class="btn btn-ghost" href="visao.html">Conheça nossa visão</a></div></div>';
            vals.insertAdjacentElement('afterend', ab);
        }
    }
    var sc = document.querySelector('.coverage-network-scene');
    if (page === 'cobertura') {
        [].forEach.call(document.querySelectorAll('.net-map'), function (n) { n.remove(); });
        var nmEl = document.createElement('div');
        nmEl.innerHTML = "<section class=\"net-map\" aria-labelledby=\"net-map-title\"><div class=\"wrap\"><p class=\"net-kicker\">Rede internacional \u00b7 AS 14840</p><h2 id=\"net-map-title\">O AS mais interconectado do Brasil</h2><figure class=\"net-map-embed\"><iframe src=\"Mapa_Rede_SP_Integrado/Mapa_Rede_Nacional.html\" title=\"Mapa interativo integrado da rede BR.Digital\" loading=\"lazy\" referrerpolicy=\"no-referrer\"></iframe></figure><ul class=\"net-stats\"><li><strong>+40.000 km</strong><span>de fibra em cobertura metropolitana</span></li><li><strong>36.000 km</strong><span>de fibra de backbone</span></li><li><strong>11</strong><span>data centers nas principais cidades</span></li><li><strong>749</strong><span>pontos de presen\u00e7a</span></li><li><strong>+5.000</strong><span>ASs conectados diretamente</span></li><li><strong>Global</strong><span>presente nos principais IXPs do mundo</span></li></ul></div></section>";
        var nmSec = nmEl.firstChild; if (sc) { sc.parentNode.replaceChild(nmSec, sc); } else { main.appendChild(nmSec); }
    }
    var g = document.querySelector('.wholesale-solutions-grid');
    if (g) {
        var P = [['Internet dedicada', 'internet', 'ip-corp'], ['Wave', 'wave', 'espectro-optico-dwdm'], ['L2L', 'link', 'dados-l2l'], ['Mitigação de DDoS', 'shield', 'anti-ddos'], ['Espectro', 'spectrum', 'espectro-optico-dwdm'], ['Co-location', 'colocation', 'colocation'], ['Cloud Connect', 'clouds', 'cloud-connect'], ['Fibra Apagada', 'fiber', 'fibra-apagada'], ['IP-VPN + SDWAN', 'vpn', 'ip-vpn-mpls']];
        g.innerHTML = P.map(function (p) { return '<article class="sol-link-card">' + ico(p[1]) + '<h3><a href="servico-' + p[2] + '.html">' + p[0] + '</a></h3></article>'; }).join('');
    }
    if (['index', 'fale-conosco', 'politicas', 'servicos', 'trabalhe-conosco', 'denuncia', 'termos-de-uso'].indexOf(page) < 0 || page === 'servicos') {
        [].forEach.call(document.querySelectorAll('.business-cta,.wholesale-cta,.government-cta,.std-cta'), function (c) { c.remove(); });
        var T = { wholesale: 'Conte para nós qual expansão a sua rede precisa acompanhar.', corporate: 'Conte para nós o que sua operação precisa conectar.', provider: 'Conte para nós como podemos ampliar a sua rede.', governo: 'Conte para nós o desafio da sua instituição.' };
        var isBrCloudPage = page === 'servico-br-cloud';
        var isInfraDigitalPage = CATALOG.some(function (category) {
            return category[0] === 'Infra Digital' && category[1].some(function (service) { return service[1] === page.replace(/^servico-/, ''); });
        });
        var cta = document.createElement('section');
        cta.className = 'std-cta';
        cta.innerHTML = '<div class="wrap std-cta-in"><div><p class="pres-kicker">Vamos conversar?</p><h2>' + (T[page] || (page.indexOf('servico') === 0 ? 'Descubra como este serviço pode acelerar o seu negócio.' : 'Com a gente ao seu lado, sempre tem solução.')) + '</h2></div><a class="btn" href="' + (isInfraDigitalPage ? 'https://www.infradigital.com.br/#' : isBrCloudPage ? 'https://brcloud.com.br' : 'fale-conosco.html') + '"' + (isBrCloudPage ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + (isInfraDigitalPage ? 'Fale com a Infra digital' : isBrCloudPage ? 'Fale com a BR.Cloud' : 'Fale com a BR.Digital') + '</a></div>';
        main.appendChild(cta);
    }

    var win = document.querySelector('.home-product-window');
    if (win) {
        var MAP = [['wave', 'espectro-optico-dwdm'], ['espectro', 'espectro-optico-dwdm'], ['fiber channel', 'fibre-channel'], ['trânsito', 'ip-bgp'], ['internet dedicada', 'ip-corp'], ['peering', 'peering-remoto'], ['co-location', 'colocation'], ['ddos', 'anti-ddos'], ['fibra', 'fibra-apagada'], ['multicloud', 'cloud-connect'], ['l2l', 'dados-l2l'], ['vpn', 'ip-vpn-mpls'], ['gateway', 'internet-satelital'], ['satélite', 'internet-satelital']];
        [].forEach.call(win.querySelectorAll('li'), function (li) {
            var t = li.textContent.toLowerCase();
            for (var k = 0; k < MAP.length; k++) { if (t.indexOf(MAP[k][0]) > -1) { li.setAttribute('data-href', 'servico-' + MAP[k][1] + '.html'); li.setAttribute('role', 'link'); li.tabIndex = li.closest('[aria-hidden="true"]') ? -1 : 0; break; } }
        });
        win.addEventListener('click', function (e) { var li = e.target.closest('li[data-href]'); if (li) { window.location.href = li.getAttribute('data-href'); } });
        win.addEventListener('keydown', function (e) { if (e.key === 'Enter') { var li = e.target.closest('li[data-href]'); if (li) { window.location.href = li.getAttribute('data-href'); } } });
    }
    var fl = document.querySelector('.site-footer .chip img');
    if (fl) { fl.src = 'assets/brand/logo-brdigital-negative.png'; }
    var fc = document.querySelector('.site-footer .foot-cols');
    if (fc && !fc.querySelector('.foot-svc')) {
        var fd = document.createElement('div');
        fd.className = 'foot-svc';
        fd.innerHTML = '<h4>Serviços</h4><ul><li><a href="servicos.html#conectividade">Conectividade</a></li><li><a href="servicos.html#data-center">Data Center</a></li><li><a href="servicos.html#internet">Internet</a></li><li><a href="servicos.html#seguranca">Segurança</a></li><li><a href="servico-br-cloud.html">BR Cloud</a></li><li><a href="servicos.html#infra-digital">Infra Digital</a></li></ul>';
        fc.insertBefore(fd, fc.children[2] || null);
    }
    function keepOnly(re) {
        var all = [].slice.call(main.querySelectorAll('.std-cta,.institutional-cta,.feature-cta')), k = all.filter(function (e) { return re.test(e.textContent); })[0] || all[all.length - 1];
        all.forEach(function (e) { if (e !== k) { e.remove(); } });
        if (k) { main.appendChild(k); }
    }
    if (page === 'cobertura') { keepOnly(/Vamos conectar sua próxima ideia/); }
    if (page === 'seguranca') { keepOnly(/Conte com a BR/i); }
    if (page === 'nossa-historia') {
        keepOnly(/próximo capítulo/i);
        [].forEach.call(document.querySelectorAll('.pres-block'), function (b) { if (/Linha do tempo/.test(b.textContent.slice(0, 40))) { b.remove(); } });
        var tl = document.querySelector('.institutional-timeline');
        if (tl) {
            var hh = tl.querySelector('.institutional-section-heading');
            if (hh && !tl.querySelector('.tl-sub')) { hh.insertAdjacentHTML('beforeend', '<p class="tl-sub">Uma trajetória de 31 anos promovendo a transformação digital.</p>'); }
            var gr = tl.querySelector('.institutional-timeline-grid');
            if (gr && gr.textContent.indexOf('O presente') < 0) { gr.insertAdjacentHTML('beforeend', '<li><span>2026</span><strong>O presente.</strong> Como Grupo BR.Digital, trabalhamos para ser uma alternativa eficiente para o desenvolvimento tecnológico da América Latina.</li>'); }
        }
    }
    [].forEach.call(document.querySelectorAll('.site-header a[href="data-centers.html"],.site-footer a[href="data-centers.html"]'), function (a) { a.textContent = 'Infraestrutura'; });

    if (page === 'corporate') {
        var SEG = {"agronegocio": {"t": "Agronegócio", "i": "<path d=\"M24 44V10M24 14c-5 0-7-4-7-8 5 0 7 3 7 8M24 14c5 0 7-4 7-8-5 0-7 3-7 8M24 25c-5 0-7-4-7-8 5 0 7 3 7 8M24 25c5 0 7-4 7-8-5 0-7 3-7 8M24 36c-5 0-7-4-7-8 5 0 7 3 7 8M24 36c5 0 7-4 7-8-5 0-7 3-7 8\"/>", "d": "Operações do campo costumam ter sedes, fazendas e unidades de apoio distantes entre si. A BR.Digital conecta essas pontas com links dedicados e, onde a fibra não chega, com acesso via satélite, mantendo equipes e sistemas de gestão integrados.", "s": [["Internet Satelital", "internet-satelital"], ["FWA", "fwa"], ["Dados L2L P2P", "dados-l2l"], ["IP VPN (MPLS)", "ip-vpn-mpls"]]}, "educacao": {"t": "Educação", "i": "<path d=\"M4 18 24 8l20 10-20 10zM12 23v10c0 3 6 6 12 6s12-3 12-6V23M44 18v12\"/>", "d": "Campi, escolas e polos de ensino dependem de internet estável para aulas, ensino a distância e gestão acadêmica. A BR.Digital interliga as unidades e protege o acesso, para que alunos e equipes tenham uma experiência contínua.", "s": [["IP Corp", "ip-corp"], ["SD-WAN", "sd-wan"], ["Anti-DDoS", "anti-ddos"], ["Dados L2L P2P", "dados-l2l"]]}, "energia": {"t": "Energia", "i": "<path d=\"M27 4 10 27h12l-3 17 19-25H26z\"/>", "d": "Operações de energia são distribuídas e precisam de comunicação confiável entre instalações e centros de controle. A BR.Digital oferece conexões dedicadas e de alta capacidade para apoiar essa troca de informações.", "s": [["Dados L2L P2P", "dados-l2l"], ["Espectro Óptico DWDM", "espectro-optico-dwdm"], ["IP VPN (MPLS)", "ip-vpn-mpls"], ["Fibra Apagada", "fibra-apagada"]]}, "industria": {"t": "Indústria", "i": "<path d=\"M4 42V20l12 8V20l12 8V6h10v36zM4 42h36M30 12h4M30 20h4M30 28h4\"/>", "d": "Fábricas, centros de distribuição e escritórios precisam falar a mesma língua digital. A BR.Digital aproxima sistemas, unidades e equipes com redes privadas e conexão direta às principais nuvens.", "s": [["IP VPN (MPLS)", "ip-vpn-mpls"], ["Dados L2L P2P", "dados-l2l"], ["Cloud Connect", "cloud-connect"], ["SD-WAN", "sd-wan"]]}, "midia": {"t": "Mídia e entretenimento", "i": "<rect x=\"5\" y=\"9\" width=\"38\" height=\"26\" rx=\"3\"/><path d=\"M20 16v12l10-6zM16 42h16M24 35v7\"/>", "d": "Transmitir conteúdo exige capacidade de rede, baixa latência e conexão direta com quem entrega e consome. A BR.Digital transporta tráfego em alta capacidade e conecta a operação a pontos de troca e plataformas.", "s": [["IP Corp", "ip-corp"], ["Peering Remoto", "peering-remoto"], ["Espectro Óptico DWDM", "espectro-optico-dwdm"], ["Cloud Connect", "cloud-connect"]]}, "mineracao": {"t": "Mineração", "i": "<path d=\"M3 40 18 14l9 14 6-8 12 20zM3 40h42M18 14l4 8-4-2-4 2z\"/>", "d": "Minas e áreas de operação ficam, muitas vezes, longe da infraestrutura convencional. A BR.Digital leva conectividade a locais remotos e liga a operação aos escritórios e centros de controle.", "s": [["Internet Satelital", "internet-satelital"], ["FWA", "fwa"], ["Dados L2L P2P", "dados-l2l"], ["IP VPN (MPLS)", "ip-vpn-mpls"]]}, "saude": {"t": "Saúde", "i": "<path d=\"M24 42C10 32 6 22 6 16a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 6-4 16-18 26zM14 22h6l3-6 4 10 3-4h4\"/>", "d": "Hospitais, clínicas e laboratórios dependem de sistemas sempre disponíveis e de dados protegidos. A BR.Digital oferece conexões seguras entre unidades e camadas de proteção para manter o atendimento em funcionamento.", "s": [["IP VPN (MPLS)", "ip-vpn-mpls"], ["Anti-DDoS", "anti-ddos"], ["Cloud Connect", "cloud-connect"], ["Dados L2L P2P", "dados-l2l"]]}, "financeiro": {"t": "Serviços financeiros", "i": "<path d=\"M4 18 24 6l20 12zM9 22v16M19 22v16M29 22v16M39 22v16M5 42h38\"/>", "d": "Agências, escritórios e centros de dados precisam de disponibilidade e segurança nas transações. A BR.Digital interliga as unidades com links dedicados e adiciona proteção e monitoramento de segurança.", "s": [["Dados L2L P2P", "dados-l2l"], ["Anti-DDoS", "anti-ddos"], ["SOC", "soc"], ["IP VPN (MPLS)", "ip-vpn-mpls"]]}, "varejo": {"t": "Varejo", "i": "<path d=\"M8 16h32l-3 28H11zM17 16a7 7 0 0 1 14 0M17 24a7 7 0 0 0 14 0\"/>", "d": "Lojas, centros de distribuição e e-commerce precisam estar conectados para vender e operar sem interrupção. A BR.Digital integra as unidades e conecta os sistemas à nuvem, com gestão centralizada da rede.", "s": [["SD-WAN", "sd-wan"], ["IP VPN (MPLS)", "ip-vpn-mpls"], ["Cloud Connect", "cloud-connect"], ["IP Corp", "ip-corp"]]}};
        var modal = document.createElement('div');
        modal.className = 'seg-modal';
        modal.hidden = true;
        modal.innerHTML = '<div class="seg-back"></div><div class="seg-panel" role="dialog" aria-modal="true"><button type="button" class="seg-close" aria-label="Fechar">×</button><div class="seg-body"></div></div>';
        document.body.appendChild(modal);
        function closeSeg() { modal.classList.remove('is-open'); setTimeout(function () { modal.hidden = true; }, 220); }
        function openSeg(id) {
            var s = SEG[id]; if (!s) { return; }
            modal.querySelector('.seg-body').innerHTML = '<svg class="seg-big" viewBox="0 0 48 48" aria-hidden="true">' + s.i + '</svg><h3>' + s.t + '</h3><p>' + s.d + '</p><p class="seg-label">Serviços indicados</p><ul class="seg-links">' + s.s.map(function (x) { return '<li><a href="servico-' + x[1] + '.html">' + x[0] + '</a></li>'; }).join('') + '</ul><a class="btn btn-cyan" href="fale-conosco.html">Fale com a BR.Digital</a>';
            modal.hidden = false;
            window.requestAnimationFrame(function () { modal.classList.add('is-open'); });
        }
        [].forEach.call(document.querySelectorAll('.business-sector-grid article'), function (a) {
            var s = SEG[a.id]; if (!s) { return; }
            var n = a.querySelector(':scope > span');
            if (n) { n.className = 'sec-ico'; n.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true">' + s.i + '</svg>'; }
            a.setAttribute('role', 'button'); a.tabIndex = 0;
            a.addEventListener('click', function () { openSeg(a.id); });
            a.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSeg(a.id); } });
        });
        modal.addEventListener('click', function (e) { if (e.target.classList.contains('seg-back') || e.target.classList.contains('seg-close')) { closeSeg(); } });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) { closeSeg(); } });
    }

    var SOLS = {
        corporate: [
            ['IP BGP', 'ip', 'ip-bgp'], ['IP Corp', 'internet', 'ip-corp'], ['Peering Remoto', 'peering', 'peering-remoto'],
            ['Anti-DDoS', 'shield', 'anti-ddos'], ['Espectro Óptico DWDM', 'spectrum', 'espectro-optico-dwdm'],
            ['Dados L2L P2P', 'link', 'dados-l2l'], ['BrStar – Acesso Satelital', 'satellite', 'internet-satelital'],
            ['Fibra Apagada', 'fiber', 'fibra-apagada'], ['Co-location', 'colocation', 'colocation'],
            ['Transporte Multicloud', 'clouds', 'cloud-connect'], ['IP VPN (MPLS)', 'vpn', 'ip-vpn-mpls'],
            ['SD-WAN', 'vpn', 'sd-wan'], ['Fibre Channel', 'channel', 'fibre-channel'],
            ['ADSL - Firstline', 'internet', 'adsl-firstline'], ['FWA', 'satellite', 'fwa'],
            ['Locação de Ativos', 'colocation', 'locacao-de-ativos'], ['Pure Storage', 'channel', 'pure-storage'],
            ['Locação em Torre', 'internet', 'locacao-espaco-torre']
        ],
        provider: [
            ['IP ISP', 'ip', 'ip-isp'], ['IP BGP', 'ip', 'ip-bgp'], ['IP CDN', 'ip', 'ip-cdn'],
            ['IP Corp', 'internet', 'ip-corp'], ['Peering Remoto', 'peering', 'peering-remoto'],
            ['Transporte CIX', 'peering', 'transporte-cix'], ['Transporte PIX', 'peering', 'transporte-pix'],
            ['Dados L2L P2P', 'link', 'dados-l2l'], ['Anti-DDoS', 'shield', 'anti-ddos'],
            ['Espectro Óptico DWDM', 'spectrum', 'espectro-optico-dwdm'],
            ['BrStar – Acesso Satelital', 'satellite', 'internet-satelital'], ['Fibra Apagada', 'fiber', 'fibra-apagada'],
            ['Dutos', 'fiber', 'dutos'], ['Co-location', 'colocation', 'colocation'],
            ['Locação de Ativos', 'colocation', 'locacao-de-ativos'], ['Pure Storage', 'channel', 'pure-storage'],
            ['Locação em Torre', 'internet', 'locacao-espaco-torre'],
            ['Transporte Multicloud', 'clouds', 'cloud-connect'], ['IP VPN (MPLS)', 'vpn', 'ip-vpn-mpls'],
            ['SD-WAN', 'vpn', 'sd-wan'], ['Conexão Burstable (On-Demand)', 'ip', 'ip-bgp', 'modalidades']
        ]
    };
    SOLS.wholesale = [
        ['IP Corp', 'internet', 'ip-corp'], ['Espectro Óptico DWDM', 'spectrum', 'espectro-optico-dwdm'],
        ['Dados L2L P2P', 'link', 'dados-l2l'], ['Anti-DDoS', 'shield', 'anti-ddos'],
        ['Fibra Apagada', 'fiber', 'fibra-apagada'], ['Dutos', 'fiber', 'dutos'],
        ['Fibre Channel', 'channel', 'fibre-channel'], ['IP VPN (MPLS)', 'vpn', 'ip-vpn-mpls'],
        ['Transporte Multicloud', 'clouds', 'cloud-connect'], ['BrStar – Acesso Satelital', 'satellite', 'internet-satelital'],
        ['ADSL - Firstline', 'internet', 'adsl-firstline'], ['FWA', 'satellite', 'fwa'],
        ['Co-location', 'colocation', 'colocation'], ['Locação de Ativos', 'colocation', 'locacao-de-ativos'],
        ['Pure Storage', 'channel', 'pure-storage'], ['Locação em Torre', 'internet', 'locacao-espaco-torre'],
        ['SD-WAN', 'vpn', 'sd-wan']
    ];
    [].forEach.call(document.querySelectorAll('.wholesale-solutions'), function (w) { w.remove(); });
    if (SOLS[page] && !document.querySelector('.sol-block')) {
        var sb = document.createElement('section');
        sb.className = 'sol-block';
        if (!document.getElementById('solucoes')) { sb.id = 'solucoes'; }
        sb.innerHTML = '<div class="wrap"><p class="pres-kicker">Infraestrutura e serviços</p><h2>Soluções para acompanhar a evolução da sua rede.</h2><div class="sol-grid">' + SOLS[page].map(function (p) { return '<article class="sol-link-card">' + ico(p[1]) + '<h3><a href="servico-' + p[2] + '.html' + (p[3] ? '#' + p[3] : '') + '">' + p[0] + '</a></h3></article>'; }).join('') + '</div></div>';
        var anchor = main.querySelector('.std-cta');
        if (anchor) { main.insertBefore(sb, anchor); } else { main.appendChild(sb); }
    }

    var ab2 = document.querySelector('.about-band'); if (ab2) { ab2.id = 'sobre'; }
    if (page === 'nossa-historia' && !document.querySelector('.video')) {
        var vs = document.createElement('div');
        vs.innerHTML = "<section class=\"video\"> <div class=\"wrap\"> <video controls preload=\"none\" poster=\"https://br.digital/img/logo_video.jpg\"> <source src=\"https://br.digital/vid/institucional.mp4\" type=\"video/mp4\"> </video> </div> </section>";
        var tl2 = document.querySelector('.institutional-timeline');
        if (tl2) { tl2.parentNode.insertBefore(vs.firstChild, tl2); } else { main.appendChild(vs.firstChild); }
    }
    var demo = document.getElementById('segment-demo');
    if (demo) {
        var COL = { wholesale: '#e66e25', provider: '#00bfdf', corporate: '#d1304a', governo: '#00a859' }, URL = { wholesale: 'wholesale.html', provider: 'provider.html', corporate: 'corporate.html', governo: 'governo.html' };
        var UN = [].map.call(demo.querySelectorAll('.segment-card'), function (c) { var id = c.getAttribute('data-card'); return { id: id, name: c.querySelector('.segment-name').textContent, lead: c.querySelector('.segment-lead').textContent, desc: c.querySelector('.segment-description').textContent, serves: c.querySelector('.serves p').textContent }; });
        UN.forEach(function (u) { if (u.id === 'provider') { u.lead = 'O mercado de ISPs está em plena expansão no Brasil, e a demanda por internet residencial e empresarial deve crescer ainda mais.'; u.desc = 'Atendemos provedores regionais de acesso à internet (ISP) com alta disponibilidade e baixa latência, com uma robusta infraestrutura física de fibra óptica, fundamental para ampliar o acesso à banda larga.'; } });
        var st = document.createElement('div');
        st.className = 'wrap seg-stage';
        st.innerHTML = '<ul class="seg-list">' + UN.map(function (u) { return '<li><button type="button" class="seg-btn" data-id="' + u.id + '" style="--c:' + COL[u.id] + '"><img src="assets/brand/unit-' + u.id + '.png" alt=""><span>' + u.name + '</span></button></li>'; }).join('') + '</ul><div class="seg-side"><p class="seg-hint">Selecione uma unidade de negócio para ver como a BR.Digital atende o seu mercado.</p><div class="scroll" hidden><div class="scroll-roll l"></div><div class="scroll-body"><div class="scroll-inner"></div></div><div class="scroll-roll r"></div></div></div>';
        demo.replaceWith(st);
        var sc2 = st.querySelector('.scroll'), inner = sc2.querySelector('.scroll-inner'), hint = st.querySelector('.seg-hint'), cur = null, busy = false;
        function fill(u) {
            sc2.style.setProperty('--c', COL[u.id]);
            inner.innerHTML = '<h3>' + u.name + '</h3><div class="seg-cols"><p class="seg-lead">' + u.lead + '</p><p>' + u.desc + '</p></div><div class="seg-foot"><p class="seg-serves"><strong>Atende:</strong> ' + u.serves + '</p><a class="btn btn-cyan" href="' + URL[u.id] + '">Conheça a BR.Digital ' + u.name.charAt(0) + u.name.slice(1).toLowerCase() + '</a></div>';
        }
        function open2() { sc2.classList.remove('closing'); sc2.classList.remove('opening'); void sc2.offsetWidth; sc2.classList.add('opening'); }
        function pick(id) {
            if (id === cur || busy) { return; }
            var u = UN.filter(function (x) { return x.id === id; })[0], was = cur; cur = id;
            [].forEach.call(st.querySelectorAll('.seg-btn'), function (b) { b.classList.toggle('is-on', b.getAttribute('data-id') === id); });
            hint.hidden = true; sc2.hidden = false;
            if (was) { busy = true; sc2.classList.remove('opening'); sc2.classList.add('closing'); setTimeout(function () { fill(u); open2(); busy = false; }, 300); } else { fill(u); open2(); }
        }
        function fit() { var h = 0; sc2.hidden = false; sc2.style.visibility = 'hidden'; inner.style.minHeight = '0'; UN.forEach(function (u) { fill(u); h = Math.max(h, inner.scrollHeight); }); sc2.hidden = !cur; sc2.style.visibility = ''; if (cur) { fill(UN.filter(function (x) { return x.id === cur; })[0]); } inner.style.minHeight = h + 'px'; }
        fit(); window.addEventListener('resize', function () { fit(); });
        [].forEach.call(st.querySelectorAll('.seg-btn'), function (b) { b.addEventListener('click', function () { pick(b.getAttribute('data-id')); }); });
    }
    var fbi = document.querySelector('.footer-custom .footer-brand img');
    if (fbi) { fbi.src = 'assets/brand/logo-brdigital-negative.png'; }
    var fcols = document.querySelector('.footer-custom .footer-columns');
    if (fcols) {
        if (!fcols.querySelector('.foot-svc')) {
            var fs = document.createElement('div');
            fs.className = 'footer-column foot-svc';
            fs.innerHTML = '<h4>Serviços</h4><ul><li><a href="servicos.html#conectividade">Conectividade</a></li><li><a href="servicos.html#data-center">Data Center</a></li><li><a href="servicos.html#internet">Internet</a></li><li><a href="servicos.html#seguranca">Segurança</a></li><li><a href="servicos.html#br-cloud">BR Cloud</a></li><li><a href="servicos.html#infra-digital">Infra Digital</a></li></ul>';
            fcols.insertBefore(fs, fcols.children[2] || null);
        }
        [].forEach.call(fcols.querySelectorAll('.footer-column'), function (c) { var h = c.querySelector('h4'); if (h && h.textContent.trim() === 'Contato') { c.querySelector('ul').innerHTML = '<li><a href="fale-conosco.html">Fale conosco</a></li><li><a href="trabalhe-conosco.html">Trabalhe conosco</a></li><li><a href="denuncia.html">Denúncia</a></li>'; } });
    }
    if (page === 'data-centers') { [].forEach.call(document.querySelectorAll('main h1'), function (h) { if (/^\s*Data ?centers?\s*$/i.test(h.textContent)) { h.textContent = 'Infraestrutura'; } }); document.title = 'Infraestrutura | BR.Digital Telecom'; }
    if (page === 'governo') {
        var GM = [['wave', 'espectro-optico-dwdm'], ['espectro', 'espectro-optico-dwdm'], ['fiber channel', 'fibre-channel'], ['trânsito', 'ip-bgp'], ['internet dedicada', 'ip-corp'], ['peering', 'peering-remoto'], ['co-location', 'colocation'], ['ddos', 'anti-ddos'], ['fibra', 'fibra-apagada'], ['multicloud', 'cloud-connect'], ['l2l', 'dados-l2l'], ['vpn', 'ip-vpn-mpls'], ['gateway', 'internet-satelital'], ['satélite', 'internet-satelital']];
        [].forEach.call(document.querySelectorAll('.government-solution'), function (li) {
            var sp = li.querySelector('.government-solution-meta > span'); if (sp) { sp.remove(); }
            var t = li.textContent.toLowerCase();
            for (var k = 0; k < GM.length; k++) { if (t.indexOf(GM[k][0]) > -1) { li.setAttribute('data-href', 'servico-' + GM[k][1] + '.html'); li.setAttribute('role', 'link'); li.tabIndex = 0; break; } }
            li.addEventListener('click', function () { var h = li.getAttribute('data-href'); if (h) { window.location.href = h; } });
        });
    }
    if (nav) {
        var ct = [].slice.call(nav.children).filter(function (li) { var a = li.querySelector(':scope > a'); return a && /^\s*Contato\s*$/.test(a.textContent); })[0];
        if (ct) {
            ct.innerHTML = '<button class="top" type="button">Contato</button><ul class="drop"><li><a href="fale-conosco.html">Fale conosco</a></li><li><a href="trabalhe-conosco.html">Trabalhe conosco</a></li><li><a href="denuncia.html">Denúncia</a></li></ul>';
        }
    }
    document.body.classList.add('page-' + page);
    if (page === 'data-centers') { keepOnly(/Sua operação merece/); }
    if (page === 'visao') { keepOnly(/Vamos encontrar a solução certa/); }
    var BASE = { corporate: ['Segurança', 'Disponibilidade', 'Personalização'], provider: ['Capilaridade', 'Baixa latência', 'Banda larga'], governo: ['Gestão pública', 'Segurança da informação', 'Serviços essenciais'] };
    var bh = document.querySelector('.business-hero');
    if (bh && BASE[page] && !bh.querySelector('.wholesale-hero-base')) {
        var bd = document.createElement('div'); bd.className = 'wrap wholesale-hero-base';
        bd.innerHTML = BASE[page].map(function (x) { return '<span>' + x + '</span>'; }).join('<i></i>');
        bh.appendChild(bd);
    }
    if (page === 'visao') {
        var vg = document.querySelector('.vision-principle-grid');
        if (vg && !document.querySelector('.values4')) {
            var old = vg.querySelector('.vision-principle--values'); if (old) { old.remove(); }
            var v4 = document.createElement('div'); v4.className = 'values4';
            var VC = ['#e66e25', '#00bfdf', '#d1304a', '#00a859'], VN = ['Comprometimento', 'Excelência', 'Flexibilidade', 'Resultado'];
            v4.innerHTML = VN.map(function (n, k) { return '<article class="value4" style="--c:' + VC[k] + '"><span>0' + (k + 1) + ' · VALOR</span><h3>' + n + '</h3></article>'; }).join('');
            vg.parentNode.appendChild(v4);
        }
    }
    if (page === 'nossa-historia') {
        var gl = document.querySelector('.institutional-timeline-grid');
        if (gl) { [].forEach.call(gl.querySelectorAll('li'), function (li) { if (li.querySelector('strong')) { li.innerHTML = '<span>2026</span><h3>O presente</h3><p>Como Grupo BR.Digital, trabalhamos para ser uma alternativa eficiente para o desenvolvimento tecnológico da América Latina.</p>'; } }); }
    }
    document.documentElement.classList.add('js-reveal');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.1 });
        [].forEach.call(document.querySelectorAll('main > section, footer'), function (s, k) { if (k === 0) { return; } s.classList.add('rv'); io.observe(s); });
    }
    window.requestAnimationFrame(function () { window.requestAnimationFrame(function () { document.documentElement.classList.remove('is-loading'); }); });
    if ('IntersectionObserver' in window) {
        var RVC = '.svc-card,.svc-feat,.sol-grid article,.value4,.business-sector-grid article,.dc-platform-card,.blurb,.vision-principle,.institutional-timeline-grid li,.home-proof-grid article,.dc-proof-grid article,.net-stats li,.pres-stats li,.seg-btn';
        var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { var el = e.target; el.classList.add('in'); io2.unobserve(el); setTimeout(function () { el.classList.remove('rvc'); }, 1000); } }); }, { threshold: 0.08 });
        [].forEach.call(document.querySelectorAll(RVC), function (el) { var ix = [].indexOf.call(el.parentNode.children, el); el.style.transitionDelay = Math.min(ix * 70, 420) + 'ms'; el.classList.add('rvc'); io2.observe(el); });
    }
    if (['wholesale', 'corporate', 'provider'].indexOf(page) > -1) {
        var old2 = document.querySelector('.sol-block');
        if (old2 && SOLS[page]) {
            var GPH = { wholesale: 'Portfólio específico para Carriers e OTTs, com infraestrutura robusta e soluções escaláveis.', corporate: 'Soluções personalizadas, com alto desempenho e confiabilidade, para os desafios do mercado corporativo.', provider: 'Condições de expansão e competitividade para provedores, com a melhor conexão para os usuários finais.' };
            var gp = document.createElement('section'); gp.className = 'gp'; gp.id = 'solucoes';
            gp.innerHTML = '<div class="wrap"><div class="gp-head"><p class="pres-kicker">Infraestrutura e serviços</p><h2>Soluções para acompanhar a evolução da sua rede.</h2><p>' + GPH[page] + '</p></div><ul class="gp-grid">' + SOLS[page].map(function (p) { return '<li class="gp-card"><a href="servico-' + p[2] + '.html' + (p[3] ? '#' + p[3] : '') + '">' + ico(p[1]).replace('sol-icon', 'gp-icon') + '<h3>' + p[0] + '</h3></a></li>'; }).join('') + '</ul></div>';
            old2.parentNode.replaceChild(gp, old2);
        }
    }

    if (page === 'visao') {
        var vg2 = document.querySelector('.vision-principle-grid');
        [].forEach.call(document.querySelectorAll('.values4'), function (e) { e.remove(); });
        if (vg2 && !document.querySelector('.vision-board')) {
            var host = vg2.parentNode; vg2.remove();
            var VC2 = ['#e66e25', '#00bfdf', '#d1304a', '#00a859'], VN2 = ['Comprometimento', 'Excelência', 'Flexibilidade', 'Resultado'];
            var vb = document.createElement('div'); vb.className = 'vision-board';
            vb.innerHTML = '<div class="vb-top"><article class="vb-card"><span>VISÃO</span><h3>Ser referência.</h3><p>Ser referência de comprometimento e qualidade no mercado global de telecomunicações.</p></article><article class="vb-card"><span>MISSÃO</span><h3>Entregar excelência.</h3><p>Disponibilizar soluções de alta performance ao mercado de telecomunicações, aplicando recursos estruturais e humanos em padrões de excelência.</p></article></div><div class="vb-values">' + VN2.map(function (n, k) { return '<article class="value4" style="--c:' + VC2[k] + '"><span>VALOR</span><h3>' + n + '</h3></article>'; }).join('') + '</div>';
            host.appendChild(vb);
        }
    }

    if (page === 'index') {
        var bands = [].slice.call(document.querySelectorAll('main .band')).filter(function (b) { return !b.classList.contains('hero'); });
        var eqBands = function () { bands.forEach(function (b) { b.style.setProperty('min-height', '0', 'important'); }); var h = Math.max.apply(null, bands.map(function (b) { return b.offsetHeight; })); bands.forEach(function (b) { b.style.setProperty('min-height', h + 'px', 'important'); }); };
        window.addEventListener('load', function () { setTimeout(eqBands, 200); }); window.addEventListener('resize', eqBands);
    }

    /* ===== Ícones oficiais dos produtos: PNG recolorido conforme a cor do ícone em cada contexto ===== */
    (function () {
        var ARQ = { fiber: 'fibra-apagada', clouds: 'cloud-connect', vpn: 'ip-vpn-sdwan', wave: 'wave', internet: 'internet-dedicada', ip: 'ip-bgp', peering: 'peering-remoto', shield: 'ddos', link: 'l2l', satellite: 'satelite', colocation: 'colocation', infra: 'infra-digital' };
        var PAL = { blue: [61, 155, 233], orange: [230, 110, 37], wine: [209, 48, 74], cyan: [0, 191, 223], green: [0, 168, 89], white: [255, 255, 255] };
        function variante(el) {
            var c = getComputedStyle(el), s = (c.stroke && c.stroke !== 'none') ? c.stroke : c.color, m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(s);
            if (!m) { return 'blue'; }
            var best = 'blue', bd = 1e9;
            Object.keys(PAL).forEach(function (k) { var d = Math.pow(PAL[k][0] - m[1], 2) + Math.pow(PAL[k][1] - m[2], 2) + Math.pow(PAL[k][2] - m[3], 2); if (d < bd) { bd = d; best = k; } });
            return best;
        }
        function nome(svg) {
            var u = svg.querySelector('use');
            if (u) { var h = u.getAttribute('href') || u.getAttribute('xlink:href') || '', m = /icon-(\w+)$/.exec(h); if (m) { return m[1]; } }
            return svg.getAttribute('data-ico');
        }
        /* Página de serviço sem imagem: ícone do serviço (catálogo) */
        var slug = page.replace(/^servico-/, '');
        if (page === 'servico-br-cloud') {
            var cloudMark = document.querySelector('.svc-mark');
            if (cloudMark) {
                cloudMark.classList.add('br-cloud-mark');
                cloudMark.innerHTML = '<img src="assets/servicos/br-cloud-logo.svg" alt="brCloud" width="1533" height="338">';
            }
        }
        if (page === 'servico-noc-ng-broker') {
            var nocMark = document.querySelector('.svc-mark');
            var nocHero = document.querySelector('.svc-hero-in');
            if (nocMark) { nocMark.remove(); }
            if (nocHero) { nocHero.classList.add('svc-hero-no-mark'); }
        }
        CATALOG.forEach(function (c) {
            c[1].forEach(function (p) {
                if (p[1] !== slug) { return; }
                if (c[0] === 'Infra Digital') {
                    var contact = document.querySelector('.svc-hero .actions .btn-cyan');
                    if (contact) {
                        contact.textContent = 'Fale com a Infra digital';
                        contact.href = 'https://www.infradigital.com.br/#';
                    }
                    return;
                }
                if (!p[2]) {
                    [].forEach.call(document.querySelectorAll('.svc-mark'), function (mark) { mark.remove(); });
                    return;
                }
                [].forEach.call(document.querySelectorAll('.svc-mark svg'), function (s) { s.setAttribute('data-ico', p[2]); });
            });
        });
        [].slice.call(document.querySelectorAll('svg')).forEach(function (svg) {
            var n = nome(svg); if (!n || !ARQ[n]) { return; }
            var r = svg.getBoundingClientRect(), cs = getComputedStyle(svg);
            var w = r.width || parseFloat(cs.width) || 0, h = r.height || parseFloat(cs.height) || 0;
            var img = document.createElement('img');
            img.src = n === 'infra' ? 'assets/icons/infra-digital.svg' : 'assets/icons/' + variante(svg) + '/' + ARQ[n] + '.png';
            img.alt = '';
            img.className = (svg.getAttribute('class') || '') + ' ic-img';
            img.style.width = (w || 26) + 'px'; img.style.height = (h || 26) + 'px';
            svg.parentNode.replaceChild(img, svg);
        });
    })();
})();
