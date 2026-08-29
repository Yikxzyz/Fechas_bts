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

  var activeFecha = "all";
  var allListings = [];

  // ── Parsear CSV respetando comillas ──────────────────────────────────────
  function parseCSV(text) {
    var lines = text.trim().split("\n");
    var rows = [];
    for (var i = 0; i < lines.length; i++) {
      var row = [];
      var current = "";
      var inQuotes = false;
      var line = lines[i];
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

  // ── Extraer número de fecha de la cadena (ej: "17" de "17/10/2026") ─────
  function extractDay(fechaStr) {
    if (!fechaStr) return null;
    var match = fechaStr.match(/^(\d+)/);
    return match ? match[1] : null;
  }

  // ── Sanitizar texto para evitar XSS ─────────────────────────────────────
  function esc(str) {
    var d = document.createElement("div");
    d.textContent = str || "";
    return d.innerHTML;
  }

  // ── Filtrar anuncios según fecha seleccionada ────────────────────────────
  function filterListings() {
    if (activeFecha === "all") return allListings;
    return allListings.filter(function (row) {
      var fechas = row[COL.fechas] || "";
      return fechas.indexOf(activeFecha) !== -1;
    });
  }

  // ── Renderizar una tarjeta de anuncio ────────────────────────────────────
  function renderCard(row) {
    var nombre = esc(row[COL.nombre] || "Vendedor");
    var instagram = esc(row[COL.instagram] || "");
    var fechas = esc(row[COL.fechas] || "—");
    var zonas = esc(row[COL.zonas] || "—");
    var cantidad = esc(row[COL.cantidad] || "—");
    var precio = esc(row[COL.precio] || "—");
    var whatsapp = row[COL.whatsapp] ? esc(row[COL.whatsapp]) : null;

    var contactHtml = "";
    if (instagram) {
      contactHtml +=
        '<a href="https://instagram.com/' +
        instagram.replace("@", "") +
        '" target="_blank" rel="noopener noreferrer" class="contact-btn contact-btn--ig">📷 @' +
        instagram.replace("@", "") +
        "</a>";
    }
    if (whatsapp) {
      contactHtml +=
        '<a href="https://wa.me/' +
        whatsapp.replace(/\D/g, "") +
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
    var grid = document.getElementById("listings-grid");
    var countEl = document.getElementById("dir-count");

    countEl.textContent =
      filtered.length + " anuncio" + (filtered.length !== 1 ? "s" : "") + " publicado" + (filtered.length !== 1 ? "s" : "");

    if (filtered.length === 0) {
      grid.innerHTML =
        '<div class="empty-state"><p>No hay anuncios para esta fecha todavía.</p></div>';
      return;
    }

    grid.innerHTML = filtered.map(renderCard).join("");
  }

  // ── Inicializar filtros de fecha ─────────────────────────────────────────
  function initFilters() {
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

  // ── Cargar CSV desde Google Sheets ──────────────────────────────────────
  function loadData() {
    var grid = document.getElementById("listings-grid");

    fetch(CSV_URL)
      .then(function (res) {
        if (!res.ok) throw new Error("Error al cargar datos");
        return res.text();
      })
      .then(function (text) {
        var rows = parseCSV(text);
        // Fila 0 = encabezados, las demás son datos
        allListings = rows.slice(1).filter(function (row) {
          return row[COL.estado] === "2-Aprobado";
        });
        render();
      })
      .catch(function () {
        grid.innerHTML =
          '<div class="empty-state"><p>No se pudieron cargar los anuncios. Intenta recargar la página.</p></div>';
      });
  }

  // ── Arranque ─────────────────────────────────────────────────────────────
  function init() {
    initFilters();
    loadData();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
