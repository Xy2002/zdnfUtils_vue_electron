module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                'appId': 'nfuEcampusUtils',
                'productName': 'nfuEcampusUtils', // 项目名，也是生成的安装文件名，即mzDemo.exe
                'copyright': 'Marshall Copyright © 2021', // 版权信息
                publish:[
                    {
                        provider: 'generic',
                        url:'https://marshall-1301067880.cos.ap-guangzhou.myqcloud.com/app'
                    }
                ],
                'files': [
                    './**/*'
                ],
                'directories': {
                    'output': './app_dist' // 输出文件路径
                },
                'win': { // win相关配置
                    'icon': './public/favicon.ico', // 图标，当前图标在根目录下，注意这里有两个坑
                    "requestedExecutionLevel": "requireAdministrator", //获取管理员权限
                    'target': [{
                        'target': 'nsis', // 利用nsis制作安装程序
                        'arch': [
                            'x64', // 64位
                            'ia32'
                        ]
                    }]
                },
                artifactName: '${productName}_Setup_${version}_${platform}.${ext}',
                'nsis': {
                    include: './installer.nsh',
                    'oneClick': false, // 是否一键安装
                    'allowElevation': true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    'allowToChangeInstallationDirectory': true, // 允许修改安装目录
                    'installerIcon': './favicon.ico', // 安装图标
                    'uninstallerIcon': './favicon.ico', // 卸载图标
                    'installerHeaderIcon': './favicon.ico', // 安装时头部图标
                    'createDesktopShortcut': true, // 创建桌面图标
                    'createStartMenuShortcut': true, // 创建开始菜单图标
                    'shortcutName': 'nfuEcampusUtils' // 图标名称(项目名称)
                }
            }
        }
    }
}
//
// module.exports = {
//     pluginOptions: {
//         electronBuilder: {
//             // 预加载文件
//             preload: 'src/preload.js',
//             // 渲染进程也可以获取原生node包
//             nodeIntegration: true,
//             // 打包配置
//             builderOptions: {
//                 // 发布者名称
//                 productName: 'hx-admin',
//                 // 包名
//                 appId: 'cn.cceq.hxadmin',
//                 copyright: 'hui xian copyright',
//                 // 更新的服务器
//                 publish: [
//                     {
//                         provider: 'generic',
//                         url: 'http://127.0.0.1/app/'
//                     }
//                 ],
//                 asar: false,
//                 // 不需要打包至asar中的文件如数据库文件
//                 extraResources: [
//                     {
//                         from: './data/db.db',
//                         to: '../data/db.db',
//                         filter: ['**/*']
//                     }, './icons'],
//                 win: {
//                     // 图标文件大小为 256*256
//                     icon: './icons/icon.ico',
//                     target: [
//                         {
//                             target: 'nsis',
//                             arch: [
//                                 // 'x64',
//                                 'ia32'
//                             ]
//                         }
//                     ],
//                     // 打包权限 asInvoker | highestAvailable
//                     requestedExecutionLevel: 'highestAvailable'
//                 },
//                 // 安装包名称，可自行配置
//                 artifactName: '${productName}_Setup_${version}_${platform}.${ext}',
//                 nsis: {
//                     // 一键安装，如果设为true，nsis设置就无意义请直接删除 nsis 配置
//                     oneClick: false,
//                     // true全用户安装【目录为：C:\Program Files (x86)】，false安装到当前用户
//                     perMachine: true,
//                     // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
//                     allowElevation: true,
//                     // 允许修改安装目录
//                     allowToChangeInstallationDirectory: true,
//                     // 创建桌面图标
//                     createDesktopShortcut: true,
//                     // 创建开始菜单图标
//                     createStartMenuShortcut: true,
//                     // 快捷方式的名称,默认为应用程序名称
//                     // shortcutName: 'HX',
//                     // 安装图标
//                     installerIcon: './icons/icon.ico',
//                     // 卸载图标
//                     uninstallerIcon: './icons/icon.ico',
//                     // 安装时头部图标
//                     installerHeaderIcon: './icons/icon.ico',
//                     // 配置 nsn 如修改默认安装目录
//                     include: './installer.nsh'
//                 }
//             }
//         }
//     }
// }
