const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    description: {
        type: String,
        maxlength: 200,
        trim: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    discountValue: {
        type: Number,
        required: true,
        min: 0
    },
    maxDiscountAmount: {
        type: Number,
        min: 0,
        default: null // No max limit by default
    },
    minPurchaseAmount: {
        type: Number,
        min: 0,
        default: 0 // No minimum purchase by default
    },
    validFrom: {
        type: Date,
        required: true
    },
    validUntil: {
        type: Date,
        required: true,
        validate(value) {
            if (this.validFrom && value <= this.validFrom) {
                throw new Error("validUntil must be after validFrom");
            }
        } 
    },
    usageLimit: {
        type: Number,
        min: 1,
        default: null // Unlimited usage by default
    },
    usedCount: {
        type: Number,
        default: 0
    },
    applicableProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    applicableCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

couponSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;