```
CentOS 7 开始默认使用Systemd作为开启启动脚本的管理工具，Shadowsocks则是当前比较受欢迎的科学上网工具，本文将介绍如何在 CentOS 下安装和配置 Shadowsocks 服务。

安装 pip
pip是 python 的包管理工具。在本文中将使用 python 版本的 shadowsocks，此版本的 shadowsocks 已发布到 pip 上，因此我们需要通过 pip 命令来安装。

在控制台执行以下命令安装 pip：

curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
python get-pip.py
安装配置 shadowsocks
在控制台执行以下命令安装 shadowsocks：

pip install --upgrade pip
pip install shadowsocks
安装完成后，需要创建配置文件/etc/shadowsocks.json，内容如下：

{
  "server": "0.0.0.0",
  "server_port": 8388,
  "password": "uzon57jd0v869t7w",
  "method": "aes-256-cfb"
}
说明：

method为加密方法，可选aes-128-cfb, aes-192-cfb, aes-256-cfb, bf-cfb, cast5-cfb, des-cfb, rc4-md5, chacha20, salsa20, rc4, table
server_port为服务监听端口
password为密码，可使用密码生成工具生成一个随机密码
以上三项信息在配置 shadowsocks 客户端时需要配置一致，具体说明可查看 shadowsocks 的帮助文档。

配置自启动
新建启动脚本文件/etc/systemd/system/shadowsocks.service，内容如下：

[Unit]
Description=Shadowsocks

[Service]
TimeoutStartSec=0
ExecStart=/usr/bin/ssserver -c /etc/shadowsocks.json

[Install]
WantedBy=multi-user.target
执行以下命令启动 shadowsocks 服务：

systemctl enable shadowsocks
systemctl start shadowsocks
为了检查 shadowsocks 服务是否已成功启动，可以执行以下命令查看服务的状态：

systemctl status shadowsocks -l
如果服务启动成功，则控制台显示的信息可能类似这样：

● shadowsocks.service - Shadowsocks
   Loaded: loaded (/etc/systemd/system/shadowsocks.service; enabled; vendor preset: disabled)
   Active: active (running) since Mon 2015-12-21 23:51:48 CST; 11min ago
 Main PID: 19334 (ssserver)
   CGroup: /system.slice/shadowsocks.service
           └─19334 /usr/bin/python /usr/bin/ssserver -c /etc/shadowsocks.json

Dec 21 23:51:48 morning.work systemd[1]: Started Shadowsocks.
Dec 21 23:51:48 morning.work systemd[1]: Starting Shadowsocks...
Dec 21 23:51:48 morning.work ssserver[19334]: INFO: loading config from /etc/shadowsocks.json
Dec 21 23:51:48 morning.work ssserver[19334]: 2015-12-21 23:51:48 INFO     loading libcrypto from libcrypto.so.10
Dec 21 23:51:48 morning.work ssserver[19334]: 2015-12-21 23:51:48 INFO     starting server at 0.0.0.0:8388
一键安装脚本
新建文件install-shadowsocks.sh，内容如下：

#!/bin/bash
# Install Shadowsocks on CentOS 7

echo "Installing Shadowsocks..."

random-string()
{
    cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w ${1:-32} | head -n 1
}

CONFIG_FILE=/etc/shadowsocks.json
SERVICE_FILE=/etc/systemd/system/shadowsocks.service
SS_PASSWORD=$(random-string 32)
SS_PORT=8388
SS_METHOD=aes-256-cfb
SS_IP=`ip route get 1 | awk '{print $NF;exit}'`
GET_PIP_FILE=/tmp/get-pip.py

# install pip
curl "https://bootstrap.pypa.io/get-pip.py" -o "${GET_PIP_FILE}"
python ${GET_PIP_FILE}

# install shadowsocks
pip install --upgrade pip
pip install shadowsocks

# create shadowsocls config
cat <<EOF | sudo tee ${CONFIG_FILE}
{
  "server": "0.0.0.0",
  "server_port": ${SS_PORT},
  "password": "${SS_PASSWORD}",
  "method": "${SS_METHOD}"
}
EOF

# create service
cat <<EOF | sudo tee ${SERVICE_FILE}
[Unit]
Description=Shadowsocks

[Service]
TimeoutStartSec=0
ExecStart=/usr/bin/ssserver -c ${CONFIG_FILE}

[Install]
WantedBy=multi-user.target
EOF

# start service
systemctl enable shadowsocks
systemctl start shadowsocks

# view service status
sleep 5
systemctl status shadowsocks -l

echo "================================"
echo ""
echo "Congratulations! Shadowsocks has been installed on your system."
echo "You shadowsocks connection info:"
echo "--------------------------------"
echo "server:      ${SS_IP}"
echo "server_port: ${SS_PORT}"
echo "password:    ${SS_PASSWORD}"
echo "method:      ${SS_METHOD}"
echo "--------------------------------"
执行以下命令一键安装：

chmod +x install-shadowsocks.sh
./install-shadowsocks.sh
也可以直接执行以下命令从 GitHub 下载安装脚本并执行：

bash <(curl -s http://morning.work/examples/2015-12/install-shadowsocks.sh)
安装完成后会自动打印出 Shadowsocks 的连接配置信息。比如：

Congratulations! Shadowsocks has been installed on your system.
You shadowsocks connection info:
--------------------------------
server:      10.0.2.15
server_port: 8388
password:    RaskAAcW0IQrVcA7n0QLCEphhng7K4Yc
method:      aes-256-cfb
--------------------------------
```

