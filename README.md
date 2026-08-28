# Sinethemba Hope Organization Website

A clean, modern, standalone static replica of the Sinethemba Hope Organization website (`sinethembahopeorg`), recreated without proprietary Wix dependencies and ready for zero-cost hosting on **GitHub Pages** (or Netlify, Vercel, Cloudflare Pages) with custom domain support.

## ðŸš€ Quick Local Preview
Simply open any HTML file (`index.html`, `about_us.html`, `get_involved.html`, `donate.html`, `contact.html`) in your browser or run a local web server:

```bash
# Using Python
python -m http.server 8000

# Using Node (npx)
npx serve
```

## ðŸ“¦ Project Structure
```
sinethembahopeorg/
â”œâ”€â”€ index.html            # Home page (with interactive Hero Slideshow & Project Cards)
â”œâ”€â”€ about_us.html         # About Us page (History, Vision, Mission, HOPE Framework)
â”œâ”€â”€ get_involved.html     # Get Involved page (Sponsor Child, Family, Corporate, Volunteer)
â”œâ”€â”€ donate.html           # Donate page (Bank details, PayPal button, Direct pledge form)
â”œâ”€â”€ contact.html          # Contact page (Addresses, phone, email, interactive contact form)
â”œâ”€â”€ assets/
â”‚   â”œâ”€â”€ css/
â”‚   â”‚   â”œâ”€â”€ style.css     # Core styles (typography, layout, colors, cards)
â”‚   â”‚   â””â”€â”€ responsive.css# Mobile, tablet, and desktop responsiveness
â”‚   â”œâ”€â”€ js/
â”‚   â”‚   â”œâ”€â”€ main.js       # Navigation menu, smooth scroll, form interactions
â”‚   â”‚   â””â”€â”€ gallery.js    # Slideshow carousel & Lightbox modal
â”‚   â””â”€â”€ images/           # All high-res bundled local images
â””â”€â”€ README.md
```

## ðŸŒ How to Deploy to GitHub Pages & Custom Domain

### Step 1: Create a GitHub Repository
1. Go to [GitHub.com/new](https://github.com/new) and create a repository (e.g. `sinethembahope-website` or `sinethembahopeorg`).

### Step 2: Push the Files
In this project folder, run:
```bash
git init
git add .
git commit -m "Initial release of Sinethemba Hope Organization static website"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. On GitHub, go to your repository **Settings** -> **Pages**.
2. Under **Build and deployment** -> **Branch**, select `main` and `/ (root)`, then click **Save**.
3. Your website will be live in ~1-2 minutes at `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`.

### Step 4: Configure a Custom Domain (e.g., `sinethembahope.org`)
1. In the same GitHub Pages settings under **Custom domain**, enter your domain name (e.g. `www.sinethembahope.org` or `sinethembahope.org`) and click **Save**.
2. In your DNS provider (e.g., GoDaddy, Namecheap, Cloudflare, Afrihost):
   - For apex domain (`sinethembahope.org`), add `A` records pointing to GitHub's IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - For subdomain (`www.sinethembahope.org`), add a `CNAME` record pointing to `<YOUR-USERNAME>.github.io`.
3. Check the box **Enforce HTTPS** in GitHub Pages settings.