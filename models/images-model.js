const db = require("../config/db-config");
const fsPromises = require("fs").promises;

module.exports = {
    addImageToUser,
    getUserImages,
    deleteImages
};

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
}

async function getUserImages(userId){
    const images = await db("images")
            .where({user_id: userId})
    
    let response = [];
    for (let image of images){
        let filedata = await fsPromises.readFile(image.file_path);
        
        let buf = Buffer.from(filedata);
        let base64 = buf.toString('base64');
        response.push({ id: image.id, name: image.display_name, base64 });
    }
      
    return response;
}

async function deleteImages(userId, imageIds){
    let images = await db("images").whereIn("id", imageIds);
    
    for (let image of images){
        if (userId !== image.user_id){
            throw new Error("that image does not belong to this user");
        }
        await fsPromises.unlink(image.file_path);
    }

    return db("images")
            .delete()
            .whereIn("id", imageIds);
}