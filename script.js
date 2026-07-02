    // ─── Portfolio config ───
    const SITE_CONFIG = {
      name: 'C. Santosh',
      email: 'santu9481@gmail.com',
      github: 'https://github.com/csantosh140',
      linkedin: 'https://www.linkedin.com/in/c-santosh-504076368/',
      location: 'Ballari, Karnataka, India',
      apiBase: '',
      projects: {
        rag: {
          name: 'RAG-Based AI Agent',
          github: 'https://github.com/csantosh140/RAG-AI-AGENT-',
          demo: 'https://ragai-mo89.onrender.com'
        },
        foodWaste: {
          name: 'Food Waste Management System',
          github: 'https://github.com/csantosh140/foodBridg_Django_project/tree/main/food_system'
        },
        yoga: {
          name: 'AI Based Yoga Pose Detection',
          github: 'https://github.com/csantosh140/yoga_pose_ml_project'
        }
      }
    };

    // Wire RAG project links + demo preview modal
    (function initRagProjectDemo() {
      const rag = SITE_CONFIG.projects?.rag;
      if (!rag) return;

      const gh = document.getElementById('ragGithubLink');
      const demo = document.getElementById('ragDemoLink');
      const modalOpenTab = document.getElementById('ragModalOpenTab');
      const previewBtn = document.getElementById('openRagPreview');
      const modal = document.getElementById('ragDemoModal');
      const backdrop = document.getElementById('ragDemoBackdrop');
      const closeBtn = document.getElementById('ragModalClose');
      const frame = document.getElementById('ragDemoFrame');
      const loading = document.getElementById('ragDemoLoading');

      if (gh) gh.href = rag.github;
      if (demo) demo.href = rag.demo;
      if (modalOpenTab) modalOpenTab.href = rag.demo;

      function openPreview() {
        if (!modal || !frame) return;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        loading?.classList.remove('hidden');
        frame.src = rag.demo;
        frame.onload = () => loading?.classList.add('hidden');
        showToast('Loading RAG demo — please wait if server is waking up.');
      }

      function closePreview() {
        if (!modal || !frame) return;
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        frame.src = '';
        loading?.classList.remove('hidden');
      }

      previewBtn?.addEventListener('click', openPreview);
      closeBtn?.addEventListener('click', closePreview);
      backdrop?.addEventListener('click', closePreview);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('open')) closePreview();
      });

      demo?.addEventListener('click', () => showToast('Opening RAG live demo in a new tab…'));
    })();

    // Wire GitHub links for Food Waste & Yoga projects
    (function initProjectGithubLinks() {
      const links = [
        { id: 'foodGithubLink', project: SITE_CONFIG.projects?.foodWaste },
        { id: 'yogaGithubLink', project: SITE_CONFIG.projects?.yoga }
      ];
      links.forEach(({ id, project }) => {
        const el = document.getElementById(id);
        if (!el || !project?.github) return;
        el.href = project.github;
        el.addEventListener('click', () => showToast(`Opening ${project.name} on GitHub…`));
      });
    })();

    // Wire contact links from config (URLs hidden from display)
    (function initContactLinks() {
      const map = {
        emailContactLink: `mailto:${SITE_CONFIG.email}`,
        linkedinContactLink: SITE_CONFIG.linkedin,
        githubContactLink: SITE_CONFIG.github
      };
      Object.entries(map).forEach(([id, href]) => {
        const el = document.getElementById(id);
        if (el && href) el.href = href;
      });

      document.getElementById('emailContactLink')?.addEventListener('click', () => showToast('Opening email…'));
      document.getElementById('linkedinContactLink')?.addEventListener('click', () => showToast('Opening LinkedIn profile…'));
      document.getElementById('githubContactLink')?.addEventListener('click', () => showToast('Opening GitHub profile…'));
    })();

    function showToast(text, type = 'success') {
      const toast = document.getElementById('toast');
      toast.textContent = text;
      toast.className = `toast show ${type}`;
      clearTimeout(showToast._timer);
      showToast._timer = setTimeout(() => toast.classList.remove('show'), 4500);
    }

    // ─── DARK / LIGHT THEME TOGGLE ───
    (function initTheme() {
      const btn = document.getElementById('themeToggle');
      const saved = localStorage.getItem('portfolio-theme');
      // Apply saved preference immediately to avoid flash
      if (saved === 'light') document.body.classList.add('light-mode');

      btn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
        // Ripple animation on toggle
        btn.style.transform = 'rotate(360deg) scale(1.2)';
        setTimeout(() => { btn.style.transform = ''; }, 400);
      });
    })();

    // Touch vs desktop cursor
    const isTouch = matchMedia('(hover: none)').matches;
    if (!isTouch) document.body.classList.add('custom-cursor');

    // CURSOR
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    if (!isTouch) {
      document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
      function animateCursor() {
        cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
        rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
        requestAnimationFrame(animateCursor);
      }
      animateCursor();
      document.querySelectorAll('a, button, .project-card, .stat-card, .skill-category, .contact-link, .filter-btn, .cert-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
          cursor.style.background = 'var(--violet)';
          ring.style.width = '60px'; ring.style.height = '60px';
          ring.style.borderColor = 'rgba(123,47,255,0.4)';
        });
        el.addEventListener('mouseleave', () => {
          cursor.style.transform = 'translate(-50%,-50%) scale(1)';
          cursor.style.background = 'var(--cyan)';
          ring.style.width = '40px'; ring.style.height = '40px';
          ring.style.borderColor = 'rgba(0,245,255,0.5)';
        });
      });
    }

    // TYPEWRITER
    const phrases = [
      '// Initializing Portfolio_v2.0',
      '// Loading AI modules...',
      '// Building for impact...',
      '// Ready to connect'
    ];
    let phraseIdx = 0, charIdx = 0, deleting = false;
    const typeEl = document.getElementById('typewriter');

    function typeWriter() {
      const current = phrases[phraseIdx];
      typeEl.textContent = current.substring(0, charIdx);
      if (!deleting) {
        charIdx++;
        if (charIdx > current.length) {
          setTimeout(() => { deleting = true; typeWriter(); }, 2000);
          return;
        }
      } else {
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      setTimeout(typeWriter, deleting ? 40 : 70);
    }
    setTimeout(typeWriter, 1200);

    // HERO CANVAS
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], mouse = { x: -9999, y: -9999 };

    function resize() {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); initParticles(); });

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.baseX = this.x; this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.r = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.6 + 0.1;
        this.color = Math.random() > 0.6 ? '#00F5FF' : Math.random() > 0.5 ? '#7B2FFF' : '#E8F4FD';
        this.pulse = Math.random() * Math.PI * 2;
      }
      update() {
        this.pulse += 0.02;
        const dx = mouse.x - this.x, dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x -= dx * force * 0.04;
          this.y -= dy * force * 0.04;
        } else {
          this.x += (this.baseX - this.x) * 0.02 + this.vx;
          this.y += (this.baseY - this.y) * 0.02 + this.vy;
          this.baseX += this.vx; this.baseY += this.vy;
          if (this.baseX < 0 || this.baseX > W) this.vx *= -1;
          if (this.baseY < 0 || this.baseY > H) this.vy *= -1;
        }
      }
      draw() {
        const a = this.alpha * (0.7 + 0.3 * Math.sin(this.pulse));
        ctx.globalAlpha = a;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      const count = Math.min(Math.floor(W * H / 8000), 200);
      particles = Array.from({ length: count }, () => new Particle());
    }
    initParticles();

    function drawConnections() {
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.globalAlpha = (1 - dist / maxDist) * 0.3;
            ctx.strokeStyle = '#00F5FF';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateCanvas() {
      ctx.clearRect(0, 0, W, H);
      const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7);
      grad.addColorStop(0, 'rgba(123,47,255,0.08)');
      grad.addColorStop(0.5, 'rgba(0,245,255,0.04)');
      grad.addColorStop(1, 'rgba(5,10,24,0)');
      ctx.fillStyle = grad; ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, W, H);
      drawConnections();
      particles.forEach(p => { p.update(); p.draw(); });
      ctx.globalAlpha = 1;
      requestAnimationFrame(animateCanvas);
    }
    animateCanvas();

    // ─── SCROLL REVEAL (all variants) ───
    const revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children';
    const reveals = document.querySelectorAll(revealSelectors);
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          // Unobserve after reveal for performance
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => revealObserver.observe(el));

    // SKILL BARS
    const skillObserver = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.3 });
    document.querySelectorAll('.skill-category').forEach(el => skillObserver.observe(el));

    // STAT COUNTERS
    function animateCounter(el) {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting && e.target.dataset.count) {
          animateCounter(e.target);
          counterObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

    // PROJECT FILTERS
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('hidden', !show);
          if (show) {
            card.style.animation = 'fadeUp 0.5s ease forwards';
          }
        });
      });
    });

    // CARD TILT + SHINE
    if (!isTouch) {
      document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const cx = rect.width / 2, cy = rect.height / 2;
          const rotateX = ((y - cy) / cy) * -6;
          const rotateY = ((x - cx) / cx) * 6;
          card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
          const shine = card.querySelector('.card-shine');
          if (shine) {
            shine.style.setProperty('--mx', (x / rect.width * 100) + '%');
            shine.style.setProperty('--my', (y / rect.height * 100) + '%');
          }
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      });
    }

    // MAGNETIC BUTTONS
    if (!isTouch) {
      document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', e => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
      });
    }

    // SCROLL: progress, nav, active links, timeline, back-to-top
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');
    const timeline = document.getElementById('timeline');
    const timelineProgress = document.getElementById('timelineProgress');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'resume', 'contact'];

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = (scrollY / docHeight) * 100;
      scrollProgress.style.width = pct + '%';

      navbar.classList.toggle('scrolled', scrollY > 60);
      backToTop.classList.toggle('visible', scrollY > 500);

      sections.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (scrollY >= el.offsetTop - 140 && scrollY < el.offsetTop + el.offsetHeight - 140) {
          navLinks.forEach(a => a.classList.remove('active'));
          const link = document.querySelector(`.nav-links a[href="#${id}"]`);
          if (link) link.classList.add('active');
        }
      });

      if (timeline) {
        const rect = timeline.getBoundingClientRect();
        const total = timeline.offsetHeight;
        const visible = Math.min(Math.max(-rect.top + 200, 0), total);
        timelineProgress.style.height = visible + 'px';
        timelineItems.forEach((item, i) => {
          const itemTop = item.offsetTop;
          item.classList.toggle('active', visible >= itemTop - 40);
        });
      }
    });

    // MOBILE MENU
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // HERO SCROLL
    document.getElementById('heroScroll').addEventListener('click', () => {
      document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
    });

    // BACK TO TOP
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // CONTACT FORM — opens pre-filled email client (works everywhere, no server needed)
    async function sendContactMessage({ name, email, message }) {
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(
        `Hi Santosh,\n\nYou have a new portfolio message:\n\nFrom: ${name}\nReply-to: ${email}\n\nMessage:\n${message}\n\n---\nSent via your portfolio contact form.`
      );
      const mailtoLink = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
      window.open(mailtoLink, '_blank');
      return {
        ok: true,
        message: '📧 Your email client has opened with the message pre-filled. Just hit Send to reach C. Santosh!'
      };
    }

    document.getElementById('contactForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('submitBtn');
      const formError = document.getElementById('formError');
      const formStatus = document.getElementById('formStatus');
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const honey = document.getElementById('formHoney')?.value;

      formError.textContent = '';
      formStatus.textContent = '';

      if (honey) return; // bot detected

      if (message.length < 10) {
        formError.textContent = 'Message must be at least 10 characters.';
        return;
      }

      btn.textContent = 'Sending...';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      try {
        const result = await sendContactMessage({ name, email, message });
        btn.textContent = 'Message Sent ✓';
        btn.classList.add('success');
        formStatus.textContent = result.message;
        showToast(result.message);
        document.getElementById('contactForm').reset();

        setTimeout(() => {
          btn.textContent = 'Send Message →';
          btn.classList.remove('success');
          btn.style.opacity = '';
          btn.disabled = false;
          formStatus.textContent = '';
        }, 5000);
      } catch (err) {
        formError.textContent = err.message || 'Something went wrong. Try the Email card on the left.';
        showToast(formError.textContent, 'error');
        btn.textContent = 'Send Message →';
        btn.disabled = false;
        btn.style.opacity = '';
      }
    });
