const stateButtons = [...document.querySelectorAll("[data-state-button]")];
const stateMessage = document.querySelector("#stateMessage");
const stagesGrid = document.querySelector("#stagesGrid");
const passportList = document.querySelector("#passportList");
const acceptanceList = document.querySelector("#acceptanceList");
const chatMessages = document.querySelector("#chatMessages");
const issuesList = document.querySelector("#issuesList");
const photoReportGrid = document.querySelector("#photoReportGrid");
const actionsList = document.querySelector("#actionsList");
const updatesList = document.querySelector("#updatesList");
const clientSummaryGrid = document.querySelector("#clientSummaryGrid");
const stageFilterButtons = [...document.querySelectorAll("[data-stage-filter]")];
const issueFilterButtons = [...document.querySelectorAll("[data-issue-filter]")];
let activeStageFilter = "all";
let activeIssueFilter = "all";

const mockData = {
  objectName: "Ремонт квартиры",
  passport: [
    {
      label: "Адрес",
      value: "Учебный объект, без реального адреса",
    },
    {
      label: "Срок",
      value: "18 июня - 12 июля",
    },
    {
      label: "Текущий фокус",
      value: "Сантехника и фото кухни",
    },
    {
      label: "Ответственный",
      value: "Прораб Алексей",
    },
  ],
  acceptance: [
    {
      title: "Черновые работы можно показывать",
      status: "ready",
      statusText: "Готово",
      text: "Демонтаж и подготовка поверхностей закрыты.",
    },
    {
      title: "Фото кухни нужно добавить",
      status: "progress",
      statusText: "В работе",
      text: "Это главный пункт перед следующим отчетом заказчику.",
    },
    {
      title: "Отделку пока не начинать",
      status: "waiting",
      statusText: "Ожидает",
      text: "Ждем приемку электрики и сантехники.",
    },
  ],
  photos: [
    {
      title: "Кухня перед закрытием стен",
      stage: "Электрика",
      status: "Нужно показать",
      tone: "attention",
      text: "Фото нужно добавить в следующий отчет по просьбе заказчика.",
    },
    {
      title: "Сантехнические выводы",
      stage: "Сантехника",
      status: "На проверке",
      tone: "progress",
      text: "Соединения собраны, завтра прораб фиксирует результат.",
    },
    {
      title: "Демонтаж после вывоза мусора",
      stage: "Демонтаж",
      status: "Принято",
      tone: "done",
      text: "Зона очищена, этап закрыт без дополнительных вопросов.",
    },
  ],
  actions: [
    {
      title: "Сделать фото кухни перед закрытием стен",
      date: "Сегодня до 18:00",
      owner: "Прораб",
      link: "Связано с замечанием заказчика",
    },
    {
      title: "Проверить сантехнические соединения",
      date: "Завтра утром",
      owner: "Сантехник",
      link: "После проверки можно закрывать этап",
    },
    {
      title: "Согласовать старт отделочных работ",
      date: "После приемки коммуникаций",
      owner: "Прораб и заказчик",
      link: "Следующий этап после электрики и сантехники",
    },
  ],
  updates: [
    {
      date: "26 июня",
      title: "Добавлен запрос на фото кухни",
      text: "Заказчик попросил показать зону перед закрытием стен.",
    },
    {
      date: "25 июня",
      title: "Сантехника перешла в работу",
      text: "Выводы воды собраны, проверка соединений запланирована на утро.",
    },
    {
      date: "21 июня",
      title: "Черновые работы закрыты",
      text: "Стены выровнены, поверхности готовы к коммуникациям.",
    },
  ],
  clientSummary: [
    {
      label: "Общий статус",
      title: "Ремонт идет по плану",
      text: "Закрыты 2 этапа, в работе электрика и сантехника.",
    },
    {
      label: "Что важно",
      title: "Нужно показать кухню",
      text: "Перед закрытием стен прораб добавит отдельное фото.",
    },
    {
      label: "Следующий шаг",
      title: "Проверка коммуникаций",
      text: "После приемки можно согласовать старт отделки.",
    },
  ],
  issues: [
    {
      title: "Розетка у рабочего стола",
      status: "new",
      statusText: "Новое",
      text: "Заказчик просит поднять точку на 10 см перед закрытием стены.",
    },
    {
      title: "Фото кухни перед приемкой",
      status: "progress",
      statusText: "В работе",
      text: "Прораб готовит отдельный фотоотчет по зоне кухни.",
    },
    {
      title: "Вывоз мусора после демонтажа",
      status: "closed",
      statusText: "Закрыто",
      text: "Мусор вывезен, этап демонтажа принят без дополнительных вопросов.",
    },
  ],
  messages: [
    {
      author: "Заказчик",
      role: "client",
      time: "25 июня, 18:20",
      text: "Покажите фото зоны кухни перед закрытием стен.",
    },
    {
      author: "Прораб",
      role: "foreman",
      time: "25 июня, 18:35",
      text: "Фото добавим в следующий отчет. Сейчас проверяем электрику и сантехнику.",
    },
    {
      author: "Прораб",
      role: "foreman",
      time: "26 июня, 10:15",
      text: "Сантехника в работе, соединения проверяем завтра утром.",
    },
  ],
  stages: [
    {
      id: "demontazh",
      title: "Демонтаж",
      status: "done",
      statusText: "Завершено",
      date: "Обновлено: 18 июня",
      comment: "старые покрытия сняты, мусор вывезен, помещение подготовлено к черновым работам.",
    },
    {
      id: "chernye-raboty",
      title: "Черновые работы",
      status: "done",
      statusText: "Завершено",
      date: "Обновлено: 21 июня",
      comment: "стены выровнены, подготовлены основные поверхности и проверены зоны под коммуникации.",
    },
    {
      id: "elektrika",
      title: "Электрика",
      status: "active",
      statusText: "В работе",
      date: "Обновлено: 24 июня",
      comment: "проложены основные линии, осталось проверить группы розеток и подготовить фотоотчет.",
    },
    {
      id: "santehnika",
      title: "Сантехника",
      status: "active",
      statusText: "В работе",
      date: "Обновлено: 25 июня",
      comment: "выводы воды собраны, завтра проверяем соединения и фиксируем результат на фото.",
    },
    {
      id: "otdelochnye-raboty",
      title: "Отделочные работы",
      status: "waiting",
      statusText: "Ожидает",
      date: "План: после приемки коммуникаций",
      comment: "этап начнется после подтверждения электрики и сантехники заказчиком.",
    },
  ],
};

