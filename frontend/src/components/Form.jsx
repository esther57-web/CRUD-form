import { brandsData, categoriesData, colorsData, sizesData } from "../constants/data"
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import { useState } from "react";
import addIcon from './../assets/plus.svg'
import deleteIcon from './../assets/cross.svg'

const Form = () => {
    let [name, setName] = useState('')
    let [description, setDescription] = useState('')
    let [price, setPrice] = useState('')

    let [formCategories, setformCategories] = useState([])
    const handleChangeCategories = (selectedOptions) => {
      const labels = selectedOptions.map(option => option.label);
        setformCategories(labels)
    };

    let [formColors, setformColors] = useState([])
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
        
        fetch("http://localhost:4000/api/products", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.status === 201) {
                alert("Article ajouté")
                window.location.href = '/'
            } else {
                alert("Erreur : l'article n'a pas pu être ajouté. Veuillez réessayer.");
            } 
        })
    };


  return (
    <form onSubmit={(e)=>onSubmit(e)} className="flex flex-col border border-black m-auto xs:w-[70%] lg:w-[50%]">
      <label htmlFor="name">Nom :</label>
      <input onChange={(e)=>setName(e.target.value)} value={name}  name="name" placeholder="nom" type="text" required></input>

      <label htmlFor="description">Description :</label>
      <textarea onChange={(e)=>setDescription(e.target.value)} value={description}  name="description" placeholder="description" required></textarea>

      <label htmlFor="price">Prix :</label>
      <input onChange={(e)=>setPrice(e.target.value)} value={price} name="price" placeholder="prix (en €)" type="number"></input>

      <label htmlFor="category">Catégorie(s) :</label>
        <Select onChange={handleChangeCategories} isMulti name="categories" options={categoriesData} className="basic-multi-select" classNamePrefix="select"></Select>

      <label htmlFor="color">Couleur(s) :</label>
        <Select onChange={handleChangeColors} isMulti name="colors" options={colorsData} className="basic-multi-select" classNamePrefix="select"></Select>

      <label htmlFor="size" >Taille :</label>
        <Select name="size" onChange={handleChangeSize} className="basic-single" options={sizesData}></Select>

      <label htmlFor="brand">Marque :</label>
        <CreatableSelect onChange={handleChangeBrand} name="brand" isClearable options={brandsData}></CreatableSelect>

      <div>
        <p>Ajoutez des images :</p>
        <div className="flex gap-2 justify-center">
          <label htmlFor="image1">
            <img src={!image1 ? addIcon : URL.createObjectURL(image1)} className="bg-gray-200 h-[80px] w-[80px] p" alt="image-1"></img>
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
            {image1 && <img src={deleteIcon} onClick={()=>setImage1("")} className="ml-auto w-4 h-4 relative right-1 bottom-[75px] cursor-pointer" alt="supprimer l'image 1"></img>}
          </label>
          <label htmlFor="image2">
            <img src={!image2 ? addIcon : URL.createObjectURL(image2)} className="bg-gray-200 h-[80px] w-[80px] p" alt="image-2"></img>
            <input  onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
            {image2 && <img src={deleteIcon} onClick={()=>setImage2("")} className="ml-auto w-4 h-4 relative right-1 bottom-[75px] cursor-pointer" alt="supprimer l'image 2"></img>}
          </label>
          <label htmlFor="image3">
            <img src={!image3 ? addIcon : URL.createObjectURL(image3)} className="bg-gray-200 h-[80px] w-[80px] p" alt="image-3"></img>
            <input  onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
            {image3 && <img src={deleteIcon} onClick={()=>setImage3("")} className="ml-auto w-4 h-4 relative right-1 bottom-[75px] cursor-pointer" alt="supprimer l'image 3"></img>}
          </label>
          <label htmlFor="image4">
            <img src={!image4 ? addIcon : URL.createObjectURL(image4)} className="bg-gray-200 h-[80px] w-[80px] p" alt="image-4"></img>
            <input  onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
            {image4 && <img src={deleteIcon} onClick={()=>setImage4("")} className="ml-auto w-4 h-4 relative right-1 bottom-[75px] cursor-pointer" alt="supprimer l'image 4"></img>}
          </label>
          <label htmlFor="image5">
            <img src={!image5 ? addIcon : URL.createObjectURL(image5)} className="bg-gray-200 h-[80px] w-[80px] p" alt="image-5"></img>
            <input  onChange={(e)=>setImage5(e.target.files[0])} type="file" id="image5" hidden />
            {image5 && <img src={deleteIcon} onClick={()=>setImage5("")} className="ml-auto w-4 h-4 relative right-1 bottom-[75px] cursor-pointer" alt="supprimer l'image 5"></img>}
          </label>
        </div>
      </div>

      <button type="submit">Ajoutez un article</button>
    </form>
  )
}

export default Form