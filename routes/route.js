const express = require("express");
const multer = require("multer");
const Pdf = require("../models/pdfSchema");
const { PDFDocument, PDFName, PDFPage } = require('pdf-lib');
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const __dirname1 = path.resolve();
//         const destinationPath = path.join(__dirname1, "../files");
//         cb(null, destinationPath);
//     },
//     filename: function (req, file, cb) {
//         const date = Date.now();
//         cb(null, date+file.originalname);
//     }
// });
const __dirname1 = path.resolve();

const upload = multer({ dest: path.join(__dirname1, "../files") });

router.get("/", (req, res) => {
  res.send("PDF GENERATOR");
});

router.post("/upload-files", upload.single("file"), async (req, res) => {
    console.log(req.file);
    
    const fileName = req.file.name;
    try {
        const newPdf = await Pdf.create({ pdf: `${fileName}.pdf` });
        await newPdf.save();
        console.log(newPdf);
        res.status(201).json(newPdf);
        
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/generate-pdf", async (req, res) => {
    console.log("hi");
    try {
        const { filePath, selectedPages, pdfFile } = req.body;
        const ExistingPdfBytes = await fs.readFile(
          path.join(__dirname1,filePath));
        const ExistingPdfDoc = await PDFDocument.load(ExistingPdfBytes);
        const newPdfDoc = await PDFDocument.create();
        for (const i of selectedPages) {
            const [copiedPage] = await newPdfDoc.copyPages(ExistingPdfDoc, [Number(i) - 1]);
            newPdfDoc.addPage(copiedPage);
        }
        const newPdfBytes = await newPdfDoc.save();
        await fs.writeFile(path.join(__dirname1, `../Generated_pdf/generated${pdfFile}`),newPdfBytes);
        const newPdf = await Pdf.create({ pdf: `generated${pdfFile}` });
        await newPdf.save();
        res.status(201).json(newPdf);

    } catch (error) {
         res.status(400).json(error);
    }
})

module.exports = router;