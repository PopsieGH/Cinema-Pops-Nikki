// Initial Movie Catalog (From User Images)
const initialMovies = [
  {
    id: 1,
    title: "Parasite",
    type: "Película",
    genre: "Suspenso / Drama",
    rating: "5",
    poster: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTNEYLWFhZTEtY2LWE5MS11Yzg0XkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
    notes: "Obra maestra del cine coreano. Un retrato social fascinante."
  },
  {
    id: 2,
    title: "Goblin (The Lonely and Great God)",
    type: "K-Drama",
    genre: "Fantasía / Romance",
    rating: "5",
    poster: "https://m.media-amazon.com/images/M/MV5BMTk3M2I3Y2MtNWFlMi00Y2JkLWI3Y2ItYzA1YWI4M2FlNWUwXkEyXkFqcGdeQXVyMzE4MDkyNTA@._V1_.jpg",
    notes: "Un clásico imprescindible. Gran banda sonora y química entre personajes."
  },
  {
    id: 3,
    title: "Sabuesos (Bloodhounds)",
    type: "K-Drama",
    genre: "Acción / Drama",
    rating: "5",
    poster: "https://m.media-amazon.com/images/M/MV5BNDcyM2I1MDQtNDM1OC00OWFhLThmOGUtZjY1N2I3NWIwZDdmXkEyXkFqcGdeQXVyMTMxNTM5OTI1._V1_.jpg",
    notes: "Excelente acción, peleas de boxeo y mucha adrenalina."
  },
  {
    id: 4,
    title: "Weightlifting Fairy Kim Bok-Joo",
    type: "K-Drama",
    genre: "Comedia / Romance",
    rating: "4",
    poster: "https://m.media-amazon.com/images/M/MV5BZDg3M2YwMjEtYmE1YS00YzgzLTlhYzMtNGE1YzA1NDFhOWRlXkEyXkFqcGdeQXVyMzE4MDkyNTA@._V1_.jpg",
    notes: "Muy divertida y tierna. Ideal para pasar el rato."
  },
  {
    id: 5,
    title: "Propuesta Laboral (Business Proposal)",
    type: "K-Drama",
    genre: "Comedia Romántica",
    rating: "5",
    poster: "https://m.media-amazon.com/images/M/MV5BYzA2N2NmYTItNWY4Ny00ZGY1LWE3M2EtMDM3YTBhNWNmYWRlXkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_.jpg",
    notes: "Súper entretenida y ligera, los personajes son geniales."
  },
  {
    id: 6,
    title: "When I Fly Towards You",
    type: "K-Drama",
    genre: "Romance Juvenil",
    rating: "4",
    poster: "https://m.media-amazon.com/images/M/MV5BMjA1YThkNDgtZDliNC00Yzk4LWIxYWEtZTNmNGEyMGFkYzExXkEyXkFqcGdeQXVyMTE0MzQwMjgz._V1_.jpg",
    notes: "Drama muy dulce y lleno de momentos bonitos de la etapa escolar."
  },
  {
    id: 7,
    title: "Si la vida te da mandarinas...",
    type: "K-Drama",
    genre: "Drama / Romance",
    rating: "5",
    poster: "https://m.media-amazon.com/images/M/MV5BMWRlOGI3NWQtMDM1ZS00YzA4LTg3MDUtZTM3Y2IxZjg0OTM4XkEyXkFqcGdeQXVyMTE0MzQwMjgz._V1_.jpg",
    notes: "Protagonizada por IU y Park Bo-gum en la isla de Jeju."
  },
  {
    id: 8,
    title: "¿Qué le pasa a la secretaria Kim?",
    type: "K-Drama",
    genre: "Comedia Romántica",
    rating: "5",
    poster: "https://m.media-amazon.com/images/M/MV5BN2E0YWRlMTYtOTY5My00NGFiLTgyOTMtY2Q2MGI0ZTVlOTRjXkEyXkFqcGdeQXVyMzE4MDkyNTA@._V1_.jpg",
    notes: "Divertida y con excelente química entre Park Seo-joon y Park Min-young."
  },
  {
    id: 9,
    title: "Woo, una abogada extraordinaria",
    type: "K-Drama",
    genre: "Drama / Legal",
    rating: "5",
    poster: "https://m.media-amazon.com/images/M/MV5BYzJkMWI2NWItMzg1MC00M2VkLTk3N2UtOWI4MjM5M2E4YTBkXkEyXkFqcGdeQXVyMTMzNDExOTE5._V1_.jpg",
    notes: "Inspiradora, conmovedora y llena de aprendizajes."
  }
];

