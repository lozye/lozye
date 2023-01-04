# VLESS+NGINX


# 0x01 Install Xray Nginx
```shell
yum update -y
yum install epel-release -y
yum install nano nginx -y
cd /etc/yum.repos.d
wget https://github.com/XTLS/Xray-install/raw/main/install-release.sh
chmod a+x install-release.sh
./install-release.sh
```

# 0x02 Config Xray
##  installed: /usr/local/etc/xray/config.json
```json
{
    "log": {
        "loglevel": "warning"
    },
    "inbounds": [
        {
            "listen": "127.0.0.1",
            "port": 1189,
            "protocol": "vless",
            "settings": {
                "decryption": "none",
                "clients": [
                    {
                        "id": "***", //user_id
                        "level": 1,
                        "alterId": 0
                    }
                ]
            },
            "streamSettings": {
                "network": "ws",
                "wsSettings": {
                    "path": "/ws" //nginx_ws_path
                }
            }
        }
    ],
    "outbounds": [
        {
            "protocol": "freedom",
            "settings": {}
        },
        {
            "protocol": "blackhole",
            "settings": {},
            "tag": "blocked"
        }
    ],
    "routing": {
        "rules": [
            {
                "type": "field",
                "ip": [
                    "geoip:private"
                ],
                "outboundTag": "blocked"
            }
        ]
    }
}
```


# 0x03 Config Nginx
```conf
server {
    listen  443 ssl http2;
    server_name ***;
    charset utf-8;  
    access_log  /var/log/nginx/xxxx.access.log;
    error_log /var/log/nginx/xxx.error.log;

    index index.html index.htm;
    ssl_certificate /etc/nginx/pem/***.pem; # 改成你的证书地址
    ssl_certificate_key /etc/nginx/pem/***.key; # 改成证书密钥文件地址  
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES256-GCM-SHA384:AES128-GCM-SHA256:AES256-SHA256:AES128-SHA256:AES256-SHA:AES128-SHA:DES-CBC3-SHA:HIGH:!aNULL:!eNULL:!EXPORT:!CAMELLIA:!DES:!MD5:!PSK:!RC4;
    #表示使用的加密套件的类型。
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3; #表示使用的TLS协议的类型，您需要自行评估是否配置TLSv1.1协议。
    ssl_prefer_server_ciphers on;


    root /usr/share/nginx/html;

    location / {
        index  index.html;
    }

    location /ws { # 与 V2Ray 配置中的 path 保持一致
        if ($http_upgrade != "websocket") {
            return 404;
        }
        proxy_redirect off;
        proxy_pass http://127.0.0.1:1189; # 假设v2ray的监听地址是12345
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

# 0x04 Config Firewall IF Exist
```shell
firewall-cmd --permanent --zone=public --add-port=443/tcp
firewall-cmd --permanent --zone=public --add-port=443/udp
firewall-cmd --reload
```

# 0x05 Enable Service
```
systemctl enable xray
systemctl enable nginx
systemctl start xray
systemctl start nginx
```

# 0x06 Config Client
``` shell
vless://{user_id}@{server}:443?
&encryption=none
&security=tls
&type=ws
&host={server}
&path=/ws #nginx_ws_path
```
