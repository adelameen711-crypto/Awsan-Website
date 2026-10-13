/* ===================================
       LOADER
    =================================== */
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
        initAnimations();
      }, 1900);
    });

    /* ===================================
       HEADER SCROLL EFFECT
    =================================== */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
      document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 400);
    });

    /* ===================================
       BACK TO TOP
    =================================== */
    document.getElementById('back-to-top').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ===================================
       MOBILE NAV
    =================================== */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const closeMobileNav = document.getElementById('closeMobileNav');

    function openMobile() {
      hamburger.classList.add('open');
      mobileNav.classList.add('open');
      mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeMobile() {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      mobileOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    hamburger.addEventListener('click', openMobile);
    closeMobileNav.addEventListener('click', closeMobile);
    mobileOverlay.addEventListener('click', closeMobile);
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobile));

    /* ===================================
       SEARCH BAR
    =================================== */
    const searchBar = document.getElementById('search-bar');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');

    document.getElementById('openSearch').addEventListener('click', () => {
      searchBar.classList.add('open');
      searchInput.focus();
      document.body.style.overflow = 'hidden';
    });
    
    document.getElementById('closeSearch').addEventListener('click', () => {
      searchBar.classList.remove('open');
      document.body.style.overflow = '';
    });
    
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        searchBar.classList.remove('open');
        const loginModal = document.getElementById('login-modal');
        if (loginModal) loginModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    function performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;

      // إغلاق نافذة البحث
      searchBar.classList.remove('open');
      document.body.style.overflow = '';

      // البحث في الأقسام والبطاقات
      const elementsToSearch = document.querySelectorAll('section, .project-card, .service-card');
      let found = false;

      for (const el of elementsToSearch) {
        if (el.textContent.toLowerCase().includes(query)) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // إضافة تأثير وميض للفت الانتباه
          const originalBg = el.style.backgroundColor;
          el.style.transition = 'background-color 0.5s';
          el.style.backgroundColor = 'rgba(245, 191, 35, 0.2)'; // لون ذهبي خفيف
          setTimeout(() => {
            el.style.backgroundColor = originalBg;
          }, 1500);

          found = true;
          break;
        }
      }

      if (!found) {
        alert('عذراً، لم يتم العثور على نتائج مطابقة لبحثك.');
      }
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', performSearch);
    }
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') performSearch();
      });
    }

    /* ===================================
       LOGIN MODAL
    =================================== */
    const loginModal = document.getElementById('login-modal');
    document.getElementById('openLogin').addEventListener('click', () => {
      loginModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    document.getElementById('closeModal').addEventListener('click', () => {
      loginModal.classList.remove('open');
      document.body.style.overflow = '';
    });
    document.getElementById('modalOverlay').addEventListener('click', () => {
      loginModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    /* ===================================
       HERO SLIDER
    =================================== */
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let currentSlide = 0;
    let autoSlideInterval;

    function goToSlide(idx) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (idx + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
    }
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    document.getElementById('heroNext').addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoSlide(); });
    document.getElementById('heroPrev').addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoSlide(); });
    dots.forEach(dot => {
      dot.addEventListener('click', () => { goToSlide(+dot.dataset.idx); resetAutoSlide(); });
    });
    startAutoSlide();

    /* ===================================
       EQUIPMENT TABS
    =================================== */
    const eqTabs = document.querySelectorAll('.eq-tab');
    const heavyGrid = document.getElementById('heavyGrid');
    const fleetGrid = document.getElementById('fleetGrid');

    eqTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        eqTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        if (tab.dataset.tab === 'heavy') {
          heavyGrid.style.display = 'grid';
          fleetGrid.style.display = 'none';
        } else {
          heavyGrid.style.display = 'none';
          fleetGrid.style.display = 'grid';
        }
      });
    });

    /* ===================================
       PROJECTS FILTER
    =================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
          if (filter === 'all' || card.dataset.cat === filter) {
            card.style.display = 'block';
            setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
          } else {
            card.style.opacity = '0';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });

    /* ===================================
       LIGHTBOX
    =================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        lightboxImg.src = card.dataset.img;
        lightboxImg.alt = card.querySelector('.project-name').textContent;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    document.getElementById('closeLightbox').addEventListener('click', () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    /* ===================================
       REVIEWS SWIPER
    =================================== */
    new Swiper('#reviewsSwiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      breakpoints: {
        640: { slidesPerView: 1.5 },
        900: { slidesPerView: 2 },
        1100: { slidesPerView: 3 },
      }
    });

    /* ===================================
       CONTACT FORM
    =================================== */
    function handleFormSubmit(e) {
      e.preventDefault();
      const btn = e.target.querySelector('.form-submit');
      btn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح!';
      btn.style.background = 'linear-gradient(135deg,#22c55e,#16a34a)';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال الرسالة';
        btn.style.background = '';
        e.target.reset();
      }, 3500);
    }

    /* ===================================
       SMOOTH SCROLL NAV LINKS
    =================================== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    /* ===================================
       GSAP ANIMATIONS (runs after loader)
    =================================== */
    function initAnimations() {
      gsap.registerPlugin(ScrollTrigger);

      // Fade up elements
      gsap.utils.toArray('.gsap-fade').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        });
      });

      // Slide from right (RTL: slide from left visually)
      gsap.utils.toArray('.gsap-right').forEach(el => {
        gsap.fromTo(el, { opacity: 0, x: 80 }, {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        });
      });

      // Slide from left
      gsap.utils.toArray('.gsap-left').forEach(el => {
        gsap.fromTo(el, { opacity: 0, x: -80 }, {
          opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        });
      });

      // Scale in elements (staggered)
      gsap.utils.toArray('.gsap-scale').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, scale: 0.82, y: 30 }, {
          opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)',
          delay: (i % 4) * 0.1,
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
        });
      });

      // Section headers
      gsap.utils.toArray('.section-header').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
        });
      });

      // COUNTER ANIMATION
      const counters = document.querySelectorAll('.count');
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        ScrollTrigger.create({
          trigger: counter,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.fromTo({ val: 0 }, {
              val: target, duration: 2.2, ease: 'power2.out',
              onUpdate: function () {
                counter.textContent = Math.round(this.targets()[0].val).toLocaleString('ar-EG');
              }
            });
          }
        });
      });

      // Footer
      gsap.fromTo('#footer', { opacity: 0 }, {
        opacity: 1, duration: 1,
        scrollTrigger: { trigger: '#footer', start: 'top 95%', toggleActions: 'play none none none' }
      });
    }

