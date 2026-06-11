/**
 * Sai Sanjivani Criticare Hospital - Core UI Engine
 */

// ==========================================================================
// DYNAMIC COMPONENT LOADER (HEADER & FOOTER)
// ==========================================================================
document.addEventListener("DOMContentLoaded", async () => {
  await loadComponents();
});

async function loadComponents() {
  try {
    // 1. Fetch and inject Header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
      const headerResponse = await fetch('components/header.html');
      headerPlaceholder.innerHTML = await headerResponse.text();
      
      // Initialize header-dependent scripts ONLY AFTER it is in the DOM
      initHeaderScripts();
      initDarkModeToggle();
    }

    // 2. Fetch and inject Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      const footerResponse = await fetch('components/footer.html');
      footerPlaceholder.innerHTML = await footerResponse.text();
    }
  } catch (error) {
    console.error("Error loading components:", error);
  }
}

// ==========================================================================
// HEADER SPECIFIC SCRIPTS (Active Links, Navbar, Scroll)
// ==========================================================================
function initHeaderScripts() {
  // --- 1. Dynamic Active Link Highlight ---
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.classList.remove('active'); // Clear hardcoded HTML classes
    const href = link.getAttribute('href');
    if (!href) return;

    const targetPage = href.split('#')[0]; // Ignore anchor hashes like #home

    // Check if it's the home page
    if (targetPage === 'index.html' || targetPage === '') {
      if (currentPath === '/' || currentPath.endsWith('index.html') || currentPath.endsWith('/')) {
        link.classList.add('active');
      }
    } 
    // Check for other pages (contact.html, about.html, etc.)
    else if (currentPath.includes(targetPage)) {
      link.classList.add('active');
    }
  });

  // --- 2. Navbar Interactive Outside-Click Collapse ---
  const headerNavbar = document.getElementById('headerNavbar');
  const navbarToggler = document.querySelector('.navbar-toggler');

  if (headerNavbar && navbarToggler) {
    document.addEventListener('click', function (event) {
      if (
        headerNavbar.classList.contains('show') && 
        !headerNavbar.contains(event.target) && 
        !navbarToggler.contains(event.target)
      ) {
        const bsCollapse = new bootstrap.Collapse(headerNavbar, { toggle: false });
        bsCollapse.hide();
      }
    });

    const navLinksList = headerNavbar.querySelectorAll('.nav-link');
    navLinksList.forEach(link => {
      link.addEventListener('click', () => {
        if (headerNavbar.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(headerNavbar, { toggle: false });
          bsCollapse.hide();
        }
      });
    });
  }

  // --- 3. Window Scroll Monitor (Elegant Header Transition) ---
  // --- 3. Window Scroll Monitor (Elegant Header Transition) ---
  const header = document.querySelector('.header');
  
  if (header) {
    // 1. Identify if the current page is the Home Page
    const isHomePage = currentPath === '/' || currentPath.endsWith('index.html');

    // 2. If it is an inner page (like contact.html), lock the solid state immediately
    if (!isHomePage) {
      header.classList.add('scrolled', 'locked-solid');
    }

    // 3. Handle scroll logic
    window.addEventListener('scroll', function () {
      // Prevent the scroll listener from removing the solid state on inner pages
      if (header.classList.contains('locked-solid')) return;

      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }
}

// ==========================================================================
// DARK MODE TOGGLE (Bootstrap 5 Native Color Modes)
// ==========================================================================
function initDarkModeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  // Get saved theme preference from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  // Handle toggle button click
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Listen for system preference changes
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeQuery.addEventListener('change', (e) => {
    // Only update if user hasn't saved a preference
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
}

// ==========================================================================
// FEATURE 1: INTENSIVE INTERSECTION COUNTER ANIMATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".count");
  if (counters.length === 0) return;

  const animationDuration = 2000;

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute("data-target"), 10);
    if (isNaN(target)) return; 
    
    let startTime = null;

    const updateNumber = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);
      const currentValue = Math.floor(progress * target);

      counter.textContent = currentValue.toLocaleString("en-IN");

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        counter.textContent = target.toLocaleString("en-IN");
      }
    };

    requestAnimationFrame(updateNumber);
  };

  const observerOptions = { root: null, threshold: 0.3 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => observer.observe(counter));
});

