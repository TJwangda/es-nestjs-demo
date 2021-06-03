export const configMap = {
    gaspMap:{
        '微博':'Weibo',
        'Weibo':'Weibo',
        '微信':'WeChat',
        '腾讯微信':'WeChat',
        '微信公众':'WeChat',
        '微信公众号':'WeChat',
        '百度':'Baidu',
        'Baidu':'Baidu',
        '百度百家号':'Baidu',
        '今日头条':'toutiao.com',
        '一点':'yidianzixun.com',
        '一点资讯':'yidianzixun.com',
        '一点资讯一点号':'yidianzixun.com',
        '搜狐':'sohu.com',
        'souhu.com':'sohu.com',
        '凤凰':'ifeng.com',
        '凤凰网':'ifeng.com',
        '凤凰新闻':'ifeng.com',
        '新浪':'sina.com',
        'sina.com':'sina.com',
        '新浪新闻看点号':'sina.com',
        '网易':'163.com',
        '网易新闻网易号':'163.com',
        '网易新闻':'163.com',
        'UC':'toutiao.uc.cn',
        'toutiao.uc.cn':'toutiao.uc.cn',
        'UC头条':'toutiao.uc.cn',
        '大鱼号':'toutiao.uc.cn',
        '腾讯':'qq.com',
        '腾讯新闻企鹅号':'qq.com',
        '企鹅号':'qq.com',
        '知乎':'zhihu',
        '趣头条':'qutoutiao.net',
        '测试平台':'qutoutiao.net',
        '头条':'toutiao.com',
        '微信公号':'WeChat',
        '天涯':'tianya.cn',
        '凯迪':'kdnet.net',
        '铁血':'tiexue.net',
        '爱卡':'xcar.com.cn',
        '强国':'people.com.cn',
        '天天':'kuaibao.qq.com',
        '百度贴吧':'tieba.baidu.com',
        '新浪微博':'Weibo',
        '抖音':'douyin.com',
        '公众账号':'WeChat',
        '微信公众平台':'WeChat',
        '微信公众账号':'WeChat'
    },
    platMap: {
        'Weibo': {name: '新浪微博', value: 'Weibo', checked: true},
        'WeChat': {name: '微信公众号', value: 'WeChat', checked: true},
        'Baidu': {name: '百度百家', value: 'Baidu', checked: true},
        'toutiao.com': {name: '今日头条', value: 'toutiao.com', checked: true},
        'yidianzixun.com': {name: '一点资讯', value: 'yidianzixun.com', checked: true},
        'sohu.com': {name: '搜狐新闻', value: 'sohu.com', checked: true},
        'ifeng.com': {name: '凤凰新闻', value: 'ifeng.com', checked: true},
        'sina.com': {name: '新浪新闻', value: 'sina.com', checked: true},
        '163.com': {name: '网易新闻', value: '163.com', checked: true},
        'toutiao.uc.cn': {name: 'UC头条', value: 'toutiao.uc.cn', checked: true},
        'qq.com': {name: '腾讯新闻', value: 'qq.com', checked: true},
        'zhihu': {name: '知乎', value: 'zhihu', checked: true},
        'qutoutiao.net': {name: '趣头条', value: 'qutoutiao.net', checked: true},
        'tianya.cn': {name: '天涯社区', value: 'tianya.cn', checked: true},
        'kdnet.net': {name: '凯迪论坛', value: 'kdnet.net', checked: true},
        'tiexue.net': {name: '铁血论坛', value: 'tiexue.net', checked: true},
        'xcar.com.cn': {name: '爱卡社区', value: 'xcar.com.cn', checked: true},
        'people.com.cn': {name: '强国社区', value: 'people.com.cn', checked: true},
        'kuaibao.qq.com': {name: '天天快报', value: 'kuaibao.qq.com', checked: true},
        'tieba.baidu.com': {name: '百度贴吧', value: 'tieba.baidu.com', checked: true},
        'douyin.com': {name: '抖音', value: 'douyin.com', checked: true},
        'qita': {name: '其他', value: 'qita', checked: true},
    },
    //Unit_Name:组件名称 打印日志需要,根据url获取组件名称（根据业务图）
    unitNameMap: {
        //-----------账号概览页---------------
        '/api/site-account/asAnalyFirst':'大屏总览-顶部汇总',
        '/api/site-account/asAnalyFour':'大屏总览-四个来源',
        '/api/site-account/asAnalyDfwxb':'地方网信办上报',
        '/api/site-account/asAnalyCzType':'处置类型占比',
        '/api/site-account/asAnalyYLC':'大屏总览-各舆论场账号统计',
        '/api/crud/statisticsNumCrud':{'get':'查询数据','patch':'修改','put':'更换实体','delete':'根据id删除','post':'添加数据'},
        '/api/site-account/asAnaly':'大屏总览--业务局上报统计',
        '/api/site-account/asAnalyPushTopFive':'企业推送量top5',

        //-----------账号管理页---------------
        //-----------账号信息管理---------------
        '/api/accountMsgMiddle/accMsgView':'账号管理检索',
        '/api/account-msg/exportzsExcel2':'账号导出需要转世',
        '/api/account-msg/exportExcel':'账号导出不需要转世',
        '/api/account-msg/deleteMasAccMsgBatch':'账号删除',
        //-----------账号信息管理-个人详情页---------------
        '/api/crud/accountmsg-crud':{'get':'查询账号','patch':'修改账号','put':'更换账号实体','delete':'根据id删除账号','post':'添加账号数据'},
        '/api/accountUserCrud':{'get':'查询主体','patch':'修改主体','put':'更换主体实体','delete':'根据id删除主体','post':'添加主体数据'},
        '/vest/userInfo':'用户信息',
        '/gk/info':'相关发文',
        '/api/crud/accountSonCrud':{'get':'查询账号关联表','patch':'修改账号关联表','put':'更换账号关联表实体','delete':'根据id删除账号关联表','post':'添加账号关联表数据'},

        //-----------账号导入管理---------------

        '/stmybatis/tUserReborn/encryFiled':'信息加密',
        '/api/accMsgLogcrud':{'get':'查询账号记录表','patch':'修改账号记录表','put':'更换账号记录表实体','delete':'根据id删除账号记录表','post':'添加账号记录表数据'},
        'api/account-msg/importMiddleExcel':'账号导入',

        //-------转世预警页面------------
        '/api/p/crud/departs':'部门列表',
        '/api/accountMsgMiddle/getAccMsgByFromCon':'转世预警账号检索',
        '/api/account-msg/updateAccMsgBatch':'标记转世状态',

        //-------主体管理页面------------
        '/api/accountMsgMiddle/accUserView':'主体管理页面检索',
        '/api/accountMsgMiddle/exprotAccMsgUser':'主体导出',
        '/api/accountMsgMiddle/delMateserUser':'主体删除',
        '/api/accountUser/relation':'保存主体用户和头像文件的关系',
        '/api/accountMsgMiddle/userAccMsgList':'录入、疑似、转世账号集合',
        '/api/accountUser/relation-d3':'取得主体用户和头像文件的关系，为D3形式',
        'addSiteAccTimeTask':'定时任务从神通库导入mysql',
        '/api/accMsgLog/addAccMsgLog':'添加足迹日志',

        //登录
        '/api/auth/login':'用户登录',
        '/api/auth/profile':'用户信息',
        '/api/account-msg/batchAdd':'批量添加账号接口',

        //后两个页面，系统配置。。
        '/api/account-msg/analyAcctMsgNum':'统计页面,当天各个业务局录入的账号条数和主体用户条数',
        '/api/account-msg/analyOperationNum':'当天各个业务局登陆次数、导出的账号条数、主体用户条数',
        '/api/account-msg/analAllAccNum':'分析页面，各部门所有的账号数',
        '/api/account-msg/analysisAccmsg':'统计分析接口',

        '/api/crud/feedbackCrud':{'get':'查询意见反馈表','patch':'修改意见反馈表','put':'更换意见反馈表实体','delete':'根据id删除意见反馈','post':'添加意见反馈'},
        '/api/a/crud/categories':{'get':'查询级别表','patch':'修改级别表','put':'更换级别表实体','delete':'根据id删除级别','post':'添加级别表数据'},
        '/api/crud/systemlog':{'get':'查询日志表','patch':'修改日志表','put':'更换日志表实体','delete':'根据id删除日志','post':'添加日志'},
        'detectionNameVestNew':'转世引擎',//转世引擎
    },
    unitIdMap:{

//-----------账号概览页---------------
        '/api/site-account/asAnalyFirst':'JCYJ-J-15-01',
        '/api/site-account/asAnalyFour':'JCYJ-J-15-02',
        '/api/site-account/asAnalyDfwxb':'JCYJ-J-15-03',
        '/api/site-account/asAnalyCzType':'JCYJ-J-15-04',
        '/api/site-account/asAnalyYLC':'JCYJ-J-15-05',
        // '/api/crud/statisticsNumCrud':{'get':'JCYJ-J-15-06','patch':'JCYJ-J-15-07','put':'JCYJ-J-15-08','delete':'JCYJ-J-15-09','post':'JCYJ-J-15-10'},
        //789不打印，直接删了
        '/api/crud/statisticsNumCrud':{'get':'JCYJ-J-15-06','patch':'JCYJ-J-15-74','put':'JCYJ-J-15-75','delete':'JCYJ-J-15-76','post':'JCYJ-J-15-10'},
        '/api/site-account/asAnaly':'JCYJ-J-15-11',
        '/api/site-account/asAnalyPushTopFive':'JCYJ-J-15-12',

        //-----------账号管理页---------------
        //-----------账号信息管理---------------
        '/api/accountMsgMiddle/accMsgView':'JCYJ-J-15-13',
        '/api/account-msg/exportzsExcel2':'JCYJ-J-15-14',
        '/api/account-msg/exportExcel':'JCYJ-J-15-15',
        '/api/account-msg/deleteMasAccMsgBatch':'JCYJ-J-15-16',
        //-----------账号信息管理-个人详情页---------------
        '/api/crud/accountmsg-crud': {'get':'JCYJ-J-15-17','patch':'JCYJ-J-15-18','put':'JCYJ-J-15-19','delete':'JCYJ-J-15-20','post':'JCYJ-J-15-21'},
        '/api/accountUserCrud': {'get':'JCYJ-J-15-22','patch':'JCYJ-J-15-23','put':'JCYJ-J-15-24','delete':'JCYJ-J-15-25','post':'JCYJ-J-15-26'},
        '/vest/userInfo':'JCYJ-J-15-27',
        '/gk/info':'JCYJ-J-15-28',
        '/api/crud/accountSonCrud': {'get':'JCYJ-J-15-29','patch':'JCYJ-J-15-30','put':'JCYJ-J-15-31','delete':'JCYJ-J-15-32','post':'JCYJ-J-15-33'},
        //-----------账号导入管理---------------
        '/stmybatis/tUserReborn/encryFiled':'JCYJ-J-15-34',
        '/api/accMsgLogcrud': {'get':'JCYJ-J-15-35','patch':'JCYJ-J-15-36','put':'JCYJ-J-15-37','delete':'JCYJ-J-15-38','post':'JCYJ-J-15-39'},
        'api/account-msg/importMiddleExcel':'JCYJ-J-15-40',
        'addSiteAccTimeTask':'JCYJ-J-15-41',
        '/api/accMsgLog/addAccMsgLog':'JCYJ-J-15-42',

        //-------转世预警页面------------
        '/api/p/crud/departs':'JCYJ-J-15-43',
        '/api/accountMsgMiddle/getAccMsgByFromCon':'JCYJ-J-15-44',
        '/api/account-msg/updateAccMsgBatch':'JCYJ-J-15-45',

        //-------主体管理页面------------
        '/api/accountMsgMiddle/accUserView':'JCYJ-J-15-46',
        '/api/accountMsgMiddle/exprotAccMsgUser':'JCYJ-J-15-47',
        '/api/accountMsgMiddle/delMateserUser':'JCYJ-J-15-48',
        '/api/accountUser/relation':'JCYJ-J-15-49',
        '/api/accountMsgMiddle/userAccMsgList':'JCYJ-J-15-50',
        '/api/accountUser/relation-d3':'JCYJ-J-15-51',

        //登录
        '/api/auth/login':'JCYJ-J-15-52',
        '/api/auth/profile':'JCYJ-J-15-53',
        '/api/account-msg/batchAdd':'JCYJ-J-15-54',

        //后两个页面，系统配置。。
        '/api/account-msg/analyAcctMsgNum':'JCYJ-J-15-55',
        '/api/account-msg/analyOperationNum':'JCYJ-J-15-56',
        '/api/account-msg/analAllAccNum':'JCYJ-J-15-57',
        '/api/account-msg/analysisAccmsg':'JCYJ-J-15-58',

        '/api/crud/feedbackCrud':{'get':'JCYJ-J-15-59','patch':'JCYJ-J-15-60','put':'JCYJ-J-15-61','delete':'JCYJ-J-15-62','post':'JCYJ-J-15-63'},
        '/api/a/crud/categories':{'get':'JCYJ-J-15-64','patch':'JCYJ-J-15-65','put':'JCYJ-J-15-66','delete':'JCYJ-J-15-67','post':'JCYJ-J-15-68'},
        '/api/crud/systemlog':{'get':'JCYJ-J-15-69','patch':'JCYJ-J-15-70','put':'JCYJ-J-15-71','delete':'JCYJ-J-15-72','post':'JCYJ-J-15-73'},
        //从77开始
        'detectionNameVestNew':'JCYJ-J-15-77',//转世引擎
    }
};
