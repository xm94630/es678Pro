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





    return bee;
})(bee||{});









