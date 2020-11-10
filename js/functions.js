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



function task3() {

    let result = "";
    let block3 = document.getElementById('three');
    let btnCalculate = document.getElementById('content_button');    

    function deleteCookie (cookieName) {
        var cookieDate = new Date ();
        cookieDate.setTime (cookieDate.getTime() - 1);
        document.cookie = cookieName += "=; expires=" + cookieDate.toGMTString();
    }

    function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null;
        }
        else
        {
            begin += 2;
            var end = document.cookie.indexOf(";", begin);
            if (end == -1) {
            end = dc.length;
            }
        }
        return decodeURI(dc.substring(begin + prefix.length, end));
    }   
    
    if(getCookie("result")){
        alert(document.cookie + '\nCookies will be deleted after pressing "Ok" button');
        deleteCookie("result");
        alert("Cookies were deleted!");
        location.reload();
    }

    btnCalculate.onclick = () => {
        let a = Number(document.getElementById('in1').value);
        let b = Number(document.getElementById('in2').value);
        let c = Number(document.getElementById('in3').value);
        
        let expiresAttrib = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toUTCString();

        if(b+c>a && a+b>c && a+c>b) {
            result="Triangle can be build";
            document.cookie = 'result' + '=' + result + ';expires=' + expiresAttrib + ';path=/';
            alert(result);
        } else {
            result="Triangle can't be build";
            document.cookie = 'result' + '=' + result + ';expires=' + expiresAttrib + ';path=/';
            alert(result);
        }
    }
    
}
task3();

function task4() {
    let four = document.querySelector('.four'),
        fourContent = four.getElementsByTagName('p')[0];
    
    let upper = document.getElementById('r1');
    let lower = document.getElementById('r2');

    if(upper.checked == true){
        lower.checked = false
    } else {
        upper.checked = false
    }

    upper.addEventListener('click', () => {
        fourContent.textContent = toUpperCaseFirstLetters(fourContent.textContent);
        localStorage.setItem('isUpperCaseInForthBlock', 'true');
    });
    lower.addEventListener('click', () => {
        fourContent.textContent = toLowerCaseFirstLetters(fourContent.textContent);
        localStorage.setItem('isUpperCaseInForthBlock', 'false');
    });

    if (localStorage.getItem('isUpperCaseInForthBlock') == 'true') {
        upper.dispatchEvent(new Event('click'));
        upper.checked = true;
    } else {
        lower.dispatchEvent(new Event('click'));
        lower.checked = true;
    }
}

function toUpperCaseFirstLetters(str) {
    return str.split(' ').map((i) => {
        return i ? i[0].toUpperCase() + i.slice(1) : '';
    }).join(' ');
}

function toLowerCaseFirstLetters(str) {
    return str.split(' ').map((i) => {
        return i ? i[0].toLowerCase() + i.slice(1) : '';
    }).join(' ');
}

task4();

function task5() {
    let input1 = document.getElementById('in1'),
        input2 = document.getElementById('in2'),
        input3 = document.getElementById('in3');

    input1.addEventListener("blur", function() {
        input1.setAttribute("placeholder", "First side")    
    }, true);          
    input1.addEventListener("focus", function() {
        input1.setAttribute("placeholder", "")    
    }, true);

    input2.addEventListener("blur", function() {
        input2.setAttribute("placeholder", "Second side")    
    }, true);          
    input2.addEventListener("focus", function() {
        input2.setAttribute("placeholder", "")    
    }, true);

    input3.addEventListener("blur", function() {
        input3.setAttribute("placeholder", "Third side")    
    }, true);          
    input3.addEventListener("focus", function() {
        input3.setAttribute("placeholder", "")    
    }, true);
}
task5();

function checkHTML (str) {
    let result = str.matchAll(/<[^<>]+>/g),
        text = str.split(/<[^<>]+>/),
        stack = [],
        div = document.createElement('div'),

        isSingleTag = (tag) => {
          div.innerHTML = tag;
          return div.firstChild && div.innerHTML != `${tag}</${tag.match(/\w+/)}>`;
        },

        packStackIntoContainer = (end, container = div) => {
          container.innerHTML = '';
          while (end != 0) {
            if((typeof stack[0]) === "string") {
              container.insertBefore(document.createTextNode(stack[0]), container.firstChild);
            } else {
              container.insertBefore(stack[0], container.firstChild);
            }
            stack.shift();
            --end;
          }
          stack.shift();
          return container;
        };

    Array.from(result).forEach((tag, index) => {
      stack.unshift(text[index]);

      if (tag[0][1] == '/'){
        let res = stack.findIndex(item => {
          return (new RegExp(`<${tag[0].match(/\w+/)}.*?>`)).exec(item);
        });

        div.innerHTML = stack[res];
        stack.unshift(res+1 ? packStackIntoContainer(res, div.firstChild) : tag[0]);
      } else {
        div.innerHTML = tag[0];
        if(div.firstChild) {
          stack.unshift(isSingleTag(tag[0]) ? div.firstChild : tag[0]);
        } else {
          stack.unshift(document.createTextNode(tag[0]));
        }
      }
    });
    stack.unshift(text.pop());
    return packStackIntoContainer(stack.length).innerHTML;
}

function createTextArea(container) {
    let textArea = document.createElement('textarea');

    textArea.classList.add('transform-area');

    textArea.textContent = container.innerHTML;

    textArea.addEventListener('input', function () {
      localStorage.setItem('block' + container.id, this.value);
    });

    container.appendChild(textArea);
}

function loadChanges(container) {
    let content = localStorage.getItem('block' + container.id);

    if (content) {
      let backup = container.innerHTML;
      let div = document.createElement('div');

      container.innerHTML = checkHTML(content);

      let button = document.createElement('button');
      button.textContent = 'submit';
      button.classList.add('submit-button');

      button.addEventListener('click', function () {
        container.innerHTML = backup;
        this.style.display = 'none';
        localStorage.removeItem('block' + container.id);
        createTextArea(container);
      });

      container.appendChild(button);
    }
}

function task6() {
    let blocks = [document.querySelector('.white_title'),
        document.querySelector('.two'),
        document.querySelector('.three'),
        document.querySelector('.four'),
        document.querySelector('.five')];

    blocks.forEach((i) => {
      if (localStorage.getItem('block' + i.id)) {
        loadChanges(i);
      } else {
        createTextArea(i);
      }
    });
}
task6();