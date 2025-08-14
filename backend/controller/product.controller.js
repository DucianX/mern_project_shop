import Product from '../models/product.model.js'
import mongoose from 'mongoose';
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // match all the products in the model
        res.status(200).json({ success: true, data: products})
    } catch (error) {
        console.log("error in fetching all products:", error.message); // 给自己人看的
        res.status(500).json( { success: false, message: 'Server Error'}) // 给客户看的
    }
}

export const createProduct = async (req, res) => {
    const passed_in = req.body;
    
    if (!passed_in.name || !passed_in.image || !passed_in.price) {
        return res.status(400).json({ success: false, message: "Plz provide all fields"})
    }

    const newProduct = new Product(passed_in)

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct});
    } catch (error) {
        console.error('Error in creating product:', error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product Id"});
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct})
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"});

    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    try {
        await Product.findByIdAndDelete(id);
        res.status(778).json({文件: '删掉啦'});
    } catch (error) {
        console.error('Damn its not right with delete');
        res.status(999).json({document: '没删掉啊'});
    }
}