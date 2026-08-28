/**
 * Sinethemba Hope Organisation - Modern Interaction & Giving Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Menu Drawer ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const closeMobileMenuBtn = document.getElementById('closeMobileMenuBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenuDrawer) {
    const toggleMenu = (open) => {
      if (open) {
        mobileMenuDrawer.classList.remove('translate-x-full');
        mobileMenuDrawer.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
      } else {
        mobileMenuDrawer.classList.remove('translate-x-0');
        mobileMenuDrawer.classList.add('translate-x-full');
        document.body.style.overflow = '';
      }
    };

    mobileMenuBtn.addEventListener('click', () => toggleMenu(true));
    if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', () => toggleMenu(false));

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  // --- 2. Interactive Giving Engine ---
  const freqOnceBtn = document.getElementById('freqOnceBtn');
  const freqMonthlyBtn = document.getElementById('freqMonthlyBtn');
  const amountCards = document.querySelectorAll('.donation-preset-card');
  const customAmountInput = document.getElementById('customAmountInput');
  const donationSummaryAmount = document.getElementById('donationSummaryAmount');
  const donationSummaryFreq = document.getElementById('donationSummaryFreq');
  const donationSummaryImpact = document.getElementById('donationSummaryImpact');
  const proceedDonationBtn = document.getElementById('proceedDonationBtn');

  let selectedAmount = '450';
  let selectedFrequency = 'once'; // 'once' or 'monthly'

  const impactMap = {
    '150': 'Provides essential school stationery and study pack for 1 student.',
    '450': 'Provides a full tailored school uniform set and shoes for 1 learner.',
    '1200': 'Equips a youth community sports team with balls, jerseys & coaching kit.'
  };

  const updateDonationSummary = () => {
    const displayAmount = customAmountInput && customAmountInput.value.trim() !== '' 
      ? `R${customAmountInput.value.trim()}` 
      : `R${selectedAmount}`;

    if (donationSummaryAmount) donationSummaryAmount.textContent = displayAmount;
    if (donationSummaryFreq) {
      donationSummaryFreq.textContent = selectedFrequency === 'monthly' ? '/ month' : ' (One-Time)';
    }

    if (donationSummaryImpact) {
      if (customAmountInput && customAmountInput.value.trim() !== '') {
        donationSummaryImpact.textContent = 'Custom community support & youth development funding.';
      } else {
        donationSummaryImpact.textContent = impactMap[selectedAmount] || 'Vital community upliftment and youth education funding.';
      }
    }

    if (proceedDonationBtn) {
      proceedDonationBtn.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=V6JWCTBSDK9JU&amount=${selectedAmount}`;
    }
  };

  // Frequency Toggles
  if (freqOnceBtn && freqMonthlyBtn) {
    freqOnceBtn.addEventListener('click', () => {
      selectedFrequency = 'once';
      freqOnceBtn.classList.add('bg-white', 'text-brand-navy', 'shadow-sm');
      freqOnceBtn.classList.remove('text-slate-600');
      freqMonthlyBtn.classList.remove('bg-white', 'text-brand-navy', 'shadow-sm');
      freqMonthlyBtn.classList.add('text-slate-600');
      updateDonationSummary();
    });

    freqMonthlyBtn.addEventListener('click', () => {
      selectedFrequency = 'monthly';
      freqMonthlyBtn.classList.add('bg-white', 'text-brand-navy', 'shadow-sm');
      freqMonthlyBtn.classList.remove('text-slate-600');
      freqOnceBtn.classList.remove('bg-white', 'text-brand-navy', 'shadow-sm');
      freqOnceBtn.classList.add('text-slate-600');
      updateDonationSummary();
    });
  }

  // Preset Amount Selection
  amountCards.forEach(card => {
    card.addEventListener('click', () => {
      amountCards.forEach(c => {
        c.classList.remove('border-brand-gold', 'bg-amber-50/60', 'ring-2', 'ring-brand-gold');
        c.classList.add('border-slate-200', 'bg-white');
      });

      card.classList.remove('border-slate-200', 'bg-white');
      card.classList.add('border-brand-gold', 'bg-amber-50/60', 'ring-2', 'ring-brand-gold');

      selectedAmount = card.getAttribute('data-amount');
      if (customAmountInput) customAmountInput.value = '';
      updateDonationSummary();
    });
  });

  // Custom Amount Input Handler
  if (customAmountInput) {
    customAmountInput.addEventListener('input', () => {
      if (customAmountInput.value.trim() !== '') {
        amountCards.forEach(c => {
          c.classList.remove('border-brand-gold', 'bg-amber-50/60', 'ring-2', 'ring-brand-gold');
          c.classList.add('border-slate-200', 'bg-white');
        });
        selectedAmount = customAmountInput.value.trim();
      } else {
        selectedAmount = '450';
        const defaultCard = document.querySelector('[data-amount="450"]');
        if (defaultCard) {
          defaultCard.classList.remove('border-slate-200', 'bg-white');
          defaultCard.classList.add('border-brand-gold', 'bg-amber-50/60', 'ring-2', 'ring-brand-gold');
        }
      }
      updateDonationSummary();
    });
  }

  // --- 3. Direct EFT Accordion & Copy to Clipboard ---
  const eftToggleBtn = document.getElementById('eftToggleBtn');
  const eftDetailsBox = document.getElementById('eftDetailsBox');
  const copyEftBtn = document.getElementById('copyEftBtn');
  const copyFeedback = document.getElementById('copyFeedback');

  if (eftToggleBtn && eftDetailsBox) {
    eftToggleBtn.addEventListener('click', () => {
      eftDetailsBox.classList.toggle('hidden');
      const isExpanded = !eftDetailsBox.classList.contains('hidden');
      eftToggleBtn.querySelector('.toggle-icon').style.transform = isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  }

  if (copyEftBtn) {
    copyEftBtn.addEventListener('click', () => {
      const bankDetails = "Account Holder: Sinethemba Hope organization\nBank: First National Bank (FNB)\nAccount Number: 62233690404\nBranch Code: 250655";
      navigator.clipboard.writeText(bankDetails).then(() => {
        if (copyFeedback) {
          copyFeedback.classList.remove('opacity-0');
          setTimeout(() => copyFeedback.classList.add('opacity-0'), 2500);
        }
      });
    });
  }

  // --- 4. Accessible Form Feedback Handlers ---
  const handleForm = (formId, alertId) => {
    const form = document.getElementById(formId);
    const alert = document.getElementById(alertId);
    if (form && alert) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const origText = submitBtn ? submitBtn.innerText : '';
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = 'Submitting...';
        }

        setTimeout(() => {
          form.reset();
          alert.classList.remove('hidden');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = origText;
          }
          setTimeout(() => alert.classList.add('hidden'), 5000);
        }, 500);
      });
    }
  };

  handleForm('contactForm', 'contactSuccessAlert');
  handleForm('section18AForm', 'taxReceiptSuccessAlert');
  handleForm('newsletterForm', 'newsletterSuccessAlert');
});