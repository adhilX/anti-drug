document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const pledgeForm = document.getElementById("pledge-form");
  const pledgeCount = document.getElementById("pledge-count");
  const factsSection = document.querySelector(".facts");
  const pledgeCounterSection = document.querySelector(".pledge-counter");

  // Mobile menu toggle
  if (hamburger) {
      hamburger.addEventListener("click", () => {
          navLinks.classList.toggle("active");
          hamburger.classList.toggle("active");
      });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();

          const targetId = this.getAttribute("href");
          if (targetId === "#") return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              // Close mobile menu if open
              if (navLinks.classList.contains("active")) {
                  navLinks.classList.remove("active");
                  hamburger.classList.remove("active");
              }

              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: "smooth",
              });
          }
      });
  });

  // Animate number counters
  function animateCounters() {
      const counters = document.querySelectorAll(".fact-number, #pledge-count");

      counters.forEach((counter) => {
          const target = +counter.getAttribute("data-target");

          // Error handling: Check if data-target is valid
          if (isNaN(target)) {
              console.error("Invalid data-target attribute:", counter);
              return; // Skip this counter
          }

          const duration = 2000; // 2 seconds
          const startTime = performance.now();

          function updateCounter(currentTime) {
              const elapsedTime = currentTime - startTime;
              const progress = Math.min(elapsedTime / duration, 1);

              // Easing function for smoother animation
              const easedProgress = 1 - Math.pow(1 - progress, 3);

              const currentValue = Math.floor(easedProgress * target);
              counter.textContent = currentValue.toLocaleString();

              if (progress < 1) {
                  requestAnimationFrame(updateCounter);
              }
          }

          requestAnimationFrame(updateCounter);
      });
  }

  // Handle form submission
  if (pledgeForm) {
      pledgeForm.addEventListener("submit", function (e) {
          e.preventDefault();

          const nameInput = this.querySelector('input[type="text"]');
          const name = nameInput.value.trim();

          if (name) {
              // Simulate adding to pledge count
              const currentCount = Number.parseInt(pledgeCount.textContent.replace(/,/g, ""));
              pledgeCount.setAttribute("data-target", currentCount + 1);

              // Show success message
              nameInput.value = "";

              const successMessage = document.createElement("div");
              successMessage.className = "success-message";
              successMessage.textContent = `Thank you, ${name}! Your pledge has been recorded.`;
              successMessage.style.color = "white";
              successMessage.style.backgroundColor = "rgba(0, 191, 166, 0.8)";
              successMessage.style.padding = "1rem";
              successMessage.style.borderRadius = "5px";
              successMessage.style.marginTop = "1rem";

              // Add success message after form
              pledgeForm.after(successMessage);

              // Remove success message after 5 seconds
              setTimeout(() => {
                  successMessage.style.opacity = "0";
                  successMessage.style.transition = "opacity 0.5s ease";

                  setTimeout(() => {
                      successMessage.remove();
                  }, 500);
              }, 5000);

              // Update counter
              animateCounters();
          }
      });
  }

  // Intersection Observer for animations
  const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              entry.target.classList.add("aos-animate");

              // If this is a counter section, animate the counters
              if (entry.target.classList.contains("facts") || entry.target.classList.contains("pledge-counter")) {
                  animateCounters();
              }
          }
      });
  }, observerOptions);

  // Observe elements with data-aos attribute
  document.querySelectorAll("[data-aos]").forEach((element) => {
      observer.observe(element);
  });

  // Observe sections for counter animations
  if (factsSection) observer.observe(factsSection);
  if (pledgeCounterSection) observer.observe(pledgeCounterSection);

  // Add CSS for mobile menu
  const style = document.createElement("style");
  style.textContent = `
      .nav-links.active {
          display: flex;
          flex-direction: column;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background-color: white;
          padding: 1rem;
          box-shadow: 0 5px 10px rgba(0,0,0,0.1);
          animation: slideDown 0.3s ease forwards;
      }
      
      @keyframes slideDown {
          from {
              opacity: 0;
              transform: translateY(-10px);
          }
          to {
              opacity: 1;
              transform: translateY(0);
          }
      }
      
      .nav-links.active li {
          margin: 1rem 0;
      }
      
      .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
      }
      
      .hamburger.active span:nth-child(2) {
          opacity: 0;
      }
      
      .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
      }
  `;
  document.head.appendChild(style);

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
      const scrollPosition = window.pageYOffset;
      const heroSection = document.querySelector(".hero");

      if (heroSection && scrollPosition < window.innerHeight) {
          const circles = document.querySelectorAll(".circle");

          circles.forEach((circle, index) => {
              const speed = 0.1 * (index + 1);
              circle.style.transform = `translateY(${scrollPosition * speed}px)`;
          });
      }
  });

  // Add hover animations for buttons
  const buttons = document.querySelectorAll(".cta-button");
  buttons.forEach((button) => {
      button.addEventListener("mouseover", function () {
          this.style.transform = "translateY(-3px)";
          this.style.boxShadow = "0 10px 20px rgba(108, 99, 255, 0.2)";
      });

      button.addEventListener("mouseout", function () {
          this.style.transform = "";
          this.style.boxShadow = "";
      });
  });

  // Add pulsing effect to the "NO" highlight
  const highlightElement = document.querySelector(".highlight");
  if (highlightElement) {
      setInterval(() => {
          highlightElement.style.textShadow = "0 0 15px rgba(255, 92, 92, 0.8)";

          setTimeout(() => {
              highlightElement.style.textShadow = "none";
          }, 500);
      }, 2000);
  }

  // Add more dramatic hover effect for resource cards
  const resourceCards = document.querySelectorAll(".resource-card");
  resourceCards.forEach((card) => {
      card.addEventListener("mouseover", function () {
          this.style.transform = "translateY(-10px) scale(1.03)";
          this.style.boxShadow = "0 15px 30px rgba(230, 57, 70, 0.3)";
          this.style.borderLeft = "8px solid #e63946";
      });

      card.addEventListener("mouseout", function () {
          this.style.transform = "";
          this.style.boxShadow = "";
          this.style.borderLeft = "4px solid #e63946";
      });
  });

  // Carousel functionality
  const carousel = {
      currentSlide: 0,
      slides: document.querySelectorAll('.carousel-item'), // Corrected selector
      indicators: document.querySelectorAll('.carousel-indicators button'), // Corrected selector
      prevBtn: document.querySelector('.carousel-control-prev'), // Corrected selector
      nextBtn: document.querySelector('.carousel-control-next'), // Corrected selector
      autoplayInterval: null,

      init() {
          this.addEventListeners();
          this.startAutoplay();
          this.updateIndicators();
      },

      addEventListeners() {
          this.prevBtn.addEventListener('click', () => this.prevSlide());
          this.nextBtn.addEventListener('click', () => this.nextSlide());

          this.indicators.forEach((indicator, index) => {
              indicator.addEventListener('click', () => this.goToSlide(index));
          });

          // Pause autoplay on hover
          document.querySelector('.carousel-container').addEventListener('mouseenter', () => {
              this.stopAutoplay();
          });

          document.querySelector('.carousel-container').addEventListener('mouseleave', () => {
              this.startAutoplay();
          });
      },

      updateSlides() {
          // Remove active class from all slides
          this.slides.forEach(slide => slide.classList.remove('active'));

          // Add active class to current slide
          this.slides[this.currentSlide].classList.add('active');

          this.updateIndicators();
      },

      updateIndicators() {
          // Remove active class from all indicators
          this.indicators.forEach(indicator => indicator.classList.remove('active'));

          // Add active class to current indicator
          this.indicators[this.currentSlide].classList.add('active');
      },

      nextSlide() {
          this.currentSlide = (this.currentSlide + 1) % this.slides.length;
          this.updateSlides();
      },

      prevSlide() {
          this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
          this.updateSlides();
      },

      goToSlide(index) {
          this.currentSlide = index;
          this.updateSlides();
      },

      startAutoplay() {
          this.autoplayInterval = setInterval(() => {
              this.nextSlide();
          }, 3000); // Change slide every 3 seconds
      },

      stopAutoplay() {
          clearInterval(this.autoplayInterval);
      }
  };

  // Initialize carousel when DOM is loaded
  carousel.init();
});
