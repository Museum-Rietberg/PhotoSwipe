import PhotoSwipeLightbox from "./photoswipe/photoswipe-lightbox.esm.js";

// define custom icons
const leftArrowSVGString = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="pswp__icn" viewBox="0 0 48 48" width="48" height="48" fill="none"><g clip-path="url(#a)"><path stroke="#F5F5F5" fill="none" stroke-width="3" d="M29.314 12.815 18 24.128l11.314 11.314"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h48v48H0z"/></clipPath></defs></svg>'
const closeSVGString = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="pswp__icn" viewBox="0 0 48 48" width="48" height="48" fill="none"><g clip-path="url(#a)"><path stroke="#F5F5F5" stroke-width="3" d="M35.44 12.814 24.128 24.127M12.813 35.441l11.314-11.314m0 0 11.314 11.314M24.127 24.127 12.813 12.814"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h48v48H0z"/></clipPath></defs></svg>'

const lightbox = new PhotoSwipeLightbox({
  // set gallery-selector"
  gallery: "#gallery",

  // Elements within gallery (slides)
  children: "a",

  //animation
  showHideAnimationType: 'zoom',

  // hiding zoom-button
  zoom: false,

  // close full screen when click/tap outside of image
  bgClickAction: 'close',
  tapAction: 'close',

  // implement custom icons
  arrowPrevSVG: leftArrowSVGString,
  arrowNextSVG: leftArrowSVGString,
  closeSVG: closeSVGString,
  
  // setup PhotoSwipe Core dynamic import
  pswpModule: () => import("./photoswipe/photoswipe.esm.js"), 
  
  // adjust full screen padding
  padding: { top: 16, bottom: 144, left: 80, right: 80 }
});

// caption
lightbox.on('uiRegister', function () {
  lightbox.pswp.ui.registerElement({
    name: 'custom-caption',
    order: 9,
    isButton: false,
    appendTo: 'root',
    html: 'Caption text',
    onInit: (el, pswp) => {
      lightbox.pswp.on('change', () => {
        const currSlideElement = lightbox.pswp.currSlide.data.element;
        let captionHTML = '';
        if (currSlideElement) {
          const hiddenCaption = currSlideElement.querySelector('.hidden-caption-content');
          if (hiddenCaption) {
            // get caption from element with class hidden-caption-content
            captionHTML = hiddenCaption.innerHTML;
          } else {
            // get caption from alt attribute
            captionHTML = currSlideElement.querySelector('img').getAttribute('alt');
          }
        }
        el.innerHTML = captionHTML || '';
      });
    }
  });
});
lightbox.init();