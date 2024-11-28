import { ArticleContext } from "../context/Context"
import ArticlePreview from "./ArticlePreview"
import { useContext } from "react"


const ArticleSection = () => {
    const {data} = useContext(ArticleContext)
   
  return (
    <section className="sm:grid sm:grid-cols-2 sm:gap-x-4 md:grid-cols-3 w-[80%] bg-gray-100 mt-8 p-4 rounded-xl md:justify-items-center items-center gap-y-2">
        {data ? (
            data.map((article) => (
                <ArticlePreview key={article._id} id={article._id} name={article.name} price={article.price} description={article.description} images={article.imagesUrl}  />
            ))
        ) : (
            <p>Loading...</p>
        )}
    </section>
  )
}

export default ArticleSection