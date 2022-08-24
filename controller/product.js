const {Products,Sequelize}=require('../models')
async function createProducts(req,res){
    const productData=req.body;
   try{
        const description = productData.description;
        const name = productData.name;
        const cost = productData.cost;
        const quantity = productData.quantity;
        const CategoryId=productData.CategoryId



        const result  = await Products.create({description,name,cost,quantity,CategoryId});
        res.send({msg:'products got created',result})
    }catch(err){
        res.status(500).send({msg:'Internal server error',err})
        console.log(err)
    }
}
async function getAllProducts(req,res){
    try{
        const result = await Products.findAll();
        res.send(result)
    }catch(err){
        res.status(500).send({msg:'Internal server error'})
    }
}
async function getProductOnId(req,res){
    const productId=req.params.id;
    try{
        const result = await Products.findOne({
            where : {
                id :productId
            }
        });
        res.send(result)
    }catch(err){
        res.status(500).send({msg:'Internal server error',err})
    }
}
async function updateProduct(req,res){
    const productData= req.body;
    const productId=req.params.id;
    if(!(productData.name&&productData.cost&&productData.quantity&&productData.description)){
        res.status(400).send({msg:'name ,cost ,quantity&descripton is missing'})
    }
    try{
        const name= productData.name;
        const description=productData.description;
        const cost =productData.cost;
        const quantity=productData.quantity;
        const product = await Products.findOne({
            where:{id:productId}
            })
            if(product){
                product.name=name;
                product.description=description;
                product.cost=cost;
                product.quantity=quantity;
                
                product.save()
                res.send({msg:'product got updated successfully'})
            }else{
                res.status(400).send({msg:'product id does not exist'})
            }
        }catch(err){
            console.log('err',err)
            res.status(500).send({msg:'Internal server error',err})
        }
    }
    async function filterBasedOnProduct(req,res){
        const CategoryId=req.query.CategoryId;
        const name= req.query.name;
        const minCost=req.query.minCost;
        const maxCost=req.query.maxCost
        if(CategoryId){
            const result = await Products.findAll({
                where:{
                    CategoryId:CategoryId
                }
            })
            console.log(result)
            res.send(result);
            
        }
        if(name){
            const result = await Products.findAll({
                where:{
                    name:name
                }
            })
            res.send(result);
        }
        if(minCost&&maxCost){
            const result =await Products.findAll({
                where :{
                    cost:{
                        [sequelize.Op.gte]:minCost,
                        [sequelize.Op.lte]:maxCost
                    }
                }
            })
            res.send(result)
        }
        else if(minCost){
            const result=await Products.findAll({
                where:{
                    cost:{
                        [sequelize.Op.gte]:minCost
                    }
                }
            })
            res.send(result)
        }else if(maxCost){
            const result = await Products.findAll({
                where:{
                    cost:{
                        [sequelize.Op.lte]:maxCost
                    }
                }
            })
            res.send(result)
        }
        else{
            const result =await Products.findAll()
            res.send(result);
        }
    }

module.exports={
    createProducts,
    getAllProducts,
    getProductOnId,
    updateProduct,
    filterBasedOnProduct
}