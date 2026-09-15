# PIXEL8

**BCA — 1st Semester · Web Development Bootcamp Project**

PIXEL8 is a static pixel-art gallery website built with HTML, CSS, and a little JavaScript. It introduces what a pixel is, then walks through five themed galleries (Nature, Architect, Dark, Tech, Abstract), with a team/credits page and a media attribution page.

---

## About the project

| | |
|---|---|
| **Course** | BCA (Bachelor of Computer Applications) |
| **Semester** | First semester |
| **Track** | Web Development Bootcamp |
| **Type** | Front-end only (no backend / database) |
| **Stack** | HTML5 · CSS3 · vanilla JavaScript |

This project was created to practice page structure, shared styles, navigation, responsive layout, and a simple media lightbox.

---

## Features

- **Home / front page** — what a pixel is, plus entry cards for each gallery
- **Five galleries** — Nature, Architect, Dark, Tech, Abstract  
  - Category definition  
  - Image grid  
  - Motion / video section  
  - Prev / next category links
- **Lightbox** — click any image or video to open a full preview; step with prev/next; works on gallery pages and on Credits
- **About** — team members and project credits table
- **Credits (attribution)** — every media file with a preview, type/size, and links to the page(s) where it is used
- **404 page** — custom dead-page screen
- **Responsive layout** — desktop and mobile  
  - Mobile menu (☰) with large tap targets  
  - Stacked gallery and category links on small screens
- **Pixel / retro UI** — Press Start 2P + Pixelify Sans, square corners, hard shadows

---

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home / front page |
| `nature.html` | Nature gallery |
| `architect.html` | Architect gallery |
| `dark.html` | Dark gallery |
| `tech.html` | Tech gallery |
| `abstract.html` | Abstract gallery |
| `about.html` | Team and project credits |
| `attribution.html` | Media credits & attribution |
| `404.html` | Not found |

---

## Project structure

```
Code/
├── index.html
├── nature.html
├── architect.html
├── dark.html
├── tech.html
├── abstract.html
├── about.html
├── attribution.html
├── 404.html
├── css/
│   ├── base.css        # Shared layout, header, footer, fonts
│   ├── home.css        # Home + 404
│   ├── gallery.css     # Galleries + lightbox styles
│   ├── about.css       # About page
│   └── attr.css        # Credits page + gallery credit badges
├── js/
│   ├── lightbox.js     # Image/video popup (galleries + credits)
│   └── nav.js          # Mobile menu toggle
└── IMG/
    ├── ATTRIBUTION.txt
    ├── Background/
    ├── Characters/
    ├── Decorations/
    ├── Logo/
    ├── Nav/
    └── Pics/
        ├── Abstract/
        ├── Architect/
        ├── Dark/
        ├── Nature/
        └── Tech/
```

---

## How to run

No build step or server is required for local use.

1. Clone or download this repository  
2. Open `index.html` in a modern browser (Chrome, Edge, Firefox, etc.)  
3. Or from a terminal in the project folder:

```bash
# optional local server (if you prefer)
python -m http.server 8080
```

Then visit `http://localhost:8080`

---

## Team

BCA Front End Project ~ December

| Role | Name |
|------|------|
| Conceptualized and headed by | [Chandan Shakya](https://github.com/ChandanShakya/) |
| Layout designed by | [Kabir Deula](https://github.com/kabirdeula/) |
| Content division by | [Shaswot D. Subedi](https://github.com/Dai-Prazz) |
| Support and supervision by | [Bijina Maharjan](https://github.com/bijinamaharjan) |
| Support and supervision by | Kabita Phuyal |

---

## Media & attribution

Gallery images, GIFs, and videos were collected during coursework for classroom use.

- Full list with previews: open **`attribution.html`** (or the Credits link in the site nav)
- Plain-text inventory: [`IMG/ATTRIBUTION.txt`](IMG/ATTRIBUTION.txt)
- Many **author / source / license** fields are still `Unknown` and should be filled before any public redistribution

**Repo:** [github.com/ChandanShakya/Pixel8](https://github.com/ChandanShakya/Pixel8)

- If you want any media removed, please open a **GitHub issue**
- If you know the correct author, source, or license for an item, you can open a **pull request**

---

## Browser support

Tested for modern evergreen browsers. Uses:

- CSS Grid / Flexbox  
- `matchMedia` for the mobile nav  
- HTML5 `<video>` for motion clips  

---

## License

Code (HTML/CSS/JS) is part of this coursework project.  
Media assets remain under their original (often unknown) rights — see **Media & attribution** above.
