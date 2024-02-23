import Product from '../models/product.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'
const create = async (req, res) => { 
const product = new Product(req.body) 
try {
await product.save()
return res.status(200).json({ 
message: "Successfully created product!"
})
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const list = async (req, res) => {
    try {
        console.log("Fetching products...");
        let filter = {};
        if (req.query.name) {
            filter.name = { $regex: req.query.name, $options: 'i' };
        }
        let products = await Product.find(filter).select('name description price quantity category updated created published');
        console.log("Products fetched:", products);

        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        });
    } 
};

const listPublished = async (req, res) => {
    try {
        const publishedProducts = await Product.find({ published: true });
        res.json(publishedProducts);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};
const productByID = async (req, res, next, id) => { 
try {
let product = await Product.findById(id) 
if (!product)
return res.status('400').json({ 
error: "Product not found"
})
req.profile = product 
next()
} catch (err) {
return res.status('400').json({ 
error: "Could not retrieve product"
}) 
}
}
const read = (req, res) => {
req.profile.hashed_password = undefined 
req.profile.salt = undefined
return res.json(req.profile) 
}
const update = async (req, res) => { 
    try {
        let product = req.profile;
        product = extend(product, req.body);
        product.updated = Date.now();
        await product.save();
        res.json(product);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        });
    } 
}
const remove = async (req, res) => { 
    try {
        let product = req.profile;
        let deletedProduct = await product.deleteOne();
        res.json(deletedProduct);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err) 
        });
    } 
}
const removeAll = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.status(200).json({ message: "All products have been deleted." });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default { create, productByID, read, list, remove, update, listPublished, removeAll };

