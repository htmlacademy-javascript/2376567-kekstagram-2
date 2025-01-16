import '../vendor/nouislider/nouislider.js';

const ScaleSettings = {
  MIN_ZOOM: 25,
  MAX_ZOOM: 100,
  STEP_ZOOM: 25,
  DENOM_ZOOM: 100,
  START_VALUE: 100,
};

const Effects = {
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

const imgUploadScaleElement = document.querySelector('.img-upload__scale');
const scaleControlValueElement = imgUploadScaleElement.querySelector('.scale__control--value');

const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');

const effectLevelElement = document.querySelector('.img-upload__effect-level');

const effectsListElement = document.querySelector('.effects__list');

const sliderElement = document.querySelector('.effect-level__slider');

const effectLevelValueElement = effectLevelElement.querySelector('.effect-level__value');

let scaleValue = parseInt(scaleControlValueElement.value, 10);

imgUploadScaleElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('scale__control--smaller')) {
    scaleValue = Math.max(scaleValue - ScaleSettings.STEP_ZOOM, ScaleSettings.MIN_ZOOM);
  }
  if (evt.target.classList.contains('scale__control--bigger')) {
    scaleValue = Math.min(scaleValue + ScaleSettings.STEP_ZOOM, ScaleSettings.MAX_ZOOM);
  }
  imgUploadPreviewElement.style.transform = `scale(${scaleValue / ScaleSettings.DENOM_ZOOM})`;
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
        min: Effects[evt.target.value].min,
        max: Effects[evt.target.value].max,
      },
      start: Effects[evt.target.value].start,
      step: Effects[evt.target.value].step,
    });

    sliderElement.noUiSlider.on('update', () => {
      effectLevelValueElement.value = sliderElement.noUiSlider.get();

      const effectValue = Effects[evt.target.value].filter;
      const unit = Effects[evt.target.value].unit;

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
  scaleValue = ScaleSettings.START_VALUE;
  imgUploadPreviewElement.style.transform = `scale(${scaleValue / ScaleSettings.DENOM_ZOOM})`;
  effectLevelElement.classList.add('hidden');
  imgUploadPreviewElement.style.filter = '';
};

export { addImgRedactor, resetImgRedactor };

