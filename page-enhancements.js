(function () {
    var pageName = window.location.pathname.split('/').pop().toLowerCase();
    var brandSubpages = ['nossa-historia.html', 'seguranca.html', 'visao.html'];
    var footer = document.querySelector('.site-footer');

    function normalizeHeader() {
        var menu = document.querySelector('.site-header .nav');
        if (!menu) {
            return;
        }

        menu.querySelectorAll('.drop a[href="https://br.digital/governo"]').forEach(function (link) {
            link.closest('li').remove();
        });

        var corporateButton = menu.querySelector(':scope > li > button.top.corporate');
        if (corporateButton) {
            var corporateLink = document.createElement('a');
            corporateLink.className = 'corporate';
            corporateLink.href = 'corporate.html';
            corporateLink.textContent = 'Corporate';
            if (pageName === 'corporate.html') {
                corporateLink.setAttribute('aria-current', 'page');
            }
            corporateButton.closest('li').replaceChild(corporateLink, corporateButton);
            var corporateDropdown = corporateLink.parentElement.querySelector(':scope > .drop');
            if (corporateDropdown) {
                corporateDropdown.remove();
            }
        }

        var providerLink = menu.querySelector('a.provider');
        if (providerLink) {
            providerLink.href = 'provider.html';
            if (pageName === 'provider.html') {
                providerLink.setAttribute('aria-current', 'page');
            }
        }

        var internalRoutes = {
            'https://br.digital/provider': 'provider.html',
            'https://br.digital/corporate': 'corporate.html',
            'https://br.digital/agronegocio': 'corporate.html#agronegocio',
            'https://br.digital/educacao': 'corporate.html#educacao',
            'https://br.digital/energia': 'corporate.html#energia',
            'https://br.digital/industria': 'corporate.html#industria',
            'https://br.digital/midia-e-entretenimento': 'corporate.html#midia',
            'https://br.digital/mineracao': 'corporate.html#mineracao',
            'https://br.digital/saude': 'corporate.html#saude',
            'https://br.digital/servicos-financeiros': 'corporate.html#financeiro',
            'https://br.digital/varejo': 'corporate.html#varejo',
            'https://br.digital/governo': 'governo.html',
            'https://br.digital/privacy': 'politicas.html#privacidade',
            'https://br.digital/cookies': 'politicas.html#cookies'
        };
        document.querySelectorAll('a[href]').forEach(function (link) {
            var destination = internalRoutes[link.getAttribute('href')];
            if (destination) {
                link.href = destination;
            }
        });

        if (!menu.querySelector('a.government, a[href="governo.html"]')) {
            var wholesale = menu.querySelector('a.wholesale');
            if (wholesale) {
                var governmentItem = document.createElement('li');
                var governmentLink = document.createElement('a');
                governmentLink.className = 'government';
                governmentLink.href = 'governo.html';
                governmentLink.textContent = 'Governo';
                if (pageName === 'governo.html') {
                    governmentLink.setAttribute('aria-current', 'page');
                }
                governmentItem.appendChild(governmentLink);
                wholesale.closest('li').insertAdjacentElement('afterend', governmentItem);
            }
        }

        var businessUnits = [
            { selector: 'a.wholesale', label: 'Wholesale', href: 'wholesale.html', className: 'wholesale' },
            { selector: 'a.government, a[href="governo.html"]', label: 'Governo', href: 'governo.html', className: 'government' },
            { selector: 'a.corporate', label: 'Corporate', href: 'corporate.html', className: 'corporate' },
            { selector: 'a.provider', label: 'Provider', href: 'provider.html', className: 'provider' }
        ];
        var existingBusinessLinks = businessUnits.map(function (unit) {
            return menu.querySelector(unit.selector);
        });
        var firstBusinessItem = existingBusinessLinks.filter(Boolean)[0];
        if (firstBusinessItem && !menu.querySelector('.business-menu')) {
            var businessItem = document.createElement('li');
            businessItem.className = 'business-menu';
            var businessButton = document.createElement('button');
            businessButton.className = 'top';
            businessButton.type = 'button';
            businessButton.textContent = 'Negócios';
            businessItem.appendChild(businessButton);

            var businessDropdown = document.createElement('ul');
            businessDropdown.className = 'drop business-drop';
            businessUnits.forEach(function (unit, index) {
                var existingLink = existingBusinessLinks[index];
                var listItem = document.createElement('li');
                var link = document.createElement('a');
                link.className = unit.className;
                link.href = unit.href;
                link.textContent = unit.label;
                if (pageName === unit.href) {
                    link.setAttribute('aria-current', 'page');
                } else if (existingLink && existingLink.hasAttribute('aria-current')) {
                    link.setAttribute('aria-current', 'page');
                }
                listItem.appendChild(link);
                businessDropdown.appendChild(listItem);
            });
            businessItem.appendChild(businessDropdown);
            firstBusinessItem.closest('li').insertAdjacentElement('beforebegin', businessItem);
            existingBusinessLinks.forEach(function (link) {
                if (link) {
                    link.closest('li').remove();
                }
            });
        }

        document.querySelectorAll('.site-header .nav a[href*="/support"], .site-header .nav a[href*="/denuncias"], .site-header .nav a[href*="/requisicao-lgpd"]').forEach(function (link) {
            link.closest('li') ? link.closest('li').remove() : link.remove();
        });

        var contactItem = Array.prototype.find.call(menu.children, function (item) {
            var control = item.querySelector(':scope > button.top, :scope > a.top');
            return control && /^(?:Fale conosco|Contato)$/.test(control.textContent.trim());
        });
        if (contactItem) {
            var contactLink = contactItem.querySelector(':scope > a.top');
            if (!contactLink) {
                contactLink = document.createElement('a');
                contactLink.className = 'top';
                contactLink.href = 'fale-conosco.html';
                contactLink.textContent = 'Contato';
                contactItem.replaceChild(contactLink, contactItem.querySelector(':scope > button.top'));
            }
            var contactMenu = contactItem.querySelector(':scope > .drop');
            if (contactMenu) {
                contactMenu.remove();
            }
        }

        var selector = menu.querySelector('.language-selector');
        if (!selector) {
            var languageItem = menu.querySelector('.lang');
            if (languageItem) {
                selector = languageItem;
                selector.className = 'language-selector';
            } else {
                selector = document.createElement('li');
                selector.className = 'language-selector';
                menu.appendChild(selector);
            }
        }
        if (!selector.querySelector('select[data-language]')) {
            selector.innerHTML = '<label class="language-label"><span class="sr-only">Idioma</span><select data-language aria-label="Idioma"><option value="pt">Português</option><option value="en">English</option><option value="es">Español</option></select></label>';
        }
    }

    function addHomeProof() {
        var hero = document.querySelector('main#main > .hero');
        if (!hero || document.querySelector('.home-proof')) {
            return;
        }

        var proof = document.createElement('section');
        proof.className = 'home-proof';
        proof.setAttribute('aria-label', 'Presença e experiência BR.Digital');
        proof.innerHTML = `
            <div class="wrap home-proof-grid">
                <article><strong>Desde 1995</strong><span>experiência em tecnologia de comunicação</span></article>
                <article><strong>90% do PIB</strong><span>abrangido pela nossa malha de conectividade</span></article>
                <article><strong>11 data centers</strong><span>conectados à malha BR.Digital</span></article>
            </div>`;
        hero.insertAdjacentElement('afterend', proof);
    }

    function addHomeProductTrack() {
        var hero = document.querySelector('main#main > .hero');
        if (!hero || document.querySelector('.home-product-track')) {
            return;
        }

        var track = document.createElement('section');
        track.className = 'home-product-track';
        track.setAttribute('aria-labelledby', 'home-products-title');
        track.innerHTML = `
            <div class="wrap home-product-heading">
                <p class="product-kicker">Infraestrutura e conectividade</p>
                <h2 id="home-products-title">Soluções que mantêm o Brasil conectado.</h2>
            </div>
            <svg class="home-product-icons" aria-hidden="true" focusable="false">
                <symbol id="home-icon-ip" viewBox="0 0 48 48"><circle cx="21" cy="21" r="16"/><path d="M5 21h32M21 5c-9 9-9 23 0 32M21 5c9 9 9 23 0 32"/><circle cx="35" cy="35" r="9"/><g stroke-width=".9"><path d="M29 32v6h2a1.5 1.5 0 0 0 0-3h-2m2 0a1.5 1.5 0 0 0 0-3h-2"/><path d="M38.2 33.4a2.4 2.4 0 1 0 0 3.2v-1.3H37"/><path d="M40 38v-6h1.3a1.5 1.5 0 0 1 0 3H40"/></g></symbol>
                <symbol id="home-icon-internet" viewBox="0 0 48 48"><path d="M9 42V6h18v36M27 18h13v24M4 42h40"/><path d="M13 11h1m3 0h1m3 0h1M13 16h1m3 0h1m3 0h1M13 21h1m3 0h1m3 0h1M13 26h1m3 0h1m3 0h1M13 31h1m3 0h1m3 0h1M13 36h1m3 0h1m3 0h1M31 24h6M31 28h6M31 32h6M31 36h6"/></symbol>
                <symbol id="home-icon-peering" viewBox="0 0 48 48"><path d="M27 9A17 17 0 0 0 8 29M33 9A17 17 0 0 1 41 30"/><circle cx="30" cy="7" r="3"/><circle cx="7" cy="32" r="3"/><circle cx="41" cy="33" r="3"/><path d="M20 20v8M25 20l6 8m0-8-6 8"/></symbol>
                <symbol id="home-icon-shield" viewBox="0 0 48 48"><path d="M24 4 40 9v13c0 10-7 17-16 22-9-5-16-12-16-22V9Z"/><g stroke-width="1.1"><path d="M13 21v7h1.8a3.5 3.5 0 0 0 0-7zM20 21v7h1.8a3.5 3.5 0 0 0 0-7z"/><circle cx="29.5" cy="26" r="1.8"/><path d="M37 23.2c-.8-1-3.3-1-3.3.6 0 1.8 3.8 1 3.8 2.8 0 1.5-2.9 1.6-3.9.3"/></g></symbol>
                <symbol id="home-icon-wave" viewBox="0 0 48 48"><path d="M5 5C8 5 8 43 11 43S14 5 17 5 20 43 23 43 26 5 29 5 32 43 35 43 38 5 41 5"/></symbol>
                <symbol id="home-icon-link" viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" rx="2"/><path d="M12 12h24v19h-6v5H18v-5h-6z"/><path stroke-width="3" d="M17 17h1m4 0h1m4 0h1m4 0h1"/></symbol>
                <symbol id="home-icon-satellite" viewBox="0 0 48 48"><path d="M5 14 27 6l6 13-22 8Z"/><path d="M22 23v6m0 0-10 12m10-12 10 12"/><path d="M33 4a11 11 0 0 1 11 11M33 9a6 6 0 0 1 6 6"/></symbol>
                <symbol id="home-icon-fiber" viewBox="0 0 48 48"><path d="M12 7h14M12 41h14M12 7c-4 0-6 8-6 17s2 17 6 17"/><path d="M26 7c-4 0-6 8-6 17s2 17 6 17"/><path d="M22 17h11M22 24h13M22 31h11"/><circle cx="36" cy="17" r="3"/><circle cx="38" cy="24" r="3"/><circle cx="36" cy="31" r="3"/></symbol>
                <symbol id="home-icon-spectrum" viewBox="0 0 48 48"><path d="M12 6h3c7 0 9 11 13 22 3 8 6 14 13 14"/><path d="M23 24 10 42"/></symbol>
                <symbol id="home-icon-colocation" viewBox="0 0 48 48"><path d="M5 10 27 5v37L5 38Z"/><path d="M27 12h14v29H27M31 15v23M5 16l22-4M5 22l22-4M5 28l22-4M5 34l22-4M11 8.5v30M17 7v33M22 6v35"/></symbol>
                <symbol id="home-icon-cloud" viewBox="0 0 32 32"><path d="M9 24h15a6 6 0 0 0 .5-12A9 9 0 0 0 7 13a5.5 5.5 0 0 0 2 11Z"/><path d="M16 18v9m-4-4 4 4 4-4"/></symbol>
                <symbol id="home-icon-vpn" viewBox="0 0 48 48"><path d="M9 40h24a8 8 0 0 0 1-16 12 12 0 0 0-22 2 7.5 7.5 0 0 0-3 14Z"/><circle cx="34" cy="13" r="8"/><g stroke-width=".9"><path d="M28.5 10.5l2 5 2-5M33.8 15.5v-5h1.3a1.4 1.4 0 0 1 0 2.8h-1.3M37.3 15.5v-5l3 5v-5"/></g></symbol>
                <symbol id="home-icon-channel" viewBox="0 0 48 48"><rect x="2" y="8" width="17" height="30" rx="1"/><rect x="29" y="8" width="17" height="30" rx="1"/><path d="M2 18h17M2 28h17M29 18h17M29 28h17M6 13h.1m3 0h6M6 23h.1m3 0h6M6 33h.1m3 0h6M33 13h.1m3 0h6M33 23h.1m3 0h6M33 33h.1m3 0h6M22 23h.1m2.5 0h.1m2.5 0h.1"/></symbol>
                <symbol id="home-icon-clouds" viewBox="0 0 48 48"><path d="M10 28h27a8 8 0 0 0 0-16 11 11 0 0 0-21-2 9 9 0 0 0-6 18Z"/><circle cx="14" cy="35" r="2.5"/><circle cx="24" cy="35" r="2.5"/><circle cx="34" cy="35" r="2.5"/><path d="M14 28v4.5M24 28v4.5M34 28v4.5M14 37.5v5.5h20v-5.5M24 37.5V43"/></symbol>
            </svg>
            <div class="home-product-window">
                <div class="home-product-marquee">
                    <ul class="home-product-list">
                        <li><svg aria-hidden="true"><use href="#home-icon-wave"></use></svg><span>Wave</span></li>
                        <li><svg aria-hidden="true"><use href="#home-icon-spectrum"></use></svg><span>Espectro</span></li>
                        <li><svg aria-hidden="true"><use href="#home-icon-channel"></use></svg><span>Fiber Channel</span></li>
                        <li><svg aria-hidden="true"><use href="#home-icon-ip"></use></svg><span>Trânsito IP</span></li>
                        <li><svg aria-hidden="true"><use href="#home-icon-internet"></use></svg><span>Internet dedicada</span></li>
                        <li><svg aria-hidden="true"><use href="#home-icon-peering"></use></svg><span>Peering remoto</span></li>
                        <li><svg aria-hidden="true"><use href="#home-icon-colocation"></use></svg><span>Co-location</span></li>
                        <li><svg aria-hidden="true"><use href="#home-icon-shield"></use></svg><span>Mitigação de DDoS</span></li>
                        <li><svg aria-hidden="true"><use href="#home-icon-fiber"></use></svg><span>Fibra apagada</span></li>
                        <li><svg aria-hidden="true"><use href="#home-icon-clouds"></use></svg><span>Multicloud</span></li>
                        <li><svg aria-hidden="true"><use href="#home-icon-link"></use></svg><span>L2L</span></li>
                        <li><svg aria-hidden="true"><use href="#home-icon-vpn"></use></svg><span>IP-VPN + SD-WAN</span></li>
                        <li><svg aria-hidden="true"><use href="#home-icon-satellite"></use></svg><span>Acesso via Satélite</span></li>
                    </ul>
                    <ul class="home-product-list" aria-hidden="true">
                        <li><svg><use href="#home-icon-wave"></use></svg><span>Wave</span></li>
                        <li><svg><use href="#home-icon-spectrum"></use></svg><span>Espectro</span></li>
                        <li><svg><use href="#home-icon-channel"></use></svg><span>Fiber Channel</span></li>
                        <li><svg><use href="#home-icon-ip"></use></svg><span>Trânsito IP</span></li>
                        <li><svg><use href="#home-icon-internet"></use></svg><span>Internet dedicada</span></li>
                        <li><svg><use href="#home-icon-peering"></use></svg><span>Peering remoto</span></li>
                        <li><svg><use href="#home-icon-colocation"></use></svg><span>Co-location</span></li>
                        <li><svg><use href="#home-icon-shield"></use></svg><span>Mitigação de DDoS</span></li>
                        <li><svg><use href="#home-icon-fiber"></use></svg><span>Fibra apagada</span></li>
                        <li><svg><use href="#home-icon-clouds"></use></svg><span>Multicloud</span></li>
                        <li><svg><use href="#home-icon-link"></use></svg><span>L2L</span></li>
                        <li><svg><use href="#home-icon-vpn"></use></svg><span>IP-VPN + SD-WAN</span></li>
                        <li><svg><use href="#home-icon-satellite"></use></svg><span>Acesso via Satélite</span></li>
                    </ul>
                </div>
            </div>`;
        var insertionPoint = hero.nextElementSibling;
        if (insertionPoint && insertionPoint.classList.contains('home-proof')) {
            insertionPoint.insertAdjacentElement('afterend', track);
        } else {
            hero.insertAdjacentElement('afterend', track);
        }
        setupHomeProductLoop(track);
    }

    /* Esteira em loop contínuo: o deslocamento é exatamente a distância entre duas cópias
       da lista (não mais -50%), e há cópias suficientes para telas largas nunca ficarem vazias. */
    function setupHomeProductLoop(track) {
        var marquee = track.querySelector('.home-product-marquee');
        if (!marquee) {
            return;
        }

        function update() {
            var lists = marquee.querySelectorAll('.home-product-list');
            if (lists.length < 2) {
                return;
            }
            var shift = lists[1].getBoundingClientRect().left - lists[0].getBoundingClientRect().left;
            if (!(shift > 0)) {
                return;
            }
            var needed = Math.ceil(window.innerWidth / shift) + 1;
            while (marquee.querySelectorAll('.home-product-list').length < needed) {
                var all = marquee.querySelectorAll('.home-product-list');
                var copy = all[all.length - 1].cloneNode(true);
                copy.setAttribute('aria-hidden', 'true');
                [].forEach.call(copy.querySelectorAll('li'), function (li) { li.tabIndex = -1; });
                marquee.appendChild(copy);
            }
            marquee.style.setProperty('--marquee-shift', shift + 'px');
            marquee.style.setProperty('--marquee-duration', (shift / 49).toFixed(1) + 's');
        }

        update();
        var timer;
        window.addEventListener('resize', function () {
            clearTimeout(timer);
            timer = setTimeout(update, 150);
        });
    }

    function updateHomeSegmentDescriptions() {
        var descriptions = {
            wholesale: {
                lead: 'As redes de fibra óptica que conferem excelência e permitem a ampliação da cobertura para operadoras de telecomunicações e serviços de OTTs (Over-The-Top) têm que estar preparadas para garantir altíssima capacidade de transporte de dados, baixa latência e segurança na conexão.',
                description: 'A BR.Digital Wholesale é responsável pelo atendimento das operadoras de telecomunicações nacionais e internacionais além das grandes empresas do mercado de mídia de streaming nacionais e internacionais, as chamadas OTTs.',
                audience: 'Operadoras de telecomunicações, OTTs e empresas nacionais e internacionais de mídia e streaming.'
            },
            corporate: {
                lead: 'Atendemos às demandas estratégicas de TI e de Telecom em transporte de dados.',
                description: 'Desenvolvemos projetos que integram inteligência em tecnologias digitais e estrutura de ótimo desempenho e confiabilidade, com alto grau de personalização ao seu problema específico.',
                audience: 'Empresas que precisam integrar TI, Telecom e transporte de dados às suas operações.'
            },
            provider: {
                lead: 'O mercado de Internet Service Providers (ISPs) está em plena expansão no Brasil. E a grande demanda por internet residencial e empresarial deve crescer ainda mais nos próximos anos.',
                description: 'Por esse motivo, os ISPs que buscam se diferenciar no mercado devem apostar cada vez mais na qualidade das conexões e em uma malha de fibra óptica com grande capilaridade que permita a expansão dos serviços. Através da BR.Digital Provider, atendemos ao mercado dos provedores regionais de acesso à internet (ISP) com alta disponibilidade e baixa latência, fornecendo uma robusta infraestrutura física de redes de fibra óptica, fundamental para a ampliação do acesso aos serviços de banda larga.',
                audience: 'Provedores regionais de acesso à internet (ISPs).'
            },
            governo: {
                lead: 'Governo prioriza nas negociações: qualidade, credibilidade, parcerias estratégicas e soluções personalizadas para atender às demandas específicas de cada órgão.',
                description: 'A BR.Digital oferece diversas soluções integradas e seguras de comunicação, atendendo a diversos segmentos como Órgãos e Entidades: Federais, Estaduais, Municipais, Distritais, incluindo Paraestatais como o Sistema S.',
                audience: 'Órgãos e entidades federais, estaduais, municipais e distritais, além de paraestatais como o Sistema S.'
            }
        };

        Object.keys(descriptions).forEach(function (segmentName) {
            var card = document.querySelector('.segment-card.' + segmentName);
            var copy = descriptions[segmentName];
            if (!card) {
                return;
            }

            var lead = card.querySelector('.segment-lead');
            var description = card.querySelector('.segment-description');
            var audience = card.querySelector('.serves p');
            if (lead) {
                lead.textContent = copy.lead;
            }
            if (description) {
                description.textContent = copy.description;
            }
            if (audience) {
                audience.textContent = copy.audience;
            }
        });
    }

    function rebuildInstitutionalPages() {
        var main = document.querySelector('main#main');
        if (!main) {
            return;
        }

        if (pageName === 'nossa-historia.html') {
            document.body.classList.add('institutional-page', 'history-page');
            main.innerHTML = `
                <section class="institutional-hero history-hero">
                    <div class="wrap institutional-hero-grid">
                        <div><p class="institutional-kicker">Desde 1995 · Porto Alegre, Brasil</p><h1>Conectando caminhos.<br><em>Transformando possibilidades.</em></h1><p>Uma trajetória construída em tecnologia de comunicação, fibra óptica e transporte de dados, sempre próxima das necessidades de quem confia na nossa rede.</p></div>
                        <aside class="institutional-hero-note"><span>BR.Digital</span><strong>Mais de 30 anos</strong><p>de experiência em conectividade e infraestrutura digital.</p></aside>
                    </div>
                </section>
                <section class="institutional-story">
                    <div class="wrap institutional-story-grid"><p class="institutional-kicker">Nossa história</p><h2>Tecnologia como meio.<br><em>Pessoas como propósito.</em></h2><div><p>Desde 1995, construímos experiência em cabeamento óptico e transporte de dados de alta capacidade. Ao longo desse caminho, acompanhamos a transformação digital de empresas, serviços e da sociedade.</p><p>Acreditamos que a tecnologia tem valor quando aproxima pessoas, simplifica operações e ajuda ideias a chegarem mais longe.</p></div></div>
                </section>
                <section class="institutional-timeline"><div class="wrap"><div class="institutional-section-heading"><p class="institutional-kicker">Uma jornada em movimento</p><h2>Marcos da nossa trajetória.</h2></div><ol class="institutional-timeline-grid">
                    <li><span>1995</span><h3>O início</h3><p>A Compuline, sediada em Porto Alegre, entra no mercado de telecomunicações.</p></li>
                    <li><span>2002</span><h3>Uma nova divisão</h3><p>Surge a Brasil Digital Telecom para atender o mercado corporativo.</p></li>
                    <li><span>2004</span><h3>Expansão</h3><p>O Grupo Compuline amplia sua rede metropolitana nas principais cidades do Brasil.</p></li>
                    <li><span>2009</span><h3>Referência em Last Mile</h3><p>O grupo BR.Digital se consolida no sul do Brasil.</p></li>
                    <li><span>2012</span><h3>Novas conexões</h3><p>Início de negócios com transportadoras de dados e empresas internacionais.</p></li>
                    <li><span>2014</span><h3>Consolidação</h3><p>Expansão dos serviços Last Mile e Backbone para Wholesale.</p></li>
                    <li><span>2016</span><h3>Novas unidades</h3><p>Integração de empresas em duas unidades: BRRotas e CODigital.</p></li>
                    <li><span>2020</span><h3>Uma nova marca</h3><p>BRFibra se reposiciona como BR.Digital Telecom, com Wholesale, Corporate e Provider.</p></li>
                </ol></div></section>
                <section class="institutional-cta"><div class="wrap"><p class="institutional-kicker">Seguimos conectando</p><h2>O próximo capítulo também pode ser com você.</h2><a class="btn btn-cyan" href="fale-conosco.html">Contato <span aria-hidden="true">↗</span></a></div></section>`;
            return;
        }

        if (pageName === 'visao.html') {
            document.body.classList.add('institutional-page', 'vision-page');
            main.innerHTML = `
                <section class="institutional-hero vision-hero">
                    <div class="wrap institutional-hero-grid">
                        <div><p class="institutional-kicker">BR.Digital · Nosso norte</p><h1>Muito mais do que tecnologia.<br><em>Pessoas.</em></h1><p>Uma visão de futuro guiada por compromisso, qualidade e soluções que fazem a diferença no dia a dia.</p></div>
                        <aside class="institutional-hero-note"><span>Nosso propósito</span><strong>Tecnologia que aproxima</strong><p>Conectividade com confiança, cuidado e excelência.</p></aside>
                    </div>
                </section>
                <section class="vision-principles"><div class="wrap"><div class="institutional-section-heading"><p class="institutional-kicker">Visão, missão e valores</p><h2>O que nos orienta em cada conexão.</h2></div><div class="vision-principle-grid">
                    <article class="vision-principle vision-principle--vision"><span>01 · VISÃO</span><h3>Ser referência.</h3><p>Ser referência de comprometimento e qualidade no mercado global de telecomunicações.</p></article>
                    <article class="vision-principle vision-principle--mission"><span>02 · MISSÃO</span><h3>Entregar excelência.</h3><p>Disponibilizar soluções de alta performance ao mercado de telecomunicações, aplicando recursos estruturais e humanos em padrões de excelência.</p></article>
                    <article class="vision-principle vision-principle--values"><span>03 · VALORES</span><h3>Agir com propósito.</h3><ul><li>Comprometimento</li><li>Excelência</li><li>Flexibilidade</li><li>Resultado</li></ul></article>
                </div></div></section>
                <section class="vision-presence"><div class="wrap vision-presence-layout"><div><p class="institutional-kicker">Presença</p><h2>Uma rede que acompanha o Brasil.</h2><p>Malha de conectividade que alcança regiões responsáveis por 90% do PIB brasileiro, com 11 data centers e presença internacional.</p></div><div class="vision-presence-stats"><div><strong>90%</strong><span>do PIB brasileiro alcançado pela malha</span></div><div><strong>11</strong><span>data centers nas principais cidades</span></div></div></div></section>
                <section class="institutional-cta"><div class="wrap"><p class="institutional-kicker">Conte com a BR.Digital</p><h2>Vamos encontrar a solução certa para sua operação?</h2><a class="btn btn-cyan" href="fale-conosco.html">Contato <span aria-hidden="true">↗</span></a></div></section>`;
        }
    }

    function rebuildPolicyPage() {
        if (pageName !== 'politicas.html') {
            return;
        }
        var main = document.querySelector('main#main');
        if (!main) {
            return;
        }
        document.body.classList.add('institutional-page', 'policy-page');
        main.innerHTML = `
            <section class="institutional-hero policy-hero">
                <div class="wrap institutional-hero-grid"><div><p class="institutional-kicker">Transparência e confiança</p><h1>Privacidade e <em>cookies.</em></h1><p>Entenda como os dados informados neste site e as preferências de navegação são tratados.</p></div><aside class="institutional-hero-note"><span>BR.Digital</span><strong>Informação clara</strong><p>Políticas aplicadas a esta versão do site.</p></aside></div>
            </section>
            <section class="policy-content"><div class="wrap policy-grid">
                <article id="privacidade"><p class="institutional-kicker">01 · Privacidade</p><h2>Política de Privacidade</h2><p>Os formulários deste site solicitam dados como nome, e-mail, telefone, empresa, estado e mensagem para que a equipe possa responder a solicitações. A inscrição para receber novidades é opcional e depende do consentimento indicado no formulário.</p><p>As informações enviadas devem ser usadas para atender ao pedido informado. Para solicitar acesso, correção ou esclarecimentos sobre os dados fornecidos, entre em contato pelo endereço <a href="mailto:contato@br.digital">contato@br.digital</a>.</p><p>Esta página descreve os formulários e recursos existentes nesta versão local. Para informações oficiais sobre retenção, compartilhamento e demais práticas de tratamento, consulte a BR.Digital pelo canal de contato.</p></article>
                <article id="cookies"><p class="institutional-kicker">02 · Cookies</p><h2>Política de Cookies</h2><p>Este site usa um cookie para guardar a escolha feita no aviso de consentimento. A opção de análise somente é ativada quando a pessoa seleciona “Aceitar todos”; ao selecionar “Só os necessários”, a análise não é carregada. A preferência fica armazenada por até 180 dias.</p><p>Você pode alterar sua escolha limpando os cookies do site no navegador. A navegação essencial continua disponível sem aceitar cookies de análise.</p><p>Para dúvidas sobre privacidade e cookies, fale com a equipe pelo endereço <a href="mailto:contato@br.digital">contato@br.digital</a>.</p></article>
            </div></section>`;
    }

    function rebuildContactPage() {
        if (pageName !== 'fale-conosco.html') {
            return;
        }
        var main = document.querySelector('main#main');
        if (!main) {
            return;
        }
        document.body.classList.add('institutional-page', 'contact-page');
        main.innerHTML = `
            <section class="institutional-hero contact-hero">
                <div class="wrap institutional-hero-grid">
                    <div><p class="institutional-kicker">Contato · BR.Digital</p><h1>Vamos conversar sobre <em>a sua operação.</em></h1><p>Conte à nossa equipe o que você precisa conectar. Vamos entender seu cenário e direcionar a conversa.</p></div>
                    <aside class="institutional-hero-note"><span>Fale com a equipe</span><strong>Estamos prontos para ouvir.</strong><p>Conectividade, infraestrutura digital e soluções para sua operação.</p></aside>
                </div>
            </section>
            <section class="contact-content">
                <div class="wrap contact-content-grid">
                    <div class="contact-details"><p class="institutional-kicker">Canais de atendimento</p><h2>Escolha o melhor caminho.</h2><p class="tel-note">Ligue para o número da sua região.</p><ul class="tel-list"><li><span>Sul</span><strong>+55 (51) 3022-5353</strong></li><li><span>Sudeste</span><strong>+55 (11) 4096-5300</strong></li><li><span>Centro-Oeste</span><strong>+55 (61) 3033-9450</strong></li><li><span>Nordeste</span><em>Em breve</em></li></ul><p>E-mail nacional: <a href="mailto:comercial@br.digital">comercial@br.digital</a></p><p>E-mail internacional: <a href="mailto:sales@br.digital">sales@br.digital</a></p><p>WhatsApp: <a href="https://wa.me/555130229350">+55 (51) 3022-9350</a></p><p class="wa-note">O WhatsApp é exclusivo para abertura e acompanhamento de chamados.</p></div>
                    <form class="form contact-form" action="#" method="post" onsubmit="event.preventDefault();alert('Pré-visualização: o envio só funciona no site publicado.')">
                        <p class="institutional-kicker">Fale com a BR.Digital</p><h2>Qual solução você procura?</h2>
                        <label>Nome<input name="nome" placeholder="Nome" aria-label="Nome" autocomplete="name" required></label>
                        <div class="two"><label>E-mail<input type="email" name="email" placeholder="E-mail" aria-label="E-mail" autocomplete="email" required></label><label>Telefone<input type="tel" name="telefone" placeholder="Telefone" aria-label="Telefone" autocomplete="tel"></label></div>
                        <label>UF<select name="uf" aria-label="UF" required><option value="">UF</option><option>RS</option><option>SC</option><option>PR</option><option>SP</option><option>RJ</option><option>MG</option><option>ES</option><option>BA</option><option>SE</option><option>AL</option><option>PE</option><option>PB</option><option>RN</option><option>CE</option><option>PI</option><option>MA</option><option>DF</option><option>GO</option><option>MT</option><option>MS</option></select><small class="form-hint">Selecione a UF correspondente à sua empresa.</small></label>
                        <label>Conte o seu desafio<textarea name="mensagem" rows="5" placeholder="Conte qual solução você procura ou o desafio que quer resolver." aria-label="Qual solução você procura?"></textarea></label>
                        <label class="consent"><input type="checkbox" required><span>Ao enviar, concordo com o tratamento dos meus dados para receber retorno sobre esta solicitação, conforme a <a href="politicas.html#privacidade">Política de Privacidade</a>.</span></label>
                        <button class="btn btn-cyan" type="submit">Enviar solicitação</button>
                    </form>
                </div>
            </section>`;
    }

    function addDataCenterOverview() {
        var hero = document.querySelector('main#main .page-hero');
        if (pageName !== 'data-centers.html' || !hero || document.querySelector('.dc-proof')) {
            return;
        }

        document.body.classList.add('data-centers-page');
        var lead = hero.querySelector('.lead');
        if (lead) {
            lead.textContent = 'Infraestrutura resiliente, operação contínua e conectividade para manter serviços essenciais disponíveis.';
        }
        document.querySelectorAll('main#main p').forEach(function (paragraph) {
            var correctedText = paragraph.textContent.replace('nove estados do Brasil', 'nove cidades brasileiras');
            if (correctedText !== paragraph.textContent) {
                paragraph.textContent = correctedText;
            }
        });
        var overview = document.createElement('section');
        overview.className = 'dc-proof';
        overview.setAttribute('aria-label', 'Destaques da infraestrutura de datacenters');
        overview.innerHTML = `
            <div class="wrap dc-proof-grid">
                <article><span class="dc-proof-mark" aria-hidden="true">24/7</span><h2>Operação contínua</h2><p>Monitoramento e operação todos os dias, 24 horas por dia.</p></article>
                <article><span class="dc-proof-mark" aria-hidden="true">11</span><h2>Presença nacional</h2><p>Data centers nas principais cidades brasileiras.</p></article>
                <article><span class="dc-proof-mark dc-proof-mark--icon" aria-hidden="true"><i></i><i></i><i></i></span><h2>Infraestrutura redundante</h2><p>Resiliência para apoiar a continuidade dos serviços.</p></article>
                <article><span class="dc-proof-mark dc-proof-mark--icon" aria-hidden="true"><i></i><i></i><i></i></span><h2>Colocation escalonável</h2><p>Espaço, energia e conectividade conforme a necessidade.</p></article>
            </div>`;
        hero.insertAdjacentElement('afterend', overview);

        var network = document.createElement('section');
        network.className = 'dc-network';
        network.setAttribute('aria-labelledby', 'dc-network-title');
        network.innerHTML = `
            <div class="wrap dc-network-layout">
                <div>
                    <p class="dc-eyebrow">Conectividade integrada</p>
                    <h2 id="dc-network-title">Infraestrutura preparada para manter você conectado</h2>
                    <p>Datacenters e conectividade trabalham em conjunto para apoiar a disponibilidade, a segurança e o desempenho das operações.</p>
                    <a class="btn btn-cyan" href="fale-conosco.html">Converse com nossa equipe</a>
                </div>
                <figure class="dc-network-diagram">
                    <svg viewBox="0 0 560 320" role="img" aria-labelledby="dc-diagram-title dc-diagram-desc">
                        <title id="dc-diagram-title">Interconexão esquemática dos datacenters</title>
                        <desc id="dc-diagram-desc">Diagrama conceitual de um nó central conectado a diversos pontos, sem representar posições geográficas.</desc>
                        <g class="dc-network-lines"><path d="M280 160 82 62M280 160 180 42M280 160 382 42M280 160 478 70M280 160 500 190M280 160 390 275M280 160 170 278M280 160 62 202M82 62 180 42M382 42 478 70M500 190 390 275M170 278 62 202"/></g>
                        <circle class="dc-network-hub" cx="280" cy="160" r="42"/>
                        <text class="dc-network-label" x="280" y="165" text-anchor="middle">BR</text>
                        <g class="dc-network-nodes"><circle cx="82" cy="62" r="10"/><circle cx="180" cy="42" r="7"/><circle cx="382" cy="42" r="10"/><circle cx="478" cy="70" r="7"/><circle cx="500" cy="190" r="10"/><circle cx="390" cy="275" r="7"/><circle cx="170" cy="278" r="10"/><circle cx="62" cy="202" r="7"/></g>
                    </svg>
                    <figcaption>Ilustração esquemática da conectividade entre unidades.</figcaption>
                </figure>
            </div>`;
        overview.insertAdjacentElement('afterend', network);
    }

    function addCoverageOverview() {
        var main = document.querySelector('main#main');
        var proseSection = main && main.querySelector('.section .prose');
        if (pageName !== 'cobertura.html' || !proseSection || document.querySelector('.coverage-network')) {
            return;
        }

        document.body.classList.add('coverage-page');
        var hero = main.querySelector('.page-hero');
        var lead = hero && hero.querySelector('.lead');
        if (lead) {
            lead.textContent = 'Uma malha de fibra óptica e rádios digitais que conecta negócios em todo o Brasil.';
        }
        var breadcrumb = main.querySelector('.crumbs');
        if (breadcrumb) {
            breadcrumb.remove();
        }

        var contact = main.querySelector('.contact');
        if (contact) {
            var contactSection = contact.closest('.section');
            if (contactSection) {
                contactSection.remove();
            }
        }

        var overview = document.createElement('section');
        overview.className = 'coverage-network';
        overview.setAttribute('aria-labelledby', 'coverage-network-title');
        overview.innerHTML = `
            <div class="wrap coverage-network-layout">
                <div class="coverage-network-copy">
                    <p class="coverage-eyebrow">Uma rede que conecta negócios</p>
                    <h2 id="coverage-network-title">Alcance nacional. Presença próxima.</h2>
                    <p>Uma rede de fibra óptica e rádios digitais com alcance em 90% do PIB brasileiro, desenvolvida para apoiar operações de alta capacidade e baixa latência.</p>
                    <div class="coverage-stats">
                        <div><strong>90%</strong><span>do PIB brasileiro alcançado</span></div>
                        <div><strong>11</strong><span>data centers nas principais cidades</span></div>
                    </div>
                    <a class="btn btn-cyan" href="fale-conosco.html">Fale com a BR.Digital</a>
                </div>
                <figure class="coverage-diagram">
                    <svg viewBox="0 0 620 360" role="img" aria-labelledby="coverage-diagram-title coverage-diagram-desc">
                        <title id="coverage-diagram-title">Diagrama esquemático da rede</title>
                        <desc id="coverage-diagram-desc">Ilustração conceitual de pontos interligados, sem representar rotas geográficas.</desc>
                        <path class="coverage-link" d="M310 180 110 75M310 180 185 45M310 180 470 55M310 180 535 125M310 180 515 275M310 180 365 320M310 180 145 290M310 180 75 190M110 75 185 45M470 55 535 125M515 275 365 320M145 290 75 190"/>
                        <circle class="coverage-core" cx="310" cy="180" r="36"/>
                        <text class="coverage-core-label" x="310" y="185" text-anchor="middle">BR</text>
                        <g class="coverage-node"><circle cx="110" cy="75" r="10"/><circle cx="185" cy="45" r="7"/><circle cx="470" cy="55" r="10"/><circle cx="535" cy="125" r="7"/><circle cx="515" cy="275" r="10"/><circle cx="365" cy="320" r="7"/><circle cx="145" cy="290" r="10"/><circle cx="75" cy="190" r="7"/></g>
                    </svg>
                    <figcaption>Diagrama ilustrativo e esquemático; não representa rotas geográficas.</figcaption>
                </figure>
            </div>`;

        proseSection.closest('.section').insertAdjacentElement('afterend', overview);
    }

    function addSecurityOverview() {
        var main = document.querySelector('main#main');
        var proseSection = main && main.querySelector('.section .prose');
        if (pageName !== 'seguranca.html' || !proseSection || main.querySelector('.security-framework')) {
            return;
        }

        document.body.classList.add('security-page');
        var hero = main.querySelector('.page-hero');
        var lead = hero && hero.querySelector('.lead');
        if (lead) {
            lead.textContent = 'Proteção de dados e confiança em cada etapa da sua operação digital.';
        }
        proseSection.querySelectorAll('.chips').forEach(function (chips) {
            chips.remove();
        });

        var framework = document.createElement('section');
        framework.className = 'security-framework';
        framework.setAttribute('aria-labelledby', 'security-framework-title');
        framework.innerHTML = `
            <div class="wrap">
                <div class="security-framework-heading">
                    <p class="security-eyebrow">Segurança em toda a jornada</p>
                    <h2 id="security-framework-title">Proteção construída sobre três princípios</h2>
                    <p>Uma abordagem integrada para proteger informações durante o armazenamento e a transmissão.</p>
                </div>
                <div class="security-framework-grid">
                    <article class="security-principle">
                        <span class="security-principle-index">01</span>
                        <span class="security-principle-visual security-principle-visual--privacy" aria-hidden="true"></span>
                        <h3>Confidencialidade</h3>
                        <p>Preservar a privacidade das informações e restringir o acesso a quem tem autorização.</p>
                    </article>
                    <article class="security-principle">
                        <span class="security-principle-index">02</span>
                        <span class="security-principle-visual security-principle-visual--integrity" aria-hidden="true"></span>
                        <h3>Integridade</h3>
                        <p>Manter os dados íntegros e confiáveis ao longo de sua utilização e transmissão.</p>
                    </article>
                    <article class="security-principle">
                        <span class="security-principle-index">03</span>
                        <span class="security-principle-visual security-principle-visual--availability" aria-hidden="true"></span>
                        <h3>Disponibilidade</h3>
                        <p>Apoiar a continuidade e o acesso confiável aos serviços e às informações.</p>
                    </article>
                </div>
                <div class="security-response">
                    <div class="security-shield" aria-hidden="true"><span></span><i></i></div>
                    <div>
                        <p class="security-eyebrow">Confiança como prioridade</p>
                        <h3>Proteção para dados em trânsito e armazenados</h3>
                        <p>Protocolos rigorosos e respostas a ameaças ajudam a resguardar informações na nuvem, em servidores, redes, aplicativos e e-mails.</p>
                    </div>
                </div>
            </div>`;
        proseSection.closest('.section').insertAdjacentElement('afterend', framework);
    }

    function rebuildFeaturePage() {
        var main = document.querySelector('main#main');
        if (!main) {
            return;
        }

        if (pageName === 'cobertura.html') {
            document.body.classList.add('coverage-page', 'feature-redesign');
            document.querySelector('meta[name="description"]').setAttribute(
                'content',
                'Fibra óptica e rádios digitais em regiões que representam 90% do PIB brasileiro, com 11 data centers.'
            );
            main.innerHTML = `
                <section class="feature-hero coverage-hero">
                    <div class="feature-hero-grid"></div>
                    <div class="wrap feature-hero-content">
                        <p class="feature-kicker"><span></span> Rede BR.Digital</p>
                        <h1>O Brasil conectado.<br><em>Seu negócio em movimento.</em></h1>
                        <p class="feature-intro">Uma malha de fibra óptica e rádios digitais com alcance em 90% do PIB brasileiro, pronta para apoiar operações que precisam de velocidade, capacidade e confiança.</p>
                        <a class="feature-link" href="#coverage-footprint">Explore nossa cobertura <span aria-hidden="true">↓</span></a>
                    </div>
                    <div class="coverage-orbit coverage-orbit--one"></div>
                    <div class="coverage-orbit coverage-orbit--two"></div>
                    <div class="coverage-orbit coverage-orbit--three"></div>
                    <span class="coverage-hero-label">Fibra • Capilaridade • Performance</span>
                </section>
                <section class="coverage-impact" id="coverage-footprint">
                    <div class="wrap coverage-impact-layout">
                        <div class="coverage-impact-title">
                            <p class="feature-kicker"><span></span> Alcance que gera possibilidades</p>
                            <h2>Uma rede desenhada para ir mais longe.</h2>
                        </div>
                        <div class="coverage-impact-number"><strong>90<span>%</span></strong><p>do PIB brasileiro alcançado pela nossa malha de conectividade</p></div>
                        <div class="coverage-impact-copy"><p>Conectamos negócios com uma infraestrutura de alta capacidade, pensada para expandir a presença digital e sustentar o tráfego de dados com baixa latência.</p><a class="feature-link feature-link--dark" href="fale-conosco.html">Fale com a nossa equipe <span aria-hidden="true">↗</span></a></div>
                    </div>
                </section>
                <section class="coverage-network-scene">
                    <div class="wrap coverage-network-scene-layout">
                        <div class="coverage-scene-copy">
                            <p class="feature-kicker"><span></span> Presença nacional</p>
                            <h2>Uma rede.<br><em>Muitas conexões.</em></h2>
                            <p>Onze data centers, 749 pontos de presença e conexões nacionais e internacionais aproximam sua operação de uma rede de alta capacidade.</p>
                            <ul class="coverage-city-list" aria-label="Localidades com presença BR.Digital">
                                <li>Porto Alegre</li><li>Florianópolis</li><li>Curitiba</li><li>São Paulo</li><li>Rio de Janeiro</li><li>Brasília</li><li>Goiânia</li><li>Recife</li><li>Fortaleza</li>
                            </ul>
                        </div>
                        <figure class="coverage-network-visual">
                            <svg viewBox="0 0 700 500" role="img" aria-labelledby="coverage-map-title coverage-map-desc">
                                <title id="coverage-map-title">Mapa esquemático da rede BR.Digital no Brasil e no exterior</title>
                                <desc id="coverage-map-desc">Mapa ilustrativo com conexões nacionais e internacionais. A forma, os pontos e as linhas são esquemáticos e não representam rotas exatas.</desc>
                                <defs><radialGradient id="coverageGlow"><stop offset="0" stop-color="#1fbddd" stop-opacity=".24"/><stop offset="1" stop-color="#1fbddd" stop-opacity="0"/></radialGradient></defs>
                                <circle cx="345" cy="245" r="235" fill="url(#coverageGlow)"/>
                                <path class="coverage-map-land" d="m275 53 36 8 24 19 35 7 24 25-9 25 24 24-12 25 24 24-17 26 5 28-24 17-11 28-29 14-16 29-33 9-20 29-27-10-21 19-23-19-27 7-22-24-24-3-16-24-24-8-7-29-20-16-5-32 15-24-5-26 21-17 4-23 25-12 12-21 27-7 15-23 29-4 18-18 29 3z"/>
                                <g class="coverage-scene-lines">
                                    <path d="M315 205 242 146 300 111 366 112 391 165 357 220 333 263 317 301 300 344M242 146 200 202 257 231 315 205 357 220 407 235 391 165M257 231 275 285 317 301 357 220M315 205 366 112M257 231 200 202M317 301 300 344"/>
                                    <path d="M200 202C143 172 121 121 103 79M366 112C422 78 492 77 548 90M357 220C432 267 480 320 530 365M300 344C252 384 204 412 151 419"/>
                                </g>
                                <g class="coverage-scene-points">
                                    <circle cx="242" cy="146" r="7"/><circle cx="300" cy="111" r="6"/><circle cx="366" cy="112" r="7"/>
                                    <circle cx="391" cy="165" r="6"/><circle cx="315" cy="205" r="9"/><circle cx="200" cy="202" r="6"/>
                                    <circle cx="257" cy="231" r="7"/><circle cx="357" cy="220" r="7"/><circle cx="407" cy="235" r="6"/>
                                    <circle cx="275" cy="285" r="6"/><circle cx="317" cy="301" r="7"/><circle cx="300" cy="344" r="7"/>
                                    <circle cx="103" cy="79" r="6"/><circle cx="548" cy="90" r="6"/><circle cx="530" cy="365" r="6"/><circle cx="151" cy="419" r="6"/>
                                </g>
                                <text class="coverage-map-region" x="317" y="247" text-anchor="middle">BRASIL</text>
                                <text class="coverage-map-label" x="88" y="62">AMÉRICA DO NORTE</text>
                                <text class="coverage-map-label" x="501" y="68">EUROPA</text>
                                <text class="coverage-map-label" x="487" y="390">AMÉRICA DO SUL</text>
                                <text class="coverage-map-label" x="87" y="446">CONECTIVIDADE INTERNACIONAL</text>
                            </svg>
                            <figcaption>Representação esquemática da rede internacional; as linhas e posições não indicam rotas geográficas exatas.</figcaption>
                        </figure>
                    </div>
                </section>
                <section class="coverage-network-facts" aria-label="Indicadores da rede BR.Digital">
                    <div class="wrap">
                        <div class="coverage-network-facts-heading"><p class="feature-kicker"><span></span> Presença e interconexão</p><h2>Uma rede conectada ao Brasil e ao mundo.</h2></div>
                        <div class="coverage-network-facts-grid">
                            <article><strong>AS 14840</strong><span>Sistema Autônomo BR.Digital</span></article>
                            <article><strong>40.000+ km</strong><span>de fibra em cobertura metropolitana</span></article>
                            <article><strong>36.000+ km</strong><span>de fibra backbone</span></article>
                            <article><strong>11</strong><span>data centers nas principais cidades brasileiras</span></article>
                            <article><strong>749</strong><span>pontos de presença</span></article>
                            <article><strong>5.000+ AS</strong><span>conectados diretamente, com presença nos principais IXPs do mundo</span></article>
                        </div>
                    </div>
                </section>
                <section class="coverage-capabilities">
                    <div class="wrap">
                        <div class="feature-section-heading"><p class="feature-kicker"><span></span> Construída para conectar</p><h2>Capacidade para acompanhar o ritmo da sua operação.</h2></div>
                        <div class="coverage-capability-grid">
                            <article><span>01 / ALCANCE</span><h3>Malha de fibra óptica</h3><p>Capilaridade para conectar diferentes pontos e apoiar a expansão da sua rede.</p></article>
                            <article><span>02 / CONTINUIDADE</span><h3>Rádios digitais</h3><p>Alternativas de conectividade para projetos especiais e necessidades específicas.</p></article>
                            <article><span>03 / DESEMPENHO</span><h3>Baixa latência</h3><p>Capacidade de banda para transmissões de dados com velocidade e estabilidade.</p></article>
                        </div>
                    </div>
                </section>
                <section class="feature-cta coverage-cta"><div class="wrap feature-cta-layout"><p class="feature-kicker"><span></span> Vamos conectar sua próxima ideia?</p><h2>Seu próximo passo começa com uma boa conexão.</h2><a class="btn btn-cyan" href="fale-conosco.html">Converse com a BR.Digital</a></div></section>`;
            return true;
        }

        if (pageName === 'data-centers.html') {
            document.body.classList.add('data-centers-page', 'feature-redesign');
            main.innerHTML = `
                <section class="feature-hero datacenter-hero">
                    <div class="datacenter-grid-pattern"></div>
                    <div class="wrap datacenter-hero-layout">
                        <div class="feature-hero-content">
                            <p class="feature-kicker"><span></span> Data centers BR.Digital</p>
                            <h1>Infraestrutura para o que <em>não pode parar.</em></h1>
                            <p class="feature-intro">Ambientes seguros, redundantes e operados continuamente para manter aplicações, dados e negócios em funcionamento.</p>
                            <a class="feature-link" href="#dc-platform">Conheça nossa infraestrutura <span aria-hidden="true">↓</span></a>
                        </div>
                        <div class="datacenter-rack-scene" aria-hidden="true">
                            <div class="rack-halo"></div>
                            <div class="rack rack--back"><i></i><i></i><i></i><i></i></div>
                            <div class="rack rack--front"><i></i><i></i><i></i><i></i><i></i></div>
                            <div class="rack rack--side"><i></i><i></i><i></i><i></i></div>
                            <span class="rack-pulse rack-pulse--one"></span><span class="rack-pulse rack-pulse--two"></span><span class="rack-pulse rack-pulse--three"></span>
                        </div>
                    </div>
                    <span class="datacenter-hero-label">Resiliência por design / operação 24 horas</span>
                </section>
                <section class="dc-metrics">
                    <div class="wrap dc-metrics-grid">
                        <article><strong>24<span>/7</span></strong><p>Operação contínua</p></article>
                        <article><strong>11</strong><p>Data centers no Brasil</p></article>
                        <article><strong>01</strong><p>Objetivo: manter seus serviços disponíveis</p></article>
                    </div>
                </section>
                <section class="dc-platform" id="dc-platform">
                    <div class="wrap dc-platform-heading"><p class="feature-kicker"><span></span> Uma plataforma integrada</p><h2>Mais do que espaço.<br><em>Um ponto de apoio para sua operação.</em></h2><p>Infraestrutura, conectividade e suporte se unem para dar base a serviços digitais, equipamentos e aplicações críticas.</p></div>
                    <div class="wrap dc-platform-grid">
                        <article class="dc-platform-card dc-platform-card--large"><span class="dc-card-index">01</span><div class="dc-card-symbol dc-card-symbol--power" aria-hidden="true"><i></i><i></i><i></i></div><h3>Redundância</h3><p>Sistemas projetados para manter a operação mesmo diante de falhas de componentes ou sobrecargas eventuais.</p><span class="dc-card-line"></span></article>
                        <article class="dc-platform-card"><span class="dc-card-index">02</span><div class="dc-card-symbol dc-card-symbol--shield" aria-hidden="true"></div><h3>Ambientes controlados</h3><p>Segurança, disponibilidade e desempenho para proteger seus equipamentos e serviços.</p><span class="dc-card-line"></span></article>
                        <article class="dc-platform-card"><span class="dc-card-index">03</span><div class="dc-card-symbol dc-card-symbol--expand" aria-hidden="true"><i></i><i></i></div><h3>Colocation escalonável</h3><p>Espaço, conectividade e energia ajustados à necessidade da sua operação.</p><span class="dc-card-line"></span></article>
                    </div>
                </section>
                <section class="dc-presence">
                    <div class="wrap dc-presence-layout"><div><p class="feature-kicker"><span></span> Presença próxima</p><h2>11 data centers.<br><em>Uma infraestrutura conectada.</em></h2><p>Data centers em importantes centros brasileiros, integrados à malha de conectividade da BR.Digital.</p></div>
                        <ol class="dc-city-list"><li>Sorriso</li><li>Porto Alegre</li><li>Florianópolis</li><li>Curitiba</li><li>São Paulo</li><li>Rio de Janeiro</li><li>Brasília</li><li>Goiânia</li><li>Recife</li><li>Fortaleza</li><li>Salvador</li></ol>
                    </div>
                </section>
                <section class="feature-cta dc-cta"><div class="wrap feature-cta-layout"><p class="feature-kicker"><span></span> Sua operação merece uma base confiável</p><h2>Vamos desenhar a estrutura certa para o seu negócio?</h2><a class="btn btn-cyan" href="fale-conosco.html">Fale com a nossa equipe</a></div></section>`;
            return true;
        }

        if (pageName === 'seguranca.html') {
            document.body.classList.add('security-page', 'feature-redesign');
            main.innerHTML = `
                <section class="feature-hero security-hero">
                    <div class="security-mesh"></div>
                    <div class="wrap security-hero-layout">
                        <div class="feature-hero-content">
                            <p class="feature-kicker"><span></span> Segurança BR.Digital</p>
                            <h1>Confiança em cada <em>conexão.</em></h1>
                            <p class="feature-intro">A segurança dos seus dados é a base do nosso negócio. Proteção e resposta para as informações que mantêm sua operação em movimento.</p>
                            <a class="feature-link" href="#security-principles">Veja nossa abordagem <span aria-hidden="true">↓</span></a>
                        </div>
                        <div class="security-visual" aria-hidden="true"><div class="security-visual-orbit security-visual-orbit--outer"></div><div class="security-visual-orbit security-visual-orbit--inner"></div><div class="security-shield-large"><span></span><i></i></div><b class="security-node security-node--a"></b><b class="security-node security-node--b"></b><b class="security-node security-node--c"></b></div>
                    </div>
                    <span class="security-hero-label">Dados protegidos. Negócios confiantes.</span>
                </section>
                <section class="security-statement"><div class="wrap security-statement-layout"><p class="feature-kicker"><span></span> Uma responsabilidade contínua</p><blockquote>“A confiança se constrói protegendo a informação em toda a jornada.”</blockquote><p>Da transmissão ao armazenamento, segurança é parte essencial de uma operação digital confiável.</p></div></section>
                <section class="security-principles" id="security-principles">
                    <div class="wrap security-principles-heading"><p class="feature-kicker"><span></span> Princípios que orientam a proteção</p><h2>Três pilares.<br><em>Uma abordagem integrada.</em></h2></div>
                    <div class="wrap security-principles-grid">
                        <article class="security-pillar security-pillar--confidentiality"><span class="security-pillar-number">01</span><div class="security-pillar-art" aria-hidden="true"><i></i></div><h3>Confidencialidade</h3><p>Privacidade das informações e acesso restrito a pessoas autorizadas.</p><span class="security-pillar-rule"></span></article>
                        <article class="security-pillar security-pillar--integrity"><span class="security-pillar-number">02</span><div class="security-pillar-art" aria-hidden="true"><i></i></div><h3>Integridade</h3><p>Dados íntegros e confiáveis durante seu uso, armazenamento e transmissão.</p><span class="security-pillar-rule"></span></article>
                        <article class="security-pillar security-pillar--availability"><span class="security-pillar-number">03</span><div class="security-pillar-art" aria-hidden="true"><i></i></div><h3>Disponibilidade</h3><p>Acesso confiável a serviços e informações para apoiar a continuidade do negócio.</p><span class="security-pillar-rule"></span></article>
                    </div>
                </section>
                <section class="security-scope"><div class="wrap security-scope-layout"><div><p class="feature-kicker"><span></span> Proteção em cada ambiente</p><h2>Seus dados estão em movimento.<br><em>A proteção também.</em></h2><p>Seguimos protocolos rigorosos e respostas a ameaças para apoiar a segurança das informações onde quer que sua operação precise delas.</p></div><div class="security-scope-list"><div><span>01</span><strong>Nuvem e servidores</strong><small>Dados armazenados</small></div><div><span>02</span><strong>Redes e conexões</strong><small>Dados em trânsito</small></div><div><span>03</span><strong>Aplicativos e e-mails</strong><small>Comunicação digital</small></div></div></div></section>
                <section class="feature-cta security-cta"><div class="wrap feature-cta-layout"><p class="feature-kicker"><span></span> Conte com a BR.Digital</p><h2>Vamos conversar sobre a segurança da sua operação?</h2><a class="btn btn-cyan" href="fale-conosco.html">Fale com a nossa equipe</a></div></section>`;
            return true;
        }

        return false;
    }

    function rebuildWholesalePage() {
        var main = document.querySelector('main#main');
        if (pageName !== 'wholesale.html' || !main) {
            return;
        }

        document.body.classList.add('wholesale-page');
        main.innerHTML = `
            <section class="wholesale-hero">
                <div class="wrap wholesale-hero-layout">
                    <div>
                        <div class="business-brand"><img src="assets/brand/unit-wholesale.png" alt=""><span>WHOLESALE</span></div>
                        <p class="wholesale-eyebrow"><span></span> Conectividade para operadoras</p>
                        <h1>Conectividade para ampliar o alcance da sua rede.</h1>
                        <p>Infraestrutura de fibra e transporte de dados para operadoras, provedores de conteúdo e redes que precisam crescer com desempenho.</p>
                        <a class="wholesale-button" href="fale-conosco.html">Fale com nosso time <span aria-hidden="true">→</span></a>
                    </div>
                    <aside class="wholesale-hero-statement">
                        <span>Alcance</span>
                        <p>Uma infraestrutura de alta capacidade para conectar redes e levar serviços a novos mercados.</p>
                        <strong>Qualidade <i></i> Neutralidade <i></i> Desempenho</strong>
                    </aside>
                </div>
                <div class="wrap wholesale-hero-base"><span>Fibra óptica</span><i></i><span>Capacidade</span><i></i><span>Interconexão</span></div>
            </section>
            <section class="wholesale-intro">
                <div class="wrap wholesale-intro-layout">
                    <p class="wholesale-eyebrow"><span></span> Parceiros na expansão</p>
                    <h2>Uma rede preparada para conectar quem conecta o Brasil.</h2>
                    <p>Operadoras de telecomunicações e plataformas de conteúdo precisam transportar grandes volumes de dados, com qualidade e neutralidade. A BR.Digital oferece infraestrutura e soluções para apoiar essa expansão e aproximar redes de seus usuários.</p>
                </div>
            </section>
            <section class="wholesale-solutions" id="wholesale-solutions">
                <div class="wrap">
                    <div class="wholesale-section-heading">
                        <p class="wholesale-eyebrow"><span></span> Infraestrutura e serviços</p>
                        <h2>Soluções para acompanhar a evolução da sua rede.</h2>
                    </div>
                    <div class="wholesale-solutions-grid">
                        <article><span>01</span><h3>Fibra apagada</h3><p>Capilaridade e infraestrutura para projetos de rede e expansão.</p></article>
                        <article><span>02</span><h3>Transporte de dados</h3><p>Capacidade de transporte para interligar redes e localidades.</p></article>
                        <article><span>03</span><h3>Colocation</h3><p>Espaço e conectividade em data centers para equipamentos e serviços.</p></article>
                        <article><span>04</span><h3>Conectividade IP</h3><p>Opções de trânsito IP e conectividade para provedores e redes.</p></article>
                        <article><span>05</span><h3>Voz e interconexão</h3><p>Soluções para integrar serviços e conectar diferentes redes.</p></article>
                        <article><span>06</span><h3>L2L, VPN e MPLS</h3><p>Alternativas de conectividade privada para necessidades específicas.</p></article>
                        <article><span>07</span><h3>SD-WAN</h3><p>Conectividade de rede definida por software para ambientes distribuídos.</p></article>
                        <article><span>08</span><h3>Projetos sob medida</h3><p>Desenho de soluções conforme a operação e a disponibilidade técnica.</p></article>
                    </div>
                </div>
            </section>
            <section class="wholesale-audience">
                <div class="wrap wholesale-audience-layout">
                    <div><p class="wholesale-eyebrow"><span></span> Para quem move o tráfego</p><h2>Interconexão com qualidade e neutralidade.</h2></div>
                    <div class="wholesale-audience-items">
                        <article><span>01</span><div><h3>Operadoras</h3><p>Infraestrutura de telecomunicações para redes nacionais e internacionais.</p></div></article>
                        <article><span>02</span><div><h3>Provedores de conteúdo</h3><p>Conectividade para plataformas digitais e serviços OTT.</p></div></article>
                        <article><span>03</span><div><h3>Redes de alta capacidade</h3><p>Transporte e interligação para ampliar presença e desempenho.</p></div></article>
                    </div>
                </div>
            </section>
            <section class="wholesale-cta">
                <div class="wrap wholesale-cta-layout">
                    <div><p class="wholesale-eyebrow"><span></span> Vamos conectar sua próxima expansão?</p><h2>Fale com nossa equipe sobre seu projeto.</h2><p>Telefone: <a href="tel:+555130225353">+55 (51) 3022-5353</a> <span aria-hidden="true">·</span> E-mail: <a href="mailto:contato@br.digital">contato@br.digital</a></p></div>
                    <a class="wholesale-button" href="fale-conosco.html">Contate um consultor <span aria-hidden="true">→</span></a>
                </div>
            </section>`;
    }

    normalizeHeader();
    updateHomeSegmentDescriptions();

    document.querySelectorAll('.segment-card.provider, .segment-card.corporate').forEach(function (card) {
        var details = card.querySelector('.segment-details');
        if (!details || details.querySelector('.segment-page-link')) {
            return;
        }

        var isProvider = card.classList.contains('provider');
        var pageLink = document.createElement('a');
        pageLink.className = 'segment-page-link';
        pageLink.href = isProvider ? 'provider.html' : 'corporate.html';
        pageLink.textContent = isProvider ? 'Conheça Provider' : 'Conheça Corporate';
        details.appendChild(pageLink);
    });

    document.querySelectorAll('.units').forEach(function (units) {
        var unitCards = units.querySelectorAll(':scope > .unit');
        var hasWholesale = Array.prototype.some.call(unitCards, function (card) {
            var heading = card.querySelector('h3');
            return heading && heading.textContent.trim().toLowerCase() === 'wholesale';
        });
        var hasGovernment = Array.prototype.some.call(unitCards, function (card) {
            var heading = card.querySelector('h3');
            return heading && heading.textContent.trim().toLowerCase() === 'governo';
        });

        if (!hasWholesale || hasGovernment) {
            return;
        }

        var card = document.createElement('article');
        card.className = 'unit unit--government';
        card.innerHTML = `
            <img src="assets/brand/unit-governo.png" alt="">
            <h3>GOVERNO</h3>
            <p>Conectividade e infraestrutura para órgãos públicos.</p>
            <a class="btn btn-cyan" href="governo.html">Saiba mais</a>`;
        units.appendChild(card);

        var section = units.closest('.section');
        var summary = section && Array.prototype.find.call(
            section.querySelectorAll('.wrap > p'),
            function (paragraph) {
                return /unidades de negócios/i.test(paragraph.textContent);
            }
        );
        if (summary) {
            summary.textContent = summary.textContent.replace(/três unidades/i, 'quatro unidades');
        }
    });

    if (brandSubpages.indexOf(pageName) !== -1) {
        document.body.classList.add('brand-subpage');

        document.querySelectorAll('main#main > .section').forEach(function (section) {
            if (!section.querySelector('.contact')) {
                return;
            }
            section.className = 'brand-contact-cta';
            section.innerHTML = `
                <div class="wrap brand-contact-inner">
                    <div>
                        <h2>Vamos conversar sobre a sua necessidade?</h2>
                        <p>Conte à nossa equipe o que a sua operação precisa.</p>
                    </div>
                    <a class="brand-contact-button" href="${pageName === 'fale-conosco.html' ? 'mailto:contato@br.digital' : 'fale-conosco.html'}">
                        Fale com a BR.Digital <span aria-hidden="true">→</span>
                    </a>
                </div>`;
        });
    }

    document.querySelectorAll('a').forEach(function (link) {
        if (link.textContent.trim() === 'Contate um consultor') {
            link.textContent = 'Fale com a BR.Digital';
        }
    });

    addHomeProof();
    addHomeProductTrack();
    rebuildInstitutionalPages();
    rebuildPolicyPage();
    rebuildContactPage();
    rebuildFeaturePage();
    rebuildWholesalePage();

    if (footer) {
        var governmentHref = 'governo.html';
        footer.className = 'site-footer footer-custom';
        footer.innerHTML = `
            <div class="wrap footer-main">
                <div class="footer-brand">
                    <a href="index.html" aria-label="BR.Digital - Página inicial">
                        <img src="assets/brand/logo-brdigital-primary.png" alt="BR.Digital Telecom" width="220" height="58">
                    </a>
                    <p>Conectividade e tecnologia para impulsionar negócios.</p>
                </div>
                <nav class="footer-columns" aria-label="Mapa do site">
                    <div class="footer-column">
                        <h4>Comercial</h4>
                        <ul>
                            <li><a href="wholesale.html">Wholesale</a></li>
                            <li><a href="provider.html">Provider</a></li>
                            <li><a href="corporate.html">Corporate</a></li>
                            <li><a href="${governmentHref}">Governo</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Tecnologia</h4>
                        <ul>
                            <li><a href="cobertura.html">Cobertura</a></li>
                            <li><a href="data-centers.html">Infraestrutura</a></li>
                            <li><a href="seguranca.html">Segurança</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Institucional</h4>
                        <ul>
                            <li><a href="nossa-historia.html">História</a></li>
                            <li><a href="visao.html">Visão</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h4>Contato</h4>
                        <ul>
                            <li><a href="fale-conosco.html">Contato</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div class="wrap footer-legal">
                <div class="footer-legal-links">
                    <a href="politicas.html#privacidade">Política de privacidade</a><span>/</span>
                    <a href="termos-de-uso.html">Termos de uso</a>
                </div>
                <p>BRFIBRA TELECOMUNICACOES LTDA / 73.972.002/0001-16</p>
                <p>© 2026 BR.Digital. Todos os direitos reservados.</p>
            </div>`;
    } else {
        console.error('BR.Digital page enhancements: site footer was not found.');
    }

    if ('IntersectionObserver' in window &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        var main = document.querySelector('main#main');
        var isBusinessPage = pageName === 'wholesale.html' ||
            pageName === 'governo.html' ||
            pageName === 'corporate.html' ||
            pageName === 'provider.html';
        var sections = main ? Array.prototype.filter.call(main.children, function (element) {
            return element.tagName === 'SECTION';
        }) : [];

        if (isBusinessPage) {
            var animatedElements = sections.concat(footer ? [footer] : []);
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    entry.target.classList.toggle('is-revealed', entry.isIntersecting);
                    if (entry.target.classList.contains('government-solutions')) {
                        entry.target.classList.toggle('is-visible', entry.isIntersecting);
                    }
                });
            }, { threshold: 0.05 });

            document.body.classList.add('has-scroll-reveal');
            animatedElements.forEach(function (element) {
                element.classList.add('scroll-reveal');
                observer.observe(element);
            });
            if (pageName === 'governo.html') {
                document.querySelectorAll('.government-solution').forEach(function (card, index) {
                    card.style.setProperty('--solution-delay', (index * 65) + 'ms');
                });
            }
        } else if (!document.body.classList.contains('government-page')) {
            sections.filter(function (section) {
                return !section.classList.contains('hero');
            }).forEach(function (section) {
                section.classList.add('scroll-reveal');
            });
            var revealObserver = new IntersectionObserver(function (entries, activeObserver) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-revealed');
                        activeObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            document.body.classList.add('has-scroll-reveal');
            sections.forEach(function (section) {
                if (section.classList.contains('scroll-reveal')) {
                    revealObserver.observe(section);
                }
            });
        }
    } else if (pageName === 'governo.html') {
        var governmentSolutions = document.querySelector('.government-solutions');
        if (governmentSolutions) {
            governmentSolutions.classList.add('is-visible');
        }
    }
})();

