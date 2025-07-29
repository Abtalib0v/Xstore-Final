const ProductSchema = require("../Models/Product/ProductSchema");
// const ProductSizesSchema = require("../models/Product/ProductSizesSchema");
const ProductCategorySchema = require("../Models/Product/ProductCategorySchema");
const ProductColorSchema = require("../Models/Product/ProductColorSchema");
// const UserSchema = require("../models/User/UserSchema");
// const OrderSchema = require("../models/Order/OrderSchema");

const getAllProducts = async (req, res) => {
  try {
    const { color } = req.query;  // query'den renk adı al

    let filter = {};

    if (color) {
      // Renk adıyla, ilgili renk objesini bul
      const colorDoc = await ProductColorSchema.findOne({ name: color });
      if (colorDoc) {
        // Bulduysan renk id'sini filtreye ekle
        filter["colors"] = colorDoc._id;
      } else {
        // Renk yoksa, hiç ürün dönmesin diye boş sonuç döndürecek filtre koy
        filter["colors"] = null;
      }
    }

    const products = await ProductSchema.find(filter)
      .populate("categories")
      .populate("colors");

    if (!products || products.length === 0) {
      return res.status(404).json({
        message: "No products found",
      });
    }
    return res.status(200).json({
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getAllColors = async (req, res) => {
  const colors = await ProductColorSchema.find();
  if (!colors || colors.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json({
    data: colors,
  });
};

const getColorById = async (req, res) => {
  const id = req.params.id;
  const color = await ProductColorSchema.findById(id);
  if (!color) {
    return res.status(404).json({ message: 'Color not found' });
  }
  return res.json(color);
};

const createProductColor = async (req, res) => {
  const { name, code } = req.body;
  const exsistingColor = await ProductColorSchema.findOne({ name: name });
  if (exsistingColor) {
    return res.status(400).json({
      message: "Color already exists",
    });
  }
  const newColor = new ProductColorSchema({
    name: name,
    code: code,
  });
  await newColor.save();
  return res.status(201).json({
    message: "Color created successfully",
    data: newColor,
  });
};
const getAllCategories = async (req, res) => {
  const categories = await ProductCategorySchema.find();
  if (!categories || categories.length === 0) {
    return res.status(200).json([]);
  }
  return res.status(200).json({
    data: categories,
  });
};
const getCategoryById = async (req, res) => {
  const id = req.params.id;
  const category = await ProductCategorySchema.findById(id);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  return res.json(category);
};
const getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await ProductSchema.findById(id);
  if (!product) {
    return res.status(404).json({ message: 'product not found' });
  }
  return res.json(product);
};
const deleteAPiWithParams = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }
  try {
    const deletedFunction =  (await ProductCategorySchema.findByIdAndDelete(id)) || (await ProductSchema.findByIdAndDelete(id)) ||
  (await ProductColorSchema.findByIdAndDelete(id));
    if (!deletedFunction) {
      return res.status(404).json({ message: "not found" });
    }
    return res.status(204).json({ message: "deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const createProductCategory = async (req, res) => {
  const { name } = req.body;
  const exsistingCategory = await ProductCategorySchema.findOne({
    name: name,
  });
  if (exsistingCategory) {
    return res.status(400).json({
      message: "Category already exists",
    });
  }
  const newCategory = new ProductCategorySchema({
    name: name,
  });
  await newCategory.save();
  return res.status(201).json({
    message: "Category created successfully",
    data: newCategory,
  });
};

const createProduct = async (req, res) => {
  const { name, price, description, categories, star, colors } =
    req.body;
  const exsistingProduct = await ProductSchema.findOne({ name: name });
  if (exsistingProduct) {
    return res.status(400).json({
      message: "Product already exists",
    });
  }
  const newProduct = new ProductSchema({
    name: name,
    price: price,
    description: description,
    imageUrl: req.file.path,
    categories: categories,
    star: star,
    colors: colors,
  });
  await newProduct.save();
  return res.status(201).json({
    message: "Product created successfully",
    data: newProduct,
  });
};

const createOrder = async (req, res) => {
  const { user, products, totalAmount, status, address } = req.body;
  try {
    const foundUser = await UserSchema.findById(user);
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const productIds = products.map((product) => product.product);
    const foundProducts = await ProductSchema.find({
      _id: { $in: productIds },
    });
    if (!foundProducts || foundProducts.length !== productIds.length) {
      return res
        .status(404)
        .json({ message: "One or more products not found" });
    }
    const newOrder = new OrderSchema({
      user: user,
      products: products,
      totalAmount: totalAmount,
      status: status || "pending",
      address: address,
    });
    await newOrder.save();
    return res.status(201).json({
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  const userId = req.query.user;
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const orders = await OrderSchema.find({ user: userId })
      .populate("user")
      .populate("products.product");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    return res.status(200).json({
      data: orders,
      message: "User's orders fetched successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const getAllOrdersInDashboard = async (req, res) => {
  try {
    const orders = await OrderSchema.find()
      .populate("user")
      .populate("products.product");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    return res.status(200).json({
      data: orders,
      message: "All orders fetched successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }
  try {
    const order = await OrderSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res
      .status(200)
      .json({ message: "Order status updated", data: order });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllProducts,
  createOrder,
  getAllColors,
  getAllCategories,
  createProductColor,
  createProductCategory,
  createProduct,
  getAllOrders,
  getAllOrdersInDashboard,
  updateOrderStatus,
  getCategoryById,
  getColorById,
  getProductById,
  deleteAPiWithParams,
};
