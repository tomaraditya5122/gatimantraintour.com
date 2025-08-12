// Gatiman Train Tours - Enhanced JavaScript
// Author: Professional Web Developer
// Version: 2.0

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initPreloader();
  initNavigation();
  initScrollAnimations();
  initFormHandling();
  initSmoothScrolling();
  initBackToTop();
  initVideoPlayback();
  initCountUpAnimation();
  initParallaxEffects();
  initTooltips();
});

// Preloader functionality
function initPreloader() {
  const preloader = document.getElementById("preloader");

  window.addEventListener("load", function () {
    setTimeout(() => {
      preloader.classList.add("hidden");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 1000);
  });
}

// Enhanced Navigation
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.getElementById("header");

  // Mobile menu toggle
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  // Header scroll effect
  let lastScrollTop = 0;
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Hide/show header on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // Active navigation highlighting
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) navLink.classList.add("active");
      }
    });
  });
}

// Scroll Animations
function initScrollAnimations() {
  const fadeElements = document.querySelectorAll(".fade-in");
  const cards = document.querySelectorAll(
    ".highlight-card, .feature-card, .testimonial-card",
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Add staggered animation for cards
        if (
          entry.target.classList.contains("highlight-card") ||
          entry.target.classList.contains("feature-card") ||
          entry.target.classList.contains("testimonial-card")
        ) {
          const delay = Math.random() * 0.3;
          entry.target.style.animationDelay = `${delay}s`;
        }
      }
    });
  }, observerOptions);

  // Observe fade elements
  fadeElements.forEach((element) => {
    observer.observe(element);
  });

  // Observe cards
  cards.forEach((card) => {
    observer.observe(card);
  });

  // Itinerary items animation
  const itineraryItems = document.querySelectorAll(".itinerary-item");
  itineraryItems.forEach((item, index) => {
    const delay = index * 0.2;
    item.style.animationDelay = `${delay}s`;
    observer.observe(item);
  });
}

// Enhanced Form Handling
function initFormHandling() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate form submission
      setTimeout(() => {
        // Show success message
        showNotification(
          "Thank you! Your message has been sent successfully. We will get back to you soon.",
          "success",
        );
        contactForm.reset();

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });

    // Real-time form validation
    const inputs = contactForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", validateField);
      input.addEventListener("input", clearError);
    });
  }
}

// Form validation functions
function validateField(e) {
  const field = e.target;
  const value = field.value.trim();

  // Remove existing error
  clearError(e);

  // Validation rules
  if (field.hasAttribute("required") && !value) {
    showFieldError(field, "This field is required");
    return false;
  }

  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showFieldError(field, "Please enter a valid email address");
      return false;
    }
  }

  if (field.type === "tel" && value) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(value) || value.length < 10) {
      showFieldError(field, "Please enter a valid phone number");
      return false;
    }
  }

  return true;
}

function showFieldError(field, message) {
  field.classList.add("error");

  let errorElement = field.parentNode.querySelector(".error-message");
  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "error-message";
    field.parentNode.appendChild(errorElement);
  }
  errorElement.textContent = message;
}

function clearError(e) {
  const field = e.target;
  field.classList.remove("error");

  const errorElement = field.parentNode.querySelector(".error-message");
  if (errorElement) {
    errorElement.remove();
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// Video Playback Optimization
function initVideoPlayback() {
  const heroVideo = document.querySelector(".hero-video video");

  if (heroVideo) {
    // Ensure video plays on mobile
    heroVideo.addEventListener("loadeddata", function () {
      this.play().catch((error) => {
        console.log("Video autoplay prevented:", error);
      });
    });

    // Pause video when not in viewport (performance)
    const videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          heroVideo
            .play()
            .catch((error) => console.log("Video play error:", error));
        } else {
          heroVideo.pause();
        }
      });
    });

    videoObserver.observe(heroVideo);
  }
}

// Count Up Animation for Statistics
function initCountUpAnimation() {
  const stats = document.querySelectorAll(".stat-number");

  const countUp = (element, target) => {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString() + "+";
    }, 16);
  };

  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.textContent.replace(/[^\d]/g, ""));
        countUp(entry.target, target);
        statsObserver.unobserve(entry.target);
      }
    });
  });

  stats.forEach((stat) => {
    statsObserver.observe(stat);
  });
}

// Parallax Effects
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll(".hero");

  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    parallaxElements.forEach((element) => {
      element.style.transform = `translateY(${rate}px)`;
    });
  });
}

// Tooltip Functionality
function initTooltips() {
  const tooltipElements = document.querySelectorAll("[data-tooltip]");

  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = this.getAttribute("data-tooltip");
      document.body.appendChild(tooltip);

      const rect = this.getBoundingClientRect();
      tooltip.style.left =
        rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px";
    });

    element.addEventListener("mouseleave", function () {
      const tooltip = document.querySelector(".tooltip");
      if (tooltip) {
        tooltip.remove();
      }
    });
  });
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;

  notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-message">${message}</div>
            <button class="notification-close">&times;</button>
        </div>
    `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.add("fade-out");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);

  // Manual close
  notification
    .querySelector(".notification-close")
    .addEventListener("click", function () {
      notification.classList.add("fade-out");
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });
}

// Lazy Loading for Images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-src");
        img.removeAttribute("data-src");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });
}

// Keyboard Navigation
document.addEventListener("keydown", function (e) {
  // Escape key to close mobile menu
  if (e.key === "Escape") {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  }
});

// Performance Optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function () {
  // Any expensive scroll operations go here
}, 16);

window.addEventListener("scroll", optimizedScrollHandler);

// Error Handling
window.addEventListener("error", function (e) {
  console.error("JavaScript Error:", e.error);
  // Could send error to analytics service
});

// Service Worker Registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("ServiceWorker registration successful");
      })
      .catch(function (error) {
        console.log("ServiceWorker registration failed");
      });
  });
}

// Initialize lazy loading when DOM is ready
document.addEventListener("DOMContentLoaded", initLazyLoading);

// Add smooth reveal animation for cards
function addCardRevealAnimation() {
  const cards = document.querySelectorAll(
    ".highlight-card, .feature-card, .testimonial-card",
  );

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";
    card.style.transitionDelay = `${index * 0.1}s`;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(card);
  });
}

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }),
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Form submission
document
  .querySelector(".contact-form form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
  });

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards";
    }
  });
}, observerOptions);

// Observe all cards and sections
document
  .querySelectorAll(
    ".feature-card, .destination-card, .package-card, .testimonial-card",
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Initialize card animations
document.addEventListener("DOMContentLoaded", addCardRevealAnimation);

// Add CSS for additional styles
const additionalStyles = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }

    .back-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    }

    .notification-error {
        background: #e74c3c;
    }

    .notification-warning {
        background: #f39c12;
    }

    .notification.fade-out {
        animation: slideOutRight 0.3s ease;
    }

    .form-group .error {
        border-color: #e74c3c !important;
        box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1) !important;
    }

    .error-message {
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        animation: fadeInUp 0.3s ease;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .menu-open {
        overflow: hidden;
    }
`;

// Inject additional styles
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

console.log("🚂 Gatiman Train Tours - Website Loaded Successfully!");
