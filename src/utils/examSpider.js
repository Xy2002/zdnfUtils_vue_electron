const request = require('request');

/**
 *
 * @param {string}jwloginToken 从ecampus获取
 * @returns {Promise<string>}examInfo 返回考试信息，默认为String，可用JSON.parse转换为JSON格式
 */
function examSpider(jwloginToken){
    let options = {
        'method': 'POST',
        'url': 'http://ecampus.nfu.edu.cn:2929/jw-kwi/JxbKcxx/getKsxxByXs',
        'headers': {
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'SESSION=NzMzZjc2OTQtNDMzMC00NjNlLThkY2MtOGVlZTM5YzgxMTY1'
        },
        form: {
            'jwloginToken': jwloginToken
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            resolve(response.body);
        });
    })
}

module.exports=examSpider
