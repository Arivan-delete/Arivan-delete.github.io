let centre_block = document.querySelector("fifth").innerHTML;
let workspace = document.querySelector("fifth");
let form = document.querySelector(".event_log");
const circle = document.querySelector('#circle');

function add_to_local_storage(information) {
    let existing = localStorage.getItem("event");
    existing = existing ? existing.split(',') : [];
    let time = new Date(Date.now());

    existing.push("<br>" + information + " time:" + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds());

    localStorage.setItem('event', existing.toString());
}


function building_div() {
    document.querySelector(".play_button").style.display = "none";
    let stop = document.querySelector(".stop");
    stop.style.display = "block";
    document.querySelector("third").appendChild(stop);

    form.style.display = "none";
    localStorage.clear();
    add_to_local_storage("animation started!");

    document.querySelector("#plot").setAttribute('style', 'display: none;');
    let div = document.querySelector("#anim");
    div.className = "div";
    div.style =
        "width: 100%; height: 480px;" +
        "border: 5px solid blue; box-sizing: content-box; position: relative;";
    div.style.display = "flex";
    circle.style.left = div.offsetWidth / 2 - 10 + 'px';
    circle.style.top = div.offsetHeight / 2 - 10 + 'px';

    let i = 0;
    let j = 1;
    let top = div.offsetHeight / 2 - 10;
    let left = div.offsetWidth / 2 - 10;

    let a = setInterval(() => {
        i++;

        if (top === 465) {
            clearInterval(a);
            add_to_local_storage("Circle touched border: " + j + " moves")
            stopping();
        }

        if (top < 475) {
            if (j % 4 === 1) {
                circle.style.left = left + 1 + 'px';
                left++;
                add_to_local_storage("GO LEFT");
            }
            else if (j % 4 === 2){
                circle.style.top = top + 1 + 'px';
                top++;
                add_to_local_storage("GO UP");
            }
            else if (j % 4 === 3){
                circle.style.left = left - 1 + 'px';
                left--;
                add_to_local_storage("GO RIGHT");
            }
            else if (j % 4 === 0){
                circle.style.top = top - 1 + 'px';
                top--;
                add_to_local_storage("GO DOWN");
            }
        }

        if (i === j) {
            i = 0;
            j++;
        }
    }, 0,01);

};


function stopping() {
    document.querySelector(".stop").style.display = "none";
    workspace.innerHTML = centre_block;
    add_to_local_storage("animation stopped");
    workspace.className = ("centreblock");
    workspace.style.display = "grid";
    form.style.display = "block";
    form.innerHTML = localStorage.getItem("event");
    document.querySelector(".play_button").style.display = "block";
}

