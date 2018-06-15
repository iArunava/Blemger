const ALPHA = 'Alpha';
const RED = 'Red';
const BLUE = 'Blue';
const GREEN = 'Green';

$(document).ready(() => {
    set_bars();
});

$('#btn--blend').on('click', () => {
    let bmodal = document.getElementById('id--blended-modal');

    blend();
    bmodal.style.display = 'block';
    bmodal.style.animation = 'opac 0.5s';
});

$('#btn--close-blend-modal').on('click', () => {
    let bmodal = document.getElementById('id--blended-modal');

    bmodal.style.animation = 'opacrev 0.5s';
    setTimeout(() => {
        bmodal.style.display = 'none';
    }, 500)
});

function set_bars() {
    let img1b = $('#id--image1-bar');
    let img2b = $('#id--image2-bar');

    img1b.append(create_dynamic_bar(RED, 1));
    img1b.append(create_dynamic_bar(GREEN, 1));
    img1b.append(create_dynamic_bar(BLUE, 1));
    img1b.append(create_dynamic_bar(ALPHA, 1));

    img2b.append(create_dynamic_bar(RED, 2));
    img2b.append(create_dynamic_bar(GREEN, 2));
    img2b.append(create_dynamic_bar(BLUE, 2));
    img2b.append(create_dynamic_bar(ALPHA, 2));
}

function blend() {
    var c1 = document.getElementById("id--blended-canvas");
    var c2 = document.getElementById("id--hidden-canvas");

    var ctx1 = c1.getContext("2d");
    var ctx2 = c2.getContext("2d");

    var img1 = document.getElementById("id--image1");
    var img2 = document.getElementById("id--image2");

    ctx1.drawImage(img1, 0, 0);
    ctx2.drawImage(img2, 0, 0);

    var imgData1 = ctx1.getImageData(0, 0, c1.width, c1.height);
    var imgData2 = ctx2.getImageData(0, 0, c2.width, c2.height);

    // invert colors
    var i;
    for (i = 0; i < imgData1.data.length; i += 4) {
        imgData1.data[i]   = imgData1.data[i]*0.5 + imgData2.data[i]*0.3;
        imgData1.data[i+1] = imgData1.data[i]*0.8 + imgData2.data[i+1]*0.2;
        imgData1.data[i+2] = imgData1.data[i]*0.7 + imgData2.data[i+2]*0.5;
        //imgData1.data[i+3] = imgData1.data[i]*0.2 + imgData2.data[i+2]*0.9;
        imgData1.data[i+3] = 255;
    }
    ctx1.putImageData(imgData1, 0, 0);
}

function create_dynamic_bar(bar_for, img_no) {
    let template = `
        <div>
            <div class="margin--top-10"></div>
            <div class="columns margin--bottom-0">
                <div class="column is-12 slider-container">
                    <input type="range" min="1" max="10" value="5" class="slider slider--${bar_for.toLowerCase()}">
                </div>
            </div>
            <p class="text--center"> ${bar_for} value : <span id="id--simg${img_no}-${bar_for.toLowerCase()}"
        </div>
    `;
    return template;
}

function create_dynamic_bar_backup(bar_for) {
    let template = `
        <div>
            <div class="columns margin--bottom-0">
                <div class="column is-1">
                    <i class="fas fa-arrow-circle-left"></i>
                </div>
                <div class="column is-10">
                    <progress class="progress is-info" value="45" max="255">45%</progress>
                </div>
                <div class="column is-1">
                    <i class="fas fa-arrow-circle-right"></i>
                </div>
            </div>
            <p class="text--center"> ${bar_for} </p>
            <div class="margin-5"></div>
        </div>
    `;
    return template;
}
