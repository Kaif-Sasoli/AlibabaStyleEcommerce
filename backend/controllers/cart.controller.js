import productModel from '../models/product.model.js'
import cartModel from '../models/cart.model.js'


export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;  
    const buyerId = req.buyer._id; 

    console.log("Product ID ", productId)
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.quantity < 1) {
      return res.status(400).json({ message: "Product is out of stock" });
    }

    let cart = await cartModel.findOne({ buyer: buyerId });

    if (!cart) {
      cart = new cartModel({
        buyer: buyerId,
        items: [{ product: productId, quantity: 1 }]
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

       if (itemIndex > -1) {
        return res.status(400).json({ message: "Product is already in the cart" });
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const buyerId = req.buyer._id;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let cart = await cartModel.findOne({ buyer: buyerId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Failed to remove product", error: error.message });
  }
};


export const getCartItems = async (req, res) => {
  try {
    const buyerId = req.buyer._id;

     const cart = await cartModel
      .findOne({ buyer: buyerId })
      .populate({
        path: "items.product",
        model: "Product", 
        populate: {
          path: "supplier",
          select: "company fullName contact"
        }
      });

    if (!cart) {
      return res.status(200).json({ cart: { buyer: buyerId, items: [] } });
    }

     cart.items = cart.items.filter(item => item.product);

    res.status(200).json({ cart });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Failed to fetch cart items", error: error.message });
  }
};

