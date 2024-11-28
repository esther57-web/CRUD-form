
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <button className='m-auto text-2xl flex justify-center my-8'>
         <Link to='/'>Accueil</Link>
    </button>
  )
}

export default Header