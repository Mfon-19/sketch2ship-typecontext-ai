# TypeContext AI Prototype

This prototype demonstrates the core UX flow of the TypeContext AI engine. It uses a simulated NLP keyword matcher to translate natural language project descriptions into typographic styles.

## Quick Start
1. Open `index.html` in any modern web browser.
2. In the text area, type a description like: "I want a minimal and modern dashboard for a crypto startup."
3. Click "Suggest Typography".
4. Select various cards on the left to see the font applied live to the dashboard preview on the right.

## Features Implemented
- **Keyword Inference**: Detects 'modern', 'playful', 'trustworthy', etc., from user input.
- **Dynamic Font Loading**: Uses the Google Fonts API to load stylesheets on the fly.
- **Mock Dashboard**: A realistic CSS-based preview component showing headers, body text, and UI elements.