const stateCopy = {
  filled: {
    text: "Данные по этапам показаны.",
    className: "",
  },
  empty: {
    text: "Этапы ремонта пока не добавлены",
    className: "is-empty",
  },
  error: {
    text: "Не удалось показать данные этапа",
    className: "is-error",
  },
  success: {
    text: "Этап завершён",
    className: "is-success",
  },
};

function setState(nextState) {
  const selectedState = stateCopy[nextState] ? nextState : "filled";
  const selectedCopy = stateCopy[selectedState];

  document.body.dataset.viewState = selectedState;
  stateMessage.textContent = selectedCopy.text;
  stateMessage.className = `state-message ${selectedCopy.className}`.trim();
  stagesGrid.setAttribute("aria-busy", selectedState === "error" ? "true" : "false");

  stateButtons.forEach((button) => {
    const isActive = button.dataset.stateButton === selectedState;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderChat() {
  if (!chatMessages) {
    return;
  }

  chatMessages.innerHTML = "";

  mockData.messages.forEach((message) => {
    const item = document.createElement("li");
    item.className = `chat-message is-${message.role}`;

    const meta = document.createElement("div");
    meta.className = "chat-meta";

    const author = document.createElement("strong");
    author.textContent = message.author;

    const time = document.createElement("span");
    time.textContent = message.time;

    const text = document.createElement("p");
    text.textContent = message.text;

    meta.append(author, time);
    item.append(meta, text);
    chatMessages.append(item);
  });
}

function renderPassport() {
  if (!passportList) {
    return;
  }

  passportList.innerHTML = "";

  mockData.passport.forEach((item) => {
    const row = document.createElement("div");
    row.className = "passport-item";

    const label = document.createElement("dt");
    label.textContent = item.label;

    const value = document.createElement("dd");
    value.textContent = item.value;

    row.append(label, value);
    passportList.append(row);
  });
}

function renderAcceptance() {
  if (!acceptanceList) {
    return;
  }

  acceptanceList.innerHTML = "";

  mockData.acceptance.forEach((item) => {
    const row = document.createElement("li");
    row.className = `acceptance-item is-${item.status}`;

    const marker = document.createElement("span");
    marker.className = "acceptance-marker";
    marker.textContent = item.statusText;

    const content = document.createElement("div");
    content.className = "acceptance-content";

    const title = document.createElement("strong");
    title.textContent = item.title;

    const text = document.createElement("p");
    text.textContent = item.text;

    content.append(title, text);
    row.append(marker, content);
    acceptanceList.append(row);
  });
}

function renderIssues() {
  if (!issuesList) {
    return;
  }

  issuesList.innerHTML = "";

  const visibleIssues = mockData.issues.filter((issue) => {
    return activeIssueFilter === "all" || issue.status === activeIssueFilter;
  });

  if (visibleIssues.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "issue-item is-empty";
    emptyItem.textContent = "Замечаний с таким статусом нет.";
    issuesList.append(emptyItem);
    return;
  }

  visibleIssues.forEach((issue) => {
    const item = document.createElement("li");
    item.className = `issue-item is-${issue.status}`;

    const topline = document.createElement("div");
    topline.className = "issue-topline";

    const title = document.createElement("strong");
    title.textContent = issue.title;

    const badge = document.createElement("span");
    badge.className = "issue-badge";
    badge.textContent = issue.statusText;

    const text = document.createElement("p");
    text.textContent = issue.text;

    topline.append(title, badge);
    item.append(topline, text);
    issuesList.append(item);
  });
}

function renderStages() {
  if (!stagesGrid) {
    return;
  }

  stagesGrid.innerHTML = "";

  const visibleStages = mockData.stages.filter((stage) => {
    return activeStageFilter === "all" || stage.status === activeStageFilter;
  });

  if (visibleStages.length === 0) {
    const emptyCard = document.createElement("article");
    emptyCard.className = "stage-card is-empty";
    emptyCard.textContent = "Этапов с таким статусом нет.";
    stagesGrid.append(emptyCard);
    return;
  }

  visibleStages.forEach((stage) => {
    const card = document.createElement("article");
    card.className = `stage-card is-${stage.status}`;

    const photo = document.createElement("div");
    photo.className = "photo-placeholder";

    const photoSpan = document.createElement("span");
    photoSpan.textContent = "Фото этапа";
    photo.append(photoSpan);

    const content = document.createElement("div");
    content.className = "stage-content";

    const status = document.createElement("span");
    status.className = "status";
    status.textContent = stage.statusText;

    const title = document.createElement("h3");
    title.textContent = stage.title;

    const date = document.createElement("p");
    date.className = "date";
    date.textContent = stage.date;

    const comment = document.createElement("p");
    comment.textContent = `Прораб: ${stage.comment}`;

    content.append(status, title, date, comment);
    card.append(photo, content);
    stagesGrid.append(card);
  });
}

function renderPhotoReport() {
  if (!photoReportGrid) {
    return;
  }

  photoReportGrid.innerHTML = "";

  mockData.photos.forEach((photo) => {
    const card = document.createElement("article");
    card.className = `photo-card is-${photo.tone}`;

    const preview = document.createElement("div");
    preview.className = "photo-preview";
    preview.setAttribute("aria-hidden", "true");

    const previewLabel = document.createElement("span");
    previewLabel.textContent = "Фото";
    preview.append(previewLabel);

    const content = document.createElement("div");
    content.className = "photo-card-content";

    const meta = document.createElement("span");
    meta.className = "photo-meta";
    meta.textContent = photo.stage;

    const title = document.createElement("h3");
    title.textContent = photo.title;

    const status = document.createElement("strong");
    status.textContent = photo.status;

    const text = document.createElement("p");
    text.textContent = photo.text;

    content.append(meta, title, status, text);
    card.append(preview, content);
    photoReportGrid.append(card);
  });
}

function renderActions() {
  if (!actionsList) {
    return;
  }

  actionsList.innerHTML = "";

  mockData.actions.forEach((action, index) => {
    const item = document.createElement("li");
    item.className = "action-item";

    const number = document.createElement("span");
    number.className = "action-number";
    number.textContent = String(index + 1).padStart(2, "0");

    const content = document.createElement("div");
    content.className = "action-content";

    const title = document.createElement("strong");
    title.textContent = action.title;

    const meta = document.createElement("p");
    meta.textContent = `${action.date} · ${action.owner}`;

    const link = document.createElement("span");
    link.textContent = action.link;

    content.append(title, meta, link);
    item.append(number, content);
    actionsList.append(item);
  });
}

function renderUpdates() {
  if (!updatesList) {
    return;
  }

  updatesList.innerHTML = "";

  mockData.updates.forEach((update) => {
    const item = document.createElement("li");
    item.className = "update-item";

    const date = document.createElement("time");
    date.textContent = update.date;

    const content = document.createElement("div");
    content.className = "update-content";

    const title = document.createElement("strong");
    title.textContent = update.title;

    const text = document.createElement("p");
    text.textContent = update.text;

    content.append(title, text);
    item.append(date, content);
    updatesList.append(item);
  });
}

function renderClientSummary() {
  if (!clientSummaryGrid) {
    return;
  }

  clientSummaryGrid.innerHTML = "";

  mockData.clientSummary.forEach((summary) => {
    const card = document.createElement("article");
    card.className = "client-summary-card";

    const label = document.createElement("span");
    label.textContent = summary.label;

    const title = document.createElement("strong");
    title.textContent = summary.title;

    const text = document.createElement("p");
    text.textContent = summary.text;

    card.append(label, title, text);
    clientSummaryGrid.append(card);
  });
}

function updateSummary() {
  const done = mockData.stages.filter((s) => s.status === "done").length;
  const active = mockData.stages.filter((s) => s.status === "active").length;
  const waiting = mockData.stages.filter((s) => s.status === "waiting").length;

  const summaryDone = document.querySelector('[data-summary="done"]');
  const summaryActive = document.querySelector('[data-summary="active"]');
  const summaryWaiting = document.querySelector('[data-summary="waiting"]');

  if (summaryDone) {
    summaryDone.querySelector("strong").textContent = `${done} этапа`;
  }
  if (summaryActive) {
    summaryActive.querySelector("strong").textContent = `${active} этапа`;
  }
  if (summaryWaiting) {
    summaryWaiting.querySelector("strong").textContent = `${waiting} этап`;
  }
}

stateButtons.forEach((button) => {
  button.addEventListener("click", () => setState(button.dataset.stateButton));
});

stageFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeStageFilter = button.dataset.stageFilter || "all";

    stageFilterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    renderStages();
  });
});

issueFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeIssueFilter = button.dataset.issueFilter || "all";

    issueFilterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    renderIssues();
  });
});

renderIssues();
renderPassport();
renderAcceptance();
renderChat();
renderStages();
renderPhotoReport();
renderActions();
renderUpdates();
renderClientSummary();
updateSummary();
setState("filled");
