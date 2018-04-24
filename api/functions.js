module.exports = {
    
    jsonResponse: function (status, statusText, data, res, message, meta) {
        var response = {
            message: message
        };
        if (typeof data !== 'undefined') {
            response.data = data;
        }
        if (typeof meta !== 'undefined') {
            response.meta = meta;
        }
        if (typeof statusText !== 'undefined') {
            response.status = statusText;
        }

        return res.status(status).json(response);
    }
}