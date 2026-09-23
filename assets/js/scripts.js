/*
  NC Halo Maps
  Site for NakedChick's Halo: PC/CE custom maps.
  Site Developer: https://github.com/Chalwk/
*/

document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle button');
    const mainNav = document.querySelector('.main-nav');
    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('show');
        });
    }

    function handleResize() {
        if (window.innerWidth > 768 && mainNav) {
            mainNav.classList.remove('show');
        }
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTopBtn';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const searchInput = document.getElementById('map-search');
    const mapsGrid = document.getElementById('maps-grid');
    const searchEmpty = document.querySelector('.search-empty');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const pagination = document.getElementById('maps-pagination');

    if (mapsGrid) {
        const cards = Array.from(mapsGrid.querySelectorAll('.map-card'));
        const perPage = parseInt(mapsGrid.dataset.perPage, 10) || 0;

        let activeFilter = 'all';
        let currentPage = 1;

        function getMatchingCards() {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
            return cards.filter(card => {
                const nameMatches = !query || card.dataset.name.includes(query);
                const games = (card.dataset.games || '').split(',').filter(Boolean);
                const gameMatches = activeFilter === 'all' || games.includes(activeFilter);
                return nameMatches && gameMatches;
            });
        }

        function renderPagination(totalPages) {
            if (!pagination) return;

            pagination.innerHTML = '';
            if (totalPages <= 1) return;

            const makeButton = (label, targetPage, options = {}) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'page-btn' + (options.active ? ' active' : '');
                btn.textContent = label;
                if (options.disabled) btn.disabled = true;
                if (options.ariaLabel) btn.setAttribute('aria-label', options.ariaLabel);
                if (options.active) btn.setAttribute('aria-current', 'page');
                btn.addEventListener('click', () => {
                    currentPage = targetPage;
                    applyFilters(false);
                    mapsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
                return btn;
            };

            pagination.appendChild(
                makeButton('Prev', currentPage - 1, {
                    disabled: currentPage === 1,
                    ariaLabel: 'Previous page'
                })
            );

            for (let i = 1; i <= totalPages; i++) {
                pagination.appendChild(
                    makeButton(String(i), i, {
                        active: i === currentPage,
                        ariaLabel: `Page ${i}`
                    })
                );
            }

            pagination.appendChild(
                makeButton('Next', currentPage + 1, {
                    disabled: currentPage === totalPages,
                    ariaLabel: 'Next page'
                })
            );
        }

        function applyFilters(resetPage) {
            if (resetPage) currentPage = 1;

            const matching = getMatchingCards();
            const totalPages = perPage > 0 ? Math.max(1, Math.ceil(matching.length / perPage)) : 1;

            if (currentPage > totalPages) currentPage = totalPages;
            if (currentPage < 1) currentPage = 1;

            const start = perPage > 0 ? (currentPage - 1) * perPage : 0;
            const end = perPage > 0 ? start + perPage : matching.length;
            const visibleOnPage = new Set(matching.slice(start, end));

            cards.forEach(card => {
                card.style.display = visibleOnPage.has(card) ? '' : 'none';
            });

            if (searchEmpty) {
                searchEmpty.hidden = matching.length !== 0;
            }

            renderPagination(totalPages);
        }

        if (searchInput) {
            searchInput.addEventListener('input', () => applyFilters(true));
        }

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                activeFilter = btn.dataset.filter;
                applyFilters(true);
            });
        });

        applyFilters(true);
    }
});
