/**
 * Created by user on 22.05.17.
 */

module.exports = function (req, res, next) {
    if(!req.cookies.token){
        return res.sendStatus(401);
    }
    next();
};