const ProductModel = require('../models/productModel');
const CategoryModel = require('../models/categoryModel')
const SubCategoryModel = require('../models/subCategoryModule')

const uploadProduct = async (req, res) => {
    console.log("uploadProduct")
    try {
        const { name, categoryName, subCategoryName, price, discount, description } = req.body;

        if (!name || !price || !categoryName || !subCategoryName) {
            return res.status(400).json({
                message: "Name, price, and category are mandatory",
                error: true,
                success: false
            });
        }

        const checkCategory = await CategoryModel.findOne({ categoryName });
        if (!checkCategory) {
            return res.status(400).json({
                message: "Category name not found",
                error: true,
                success: false
            });
        }

        const checkSubCategory = await SubCategoryModel.findOne({ subCategoryName });
        if (!checkSubCategory) {
            return res.status(400).json({
                message: "Subcategory name not found",
                error: true,
                success: false
            });
        }

        const productExists = await ProductModel.findOne({ name });
        if (productExists) {
            return res.status(400).json({
                message: "Product name already exists",
                error: true,
                success: false
            });
        }

        const payload = {
            name,
            categoryId: [checkCategory._id], 
            subCategoryId: [checkSubCategory._id], 
            price: Number(price), 
            discount: discount || 0,
            description: description || "",
            publish: true
        };

        const newProduct = await ProductModel.create(payload);

        return res.status(201).json({
            message: "New product successfully created",
            error: false,
            success: true,
            product: newProduct
        });

    } catch (error) {
        console.error("Error uploading product:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: true,
            success: false
        });
    }
};

const createCategory = async (req, res) =>{
    console.log("createCategory")
    try {
        const {categoryName} = req.body

        if( !categoryName ){
            return res.status(400).json({
                message: "name must provide",
                error : true,
                success : false
            })
        }

        const category = await CategoryModel.findOne({categoryName})

        if(category){
            return res.status(400).json({
                message: "Already exist",
                error : true,
                success : false
            })
        }

        const newCategory = await CategoryModel.create({categoryName})

        return res.json({
            message : "category successfully created",
            error : false,
            success : true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error : true,
            success : false
        })  
    }
}

const createSubCategory = async (req, res) =>{
    try {

        const {subCategoryName, categoryName} = req.body

        if( !subCategoryName || !categoryName ){
            return res.status(400).json({
                message: "name must provide",
                error : true,
                success : false
            })
        }

        const category = await CategoryModel.findOne({categoryName})

        if(!category){
                return res.status(400).json({
                    message: "Not exist",
                    error : true,
                    success : false
                })   
        }

        const subCategory = await SubCategoryModel.findOne({subCategoryName})
        if(subCategory){
            return res.status(400).json({
                message: "Already exists",
                error : true,
                success : false
            })  
        }

        const newSubCategory = await SubCategoryModel.create({
            subCategoryName,
            categoryId:category._id
        })

        return res.json({
            message: "sub Category",
            error : false,
            success : true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            error : true,
            success : false
        }) 
    }
}

module.exports = {uploadProduct, createSubCategory, createCategory}