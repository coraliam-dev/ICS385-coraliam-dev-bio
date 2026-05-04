function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">Kai Nani</div>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#dashboard">Dashboard</a>
            </li>
            <li>
              <a href="#admin">Admin</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
