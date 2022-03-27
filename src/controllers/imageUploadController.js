const path = require('path');

const handelImage = async (req, res, next) => {
    // try {
    //     if (!req.files || Object.keys(req.files).length === 0) {
    //         return res.status(400).send('No files were uploaded.');
    //     } else {
    //         let data = [];
    //         //loop all images
    //         req.files.images.forEach((image) => {
    //             // move image to uploads directory
    //             uploadPath = path.join(__dirname, '..', '..', 'uploads/' + Date.now() + image.name);
    //             image.mv(uploadPath);
    //             // push image details
    //             data.push({
    //                 name: image.name,
    //                 mimeType: image.mimetype,
    //                 size: image.size
    //             });
    //         });

    //         //return response
    //         res.send({
    //             success: true,
    //             message: 'Images uploaded!',
    //             data: data
    //         });
    //     }
    // } catch (err) {
    //     res.status(500).send(err);
    // }
    if (!req.files) {
        return res.send({
            success: false,
            message: 'No image uploaded!'
        });
    }

    const file = req.files.images;
    const data = [];

    function move(image) {
        let uploadPath = path.join(__dirname, '..', '..', 'uploads/' + Date.now() + image.name);

        try {
            image.mv(uploadPath);
        }
        catch (e) {
            return res.send({
                success: false,
                message: 'upload error'
            });
        }
        
        data.push({
            name: image.name,
            mimeType: image.mimetype,
            size: image.size
        });
    }

    Boolean(file.length) ? file.forEach((file) => move(file)) : move(file);
    return res.send({ success: true, message: 'uploaded successfully', data });

}

module.exports = { handelImage }