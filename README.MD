自动生成一个前端新项目
================
  概述：项目包括compass、css压缩、js文件合并压缩、chrome自动刷新功能

1 所需环境
----------------
  请先在电脑上安装[node](https://nodejs.org/en/download/)、[ruby](http://rubyinstaller.org/downloads／)，并通过代码安装[grunt-init](http://gruntjs.com/project-scaffolding)、[compass](http://compass-style.org/install/)如下：
  ```
  gem install compass -V
  npm install -g grunt-init
  npm install -g grunt-cli
  ```
2 下载模板文件
----------------
  a).通过[Git](http://git-scm.com/download)下载模板文件
    ```
    git clone https://github.com/joykingwx/new.git .grunt-init/new
     ```
  
  b).手动下载然后将文件复制到计算机当前用户文件下“username/.grunt-init/new”
  
3 自动生成项目
----------------
命令行生成项目
```
grunt-init new
```
4.运行项目
----------------
  a). 安装grunt扩展工具
   ```
   npm install
  ```
    
  b). 运行
   ```
   grunt
  ```
5.chrome自动刷新
----------------
 a). 安装chrome插件[LiveReload](https://chrome.google.com/webstore/detail/jnihajbhpnppcggbcgedagnkighmdlei?utm_source=chrome-app-launcher-info-dialog),需要翻墙
 
 b). 需要在本机服务器下运行，建议使用[webstorm](https://www.jetbrains.com/webstorm/)编辑器,自带服务器功能，可免费激活（百度）。
