


less 延迟加载
========

http://lesscss.org/features/#variables-feature-lazy-loading

由于 less 的变量是延迟加载(Lazy Loading)的(包括less中import的less文件),
所以在定义less style时要很小心, 不能完全将style放同一个less文件中, 防止出现变量覆盖

NOTE: index.js中import进来的less文件互相之间变量不会覆盖




