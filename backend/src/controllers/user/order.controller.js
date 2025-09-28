exports.placeOrder = async (req,res,next)=>{
    try{
        const user =req.user;
        const {addressId , paymentMethod , storeId} = req.body;
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
            if(item.quantity > (item.product.stock || 0)){
                throw new ApiError(400, `Product ${item.product.name} is out of stock`);
            }
        }
        // Create order items
        const orderItems = cartItems.map(item=>({
            product: item.product._id,
            quantity: item.quantity
        }));

        // Create new order
        const newOrder = new Order({
            user: user._id,
            items: orderItems,

            store: storeId,
            paymentStatus: paymentMethod === "COD" ? "pending" : "paid",
            orderStatus: "pending",
            deliveryAddress: addressId
        });
        await newOrder.save();
        // Reduce product stock
        for(const item of cartItems){
            item.product.stock -= item.quantity;
            await item.product.save();
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