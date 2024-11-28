import { brandsData, categoriesData, colorsData, sizesData } from "../constants/data"
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import { useState, useContext, useEffect } from "react";
import addIcon from './../assets/plus.svg'
import deleteIcon from './../assets/cross.svg'
import { ArticleContext } from "../context/Context";
import { useParams } from "react-router-dom";

const Update = () => {
  const { data } = useContext(ArticleContext);
    const { articleId } = useParams() // Assure-toi que articleId correspond à la clé dans l'URL

    const article = data ? data.find(art => art._id === articleId) : null;

    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    let [price, setPrice] = useState('')

    let [formCategories, setformCategories] = useState()
    const handleChangeCategories = (selectedOptions) => {
      const labels = selectedOptions.map(option => option.label);
        setformCategories(labels)
    };
    

    let [formColors, setformColors] = useState()
    const handleChangeColors = (selectedOptions) => {
        const labels = selectedOptions.map(option => option.label);
        setformColors(labels)
    };
    

    const [size, setSize] = useState()
    const handleChangeSize = (selectedOption) => {
      setSize(selectedOption.label)
    }

    const [brand, setBrand] = useState()
    const handleChangeBrand = (selectedOption) => {
        setBrand(selectedOption.label)
    }

    let [image1, setImage1] = useState(false)
    let [image2, setImage2] = useState(false)
    let [image3, setImage3] = useState(false)
    let [image4, setImage4] = useState(false)
    let [image5, setImage5] = useState(false)

    let [image1url, setImage1url] = useState(false)
            let [image2url, setImage2url] = useState(false)
            let [image3url, setImage3url] = useState(false)
            let [image4url, setImage4url] = useState(false)
            let [image5url, setImage5url] = useState(false)

  useEffect(() => {
    const fetchArticle = async () => {
        try {
            const req = await fetch(`http://localhost:4000/api/products/${article._id}`);
            const articleData = await req.json();
            setName(articleData.name);
            setDescription(articleData.description)
            setPrice(articleData.price)
            setformCategories(articleData.categories)
            setformColors(articleData.colors)
            setSize(articleData.size)
            setBrand(articleData.brand)
            articleData.imagesUrl[0] && setImage1(articleData.imagesUrl[0])
            articleData.imagesUrl[1] && setImage2(articleData.imagesUrl[1])
            articleData.imagesUrl[2] && setImage3(articleData.imagesUrl[2])
            articleData.imagesUrl[3] && setImage4(articleData.imagesUrl[3])
            articleData.imagesUrl[4] && setImage5(articleData.imagesUrl[4])

            image1 && setImage1url(image1)
            image2 && setImage2url(image2)
            image3 && setImage3url(image3)
            image4 && setImage4url(image4)
            image5 && setImage5url(image5)
          
        } catch (error) {
            console.error(error);
        } 
    };

    article ? fetchArticle() : null
}, []);

let [defaultCategories, setDefaultCategories] = useState([])
let [defaultColors, setDefaultColors] = useState([])
useEffect(() => {
  const col = formColors && formColors.map((formColor) => {
    return colorsData.find((color) => color.label === formColor) || null;
  });
  setDefaultColors(col)
  const cat = formCategories && formCategories.map((formCategory) => {
    return categoriesData.find((categories) => categories.label === formCategory) || null;
  });
  setDefaultCategories(cat)
  
}, [formCategories,  formColors]);

  


  const onSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
        formData.append('name', name)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('categories', JSON.stringify(formCategories))
        formData.append('colors', JSON.stringify(formColors))
        formData.append('size', size)
        formData.append('brand', brand)
        image1 && formData.append('image1', image1)
        image2 && formData.append('image2', image2)
        image3 && formData.append('image3', image3)
        image4 && formData.append('image4', image4)
        image5 && formData.append('image5', image5)

        formData.forEach((value, key) => {
          console.log(`${key}: ${value}`);
      });
        
        fetch(`http://localhost:4000/api/products/${article._id}`, {
            method: "PUT",
            body: formData
        })
        .then(response => {
            if (response.status === 200) {
                alert("Article modifié")
                window.location.href = '/'
            } else {
                alert("Erreur : l'article n'a pas pu être modifié. Veuillez réessayer.");
            } 
        })
  }
  
  return (
    article ? <form onSubmit={(e)=>onSubmit(e)} className="flex flex-col border border-black m-auto xs:w-[70%] lg:w-[50%]">
      <h2 className="m-auto text-2xl">Modifier l&apos;article</h2>
      <label htmlFor="name">Nom :</label>
      <input onChange={(e)=>setName(e.target.value)} value={name}  name="name" placeholder="nom" type="text" required></input>

      <label htmlFor="description">Description :</label>
      <textarea onChange={(e)=>setDescription(e.target.value)} value={description}  name="description" placeholder="description" required></textarea>

      <label htmlFor="price">Prix en € :</label>
      <input onChange={(e)=>setPrice(e.target.value)} value={price} name="price" placeholder="prix (en €)" type="number"></input>

      <label htmlFor="category">Catégorie(s) :</label>
        {defaultCategories && <Select onChange={handleChangeCategories} defaultValue={defaultCategories} isMulti name="categories" options={categoriesData} className="basic-multi-select" classNamePrefix="select"></Select>}

      <label htmlFor="color">Couleur(s) :</label>
        {defaultColors && <Select onChange={handleChangeColors} defaultValue={defaultColors} isMulti name="colors" options={colorsData} className="basic-multi-select" classNamePrefix="select"></Select>}

      <label htmlFor="size" >Taille :</label>
        {size && <Select name="size" onChange={handleChangeSize} defaultValue={sizesData.find((sizeData) => sizeData.label === size)} className="basic-single" options={sizesData}></Select>}

      <label htmlFor="brand">Marque :</label>
        {brand && <CreatableSelect onChange={handleChangeBrand} defaultValue={brand && brandsData.find((brandData) => brandData.label === brand)} name="brand" isClearable options={brandsData}></CreatableSelect>}

      <div>
        <p>Ajoutez des images :</p>
        <div className="flex gap-2 justify-center">
          <label htmlFor="image1">
            <img src={!image1 ? addIcon : (image1url ? image1url : image1)} className="bg-gray-200 h-[80px] w-[80px] p" alt="image-1"></img>
            <input onChange={(e)=>{setImage1(e.target.files[0]), setImage1url(URL.createObjectURL(e.target.files[0]))}} type="file" id="image1" hidden />
            {image1 && <img src={deleteIcon} onClick={()=>setImage1("")} className="ml-auto w-4 h-4 relative right-1 bottom-[75px] cursor-pointer" alt="supprimer l'image 1"></img>}
          </label>
          <label htmlFor="image2">
            <img src={!image2 ? addIcon : (image2url ? image2url : image2)} className="bg-gray-200 h-[80px] w-[80px] p" alt="image-2"></img>
            <input  onChange={async (e)=>{setImage2(e.target.files[0]); setImage2url(URL.createObjectURL(e.target.files[0]))}} type="file" id="image2" hidden />
            {image2 && <img src={deleteIcon} onClick={()=>setImage2("")} className="ml-auto w-4 h-4 relative right-1 bottom-[75px] cursor-pointer" alt="supprimer l'image 2"></img>}
          </label>
          <label htmlFor="image3">
            <img src={!image3 ? addIcon : (image3url ? image3url : image3)} className="bg-gray-200 h-[80px] w-[80px] p" alt="image-3"></img>
            <input onChange={(e)=>{setImage3(e.target.files[0]), setImage3url(URL.createObjectURL(e.target.files[0]))}} type="file" id="image3" hidden />
            {image3 && <img src={deleteIcon} onClick={()=>setImage3("")} className="ml-auto w-4 h-4 relative right-1 bottom-[75px] cursor-pointer" alt="supprimer l'image 3"></img>}
          </label>
          <label htmlFor="image4">
            <img src={!image4 ? addIcon : (image4url ? image4url : image4)} className="bg-gray-200 h-[80px] w-[80px] p" alt="image-4"></img>
            <input onChange={(e)=>{setImage4(e.target.files[0]), setImage4url(URL.createObjectURL(e.target.files[0]))}} type="file" id="image4" hidden />
            {image4 && <img src={deleteIcon} onClick={()=>setImage4("")} className="ml-auto w-4 h-4 relative right-1 bottom-[75px] cursor-pointer" alt="supprimer l'image 4"></img>}
          </label>
          <label htmlFor="image5">
            <img src={!image5 ? addIcon : (image5url ? image5url : image5)} className="bg-gray-200 h-[80px] w-[80px] p" alt="image-5"></img>
            <input  onChange={(e)=>{setImage5(e.target.files[0]), setImage5url(URL.createObjectURL(e.target.files[0]))}} type="file" id="image5" hidden />
            {image5 && <img src={deleteIcon} onClick={()=>setImage5("")} className="ml-auto w-4 h-4 relative right-1 bottom-[75px] cursor-pointer" alt="supprimer l'image 5"></img>}
          </label>
        </div>
      </div>

      <button type="submit">Modifier l&apos;article</button>
    </form> : null
  )
}

export default Update