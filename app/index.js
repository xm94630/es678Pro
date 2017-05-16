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
     * 案例2 promise
     * 这个是ES2017
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
        l('我是同步代码3333')

    })()


    return bee;
})(bee||{});









