import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const ArticleContext = createContext(null)




const ArticleContextProvider = ({children}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const req = await fetch("http://localhost:4000/api/products");
                const articles = await req.json();
                setData(articles);
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticles();
    }, []);
    let contextValue = {data}
    
    
    return (
        <ArticleContext.Provider value={contextValue}>
            {children}
        </ArticleContext.Provider>
    )
}

ArticleContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default ArticleContextProvider