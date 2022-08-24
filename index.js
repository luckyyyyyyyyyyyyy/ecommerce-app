const {serverPort} = require('./config/config.server')


const express = require('express')
const{Categories,sequelize,Products,Role}= require('./models')
const {categoryRoutes,productRoutes,authRoutes,cartRoutes} = require('./routes')

const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())
app.use(categoryRoutes)
app.use(productRoutes)
app.use(authRoutes)
app.use(cartRoutes)

app.listen(serverPort, async ()=>{
    console.log('server is running on this port', serverPort)
    await init()
    payload = {id:'hello iam id',exp:Math.floor(Date.now()/1000)+(60*60)};
    secretKey = 'heloohjkdhbdjsjhvdsvjd';
    token= await jwt.sign(payload,secretKey);
    console.log('token',token)
})
async function init(){
    try{
        await sequelize.sync({force:true})
        const defaultProducts=[
            {
                description:'Nyka best products',
                name:'MakeUp kit',
                cost:870,
                quantity:20,
                CategoryId:1
            },
            {
                description:'For women',
                name:'Fogg',
                cost:1400,
                quantity:20,
                CategoryId:2
            },
            {
                description:'Best for summer holidays',
                name:"Summer Clothes",
                cost:1200,
                quantity:20,
                CategoryId:3

            }
        ]
        const defaultCategories = [
            {
                name : 'Beauty',
                description : 'All beauty products'
            },
            {
            name : 'Fragnance',
            description:'All fragnance products'
            },
            {
                name:'Clothes',
                description:'About Clothes'
            }
        ]
        const defaultRole =[
            {
                name:'user'
            },
            {
                name:'admin'
            }
        ]
         await Categories.bulkCreate(defaultCategories)
         await Products.bulkCreate(defaultProducts)
         await Role.bulkCreate(defaultRole)

        
    }
    catch(err){
        console.log(err)
    }
}

