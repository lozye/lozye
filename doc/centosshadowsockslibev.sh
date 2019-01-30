######################
## shadowsocks-libev
######################

# install dependencies
yum install epel-release -y
yum install gcc gettext autoconf libtool automake make pcre-devel asciidoc xmlto udns-devel libev-devel -y

# install shadowsocks-libev
cd /etc/yum.repos.d/
wget https://copr.fedoraproject.org/coprs/librehat/shadowsocks/repo/epel-7/librehat-shadowsocks-epel-7.repo
yum update
yum install shadowsocks-libev

# edit config.json
vi /etc/shadowsocks-libev/config.json
{
    "server":"0.0.0.0",
    "server_port":8888,
    "local_port":1080,
    "password":"xxxxxxxxxxx",
    "timeout":60,
    "method":"aes-256-cfb"
}

# run application on startup
systemctl enable shadowsocks-libev
systemctl start shadowsocks-libev
systemctl status shadowsocks-libev
chkconfig shadowsocks-libev on

# configure firewall (if needed)
firewall-cmd --zone=public --add-port=8888/tcp --permanent
firewall-cmd --zone=public --add-port=8888/udp --permanent
firewall-cmd --reload

# watch log
journalctl | grep ss-server

######################
## kcptun
######################

# install server
wget --no-check-certificate https://raw.githubusercontent.com/kuoruan/kcptun_installer/master/kcptun.sh
chmod +x ./kcptun.sh
./kcptun.sh

# configure firewall (if needed)
firewall-cmd --zone=public --add-port=29900/udp --permanent
firewall-cmd --reload

# install client
open https://github.com/xtaci/kcptun/releases

# create run_client.sh and run_client.plist

# run on startup
launchctl load run_client.plist

