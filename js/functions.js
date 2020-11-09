function task1() {
    let one = document.getElementById('one');
    let six = document.getElementById('six');
    
    let tmp = one.outerHTML;
    one.innerHTML = six.outerHTML;
    six.innerHTML = tmp;
}
task1();

function task2() {
    let k = 5; 
    let p = 5 * k;
    let a = k / (2 * Math.tan(Math.PI / 5));

    let s = (p * a) / 2;

    let three = document.getElementById('three')
    three.firstElementChild.getElementsByTagName('p')[0].innerHTML += '<h4>The area of the pentagon is: ' + s + '</h4>'
}
task2();

if (!sessionStorage.getItem("confirmed")){
    let remove = false;
    if(!remove){
        if (document.cookie.match("result=.+[^\;]")) {
            remove = confirm(document.cookie.match("result=.+[^\;]") + "\nCookies will be removed");
            if (remove) {
                document.cookie = encodeURIComponent("result") + '=;'; 
                document.location.reload();
            } 
        } else {
            containerForm.style.display = 'block';
        }
    }
}

function task3()
{
    let result;
    let btn = document.querySelector(".content_button");
    btn.onclick = () => {
        let a = Number(document.getElementById('in1').value);
        let b = Number(document.getElementById('in2').value);
        let c = Number(document.getElementById('in3').value);
     
        if(b+c>a && a+b>c && a+c>b) {
            result="Triangle can be build";
            document.cookie = encodeURIComponent("result") + '=' + encodeURIComponent(result);
            alert(result);
        } else {
            result="Triangle can't be build";
            document.cookie = encodeURIComponent("result") + '=' + encodeURIComponent(result);
            alert(result);
        }
    }
    
}

task3();