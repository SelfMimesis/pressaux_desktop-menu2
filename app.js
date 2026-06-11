const visibleLabels = {
  "FreeCommerce": "FJCF",
  "Apartment A9": "RDJ-T",
  "System": "DJFC",
  "Data Stream": "VD?FLLT",
  "Energy": "FCLL?LT",
  "Access": "DL?TL",
  "Transport": "T?CGE?)",
  "Market": "DJ?TJFE",
  "Network": "TL?NF UFDJFC",
  "Security": "JLL?I?LL?J D?CV?R"
};

// Edita esta lista para cambiar los textos de las notificaciones del panel derecho.
const modules = [
  ["TL?NF TALUCA", "INFO"],
  ["TL?NF TJ?I?H?L", "INFO"],
  ["TL?NF C?LL?DGL", "INFO"],
  ["TL?NF C?D?JFC", "INFO"],
  ["TL?NF CLL?JT?JT?FL", "INFO"],
  ["TL?NF J?C?P?J?R", "INFO"],
  ["TL?NF RJ?TLL?DF", "INFO"],
  ["TL?NF TLL?T?VLL?TT", "INFO"],
  ["TL?NF N?C?T?LL", "INFO"],
  ["TL?NF D?CF?TF?CR", "INFO"],
  ["TL?NF ?CLT?C?V?TD", "INFO"],
  ["TL?NF F?LLC/J?T", "INFO"],
  ["TL?NF R?FLVD?M", "INFO"],
  ["TL?NF TCF?LL?Y!!", "INFO"],
  ["TL?NF ?V?TLD?FL", "INFO"],
  ["TL?NF J?TF?C!!", "INFO"]
];

// Datos de los popups. Las cadenas estan escritas para parecerse al texto visible de la referencia.
const panelData = {
  "FreeCommerce": {
    title: "ICFF? J/D UFC?V?F?J",
    chip: "JLL?I?LL?J C?LLC?LL?J?T",
    symbol: "T U ZP : L UJ7",
    fields: [
      ["UFC?VFR?TFR", "C?T?D?"],
      ["J?TL?V?J", "UF?T?C?T?F UFC?VFR?TFR"]
    ]
  },
  "Apartment A9": {
    title: "RDJ-T J/D C?LLC?LL",
    chip: "C?R?TC UFDJFC A9",
    symbol: "A 9 : L UJ7",
    fields: [
      ["RDJ-T V?C?R", "C?T?D?"],
      ["J?TL?V?J", "UF?T?C?T?F C?LLC"]
    ]
  },
  "System": {
    title: "DJFC J/D UFC?V?F?J",
    chip: "C?R?TC TLL?TV?M",
    symbol: "D J F C",
    fields: [
      ["DJFC V?C?R", "C?T?D?"],
      ["J?TL?V?J", "TLL?TV?M UFC?VFR?TFR"]
    ]
  },
  "Data Stream": {
    title: "VD?FLLT J/D UFC?V?F?J",
    chip: "JLL?I?LL?J C?LLC?LL?J?T",
    symbol: "V D : F L",
    fields: [
      ["VD?FLLT", "C?T?D?"],
      ["J?TL?V?J", "UF?T?C?T?F VD?FLLT"]
    ]
  },
  "Energy": {
    title: "FCLL?LT J/D C?LLC?LL",
    chip: "JLL?I?LL?J FCLL?LT",
    symbol: "F C : L T",
    fields: [
      ["FCLL?LT V?C?R", "C?T?D?"],
      ["J?TL?V?J", "UF?T?C?T?F FCLL?LT"]
    ]
  },
  "Access": {
    title: "DL?TL J/D UFC?V?F?J",
    chip: "JLL?I?LL?J C?LLC?LL?J?T",
    symbol: "D L : T L",
    fields: [
      ["UFC?VFR?TFR", "C?T?D?"],
      ["J?TL?V?J", "UF?T?C?T?F DL?TL"]
    ]
  },
  "Transport": {
    title: "T?CGE?) J/D C?LLC?LL",
    chip: "C?R?TC T?CGE?)",
    symbol: "T C : G E",
    fields: [
      ["T?CGE?) V?C?R", "C?T?D?"],
      ["J?TL?V?J", "UF?T?C?T?F T?CGE?)"]
    ]
  },
  "Market": {
    title: "DJ?TJFE J/D UFC?V?F?J",
    chip: "JLL?I?LL?J DJ?TJFE",
    symbol: "D J : T F",
    fields: [
      ["DJ?TJFE V?C?R", "C?T?D?"],
      ["J?TL?V?J", "UF?T?C?T?F DJ?TJFE"]
    ]
  },
  "Network": {
    title: "TL?NF UFDJFC",
    chip: "JLL?I?LL?J D?CV?R FJCR",
    symbol: "T L : N F",
    fields: [
      ["TL?NF V?C?R", "C?T?D?"],
      ["J?TL?V?J", "UF?T?C?T?F TL?NF"]
    ]
  },
  "Security": {
    title: "JLL?I?LL?J D?CV?R",
    chip: "C?R?TC JLL?I?LL?J",
    symbol: "J L : D C",
    fields: [
      ["JLL?I?LL?J", "C?T?D?"],
      ["J?TL?V?J", "UF?T?C?T?F D?CV?R"]
    ]
  }
};

