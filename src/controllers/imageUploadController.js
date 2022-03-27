const path = require('path');

const handelImage = async (req, res, next) => {
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