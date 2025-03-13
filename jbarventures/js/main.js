document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
    
    // Citations Toggle
    const citationsToggle = document.querySelector('.citations-toggle');
    const citationsContent = document.querySelector('.citations-content');
    
    if (citationsToggle) {
        citationsToggle.addEventListener('click', function() {
            citationsContent.style.display = citationsContent.style.display === 'none' ? 'block' : 'none';
            this.classList.toggle('active');
        });
    }
    
    // Initialize particle.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 120,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#4cb67a", "#2a9d8f", "#ffffff"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.6,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4cb67a",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": true,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.8
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // If this is a citation link, activate the appropriate tab
                if (targetId.includes('citations')) {
                    const tabId = targetId.replace('#', '');
                    activateCitationTab(tabId);
                }
            }
        });
    });
    
    // Citations tab functionality
    const citationTabs = document.querySelectorAll('.citation-tab');
    
    function activateCitationTab(tabId) {
        // Hide all panes
        document.querySelectorAll('.citation-pane').forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Deactivate all tabs
        citationTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Activate the selected pane
        const selectedPane = document.getElementById(tabId);
        if (selectedPane) {
            selectedPane.classList.add('active');
            
            // Find and activate the corresponding tab
            const correspondingTab = Array.from(citationTabs).find(
                tab => tab.getAttribute('data-tab') === tabId
            );
            
            if (correspondingTab) {
                correspondingTab.classList.add('active');
            }
        }
    }
    
    // Add click handlers to tabs
    citationTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            activateCitationTab(tabId);
        });
    });

    // Scroll animation for elements
    function animateOnScroll() {
        const elements = document.querySelectorAll('[data-aos]');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('animate-in');
                
                // Add delay based on data attribute
                const delay = element.getAttribute('data-aos-delay');
                if (delay) {
                    element.style.animationDelay = `${parseInt(delay) / 1000}s`;
                }
            }
        });
    }
    
    // Run animation check on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Header scroll effect
    function headerScrollEffect() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    }
    
    window.addEventListener('scroll', headerScrollEffect);
    
    // Testimonial slider functionality
    let currentSlide = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Initialize the first slide
    showSlide(currentSlide);
    
    // Add click event to dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
        });
    });
    
    // Auto-rotate testimonials with much slower timing (15 seconds instead of 5)
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }, 15000);
    
    // Form submission handling with Formspree
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default as we want the form to submit to Formspree
            // However, we still want to update the UI to show submission status
            
            // Change button text to show loading
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // We'll add a small delay before showing success to ensure Formspree has time to process
            // This is handled by Formspree's redirect (we'll be redirected back to the site)
            
            // No need to manually reset the form as the page will refresh after submission
        });
        
        // Check if user was redirected back from Formspree (successful submission)
        if (window.location.search.includes('?submitted=true')) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success-message';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! We will get back to you soon.';
            
            // Insert before the form
            contactForm.parentNode.insertBefore(successMessage, contactForm);
            
            // Hide the form
            contactForm.style.display = 'none';
            
            // Remove query parameters from URL without refreshing
            history.replaceState({}, document.title, window.location.pathname);
            
            // Show form again after 5 seconds
            setTimeout(() => {
                successMessage.remove();
                contactForm.style.display = 'block';
                contactForm.reset();
            }, 5000);
        }
    }
});