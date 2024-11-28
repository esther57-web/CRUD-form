
import {Link} from 'react-router-dom'
import ArticleSection from '../components/ArticleSection'

const Home = () => {
  return (
    <main className='flex flex-col items-center'>
        <Link to='/add' className='bg-orange-600 rounded-lg p-2 cursor-pointer text-white'>+ Ajouter un article</Link>
        <ArticleSection />

    </main>
  )
}

export default Home