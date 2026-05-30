import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const PLANTS = [
  // ── Indoor ────────────────────────────────────────────────────────
  {
    id: 1, category: 'Indoor Plants',
    name: 'Monstera Deliciosa', scientific: 'Monstera deliciosa',
    price: 34.99,
    desc: 'The iconic split-leaf philodendron. A dramatic statement piece for any bright interior.',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 2, category: 'Indoor Plants',
    name: 'Peace Lily', scientific: 'Spathiphyllum wallisii',
    price: 22.99,
    desc: 'One of the best air-purifying plants. Thrives in low light and blooms effortlessly.',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 3, category: 'Indoor Plants',
    name: 'Golden Pothos', scientific: 'Epipremnum aureum',
    price: 14.99,
    desc: 'Nearly indestructible and beautifully trailing. Perfect for shelves and hanging baskets.',
    image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 4, category: 'Indoor Plants',
    name: 'Fiddle Leaf Fig', scientific: 'Ficus lyrata',
    price: 49.99,
    desc: 'A sculptural beauty with large waxy leaves. The ultimate designer houseplant.',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 5, category: 'Indoor Plants',
    name: 'Snake Plant', scientific: 'Sansevieria trifasciata',
    price: 19.99,
    desc: 'Architectural and nearly immortal. Releases oxygen at night — ideal for bedrooms.',
    image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 6, category: 'Indoor Plants',
    name: 'Bird of Paradise', scientific: 'Strelitzia reginae',
    price: 59.99,
    desc: 'Tropical grandeur indoors. Large paddle leaves and exotic orange blooms when mature.',
    image: 'https://images.unsplash.com/photo-1638700718497-c7ea516da24c?w=400&auto=format&fit=crop&q=80',
  },

  // ── Outdoor ───────────────────────────────────────────────────────
  {
    id: 7, category: 'Outdoor Plants',
    name: 'Lavender', scientific: 'Lavandula angustifolia',
    price: 12.99,
    desc: 'Fragrant purple spikes that attract pollinators. Drought-tolerant and endlessly calming.',
    image: 'https://images.unsplash.com/photo-1471086569966-db3eebc25a59?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 8, category: 'Outdoor Plants',
    name: 'Japanese Maple', scientific: 'Acer palmatum',
    price: 74.99,
    desc: 'Fiery autumn colour and elegant form. A living sculpture for gardens large and small.',
    image: 'https://images.unsplash.com/photo-1580170739280-6b4e7a9d1dc4?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 9, category: 'Outdoor Plants',
    name: 'Rose Bush', scientific: 'Rosa ×hybrida',
    price: 27.99,
    desc: 'Classic fragrant roses in deep crimson. Long-flowering and surprisingly easy to grow.',
    image: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 10, category: 'Outdoor Plants',
    name: 'Boxwood', scientific: 'Buxus sempervirens',
    price: 18.99,
    desc: 'Dense evergreen ideal for hedges, topiary, and structure in formal gardens.',
    image: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 11, category: 'Outdoor Plants',
    name: 'Hydrangea', scientific: 'Hydrangea macrophylla',
    price: 22.99,
    desc: 'Breathtaking mophead blooms in blue, pink, or white. A garden showstopper all summer.',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 12, category: 'Outdoor Plants',
    name: 'Olive Tree', scientific: 'Olea europaea',
    price: 89.99,
    desc: 'Mediterranean character for patios and large pots. Silvery foliage and timeless charm.',
    image: 'https://images.unsplash.com/photo-1579538773141-00e3c218fa3d?w=400&auto=format&fit=crop&q=80',
  },

  // ── Succulents ────────────────────────────────────────────────────
  {
    id: 13, category: 'Succulents',
    name: 'Echeveria', scientific: 'Echeveria elegans',
    price: 8.99,
    desc: 'Rosette-shaped perfection in dusty pink. Drought-resistant and endlessly photogenic.',
    image: 'https://images.unsplash.com/photo-1559564484-4b4a5e7a67c3?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 14, category: 'Succulents',
    name: 'Aloe Vera', scientific: 'Aloe barbadensis',
    price: 11.99,
    desc: 'Nature\'s first-aid kit. Soothing gel, striking silhouette, thrives on neglect.',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 15, category: 'Succulents',
    name: 'Jade Plant', scientific: 'Crassula ovata',
    price: 13.99,
    desc: 'Symbolising good fortune, this long-lived succulent develops a beautiful woody trunk.',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 16, category: 'Succulents',
    name: 'Haworthia', scientific: 'Haworthia attenuata',
    price: 9.99,
    desc: 'Compact and architectural with striking white-striped leaves. Ideal for windowsills.',
    image: 'https://images.unsplash.com/photo-1611145434371-aa4b6b5fd701?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 17, category: 'Succulents',
    name: 'String of Pearls', scientific: 'Senecio rowleyanus',
    price: 16.99,
    desc: 'A cascading curtain of perfect spherical beads. Whimsical, rare, and utterly charming.',
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&auto=format&fit=crop&q=80',
  },
  {
    id: 18, category: 'Succulents',
    name: 'Barrel Cactus', scientific: 'Ferocactus cylindraceus',
    price: 21.99,
    desc: 'A bold, spherical statement. Low-maintenance, long-lived, and full of desert personality.',
    image: 'https://images.unsplash.com/photo-1587547131421-8d3f1da12e4e?w=400&auto=format&fit=crop&q=80',
  },
];

const CATEGORIES = [
  { name: 'Indoor Plants',  icon: '🪴' },
  { name: 'Outdoor Plants', icon: '🌳' },
  { name: 'Succulents',     icon: '🌵' },
];

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(s => s.cart.items);
  const inCart = id => cartItems.some(i => i.id === id);

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Collection</h1>
        <p>Hand-picked plants for every space and lifestyle</p>
      </div>

      {CATEGORIES.map(cat => (
        <div className="category-section" key={cat.name}>
          <h2 className="category-title">
            <span>{cat.icon}</span> {cat.name}
          </h2>
          <div className="products-grid">
            {PLANTS.filter(p => p.category === cat.name).map(plant => (
              <div className="plant-card" key={plant.id}>
                <div className="plant-card-image">
                  <img src={plant.image} alt={plant.name} loading="lazy" />
                  <span className="plant-card-badge">{cat.name}</span>
                </div>
                <div className="plant-card-body">
                  <div className="plant-name">{plant.name}</div>
                  <div className="plant-scientific">{plant.scientific}</div>
                  <div className="plant-desc">{plant.desc}</div>
                  <div className="plant-footer">
                    <div className="plant-price">
                      ${plant.price.toFixed(2)} <span>/ plant</span>
                    </div>
                    <button
                      className="btn-add"
                      disabled={inCart(plant.id)}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {inCart(plant.id) ? '✓ Added' : '+ Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
