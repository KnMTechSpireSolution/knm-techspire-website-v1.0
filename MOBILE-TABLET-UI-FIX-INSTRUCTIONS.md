# Mobile / Tablet UI Fix Patch

This patch fixes mobile, Android, iOS, iPad and tablet layout issues.

## What it fixes
- Header logo/company name alignment on mobile
- Navigation wrapping and spacing
- Hero section stacking on phones and tablets
- iPad hero visual resizing
- Prevents horizontal overflow
- Prevents long text from breaking layout
- Form inputs fit mobile screen correctly
- Service cards, portfolio, testimonials and footer become single column on phones
- iOS input zoom prevention using 16px form font size

## How to apply
1. Open your current `style.css` in GitHub.
2. Paste the full content of `mobile-tablet-ui-fix.css` at the VERY BOTTOM.
3. Commit changes.
4. Wait for Netlify deployment.
5. Hard refresh your phone browser.

Do not replace the full CSS with only this patch. Paste it at the bottom.
