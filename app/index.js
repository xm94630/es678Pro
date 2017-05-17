require("babel-polyfill");

/*****************************************************************************************
 * ES6 
 * ES7 **操作符、[].includes方法
 * ES8 async/await
 * stage-0 ::操作符
 * stage-1 decorators（暂停实用了）、class的静态方法添加
 * stage-2 ...操纵符（仅此一个，非常实用）
 * stage-3 async/await（我觉得处理异步的语法糖都是很棒的）
 * stage-4 
 *****************************************************************************************/


var l = function(){
    return console.log.apply(console,arguments);
}

var bee = ((bee)=>{
    
    /*
     * 案例1 箭头函数
     */
    bee.caseA1 = (()=>{
        l('我是箭头函数');
    })


    /*
     * 案例2 ES6 promise
     * 注意观察箭头函数，其实在定义的时候，还是更加实用通用的写法
     * 只有在作为高阶函数时候，用箭头函数才比较合适，我也要遵循这个原则
     */
    bee.caseA2 = (()=>{

        function resolveAfterInterval(x,t) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(x * x);
                }, t * 1000);
            });
        }

        var promise = resolveAfterInterval(9,1);
        promise.then(function(data){
            l(data);
        })

        //通过这个同步的语句，我们可以发现，promise中的内容都是异步的
        l('我是同步代码')
    })


    /*
     * 案例3 ES8 promise + async + await
     */
    bee.caseA3 = (()=>{

        function resolveAfterInterval(x) {
            l('==>函数调用')
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(x * x);
                },1000);
            });
        }

        //注意当函数内部有await出现的时候，在外层函数之前要标记 async
        async function add() {
            //注意，这里还是同步的
            //包括第一次执行 resolveAfterInterval 函数的时候，也是同步的呢
            l('add函数：这里其实还是同步的！')

            //如何理解 await 呢，我可以认为这个 await 是在等待 promise的发生！而且具有阻塞的作用
            var a = await resolveAfterInterval(1); 
            //只有上面这个值返回了，才会继续
            var b = await resolveAfterInterval(2);
            return a+b;
        }
        add().then((v)=>console.log('异步地得到最后的结果：'+v))

        l('我是同步代码')
    })


    /*
     * 案例4 案例2的简化练习
     * 其中，cb的写法，是不是有我自己实现的promise的风格
     */
    bee.caseA4 = (()=>{

        function getPromise() {
            return new Promise(cb => {
                setTimeout(() => {
                    cb('缓缓来迟的文字（1秒后）');
                },1000);
            });
        }

        var promise = getPromise();
        promise.then((str)=>{
            l(str)
        });
    })


    /*
     * 案例5 案例3的简化练习
     * 其实这个实现效果和案例4是比较类似的呢，有趣吧~
     */
    bee.caseA5 = (()=>{

        function getPromise() {
            return new Promise(cb => {
                setTimeout(() => {
                    cb('缓缓来迟的文字（1秒后）');
                },1000);
            });
        }

        async function myAsync(){
            var str = await getPromise();
            l(str);
        }

        myAsync();
    })


    /*
     * 案例6 ES7 平方、开根号的新的写法 
     */
    bee.caseA6 = (()=>{

        var a = 4**2;
        var b = 4**(1/2);
        l(a)
        l(b)
    })


    /*
     * 案例7 ES7 ...操作符 ``操作符
     */
    bee.caseA7 = (()=>{

        function list(name,citems){
            var arr = items.map((one)=>`<span>${one}</span>`);
            return `<div class="myBox">${name} ${arr.join(' ')}</div>`
        }
        
        var html = list('兰陵王',200,300);
        document.write(html);
    })


    /*
     * 案例8 ES78 decorator
     * 目前这个 decorator 的使用似乎有点问题
     * 在babal官网上测试，也是不行的，不知道是怎么回事？还是说是typescript的产物
     */
    bee.caseA8 = (()=>{

        /*class Mat {
            @log
            add(a, b) {
             return a + b;
            }
            @log
            subtract(a,b){
             return a - b;
            }
        }
        var m = new Mat();
        m.add(2,3)
        m.subtract(2,3)*/
    })


    /*
     * 案例9 ES7 Object.entries
     * 将对象处理成比较特殊的数组形式，然后就可以使用在迭代函数的参数中使用 [key,value] 形式
     * 注意：返回的新数组和普通的数据是有些区别的，普通的数据即使内容和它一样，也是不能使用 [key,value] 的。
     */
    bee.caseA9 = (()=>{

        var kings = {
            'llw':{
                name:"兰陵王",
                type:"刺客"
            },
            'cyj':{
                name:"程咬金",
                type:"坦克"
            }
        }
        var arr = Object.entries(kings)
        l(arr)

        var html = arr.map(([key,value])=>
            `<li>${key} ${value.name} ${value.type}</li>`
            ).join('\n')
        document.write(`<ul>${html}</li>`);
    })



    /*
     * 案例10 ES？ Map对象
     * 这是一种新的数据类型，目前也没有发现它相比原来的数组、对象有什么特别之处。
     */
    bee.caseA10 = (()=>{
        var arr = [["兰陵王",100],["程咬金",500]];
        var myMap = new Map(arr);
        l(myMap)

        //map对象一般这样子遍历！
        for(var [x,y] of myMap){
            l(`${x} 的生命值是 ${y}`);
        }

        //单个获取值的方法
        l(myMap.get("兰陵王"))
    })


    /*
     * 案例11 ES8 字符串的新方法 padStart、padEnd
     */
    bee.caseA11 = (()=>{

        l('|'.padStart(5,'&').padEnd(10,'%')) // 输出：&&&&|%%%%%
        //这里的5表示一直填充到下表为5的位置！当然要排除掉源字符串的占用位置
    })


    /*
     * 案例12 ES8 SharedArrayBuffer、 ArrayBuffer 
     */
    bee.caseA12 = (()=>{
        //...
    })


    /*
     * 案例13 class的静态方法添加
     * stage-1中的内容，必须要添加这个插件的
     */
    bee.caseA13 = (()=>{
        class Fish{
            static run = function(){
                l('鱼都会跑~')
            };
            constractor(){
                this.age = 100;
            }
        }
        var fish = new Fish();
        l(fish);
        Fish.run();
    })


    /*
     * 案例14 ::操作符
     * stage-0中的特有，必须要添加这个插件的
     */
    bee.caseA14 = (()=>{
        
        var obj = {
            a:'lala'
        }
        function func(){
            l(this.a);
        }

        //两个等效
        obj::func();
        func.bind(obj)();
    })


    /*
     * 案例15 AsyncIterator
     */
    bee.caseA15 = (()=>{
        //...
    })()









    return bee;
})(bee||{});









