import '../vendor/nouislider/nouislider.js';

const MIN_ZOOM_SCALE = 25;
const MAX_ZOOM_SCALE = 100;
const STEP_ZOOM_SCALE = 25;
const DENOM_ZOOM_SCALE = 100;
const START_SCALE_VALUE = 100;

const imgUploadScaleElement = document.querySelector('.img-upload__scale');
const scaleControlValueElement = imgUploadScaleElement.querySelector('.scale__control--value');

const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');

const effectLevelElement = document.querySelector('.img-upload__effect-level');

const effectsListElement = document.querySelector('.effects__list');

const sliderElement = document.querySelector('.effect-level__slider');

const effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');

const effects = {
  none: {
    value: 'none',
    id: 'effect-none',
    filter: 'none',
  },
  chrome: {
    value: 'chrome',
    id: 'effect-chrome',
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  sepia: {
    value: 'sepia',
    id: 'effect-sepia',
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
  },
  marvin: {
    value: 'marvin',
    id: 'effect-marvin',
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
  },
  phobos: {
    value: 'phobos',
    id: 'effect-phobos',
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
  },
  heat: {
    value: 'heat',
    id: 'effect-heat',
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
  },
};

let scaleValue = parseInt(scaleControlValueElement.value, 10);

imgUploadScaleElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('scale__control--smaller')) {
    scaleValue = Math.max(scaleValue - STEP_ZOOM_SCALE, MIN_ZOOM_SCALE);
  }
  if (evt.target.classList.contains('scale__control--bigger')) {
    scaleValue = Math.min(scaleValue + STEP_ZOOM_SCALE, MAX_ZOOM_SCALE);
  }
  imgUploadPreviewElement.style.transform = `scale(${scaleValue / DENOM_ZOOM_SCALE})`;
  scaleControlValueElement.value = `${scaleValue}%`;
});

const addSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

effectsListElement.addEventListener('change', (evt) => {
  evt.stopPropagation();

  if (evt.target.value === 'none') {
    effectLevelElement.classList.add('hidden');
    imgUploadPreviewElement.style.filter = '';
  } else {
    effectLevelElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effects[evt.target.value].min,
        max: effects[evt.target.value].max,
      },
      start: effects[evt.target.value].start,
      step: effects[evt.target.value].step,
    });

    sliderElement.noUiSlider.on('update', () => {
      effectLevelValueElement.value = sliderElement.noUiSlider.get();

      const effectValue = effects[evt.target.value].filter;
      const unit = effects[evt.target.value].unit;

      imgUploadPreviewElement.style.filter = `${effectValue}(${effectLevelValueElement.value}${unit})`;
    });
  }
});

const addImgRedactor = () => {
  addSlider();
  effectLevelElement.classList.add('hidden');
};

const resetImgRedactor = () => {
  sliderElement.noUiSlider.reset();
  scaleValue = START_SCALE_VALUE;
  imgUploadPreviewElement.style.transform = `scale(${scaleValue / DENOM_ZOOM_SCALE})`;
  effectLevelElement.classList.add('hidden');
  imgUploadPreviewElement.style.filter = '';
};

export { addImgRedactor, resetImgRedactor };

