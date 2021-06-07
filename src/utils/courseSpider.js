const request = require('request');

/**
 * 课程爬取
 * @param {string}jwloginToken 从ecampus获取
 * @param {object}_options 需要包含xn(学年)和xq(学期)
 * @returns {Promise<string>}courseData 返回每堂课的数据，默认为String，可用JSON.parse转换为JSON格式
 */
function courseSpider(jwloginToken, _options) {
    let options = {
        'method': 'POST',
        'url': 'http://ecampus.nfu.edu.cn:2929/jw-cssi/CssStudent/r-listJxbForIndex',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'xn': _options.xn,
            'xq': _options.xq,
            'jwloginToken': jwloginToken
        }
    };
    return new Promise((resolve) => {
        request(options, function (error, response) {
            if (error) throw new Error(error);
            let courseData = JSON.parse(response.body)
            console.log(courseData.msg)
            resolve(courseData.msg)
        })
    })
}

module.exports = courseSpider

