# COIC Website — Next.js Project (static export → GitHub Pages)

Ready-to-deploy Next.js (App Router) version of the Construction Opportunity
Institute of Cleveland website, configured to build as a static site and
publish via **GitHub Pages**.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to GitHub Pages at www.coic.com

### 1. Push the code to GitHub

```bash
cd coic-nextjs
git init
git add .
git commit -m "Initial COIC site"
gh repo create coic-website --public --source=. --push
```
(Repo must be **public**, or you need GitHub Pro/Team, for Pages to work on
a free personal account. If you'd rather keep it private, use Vercel instead —
see the note at the bottom.)

If you don't have the `gh` CLI, create the repo manually at github.com/new,
then:
```bash
git remote add origin https://github.com/YOUR-USERNAME/coic-website.git
git branch -M main
git push -u origin main
```

### 2. Turn on GitHub Pages with the included Actions workflow

This project already includes `.github/workflows/deploy.yml`, which builds
the site and publishes it automatically every time you push to `main`.

In your repo on GitHub:
1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. That's it — the workflow will run automatically. Check the **Actions** tab
   to watch it build and deploy (takes ~1–2 minutes).

Once it finishes, GitHub gives you a working URL immediately, something like:
`https://YOUR-USERNAME.github.io/coic-website/`

### 3. Point your custom domain at it

The project already includes a `public/CNAME` file containing `www.coic.com`,
which GitHub Pages reads automatically — you don't need to type the domain
into GitHub's UI, though you can double check it under **Settings → Pages →
Custom domain**.

In **GoDaddy → DNS management** for coic.com, add these records
(GitHub Pages' fixed IP addresses):

| Type  | Name | Value               |
|-------|------|----------------------|
| A     | @    | 185.199.108.153      |
| A     | @    | 185.199.109.153      |
| A     | @    | 185.199.110.153      |
| A     | @    | 185.199.111.153      |
| CNAME | www  | YOUR-USERNAME.github.io |

Turn off any GoDaddy "domain forwarding" first — it overrides these records.

### 4. Enforce HTTPS

Once DNS propagates (10 min–48 hrs) and GitHub verifies the domain, go back
to **Settings → Pages** and check **Enforce HTTPS**. GitHub issues a free
SSL certificate automatically.

After that, https://www.coic.com serves the site directly from this repo.

## Project structure

```
coic-nextjs/
├── .github/workflows/deploy.yml   # auto build + publish to Pages on push
├── app/
│   ├── layout.jsx     # root layout + page metadata (title, OG tags)
│   └── page.jsx       # the full site (client component)
├── public/CNAME        # tells GitHub Pages the custom domain
├── package.json
├── next.config.js      # output: "export" → static site build
└── .gitignore
```

## Notes

- All copy, contact details (Norman Edwards, phone, email), and program facts
  (tuition-free, 6–8 weeks) match the latest version approved in chat.
- The site is a single scrolling page with anchor navigation (`#about`,
  `#trades`, etc.) — no separate routes, matching the original design.
- Icons are from `lucide-react`; fonts (Poppins/Inter) load from Google Fonts
  via `@import` in the page's `<style>` block.
- **Prefer Vercel instead?** Delete `.github/workflows/deploy.yml` and
  `output: "export"` from `next.config.js`, then follow the Vercel steps from
  earlier — Vercel supports private repos on the free tier and needs no
  static-export step.

