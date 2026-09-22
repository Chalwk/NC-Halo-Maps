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

    if (mapsGrid) {
        const cards = Array.from(mapsGrid.querySelectorAll('.map-card'));
        let activeFilter = 'all';

        function applyFilters() {
            const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
            let visibleCount = 0;

            cards.forEach(card => {
                const nameMatches = !query || card.dataset.name.includes(query);
                const games = (card.dataset.games || '').split(',').filter(Boolean);
                const gameMatches = activeFilter === 'all' || games.includes(activeFilter);
                const matches = nameMatches && gameMatches;

                card.style.display = matches ? '' : 'none';
                if (matches) visibleCount++;
            });

            if (searchEmpty) {
                searchEmpty.hidden = visibleCount !== 0;
            }
        }

        if (searchInput) {
            searchInput.addEventListener('input', applyFilters);
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
                applyFilters();
            });
        });
    }
});