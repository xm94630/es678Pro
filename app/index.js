var l = function(){
    return console.log.apply(console,arguments);
}

var bee = ((bee)=>{
    
    /*
     * 案例1
     */
    bee.caseA1 = (()=>{
        l(123);
    })


    return bee;
})(bee||{});










