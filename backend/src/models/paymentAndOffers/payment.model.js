const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    paymentMethod: {
        type: String,
        enum: ["credit_card", "debit_card", "paypal", "upi", "cash_on_delivery"],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending"
    },
    transactionId: {
        type: String,
        unique: true,
        sparse: true 
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;