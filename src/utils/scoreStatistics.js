/**
 * @author Marshall
 * @date 2021/6/8 23:18
 * @description
 */
const request = require('request')

async function scoreStatistics(jwloginToken, id) {
    let options = {
        'method': 'POST',
        'url': 'http://ecampus.nfu.edu.cn:2929/jw-amsi/AmsJxbXsZgcj/listXs',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'id': id,
            'jwloginToken': jwloginToken
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res) {
            if (err) reject(err)
            else {
                resolve(JSON.parse(res.body).msg.list[0])
            }
        })
    })
}

module.exports = scoreStatistics
