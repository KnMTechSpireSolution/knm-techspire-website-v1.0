# Supabase Testimonial Approval Setup Guide

Website is already connected to Supabase.

Approval flow:
1. Customer submits feedback.
2. Supabase saves row as `pending`.
3. Open Supabase → Table Editor → testimonials.
4. Change `status` to `approved`.
5. Refresh website to show approved feedback.
