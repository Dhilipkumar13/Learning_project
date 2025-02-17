const express = require("express")
const router = express.Router()
const {createProduct, createCategory, createSubCategory, deleteProduct, updateProduct} = require('../controllers/productController')


router.post('/new-product',createProduct)
router.post('/new-category',createCategory)
router.post('/new-subcategory',createSubCategory)
router.put('/update-product',updateProduct)
router.delete('/delete-product',deleteProduct)

module.exports = router