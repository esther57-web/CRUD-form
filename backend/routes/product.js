const express = require('express');
const router = express.Router();
const productCtrl = require('./../controllers/product');
const { upload } = require('../middleware/multer');

router.post('/', upload.fields([{name: 'image1', maxCount:1},{name: 'image2', maxCount:1},{name: 'image3', maxCount:1},{name: 'image4', maxCount:1}, {name: 'image5', maxCount:1}]), productCtrl.createProduct)
router.get('/', productCtrl.getAllProducts)
router.get('/:id', productCtrl.getProduct)
router.put('/:id', upload.fields([{name: 'image1', maxCount:1},{name: 'image2', maxCount:1},{name: 'image3', maxCount:1},{name: 'image4', maxCount:1}, {name: 'image5', maxCount:1}]), productCtrl.updateProduct)
router.delete('/:id', productCtrl.deleteProduct)

module.exports = router;

// .fields([{name: 'image1, maxCount:1'},{name: 'image2, maxCount:1'},{name: 'image3, maxCount:1'},{name: 'image4, maxCount:1'}, {name: 'image5, maxCount:1'}])