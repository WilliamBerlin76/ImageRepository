const db = require("../config/db-config");
const fsPromises = require("fs").promises;

module.exports = {
    addImageToUser,
    getUserImages
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

async function getUserImages(userId){
    const images = await db("images")
            .where({user_id: userId})
    
    let response = [];
    for (let image of images){
        let filedata = await fsPromises.readFile(image.file_path);
        
        let buf = Buffer.from(filedata);
        let base64 = buf.toString('base64');
        response.push({ name: image.display_name, base64 });
    }
      
    return response;
};