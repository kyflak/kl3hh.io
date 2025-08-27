function renderAchievements(logros) {
    const container = document.getElementById('achievements-list');
    container.innerHTML = ''; 
  
    logros.forEach((logro, index) => {
      const achievementCard = document.createElement('div');
      achievementCard.className = 'achievement-card';
  
      let modeIconSrc = '';
      switch (logro.modo) {
        case 'mania':
          modeIconSrc = './assets/icons/mania.png';
          break;
        case 'taiko':
          modeIconSrc = './assets/icons/taiko.png';
          break;
        default:
          modeIconSrc = './assets/icons/mania.png'; 
          break;
      }
  
      achievementCard.innerHTML = `
        <div class="card-header">
          <div class="card-banner" style="background-image: url('${logro.imagen}')"></div>
          <div class="card-gradient"></div>
          <div class="card-content">
            <div class="tournament-info">
              <h3 class="tournament-name">${logro.torneo}</h3>
              <div class="tournament-position">${logro.puesto}</div>
            </div>
            <div class="tournament-meta">
              <div class="tournament-year">
                <img src="${modeIconSrc}" class="mode-icon" width="28" height="28" alt="${logro.modo}">
                <span>${logro.anio}</span>
              </div>
              <div class="tournament-mode">
                <span>${logro.modo.charAt(0).toUpperCase() + logro.modo.slice(1)}</span>
              </div>
            </div>
            <button class="btn-toggle">
              <span>More about</span>
               <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M1 1.5L6 6.5L11 1.5" stroke="#f5f5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
            </button>
          </div>
        </div>
        <div class="additional-info">
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">About:</span>
              <span class="info-value">${logro.descripcion}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Tournament type:</span>
              <span class="info-value">${logro.team ? 'Team' : 'Solo'}</span>
            </div>
            ${logro.team ? `
              <div class="info-item">
                <span class="info-label">Team:</span>
                <span class="info-value">${logro.equipo}</span>
              </div>` : ''}
          </div>
          <a href="${logro.enlace}" class="tournament-link" target="_blank">
            Tournament details
            <img src="./assets/icons/osu.svg" width="20" height="20" style="margin-left: 10px;" alt="Enlace">
          </a>
        </div>
      `;
  
      container.appendChild(achievementCard);
      achievementCard.style.animationDelay = `${index * 0.2 + 0.2}s`;
  
      const toggleBtn = achievementCard.querySelector('.btn-toggle');
      const additionalInfo = achievementCard.querySelector('.additional-info');
      const banner = achievementCard.querySelector('.card-banner');
  
      toggleBtn.addEventListener('click', () => {
        additionalInfo.classList.toggle('show');
        const isShown = additionalInfo.classList.contains('show');
  
        banner.style.filter = isShown ? 'grayscale(0%) brightness(100%)' : 'grayscale(100%) brightness(70%)';
        toggleBtn.innerHTML = isShown
        ? `<span>Less about</span>
           <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M1 6.5L6 1.5L11 6.5" stroke="#f5f5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>`
        : `<span>More about</span>
           <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M1 1.5L6 6.5L11 1.5" stroke="#f5f5f5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>`;
      });
    });
  }

  function observeAchievementCards() {
    const cards = document.querySelectorAll('.achievement-card');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });
  
    cards.forEach(card => observer.observe(card));
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    fetch('./data/logros.json')
      .then(response => response.json())
      .then(data => {
        renderAchievements(data.logros);
        observeAchievementCards(); 
      })
      .catch(error => {
        console.error('Error al cargar los logros:', error);
        const container = document.getElementById('achievements-list');
        container.innerHTML = '<p class="error">errsadasddsas.</p>';
      });
  });
  

  
