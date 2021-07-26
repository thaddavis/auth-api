module.exports = async function (req, res, next) {
    
    try {

        res
            .status(202)
            .clearCookie('jwt')
            .send()

    } catch(e) { next (e) }
    
}