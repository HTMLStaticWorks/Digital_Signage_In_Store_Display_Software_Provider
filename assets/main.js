(function () {
  'use strict';

  const body = document.body;

  // Initialize Theme and RTL from localStorage
  if (localStorage.getItem('displayflow-theme') === 'dark') {
    body.classList.add('dark-mode');
  }
  if (localStorage.getItem('displayflow-rtl') === 'rtl') {
    body.classList.add('rtl');
  }

  // Update Theme & RTL Buttons Text
  function updateToggleButtons() {
    const themeBtns = document.querySelectorAll('#theme-toggle, .theme-toggle-btn');
    const rtlBtns = document.querySelectorAll('#rtl-toggle, .rtl-toggle-btn');
    const isDark = body.classList.contains('dark-mode');
    const isRtl = body.classList.contains('rtl');

    themeBtns.forEach(btn => {
      btn.textContent = isDark ? '☀' : '☾';
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    });

    rtlBtns.forEach(btn => {
      btn.textContent = isRtl ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', isRtl ? 'Switch to LTR' : 'Switch to RTL');
    });
  }

  // Toggle Theme
  window.toggleTheme = function () {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('displayflow-theme', isDark ? 'dark' : 'light');
    updateToggleButtons();
  };

  // Toggle RTL
  window.toggleRTL = function () {
    body.classList.toggle('rtl');
    const isRtl = body.classList.contains('rtl');
    localStorage.setItem('displayflow-rtl', isRtl ? 'rtl' : 'ltr');
    updateToggleButtons();
  };

  // Bind Header Theme & RTL Buttons
  document.addEventListener('DOMContentLoaded', function () {
    updateToggleButtons();

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', window.toggleTheme);
    }

    const rtlToggleBtn = document.getElementById('rtl-toggle');
    if (rtlToggleBtn) {
      rtlToggleBtn.addEventListener('click', window.toggleRTL);
    }

    // Populate Dynamic Copyright Year
    const yearSpans = document.querySelectorAll('[data-year]');
    const currentYear = new Date().getFullYear();
    yearSpans.forEach(span => {
      span.textContent = currentYear;
    });

    // Mobile Navigation Menu Toggle for Site
    const menuBtn = document.getElementById('mobile-menu');
    const menuPanel = document.getElementById('mobile-panel');
    if (menuBtn && menuPanel) {
      menuBtn.addEventListener('click', function () {
        menuPanel.classList.toggle('open');
      });
    }

    // Toast Container Setup
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      document.body.appendChild(toastContainer);
    }

    // Toast Notification Dispatcher
    window.showToast = function (message, type = 'info', duration = 4000) {
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `
        <div class="toast-content">
          <span>${type === 'success' ? '✓' : type === 'warning' ? '⚠' : 'ℹ'}</span>
          <span>${message}</span>
        </div>
        <button class="toast-close" aria-label="Close">&times;</button>
      `;

      toast.querySelector('.toast-close').onclick = function () {
        toast.remove();
      };

      toastContainer.appendChild(toast);

      setTimeout(() => {
        if (toast.parentNode) {
          toast.style.opacity = '0';
          toast.style.transform = 'translateY(10px)';
          setTimeout(() => toast.remove(), 300);
        }
      }, duration);
    };

    // Newsletter Subscription Form Handler
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          window.showToast('Thank you for subscribing to DisplayFlow updates!', 'success');
          input.value = '';
        }
      });
    });

    // Password Eye Toggle Handler
    document.querySelectorAll('.toggle-password').forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        const input = targetId ? document.getElementById(targetId) : this.previousElementSibling;
        if (input) {
          const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
          input.setAttribute('type', type);
          this.innerHTML = type === 'password'
            ? `<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`
            : `<svg viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.17c0-1.66-1.34-3-3-3l-.17.02z"/></svg>`;
        }
      });
    });

    // Forgot Password Trigger
    document.querySelectorAll('.forgot-link').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        window.showToast('Password reset instructions sent to your email address.', 'info');
      });
    });

    // Social Auth Buttons Trigger
    document.querySelectorAll('.social-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const provider = this.textContent.trim();
        window.showToast(`Connecting to ${provider}...`, 'info');
        setTimeout(() => {
          window.showToast(`Authenticated via ${provider}! Redirecting...`, 'success');
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 800);
        }, 500);
      });
    });

    // Login & Signup Form Submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        window.showToast('Login successful! Redirecting to Dashboard...', 'success');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 800);
      });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const pwd = document.getElementById('signup-password');
        const confirmPwd = document.getElementById('signup-confirm-password');
        if (pwd && confirmPwd && pwd.value !== confirmPwd.value) {
          window.showToast('Passwords do not match. Please verify.', 'error');
          return;
        }
        window.showToast('Account created successfully! Redirecting to Dashboard...', 'success');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 800);
      });
    }

    // Client Dashboard SPA Switching Logic
    const dashSidebar = document.querySelector('.dash-sidebar, .dside');
    const dashOverlay = document.querySelector('.dash-overlay');
    const dashHamburger = document.querySelector('.dash-hamburger');

    function toggleMobileDrawer() {
      if (dashSidebar) dashSidebar.classList.toggle('open');
      if (dashOverlay) dashOverlay.classList.toggle('active');
    }

    if (dashHamburger) {
      dashHamburger.addEventListener('click', toggleMobileDrawer);
    }
    if (dashOverlay) {
      dashOverlay.addEventListener('click', toggleMobileDrawer);
    }

    // Tab Switching Function
    window.switchDashTab = function (tabId, updateHash = true) {
      if (!tabId) return;

      // Normalize tabId by stripping leading #
      const cleanId = tabId.replace(/^#/, '');

      // Hide all panels, show target panel
      const panels = document.querySelectorAll('.dash-panel');
      let targetFound = false;

      panels.forEach(panel => {
        if (panel.id === cleanId || panel.id === cleanId + '-section') {
          panel.classList.add('active');
          targetFound = true;
        } else {
          panel.classList.remove('active');
        }
      });

      if (!targetFound && panels.length > 0) {
        panels[0].classList.add('active');
      }

      // Update Nav Link Active States
      const navItems = document.querySelectorAll('.dash-nav-item, .dside a');
      navItems.forEach(item => {
        const href = item.getAttribute('href') || item.getAttribute('data-tab');
        if (href && (href === '#' + cleanId || href === cleanId || item.getAttribute('data-tab') === cleanId)) {
          item.classList.add('active');
        } else if (href && href.startsWith('#')) {
          item.classList.remove('active');
        }
      });

      // Close mobile drawer if open
      if (dashSidebar && dashSidebar.classList.contains('open')) {
        dashSidebar.classList.remove('open');
      }
      if (dashOverlay && dashOverlay.classList.contains('active')) {
        dashOverlay.classList.remove('active');
      }

      // Synchronize URL hash
      if (updateHash && window.location.pathname.endsWith('dashboard.html')) {
        history.pushState(null, null, '#' + cleanId);
      }
    };

    // Hash Change & Initialization for Dashboard
    if (document.body.classList.contains('dash-page') || document.querySelector('.dash-layout')) {
      const initialHash = window.location.hash || '#overview';
      window.switchDashTab(initialHash, false);

      window.addEventListener('hashchange', function () {
        window.switchDashTab(window.location.hash, false);
      });
    }

    // Dashboard Quick Booking Live Fare Calculator
    const screenCountInput = document.getElementById('screen-count-input');
    const serviceTierSelect = document.getElementById('service-tier-select');
    const estimatedFareElement = document.getElementById('estimated-fare-display');

    function updateLiveFare() {
      if (!estimatedFareElement) return;
      const screens = parseInt(screenCountInput ? screenCountInput.value : 1, 10) || 1;
      const tierMult = serviceTierSelect ? parseFloat(serviceTierSelect.value) || 1 : 1;
      const baseFee = 150;
      const perScreenRate = 45;

      const total = (baseFee + (screens * perScreenRate)) * tierMult;
      estimatedFareElement.textContent = '$' + total.toFixed(2);
    }

    if (screenCountInput) screenCountInput.addEventListener('input', updateLiveFare);
    if (serviceTierSelect) serviceTierSelect.addEventListener('change', updateLiveFare);
    updateLiveFare();

    // Saved Locations "Book Here" Button Handler
    document.querySelectorAll('.book-location-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const locationName = this.getAttribute('data-location');
        const locationSelect = document.getElementById('booking-location-select');
        if (locationSelect && locationName) {
          locationSelect.value = locationName;
        }
        window.switchDashTab('quick-booking');
        window.showToast(`Location "${locationName || 'Selected Outlet'}" loaded into Quick Booking!`, 'success');
      });
    });

    // Welcome & SignOut Modal Controls
    const welcomeModal = document.getElementById('welcome-modal');
    if (welcomeModal && !sessionStorage.getItem('df-welcome-dismissed')) {
      setTimeout(() => {
        welcomeModal.classList.add('active');
      }, 400);
    }

    window.closeWelcomeModal = function () {
      if (welcomeModal) welcomeModal.classList.remove('active');
      sessionStorage.setItem('df-welcome-dismissed', 'true');
    };

    const logoutModal = document.getElementById('logout-modal');
    window.triggerLogoutModal = function (e) {
      if (e) e.preventDefault();
      if (logoutModal) logoutModal.classList.add('active');
    };

    window.closeLogoutModal = function () {
      if (logoutModal) logoutModal.classList.remove('active');
    };

    window.confirmSignOut = function () {
      window.closeLogoutModal();
      window.showToast('Signing out of DisplayFlow...', 'info');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 600);
    };
  });
})();
