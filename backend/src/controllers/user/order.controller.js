const Inventory = require("../../models/catalogAndInventory/inventory.model");
const Cart = require("../../models/orderAndCart/cart.model");
const Order = require("../../models/orderAndCart/order.model");
const { ApiError } = require("../../utils/apiError");
const { ApiResponse } = require("../../utils/ApiResponse");

exports.placeOrder = async (req,res,next)=>{
    try{
        const user =req.user;
        const {addressId , paymentMethod } = req.body;
        if(!addressId){
            throw new ApiError(400, "Address ID is required to place an order");
        }
        if(!paymentMethod || !["COD","ONLINE"].includes(paymentMethod)){
            throw new ApiError(400, "Valid payment method is required to place an order");
        }

        if(user.cart.length === 0){
            throw new ApiError(400, "Your cart is empty");
        }
        await user.populate({path:"cart" , populate: { path: "product" }});
        const cartItems = user.cart;
        // Check product stock
        for(const item of cartItems){
           const inventory = await Inventory.findOne({$and:[{product: item.product._id}, {store: user?.nearbyStore}]});
        
           if(!inventory || inventory.quantity < item.quantity){
               throw new ApiError(400, `Product ${item.product.name} is out of stock`);
           }
        }
        // Create order items
        const orderItems = cartItems.map(item=>({
            product: item.product._id,
            quantity: item.quantity
        }));

        //total amount
        const totalAmount = cartItems.reduce((total, item) => total + item.quantity * (item.product.price || 0), 0);

        if(totalAmount <=0){
            throw new ApiError(400, "Total amount must be greater than zero");
        }   


        // Create new order
        const newOrder = new Order({
            user: user._id,
            items: orderItems,
            store: user?.nearbyStore,
            paymentMethod: paymentMethod,
            paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
            orderStatus: "pending",
            deliveryAddress: user.addresses.includes(addressId) ? addressId : addressId,
            totalAmount: totalAmount

           
        });
        await newOrder.save();
        // Reduce product stock
        for(const item of cartItems){
           const inventory = await Inventory.findOne({$and:[{product: item.product._id}, {store: user?.nearbyStore}]});
           if(inventory){
               inventory.quantity -= item.quantity;
               await inventory.save();
           }
        }
        // Clear user cart
        await Cart.deleteMany({_id: {$in: user.cart}});
        user.cart = [];
        user.pastOrders.push(newOrder._id);
        await user.save();
        const response = new ApiResponse(200, "Order placed successfully", newOrder);
        res.status(200).json(response); 


    }catch(error){
        next(error)
    }
}
exports.getUserOrders = async (req,res,next)=>{
    try {
        const user = req.user;
        const orders = await Order.find({user:user._id}).populate({
            path: "items.product",
            select: "name price"
        });
        const response = new ApiResponse(200, "User orders fetched successfully", orders);
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}