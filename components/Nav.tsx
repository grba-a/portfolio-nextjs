export default function Nav() {
  return (
    <header className="header">
      <nav className="nav container">
        <ul className="navbar navbar-center">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li className="nav-brand">
            <span className="brand">Portfolio</span>
          </li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