// Load from LocalStorage or use Default
let movies = JSON.parse(localStorage.getItem('cineshare_movies')) || initialMovies;
let currentFilter = 'all';
let currentGenreFilter = 'all';
let selectedPosterData = '';
const movieCards = new Map();
let activeCustomMenu = null;
const genreSuggestions = [
  'Terror',
  'Animación',
  'Romance',
  'Aventura',
  'Fantasía',
  'Comedia',
  'Drama',
  'Acción',
  'Suspenso',
  'Ciencia ficción'
];

const popularGenres = {
  terror: ['terror', 'horror'],
  animacion: ['animacion', 'anime'],
  romance: ['romance'],
  aventura: ['aventura', 'adventure']
};

function normalizeText(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeCustomSelects();
  initializeGenrePickers();
  renderMovies();
});

function closeCustomMenu() {
  if (!activeCustomMenu) return;
  activeCustomMenu.menu.hidden = true;
  activeCustomMenu.trigger.setAttribute('aria-expanded', 'false');
  activeCustomMenu = null;
}

function showCustomMenu(menu, trigger, selectedOption) {
  if (activeCustomMenu && activeCustomMenu.menu !== menu) closeCustomMenu();
  menu.hidden = false;
  trigger.setAttribute('aria-expanded', 'true');
  activeCustomMenu = { menu, trigger };
  if (selectedOption) selectedOption.focus();
}

function updateCustomSelect(select) {
  const control = select.customControl;
  if (!control) return;

  const selected = select.options[select.selectedIndex];
  control.trigger.textContent = selected ? selected.textContent : '';
  control.options.forEach(optionButton => {
    const active = optionButton.dataset.value === select.value;
    optionButton.setAttribute('aria-selected', String(active));
    optionButton.classList.toggle('selected', active);
  });
}

function initializeCustomSelects() {
  document.querySelectorAll('#movie-form select, #edit-form select').forEach(select => {
    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select';
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);
    select.classList.add('custom-select-native');
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');

    const trigger = document.createElement('button');
    trigger.className = 'custom-select-trigger';
    trigger.type = 'button';
    trigger.id = `${select.id}-trigger`;
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', `${select.id}-options`);
    trigger.setAttribute('aria-label', select.labels[0]?.textContent || select.id);

    const menu = document.createElement('div');
    menu.className = 'custom-select-menu';
    menu.id = `${select.id}-options`;
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', select.labels[0]?.textContent || select.id);
    menu.hidden = true;

    const options = [...select.options].map((option, index) => {
      const optionButton = document.createElement('button');
      optionButton.className = 'custom-select-option';
      optionButton.type = 'button';
      optionButton.dataset.value = option.value;
      optionButton.setAttribute('role', 'option');
      optionButton.id = `${select.id}-option-${index}`;
      optionButton.textContent = option.textContent;
      optionButton.addEventListener('click', () => {
        select.value = option.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        updateCustomSelect(select);
        closeCustomMenu();
        trigger.focus();
      });
      optionButton.addEventListener('keydown', event => {
        const optionIndex = options.indexOf(optionButton);
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          const direction = event.key === 'ArrowDown' ? 1 : -1;
          options[(optionIndex + direction + options.length) % options.length].focus();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          closeCustomMenu();
          trigger.focus();
        } else if (event.key === 'Tab') {
          closeCustomMenu();
        }
      });
      menu.appendChild(optionButton);
      return optionButton;
    });

    trigger.addEventListener('click', () => {
      if (menu.hidden) {
        const selected = options.find(option => option.dataset.value === select.value) || options[0];
        showCustomMenu(menu, trigger, selected);
      } else {
        closeCustomMenu();
      }
    });
    trigger.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const selected = options.find(option => option.dataset.value === select.value) || options[0];
        showCustomMenu(menu, trigger, selected);
      } else if (event.key === 'Escape') {
        closeCustomMenu();
      }
    });
    select.addEventListener('change', () => updateCustomSelect(select));
    wrapper.append(trigger, menu);
    select.customControl = { trigger, menu, options };
    updateCustomSelect(select);
  });

  document.addEventListener('click', event => {
    if (activeCustomMenu && !activeCustomMenu.menu.parentElement.contains(event.target)) {
      closeCustomMenu();
    }
  });
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('reset', () => {
      window.setTimeout(() => {
        form.querySelectorAll('select').forEach(updateCustomSelect);
      });
    });
  });
}

