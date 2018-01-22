var nodemailer = require('nodemailer'); //引入nodemailer模块
var config = require('./config/con_email');//引入配置文件
var https = require('https');
var str='';
setInterval(function(){
  https.get('https://m.weibo.cn/api/container/getIndex?type=uid&value=3716209401&containerid=1076033716209401',function (res) {
      //console.log("statusCode: ", res.statusCode);
      //console.log("headers: ", res.headers);
      var json = '';
      res.on('data', function (d) {
          json += d;
      });
      res.on('end',function(){
          //获取到的数据
          json = JSON.parse(json);
          if(str == ''){    //初始化判断是否为空
            str = json.cards[0].mblog.text
          }
          if(str != json.cards[0].mblog.text){   // 判断是否更新过内容
                var transporter = nodemailer.createTransport({
                    service:config.email.service, //用的服务
                    auth:{
                        user:config.email.user, //发件人账号
                        pass:config.email.pass  //发件人密码
                    }
                });
                var mailOptions = {
                    from:config.email.user, //发信人的账号
                    to:'buka0pu@163.com', //收信人账号
                    subject:'主人女神来消息了', //邮件标题
                    html: `<img src=`+json.cards[0].mblog.user.profile_image_url+`/>`+
                    '<br/>Content:'+`<p>`+ json.cards[0].mblog.text + `</p>`+
                    '<br/>Time：'+json.cards[0].mblog.created_at+
                    '<br/>来自：'+json.cards[0].mblog.source//`<p>发信测试</p>` //邮件内容
                };
                transporter.sendMail(mailOptions,function(err,info){
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log('Successful!😀')
                })
          }
         // console.log(json.cards[0].mblog.text)
         // console.log(str)
      });
  }).on('error', function (e) {
      console.error(e);
  });
},120000);

