import { Link } from 'react-router-dom';

export default function Header () {
  return (
    <div className='container'>
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
    </div>
  ); 
}