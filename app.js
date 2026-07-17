const stateButtons = [...document.querySelectorAll("[data-state-button]")];
const stateMessage = document.querySelector("#stateMessage");
const stagesGrid = document.querySelector("#stagesGrid");
const chatMessages = document.querySelector("#chatMessages");
const issuesList = document.querySelector("#issuesList");
const issueFilterButtons = [...document.querySelectorAll("[data-issue-filter]")];
let activeIssueFilter = "all";

const mockData = {
  objectName: "Ремонт квартиры",
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

  mockData.stages.forEach((stage) => {
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
renderChat();
renderStages();
updateSummary();
setState("filled");
