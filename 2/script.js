//task4
var el = document.getElementById("Forth");
var rad = document.getElementsByName('rad');
for (var i = 0; i < rad.length; i++) {
    rad[i].onclick = function () {
        localStorage.setItem('IRadio', this.value);
        if (this.value == 1) {
            el.style.fontStyle = "normal";
        }
        if (this.value == 2) {
            el.style.fontStyle = "italic";
        }
    }
}

if (localStorage.getItem('IRadio')) {
    var IRadio = localStorage.getItem('IRadio');
    document.querySelector('input[name="rad"][value="' + IRadio + '"]').setAttribute('checked', 'checked');
}
if (localStorage.getItem('IRadio') == null) { localStorage.setItem('IRadio', 1); }
else if (localStorage.getItem('IRadio') == 1) { document.querySelector('#Forth').style.fontStyle = 'normal'; }
else { document.querySelector('#Forth').style.fontStyle = 'italic'; }


document.addEventListener('DOMContentLoaded', () => {

    makeEditableBlock('Sec');
    initEditableBlocks();
})
//task2
function Area(a, b) {
    document.getElementById('Fifth').innerText = document.getElementById('Fifth').innerText + ' ' + (a * b);
}
var a = 6;
var b = 8;
Area(a, b);

//task3
function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
function Save() {
    var Data = document.Form.Line.value;

    a = new Array(10);
    a = Data.split(' ');

    var q = Math.min(...a);
    var t = 0;
    for (i = 0; i < 10; i++) {
        if (a[i] == q) {
            t++;
        }
    }
    alert(t);
    document.cookie = "Number= " + t;

}
if (document.cookie.includes('Number=')) {
    document.getElementById('FF').remove();
    alert(document.cookie);
    var is = confirm("You have some cookies, do you want to leave it?")
    if (is == true) {
        alert('You have some cookies |' + document.cookie + ' |, reload page!')
    }
    else {
        alert("Cookies will be deleted permanently");
        deleteAllCookies();
    }
}

//task5
document.addEventListener('keypress', (event) => {
    var keyName = event.key;

    if (event.code == 'KeyZ') { alert('keypress event\n\n' + 'key: ' + keyName); }
});
//task6

const initEditableBlocks = () => {
    Array.from(document.getElementsByClassName('editArea')).map((area) => {
        area.addEventListener('change', (event) => {
            const newContent = event.target.value;
            localStorage.setItem(`${event.target.parentNode.id}Content`, newContent);
            event.target.parentNode.children[0].innerHTML = newContent;
        })
    })
    Array.from(document.getElementsByClassName('editBtn')).map((btn) => {
        btn.addEventListener('click', (event) => {
            localStorage.removeItem(`${event.target.parentNode.id}Content`);
            document.location.reload();
        })
    })
}
const makeEditableBlock = (blockId) => {
    if (isHTML(localStorage.getItem(`${blockId}Content`))) {
        const content = localStorage.getItem(`${blockId}Content`) ?
            localStorage.getItem(`${blockId}Content`) :
            document.getElementById(blockId).innerHTML;
            document.getElementById(blockId).innerHTML = content;
            document.getElementById(blockId).insertAdjacentHTML('beforeend',
            `<textarea class="editArea">${content}</textarea>
            <button type="submit" class="editBtn">Return default</button>`)
    }
    else {
        const content = localStorage.getItem(`${blockId}Content`) ?
            localStorage.getItem(`${blockId}Content`) :
            document.getElementById(blockId).innerText;
            document.getElementById(blockId).innerText = content;
            document.getElementById(blockId).insertAdjacentHTML('beforeend',
            `<textarea class="editArea">${content}</textarea>
            <button type="submit" class="editBtn">Return default</button>`)
    }

}

//validation
function isHTML(str) {
    return /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/.test(
        str
    );
} 