var arr = [1,2,3,4,5,6,7,8,9,10];
var index = 0;
var tmp = 0;
function hackshen () {
    if (index < arr.length) {
        for (var i = 0; i < arr.slice(index,10+index).length; i++) {
            tmp += arr.slice(index,10+index)[i];
        }
        console.log(tmp)
        tmp = 0
        index++;
        hackshen()
    }else {
        index = 0;
    }
}
