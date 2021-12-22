## 下载
wget https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh && chmod a+x install-release.sh && ./install-release.sh
nano /etc/v2ray/config.json

service v2ray start
systemctl status v2ray

## [参考](https://twoha.blogspot.com/2019/07/centos-7-v2ray.html)
## [参考](https://github.com/v2fly/fhs-install-v2ray/blob/master/README.zh-Hans-CN.md)

## 配置
```js
{
  "log": {
    "loglevel": "warning",
    "access": "/var/log/v2ray/access.log", 
    "error": "/var/log/v2ray/error.log"
  },
  "inbounds": [
    {
      "port": 8801,  // 服务器监听端口
      "listen":"0.0.0.0"
      "protocol": "vmess", // 主传入协议
      "settings": {
        "clients": [
          {
            "id": "a3467fdc",  // 用户id，自行修改
            "alterId": 100,
            "security":"aes-128-gcm"
          }
        ]
      },
      "streamSettings": {
        "network": "mkcp",  // 此处的 mkcp 也可写成 kcp，两种写法效果一样
        "kcpSettings": {
          "uplinkCapacity": 5,
          "downlinkCapacity": 100,
          "congestion": true,
          "header": {
            "type": "none"
          }
        }
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",
      "settings": {}
    }
  ]
}
```

## 防火墙
firewall-cmd --zone=public --add-port=8801/tcp --permanent
firewall-cmd --zone=public --add-port=8801/udp --permanent
firewall-cmd --reload