// ==========================================================================
// FEATURE 4: DYNAMIC WHATSAPP APPOINTMENT ROUTING WITH CONDITIONAL LOGIC
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("whatsapp-booking-form");
  if (!bookingForm) return;

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName")?.value.trim() || "";
    const phone = document.getElementById("phone")?.value.trim() || "Not Provided";
    const email = document.getElementById("email")?.value.trim() || "Not Provided";
    const prefDate = document.getElementById("prefDate")?.value || "Not Selected";
    
    // SMART FALLBACK: Tries modal IDs first, drops back to standard form IDs if null
    const department = (document.getElementById("modalDepartment") || document.getElementById("department"))?.value || "";
    const doctor = (document.getElementById("modalDoctor") || document.getElementById("doctor"))?.value || "";
    const userMessage = document.getElementById("message")?.value.trim() || "";

    if (!fullName) {
      alert("Please enter the patient's full name.");
      return;
    }

    let messageBody = `Hello Sai Sanjivani Criticare Hospital, I would like to book an appointment.\n\n`;
    messageBody += `*Patient Details:*\n`;
    messageBody += `• Name: ${fullName}\n`;
    messageBody += `• Phone: ${phone}\n`;
    messageBody += `• Email: ${email}\n`;
    messageBody += `• Preferred Date: ${prefDate}\n`;

    if (department && department !== "") messageBody += `• Department: ${department}\n`;
    if (doctor && doctor !== "") messageBody += `• Doctor: ${doctor}\n`;
    if (userMessage) messageBody += `\n*Additional Notes:*\n"${userMessage}"`;

    const targetWhatsAppNumber = "919221594442";
    const encodedText = encodeURIComponent(messageBody);
    const whatsappURL = `https://wa.me/${targetWhatsAppNumber}?text=${encodedText}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
});

// ==========================================================================
// SMART ROUTING & DEPT PRE-SELECTION PARAMETERS
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const targetService = urlParams.get('service');

  // 1. Handle auto-scrolling & highlight inside doctor.html
  if (targetService && window.location.pathname.includes('doctor.html')) {
    setTimeout(() => {
      const element = document.getElementById(`dept-${targetService}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.transition = 'background-color 0.5s ease';
        element.style.backgroundColor = 'rgba(50, 130, 184, 0.05)';
        setTimeout(() => element.style.backgroundColor = 'transparent', 2000);
      }
    }, 400);
  }

  // 2. Handle auto-dropdown pre-selection inside standard contact.html form pages
  if (targetService && window.location.pathname.includes('contact.html')) {
    const dptSelect = document.getElementById('department');
    if (dptSelect) {
      // Map parameter variants to standard select value options safely
      const mapping = {
        'laparoscopic & General Surgery': 'Laparoscopic & General Surgery',
        'Orthopedic': 'Orthopedic',
        'neurosurgery': 'Neurosurgery',
        'oncosurgery': 'Oncosurgery'
      };
      if (mapping[targetService]) {
        dptSelect.value = mapping[targetService];
      }
    }
  }
});

// ==========================================================================
// GLOBAL MODAL CONTROLLER FOR DOCTOR APPOINTMENTS
// ==========================================================================
window.openAppointmentModal = function (docName, deptName) {
  const docSelect = document.getElementById('modalDoctor');
  const deptSelect = document.getElementById('modalDepartment');
  
  // Pre-select matching dropdown items
  if (docSelect) docSelect.value = docName;
  if (deptSelect) deptSelect.value = deptName;
  
  // Safely grab or instantiate the Bootstrap Modal instance
  const modalElement = document.getElementById('appointmentModal');
  if (modalElement) {
    const myModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    myModal.show();
  }
};