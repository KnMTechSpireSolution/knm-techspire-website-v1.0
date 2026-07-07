const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach(el => revealObserver.observe(el));

// Supabase testimonial approval configuration
const SUPABASE_URL = 'https://gvasctwdmacbgliasrqg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YXNjdHdkbWFjYmdsaWFzcnFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MzExNDUsImV4cCI6MjA5OTAwNzE0NX0.jX34vJQswMx9PFOuwIdfx8azzFOrHj8L4U5ke9Ik7no';
const supabaseReady = SUPABASE_URL.startsWith('https://') && !SUPABASE_ANON_KEY.startsWith('PASTE_');

const testimonialForm = document.getElementById('testimonialForm');
const testimonialList = document.getElementById('testimonialList');
const feedbackStatus = document.getElementById('feedbackStatus');

function safe(value) {
  const div = document.createElement('div');
  div.textContent = value || '';
  return div.innerHTML;
}

function renderApprovedTestimonials(items) {
  if (!testimonialList || !items || !items.length) return;
  testimonialList.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'testimonial live-card customer-added';
    card.innerHTML = `<strong>“</strong><p>${safe(item.feedback)}</p><span>${safe(item.rating)} • ${safe(item.name)}${item.company ? ' • ' + safe(item.company) : ''}</span>`;
    testimonialList.appendChild(card);
  });
}

async function loadApprovedTestimonials() {
  if (!supabaseReady) return;
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/testimonials?select=name,company,rating,feedback,created_at&status=eq.approved&order=created_at.desc`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (response.ok) {
      const items = await response.json();
      renderApprovedTestimonials(items);
    }
  } catch (error) {
    console.warn('Approved testimonials could not be loaded', error);
  }
}
loadApprovedTestimonials();

if (testimonialForm) {
  testimonialForm.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(testimonialForm);
    const item = {
      name: formData.get('name'),
      company: formData.get('company'),
      rating: formData.get('rating'),
      feedback: formData.get('feedback'),
      status: 'pending'
    };

    if (feedbackStatus) feedbackStatus.textContent = 'Submitting feedback for approval...';

    try {
      if (supabaseReady) {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/testimonials`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal'
          },
          body: JSON.stringify(item)
        });
        if (!response.ok) throw new Error('Supabase submission failed');
      } else {
        formData.set('form-name', 'customer-feedback');
        await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        });
      }
      testimonialForm.reset();
      if (feedbackStatus) feedbackStatus.textContent = 'Thank you. Your feedback has been submitted for approval.';
    } catch (error) {
      if (feedbackStatus) feedbackStatus.textContent = 'Unable to submit feedback now. Please try again later.';
      console.error(error);
    }
  });
}
