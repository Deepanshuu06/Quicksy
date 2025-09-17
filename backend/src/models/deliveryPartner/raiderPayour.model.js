const mongoose = require("mongoose");

const riderPayoutSchema = new mongoose.Schema(
    {
        rider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryPartner",
            required: true
        },
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        payoutDate: {
            type: Date,
            default: Date.now
        },
        method: {
            type: String,
            enum: ["bank_transfer", "paypal", "cash"],
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending"
        },
        transactionId: {
            type: String,
            unique: true,
            sparse: true 
        }
    }
);

const RiderPayout = mongoose.model("RiderPayout", riderPayoutSchema);
module.exports = RiderPayout;