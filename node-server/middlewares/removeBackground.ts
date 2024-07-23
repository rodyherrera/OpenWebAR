import RemoveBackground from 'remove-bg-node';

const removeBackground = async (req, res, next) => {
    if(!req.file){
        next();
        return;
    }
    const rm = new RemoveBackground();
    await rm.asyncRemoveBackground(req.file.path, req.file.path);
    next();
};

export default removeBackground;