gsap.registerPlugin(ScrollTrigger);

    // البحث عن كل قسم يحتوي على كلاس gsap-left وتشغيل الحركة له بشكل مستقل
    gsap.utils.toArray('.gsap-left').forEach(element => {
      gsap.fromTo(element,
        // الحالة الأولى: من أين يبدأ؟ (مخفي ومزاح لليسار 100 بكسل)
        {
          opacity: 0,
          x: -100
        },
        // الحالة الثانية: إلى أين يصل؟ (ظاهر تماماً في مكانه الطبيعي)
        {
          scrollTrigger: {
            trigger: element,
            start: "top 85%", // يبدأ عندما يصل القسم لـ 85% من الشاشة
          },
          opacity: 1, // إجبار العنصر على الظهور بنسبة 100%
          x: 0,       // إعادته لمكانه الأصلي
          duration: 1.2,
          ease: "power2.out"
        }
      );
    });

// استخدام 'load' للتأكد من تحميل كل الصور وملفات الـ CSS قبل تشغيل الحركة
    window.addEventListener('load', () => {

      // رسالة اختبار للتأكد من عمل الكود (سنراها في الكونسول)
      console.log("🚀 كود GSAP يعمل الآن!");

      gsap.registerPlugin(ScrollTrigger);

      gsap.utils.toArray('.gsap-left').forEach(element => {
        gsap.fromTo(element,
          {
            autoAlpha: 0, // السطر السحري: يلغي أي إخفاء مسبق
            x: -100
          },
          {
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
            autoAlpha: 1, // إظهار العنصر بالكامل
            x: 0,
            duration: 1.2,
            ease: "power2.out",
            clearProps: "all" // تنظيف أي تأثيرات عالقة بعد انتهاء الحركة
          }
        );
      });
    });

document.addEventListener("DOMContentLoaded", function () {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-start');
          }
        });
      }, { threshold: 0.1 }); // تقليل النسبة إلى 10% ليشتغل الأنيميشن بسرعة بمجرد لمس الشاشة

      // البحث عن أي عنصر يبدأ اسمه بـ gsap ومراقبته
      const animatedElements = document.querySelectorAll('[class*="gsap-"]');
      animatedElements.forEach(el => observer.observe(el));
    });

document.addEventListener("DOMContentLoaded", function () {
      const themeToggle = document.getElementById('theme-toggle');
      const themeToggleMobile = document.getElementById('theme-toggle-mobile');
      const bodyElement = document.body;

      // تحديث الأيقونات والنصوص
      function updateIcons(isDark) {
        if (themeToggle) {
          themeToggle.innerHTML = isDark ? '<i class="fas fa-sun" style="color:var(--gold);"></i>' : '<i class="fas fa-moon"></i>';
        }
        if (themeToggleMobile) {
          themeToggleMobile.innerHTML = isDark ? '<i class="fas fa-sun" style="color:var(--gold);"></i> الوضع النهاري' : '<i class="fas fa-moon"></i> الوضع الليلي';
        }
      }

      // التحقق من التفضيلات المحفوظة
      if (localStorage.getItem('theme') === 'dark') {
        bodyElement.classList.add('dark-mode');
        updateIcons(true);
      }

      // دالة التبديل
      function toggleTheme(e) {
        if(e) e.preventDefault();
        bodyElement.classList.toggle('dark-mode');
        const isDark = bodyElement.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateIcons(isDark);
      }

      if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
      if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
    });
