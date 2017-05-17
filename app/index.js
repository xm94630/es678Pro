require("babel-polyfill");

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
     * 案例6 ES8 平方、开根号的新的写法 
     */
    bee.caseA6 = (()=>{

        var a = 4**2;
        var b = 4**(1/2);
        l(a)
        l(b)
    })


    /*
     * 案例7 ...操作符 ``操作符
     */
    bee.caseA7 = (()=>{

        function list(name,citems){
            var arr = items.map((one)=>`<span>${one}</span>`);
            return `<div class="myBox">${name} ${arr.join(' ')}</div>`
        }
        
        var html = list('兰陵王',200,300);
        document.write(html);
    })










    return bee;
})(bee||{});









