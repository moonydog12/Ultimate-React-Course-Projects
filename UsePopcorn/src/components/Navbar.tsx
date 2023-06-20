import { ReactNode, useState } from 'react'
import { Movies } from '../interfaces/index'

interface Props {
  children: ReactNode
}

function Navbar({ children }: Props) {
  return <nav className="nav-bar">{children}</nav>
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function Search() {
  const [query, setQuery] = useState('')

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

function NumResults({ movies }: Movies) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

export { Navbar, Logo, Search, NumResults }