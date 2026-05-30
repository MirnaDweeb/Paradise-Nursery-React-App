# 🌿 Paradise Nursery

A full-featured React e-commerce plant shop built with React, Redux Toolkit, and React Router.

## Features

- **Landing Page** — Full-screen hero with animated background, company stats, and Get Started CTA
- **About Us** — Mission, vision, plant category overview in beautiful card layout
- **Product Listing** — 18 plants across 3 categories (Indoor, Outdoor, Succulents) with Add to Cart
- **Shopping Cart** — Full cart management with quantity controls, totals, and checkout flow
- **Redux State** — Global cart state via Redux Toolkit with `addItem`, `removeItem`, `updateQuantity`

## Project Structure

```
paradise-nursery/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AboutUs.jsx
│   │   ├── CartItem.jsx
│   │   ├── CartSlice.jsx      ← Redux slice
│   │   └── ProductList.jsx
│   ├── store/
│   │   └── store.js
│   ├── App.jsx                ← Routes + Navbar + Cart page
│   ├── App.css                ← All styles
│   └── index.js
├── package.json
└── README.md
```

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

| Library          | Version | Purpose               |
|------------------|---------|-----------------------|
| React            | 18.x    | UI framework          |
| React Router DOM | 6.x     | Client-side routing   |
| Redux Toolkit    | 2.x     | State management      |
| React Redux      | 9.x     | React–Redux bindings  |

## Design

- **Theme**: Organic / natural nursery aesthetic
- **Fonts**: Playfair Display (headings) + DM Sans (body)
- **Palette**: Deep forest greens, cream, sage, parchment, gold accent
- **Responsive**: Mobile-first, adapts from 320px to 1280px+
