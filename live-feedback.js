/* Add this script before </body>, or upload as live-feedback.js and include:
<script src="live-feedback.js"></script>
*/
function encodeFormData(data){return new URLSearchParams(data).toString();}
const testimonialForm=document.getElementById('testimonialForm');
const testimonialList=document.getElementById('testimonialList');
const feedbackStatus=document.getElementById('feedbackStatus');
const storageKey='knm_customer_feedback_v1';
function sanitizeText(value){const div=document.createElement('div');div.textContent=value||'';return div.innerHTML;}
function addFeedbackCard(item,save){
  if(!testimonialList)return;
  const card=document.createElement('article');
  card.className='testimonial live-card customer-added';
  card.innerHTML=`<strong>“</strong><p>${sanitizeText(item.feedback)}</p><span>${sanitizeText(item.rating)} • ${sanitizeText(item.name)}${item.company?' • '+sanitizeText(item.company):''}</span>`;
  testimonialList.prepend(card);
  if(save){const existing=JSON.parse(localStorage.getItem(storageKey)||'[]');existing.unshift(item);localStorage.setItem(storageKey,JSON.stringify(existing.slice(0,10)));}
}
try{JSON.parse(localStorage.getItem(storageKey)||'[]').reverse().forEach(item=>addFeedbackCard(item,false));}catch(error){console.warn('Feedback storage could not be loaded',error);}
if(testimonialForm){testimonialForm.addEventListener('submit',async function(event){
  event.preventDefault();
  const formData=new FormData(testimonialForm);
  const item={name:formData.get('name'),company:formData.get('company'),rating:formData.get('rating'),feedback:formData.get('feedback')};
  if(feedbackStatus)feedbackStatus.textContent='Posting feedback...';
  try{
    await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:encodeFormData(formData)});
    addFeedbackCard(item,true);testimonialForm.reset();
    if(feedbackStatus)feedbackStatus.textContent='Thank you. Your feedback has been posted and submitted.';
  }catch(error){
    addFeedbackCard(item,true);
    if(feedbackStatus)feedbackStatus.textContent='Feedback is shown here. If connection failed, please try again later.';
  }
});}
