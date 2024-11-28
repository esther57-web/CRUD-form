import App from './App.jsx'
import ArticleContextProvider from './context/Context.jsx'
import './index.css'

import ReactDOM from 'react-dom/client'


ReactDOM.createRoot(document.getElementById('root')).render( 
  <ArticleContextProvider future={{
    v7_startTransition: true,
  }}>
    <App />
  </ArticleContextProvider>
  
)
