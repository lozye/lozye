# 使用 HAProxy 加速 Shadowsocks

# 简单介绍下 HAProxy，HAProxy 是一个高效的负载均衡软件，可以实现 TCP/HTTP 的代理。这里使用它将我们发给它的请求转发给 ss 服务器。
yum install haproxy nano -y


# 编辑配置
rm /etc/haproxy/haproxy.cfg -f
nano /etc/haproxy/haproxy.cfg

# 配置
global
        ulimit-n  51200

defaults
        log global
        mode    tcp
        option  dontlognull
        contimeout 1000
        clitimeout 150000
        srvtimeout 150000

frontend ss-in
        bind *:8388
        default_backend ss-out

backend ss-out
        server server1 222.222.222.222:2222 maxconn 20480

# 其中，*:8388 中的 8388 是中继服务器接受请求的端口，222.222.222.222:2222 是 ss 服务器的 IP 地址加端口号。

# run application on startup
systemctl enable haproxy
systemctl start haproxy
systemctl status haproxy
chkconfig haproxy on

# configure firewall (if needed)
firewall-cmd --zone=public --add-port=8388/tcp --permanent
firewall-cmd --zone=public --add-port=8388/udp --permanent
firewall-cmd --reload





