const { CONCERTS, TOUR_INFO, REGION_LABELS } = window.TOUR_DATA;

const TODAY = new Date("2026-08-06T12:00:00");

const dateFmt = new Intl.DateTimeFormat("es", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortDateFmt = new Intl.DateTimeFormat("es", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

let activeFilter = "all";
let activeRegion = "all";
let searchQuery = "";

function parseDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getShowStatus(concert) {
  const showDate = parseDate(concert.date);
  const todayStart = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
  const showStart = new Date(showDate.getFullYear(), showDate.getMonth(), showDate.getDate());

  if (showStart.getTime() === todayStart.getTime()) return "today";
  if (showStart < todayStart) return "past";
  return "upcoming";
}

function getUniqueSurpriseSongs() {
  const songs = new Set();
  CONCERTS.forEach((c) => {
    c.surpriseSongs?.forEach((s) => songs.add(s));
  });
  return songs;
}

function getStats() {
  const completed = CONCERTS.filter((c) => getShowStatus(c) === "past").length;
  const withSongs = CONCERTS.filter((c) => c.surpriseSongs?.length).length;
  const uniqueSongs = getUniqueSurpriseSongs().size;
  return { completed, withSongs, uniqueSongs, total: CONCERTS.length };
}

function filterConcerts() {
  return CONCERTS.filter((concert) => {
    const status = getShowStatus(concert);

    if (activeFilter === "past" && status !== "past") return false;
    if (activeFilter === "upcoming" && status !== "upcoming" && status !== "today") return false;
    if (activeFilter === "with-songs" && !concert.surpriseSongs?.length) return false;
    if (activeRegion !== "all" && concert.region !== activeRegion) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const haystack = [
        concert.city,
        concert.country,
        concert.venue,
        ...(concert.surpriseSongs ?? []),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

function statusBadge(status) {
  const labels = {
    past: "Realizado",
    today: "Hoy",
    upcoming: "Próximo",
  };
  return `<span class="badge badge--${status}">${labels[status]}</span>`;
}

function renderSongs(concert) {
  if (concert.surpriseSongs?.length) {
    const tags = concert.surpriseSongs
      .map((song) => `<span class="song-tag">${song}</span>`)
      .join("");
    const note = concert.note
      ? `<p class="concert-note">${concert.note}</p>`
      : "";
    return `<div class="songs">${tags}</div>${note}`;
  }

  const status = getShowStatus(concert);
  if (status === "upcoming" || status === "today") {
    return `<p class="songs-pending">🎵 Por confirmar — se revelan después de Dynamite</p>`;
  }
  return `<p class="songs-pending">Sin datos registrados</p>`;
}

function renderConcertCard(concert, index) {
  const status = getShowStatus(concert);
  const formattedDate = dateFmt.format(parseDate(concert.date));
  const showNumber = CONCERTS.indexOf(concert) + 1;

  return `
    <article class="concert-card" data-status="${status}" style="--delay: ${(index % 12) * 40}ms">
      <div class="concert-card__header">
        <span class="show-number">Show #${showNumber}</span>
        ${statusBadge(status)}
      </div>
      <time class="concert-date" datetime="${concert.date}">${formattedDate}</time>
      <h3 class="concert-city">${concert.city}</h3>
      <p class="concert-meta">${concert.venue} · ${concert.country}</p>
      <div class="concert-songs-section">
        <h4 class="songs-label">Canciones sorpresa</h4>
        ${renderSongs(concert)}
      </div>
    </article>
  `;
}

function renderStats() {
  const { completed, withSongs, uniqueSongs, total } = getStats();
  document.getElementById("stat-shows").textContent = total;
  document.getElementById("stat-completed").textContent = completed;
  document.getElementById("stat-songs-recorded").textContent = withSongs;
  document.getElementById("stat-unique-songs").textContent = uniqueSongs;
}

function renderSongIndex() {
  const songCounts = new Map();
  CONCERTS.forEach((c) => {
    c.surpriseSongs?.forEach((song) => {
      songCounts.set(song, (songCounts.get(song) || 0) + 1);
    });
  });

  const sorted = [...songCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const container = document.getElementById("song-index");

  container.innerHTML = sorted
    .map(
      ([song, count]) => `
      <button type="button" class="song-index-item" data-song="${song}">
        <span class="song-index-name">${song}</span>
        <span class="song-index-count">${count}×</span>
      </button>
    `
    )
    .join("");

  container.querySelectorAll(".song-index-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      searchQuery = btn.dataset.song;
      document.getElementById("search").value = searchQuery;
      activeFilter = "with-songs";
      document.querySelectorAll("[data-filter]").forEach((el) => {
        el.classList.toggle("active", el.dataset.filter === "with-songs");
      });
      render();
      document.getElementById("concerts").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function render() {
  const filtered = filterConcerts();
  const grid = document.getElementById("concert-grid");
  const countEl = document.getElementById("result-count");

  grid.innerHTML = filtered.map(renderConcertCard).join("");
  countEl.textContent = `${filtered.length} concierto${filtered.length !== 1 ? "s" : ""}`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <p>No hay conciertos que coincidan con tu búsqueda.</p>
        <button type="button" class="btn-reset" id="reset-filters">Limpiar filtros</button>
      </div>
    `;
    document.getElementById("reset-filters")?.addEventListener("click", resetFilters);
  }
}

function resetFilters() {
  activeFilter = "all";
  activeRegion = "all";
  searchQuery = "";
  document.getElementById("search").value = "";
  document.querySelectorAll("[data-filter]").forEach((el) => {
    el.classList.toggle("active", el.dataset.filter === "all");
  });
  document.querySelectorAll("[data-region]").forEach((el) => {
    el.classList.toggle("active", el.dataset.region === "all");
  });
  render();
}

function initFilters() {
  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((el) => {
        el.classList.toggle("active", el === btn);
      });
      render();
    });
  });

  document.querySelectorAll("[data-region]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeRegion = btn.dataset.region;
      document.querySelectorAll("[data-region]").forEach((el) => {
        el.classList.toggle("active", el === btn);
      });
      render();
    });
  });

  const searchInput = document.getElementById("search");
  let debounce;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      searchQuery = e.target.value.trim();
      render();
    }, 200);
  });
}

function init() {
  document.getElementById("tour-name").textContent = TOUR_INFO.name;
  document.getElementById("hero-subtitle").textContent =
    `${TOUR_INFO.totalShows} shows · ${TOUR_INFO.cities} ciudades · ${TOUR_INFO.countries} países`;
  document.getElementById("last-updated").textContent = shortDateFmt.format(TODAY);

  const regionFilters = document.getElementById("region-filters");
  Object.entries(REGION_LABELS).forEach(([key, label]) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `chip${key === "all" ? " active" : ""}`;
    btn.dataset.region = key;
    btn.textContent = label;
    regionFilters.appendChild(btn);
  });

  renderStats();
  renderSongIndex();
  initFilters();
  render();
}

init();
