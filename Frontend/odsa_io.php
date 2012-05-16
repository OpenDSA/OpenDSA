<?php

function list_BR($n)
{
    return($n ."\n");
}



$datafromclient = $_POST['userdata'];

if(is_array($datafromclient))
{

$b= array_map("list_BR",$datafromclient);    

}

$handle = './index.rst';
$newfile='./index1.rst';      

file_put_contents($handle, $b);

copy($handle, $newfile);    








?>
