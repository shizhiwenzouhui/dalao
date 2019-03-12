<?php
$conn = mysqli_connect("127.0.0.1","root","","jd",3306);   //连接数据库
mysqli_query($conn,"set names utf8");  //设置编码

mysqli_select_db($conn,"jd");//选择数据库

//sql查询方式

$sql = "select lid,imgs from jd_indexBanner";                //在dept表中查询所有数据

$res = mysqli_query($conn,$sql);                            //执行sql语句

$arr = array();

while($row = mysqli_fetch_array($res,1)){  

$arr[] = $row;   //将查询结果赋值到数组

$arr;
}

$str = json_encode($arr);   
echo $str;
?>