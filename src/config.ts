export const
    config = {
    productName:'自己测试es',
    port: 3025,
    SERVER_URL: `./`,
    production: false,
    useHash: true,
    hmr: false,
    baseUrl: '',
    subUrl: '',
    mongodbVREku: 'VestRecommand',//库名
    synchronize: false,//项目启动是否创建表

    httpsFlg:false,
    httpsOptions:{
        httpsPort:443,
        keyPath: '/filepath/Nginx/xxxx.key',
        certPath: '/filepath/Nginx/xxxx.crt',
    },
    mppUrl2:"http://10.136.74.88:9211",
    nameVestUrl:"http://10.136.144.71:2377",//查询转世
    nameVestUrlNew:"http://10.136.144.71:2378",//导入转世
    nameVestUrlNew2389:"http://10.136.144.71:2389",//12.10 查询账号发文数、粉丝数的接口地址
    //可上传文件类型
    uploadTypeArr: ["jpg","png","gif","svg","psd","eps","raw","avif","jpeg","txt","doc","ppt","docx","xlsx","xls","pptx","md"],

    //外网测试环境
    stServerUrl: 'http://127.0.0.1:8080/stmybatis',//操作神通库的java服务地址
    mongodbpath: '10.10.111.82:27050',//外网测试
    dataSource:{
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database:'test-es',
    },
        checkUrl:'http://localhost:5000/test',
        sysId:'281', //鉴权服务id

        testMpp:"http://10.136.21.87:9211",
        testMpp2:"http://10.136.21.87:9200",
        testMppApiUrl:"http://10.136.20.130:20202/uploadsystem"
};
