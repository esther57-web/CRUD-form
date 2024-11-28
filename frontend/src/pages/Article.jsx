

import { useContext } from 'react'
import { ArticleContext } from '../context/Context'
import { Link, useParams } from 'react-router-dom'
import Carousel from '../components/Carousel'
import { deleteArticle } from '../lib/func'

const Article = () => {
    const { data } = useContext(ArticleContext);
    const { articleId } = useParams(); // Assure-toi que articleId correspond à la clé dans l'URL

    const article = data ? data.find(art => art._id === articleId) : null;

    return (
        <main>
            {article ? (
                <section className='md:grid grid-cols-2 mx-4'>
                    <div>
                      <Carousel images={article.imagesUrl} />  
                    </div>
                    
                    <div className='md:p-8 flex flex-col gap-4'>
                        <h1 className='text-[30px] font-medium'>{article.name}</h1>
                        <h2 className='text-xl font-semibold'>{article.price}€</h2>
                        <h3 className='h-[40px] w-[40px] bg-gray-200 flex justify-center items-center '>{article.size}</h3>
                        <h4 className='text-gray-700'>{article.description}</h4>
                        <h5>{article.brand}</h5>
                        <button className='bg-black text-white px-4 py-2'>Ajouter au panier</button>
                        <div className='flex justify-center gap-4'>
                            <Link to={`/articles/update/${article._id}`} className='border border-black rounded-2xl px-4 py-2'>Modifier</Link>
                            <button onClick={() => deleteArticle(article._id)} className='border border-black rounded-2xl px-4 py-2'>Supprimer</button>
                        </div>
                    </div>
                </section>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    );
}



export default Article