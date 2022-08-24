const express= require('express')
const routes = express.Router()
const{createCategory,getAllCategory,getCategoryOnId,updateCategoryId,deleteCategoryId}=require('../controller/category')
const{checkNameForCategory}=require('../middleware')
routes.post('/ecomm/api/v1/categories' , [checkNameForCategory],createCategory)

routes.get('/ecomm/api/v1/categories' , getAllCategory)
routes.get('/ecomm/api/v1/categories/:id' , getCategoryOnId)
routes.put('/ecomm/api/v1/categories/:id' , updateCategoryId)
routes.delete('/ecomm/api/v1/categories/:id' , deleteCategoryId)
module.exports= {
    categoryRoutes:routes
}