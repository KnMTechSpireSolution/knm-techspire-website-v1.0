# Live Customer Feedback + Left-to-Right Ticker Update

## Files included
- TESTIMONIAL-SECTION-REPLACE.html
- live-feedback-ticker-patch.css
- live-feedback.js

## How to apply
1. Open your current `index.html`.
2. Find the current `<section id="testimonials" ...>` block.
3. Replace the full testimonial section with the content from `TESTIMONIAL-SECTION-REPLACE.html`.
4. Add this before `</body>`:

```html
<script src="live-feedback.js"></script>
```

5. Upload `live-feedback.js` to your GitHub repository root.
6. Open your current `style.css`.
7. Paste the content of `live-feedback-ticker-patch.css` at the VERY BOTTOM.
8. Commit changes and wait for Netlify deploy.

## Netlify setup
- In Netlify, enable Forms / Form detection.
- After deployment, customer feedback submissions should appear in Netlify → Forms → customer-feedback.

## Important limitation
This version shows feedback instantly in the visitor browser and stores it in that browser using localStorage. Netlify Forms captures submissions for you to review. For all visitors to see the same public testimonials permanently, you need a backend/database such as Supabase, Firebase, or a Netlify Function.