### 第二个方案

https://www.5xiaobo.com/?id=693

```
国外VPS搭建SSR多用户教程【中文版】
各位，在学习该教程前请先确定你已经有一台国外或者香港的VPS了！因为上次很多人QQ问我怎么操作，我说你有VPS了吗，他说什么是VPS......各位，先确保自己弄明白什么是VPS，怎么购买VPS等概念再来学习该教程哦。至于怎么购买国外的VPS，我网站有好几篇教程：

（1） HiFormance主机购买：https://www.5xiaobo.com/?id=655

（2）搬瓦工主机购买：https://www.5xiaobo.com/?id=558

如果你有搬瓦工（最便宜的国外VPS了，一年目前最低貌似是29美元，非常稳定！我当年买的时候才19美元一年，用了好几年了，我网站很多教程都是基于搬瓦工的截图），可以直接 一键安装ss，可以参考这篇日志（https://www.5xiaobo.com/?id=558）。

但是如果你想多用户使用，可以使用不同的端口来控制。所以，本文的SSR多用户搭建也就是在同一个VPS下分别设置出多个SSR账号，相同的IP地址，不同的端口和SSR密码。

本教程适用于任何可用的国外VPS搭建SS/SSR，可以搭建SS多用户也可以搭建SSR多用户。

废话不多说，直接开干！

第一步：利用Xshell或者Putty又或者SecureCRT等软件（软件包可以搜索我博客进行下载）远程连接你的国外VPS。至于如何连接，我真的不想讲了，真的很简单！

第二步：在命令行内输入如下命令：（本脚本适应CentOS、Debian、Ubuntu）

Bash
yum -y install wget
wget -N --no-check-certificate https://raw.githubusercontent.com/CecilWu/SSR-Chinese/master/ssr.sh && chmod +x ssr.sh && bash ssr.sh
1-2.png

此时服务器会自动安装脚本，如果脚本执行过程中没有反映，你直接回车确认即可。安装完毕后如下图所示：

2-2.png

看清楚哦，这个脚本是中文版的，看起来非常简单！此时上图的界面就是中文版SS的主界面。直接输入对应的数字后按回车即可执行命令！

第三步：输入数字1后回车安装ShadowsocksR。安装完毕后会要求你自定义端口和密码。然后回车确认，他会要求你选择加密方式，此时一般选10：aes-256-cfb。如下图所示：

3-2.png

第四步：然后按照下图设置协议插件、混淆插件。跟着我做就行了，不用管那么多！

4-2.png

第五步：如果是个人使用连接数及限速全部默认，直接回车即可。

5-2.png

第六步：输入“Y”确认上述的部署

6-2.png

第七步：过段时间之后，系统会提示安装完成，同时显示SS账号的配置信息，自己保存好即可！

8-2.png

第八步：如果你想返回主界面继续安装第二个帐号，可以输入下面的命令调出，然后选择“9”切换到多端口模式即可：

Bash
bash ssr.sh
QQ截图20190125105635.png

第九步：下载Shadowsocks的客户端（点击下载），将创建好的账号信息进行连接配置。配置完毕后即可愉快地玩耍了！

QQ截图20190121165631.png



下面介绍如何安装谷歌BBR加速来优化VPS的速度，如果你用的是搬瓦工的VPS它的CentOS 6系统有自带的BBR加速，如果是其它系统或是别家VPS可以继续看下面给你的VPS安装谷歌BBR加速。

第十步：如果你想开启谷歌的BBR加速，直接复制下面的脚本进行多次回车即可。

Bash
yum -y install wget
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh
chmod +x bbr.sh
./bbr.sh
9-2.png

第十一步：然后按任意键确定安装，ctrl+c取消安装

10-2.png

第十二步：耐心等待安装过程，速度可能会很慢，不要急，你可以上个厕所再来。当出现“Complete”时即代表安装成了，输入“Y”重启服务器即可。

12-1.png

至此，教程完毕，请大家低调使用，本文选自Vultr中文网。
```
