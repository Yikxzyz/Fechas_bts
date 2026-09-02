(function () {
  "use strict";

  var TOUR_INFO = {
    name: "ARIRANG World Tour",
    artist: "BTS",
    album: "Arirang",
    startDate: "2026-04-09",
    endDate: "2027-03-16",
    totalShows: 88,
    cities: 34,
    countries: 23,
    website: "https://btsworldtourofficial.com",
  };

  var CONCERTS = [
    { date: "2026-04-09", city: "Goyang", country: "Corea del Sur", venue: "Goyang Stadium", region: "asia", surpriseSongs: ["Mikrokosmos", "I Need U"] },
    { date: "2026-04-11", city: "Goyang", country: "Corea del Sur", venue: "Goyang Stadium", region: "asia", surpriseSongs: ["Take Two", "DNA"] },
    { date: "2026-04-12", city: "Goyang", country: "Corea del Sur", venue: "Goyang Stadium", region: "asia", surpriseSongs: ["Spring Day", "Run"] },
    { date: "2026-04-17", city: "Tokio", country: "Japón", venue: "Tokyo Dome", region: "asia", surpriseSongs: ["Save Me", "Crystal Snow"] },
    { date: "2026-04-18", city: "Tokio", country: "Japón", venue: "Tokyo Dome", region: "asia", surpriseSongs: ["Dope", "For You"] },
    { date: "2026-04-25", city: "Tampa", country: "Estados Unidos", venue: "Raymond James Stadium", region: "north-america", surpriseSongs: ["Permission to Dance", "Magic Shop"] },
    { date: "2026-04-26", city: "Tampa", country: "Estados Unidos", venue: "Raymond James Stadium", region: "north-america", surpriseSongs: ["Boy With Luv", "Pied Piper"] },
    { date: "2026-04-28", city: "Tampa", country: "Estados Unidos", venue: "Raymond James Stadium", region: "north-america", surpriseSongs: ["Life Goes On", "Baepsae (Silver Spoon)"] },
    { date: "2026-05-02", city: "El Paso", country: "Estados Unidos", venue: "Sun Bowl", region: "north-america", surpriseSongs: ["ON", "Outro: Wings"] },
    { date: "2026-05-03", city: "El Paso", country: "Estados Unidos", venue: "Sun Bowl", region: "north-america", surpriseSongs: ["Dionysus", "Best of Me"] },
    { date: "2026-05-07", city: "Ciudad de México", country: "México", venue: "Estadio GNP Seguros", region: "north-america", surpriseSongs: ["Boy in Luv", "So What"] },
    { date: "2026-05-09", city: "Ciudad de México", country: "México", venue: "Estadio GNP Seguros", region: "north-america", surpriseSongs: ["We Are Bulletproof Pt.2", "Just One Day"] },
    { date: "2026-05-10", city: "Ciudad de México", country: "México", venue: "Estadio GNP Seguros", region: "north-america", surpriseSongs: ["Airplane Pt.2", "Spring Day"] },
    { date: "2026-05-16", city: "Stanford", country: "Estados Unidos", venue: "Stanford Stadium", region: "north-america", surpriseSongs: ["N.O", "Anpanman"] },
    { date: "2026-05-17", city: "Stanford", country: "Estados Unidos", venue: "Stanford Stadium", region: "north-america", surpriseSongs: ["Dope", "Blood Sweat & Tears"] },
    { date: "2026-05-19", city: "Stanford", country: "Estados Unidos", venue: "Stanford Stadium", region: "north-america", surpriseSongs: ["I Need U", "No More Dream"] },
    { date: "2026-05-23", city: "Las Vegas", country: "Estados Unidos", venue: "Allegiant Stadium", region: "north-america", surpriseSongs: ["Permission to Dance", "Go Go"] },
    { date: "2026-05-24", city: "Las Vegas", country: "Estados Unidos", venue: "Allegiant Stadium", region: "north-america", surpriseSongs: ["Black Swan", "Spine Breaker"] },
    { date: "2026-05-27", city: "Las Vegas", country: "Estados Unidos", venue: "Allegiant Stadium", region: "north-america", surpriseSongs: ["Anpanman", "Attack on Bangtan"] },
    { date: "2026-05-28", city: "Las Vegas", country: "Estados Unidos", venue: "Allegiant Stadium", region: "north-america", surpriseSongs: ["Boyz with Fun", "Danger"] },
    { date: "2026-06-12", city: "Busan", country: "Corea del Sur", venue: "Busan Asiad Main Stadium", region: "asia", surpriseSongs: ["Paldogangsan", "Ma City"], note: "Bonus: One More Night (reemplazó Please)" },
    { date: "2026-06-13", city: "Busan", country: "Corea del Sur", venue: "Busan Asiad Main Stadium", region: "asia", surpriseSongs: ["Dimple", "Ddaeng", "Magic Shop"], note: "3 canciones sorpresa esta noche" },
    { date: "2026-06-26", city: "Madrid", country: "España", venue: "Riyadh Air Metropolitano", region: "europe", surpriseSongs: ["Airplane Pt.2", "Outro: Wings"] },
    { date: "2026-06-27", city: "Madrid", country: "España", venue: "Riyadh Air Metropolitano", region: "europe", surpriseSongs: ["Mikrokosmos", "Best of Me"] },
    { date: "2026-07-01", city: "Bruselas", country: "Bélgica", venue: "King Baudouin Stadium", region: "europe", surpriseSongs: ["Tomorrow", "Boy With Luv"] },
    { date: "2026-07-02", city: "Bruselas", country: "Bélgica", venue: "King Baudouin Stadium", region: "europe", surpriseSongs: ["ON", "For Youth"] },
    { date: "2026-07-06", city: "Londres", country: "Inglaterra", venue: "Tottenham Hotspur Stadium", region: "europe", surpriseSongs: ["Life Goes On", "Dionysus"] },
    { date: "2026-07-07", city: "Londres", country: "Inglaterra", venue: "Tottenham Hotspur Stadium", region: "europe", surpriseSongs: ["Save Me", "Epilogue: Young Forever"] },
    { date: "2026-07-11", city: "Múnich", country: "Alemania", venue: "Allianz Arena", region: "europe", surpriseSongs: ["Baepsae (Silver Spoon)", "Pied Piper"] },
    { date: "2026-07-12", city: "Múnich", country: "Alemania", venue: "Allianz Arena", region: "europe", surpriseSongs: ["Louder than Bombs", "Blood Sweat & Tears"] },
    { date: "2026-07-17", city: "París", country: "Francia", venue: "Stade de France", region: "europe", surpriseSongs: ["Boy With Luv", "Jump"] },
    { date: "2026-07-18", city: "París", country: "Francia", venue: "Stade de France", region: "europe", surpriseSongs: ["So What", "We Are Bulletproof: The Eternal"] },
    { date: "2026-08-01", city: "East Rutherford", country: "Estados Unidos", venue: "MetLife Stadium", region: "north-america", surpriseSongs: ["Dis-ease", "Run"] },
    { date: "2026-08-02", city: "East Rutherford", country: "Estados Unidos", venue: "MetLife Stadium", region: "north-america", surpriseSongs: ["Autumn Leaves", "Go Go"] },
    { date: "2026-08-05", city: "Foxborough", country: "Estados Unidos", venue: "Gillette Stadium", region: "north-america", surpriseSongs: ["Paradise", "No More Dream"] },
    { date: "2026-08-06", city: "Foxborough", country: "Estados Unidos", venue: "Gillette Stadium", region: "north-america", surpriseSongs: ["N.O", "Make it Right"] },
    { date: "2026-08-10", city: "Baltimore", country: "Estados Unidos", venue: "M&T Bank Stadium", region: "north-america", surpriseSongs: ["Telepathy", "Boy in Luv"] },
    { date: "2026-08-11", city: "Baltimore", country: "Estados Unidos", venue: "M&T Bank Stadium", region: "north-america", surpriseSongs: ["Just One Day", "Best of Me"] },
    { date: "2026-08-15", city: "Arlington", country: "Estados Unidos", venue: "AT&T Stadium", region: "north-america", surpriseSongs: ["Permission to Dance", "Go Go"] },
    { date: "2026-08-16", city: "Arlington", country: "Estados Unidos", venue: "AT&T Stadium", region: "north-america", surpriseSongs: ["Butterfly", "DNA"] },
    { date: "2026-08-22", city: "Toronto", country: "Canadá", venue: "Rogers Stadium", region: "north-america", surpriseSongs: ["Dope", "Outro: Wings"] },
    { date: "2026-08-23", city: "Toronto", country: "Canadá", venue: "Rogers Stadium", region: "north-america", surpriseSongs: ["00:00 (Zero O'clock)", "Outro: Tear"] },
    { date: "2026-08-27", city: "Chicago", country: "Estados Unidos", venue: "Soldier Field", region: "north-america", surpriseSongs: ["Tomorrow", "Hip Hop Phile"] },
    { date: "2026-08-28", city: "Chicago", country: "Estados Unidos", venue: "Soldier Field", region: "north-america", surpriseSongs: ["134340", "Mikrokosmos"] },
    { date: "2026-09-01", city: "Los Ángeles", country: "Estados Unidos", venue: "SoFi Stadium", region: "north-america", surpriseSongs: ["Boy in Luv", "Magic Shop"] },
    { date: "2026-09-02", city: "Los Ángeles", country: "Estados Unidos", venue: "SoFi Stadium", region: "north-america", surpriseSongs: null },
    { date: "2026-09-05", city: "Los Ángeles", country: "Estados Unidos", venue: "SoFi Stadium", region: "north-america", surpriseSongs: null },
    { date: "2026-09-06", city: "Los Ángeles", country: "Estados Unidos", venue: "SoFi Stadium", region: "north-america", surpriseSongs: null },
    { date: "2026-10-02", city: "Bogotá", country: "Colombia", venue: "Estadio El Campín", region: "south-america", surpriseSongs: null },
    { date: "2026-10-03", city: "Bogotá", country: "Colombia", venue: "Estadio El Campín", region: "south-america", surpriseSongs: null },
    { date: "2026-10-07", city: "Lima", country: "Perú", venue: "Estadio San Marcos", region: "south-america", surpriseSongs: null },
    { date: "2026-10-09", city: "Lima", country: "Perú", venue: "Estadio San Marcos", region: "south-america", surpriseSongs: null },
    { date: "2026-10-10", city: "Lima", country: "Perú", venue: "Estadio San Marcos", region: "south-america", surpriseSongs: null },
    { date: "2026-10-14", city: "Santiago", country: "Chile", venue: "Estadio Nacional", region: "south-america", surpriseSongs: null },
    { date: "2026-10-16", city: "Santiago", country: "Chile", venue: "Estadio Nacional", region: "south-america", surpriseSongs: null },
    { date: "2026-10-17", city: "Santiago", country: "Chile", venue: "Estadio Nacional", region: "south-america", surpriseSongs: null },
    { date: "2026-10-21", city: "Buenos Aires", country: "Argentina", venue: "Estadio Único Diego Maradona", region: "south-america", surpriseSongs: null },
    { date: "2026-10-23", city: "Buenos Aires", country: "Argentina", venue: "Estadio Único Diego Maradona", region: "south-america", surpriseSongs: null },
    { date: "2026-10-24", city: "Buenos Aires", country: "Argentina", venue: "Estadio Único Diego Maradona", region: "south-america", surpriseSongs: null },
    { date: "2026-10-28", city: "São Paulo", country: "Brasil", venue: "Estádio MorumBIS", region: "south-america", surpriseSongs: null },
    { date: "2026-10-30", city: "São Paulo", country: "Brasil", venue: "Estádio MorumBIS", region: "south-america", surpriseSongs: null },
    { date: "2026-10-31", city: "São Paulo", country: "Brasil", venue: "Estádio MorumBIS", region: "south-america", surpriseSongs: null },
    { date: "2026-11-19", city: "Kaohsiung", country: "Taiwán", venue: "Kaohsiung National Stadium", region: "asia", surpriseSongs: null },
    { date: "2026-11-21", city: "Kaohsiung", country: "Taiwán", venue: "Kaohsiung National Stadium", region: "asia", surpriseSongs: null },
    { date: "2026-11-22", city: "Kaohsiung", country: "Taiwán", venue: "Kaohsiung National Stadium", region: "asia", surpriseSongs: null },
    { date: "2026-12-03", city: "Bangkok", country: "Tailandia", venue: "Rajamangala National Stadium", region: "asia", surpriseSongs: null },
    { date: "2026-12-05", city: "Bangkok", country: "Tailandia", venue: "Rajamangala National Stadium", region: "asia", surpriseSongs: null },
    { date: "2026-12-06", city: "Bangkok", country: "Tailandia", venue: "Rajamangala National Stadium", region: "asia", surpriseSongs: null },
    { date: "2026-12-12", city: "Kuala Lumpur", country: "Malasia", venue: "TM National Stadium", region: "asia", surpriseSongs: null },
    { date: "2026-12-13", city: "Kuala Lumpur", country: "Malasia", venue: "TM National Stadium", region: "asia", surpriseSongs: null },
    { date: "2026-12-17", city: "Singapur", country: "Singapur", venue: "Singapore National Stadium", region: "asia", surpriseSongs: null },
    { date: "2026-12-19", city: "Singapur", country: "Singapur", venue: "Singapore National Stadium", region: "asia", surpriseSongs: null },
    { date: "2026-12-20", city: "Singapur", country: "Singapur", venue: "Singapore National Stadium", region: "asia", surpriseSongs: null },
    { date: "2026-12-22", city: "Singapur", country: "Singapur", venue: "Singapore National Stadium", region: "asia", surpriseSongs: null },
    { date: "2026-12-26", city: "Yakarta", country: "Indonesia", venue: "Gelora Bung Karno Stadium", region: "asia", surpriseSongs: null },
    { date: "2026-12-27", city: "Yakarta", country: "Indonesia", venue: "Gelora Bung Karno Stadium", region: "asia", surpriseSongs: null },
    { date: "2026-12-29", city: "Yakarta", country: "Indonesia", venue: "Gelora Bung Karno Stadium", region: "asia", surpriseSongs: null },
    { date: "2027-02-10", city: "Melbourne", country: "Australia", venue: "Marvel Stadium", region: "oceania", surpriseSongs: null },
    { date: "2027-02-12", city: "Melbourne", country: "Australia", venue: "Marvel Stadium", region: "oceania", surpriseSongs: null },
    { date: "2027-02-13", city: "Melbourne", country: "Australia", venue: "Marvel Stadium", region: "oceania", surpriseSongs: null },
    { date: "2027-02-20", city: "Sydney", country: "Australia", venue: "Accor Stadium", region: "oceania", surpriseSongs: null },
    { date: "2027-02-21", city: "Sydney", country: "Australia", venue: "Accor Stadium", region: "oceania", surpriseSongs: null },
    { date: "2027-03-04", city: "Hong Kong", country: "Hong Kong", venue: "Kai Tak Stadium", region: "asia", surpriseSongs: null },
    { date: "2027-03-06", city: "Hong Kong", country: "Hong Kong", venue: "Kai Tak Stadium", region: "asia", surpriseSongs: null },
    { date: "2027-03-07", city: "Hong Kong", country: "Hong Kong", venue: "Kai Tak Stadium", region: "asia", surpriseSongs: null },
    { date: "2027-03-13", city: "Bulacan", country: "Filipinas", venue: "Philippine Sports Stadium", region: "asia", surpriseSongs: null },
    { date: "2027-03-14", city: "Bulacan", country: "Filipinas", venue: "Philippine Sports Stadium", region: "asia", surpriseSongs: null },
    { date: "2027-03-16", city: "Bulacan", country: "Filipinas", venue: "Philippine Sports Stadium", region: "asia", surpriseSongs: null },
  ];

  var REGION_LABELS = {
    all: "Todos",
    asia: "Asia",
    europe: "Europa",
    "north-america": "Norteamérica",
    "south-america": "Sudamérica",
    oceania: "Oceanía",
  };

  var TODAY = new Date();
  var activeFilter = "all";
  var activeRegion = "all";
  var searchQuery = "";

  var dateFmt = new Intl.DateTimeFormat("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  var shortDateFmt = new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  function parseDate(iso) {
    var parts = iso.split("-");
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  function getShowStatus(concert) {
    var showDate = parseDate(concert.date);
    var todayStart = new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate());
    var showStart = new Date(showDate.getFullYear(), showDate.getMonth(), showDate.getDate());

    if (showStart.getTime() === todayStart.getTime()) return "today";
    if (showStart < todayStart) return "past";
    return "upcoming";
  }

  function getUniqueSurpriseSongs() {
    var songs = {};
    CONCERTS.forEach(function (c) {
      if (c.surpriseSongs) {
        c.surpriseSongs.forEach(function (s) {
          songs[s] = true;
        });
      }
    });
    return Object.keys(songs);
  }

  function getStats() {
    var completed = 0;

    CONCERTS.forEach(function (c) {
      if (getShowStatus(c) === "past") completed++;
    });

    return {
      completed: completed,
      remaining: CONCERTS.length - completed,
      total: CONCERTS.length,
    };
  }

  function filterConcerts() {
    var result = CONCERTS.filter(function (concert) {
      var status = getShowStatus(concert);

      if (activeFilter === "past" && status !== "past") return false;
      if (activeFilter === "upcoming" && status !== "upcoming") return false;
      if (activeRegion !== "all" && concert.region !== activeRegion) return false;

      if (searchQuery) {
        var q = searchQuery.toLowerCase();
        var haystack = [concert.city, concert.country, concert.venue]
          .concat(concert.surpriseSongs || [])
          .join(" ")
          .toLowerCase();
        if (haystack.indexOf(q) === -1) return false;
      }

      return true;
    });

    if (activeFilter === "past") {
      result = result.slice().reverse();
    }

    return result;
  }

  function statusBadge(status) {
    var labels = { past: "Realizado", today: "Hoy", upcoming: "Próximo" };
    return '<span class="badge badge--' + status + '">' + labels[status] + "</span>";
  }

  function renderSongs(concert) {
    if (concert.surpriseSongs && concert.surpriseSongs.length) {
      var tags = concert.surpriseSongs
        .map(function (song) {
          return '<span class="song-tag">' + song + "</span>";
        })
        .join("");
      var note = concert.note ? '<p class="concert-note">' + concert.note + "</p>" : "";
      return '<div class="songs">' + tags + "</div>" + note;
    }

    var status = getShowStatus(concert);
    if (status === "upcoming" || status === "today") {
      return '<p class="songs-pending">Por confirmar — se revelan después de Dynamite</p>';
    }
    return '<p class="songs-pending">Sin datos registrados</p>';
  }

  function renderConcertCard(concert, index) {
    var status = getShowStatus(concert);
    var formattedDate = dateFmt.format(parseDate(concert.date));
    var showNumber = CONCERTS.indexOf(concert) + 1;

    return (
      '<article class="concert-card" data-status="' +
      status +
      '" style="--delay: ' +
      (index % 12) * 40 +
      'ms">' +
      '<div class="concert-card__header">' +
      '<span class="show-number">Show #' +
      showNumber +
      "</span>" +
      statusBadge(status) +
      "</div>" +
      '<time class="concert-date" datetime="' +
      concert.date +
      '">' +
      formattedDate +
      "</time>" +
      '<h3 class="concert-city">' +
      concert.city +
      "</h3>" +
      '<p class="concert-meta">' +
      concert.venue +
      " · " +
      concert.country +
      "</p>" +
      '<div class="concert-songs-section">' +
      '<h4 class="songs-label">Canciones sorpresa</h4>' +
      renderSongs(concert) +
      "</div></article>"
    );
  }

  function renderStats() {
    var stats = getStats();
    document.getElementById("stat-shows").textContent = stats.total;
    document.getElementById("stat-completed").textContent = stats.completed;
    document.getElementById("stat-remaining").textContent = stats.remaining;
  }

  function renderSongIndex() {
    var songCounts = {};
    CONCERTS.forEach(function (c) {
      if (c.surpriseSongs) {
        c.surpriseSongs.forEach(function (song) {
          songCounts[song] = (songCounts[song] || 0) + 1;
        });
      }
    });

    var allSongs = Object.keys(songCounts)
      .map(function (song) {
        return [song, songCounts[song]];
      })
      .sort(function (a, b) {
        return b[1] - a[1] || a[0].localeCompare(b[0]);
      });

    var container  = document.getElementById("song-index");
    var countEl    = document.getElementById("song-search-count");
    var emptyEl    = document.getElementById("song-index-empty");
    var termEl     = document.getElementById("song-search-term");

    function buildItems(songs) {
      container.innerHTML = songs
        .map(function (entry) {
          return (
            '<button type="button" class="song-index-item" data-song="' +
            entry[0] + '">' +
            '<span class="song-index-name">' + entry[0] + '</span>' +
            '<span class="song-index-count">' + entry[1] + '×</span>' +
            '</button>'
          );
        })
        .join("");

      var buttons = container.querySelectorAll(".song-index-item");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
          searchQuery = this.getAttribute("data-song");
          document.getElementById("search").value = searchQuery;
          activeFilter = "all";
          document.querySelectorAll("[data-filter]").forEach(function (el) {
            el.classList.toggle("active", el.getAttribute("data-filter") === "all");
          });
          render();
          document.getElementById("concerts").scrollIntoView({ behavior: "smooth" });
        });
      }

      var visible = songs.length;
      if (countEl) countEl.textContent = visible + " de " + allSongs.length;
      if (emptyEl) emptyEl.hidden = visible > 0;
    }

    // Render inicial completo
    buildItems(allSongs);
    if (countEl) countEl.textContent = "";

    // Buscador
    var searchInput = document.getElementById("song-search");
    if (searchInput) {
      var debounce;
      searchInput.addEventListener("input", function () {
        clearTimeout(debounce);
        debounce = setTimeout(function () {
          var q = searchInput.value.trim().toLowerCase();
          if (termEl) termEl.textContent = searchInput.value.trim();
          if (!q) {
            buildItems(allSongs);
            if (countEl) countEl.textContent = "";
            return;
          }
          var filtered = allSongs.filter(function (entry) {
            return entry[0].toLowerCase().indexOf(q) !== -1;
          });
          buildItems(filtered);
        }, 150);
      });
    }
  }

  function render() {
    var filtered = filterConcerts();
    var grid = document.getElementById("concert-grid");
    var countEl = document.getElementById("result-count");

    if (filtered.length === 0) {
      grid.innerHTML =
        '<div class="empty-state">' +
        "<p>No hay conciertos que coincidan con tu búsqueda.</p>" +
        '<button type="button" class="btn-reset" id="reset-filters">Limpiar filtros</button></div>';
      var resetBtn = document.getElementById("reset-filters");
      if (resetBtn) resetBtn.addEventListener("click", resetFilters);
    } else {
      grid.innerHTML = filtered
        .map(function (concert, index) {
          return renderConcertCard(concert, index);
        })
        .join("");
    }

    countEl.textContent = filtered.length + " concierto" + (filtered.length !== 1 ? "s" : "");
  }

  function resetFilters() {
    activeFilter = "all";
    activeRegion = "all";
    searchQuery = "";
    document.getElementById("search").value = "";
    document.querySelectorAll("[data-filter]").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-filter") === "all");
    });
    document.querySelectorAll("[data-region]").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-region") === "all");
    });
    render();
  }

  function initFilters() {
    document.querySelectorAll("[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeFilter = btn.getAttribute("data-filter");
        document.querySelectorAll("[data-filter]").forEach(function (el) {
          el.classList.toggle("active", el === btn);
        });
        render();
      });
    });

    document.querySelectorAll("[data-region]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeRegion = btn.getAttribute("data-region");
        document.querySelectorAll("[data-region]").forEach(function (el) {
          el.classList.toggle("active", el === btn);
        });
        render();
      });
    });

    var searchInput = document.getElementById("search");
    var debounce;
    searchInput.addEventListener("input", function (e) {
      clearTimeout(debounce);
      debounce = setTimeout(function () {
        searchQuery = e.target.value.trim();
        render();
      }, 200);
    });
  }

  function init() {
    document.getElementById("tour-name").textContent = TOUR_INFO.name;
    document.getElementById("hero-subtitle").textContent =
      TOUR_INFO.totalShows + " shows · " + TOUR_INFO.cities + " ciudades · " + TOUR_INFO.countries + " países";
    document.getElementById("last-updated").textContent = shortDateFmt.format(TODAY);

    var regionFilters = document.getElementById("region-filters");
    Object.keys(REGION_LABELS).forEach(function (key) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chip" + (key === "all" ? " active" : "");
      btn.setAttribute("data-region", key);
      btn.textContent = REGION_LABELS[key];
      regionFilters.appendChild(btn);
    });

    renderStats();
    renderSongIndex();
    initFilters();
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
