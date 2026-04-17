import './App.css'
import IslandList from './IslandList'

const islands = [
  {
    id: 1,
    name: 'Maui',
    nickname: 'Valley Isle',
    segment: 'Honeymoon',
    avgStay: 6.2,
    img: 'https://picsum.photos/300/200?random=1',
  },
  {
    id: 2,
    name: 'O\'ahu',
    nickname: 'Gathering Place',
    segment: 'First-time',
    avgStay: 4.8,
    img: 'https://picsum.photos/300/200?random=2',
  },
  {
    id: 3,
    name: 'Kaua\'i',
    nickname: 'Garden Isle',
    segment: 'Eco-tourist',
    avgStay: 7.1,
    img: 'https://picsum.photos/300/200?random=3',
  },
  {
    id: 4,
    name: 'Hawai\'i',
    nickname: 'Big Island',
    segment: 'Adventure',
    avgStay: 8.3,
    img: 'https://picsum.photos/300/200?random=4',
  },
  {
    id: 5,
    name: 'Moloka\'i',
    nickname: 'Friendly Isle',
    segment: 'Cultural',
    avgStay: 5.9,
    img: 'https://picsum.photos/300/200?random=5',
  },
]

function App() {
  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">HW13-A • React Props &amp; Map</p>
        <h1>Hawaii Island Cards</h1>
        <p className="hero-copy">
          Filter island cards by visitor segment and see the average stay update
          live as the grid changes.
        </p>
      </header>

      <IslandList islands={islands} />
    </main>
  )
}

export default App