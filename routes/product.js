const express = require('express')

const routes = express.Router()
const{createProducts,getAllProducts,getProductOnId,updateProduct, filterBasedOnProduct}=require('../controller/product')
const{validateProductData}=require('../middleware')

routes.post('/ecomm/api/v1/products',[validateProductData],createProducts)
routes.get('/ecomm/api/v1/products',getAllProducts)
routes.get('/ecomm/api/v1/products/:id',getProductOnId)
routes.put('/ecomm/api/v1/products/:id',updateProduct)
routes.get('/ecomm/api/v1/products/filter',filterBasedOnProduct)
module.exports={

    productRoutes : routes
}