/**
 * DB Blog — Main JavaScript
 * Handles: navigation scroll, mobile menu, back-to-top,
 *          reading progress, scroll animations, search, copy-to-clipboard
 */

(function () {
  'use strict';

  // ============================================================================
  // NAVIGATION SCROLL STATE
  // ============================================================================
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ============================================================================
  // MOBILE MENU TOGGLE
  // ============================================================================
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on mobile link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ============================================================================
  // READING PROGRESS BAR
  // ============================================================================
  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = Math.min(progress, 100) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ============================================================================
  // BACK TO TOP BUTTON
  // ============================================================================
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================================
  // SCROLL ANIMATIONS (Intersection Observer)
  // ============================================================================
  const animateEls = document.querySelectorAll('.animate-in');
  if (animateEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger sibling cards
          const delay = Array.from(animateEls).indexOf(entry.target) % 3 * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animateEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all immediately
    animateEls.forEach(el => el.classList.add('visible'));
  }

  // ============================================================================
  // SEARCH (Simple client-side JSON search)
  // ============================================================================
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchEmpty = document.getElementById('search-empty');
  const searchCount = document.getElementById('search-count');

  if (searchInput && searchResults) {
    let posts = [];
    let searchIndex = null;

    // Fetch search index
    const baseurl = document.documentElement.dataset.baseurl || '';
    fetch(baseurl + '/search.json')
      .then(r => r.json())
      .then(data => {
        posts = data;
        // Pre-warm on first load if there's a query param
        const params = new URLSearchParams(window.location.search);
        const q = params.get('q');
        if (q) {
          searchInput.value = q;
          performSearch(q);
        }
      })
      .catch(() => {
        // Search index unavailable — silent fail
      });

    const debounce = (fn, delay) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
      };
    };

    const highlight = (text, query) => {
      if (!query) return text;
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`(${escaped})`, 'gi');
      return text.replace(re, '<mark style="background:rgba(59,130,246,0.25);color:inherit;border-radius:2px;">$1</mark>');
    };

    const performSearch = (query) => {
      query = query.trim();
      if (!query || query.length < 2) {
        searchResults.innerHTML = '';
        if (searchCount) searchCount.textContent = '';
        if (searchEmpty) searchEmpty.style.display = 'none';
        return;
      }

      const terms = query.toLowerCase().split(/\s+/);
      const results = posts.filter(post => {
        const blob = (post.title + ' ' + post.content + ' ' + post.tags + ' ' + post.category).toLowerCase();
        return terms.every(term => blob.includes(term));
      });

      if (searchCount) {
        searchCount.textContent = results.length === 0
          ? 'No results'
          : `${results.length} result${results.length === 1 ? '' : 's'}`;
      }

      if (results.length === 0) {
        searchResults.innerHTML = '';
        if (searchEmpty) searchEmpty.style.display = 'block';
        return;
      }

      if (searchEmpty) searchEmpty.style.display = 'none';

      searchResults.innerHTML = results.slice(0, 20).map(post => `
        <div class="search-result-item">
          <h3><a href="${post.url}">${highlight(post.title, query)}</a></h3>
          <p>${highlight((post.content || '').substring(0, 200) + '…', query)}</p>
          <div class="result-meta">${post.date}${post.category ? ' · ' + post.category : ''}</div>
        </div>
      `).join('');
    };

    searchInput.addEventListener('input', debounce((e) => {
      performSearch(e.target.value);
    }, 300));

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch(searchInput.value);
      }
    });
  }

  // ============================================================================
  // ACTIVE NAV LINK (highlight based on current path)
  // ============================================================================
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPath ||
        (currentPath.startsWith(link.getAttribute('href')) && link.getAttribute('href') !== '/')) {
      link.classList.add('active');
    }
  });

})();