function initializeGenrePickers() {
  document.querySelectorAll('#genre, #edit-genre').forEach(input => {
    const wrapper = document.createElement('div');
    wrapper.className = 'genre-picker';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);

    const menu = document.createElement('div');
    menu.className = 'genre-suggestions';
    menu.id = `${input.id}-suggestions`;
    menu.setAttribute('role', 'listbox');
    menu.hidden = true;
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-controls', menu.id);
    input.setAttribute('aria-expanded', 'false');

    let activeIndex = -1;
    const hide = () => {
      menu.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      activeIndex = -1;
    };
    const choose = value => {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      hide();
    };
    const show = () => {
      if (activeCustomMenu) closeCustomMenu();
      const query = normalizeText(input.value.trim());
      const matches = genreSuggestions.filter(genre => normalizeText(genre).includes(query));
      menu.replaceChildren();
      matches.forEach((genre, index) => {
        const option = document.createElement('button');
        option.className = 'genre-suggestion';
        option.type = 'button';
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', 'false');
        option.textContent = genre;
        option.addEventListener('mousedown', event => event.preventDefault());
        option.addEventListener('click', () => choose(genre));
        menu.appendChild(option);
        if (index === activeIndex) option.classList.add('active');
      });
      menu.hidden = matches.length === 0;
      input.setAttribute('aria-expanded', String(!menu.hidden));
    };

    input.addEventListener('focus', show);
    input.addEventListener('input', () => {
      activeIndex = -1;
      show();
    });
    input.addEventListener('keydown', event => {
      const options = [...menu.querySelectorAll('.genre-suggestion')];
      if (event.key === 'ArrowDown' && options.length) {
        event.preventDefault();
        activeIndex = (activeIndex + 1) % options.length;
        options.forEach((option, index) => {
          option.classList.toggle('active', index === activeIndex);
          option.setAttribute('aria-selected', String(index === activeIndex));
        });
      } else if (event.key === 'ArrowUp' && options.length) {
        event.preventDefault();
        activeIndex = (activeIndex - 1 + options.length) % options.length;
        options.forEach((option, index) => {
          option.classList.toggle('active', index === activeIndex);
          option.setAttribute('aria-selected', String(index === activeIndex));
        });
      } else if (event.key === 'Enter' && activeIndex >= 0) {
        event.preventDefault();
        choose(options[activeIndex].textContent);
      } else if (event.key === 'Escape') {
        hide();
      }
    });
    input.addEventListener('blur', () => window.setTimeout(hide, 120));
    wrapper.appendChild(menu);
  });
}

// Profile Switcher (Chico -> Rústico/Oscuro, Chica -> Morado Pastel)
function switchProfile(profile) {
  document.documentElement.setAttribute('data-profile', profile);
  
  document.getElementById('btn-chico').classList.toggle('active', profile === 'chico');
  document.getElementById('btn-chica').classList.toggle('active', profile === 'chica');
}

