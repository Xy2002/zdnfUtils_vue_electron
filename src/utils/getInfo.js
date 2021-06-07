const request = require('request');

function getUserInfo(jwloginToken) {
    let options = {
        'method': 'POST',
        'url': 'http://ecampus.nfu.edu.cn:2929/jw-privilegei/User/r-getMyself',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'jwloginToken': jwloginToken
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res) {
            if (err) reject(err)
            else {
                let resJson = JSON.parse(res.body)
                let obj = {}
                obj.name = resJson.msg.name
                obj.id = resJson.msg.username
                obj.majorId = resJson.msg.zyid
                obj.facultyId = resJson.msg.xyid
                resolve(obj)
            }
        })
    })
}

function getFacultyList(jwloginToken) {
    let options = {
        'method': 'POST',
        'url': 'http://ecampus.nfu.edu.cn:2929/jw-fesi/FesXy/r-list',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'jwloginToken': jwloginToken
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res) {
            if (err) reject(err)
            else {
                resolve(JSON.parse(res.body).msg.list)
            }
        })
    })
}

function getMajorList(jwloginToken) {
    let options = {
        'method': 'POST',
        'url': 'http://ecampus.nfu.edu.cn:2929/jw-fesi/FesZy/r-list',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'jwloginToken': jwloginToken
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res) {
            if (err) reject(err)
            else {
                resolve(JSON.parse(res.body).msg.list)
            }
        })
    })
}

function getContact(jwloginToken) {
    let options = {
        'method': 'POST',
        'url': 'http://ecampus.nfu.edu.cn:2929/jw-srsi/SrsJbzl_myself/r-contact',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'jwloginToken': jwloginToken
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

async function getInfo(jwloginToken) {
    let facultyList = await getFacultyList(jwloginToken)
    let majorList = await getMajorList(jwloginToken)
    let obj = await getUserInfo(jwloginToken)
    let contact = await getContact(jwloginToken)
    let userInfo = {}
    userInfo.name = obj.name
    userInfo.id = obj.id
    userInfo.faculty = majorList[obj.majorId - 1].zymc
    userInfo.major = facultyList[obj.facultyId - 1].xymc
    userInfo.phone = contact.yxlxdh
    userInfo.email = contact.email
    return new Promise(((resolve, reject) => {
        if (userInfo) {
            resolve(userInfo)
        } else {
            reject("未知错误")
        }
    }))
}

module.exports = getInfo
