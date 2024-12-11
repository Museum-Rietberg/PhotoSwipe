fetch("metadata-liebezumdetail.json")
  .then((response) => response.json())
  .then((data) => {

    // sort images by "Urheber_innen[0].Urheber", put "Urheber*in unbekannt" second to last, empty values at end
    data = data.sort((a, b) => {
      if (!a.Urheber_innen || a.Urheber_innen.length === 0) {
      return 1;
      }
      if (!b.Urheber_innen || b.Urheber_innen.length === 0) {
      return -1;
      }
      if (a.Urheber_innen[0].Urheber === "Urheber*in unbekannt") {
      return 1;
      }
      if (b.Urheber_innen[0].Urheber === "Urheber*in unbekannt") {
      return -1;
      }
      if (a.Urheber_innen[0].Urheber < b.Urheber_innen[0].Urheber) {
      return -1;
      }
      if (a.Urheber_innen[0].Urheber > b.Urheber_innen[0].Urheber) {
      return 1;
      }
      return 0;
    });


    const gallery = document.querySelector(".pswp-gallery");
    data.forEach((object) => {

      // execute only on objects with images
      if (!object.Digital_Assets || object.Digital_Assets.length === 0) {
        return;
      }

      const galleryEntry = document.createElement("a");
      galleryEntry.classList.add("pswp-gallery__item");
      const img = document.createElement("img");
            
      img.src = `photos/thumbs/${object.Digital_Assets[0].Dateiname}`;
      galleryEntry.href = `photos/${object.Digital_Assets[0].Dateiname}`;
      galleryEntry.appendChild(img);
      
      // generate caption
      const bildUnterschrift = document.createElement("figcaption");
      bildUnterschrift.classList.add("hidden-caption-content");

        // generate containers
      const infoLeft = document.createElement("div");
      infoLeft.classList.add("info-left");
      const infoRight = document.createElement("div");
      infoRight.classList.add("info-right");

      const rubrikLeft = document.createElement("h4")
      const contentLeft = document.createElement("h4");
      const rubrikRight = document.createElement("h4")
      const contentRight = document.createElement("h4");
      rubrikLeft.classList.add("info-rubrik");
      rubrikRight.classList.add("info-rubrik");

      const bildTitel = document.createElement("h3");

      galleryEntry.appendChild(bildUnterschrift);
      bildUnterschrift.appendChild(infoLeft);
      infoLeft.append(rubrikLeft, contentLeft);
      bildUnterschrift.appendChild(bildTitel);
      bildUnterschrift.appendChild(infoRight);
      infoRight.append(rubrikRight, contentRight);

        // fill containers with content
      rubrikLeft.innerHTML = "Datierung";
      contentLeft.innerHTML = object.Datierung[0].Datierung;
      bildTitel.textContent = object.Titel;
      rubrikRight.innerHTML = "Urheber*in";
      contentRight.innerHTML = object.Urheber_innen[0].Urheber;      

      // get original image dimensions
      const image = new Image();
      image.onload = function() {
        galleryEntry.setAttribute("data-pswp-width", this.width);
        galleryEntry.setAttribute("data-pswp-height", this.height);
      };
      image.src = galleryEntry.href;
      gallery.appendChild(galleryEntry);
    });
  });