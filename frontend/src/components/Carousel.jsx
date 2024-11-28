
import PropTypes from 'prop-types'
import { useState } from 'react'

const Carousel = props => {
  let images = props.images
  let [defaultImage, setDefaultImage] = useState(images[0])
  return (
    <section className='flex xs:flex-col xs:gap-2 sm:gap-4'>
      <div>
        <img src={defaultImage} className='w-full xs:max-h-[400px] sm:max-h-[500px] h-auto'></img>
      </div>
      <div className='flex xs:justify-between'>
        {images.map((image, id)=> {
          return <img className='w-[18%]' onClick={()=>{setDefaultImage(image)}} key={id} src={image} alt={`image ${id+1}`}></img>
        })}

      </div>
      
    </section>
  )
}

Carousel.propTypes = {
  images: PropTypes.any
}

export default Carousel