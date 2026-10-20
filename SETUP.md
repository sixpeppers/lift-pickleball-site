# Setting up your free content editor (one-time setup)

Your site now has a real content editor built in — go to **liftpickleball.com/admin** once this is live, log in, and you'll see forms for your pricing, bio, testimonials, service-area blurbs, and FAQ answers. Edit a field, click "Publish," and the live site rebuilds automatically in about a minute. No more sending me files to hand-edit.

To make that work, the site needed to change from plain HTML files to a small build process (a tool called Eleventy) that assembles the pages from the content files the editor saves. That means getting it live again requires a bit of one-time setup — about 15–20 minutes, all free. Here's exactly what to do, in order.

## 1. Create a GitHub account (if you don't have one)

GitHub is where your site's code and content will live going forward (replacing drag-and-drop). It's free.

1. Go to [github.com/signup](https://github.com/signup) and create an account.
2. Once logged in, click the **+** in the top right → **New repository**.
3. Name it `lift-pickleball-site`, keep it **Private** or **Public** (either works — Public is fine, there's nothing sensitive in the code), and click **Create repository**.

## 2. Upload this project to the new repository

The easiest way, no command line needed:

1. On your new repo's page, click **uploading an existing file** (or **Add file → Upload files**).
2. Drag in every file and folder from this project (everything I sent you — `src/`, `admin/`, `package.json`, `.eleventy.js`, `netlify.toml`, etc.) keeping the same folder structure.
3. Scroll down and click **Commit changes**.

(If you're comfortable with git/GitHub Desktop, you can of course clone the repo and push instead — same result.)

## 3. Register a GitHub OAuth App (lets the editor log you in)

This is the one genuinely "technical-looking" step, but it's just filling out one form.

1. Go to [github.com/settings/developers](https://github.com/settings/developers) → **OAuth Apps** tab → **New OAuth App**.
2. Fill in:
   - **Application name**: `Lift Pickleball CMS`
   - **Homepage URL**: `https://liftpickleball.com`
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
3. Click **Register application**.
4. On the next screen, copy the **Client ID**, then click **Generate a new client secret** and copy that too. Keep this tab open — you'll paste both into Netlify next.

## 4. Add those credentials to Netlify

1. In Netlify, open your `liftpickleball` site → **Project configuration** → **Security** (sometimes called **Access control**) → find **OAuth** → **Install provider**.
2. Choose **GitHub**, paste in the **Client ID** and **Client Secret** from step 3, and save.

## 5. Reconnect your Netlify site to this GitHub repo

Right now Netlify is serving the old drag-and-drop version. Switch it to build from GitHub instead:

1. In Netlify, go to your site → **Project configuration** → **Build & deploy** → **Link repository** (or **Link site to Git** if you see that instead).
2. Choose **GitHub**, authorize Netlify if asked, then pick the `lift-pickleball-site` repo you created.
3. Netlify should auto-detect the build settings from `netlify.toml`, but confirm:
   - **Build command**: `npm run build`
   - **Publish directory**: `_site`
4. Click **Deploy site**. The first build takes a minute or two — after that, every edit you publish through the CMS triggers a new build automatically.

## 6. Edit `admin/config.yml` with your real repo name

Before (or right after) step 2, open `admin/config.yml` in the project and change this line:

```yaml
backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/lift-pickleball-site
```

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username. Commit/save that change in the repo.

## 7. Log in and try it

1. Visit `liftpickleball.com/admin`.
2. Click **Login with GitHub**, authorize the app, and you're in.
3. Try editing something low-stakes first — e.g. a testimonial or an FAQ answer — click **Publish**, and check the live site in a minute or two.

## What's editable vs. not

The editor covers everything you're likely to actually want to change: prices, the bio/story text, testimonials, service-area blurbs, FAQ answers, and headline/intro copy on each page. Layout, colors, icons, and the SEO/schema plumbing underneath stay locked in the templates so the site keeps looking right and keeps ranking well — if you ever want those changed, just send me a message.

## If you get stuck

Any of these steps can go sideways in ways that are hard to predict in writing (GitHub UI changes, a typo in a URL, etc.) — if something doesn't match what you're seeing, send me a screenshot and I'll walk you through it.
