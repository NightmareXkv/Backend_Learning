const express = require("express");
const upload = require("../middlewares/upload.middleware");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const router = express.Router();

router.post(
    "/upload",
    upload.fields([
        { name: "audio", maxCount: 1 },
        { name: "cover", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const audioFile = req.files.audio[0];
            const coverFile = req.files.cover[0];

            const audioUpload = await uploadToCloudinary(
                audioFile.buffer,
                "music-player/audio",
                "video" // important for mp3
            );

            const coverUpload = await uploadToCloudinary(
                coverFile.buffer,
                "music-player/covers",
                "image"
            );

            res.status(200).json({
                message: "Uploaded successfully",
                audioUrl: audioUpload.secure_url,
                coverUrl: coverUpload.secure_url,
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Upload failed" });
        }
    }
);

module.exports = router;
