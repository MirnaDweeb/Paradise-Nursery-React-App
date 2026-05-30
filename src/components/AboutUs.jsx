import React from 'react';

export default function AboutUs() {
  return (
    <div className="about">
      <div className="about-hero">
        <div className="about-hero-image">
          <img
            src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop&q=80"
            alt="Lush plant nursery"
          />
        </div>
        <div>
          <span className="about-tag">Our Story</span>
          <h1>Rooted in a love for living things</h1>
          <p className="about-lead">
            Paradise Nursery began as a small family greenhouse tucked between rolling hills. 
            Today it's a thriving community built around one shared belief: plants make life better.
          </p>
          <p className="about-lead">
            We carefully source every plant we sell — from sun-drenched succulents to 
            lush tropical foliage — and pair each one with the expertise to help it thrive in your home.
          </p>
        </div>
      </div>

      <h2 className="about-section-title">What We Stand For</h2>
      <div className="about-cards">
        {[
          {
            icon: '🌿',
            title: 'Our Mission',
            text: 'To make the joy of plants accessible to everyone. Whether you\'re a first-time plant parent or a seasoned botanist, we have something green waiting for you.'
          },
          {
            icon: '🌱',
            title: 'Our Vision',
            text: 'A world where every home has a corner of nature. We envision greener cities, calmer homes, and cleaner air — one plant at a time.'
          },
          {
            icon: '🏡',
            title: 'Indoor Plants',
            text: 'Monstera, peace lily, pothos — our indoor collection transforms your living space into a breathing, vibrant sanctuary that improves air quality and mental wellbeing.'
          },
          {
            icon: '☀️',
            title: 'Outdoor Plants',
            text: 'From hardy perennials to flowering shrubs, our outdoor range brings colour and life to patios, gardens, and balconies through every season.'
          },
          {
            icon: '🌵',
            title: 'Succulents',
            text: 'Perfect for busy plant lovers. Our succulent collection demands little and gives back beauty, texture, and zen-like calm in return.'
          },
          {
            icon: '♻️',
            title: 'Sustainability',
            text: 'We grow using organic practices, ship in 100% recyclable packaging, and donate 2% of every sale to urban greening initiatives worldwide.'
          },
        ].map((card) => (
          <div className="about-card" key={card.title}>
            <div className="about-card-icon">{card.icon}</div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