function toggleAddForm() {
  const panel = document.getElementById('add-form-panel');
  const button = document.getElementById('toggle-add-form');
  const collapsed = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!collapsed));
  button.setAttribute('aria-label', collapsed ? 'Mostrar formulario para añadir título' : 'Ocultar formulario para añadir título');
  document.getElementById('add-form-toggle-label').textContent = collapsed ? 'Mostrar' : 'Ocultar';
  panel.classList.toggle('is-collapsed', collapsed);
  panel.toggleAttribute('inert', collapsed);
}

// Render Movies Grid
function renderMovies() {
  const grid = document.getElementById('movies-grid');
  const searchVal = normalizeText(document.getElementById('search-input').value);
  const genreKeywords = popularGenres[currentGenreFilter] || [];
  const knownGenres = Object.values(popularGenres).flat();
  const newCards = [];
  let visibleCount = 0;

  movies.forEach(movie => {
    let card = movieCards.get(movie.id);
    if (!card) {
      card = createMovieCard(movie);
      movieCards.set(movie.id, card);
      newCards.push(card);
    }

    updateMovieCard(card, movie);
    const genre = normalizeText(movie.genre || '');
    const matchesCategory = currentFilter === 'all' || movie.type === currentFilter;
    const matchesSearch = normalizeText(movie.title).includes(searchVal) || genre.includes(searchVal);
    const matchesGenre = currentGenreFilter === 'all'
      || (currentGenreFilter === 'otros'
        ? !knownGenres.some(keyword => genre.includes(keyword))
        : genreKeywords.some(keyword => genre.includes(keyword)));
    card.hidden = !(matchesCategory && matchesGenre && matchesSearch);
    if (!card.hidden) visibleCount++;
  });

  newCards.reverse().forEach(card => grid.prepend(card));
  let emptyState = grid.querySelector('.empty-state');
  if (!emptyState) {
    emptyState = document.createElement('p');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'No se encontraron títulos.';
    grid.appendChild(emptyState);
  }
  emptyState.hidden = visibleCount > 0;
}

function createMovieCard(movie) {
  const card = document.createElement('article');
  card.className = 'movie-card';

  const posterContainer = document.createElement('div');
  posterContainer.className = 'poster-container';
  const poster = document.createElement('img');
  poster.className = 'poster-img';
  poster.loading = 'lazy';
  poster.decoding = 'async';
  poster.fetchPriority = 'low';
  poster.addEventListener('error', () => {
    poster.hidden = true;
    posterContainer.querySelector('.poster-fallback').hidden = false;
  });
  const posterFallback = document.createElement('div');
  posterFallback.className = 'poster-fallback';
  posterFallback.textContent = '🎬';
  posterFallback.hidden = true;

  const badge = document.createElement('span');
  badge.className = 'badge';
  const editButton = document.createElement('button');
  editButton.className = 'edit-btn';
  editButton.type = 'button';
  editButton.title = 'Editar título';
  editButton.addEventListener('click', () => openEditDialog(movie.id));

  posterContainer.append(poster, posterFallback, badge, editButton);

  const info = document.createElement('div');
  info.className = 'movie-info';
  const title = document.createElement('h3');
  title.className = 'movie-title';
  const genre = document.createElement('p');
  genre.className = 'movie-genre';
  const rating = document.createElement('div');
  rating.className = 'movie-rating';
  const status = document.createElement('span');
  status.className = 'movie-status';
  const notes = document.createElement('p');
  notes.className = 'movie-notes';
  const addedBy = document.createElement('p');
  addedBy.className = 'movie-added-by';
  info.append(title, genre, rating, status, notes, addedBy);
  card.append(posterContainer, info);

  card.poster = poster;
  card.posterFallback = posterFallback;
  card.posterContainer = posterContainer;
  card.badge = badge;
  card.editButton = editButton;
  card.titleElement = title;
  card.genreElement = genre;
  card.ratingElement = rating;
  card.statusElement = status;
  card.notesElement = notes;
  card.addedByElement = addedBy;
  updateMovieCard(card, movie);
  return card;
}

