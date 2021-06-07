const request = require('request');

/**
 * 获取成绩单
 * @param {string}jwloginToken 从ecampus获取
 * @param {object}_options 需要包含xn(学年)和xq(学期)
 * @returns {Promise<string>} 返回成绩数据，默认为String，可用JSON.parse转换为JSON格式
 */
function transcriptSpider(jwloginToken, _options) {
    let options = {
        'method': 'POST',
        'url': 'http://ecampus.nfu.edu.cn:2929/jw-amsi/AmsJxbXsZgcj/r-list',
        'headers': {
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'deleted': 'false',
            'jwloginToken': jwloginToken,
            'kkxn': _options.xn,
            'pageSize': '1000',
            'pg': '1',
            'xnxq': _options.xq
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            resolve(response.body);
        });
    })
}

module.exports = transcriptSpider
