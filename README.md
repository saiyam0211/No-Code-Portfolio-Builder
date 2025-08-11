# Portfolio Builder

Build a beautiful, responsive personal portfolio site from a friendly form UI. Choose a template, add your details, preview live, and export as standalone HTML or print to PDF.

- Live preview with multiple templates (Modern, Minimal, Creative, Professional, Developer)
- Add sections: About, Skills, Certifications, Projects, Experience, Education, Services, Testimonials, Process, Highlights, Logos, Gallery, Social
- Upload images for profile/hero, logos, gallery, and testimonials
- Save/Load data to LocalStorage
- Export to HTML or print via browser to PDF

---

## Demo
Open `main/index.html` in your browser, or serve locally (recommended below).

---

## Tech Stack
- HTML + Tailwind CSS (CDN)
- Font Awesome (CDN)
- Vanilla JavaScript (`main/script.js`)

---

## Getting Started
Clone the repo and run locally:
```bash
git clone https://github.com/saiyam0211/No-Code-Portfolio-Builder.git
cd No-Code-Portfolio-Builder
```
Open directly in a browser:
```text
main/index.html
```
Or serve via a simple static server (recommended for best compatibility):
```bash
# Python 3
python3 -m http.server 5173
# then open http://localhost:5173/main/index.html
```

---

## Usage
1. Choose a template from the Template section.
2. Fill out tabs: Personal, About, Projects, Experience, Education, Social, etc.
3. Toggle section visibility as needed.
4. Preview updates live in the right panel.
5. Save/Load data with the toolbar buttons.
6. Export:
   - Download HTML: a single file including your portfolio markup
   - Download PDF: uses your browser’s print dialog (Save as PDF)

---

## Project Structure
```text
main/
  index.html     # App UI
  script.js      # Core logic & template rendering
  style.css      # Editor-side styles (cards/tabs/forms)
  assets/        # Optional images or assets
  .git/          # Repo metadata (this is the repo root)
```

---

## Contributing
We’re participating in a competition with team-based contributions and a PR workflow. Please read the full guide:

- See CONTRIBUTION guide: [CONTRIBUTION.md](./CONTRIBUTION.md)

Quick rules:
- Small, focused commits. One feature/bugfix per PR.
- Use feature branches and open PRs into your team branch.
- Include screenshots for UI changes.

---

## Competition
- Scoring and submissions: [COMPETITION.md](./COMPETITION.md)
- Submission checklist: [SUBMISSION_CHECKLIST.md](./SUBMISSION_CHECKLIST.md)
- Report templates: `REPORT_TEMPLATES/`
- Issue and PR templates: `.github/ISSUE_TEMPLATE/*`, `.github/pull_request_template.md`

---

## Community & Security
- Code of Conduct: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- Security policy: [SECURITY.md](./SECURITY.md)
- Accessibility checklist: [ACCESSIBILITY_CHECKLIST.md](./ACCESSIBILITY_CHECKLIST.md)

---

## Roadmap Ideas
- Theming editor to customize colors and fonts per template
- More templates and layout variants
- Image cropping/optimization for uploads
- Export to zip with assets

---

## Screenshots
Place screenshots in `assets/` and reference them here, for example:
```markdown
![Modern template](assets/screenshot-modern.png)
![Professional template](assets/screenshot-professional.png)
```

---

## License
This project is released under the MIT License. See [LICENSE](./LICENSE).