编译说明
--------


1. 环境变量 ``%PATH%`` 下有 ``nodejs ^6.9.3`` , ``yarn ^0.18.1`` (安装方式: ``npm install -g yarn`` )
2. 下载项目依赖: ``yarn install``
3. 编译
    3.1. 开发 develop: ``yarn start``

    3.2. 打包 distribute: ``yarn dist``



目录说明
--------


::

    ├─ src
         ├─ action
         ├─ asset
               └─ image
         ├─ component    基础组件
         ├─ constant
         ├─ custom       针对ant.design的定制组件
         ├─ exception
         ├─ service      Web Api 封装
         ├─ style        全局css
         ├─ util
         ├─ view         业务组件
         └─ viewmodel    视图model(对应redux中的reducer)



