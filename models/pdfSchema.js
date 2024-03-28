const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
    pdf: {
        type: String,
        required: true
    }
});

const PdfColl = new mongoose.model("PdfColl", pdfSchema);

module.exports = PdfColl;