const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    review: { 
        type: String,
    },
	employee_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },
    assigned_to : {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'  
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("review", reviewSchema);