(function () {
    var page = window.location.pathname.split('/').pop().toLowerCase(), main = document.getElementById('main');
    if (!main || document.querySelector('.pres-block')) { return; }
    function block(kicker, title, body, cls) {
        var s = document.createElement('section');
        s.className = 'pres-block ' + (cls || '');
        s.innerHTML = '<div class="wrap"><p class="pres-kicker">' + kicker + '</p><h2>' + title + '</h2>' + body + '</div>';
        main.appendChild(s);
    }
    function table(head, rows) {
        return '<div class="pres-table"><table><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>' +
            rows.map(function (r) { return '<tr>' + r.map(function (c, i) { return i ? '<td>' + c + '</td>' : '<th scope="row">' + c + '</th>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
    }
    function stats(items) {
        return '<ul class="pres-stats">' + items.map(function (i) { return '<li><strong>' + i[0] + '</strong><span>' + i[1] + '</span></li>'; }).join('') + '</ul>';
    }
    function chips(names) {
        return '<ul class="pres-chips">' + names.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul>';
    }
    if (page === 'cobertura.html') {
        block('Nossos números', 'Presença nacional em larga escala', stats([['2.406', 'cidades atendidas'], ['70.000 km', 'de rede'], ['90%', 'do PIB nacional']]));
        block('Backbone DWDM', '70 Tbps de capacidade', stats([['30.000 km', 'de rede em operação'], ['+10.000 km', 'de rede projetada'], ['50,4%', 'Ciena · 15.111 km'], ['49,6%', 'Padtec · 14.914 km']]));
        block('Infraestrutura', 'Presença por região', table(['Região', 'Cidades', 'Datacenters', 'POPs', 'Torres'], [['Sul', '845', '04', '94', '24'], ['Sudeste', '319', '02', '41', '09'], ['Nordeste', '709', '03', '97', '07'], ['Centro-oeste', '453', '02', '75', '55'], ['Norte', '80', '—', '02', '—']]));
        block('Backbone IP', 'Seu conteúdo. Nossa rede. Uma conexão.', '<p class="pres-lead">Interconexões privadas com CDNs e grandes plataformas de conteúdo, e interconexões públicas em pontos de troca de tráfego (IXPs) como AMS-IX, DE-CIX, NETIX, IX.br, NYIIX e Equinix, sob o AS 14840.</p>');
        block('Core network', 'Principais fornecedores', table(['Função', 'Fornecedores'], [['TX-DWDM', 'Ciena, Padtec'], ['IP Backbone', 'Juniper Networks'], ['DDoS', 'Kentik, A10 Networks, Arbor Networks']]));
    }
    if (page === 'data-centers.html') {
        block('Datacenters', 'Área e capacidade por unidade', table(['Cidade', 'UF', 'Área (m²)', 'Racks'], [['Brasília', 'DF', '201,5', '120'], ['Goiânia', 'GO', '87,5', '32'], ['Sorriso', 'MT', '80', '32'], ['Porto Alegre', 'RS', '200', '120'], ['Curitiba', 'PR', '220', '132'], ['Fortaleza', 'CE', '90', '50'], ['Recife', 'PE', '70', '36'], ['Rio de Janeiro', 'RJ', '406,3', '28'], ['São Paulo', 'SP', '60', '36'], ['Florianópolis', 'SC', '60', '36'], ['Salvador', 'BA', '', '']]));
    }
    if (page === 'nossa-historia.html') {
        var t = [['1995', 'O início', 'Baseada em Porto Alegre, a Compuline faz seu primeiro movimento no mercado de telecom.'], ['2002', 'A divisão', 'A Compuline se divide em 3 empreendimentos: BRFibra, BRDigital e Commcorp.'], ['2004', 'A expansão', 'O Grupo Compuline expande sua rede metropolitana nas principais cidades do Brasil.'], ['2009', 'A referência', 'Um dos principais players do Sul do Brasil, o grupo BR.Digital se torna referência em backbone nacional.'], ['2012', 'Exterior', 'Começa a negociar com as principais operadoras e empresas ao redor do mundo.'], ['2014', 'A consolidação', 'O grupo BR.Digital se torna referência em última milha.'], ['2016', 'A oportunidade', 'Explora oportunidades para fundir todas as empresas e cria 2 novas unidades de negócios: BRRotas e LAFibra.'], ['2020', 'A fronteira', 'A BRFibra se reposiciona com a marca BR.Digital Telecom e três unidades de negócios: Wholesale, Corporate e Provider.'], ['2026', 'O presente', 'Como Grupo BR.Digital, trabalhamos para ser uma alternativa eficiente para o desenvolvimento tecnológico da América Latina.']];
        block('Linha do tempo', 'Uma trajetória de 31 anos promovendo a transformação digital', '<ol class="pres-timeline">' + t.map(function (i) { return '<li><b>' + i[0] + '</b><h3>' + i[1] + '</h3><p>' + i[2] + '</p></li>'; }).join('') + '</ol>');
    }
})();

(function () {
    var T = {'wholesale': 'As redes de fibra óptica que conferem excelência e permitem a ampliação da cobertura para operadoras de telecomunicações e serviços de OTTs (Over-The-Top) têm que estar preparadas para garantir altíssima capacidade de transporte de dados, baixa latência e segurança na conexão. A BR.Digital Wholesale é responsável pelo atendimento das operadoras de telecomunicações nacionais e internacionais além das grandes empresas do mercado de mídia de streaming nacionais e internacionais, as chamadas OTTs.', 'corporate': 'Atendemos às demandas estratégicas de TI e de Telecom em transporte de dados. Desenvolvemos projetos que integram inteligência em tecnologias digitais e estrutura de ótimo desempenho e confiabilidade, com alto grau de personalização ao seu problema específico.', 'provider': 'O mercado de Internet Service Providers (ISPs) está em plena expansão no Brasil. E a grande demanda por internet residencial e empresarial deve crescer ainda mais nos próximos anos. Por esse motivo, os ISPs que buscam se diferenciar no mercado devem apostar cada vez mais na qualidade das conexões e em uma malha de fibra óptica com grande capilaridade que permita a expansão dos serviços. Através da BR.Digital Provider, atendemos ao mercado dos provedores regionais de acesso à internet (ISP) com alta disponibilidade e baixa latência, fornecendo uma robusta infraestrutura física de redes de fibra óptica, fundamental para a ampliação do acesso aos serviços de banda larga.'}, page = window.location.pathname.split('/').pop().toLowerCase().replace('.html', ''), main = document.getElementById('main');
    if (!main || !T[page]) { return; }
    var s = document.createElement('section');
    s.className = 'pres-block';
    s.innerHTML = '<div class="wrap"><p class="pres-kicker">BR.Digital ' + page.charAt(0).toUpperCase() + page.slice(1) + '</p><p class="pres-lead">' + T[page] + '</p></div>';
    main.insertBefore(s, main.children[1] || null);
})();

(function () {
    var page = window.location.pathname.split('/').pop().toLowerCase().replace('.html', '');
    var main = document.getElementById('main');
    if (!main) { return; }

    function addServiceSection(title, content) {
        var section = document.createElement('section');
        section.className = 'svc-sec';
        section.innerHTML = '<div class="wrap svc-split"><h2>' + title + '</h2><div>' + content + '</div></div>';
        main.appendChild(section);
    }

    if (page === 'servicos') {
        var grid = document.querySelector('#data-center .svc-grid');
        if (grid) {
            grid.insertAdjacentHTML('beforeend',
                '<li><a class="svc-card" href="servico-dutos.html"><h3>Dutos</h3><p>Infraestrutura subterrânea para expansão de redes de fibra óptica.</p><span>Saiba mais →</span></a></li>' +
                '<li><a class="svc-card" href="servico-locacao-espaco-torre.html"><h3>Locação de Espaço em Torre</h3><p>Espaço em torres próprias para ERB, rádio e micro-ondas.</p><span>Saiba mais →</span></a></li>'
            );
        }
    }

    if (page === 'servico-fibra-apagada') {
        addServiceSection('Modalidades de contratação',
            '<ul class="svc-list"><li>Aluguel da fibra no modelo Opex.</li><li>Venda no modelo Capex, por IRU + O&amp;M anual ou IRU com O&amp;M.</li></ul>'
        );
    }

    if (page === 'servico-locacao-de-ativos') {
        var lead = main.querySelector('.svc-hero .lead');
        if (lead) {
            lead.textContent = 'Locação flexível de roteadores, switches, firewalls, equipamentos SD-WAN e servidores, sem o custo inicial de compra.';
        }
        var models = [].filter.call(main.querySelectorAll('.svc-sec'), function (section) {
            var heading = section.querySelector('h2');
            return heading && heading.textContent.trim() === 'Modelos';
        })[0];
        if (models) {
            models.querySelector('h2').textContent = 'Equipamentos disponíveis';
            models.querySelector('.svc-list').innerHTML =
                '<li>Roteadores para conectividade e roteamento de redes.</li>' +
                '<li>Switches para interconexão de equipamentos.</li>' +
                '<li>Firewalls para proteção de redes.</li>' +
                '<li>Equipamentos SD-WAN para gestão de conectividade.</li>' +
                '<li>Servidores para compor a infraestrutura da operação.</li>';
        }
    }

    if (page === 'servico-cloud-connect') {
        addServiceSection('Transporte Multicloud',
            '<p class="svc-p">A oferta de transporte multicloud também conecta clientes a datacenters como Equinix e TIVIT por meio de VLAN de camada 2. A implantação depende do desenho e da disponibilidade de cada conexão.</p>'
        );
    }

    if (page === 'servico-internet-satelital') {
        var about = [].filter.call(main.querySelectorAll('.svc-sec'), function (section) {
            var heading = section.querySelector('h2');
            return heading && heading.textContent.trim() === 'Sobre o serviço';
        })[0];
        if (about) {
            about.querySelector('div > div').insertAdjacentHTML('beforeend',
                '<p class="svc-p">Nos catálogos comerciais, esta oferta também aparece como BrStar – Acesso Satelital: uma solução em parceria com a Starlink, com foco na disponibilidade e na proteção do circuito IP.</p>'
            );
        }
    }

    if (page === 'servico-ip-bgp') {
        var modalities = [].filter.call(main.querySelectorAll('.svc-sec'), function (section) {
            var heading = section.querySelector('h2');
            return heading && heading.textContent.trim() === 'Modalidades';
        })[0];
        if (modalities) {
            modalities.id = 'modalidades';
            modalities.querySelector('.svc-list').insertAdjacentHTML('afterend',
                '<p class="svc-p">A conexão Burstable (On-Demand) permite ajustar a capacidade à variação do tráfego e atender picos de demanda.</p>'
            );
        }
    }
})();