function updateMovieCard(card, movie) {
  const posterSource = movie.poster || '';
  if (card.poster.dataset.source !== posterSource) {
    card.poster.dataset.source = posterSource;
    card.poster.hidden = !posterSource;
    card.posterFallback.hidden = Boolean(posterSource);
    if (posterSource) {
      card.poster.src = posterSource;
    } else {
      card.poster.removeAttribute('src');
    }
  }

  card.poster.alt = movie.title;
  card.badge.textContent = movie.type;
  card.editButton.setAttribute('aria-label', `Editar ${movie.title}`);
  card.titleElement.textContent = movie.title;
  card.genreElement.textContent = movie.genre || 'Sin género';
  card.ratingElement.textContent = '⭐'.repeat(parseInt(movie.rating, 10) || 0);
  card.statusElement.dataset.status = movie.status || 'Pendiente';
  card.statusElement.textContent = movie.status === 'Visto' ? '✓ Visto' : movie.status || 'Por ver';
  card.notesElement.textContent = movie.notes ? `"${movie.notes}"` : '';
  card.notesElement.hidden = !movie.notes;
  card.addedByElement.textContent = `Añadido por ${movie.addedBy || 'perfil no registrado'}`;
}

function resizePosterFile(file) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selecciona un archivo de imagen válido.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('No se pudo cargar el archivo. Prueba de nuevo.'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('No se pudo leer la imagen. Prueba con otro archivo.'));
      image.onload = () => {
        try {
          const maxSize = 700;
          const scale = Math.min(1, maxSize / Math.max(image.width, image.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(image.width * scale);
          canvas.height = Math.round(image.height * scale);
          const context = canvas.getContext('2d');
          if (!context) throw new Error('No se pudo procesar la imagen.');
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        } catch (error) {
          reject(error);
        }
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function handlePosterUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const message = document.getElementById('poster-upload-message');
  resizePosterFile(file).then(posterData => {
      selectedPosterData = posterData;
      document.getElementById('poster').value = '';
      document.getElementById('poster-preview-image').src = selectedPosterData;
      document.getElementById('poster-file-name').textContent = file.name;
      document.getElementById('poster-preview').hidden = false;
      message.textContent = 'Carátula lista. Se mostrará adaptada al recuadro cuadrado.';
  }).catch(error => {
      message.textContent = error.message;
      event.target.value = '';
  });
}

function clearPosterFile() {
  selectedPosterData = '';
  const fileInput = document.getElementById('poster-file');
  const preview = document.getElementById('poster-preview');
  const message = document.getElementById('poster-upload-message');
  if (fileInput) fileInput.value = '';
  if (preview) preview.hidden = true;
  if (message) message.textContent = 'La imagen se ajustará a la cuadrícula.';
}

let editingMovieId = null;
let editOriginalPoster = '';
let editSelectedPosterData = '';
let editPosterRemoved = false;

function openEditDialog(id) {
  const movie = movies.find(item => item.id === id);
  if (!movie) return;

  editingMovieId = id;
  editOriginalPoster = movie.poster || '';
  editSelectedPosterData = '';
  editPosterRemoved = false;
  document.getElementById('edit-title').value = movie.title;
  document.getElementById('edit-type').value = movie.type;
  document.getElementById('edit-genre').value = movie.genre || '';
  document.getElementById('edit-rating').value = movie.rating || '5';
  document.getElementById('edit-status').value = movie.status || 'Pendiente';
  ['edit-type', 'edit-rating', 'edit-status'].forEach(id => {
    updateCustomSelect(document.getElementById(id));
  });
  document.getElementById('edit-notes').value = movie.notes || '';
  document.getElementById('edit-poster-url').value = editOriginalPoster.startsWith('data:')
    ? ''
    : editOriginalPoster;
  document.getElementById('edit-poster-file').value = '';
  setEditPosterPreview(editOriginalPoster, editOriginalPoster ? 'Carátula actual' : '');
  document.getElementById('edit-dialog').showModal();
  document.getElementById('edit-title').focus();
}

function setEditPosterPreview(src, label) {
  const preview = document.getElementById('edit-poster-preview');
  preview.hidden = !src;
  if (src) {
    document.getElementById('edit-poster-preview-image').src = src;
    document.getElementById('edit-poster-status').textContent = label;
  }
}

function handleEditPosterUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  resizePosterFile(file).then(posterData => {
    editSelectedPosterData = posterData;
    editPosterRemoved = false;
    document.getElementById('edit-poster-url').value = '';
    setEditPosterPreview(posterData, file.name);
  }).catch(error => {
    event.target.value = '';
    document.getElementById('edit-poster-status').textContent = error.message;
    setEditPosterPreview(editOriginalPoster, error.message);
  });
}

function clearEditPosterFile() {
  editSelectedPosterData = '';
  editPosterRemoved = false;
  document.getElementById('edit-poster-file').value = '';
  const posterUrl = document.getElementById('edit-poster-url').value.trim();
  setEditPosterPreview(posterUrl || editOriginalPoster, posterUrl ? 'Nueva carátula' : 'Carátula actual');
}

function removeEditPoster() {
  editSelectedPosterData = '';
  editPosterRemoved = true;
  editOriginalPoster = '';
  document.getElementById('edit-poster-file').value = '';
  document.getElementById('edit-poster-url').value = '';
  setEditPosterPreview('', '');
}

function updateMovie(event) {
  event.preventDefault();
  const movie = movies.find(item => item.id === editingMovieId);
  if (!movie) return;

  const posterUrl = document.getElementById('edit-poster-url').value.trim();
  movie.title = document.getElementById('edit-title').value.trim();
  movie.type = document.getElementById('edit-type').value;
  movie.genre = document.getElementById('edit-genre').value.trim();
  movie.rating = document.getElementById('edit-rating').value;
  movie.status = document.getElementById('edit-status').value;
  movie.notes = document.getElementById('edit-notes').value.trim();
  movie.poster = editSelectedPosterData || posterUrl || (editPosterRemoved ? '' : editOriginalPoster);
  closeEditDialog();
  saveAndRender();
}

function closeEditDialog() {
  document.getElementById('edit-dialog').close();
  editingMovieId = null;
}

function deleteEditingMovie() {
  const movie = movies.find(item => item.id === editingMovieId);
  if (!movie || !window.confirm(`¿Eliminar "${movie.title}" de la lista?`)) return;

  const id = editingMovieId;
  closeEditDialog();
  deleteMovie(id);
}

// Add Movie
function addMovie(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const type = document.getElementById('type').value;
  const genre = document.getElementById('genre').value;
  const rating = document.getElementById('rating').value;
  const status = document.getElementById('status').value;
  const poster = selectedPosterData || document.getElementById('poster').value;
  const notes = document.getElementById('notes').value;

  const newMovie = {
    id: Date.now(),
    title,
    type,
    genre,
    rating,
    status,
    poster,
    notes,
    addedBy: document.documentElement.dataset.profile === 'chica' ? 'Nikki' : 'Adriancin'
  };

  movies.unshift(newMovie);
  saveAndRender();
  document.getElementById('movie-form').reset();
  clearPosterFile();
}

// Delete Movie
function deleteMovie(id) {
  movies = movies.filter(m => m.id !== id);
  movieCards.get(id)?.remove();
  movieCards.delete(id);
  saveAndRender();
}

// Filter Options
function setFilter(filter) {
  currentFilter = filter;
  document.querySelectorAll('[data-category]').forEach(btn => {
    const active = btn.dataset.category === filter;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active);
  });
  renderMovies();
}

function setGenreFilter(filter) {
  currentGenreFilter = filter;
  document.querySelectorAll('[data-genre]').forEach(btn => {
    const active = btn.dataset.genre === filter;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active);
  });
  renderMovies();
}

function filterMovies() {
  renderMovies();
}

function saveAndRender() {
  localStorage.setItem('cineshare_movies', JSON.stringify(movies));
  renderMovies();
}
