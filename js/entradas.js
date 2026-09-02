(function () {
  "use strict";

  var CSV_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSLZHSzheU8XgYaJ9wDPhIM0ZVHx67M20Rg4IKnn219CIDZuOR1DzgMdVHIfIlVJNwmeILXJgSljE2Z/pub?gid=1873335241&single=true&output=csv";

  // Mapeo de columnas del Sheet (índice 0)
  var COL = {
    estado: 0,
    nombre: 3,
    instagram: 4,
    fechas: 6,
    zonas: 7,
    cantidad: 8,
    precio: 9,
    whatsapp: 10,
  };

  // Estado de filtros
  var activeFecha    = "all";
  var activeCantidad = "all";
  var activeZonas    = [];       // array vacío = todas las zonas
  var maxPrecio      = Infinity;
  var allListings    = [];

  // ── Parsear CSV respetando comillas ──────────────────────────────────────
  function parseCSV(text) {
    var lines = text.trim().split("\n");
    var rows  = [];
    for (var i = 0; i < lines.length; i++) {
      var row      = [];
      var current  = "";
      var inQuotes = false;
      var line     = lines[i];
      for (var j = 0; j < line.length; j++) {
        var ch = line[j];
        if (ch === '"') {
          inQuotes = !inQuotes;
        } else if (ch === "," && !inQuotes) {
          row.push(current.trim());
          current = "";
        } else {
          current += ch;
        }
      }
      row.push(current.trim());
      rows.push(row);
    }
    return rows;
  }

  // ── Sanitizar texto para evitar XSS ─────────────────────────────────────
  function esc(str) {
    var d = document.createElement("div");
    d.textContent = str || "";
    return d.innerHTML;
  }

  // ── Parsear precio numérico desde string ────────────────────────────────
  function parsePrecio(str) {
    if (!str) return NaN;
    var n = parseFloat(String(str).replace(/[^\d]/g, ""));
    return isNaN(n) ? NaN : n;
  }

  // ── Formatear número con puntos como separador de miles ─────────────────
  function formatNum(n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // ── Filtrar anuncios según todos los criterios activos ──────────────────
  function filterListings() {
    return allListings.filter(function (row) {

      // Fecha
      if (activeFecha !== "all") {
        if ((row[COL.fechas] || "").indexOf(activeFecha) === -1) return false;
      }

      // Cantidad
      if (activeCantidad !== "all") {
        var cant = parseInt(row[COL.cantidad], 10);
        if (activeCantidad === "4") {
          if (isNaN(cant) || cant < 4) return false;
        } else {
          if (cant !== parseInt(activeCantidad, 10)) return false;
        }
      }

      // Zonas (multi-selección: el anuncio debe coincidir con AL MENOS una zona activa)
      if (activeZonas.length > 0) {
        var zonaRow = (row[COL.zonas] || "").toLowerCase();
        var match   = activeZonas.some(function (z) {
          return zonaRow.indexOf(z.toLowerCase()) !== -1;
        });
        if (!match) return false;
      }

      // Precio máximo
      if (maxPrecio !== Infinity) {
        var precio = parsePrecio(row[COL.precio]);
        if (!isNaN(precio) && precio > maxPrecio) return false;
      }

      return true;
    });
  }

  // ── Renderizar una tarjeta de anuncio ────────────────────────────────────
  function renderCard(row) {
    var nombre   = esc(row[COL.nombre]   || "Vendedor");
    var igRaw    = (row[COL.instagram]   || "").replace(/^@/, "").trim();
    var fechas   = esc(row[COL.fechas]   || "—");
    var zonas    = esc(row[COL.zonas]    || "—");
    var cantidad = esc(row[COL.cantidad] || "—");
    var precio   = esc(row[COL.precio]   || "—");
    var waRaw    = row[COL.whatsapp] ? row[COL.whatsapp].replace(/\D/g, "") : null;

    var contactHtml = "";
    if (igRaw) {
      contactHtml +=
        '<a href="https://instagram.com/' + esc(igRaw) +
        '" target="_blank" rel="noopener noreferrer" class="contact-btn contact-btn--ig">📷 @' +
        esc(igRaw) + "</a>";
    }
    if (waRaw) {
      contactHtml +=
        '<a href="https://wa.me/' + esc(waRaw) +
        '" target="_blank" rel="noopener noreferrer" class="contact-btn contact-btn--wa">💬 WhatsApp</a>';
    }

    return (
      '<article class="listing-card">' +
      '<div class="listing-header">' +
      '<span class="listing-seller">🎟 ' + nombre + "</span>" +
      '<span class="listing-badge">Verificado ✓</span>' +
      "</div>" +
      '<div class="listing-detail"><span class="listing-label">Fecha(s)</span><span>' + fechas + "</span></div>" +
      '<div class="listing-detail"><span class="listing-label">Zona</span><span>' + zonas + "</span></div>" +
      '<div class="listing-detail"><span class="listing-label">Entradas</span><span>' + cantidad + "</span></div>" +
      '<div class="listing-detail"><span class="listing-label">Precio total</span><span class="listing-price">$' + precio + " CLP</span></div>" +
      '<div class="listing-contact">' + (contactHtml || '<span class="text-muted">Sin contacto público</span>') + "</div>" +
      "</article>"
    );
  }

  // ── Renderizar la grilla completa ────────────────────────────────────────
  function render() {
    var filtered = filterListings();
    var grid     = document.getElementById("listings-grid");
    var countEl  = document.getElementById("dir-count");

    countEl.textContent =
      filtered.length + " anuncio" + (filtered.length !== 1 ? "s" : "") +
      " publicado" + (filtered.length !== 1 ? "s" : "");

    // Mostrar / ocultar botón "Limpiar"
    var hasAdv  = activeCantidad !== "all" || activeZonas.length > 0 || maxPrecio !== Infinity;
    var clearBtn = document.getElementById("adv-clear");
    if (clearBtn) clearBtn.hidden = !hasAdv;

    if (filtered.length === 0) {
      grid.innerHTML =
        '<div class="empty-state"><p>No hay anuncios para estos filtros.</p>' +
        '<button class="btn-reset" id="btn-empty-reset">Limpiar filtros</button></div>';
      var resetBtn = document.getElementById("btn-empty-reset");
      if (resetBtn) resetBtn.addEventListener("click", resetFilters);
      return;
    }

    grid.innerHTML = filtered.map(renderCard).join("");
  }

  // ── Actualizar etiqueta del botón de zona ────────────────────────────────
  function updateZonaLabel() {
    var label = document.getElementById("zona-label");
    if (!label) return;
    if (activeZonas.length === 0) {
      label.textContent = "Cualquiera";
    } else if (activeZonas.length === 1) {
      label.textContent = activeZonas[0];
    } else {
      label.textContent = activeZonas.length + " zonas";
    }
  }

  // ── Poblar opciones de zona desde los datos ──────────────────────────────
  function populateZonas() {
    var zonaSet = {};
    allListings.forEach(function (row) {
      var z = (row[COL.zonas] || "").trim();
      if (z && z !== "—") zonaSet[z] = true;
    });

    var zonas = Object.keys(zonaSet).sort();
    if (zonas.length === 0) return;

    var list = document.getElementById("zona-list");
    if (!list) return;

    zonas.forEach(function (zona) {
      var label = document.createElement("label");
      label.className = "zona-option";

      var cb = document.createElement("input");
      cb.type  = "checkbox";
      cb.value = zona;

      cb.addEventListener("change", function () {
        // desmarcar "todas"
        var allCb = list.querySelector('input[value="all"]');
        if (allCb) allCb.checked = false;

        if (cb.checked) {
          activeZonas.push(zona);
        } else {
          activeZonas = activeZonas.filter(function (z) { return z !== zona; });
        }
        // si no queda ninguna, volver a "todas"
        if (activeZonas.length === 0 && allCb) allCb.checked = true;

        updateZonaLabel();
        render();
      });

      label.appendChild(cb);
      label.appendChild(document.createTextNode(" " + zona));
      list.appendChild(label);
    });

    // listener del checkbox "Todas las zonas"
    var allCb = list.querySelector('input[value="all"]');
    if (allCb) {
      allCb.addEventListener("change", function () {
        if (allCb.checked) {
          activeZonas = [];
          list.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
            if (cb.value !== "all") cb.checked = false;
          });
        } else {
          allCb.checked = true; // no se puede desmarcar sin elegir otro
        }
        updateZonaLabel();
        render();
      });
    }
  }

  // ── Dropdown de zona ─────────────────────────────────────────────────────
  function initZonaDropdown() {
    var btn      = document.getElementById("zona-btn");
    var dropdown = document.getElementById("zona-dropdown");
    if (!btn || !dropdown) return;

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !dropdown.hidden;
      dropdown.hidden = open;
      btn.setAttribute("aria-expanded", String(!open));
    });

    // Cerrar al hacer clic fuera
    document.addEventListener("click", function (e) {
      var wrap = document.getElementById("zona-wrap");
      if (wrap && !wrap.contains(e.target)) {
        dropdown.hidden = true;
        btn.setAttribute("aria-expanded", "false");
      }
    });

    // Cerrar con Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        dropdown.hidden = true;
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ── Resetear todos los filtros ───────────────────────────────────────────
  function resetFilters() {
    activeCantidad = "all";
    activeZonas    = [];
    maxPrecio      = Infinity;

    // cantidad chips
    document.querySelectorAll("[data-cantidad]").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-cantidad") === "all");
    });

    // zona checkboxes
    var list = document.getElementById("zona-list");
    if (list) {
      list.querySelectorAll('input[type="checkbox"]').forEach(function (cb) {
        cb.checked = cb.value === "all";
      });
    }
    updateZonaLabel();

    // precio slider
    var slider   = document.getElementById("filter-precio");
    var priceVal = document.getElementById("fb-price-val");
    if (slider)   slider.value = slider.max;
    if (priceVal) priceVal.textContent = "Sin límite";

    // precio presets
    document.querySelectorAll("[data-preset]").forEach(function (el) {
      el.classList.toggle("active", el.getAttribute("data-preset") === "all");
    });

    render();
  }

  // ── Inicializar filtro de fecha ──────────────────────────────────────────
  function initFechaFilter() {
    document.querySelectorAll("[data-fecha]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeFecha = btn.getAttribute("data-fecha");
        document.querySelectorAll("[data-fecha]").forEach(function (el) {
          el.classList.toggle("active", el === btn);
        });
        render();
      });
    });
  }

  // ── Inicializar filtro de cantidad ───────────────────────────────────────
  function initCantidadFilter() {
    document.querySelectorAll("[data-cantidad]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCantidad = btn.getAttribute("data-cantidad");
        document.querySelectorAll("[data-cantidad]").forEach(function (el) {
          el.classList.toggle("active", el === btn);
        });
        render();
      });
    });
  }

  // ── Inicializar filtro de precio ─────────────────────────────────────────
  function initPrecioFilter() {
    var slider   = document.getElementById("filter-precio");
    var priceVal = document.getElementById("fb-price-val");
    if (!slider) return;

    function updateSliderMax() {
      var max = 0;
      allListings.forEach(function (row) {
        var p = parsePrecio(row[COL.precio]);
        if (!isNaN(p) && p > max) max = p;
      });
      if (max > 0) {
        var rounded  = Math.ceil(max / 100000) * 100000;
        slider.max   = rounded;
        slider.value = rounded;
      }
    }

    slider.addEventListener("input", function () {
      var val   = parseInt(slider.value, 10);
      var isMax = val >= parseInt(slider.max, 10);
      maxPrecio = isMax ? Infinity : val;
      if (priceVal) priceVal.textContent = isMax ? "Sin límite" : "$" + formatNum(val);
      document.querySelectorAll("[data-preset]").forEach(function (el) {
        el.classList.remove("active");
      });
      render();
    });

    document.querySelectorAll("[data-preset]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var preset = btn.getAttribute("data-preset");
        if (preset === "all") {
          maxPrecio    = Infinity;
          slider.value = slider.max;
          if (priceVal) priceVal.textContent = "Sin límite";
        } else {
          maxPrecio    = parseInt(preset, 10);
          slider.value = maxPrecio;
          if (priceVal) priceVal.textContent = "$" + formatNum(maxPrecio);
        }
        document.querySelectorAll("[data-preset]").forEach(function (el) {
          el.classList.toggle("active", el === btn);
        });
        render();
      });
    });

    // Botón limpiar
    var clearBtn = document.getElementById("adv-clear");
    if (clearBtn) clearBtn.addEventListener("click", resetFilters);

    return updateSliderMax;
  }

  // ── Cargar CSV desde Google Sheets ──────────────────────────────────────
  function loadData(onReady) {
    var grid = document.getElementById("listings-grid");

    fetch(CSV_URL)
      .then(function (res) {
        if (!res.ok) throw new Error("Error al cargar datos");
        return res.text();
      })
      .then(function (text) {
        var rows    = parseCSV(text);
        allListings = rows.slice(1).filter(function (row) {
          return (row[COL.estado] || "").trim() === "2-Aprobado";
        });
        populateZonas();
        if (typeof onReady === "function") onReady();
        render();
      })
      .catch(function () {
        grid.innerHTML =
          '<div class="empty-state"><p>No se pudieron cargar los anuncios. Intenta recargar la página.</p></div>';
      });
  }

  // ── Arranque ─────────────────────────────────────────────────────────────
  function init() {
    initFechaFilter();
    initCantidadFilter();
    initZonaDropdown();
    var updateSliderMax = initPrecioFilter();
    loadData(updateSliderMax);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