const moduleList = document.getElementById("moduleList");
const popupLayer = document.getElementById("popupLayer");
const popupClose = document.getElementById("popupClose");
const popupTitle = document.getElementById("popupTitle");
const popupCode = document.getElementById("popupCode");
const popupStatus = document.getElementById("popupStatus");
const popupFields = document.getElementById("popupFields");
const popupConfirm = document.getElementById("popupConfirm");

let activePanel = "FreeCommerce";
let hotIndex = 0;

function buildFeed() {
  moduleList.innerHTML = modules.map(([text, tag], index) => `
    <article class="feed-item${index === 0 ? " is-hot" : ""}">
      <strong>${text}</strong>
      <span>${tag}</span>
    </article>
  `).join("");
}

function cycleFeed() {
  const rows = [...document.querySelectorAll(".feed-item")];
  rows.forEach((row, index) => {
    row.classList.toggle("is-hot", index === hotIndex);
    row.classList.toggle("is-fading", index > 9 && index !== hotIndex);
  });
  hotIndex = (hotIndex + 1) % rows.length;
}

function setActiveTab(panelName) {
  activePanel = panelName;
  document.querySelectorAll("[data-panel]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.panel === panelName);
  });
}

function openPopup(panelName) {
  const data = panelData[panelName] || panelData.FreeCommerce;
  setActiveTab(panelName);

  popupTitle.textContent = data.title;
  popupCode.textContent = data.chip;
  popupStatus.textContent = data.symbol;
  popupFields.innerHTML = data.fields.map(([label, value], index) => `
    <div class="field-row">
      <label for="popup-field-${index}">${label}</label>
      <input id="popup-field-${index}" value="${value}" aria-label="${label}">
    </div>
  `).join("");

  popupLayer.classList.add("is-open");
  popupLayer.setAttribute("aria-hidden", "false");
  popupClose.focus({ preventScroll: true });
}

function closePopup() {
  popupLayer.classList.remove("is-open");
  popupLayer.setAttribute("aria-hidden", "true");
}

function openInitialPanelFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const queryPanel = params.get("panel");
  const hashPanel = decodeURIComponent(window.location.hash.replace("#", ""));
  const requestedPanel = queryPanel || hashPanel;

  if (requestedPanel && panelData[requestedPanel]) {
    window.setTimeout(() => openPopup(requestedPanel), 160);
  }
}

function bindEvents() {
  document.querySelectorAll("[data-panel]").forEach((button) => {
    button.addEventListener("click", () => openPopup(button.dataset.panel));
  });

  popupClose.addEventListener("click", closePopup);
  popupLayer.addEventListener("click", (event) => {
    if (event.target === popupLayer) {
      closePopup();
    }
  });

  popupConfirm.addEventListener("click", () => {
    closePopup();
    hotIndex = modules.findIndex(([text]) => text.includes(visibleLabels[activePanel]?.slice(0, 4) || "TL?NF"));
    if (hotIndex < 0) hotIndex = 0;
    cycleFeed();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePopup();
    }
  });
}

buildFeed();
bindEvents();
cycleFeed();
openInitialPanelFromUrl();

// Cambia este intervalo para acelerar o ralentizar la animacion de notificaciones.
window.setInterval(cycleFeed, 2400);
