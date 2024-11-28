const Product = require('../models/Product')


exports.createProduct = (req, res, next) => {
    const {name, description, price, categories, colors, size, brand} = req.body
    const image1 = req.files.image1 && req.files.image1
    const image2 = req.files.image2 && req.files.image2
    const image3 = req.files.image3 && req.files.image3
    const image4 = req.files.image4 && req.files.image4
    const image5 = req.files.image5 && req.files.image5

    const images = [image1, image2, image3, image4, image5].filter((item)=> item !== undefined)

    
    let imagesUrl = []
    images.map((image) => imagesUrl.push(`${req.protocol}://${req.get('host')}/images/${image[0].filename}`))
       
    const product = new Product({
        name,
        description,
        price: Number(price),
        categories: JSON.parse(categories),
        colors: JSON.parse(colors),
        size,
        brand,
        imagesUrl,
        date: Date.now()
    })
    product.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'})) 
    .catch(error => { res.status(400).json( { error })})
}

exports.getAllProducts = (req, res, next) => {
    Product.find().then(
        (products) => {
            res.status(200).json(products)
        }
    ).catch(
            (error) => {
                res.status(400).json({
                    error: error
                })
            }
        )

    
}

exports.getProduct = (req, res, next) => {
    Product.findOne({_id: req.params.id}).then(
        (product) => {
            res.status(200).json(product)
        }
    ).catch(
        (error) => {
            res.status(404).json({
              error: error
            });
          }
    )
    
}

exports.updateProduct = (req, res, next) => {
    const {name, description, price, categories, colors, size, brand} = req.body
    const image1 = (req.files.image1 || req.body.image1) && (req.files.image1 || req.body.image1) 
    const image2 = (req.files.image2 || req.body.image2) && (req.files.image2 || req.body.image2)
    const image3 = (req.files.image3 || req.body.image3) && (req.files.image3 || req.body.image3)
    const image4 = (req.files.image4 || req.body.image4) && (req.files.image4 || req.body.image4)
    const image5 = (req.files.image5 || req.body.image5) && (req.files.image5 || req.body.image5)

    const images = [image1, image2, image3, image4, image5].filter((item)=> item !== undefined)

    let imagesUrl = []
    images.map((image) => typeof image === 'string' ? imagesUrl.push(image) : imagesUrl.push(`${req.protocol}://${req.get('host')}/images/${image[0].filename}`))

    const productObject = {
        name,
        description,
        price: Number(price),
        categories: JSON.parse(categories),
        colors: JSON.parse(colors),
        size,
        brand,
        imagesUrl
    }
    Product.findOne({_id: req.params.id})
    .then(()=>{
        Product.updateOne({_id: req.params.id}, {...productObject, _id: req.params.id})
        .then(()=> {res.status(200).json({message: 'Objet modifié'})})
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
    
}

exports.deleteProduct = (req, res, next) => {
    Product.findOne({_id: req.params.id}).then(
        () =>  {
            Product.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
        }
    ).catch( error => {
        res.status(500).json({ error });
    });
}

