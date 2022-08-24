const{checkNameForCategory}=require('./category')
const{validateProductData}=require('./product.js')
const{checkDuplicateUsernameAndEmail,checkRoles}=require('./user')
const{verifyToken,isAdmin}=require('./authJwt')
module.exports={
    checkNameForCategory,
    validateProductData,
    checkDuplicateUsernameAndEmail,
    checkRoles,
    verifyToken,
    isAdmin

}