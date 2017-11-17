// 声明一个字符串
var test_string = "Hello JavaScript!";
// 声明一个数字
var test_num = 1;
// 声明数组方法一
var test_array = Array();
// 声明数组方法二
var test_array2 = Array("word", 2, true);
// 声明数组方法三
var test_array3 = ["Ringo", "John", "George", "Paul"];
// 给数组赋值
test_array[0] = "666";
test_array[1] = test_array3[2];
// 数组某个元素可以包含一个数组
test_array[2] = test_array3;
// alert(test_string);
// alert(test_num);
// alert(test_array2);
// alert(test_array);

// 关联数组
var lemon = Array();
lemon["name"] = "fattoliu";
lemon["age"] = 28;
lemon["sex"] = false;
lemon["address"] = "KAI HU A";
// alert(lemon.name + " >>>>>> " + lemon.age + " >>>>>> " + lemon.sex + " >>>>>>> " + lemon.address);


// 声明对象方法一
var obj = Object();
obj.name = "rose";
obj.age = 29;
obj.sex = true;
obj.address = "KAI HUA";
// alert(obj.name + " >>>>>> " + obj.age + " >>>>>> " + obj.sex + " >>>>>>> " + obj.address);

// 声明对象方法二
var obj2 = {name: "rose", age: 29, sex: true, address: "KAI HUA"};
// alert(obj2.name + " *****\n" + obj2.age + " *****\n" + obj2.sex + " *****\n" + obj2.address);


// 一个对象中的某个元素还能再套对象
var childObj = {};
childObj.name = "candy";
childObj.age = 4;
childObj.sex = true;
childObj.address = "kai hua";
obj2.child = childObj;
// alert(obj2.child.name + '\n' + obj2.child.age + "\n" + obj2.child.sex + "\n" + obj2.child.address);

// 操作符
var aa = 1 + 1;
var bb = 2 - 1;
var cc = 2 * 2;
var dd = 2 / 3;
dd++;
// alert(cc);

// 条件语句
var a = 1;
var b = 2;
if (a > b) {
    alert("a is bigger b");
} else {
    alert("a is smaller b");
}

//比较操作符
// 注意：*************  如果条件语句中的某个条件里使用了单个等号，那么只要相应的赋值操作取得成功，那么条件的就只结果就是 true
var my_mood = "happy";
var your_mood = "sad";
if (my_mood = your_mood) {
    alert("We both feel the same.");
}
// js中，等号并不是严格相等，相等操作符认为空字符串与 false 的含义是相同的
var bool = false;
var str = "";
if (bool == str) {
    alert("bool equals str");
}

// ===才是严格相等，全等操作符会严格比较，不仅比较值，还会比较变量的类型
if (bool === str) {
    alert(" **** bool equals str ****");

}

testMethod();
multiply(3, 4);
var result = returnTest(5, 6);
alert("返回结果为： " + result);

// 函数声明
function testMethod() {
    alert("I am javascript method.");
}

function multiply(num1, num2) {
    var total = num1 * num2;
    alert(total);
}

function returnTest(num1, num2) {
    return num1 * num2;
}

//变量的作用域
/*全局变量：global variable，作用域为整个脚本，任何地方，包括函数内部也能引用
* 局部变量：local variable，只能存在声明它的那个函数内部，函数外部无法引用
*
* 使用 var 关键字可以明确地为函数设定作用域
*   如果某个函数中变量声明用了 var，那该变量将被视为一个局部变量；反之，如果没用 var，将会被视为一个全局变量*/
var global_variable = "666";// 全局变量
testVariable();
alert("这是全局变量：" + global_variable);

function testVariable() {
    // global_variable = "888";
    // alert("改变了全局变量的值：" + global_variable);
    var global_variable = "777";    // 局部变量，因此，此处不会改变上面global_variable的值
    alert("这是局部变量：" + global_variable);

}

// 内建对象
var beatles = new Array();
var length = beatles.length;
var num = 7.561;
var num = Math.round(num);
alert(num);

var current_date = new Date();
var today = current_date.getDay();
alert("current date:----"+current_date);
alert("today:----"+today);

