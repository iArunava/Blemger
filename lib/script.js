const ALPHA = 'Alpha';
const RINTENSITY = 'Intensity of Red';
const BINTENSITY = 'Intensity of Blue';
const GINTENSITY = 'Intensity of Green';

$(document).ready(() => {
    set_bars();
});

function set_bars() {
    let img1b = $('#id--image1-bar');
    let img2b = $('#id--image2-bar');

    img1b.append(create_dynamic_bar(RINTENSITY));
    img1b.append(create_dynamic_bar(GINTENSITY));
    img1b.append(create_dynamic_bar(BINTENSITY));
    img1b.append(create_dynamic_bar(ALPHA));

    img2b.append(create_dynamic_bar(RINTENSITY));
    img2b.append(create_dynamic_bar(GINTENSITY));
    img2b.append(create_dynamic_bar(BINTENSITY));
    img2b.append(create_dynamic_bar(ALPHA));
}

function create_dynamic_bar(bar_for) {
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
