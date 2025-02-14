
import { Schema, model } from 'mongoose';

// Patient Schema
const PatientSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true 
    },
    phone: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

// Medication Schema
const MedicationSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: String,
    quantity: { 
        type: Number, 
        required: true,
        min: 1 
    },
    unit: { 
        type: String, 
        required: true 
    }
});

// Order Schema
const OrderSchema = new Schema({
    orderId: { 
        type: String, 
        unique: true,
        required: true 
    },
    patient: { 
        type: Schema.Types.ObjectId, 
        ref: 'Patient',
        required: true 
    },
    medications: [MedicationSchema],
    deliveryDate: { 
        type: Date, 
        required: true 
    },
    status: { 
        type: String,
        enum: ['pending', 'processing', 'dispatched', 'delivered'],
        default: 'pending'
    },
    tracking: {
        created: { type: Date, default: Date.now },
        processed: Date,
        dispatched: Date,
        delivered: Date
    }
}, { timestamps: true });

// Delivery Schema
const DeliverySchema = new Schema({
    order: { 
        type: Schema.Types.ObjectId, 
        ref: 'Order',
        required: true 
    },
    deliveryPerson: { 
        type: String, 
        required: true 
    },
    status: {
        type: String,
        enum: ['assigned', 'in-transit', 'delivered'],
        default: 'assigned'
    },
    deliveryNotes: String,
    actualDeliveryDate: Date
}, { timestamps: true });

// Create indexes
OrderSchema.index({ orderId: 1 });
OrderSchema.index({ 'patient': 1 });
OrderSchema.index({ status: 1 });
DeliverySchema.index({ order: 1 });

// Create models
const Patient = model('Patient', PatientSchema);
const Order = model('Order', OrderSchema);
const Delivery = model('Delivery', DeliverySchema);

export default {
    Patient,
    Order,
    Delivery
};