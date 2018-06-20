const ALPHA = 'Alpha';
const RED = 'Red';
const BLUE = 'Blue';
const GREEN = 'Green';

let linearBlend = true;


$(document).ready(() => {
    set_bars();
    set_oninputs_image();
    toggleAlphaSliders();
});

$(document).keypress((key) => {
    let modal = document.getElementById('id--blended-modal');
    if (key.which === 0 && modal.style.display == 'block') {
        $('#btn--close-blend-modal').trigger('click');
    }
});

$('#id--linear-blend').on('click', () => {
    linearBlend = !linearBlend;
});

$('#id--heart-beat').on('click', () => {
    let hb = document.getElementById('id--heart-beat').checked;
    if (hb) {
        document.getElementById('span--heart').style.animation = 'heartbeat 2.5s infinite';
    } else {
        document.getElementById('span--heart').style.animation = '';
    }
});

$('#id--aslider-checkbox').on('click', () => {
    toggleAlphaSliders();
});

function toggleAlphaSliders() {
    let isalpha = document.getElementById('id--aslider-checkbox').checked;
    for (let i = 1; i <= 2; ++i) {
        stri = i.toString();
        let salpha = document.getElementById('id--slider'+stri+'-alpha');
        salpha.disabled = !isalpha;
    }
}

function set_oninputs_image() {
    let sred1 = document.getElementById('id--slider1-red');
    let sgreen1 = document.getElementById('id--slider1-green');
    let sblue1 = document.getElementById('id--slider1-blue');
    let salpha1 = document.getElementById('id--slider1-alpha');

    let sred2 = document.getElementById('id--slider2-red');
    let sgreen2 = document.getElementById('id--slider2-green');
    let sblue2 = document.getElementById('id--slider2-blue');
    let salpha2 = document.getElementById('id--slider2-alpha');

    let redVal1   = document.getElementById('id--simg1-red');
    let greenVal1 = document.getElementById('id--simg1-green');
    let blueVal1  = document.getElementById('id--simg1-blue');
    let alphaVal1 = document.getElementById('id--simg1-alpha');

    let redVal2   = document.getElementById('id--simg2-red');
    let greenVal2 = document.getElementById('id--simg2-green');
    let blueVal2  = document.getElementById('id--simg2-blue');
    let alphaVal2 = document.getElementById('id--simg2-alpha');

    set_oninput(sred1, redVal1, sred2, redVal2);
    set_oninput(sgreen1, greenVal1, sgreen2, greenVal2);
    set_oninput(sblue1, blueVal1, sblue2, blueVal2);
    set_oninput(salpha1, alphaVal1, salpha2, alphaVal2);

    set_oninput(sred2, redVal2, sred1, redVal1);
    set_oninput(sgreen2, greenVal2, sgreen1, greenVal1);
    set_oninput(sblue2, blueVal2, sblue1, blueVal1);
    set_oninput(salpha2, alphaVal2, salpha1, alphaVal1);
}

function set_oninput(mslider, mval, eslider, eval) {
    mslider.oninput = function() {
        mval.innerHTML = this.value/100;
        if (linearBlend) {
            eslider.value = 100 - mslider.value;
            eval.innerHTML = eslider.value / 100;
        }
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
    let aval1 = document.getElementById('id--simg1-alpha').innerHTML;

    let rval2 = document.getElementById('id--simg2-red').innerHTML;
    let gval2 = document.getElementById('id--simg2-green').innerHTML;
    let bval2 = document.getElementById('id--simg2-blue').innerHTML;
    let aval2 = document.getElementById('id--simg2-alpha').innerHTML;

    let isalpha = document.getElementById('id--aslider-checkbox');
    let bmax = document.getElementById('id--bwh-max');

    isalpha.disabled = true;
    bmax.disabled = true;

    let c1 = document.getElementById("id--blended-canvas");
    let c2 = document.getElementById("id--hidden-canvas");

    let img1 = document.getElementById("id--image1");
    let img2 = document.getElementById("id--image2");

    setCanvasHeightWidth(c1, c2, img1, img2, bmax);

    let ctx1 = c1.getContext("2d");
    let ctx2 = c2.getContext("2d");

    ctx1.drawImage(img1, 0, 0);
    ctx2.drawImage(img2, 0, 0);

    let imgData1 = ctx1.getImageData(0, 0, c1.width, c1.height);
    let imgData2 = ctx2.getImageData(0, 0, c2.width, c2.height);

    let i;
    for (i = 0; i < imgData1.data.length; i += 4) {
        imgData1.data[i]   = imgData1.data[i]*rval1 + imgData2.data[i]*rval2;
        imgData1.data[i+1] = imgData1.data[i]*gval1 + imgData2.data[i+1]*gval2;
        imgData1.data[i+2] = imgData1.data[i]*bval1 + imgData2.data[i+2]*bval2;

        if (isalpha.checked) {
            imgData1.data[i+3] = imgData1.data[i]*aval1 + imgData2.data[i+2]*aval2;
        } else {
            imgData1.data[i+3] = 255;
        }
    }
    ctx1.putImageData(imgData1, 0, 0);

    isalpha.disabled = false;
    bmax.disabled = false;
}

function setCanvasHeightWidth(c1, c2, img1, img2, bmax) {
    if (bmax.checked) {
        c1.width = Math.max(img2.naturalWidth, img1.naturalWidth)
        c2.width = Math.max(img2.naturalWidth, img1.naturalWidth)
        c1.height = Math.max(img2.naturalHeight, img1.naturalHeight)
        c2.height = Math.max(img2.naturalHeight, img1.naturalHeight)
    } else {
        c1.width = Math.min(img2.naturalWidth, img1.naturalWidth)
        c2.width = Math.min(img2.naturalWidth, img1.naturalWidth)
        c1.height = Math.min(img2.naturalHeight, img1.naturalHeight)
        c2.height = Math.min(img2.naturalHeight, img1.naturalHeight)
    }
}

function create_dynamic_bar(bar_for, img_no) {
    bar_for = bar_for.toLowerCase();
    let template = `
        <div>
            <div class="margin--top-10"></div>
            <div class="columns margin--bottom-0">
                <div class="column is-12 slider-container">
                    <input id="id--slider${img_no}-${bar_for}" type="range" min="0" max="100" value="50" class="slider slider--${bar_for}">
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
            let img_no = input.id[input.id.length-1];
            $('#id--image'+img_no).attr('src', e.target.result);
            document.getElementById('id--inplab-img'+img_no).innerHTML = input.files[0].name;
        }
        reader.readAsDataURL(input.files[0]);

    }
}
