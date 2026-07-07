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

const processData = {
  plan: {
    number: '01',
    title: 'Plan Your Requirement',
    text: 'We review your business needs, site environment, budget and project goal before recommending a suitable technology solution.',
    points: ['Requirement analysis', 'Site survey and assessment', 'Solution planning', 'Cost estimation'],
    message: 'Hello K&M TechSpire Solution, I would like to discuss the Plan step. Please contact me.'
  },
  source: {
    number: '02',
    title: 'Source Trusted Technology',
    text: 'We help source reliable hardware, software, CCTV, networking and business technology brands based on your requirements and budget.',
    points: ['Brand recommendation', 'Product sourcing', 'Vendor coordination', 'Availability checking'],
    message: 'Hello K&M TechSpire Solution, I would like to discuss the Source step. Please contact me.'
  },
  deploy: {
    number: '03',
    title: 'Deploy With Proper Coordination',
    text: 'We support delivery, installation, setup, configuration and project coordination to reduce disruption during implementation.',
    points: ['Delivery coordination', 'Installation support', 'Configuration assistance', 'Deployment tracking'],
    message: 'Hello K&M TechSpire Solution, I would like to discuss the Deploy step. Please contact me.'
  },
  support: {
    number: '04',
    title: 'Support After Delivery',
    text: 'We provide smart hand support, follow-up assistance and vendor coordination to keep your technology running smoothly.',
    points: ['Smart hand support', 'Follow-up assistance', 'Vendor support coordination', 'Issue escalation'],
    message: 'Hello K&M TechSpire Solution, I would like to discuss the Support step. Please contact me.'
  }
};

const processCards = document.querySelectorAll('.process-card');
const processPanel = document.getElementById('processRevealPanel');
const processNumber = document.getElementById('processRevealNumber');
const processTitle = document.getElementById('processRevealTitle');
const processText = document.getElementById('processRevealText');
const processList = document.getElementById('processRevealList');
const processWhatsapp = document.getElementById('processWhatsapp');

function setProcessStep(stepKey) {
  const data = processData[stepKey];
  if (!data) return;
  processCards.forEach(card => {
    const active = card.dataset.step === stepKey;
    card.classList.toggle('active', active);
    card.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  if (processNumber) processNumber.textContent = data.number;
  if (processTitle) processTitle.textContent = data.title;
  if (processText) processText.textContent = data.text;
  if (processList) processList.innerHTML = data.points.map(point => `<li>${point}</li>`).join('');
  if (processWhatsapp) processWhatsapp.href = `https://wa.me/60176232542?text=${encodeURIComponent(data.message)}`;
  if (processPanel) {
    processPanel.classList.remove('revealing');
    void processPanel.offsetWidth;
    processPanel.classList.add('revealing');
  }
}
processCards.forEach(card => card.addEventListener('click', () => setProcessStep(card.dataset.step)));

const SUPABASE_URL = 'https://gvasctwdmacbgliasrqg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YXNjdHdkbWFjYmdsaWFzcnFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0MzExNDUsImV4cCI6MjA5OTAwNzE0NX0.jX34vJQswMx9PFOuwIdfx8azzFOrHj8L4U5ke9Ik7no';
const supabaseReady = SUPABASE_URL.startsWith('https://') && !SUPABASE_ANON_KEY.startsWith('PASTE_');
const testimonialForm = document.getElementById('testimonialForm');
const testimonialList = document.getElementById('testimonialList');
const feedbackStatus = document.getElementById('feedbackStatus');
function safe(value) { const div = document.createElement('div'); div.textContent = value || ''; return div.innerHTML; }
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
    const response = await fetch(`${SUPABASE_URL}/rest/v1/testimonials?select=name,company,rating,feedback,created_at&status=eq.approved&order=created_at.desc`, { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } });
    if (response.ok) renderApprovedTestimonials(await response.json());
  } catch (error) { console.warn('Approved testimonials could not be loaded', error); }
}
loadApprovedTestimonials();
if (testimonialForm) {
  testimonialForm.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(testimonialForm);
    const item = { name: formData.get('name'), company: formData.get('company'), rating: formData.get('rating'), feedback: formData.get('feedback'), status: 'pending' };
    if (feedbackStatus) feedbackStatus.textContent = 'Submitting feedback for approval...';
    try {
      if (supabaseReady) {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/testimonials`, { method: 'POST', headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify(item) });
        if (!response.ok) throw new Error('Supabase submission failed');
      } else {
        formData.set('form-name', 'customer-feedback');
        await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(formData).toString() });
      }
      testimonialForm.reset();
      if (feedbackStatus) feedbackStatus.textContent = 'Thank you. Your feedback has been submitted for approval.';
    } catch (error) {
      if (feedbackStatus) feedbackStatus.textContent = 'Unable to submit feedback now. Please try again later.';
      console.error(error);
    }
  });
}
