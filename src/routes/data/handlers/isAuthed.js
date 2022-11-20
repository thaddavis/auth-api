module.exports = async function (req, res, next) {
    
    try {
        res.status(200).send()
    } catch(e) { next (e) }
    
}