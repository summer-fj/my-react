var devicewidth=document.documentElement.clientWidth;
var fs=devicewidth/7.5;
if(devicewidth>750){
    devicewidth=750;
}
document.documentElement.style.fontSize=fs+"px";