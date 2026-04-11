(function () {
  const familyKey = document.querySelector("main").dataset.family;
  const familyData = FLOWER_DATA[familyKey];
  if (!familyData) return;

  const flowers = familyData.flowers;
  let currentIndex = 0;

  const nameEl = document.getElementById("flower-name");
  const descEl = document.getElementById("flower-desc");
  const originEl = document.getElementById("flower-origin");
  const imageEl = document.getElementById("flower-image");
  const selectorEl = document.getElementById("flowerSelector");
  const previewNameEl = document.getElementById("preview-name");
  const previewDescEl = document.getElementById("preview-desc");
  const nextBtn = document.getElementById("nextFlowerBtn");

  // Build selector list
  flowers.forEach(function (flower, i) {
    const li = document.createElement("li");
    li.className = "flower-selector-item" + (i === 0 ? " active" : "");
    li.textContent = flower.name;
    li.dataset.index = i;
    li.setAttribute("tabindex", "0");
    li.setAttribute("role", "button");
    li.addEventListener("click", function () {
      switchFlower(parseInt(this.dataset.index));
    });
    li.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        switchFlower(parseInt(this.dataset.index));
      }
    });
    selectorEl.appendChild(li);
  });

  // Next button
  nextBtn.addEventListener("click", function () {
    switchFlower((currentIndex + 1) % flowers.length);
  });

  // Preload images
  flowers.forEach(function (flower) {
    const img = new Image();
    img.src = flower.image;
  });

  function switchFlower(index) {
    if (index === currentIndex) return;
    currentIndex = index;

    const centerEl = document.querySelector(".flower-detail-center");
    const entryEl = document.querySelector(".flower-entry");

    centerEl.classList.add("fade-out");
    entryEl.classList.add("fade-out");

    setTimeout(function () {
      const flower = flowers[index];

      nameEl.textContent = flower.name;
      descEl.textContent = flower.description;
      originEl.textContent = flower.origin;
      imageEl.src = flower.image;
      imageEl.alt = flower.name;

      // Update selector
      const items = selectorEl.querySelectorAll(".flower-selector-item");
      items.forEach(function (item) {
        item.classList.toggle("active", parseInt(item.dataset.index) === index);
      });

      // Update preview (next flower)
      const nextIndex = (index + 1) % flowers.length;
      const nextFlower = flowers[nextIndex];
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
  const familyOrder = ["rosaceae", "asteraceae", "lamiaceae", "liliaceae", "orchidaceae"];
  const currentFamilyIndex = familyOrder.indexOf(familyKey);
  const nextFamilyKey = familyOrder[(currentFamilyIndex + 1) % familyOrder.length];
  const nextSpeciesBtn = document.getElementById("nextSpeciesBtn");
  if (nextSpeciesBtn) {
    nextSpeciesBtn.href = nextFamilyKey + ".html";
  }
})();
