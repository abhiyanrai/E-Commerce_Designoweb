import mongoose from "mongoose";

const Products = new mongoose.Schema(
	{
        createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		name: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		size: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		}
	},
	{ timestamps: true }
);

export default mongoose.model("products", Products);