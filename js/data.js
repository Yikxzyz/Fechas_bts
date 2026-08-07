/**
 * BTS ARIRANG World Tour — datos de conciertos y canciones sorpresa
 * Actualizado: 6 de agosto de 2026
 * Fuentes: Wikipedia, Forbes, Billboard
 */

const TOUR_INFO = {
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

const CONCERTS = [
  // ——— Asia (inicio) ———
  { date: "2026-04-09", city: "Goyang", country: "Corea del Sur", venue: "Goyang Stadium", region: "asia", surpriseSongs: ["Mikrokosmos", "I Need U"] },
  { date: "2026-04-11", city: "Goyang", country: "Corea del Sur", venue: "Goyang Stadium", region: "asia", surpriseSongs: ["Take Two", "DNA"] },
  { date: "2026-04-12", city: "Goyang", country: "Corea del Sur", venue: "Goyang Stadium", region: "asia", surpriseSongs: ["Spring Day", "Run"] },
  { date: "2026-04-17", city: "Tokio", country: "Japón", venue: "Tokyo Dome", region: "asia", surpriseSongs: ["Save Me", "Crystal Snow"] },
  { date: "2026-04-18", city: "Tokio", country: "Japón", venue: "Tokyo Dome", region: "asia", surpriseSongs: ["Dope", "For You"] },

  // ——— Norteamérica (leg 1) ———
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

  // ——— Asia (Busan) ———
  { date: "2026-06-12", city: "Busan", country: "Corea del Sur", venue: "Busan Asiad Main Stadium", region: "asia", surpriseSongs: ["Paldogangsan", "Ma City"], note: "Bonus: One More Night (reemplazó Please)" },
  { date: "2026-06-13", city: "Busan", country: "Corea del Sur", venue: "Busan Asiad Main Stadium", region: "asia", surpriseSongs: ["Dimple", "Ddaeng", "Magic Shop"], note: "3 canciones sorpresa esta noche" },

  // ——— Europa ———
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

  // ——— Norteamérica (leg 2) ———
  { date: "2026-08-01", city: "East Rutherford", country: "Estados Unidos", venue: "MetLife Stadium", region: "north-america", surpriseSongs: ["Dis-ease", "Run"] },
  { date: "2026-08-02", city: "East Rutherford", country: "Estados Unidos", venue: "MetLife Stadium", region: "north-america", surpriseSongs: ["Autumn Leaves", "Go Go"] },
  { date: "2026-08-05", city: "Foxborough", country: "Estados Unidos", venue: "Gillette Stadium", region: "north-america", surpriseSongs: ["Paradise", "No More Dream"] },
  { date: "2026-08-06", city: "Foxborough", country: "Estados Unidos", venue: "Gillette Stadium", region: "north-america", surpriseSongs: null },
  { date: "2026-08-10", city: "Baltimore", country: "Estados Unidos", venue: "M&T Bank Stadium", region: "north-america", surpriseSongs: null },
  { date: "2026-08-11", city: "Baltimore", country: "Estados Unidos", venue: "M&T Bank Stadium", region: "north-america", surpriseSongs: null },
  { date: "2026-08-15", city: "Arlington", country: "Estados Unidos", venue: "AT&T Stadium", region: "north-america", surpriseSongs: null },
  { date: "2026-08-16", city: "Arlington", country: "Estados Unidos", venue: "AT&T Stadium", region: "north-america", surpriseSongs: null },
  { date: "2026-08-22", city: "Toronto", country: "Canadá", venue: "Rogers Stadium", region: "north-america", surpriseSongs: null },
  { date: "2026-08-23", city: "Toronto", country: "Canadá", venue: "Rogers Stadium", region: "north-america", surpriseSongs: null },
  { date: "2026-08-27", city: "Chicago", country: "Estados Unidos", venue: "Soldier Field", region: "north-america", surpriseSongs: null },
  { date: "2026-08-28", city: "Chicago", country: "Estados Unidos", venue: "Soldier Field", region: "north-america", surpriseSongs: null },
  { date: "2026-09-01", city: "Los Ángeles", country: "Estados Unidos", venue: "SoFi Stadium", region: "north-america", surpriseSongs: null },
  { date: "2026-09-02", city: "Los Ángeles", country: "Estados Unidos", venue: "SoFi Stadium", region: "north-america", surpriseSongs: null },
  { date: "2026-09-05", city: "Los Ángeles", country: "Estados Unidos", venue: "SoFi Stadium", region: "north-america", surpriseSongs: null },
  { date: "2026-09-06", city: "Los Ángeles", country: "Estados Unidos", venue: "SoFi Stadium", region: "north-america", surpriseSongs: null },

  // ——— Sudamérica ———
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

  // ——— Asia (leg 2) ———
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

  // ——— Oceanía ———
  { date: "2027-02-10", city: "Melbourne", country: "Australia", venue: "Marvel Stadium", region: "oceania", surpriseSongs: null },
  { date: "2027-02-12", city: "Melbourne", country: "Australia", venue: "Marvel Stadium", region: "oceania", surpriseSongs: null },
  { date: "2027-02-13", city: "Melbourne", country: "Australia", venue: "Marvel Stadium", region: "oceania", surpriseSongs: null },
  { date: "2027-02-20", city: "Sydney", country: "Australia", venue: "Accor Stadium", region: "oceania", surpriseSongs: null },
  { date: "2027-02-21", city: "Sydney", country: "Australia", venue: "Accor Stadium", region: "oceania", surpriseSongs: null },

  // ——— Asia (final) ———
  { date: "2027-03-04", city: "Hong Kong", country: "Hong Kong", venue: "Kai Tak Stadium", region: "asia", surpriseSongs: null },
  { date: "2027-03-06", city: "Hong Kong", country: "Hong Kong", venue: "Kai Tak Stadium", region: "asia", surpriseSongs: null },
  { date: "2027-03-07", city: "Hong Kong", country: "Hong Kong", venue: "Kai Tak Stadium", region: "asia", surpriseSongs: null },
  { date: "2027-03-13", city: "Bulacan", country: "Filipinas", venue: "Philippine Sports Stadium", region: "asia", surpriseSongs: null },
  { date: "2027-03-14", city: "Bulacan", country: "Filipinas", venue: "Philippine Sports Stadium", region: "asia", surpriseSongs: null },
  { date: "2027-03-16", city: "Bulacan", country: "Filipinas", venue: "Philippine Sports Stadium", region: "asia", surpriseSongs: null },
];

const REGION_LABELS = {
  all: "Todos",
  asia: "Asia",
  europe: "Europa",
  "north-america": "Norteamérica",
  "south-america": "Sudamérica",
  oceania: "Oceanía",
};

window.TOUR_DATA = { TOUR_INFO, CONCERTS, REGION_LABELS };
