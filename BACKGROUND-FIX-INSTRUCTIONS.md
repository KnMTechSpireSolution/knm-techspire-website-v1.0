# Important Fix: Future-Ready AI Background Not Showing

Upload BOTH files to GitHub root:

```txt
index.html
style.css
```

This fix uses a new visible background wrapper:

```html
<div class="ai-bg" aria-hidden="true">...</div>
```

The previous background may not show because the old CSS used negative z-index layers, which can hide behind the page/body background. This version keeps the animated background at z-index 0 and places all website content above it.

After upload:
1. Commit changes.
2. Wait for Netlify deployment.
3. Hard refresh browser: Ctrl + Shift + R.
4. If still not visible, clear Netlify/browser cache.

Also replace `60XXXXXXXXX` with your real WhatsApp number.
