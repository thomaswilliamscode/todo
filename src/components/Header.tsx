import { Link } from 'react-router-dom';

export default function Header () {
  return (
    <header className='container'>
      <nav className='header'>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/dripfeed'>Focus Mode</Link>
          </li>
        </ul>
      </nav>
    </header>
  ); 
}