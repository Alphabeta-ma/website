(() => {
  'use strict';

  const millisecondsPerDay = 86400000;

  const toDateInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const addDays = (value, days) => {
    const date = new Date(`${value}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() + days);
    return date.toISOString().slice(0, 10);
  };

  const initBooking = () => {
    const form = document.querySelector('#booking-form');
    if (!form) return;

    const startDate = form.querySelector('#start-date');
    const endDate = form.querySelector('#end-date');
    const carSelect = form.querySelector('#car-select');
    const message = document.querySelector('#form-message');
    const today = toDateInput(new Date());

    startDate.min = today;
    if (!startDate.value) startDate.value = addDays(today, 1);
    if (!endDate.value) endDate.value = addDays(today, 4);

    const updateReturnMinimum = () => {
      startDate.min = toDateInput(new Date());
      const departure = startDate.value || startDate.min;
      endDate.min = addDays(departure, 1);
      if (startDate.value && endDate.value && endDate.value < endDate.min) {
        endDate.value = endDate.min;
      }
    };

    const clearEstimate = () => {
      message.textContent = '';
      message.classList.remove('is-error');
    };

    updateReturnMinimum();
    startDate.addEventListener('input', updateReturnMinimum);
    form.addEventListener('input', clearEstimate);
    form.addEventListener('change', clearEstimate);
    form.addEventListener('invalid', clearEstimate, true);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      startDate.min = toDateInput(new Date());
      if (!form.reportValidity()) return;

      // Date inputs expose UTC timestamps, so clock changes cannot add a rental day.
      const days = (endDate.valueAsNumber - startDate.valueAsNumber) / millisecondsPerDay;
      const dailyPrice = Number(carSelect.selectedOptions[0]?.dataset.price);
      if (!Number.isInteger(days) || days < 1 || !Number.isFinite(dailyPrice) || dailyPrice <= 0) {
        message.textContent = 'Vérifiez les dates et le véhicule sélectionné.';
        message.classList.add('is-error');
        return;
      }

      const total = (days * dailyPrice).toLocaleString('fr-MA');
      message.classList.remove('is-error');
      message.textContent = `Estimation : ${days} jour${days > 1 ? 's' : ''} · ${total} DH. Tarif indicatif, sous réserve de disponibilité. Contactez notre équipe pour réserver.`;
    });
  };

  const initFleet = () => {
    const filters = document.querySelectorAll('.filter');
    const cards = document.querySelectorAll('.car-card');

    filters.forEach((filter) => {
      filter.addEventListener('click', () => {
        filters.forEach((button) => button.setAttribute('aria-pressed', String(button === filter)));
        cards.forEach((card) => {
          card.hidden = filter.dataset.filter !== 'all' && card.dataset.category !== filter.dataset.filter;
        });
      });
    });

    document.querySelectorAll('.favorite').forEach((button) => {
      button.addEventListener('click', () => {
        const liked = button.getAttribute('aria-pressed') !== 'true';
        button.setAttribute('aria-pressed', String(liked));
        button.textContent = liked ? '♥' : '♡';
      });
    });
  };

  const initNavigation = () => {
    const menuButton = document.querySelector('.menu-button');
    const navigation = document.querySelector('#main-nav');
    if (!menuButton || !navigation) return;

    navigation.classList.add('is-collapsible');
    menuButton.hidden = false;

    const closeMenu = () => {
      navigation.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
    navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuButton.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    window.matchMedia('(max-width: 760px)').addEventListener('change', closeMenu);
  };

  initBooking();
  initFleet();
  initNavigation();
})();
