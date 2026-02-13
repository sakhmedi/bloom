(function () {
  var familyKey = document.querySelector("main").dataset.family;
  var familyData = FLOWER_DATA[familyKey];
  if (!familyData) return;

  var flowers = familyData.flowers;
  var currentIndex = 0;

  var nameEl = document.getElementById("flower-name");
  var descEl = document.getElementById("flower-desc");
  var originEl = document.getElementById("flower-origin");
  var imageEl = document.getElementById("flower-image");
  var selectorEl = document.getElementById("flowerSelector");
  var previewNameEl = document.getElementById("preview-name");
  var previewDescEl = document.getElementById("preview-desc");
  var nextBtn = document.getElementById("nextFlowerBtn");

  // Build selector list
  flowers.forEach(function (flower, i) {
    var li = document.createElement("li");
    li.className = "flower-selector-item" + (i === 0 ? " active" : "");
    li.textContent = flower.name;
    li.dataset.index = i;
    li.addEventListener("click", function () {
      switchFlower(parseInt(this.dataset.index));
    });
    selectorEl.appendChild(li);
  });

  // Next button
  nextBtn.addEventListener("click", function () {
    switchFlower((currentIndex + 1) % flowers.length);
  });

  // Preload images
  flowers.forEach(function (flower) {
    var img = new Image();
    img.src = flower.image;
  });

  function switchFlower(index) {
    if (index === currentIndex) return;
    currentIndex = index;

    var centerEl = document.querySelector(".flower-detail-center");
    var entryEl = document.querySelector(".flower-entry");

    centerEl.classList.add("fade-out");
    entryEl.classList.add("fade-out");

    setTimeout(function () {
      var flower = flowers[index];

      nameEl.textContent = flower.name;
      descEl.textContent = flower.description;
      originEl.textContent = flower.origin;
      imageEl.src = flower.image;
      imageEl.alt = flower.name;

      // Update selector
      var items = selectorEl.querySelectorAll(".flower-selector-item");
      items.forEach(function (item) {
        item.classList.toggle("active", parseInt(item.dataset.index) === index);
      });

      // Update preview (next flower)
      var nextIndex = (index + 1) % flowers.length;
      var nextFlower = flowers[nextIndex];
      previewNameEl.textContent = nextFlower.name;
      previewDescEl.textContent = nextFlower.description;

      centerEl.classList.remove("fade-out");
      entryEl.classList.remove("fade-out");
    }, 250);
  }

  // Initialize preview with second flower
  if (flowers.length > 1) {
    previewNameEl.textContent = flowers[1].name;
    previewDescEl.textContent = flowers[1].description;
  }

  // Next species button
  var familyOrder = ["rosaceae", "asteraceae", "lamiaceae", "liliaceae", "orchidaceae"];
  var currentFamilyIndex = familyOrder.indexOf(familyKey);
  var nextFamilyKey = familyOrder[(currentFamilyIndex + 1) % familyOrder.length];
  var nextSpeciesBtn = document.getElementById("nextSpeciesBtn");
  if (nextSpeciesBtn) {
    nextSpeciesBtn.href = nextFamilyKey + ".html";
  }
})();
