# Portfolio Generator

A simple web application that allows users to create personalized portfolio pages by filling out a form. The app generates a styled portfolio with live preview and download functionality.

## Features

### Core Features
- **Form Input Section**: Users can enter their personal details including:
  - Full Name
  - Short Bio
  - Skills (comma-separated)
  - Social Media Links (GitHub, LinkedIn, Twitter)

- **Live Preview**: Real-time preview of the portfolio as users type
- **Download Portfolio**: Export the generated portfolio as an HTML file

## Getting Started

1. Open `index.html` in your web browser
2. Fill out the form with your personal details
3. Watch the live preview update automatically
4. Click "Generate Portfolio" to finalize
5. Use "Download Portfolio" to save your portfolio as an HTML file

## Known Issues

This is a competition version with intentional bugs and incomplete features for participants to fix:

### Bugs to Fix
1. Social links open in the same tab instead of a new tab
2. Skills rendering breaks when users add extra spaces after commas
3. Mobile responsiveness issues (text overflow, layout breaks)
4. Downloaded HTML file is missing some CSS styles
5. Form validation doesn't prevent empty fields from being submitted

### Features to Implement
- [ ] Multiple theme templates to choose from
- [ ] Dark/light mode toggle
- [ ] Profile picture upload and display
- [ ] Full responsive design for all devices
- [ ] "Print Resume" button with print-optimized formatting

## Tech Stack

- **HTML5**: Semantic structure
- **CSS3**: Styling with Flexbox and Grid (vanilla CSS, no frameworks)
- **JavaScript**: DOM manipulation and file download (vanilla JS, no libraries)
- **No Backend**: Runs entirely in the browser

## File Structure

```
portfolio-generator/
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── assets/            # (Future: for images and resources)
```

## Development Tips

- The code intentionally has room for optimization and improvement
- Comments are minimal to encourage exploration and understanding
- UI is functional but basic, allowing for creative enhancements
- Form validation is incomplete, requiring participant implementation

## Contributing

This project is designed for educational and competition purposes. Participants should:

1. Fix the existing bugs
2. Implement the requested features
3. Improve code efficiency and organization
4. Enhance the user interface and experience

Good luck with the competition!