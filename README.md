

# Bloom

A static flower library website for exploring flower families and their species. Built with vanilla HTML, CSS, and JavaScript.

## Live Structure

- **Home** (`index.html`) — Landing page with hero section and popular flowers
- **Species** (`flowers.html`) — Swipeable carousel of 5 flower families with loading screen
- **Detail pages** (`pages/species/`) — Individual family pages with flower info, image, and navigation to the next family

## Flower Families

| Family | Flowers |
|---|---|
| Rosaceae | Rose |
| Asteraceae | Daisy |
| Lamiaceae | Lavender |
| Liliaceae | Tulip |
| Orchidaceae | Orchid |

## Project Structure

```
bloom/
├── index.html
├── flowers.html
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── carousel.js
│   └── images/
│       └── flowers/
│           ├── rose.png
│           ├── daisy.png
│           ├── lavender.png
│           ├── tulip.png
│           └── orchid.png
└── pages/
    └── species/
        ├── rosaceae.html
        ├── asteraceae.html
        ├── lamiaceae.html
        ├── liliaceae.html
        └── orchidaceae.html
```

## Features

- Loading screen with animated progress bar
- Swipeable carousel with touch, mouse drag, and keyboard support
- Looping navigation between flower families
- Three-column detail layout (info | image | next family CTA) fitting a single viewport
- Dark theme with Plus Jakarta Sans typography
- Responsive design for mobile devices

## Tech Stack

- HTML5
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (pointer events, no dependencies)

## Getting Started

Open `index.html` in a browser. No build tools or server required.
