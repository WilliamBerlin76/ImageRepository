const db = require("../config/db-config");

module.exports = {
    addImageToUser
}

async function addImageToUser(userId, images){
    
    for (let image of images){
        const imageInfo = {
            display_name: image.originalname,
            user_id: userId,
            file_path: `./uploads/${image.filename}`,
            file_name: image.filename,
        }
        await db("images")
            .insert(imageInfo, "id");
    }
    return; 
};