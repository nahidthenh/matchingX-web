// # Range SLider JS

const onInput = (parent, e) => {
    const slides = parent.querySelectorAll('input');
    const min = parseFloat(slides[0].min);
    const max = parseFloat(slides[0].max);

    let slide1 = parseFloat(slides[0].value);
    let slide2 = parseFloat(slides[1].value);

    const percentageMin = (slide1 / (max - min)) * 100;
    const percentageMax = (slide2 / (max - min)) * 100;

    parent.style.setProperty('--range-slider-value-low', percentageMin);
    parent.style.setProperty('--range-slider-value-high', percentageMax);

    if (slide1 > slide2) {
        const tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;

        if (e?.currentTarget === slides[0]) {
            slides[0].insertAdjacentElement('beforebegin', slides[1]);
        } else {
            slides[1].insertAdjacentElement('afterend', slides[0]);
        }
    }

    parent.querySelector('.range-slider__display').setAttribute('data-low', slide1);
    parent.querySelector('.range-slider__display').setAttribute('data-high', slide2);
}

addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.range-slider')
        .forEach(range => range.querySelectorAll('input')
            .forEach((input) => {
                if (input.type === 'range') {
                    input.oninput = (e) => onInput(range, e);
                    onInput(range);
                }
            }))
});


// SlickSLider for latest photos

$(document).ready(function () {
    $('.latest-slider').slick({
        dots: false,
        infinite: false,
        prevArrow: "<button type='button' class='slick-prev pull-left'><i class='ri-arrow-left-line' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><i class='ri-arrow-right-line' aria-hidden='true'></i></button>",
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 2501,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1399,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 5
                }
            }
            ,
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 5
                }
            }
        ]
    });
});


// SLick SLider for short
$(document).ready(function () {
    $('.short-slider-wrap').slick({
        dots: false,
        nextArrow: false,
        prevArrow: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
});

// Photo Uploader
// ----- On render -----
$(function () {

    $('#profile').addClass('dragging').removeClass('dragging');
});

$('#profile').on('dragover', function () {
    $('#profile').addClass('dragging')
}).on('dragleave', function () {
    $('#profile').removeClass('dragging')
}).on('drop', function (e) {
    $('#profile').removeClass('dragging hasImage');

    if (e.originalEvent) {
        var file = e.originalEvent.dataTransfer.files[0];
        console.log(file);

        var reader = new FileReader();

        //attach event handlers here...

        reader.readAsDataURL(file);
        reader.onload = function (e) {
            console.log(reader.result);
            $('#profile').css('background-image', 'url(' + reader.result + ')').addClass(
                'hasImage');

        }

    }
})
$('#profile').on('click', function (e) {
    console.log('clicked')
    $('#mediaFile').click();
});
window.addEventListener("dragover", function (e) {
    e = e || event;
    e.preventDefault();
}, false);
window.addEventListener("drop", function (e) {
    e = e || event;
    e.preventDefault();
}, false);
$('#mediaFile').change(function (e) {

    var input = e.target;
    if (input.files && input.files[0]) {
        var file = input.files[0];

        var reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = function (e) {
            console.log(reader.result);
            $('#profile').css('background-image', 'url(' + reader.result + ')').addClass(
                'hasImage');
        }
    }
})


// Image Uploader

function initImageUpload(box) {
    let uploadField = box.querySelector('.image-upload');

    uploadField.addEventListener('change', getFile);

    function getFile(e) {
        let file = e.currentTarget.files[0];
        checkType(file);
    }

    function previewImage(file) {
        let thumb = box.querySelector('.js--image-preview'),
            reader = new FileReader();

        reader.onload = function () {
            thumb.style.backgroundImage = 'url(' + reader.result + ')';
        }
        reader.readAsDataURL(file);
        thumb.className += ' js--no-default';
    }

    function checkType(file) {
        let imageType = /image.*/;
        if (!file.type.match(imageType)) {
            throw 'Datei ist kein Bild';
        } else if (!file) {
            throw 'Kein Bild gewählt';
        } else {
            previewImage(file);
        }
    }

}

// initialize box-scope
var boxes = document.querySelectorAll('.box');

for (let i = 0; i < boxes.length; i++) {
    let box = boxes[i];
    initDropEffect(box);
    initImageUpload(box);
}



/// drop-effect
function initDropEffect(box) {
    let area, drop, areaWidth, areaHeight, maxDistance, dropWidth, dropHeight, x, y;

    // get clickable area for drop effect
    area = box.querySelector('.js--image-preview');
    area.addEventListener('click', fireRipple);

    function fireRipple(e) {
        area = e.currentTarget
        // create drop
        if (!drop) {
            drop = document.createElement('span');
            drop.className = 'drop';
            this.appendChild(drop);
        }
        // reset animate class
        drop.className = 'drop';

        // calculate dimensions of area (longest side)
        areaWidth = getComputedStyle(this, null).getPropertyValue("width");
        areaHeight = getComputedStyle(this, null).getPropertyValue("height");
        maxDistance = Math.max(parseInt(areaWidth, 10), parseInt(areaHeight, 10));

        // set drop dimensions to fill area
        drop.style.width = maxDistance + 'px';
        drop.style.height = maxDistance + 'px';

        // calculate dimensions of drop
        dropWidth = getComputedStyle(this, null).getPropertyValue("width");
        dropHeight = getComputedStyle(this, null).getPropertyValue("height");

        // calculate relative coordinates of click
        // logic: click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center
        x = e.pageX - this.offsetLeft - (parseInt(dropWidth, 10) / 2);
        y = e.pageY - this.offsetTop - (parseInt(dropHeight, 10) / 2) - 30;

        // position drop and animate
        drop.style.top = y + 'px';
        drop.style.left = x + 'px';
        drop.className += ' animate';
        e.stopPropagation();

    }
}
