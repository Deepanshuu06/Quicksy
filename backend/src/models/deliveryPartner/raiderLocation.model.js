const riderLocationSchema = new mongoose.Schema(
    {
        rider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryPartner",
            required: true
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                required: true
            },
            coordinates: {
                type: [Number], // [longitude, latitude]
                required: true
            }
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }
);
const RiderLocation = mongoose.model("RiderLocation", riderLocationSchema);
module.exports = RiderLocation;
