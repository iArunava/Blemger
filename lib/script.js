const ALPHA = 'Alpha';
const RED = 'Red';
const BLUE = 'Blue';
const GREEN = 'Green';

$(document).ready(() => {
    set_bars();

    set_oninputs_image();
});

function set_oninputs_image() {
    let stri = '';
    for (let i = 1; i <= 2; ++i) {
        let stri = i.toString();
        let sred = document.getElementById('id--slider'+stri+'-red');
        let sgreen = document.getElementById('id--slider'+stri+'-green');
        let sblue = document.getElementById('id--slider'+stri+'-blue');
        let salpha = document.getElementById('id--slider'+stri+'-alpha');

        let srval = document.getElementById('id--simg'+stri+'-red');
        let sgval = document.getElementById('id--simg'+stri+'-green');
        let sbval = document.getElementById('id--simg'+stri+'-blue');
        let saval = document.getElementById('id--simg'+stri+'-alpha');

        set_oninput(sred, srval);
        set_oninput(sgreen, sgval);
        set_oninput(sblue, sbval);
        set_oninput(salpha, saval);
    }
}

function set_oninput(slider, val_shower) {
    slider.oninput = function() {
        val_shower.innerHTML = this.value/100;
    }
}

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
    let rval1 = document.getElementById('id--simg1-red').innerHTML;
    let gval1 = document.getElementById('id--simg1-green').innerHTML;
    let bval1 = document.getElementById('id--simg1-blue').innerHTML;

    let rval2 = document.getElementById('id--simg2-red').innerHTML;
    let gval2 = document.getElementById('id--simg2-green').innerHTML;
    let bval2 = document.getElementById('id--simg2-blue').innerHTML;


    let c1 = document.getElementById("id--blended-canvas");
    let c2 = document.getElementById("id--hidden-canvas");

    let ctx1 = c1.getContext("2d");
    let ctx2 = c2.getContext("2d");

    let img1 = document.getElementById("id--image1");
    let img2 = document.getElementById("id--image2");

    ctx1.drawImage(img1, 0, 0);
    ctx2.drawImage(img2, 0, 0);

    let imgData1 = ctx1.getImageData(0, 0, c1.width, c1.height);
    let imgData2 = ctx2.getImageData(0, 0, c2.width, c2.height);

    // invert colors
    let i;
    for (i = 0; i < imgData1.data.length; i += 4) {
        imgData1.data[i]   = imgData1.data[i]*rval1 + imgData2.data[i]*rval2;
        imgData1.data[i+1] = imgData1.data[i]*gval1 + imgData2.data[i+1]*gval2;
        imgData1.data[i+2] = imgData1.data[i]*bval1 + imgData2.data[i+2]*bval2;
        //imgData1.data[i+3] = imgData1.data[i]*0.2 + imgData2.data[i+2]*0.9;
        imgData1.data[i+3] = 255;
    }
    ctx1.putImageData(imgData1, 0, 0);
}

function create_dynamic_bar(bar_for, img_no) {
    bar_for = bar_for.toLowerCase();
    let template = `
        <div>
            <div class="margin--top-10"></div>
            <div class="columns margin--bottom-0">
                <div class="column is-12 slider-container">
                    <input id="id--slider${img_no}-${bar_for}" type="range" min="0" max="100" value="5" class="slider slider--${bar_for}">
                </div>
            </div>
            <p class="text--center"> ${bar_for.toUpperCase()} value : <span id="id--simg${img_no}-${bar_for}">0.05</span>
        </div>
    `;
    return template;
}

function setImage(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        console.log(input);
        reader.onload = function(e) {
            console.log('#id--image'+input.id[input.id.length]);
            $('#id--image'+input.id[input.id.length-1])
                .attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
