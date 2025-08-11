# Contribution Guidelines – Portfolio Builder

Welcome to the Portfolio Builder repository! This guide explains how to contribute during the Pull Request Party event: how teams work, the workflow to follow, and what to submit.

---

## General Rules
- **Teams**: Contribute as a team of 3.
- **Roles**:
  - **Frontend Maverick**: UI/UX, responsiveness, layout polish.
  - **Logic Wizard**: JavaScript logic, features, bug fixes, tests.
  - **Git Commander**: Branching strategy, commits, PRs, merges, conflict resolution.
- **Merges**: Only the Git Commander merges PRs into your team branch.
- **Commits**: Small, focused, and descriptive. One feature/bugfix per commit.
- **Sync often**: Pull latest changes before starting work to avoid conflicts.

---

## Project Setup
1. Fork this repository to your GitHub account.
2. Clone your fork locally:
```bash
git clone https://github.com/saiyam0211/No-Code-Portfolio-Builder.git
cd No-Code-Portfolio-Builder
```
3. Create a branch per task/feature:
```bash
git checkout -b feature/<short-feature-name>
```
4. Make changes and commit:
```bash
git add -A
git commit -m "feat: add dark mode toggle"
```
5. Push your branch:
```bash
git push origin feature/<short-feature-name>
```
6. Open a Pull Request from your branch into your team branch on the main repository.

---

## Working with Issues
- Check the Issues tab for available tasks. Assign yourself before starting.
- Labels you may see:
  - `bug`: Fix broken or faulty behavior
  - `feature`: Add new functionality or enhancements
  - `bonus`: Optional challenges for extra points

---

## Pull Requests
- **Title format**:
  - `[Role] - Short Description of Change`
  - Example: `Frontend Maverick - Fix mobile layout for skills grid`
- **Description should include**:
  - What you changed
  - Why you changed it (motivation)
  - Screenshots for UI changes (before/after if possible)
- **Reviews**: Wait for at least one teammate’s review before merging.

---

## Merge Conflicts
If a conflict occurs:
```bash
# 1) Make sure your local main is up to date
git checkout main
git pull origin main

# 2) Update your feature branch against the latest main
git checkout feature/<short-feature-name>
git rebase main  # or: git merge main

# 3) Resolve conflicts locally, run the app, test changes

# 4) Commit the resolutions
git add -A
git commit -m "chore: resolve merge conflicts with <team-branch>"

# 5) Push the updated branch
git push -f origin feature/<short-feature-name>  # if you rebased
```
Notes:
- Resolve conflicts locally rather than in the GitHub UI.
- The Git Commander should handle complex merges.

---

## Submission Requirements
Before the deadline, submit the following via your team PR and/or repository README links:
- **Combined UI + Logic Report (PDF)**: Overview of all key changes.
- **GitHub Activity Report**: List of PRs, commits, conflicts resolved, and by whom.
- **Reflection Report**: Why you chose specific bugs/features and what you learned.

---

## Local Development
This is a static web app. You can develop in two ways:
- Open `main/index.html` directly in the browser, or
- Run a simple server (recommended):
```bash
# Python 3
python3 -m http.server 5173
# then open http://localhost:5173/main/index.html
```

---

## Code Style & Conventions
- Prefer small, composable functions and meaningful names.
- Keep UI changes consistent across all templates.
- Test the following before submitting:
  - Add/remove items in each section (skills, projects, etc.)
  - Template switching works and preview updates live
  - Save/Load from LocalStorage
  - Download HTML and print-to-PDF flows

---

## Tips for Success
- Make frequent, focused commits instead of a single large one.
- Use semantic HTML, responsive CSS, and accessible components.
- Include screenshots in PRs for any UI changes.
- Communicate early and often in your team to avoid duplicated work.

Happy contributing and good luck in the competition! 🚀 