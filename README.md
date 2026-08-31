# The JO Times — Portfolio Website

A small, dependency-free static site — plain HTML/CSS/JS, no build step,
no npm install. Styled as an editorial broadsheet: serif display
headlines, mono labels, halftone "plate" imagery, and reveal-on-scroll
animation. It's made of nine files that all need to sit together in the
same folder:

- **`index.html`** — the front page (masthead, hero, award teaser, works
  teaser, about teaser, expertise index, tools, contact)
- **`award.html`** — the full Award article, with a photo beside the
  opening paragraph
- **`works.html`** — a hub listing the three work categories, each with a
  "Read further" link to its own page
- **`work-ui-ux.html`** — every UI/UX Design project, as alternating
  feature stories
- **`work-motion-graphics.html`** — every Motion Graphics project, same layout
- **`work-graphic-design.html`** — every Graphic Design project, same layout
- **`about.html`** — the complete "About" feature article with cross-heads
  and photos
- **`styles.css`** — all shared styling for every page
- **`config.js`** — all editable content (name, copy, the award, projects,
  skills, tools, the About article, and contact details) for every page,
  in one place

The only external resource any page loads is a Google Fonts stylesheet
(Bodoni Moda, Newsreader, and IBM Plex Mono).

## Deploy to GitHub Pages

1. Create a new repository on GitHub (or use an existing one).
2. Add all nine files to the **root** of the repository, all together
   (this matters: they reference each other by relative path, and GitHub
   Pages looks for `index.html` at the root by default).
   - Via the GitHub website: click **Add file → Upload files**, drag in all
     nine files at once, then commit.
   - Via git:
     ```bash
     git init
     git add index.html award.html works.html work-ui-ux.html work-motion-graphics.html work-graphic-design.html about.html styles.css config.js
     git commit -m "Add portfolio site"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<your-repo>.git
     git push -u origin main
     ```
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Under **Branch**, choose `main` and folder `/ (root)`, then click **Save**.
6. GitHub will give you a URL (usually `https://<your-username>.github.io/<your-repo>/`
   — for a *user/organization* site named `<your-username>.github.io`, it's
   `https://<your-username>.github.io/` instead). It can take a minute or two
   to go live after the first deploy.

## Editing the content

Everything — your name, the award copy, the Works intro, all projects, the
About article, skills, tools, and contact details — lives in one place: the
`CONFIG` object in `config.js`. Open that file in any text editor and edit
the values directly. Every page reads from this same file, so a change
there shows up everywhere automatically. No other code needs to change for
content updates.

Colors and fonts are grouped as CSS variables at the very top of
`styles.css` if you want to retheme the site — that also applies to every
page at once.

After editing, just commit and push the changed file(s) — GitHub Pages will
redeploy automatically.

## How the site fits together

- The front page's **Award** section shows a short excerpt and a "Read the
  article" link to `award.html` — the full three-paragraph story, with the
  award photo running beside the opening paragraph.
- The front page's **Works** section is a short teaser with an "Explore the
  works" link to `works.html`, a hub listing the three categories:
  **UI/UX Design**, **Motion Graphics**, and **Graphic Design**. Each
  category has a "Read further" link to its own dedicated page listing
  just that category's projects.
- Every project in `CONFIG.projects` has a `category` field (`"ui-ux-design"`,
  `"motion-graphics"`, or `"graphic-design"`) that decides which page it
  shows up on — add a new project with the right category and it appears
  automatically, no other changes needed. Motion Graphics and Graphic
  Design each currently hold placeholder projects ("Project Title" /
  "Add a description...") — replace those with your real work.
- The front page's **About** section works the same way: a short intro
  with a photo, and a "Read the full story" link to `about.html` — a full
  feature article with a headline, byline, cross-headed sections, and
  photos placed between the paragraphs.
- **Expertise** lists every skill as a numbered index entry on the front
  page; **Toolkit** lists the software you use.

## Adding your own photos and videos

Several spots currently show a simple drawn placeholder inside a halftone
"plate" because no real media has been set. To use a real photo or video
anywhere, find its entry in `config.js` and set `url` to a file link:

- `heroVideo.url` — a video (.mp4/.webm) for the hero; plays muted and
  looped, in plain full color (no press/grayscale treatment)
- `aboutVideo.url` — same idea, for the About section's video
- `award.photo.url`, `works.photo.url`, and the `aboutImages` entries —
  still expect a photo URL, and will pick up the site's halftone/grayscale
  press treatment automatically

Photo/video files need to be uploaded alongside your HTML files (e.g. in
an `images` folder you create), with the path in `config.js` matching
exactly where you put them.
