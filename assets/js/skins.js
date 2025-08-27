fetch('/myucchii.io/data/skins.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("skins-container");

    data.forEach((skin, idx) => {
      const card = document.createElement("div");
      card.className = "skin-card";

      const swiperId = `swiper-${idx}`;
      card.innerHTML = `
  <div class="skin-images swiper" id="${swiperId}">
    <div class="swiper-wrapper">
      ${skin.images.map(img => `
        <div class="swiper-slide">
          <img src="${img}" alt="${skin.name}">
        </div>
      `).join("")}
    </div>

    <!-- Controles agrupados abajo -->
    <div class="swiper-controls-inside">
      <div class="swiper-button-prev swiper-button-white"></div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next swiper-button-white"></div>
    </div>
  </div>

  <div class="skin-content">
    <div class="skin-info">
      <h2 class="skin-name">${skin.name}</h2>
      <p class="skin-date">Usage from ${skin.period}</p>
    </div>
    <a class="skin-download" href="${skin.download}" download>Download</a>
  </div>
`;

      container.appendChild(card);

      new Swiper(`#${swiperId}`, {
        direction: 'vertical',
        loop: true,
        pagination: {
          el: `#${swiperId} .swiper-pagination`,
          clickable: true,
        },
        navigation: {
          nextEl: `#${swiperId} .swiper-button-next`,
          prevEl: `#${swiperId} .swiper-button-prev`,
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        }
      });
    });
  })
  .catch(err => {
    console.error("Error cargando las skins:", err);
  });
