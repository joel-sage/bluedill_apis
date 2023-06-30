const converter = async (req, res) => {
    console.log(req.file);
    res.sendStatus(200); 
}

module.exports = {
    converter
} 