const request = require('request');

/**
 * 课程爬取
 * @param {string}jwloginToken 从ecampus获取
 * @returns {Promise<object>}courseData 返回每堂课的数据，默认为String，可用JSON.parse转换为JSON格式
 */
function courseSpider(jwloginToken) {
    let options = {
        'method': 'POST',
        'url': 'http://ecampus.nfu.edu.cn:2929/jw-cssi/CssStudent/r-listJxbForIndex',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'xn': '2020',
            'xq': '2',
            'jwloginToken': jwloginToken
        }
    };
    return new Promise((resolve) => {
        request(options, function (error, response) {
            if (error) throw new Error(error);
            let courseData = JSON.parse(response.body)
            resolve(courseData.msg)
        })
    })
}

module.exports = courseSpider

