const request = require('request')

function updateContact(jwloginToken, newInfo) {
    let options = {
        'method': 'POST',
        'url': 'http://ecampus.nfu.edu.cn:2929/jw-srsi/SrsJbzl_myself/r-updateContact',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'jwloginToken': jwloginToken,
            'dim': true,
            'email': newInfo.email,
            'isDim': true,
            'xh': newInfo.id,
            'xm': newInfo.name,
            'yxlxdh': newInfo.phone
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res) {
            if (err) reject(err)
            else {
                resolve(JSON.parse(res.body).msg)
            }
        })
    })
}

module.exports = updateContact
