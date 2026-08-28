/**
 * Sinethemba Hope Organization - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // 2. Interactive Form Submission Handlers
  const handleFormSubmission = (formId, successMsgId) => {
    const form = document.getElementById(formId);
    const successMsg = document.getElementById(successMsgId);

    if (form && successMsg) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Disable submit button during processing
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Processing...';
        }

        // Simulate successful submission
        setTimeout(() => {
          form.reset();
          successMsg.classList.add('show');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtn.getAttribute('data-original-text') || 'Send';
          }
          // Hide message after 6 seconds
          setTimeout(() => {
            successMsg.classList.remove('show');
          }, 6000);
        }, 600);
      });
    }
  };

  // Attach handlers
  handleFormSubmission('contactForm', 'contactSuccessMsg');
  handleFormSubmission('directDonationForm', 'directDonationSuccessMsg');
  handleFormSubmission('newsletterForm', 'newsletterSuccessMsg');
});