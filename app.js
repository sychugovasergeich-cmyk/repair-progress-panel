const stateButtons = [...document.querySelectorAll("[data-state-button]")];
const objectList = document.querySelector("#objectList");
const pageTitle = document.querySelector("#pageTitle");
const heroText = document.querySelector("#heroText");
const objectLabel = document.querySelector("#objectLabel");
const progressValue = document.querySelector("#progressValue");
const progressBar = document.querySelector("#progressBar");
const progressFocus = document.querySelector("#progressFocus");
const stateMessage = document.querySelector("#stateMessage");
const stagesGrid = document.querySelector("#stagesGrid");
const passportList = document.querySelector("#passportList");
const acceptanceList = document.querySelector("#acceptanceList");
const clientNoteText = document.querySelector("#clientNoteText");
const clientNoteResponse = document.querySelector("#clientNoteResponse");
const chatMessages = document.querySelector("#chatMessages");
const issuesList = document.querySelector("#issuesList");
const photoReportGrid = document.querySelector("#photoReportGrid");
const photoUploadForm = document.querySelector("#photoUploadForm");
const photoFileInput = document.querySelector("#photoFileInput");
const photoStageInput = document.querySelector("#photoStageInput");
const photoTitleInput = document.querySelector("#photoTitleInput");
const photoCommentInput = document.querySelector("#photoCommentInput");
const photoUploadStatus = document.querySelector("#photoUploadStatus");
const issueForm = document.querySelector("#issueForm");
const issueTitleInput = document.querySelector("#issueTitleInput");
const issueTextInput = document.querySelector("#issueTextInput");
const issueStatusInput = document.querySelector("#issueStatusInput");
const issueFormStatus = document.querySelector("#issueFormStatus");
const actionsList = document.querySelector("#actionsList");
const updatesList = document.querySelector("#updatesList");
const clientSummaryGrid = document.querySelector("#clientSummaryGrid");
const stageFilterButtons = [...document.querySelectorAll("[data-stage-filter]")];
const issueFilterButtons = [...document.querySelectorAll("[data-issue-filter]")];
let activeStageFilter = "all";
let activeIssueFilter = "all";

const baseObject = {
  id: "lesnaya-14",
  objectName: "Ремонт квартиры",
  address: "ул. Лесная, 14",
  progress: 62,
  focus: "Сантехника и подготовка к отделке",
  heroText:
    "Ремонт квартиры: спокойный экран для показа заказчику, что уже сделано, что сейчас в работе и где есть замечания.",
  clientNote: "Пожалуйста, отдельно покажите фото зоны кухни перед закрытием стен.",
  clientResponse: "Ответ прораба: добавим фото в следующий отчет.",
  passport: [
    {
      label: "Адрес",
      value: "Учебный адрес: ул. Лесная, 14",
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

const projectObjects = [
  baseObject,
  {
    id: "mira-8",
    objectName: "Ремонт квартиры",
    address: "пр. Мира, 8",
    progress: 38,
    focus: "Черновые работы и согласование электрики",
    heroText:
      "Панель показывает ранний этап ремонта: что уже подготовлено, какие решения ждут согласования и что нужно проверить до коммуникаций.",
    clientNote: "Нужно заранее согласовать расположение розеток в спальне.",
    clientResponse: "Ответ прораба: схема розеток вынесена в ближайшие действия.",
    passport: [
      { label: "Адрес", value: "Учебный адрес: пр. Мира, 8" },
      { label: "Срок", value: "22 июня - 20 июля" },
      { label: "Текущий фокус", value: "Черновые работы и электрика" },
      { label: "Ответственный", value: "Прораб Илья" },
    ],
    acceptance: [
      {
        title: "Демонтаж можно показывать",
        status: "ready",
        statusText: "Готово",
        text: "Помещение освобождено и подготовлено к черновому этапу.",
      },
      {
        title: "Схема электрики требует решения",
        status: "progress",
        statusText: "В работе",
        text: "Нужно подтвердить розетки в спальне и зоне кухни.",
      },
      {
        title: "Отделка еще не готова к старту",
        status: "waiting",
        statusText: "Ожидает",
        text: "Сначала закрываем черновые работы и коммуникации.",
      },
    ],
    photos: [
      {
        title: "Комната после демонтажа",
        stage: "Демонтаж",
        status: "Принято",
        tone: "done",
        text: "Старые покрытия сняты, зона готова к черновым работам.",
      },
      {
        title: "Стены перед выравниванием",
        stage: "Черновые работы",
        status: "На проверке",
        tone: "progress",
        text: "Прораб проверяет поверхности перед следующим слоем.",
      },
      {
        title: "Зона будущей электрики",
        stage: "Электрика",
        status: "Нужно согласовать",
        tone: "attention",
        text: "Точки розеток нужно подтвердить до штробления.",
      },
    ],
    actions: [
      {
        title: "Согласовать схему розеток",
        date: "Сегодня до 17:00",
        owner: "Прораб",
        link: "Связано с замечанием заказчика",
      },
      {
        title: "Закончить выравнивание стен",
        date: "Завтра",
        owner: "Мастер",
        link: "После этого можно переходить к коммуникациям",
      },
      {
        title: "Подготовить фото чернового этапа",
        date: "После проверки стен",
        owner: "Прораб",
        link: "Фото попадет в следующий отчет",
      },
    ],
    updates: [
      {
        date: "27 июня",
        title: "Добавлено замечание по розеткам",
        text: "Заказчик просит согласовать точки в спальне.",
      },
      {
        date: "25 июня",
        title: "Начаты черновые работы",
        text: "Стены готовятся к выравниванию и проверке поверхностей.",
      },
      {
        date: "22 июня",
        title: "Демонтаж завершен",
        text: "Объект очищен, мусор вывезен.",
      },
    ],
    clientSummary: [
      {
        label: "Общий статус",
        title: "Ремонт на раннем этапе",
        text: "Завершен демонтаж, черновые работы идут по плану.",
      },
      {
        label: "Что важно",
        title: "Нужно согласовать электрику",
        text: "Без схемы розеток нельзя уверенно продолжать штробление.",
      },
      {
        label: "Следующий шаг",
        title: "Закрыть черновой этап",
        text: "После проверки стен можно готовить коммуникации.",
      },
    ],
    issues: [
      {
        title: "Розетки в спальне",
        status: "new",
        statusText: "Новое",
        text: "Заказчик хочет увидеть схему до начала электрики.",
      },
      {
        title: "Проверка стен",
        status: "progress",
        statusText: "В работе",
        text: "Мастер проверяет перепады перед выравниванием.",
      },
      {
        title: "Вывоз старых покрытий",
        status: "closed",
        statusText: "Закрыто",
        text: "Демонтажный мусор вывезен, зона свободна.",
      },
    ],
    messages: [
      {
        author: "Заказчик",
        role: "client",
        time: "27 июня, 11:10",
        text: "Покажите, где будут розетки в спальне.",
      },
      {
        author: "Прораб",
        role: "foreman",
        time: "27 июня, 11:25",
        text: "Подготовим схему и добавим ее в ближайший отчет.",
      },
      {
        author: "Прораб",
        role: "foreman",
        time: "27 июня, 16:40",
        text: "Черновые работы идут по графику, стены проверяем завтра.",
      },
    ],
    stages: [
      {
        id: "demontazh",
        title: "Демонтаж",
        status: "done",
        statusText: "Завершено",
        date: "Обновлено: 22 июня",
        comment: "старые покрытия сняты, мусор вывезен.",
      },
      {
        id: "chernye-raboty",
        title: "Черновые работы",
        status: "active",
        statusText: "В работе",
        date: "Обновлено: 25 июня",
        comment: "стены готовятся к выравниванию и проверке поверхностей.",
      },
      {
        id: "elektrika",
        title: "Электрика",
        status: "waiting",
        statusText: "Ожидает",
        date: "План: после схемы розеток",
        comment: "нужно согласовать точки перед началом работ.",
      },
      {
        id: "santehnika",
        title: "Сантехника",
        status: "waiting",
        statusText: "Ожидает",
        date: "План: после черновых работ",
        comment: "этап начнется после подготовки стен.",
      },
      {
        id: "otdelochnye-raboty",
        title: "Отделочные работы",
        status: "waiting",
        statusText: "Ожидает",
        date: "План: после коммуникаций",
        comment: "отделку пока не запускаем.",
      },
    ],
  },
  {
    id: "sadovaya-3",
    objectName: "Ремонт квартиры",
    address: "ул. Садовая, 3",
    progress: 78,
    focus: "Финишная отделка и приемка комнат",
    heroText:
      "Панель показывает объект на поздней стадии: большая часть работ закрыта, остались отделка и финальные замечания.",
    clientNote: "Проверьте оттенок краски в гостиной при дневном свете.",
    clientResponse: "Ответ прораба: добавим фото гостиной утром и отметим результат.",
    passport: [
      { label: "Адрес", value: "Учебный адрес: ул. Садовая, 3" },
      { label: "Срок", value: "10 июня - 5 июля" },
      { label: "Текущий фокус", value: "Отделка и приемка" },
      { label: "Ответственный", value: "Прораб Марина" },
    ],
    acceptance: [
      {
        title: "Коммуникации приняты",
        status: "ready",
        statusText: "Готово",
        text: "Электрика и сантехника закрыты без новых вопросов.",
      },
      {
        title: "Отделка почти завершена",
        status: "progress",
        statusText: "В работе",
        text: "Осталось проверить оттенок краски и плинтусы.",
      },
      {
        title: "Финальная уборка ожидает",
        status: "waiting",
        statusText: "Ожидает",
        text: "Запускается после закрытия отделочных замечаний.",
      },
    ],
    photos: [
      {
        title: "Гостиная после покраски",
        stage: "Отделочные работы",
        status: "Нужно показать",
        tone: "attention",
        text: "Фото нужно сделать утром при дневном свете.",
      },
      {
        title: "Санузел после монтажа",
        stage: "Сантехника",
        status: "Принято",
        tone: "done",
        text: "Сантехнический этап принят без дополнительных вопросов.",
      },
      {
        title: "Коридор перед плинтусами",
        stage: "Отделочные работы",
        status: "На проверке",
        tone: "progress",
        text: "Мастер готовит зону к финальному проходу.",
      },
    ],
    actions: [
      {
        title: "Сделать фото гостиной утром",
        date: "Завтра до 11:00",
        owner: "Прораб",
        link: "Связано с замечанием по краске",
      },
      {
        title: "Проверить плинтусы в коридоре",
        date: "Сегодня",
        owner: "Мастер",
        link: "Финальная проверка отделки",
      },
      {
        title: "Назначить приемку объекта",
        date: "После закрытия замечаний",
        owner: "Прораб и заказчик",
        link: "Финальный показ квартиры",
      },
    ],
    updates: [
      {
        date: "28 июня",
        title: "Отделка перешла к финальной проверке",
        text: "Остались плинтусы и фото гостиной.",
      },
      {
        date: "26 июня",
        title: "Сантехника принята",
        text: "Соединения проверены, замечаний нет.",
      },
      {
        date: "24 июня",
        title: "Электрика закрыта",
        text: "Группы розеток и освещения проверены.",
      },
    ],
    clientSummary: [
      {
        label: "Общий статус",
        title: "Объект близок к приемке",
        text: "Основные этапы закрыты, идет финальная отделка.",
      },
      {
        label: "Что важно",
        title: "Проверить цвет гостиной",
        text: "Фото нужно сделать при дневном свете перед финальным решением.",
      },
      {
        label: "Следующий шаг",
        title: "Закрыть отделочные мелочи",
        text: "После этого можно назначать приемку объекта.",
      },
    ],
    issues: [
      {
        title: "Оттенок краски в гостиной",
        status: "new",
        statusText: "Новое",
        text: "Заказчик просит фото при дневном освещении.",
      },
      {
        title: "Плинтусы в коридоре",
        status: "progress",
        statusText: "В работе",
        text: "Мастер проверяет стыки перед финальным отчетом.",
      },
      {
        title: "Проверка сантехники",
        status: "closed",
        statusText: "Закрыто",
        text: "Санузел принят, замечаний нет.",
      },
    ],
    messages: [
      {
        author: "Заказчик",
        role: "client",
        time: "28 июня, 09:40",
        text: "Нужно увидеть цвет гостиной при дневном свете.",
      },
      {
        author: "Прораб",
        role: "foreman",
        time: "28 июня, 10:05",
        text: "Сделаем фото завтра утром и добавим в отчет.",
      },
      {
        author: "Прораб",
        role: "foreman",
        time: "28 июня, 17:30",
        text: "Сантехника и электрика закрыты, проверяем отделочные детали.",
      },
    ],
    stages: [
      {
        id: "demontazh",
        title: "Демонтаж",
        status: "done",
        statusText: "Завершено",
        date: "Обновлено: 12 июня",
        comment: "помещение подготовлено к ремонту.",
      },
      {
        id: "chernye-raboty",
        title: "Черновые работы",
        status: "done",
        statusText: "Завершено",
        date: "Обновлено: 18 июня",
        comment: "стены и поверхности подготовлены.",
      },
      {
        id: "elektrika",
        title: "Электрика",
        status: "done",
        statusText: "Завершено",
        date: "Обновлено: 24 июня",
        comment: "линии и группы розеток проверены.",
      },
      {
        id: "santehnika",
        title: "Сантехника",
        status: "done",
        statusText: "Завершено",
        date: "Обновлено: 26 июня",
        comment: "соединения проверены, этап принят.",
      },
      {
        id: "otdelochnye-raboty",
        title: "Отделочные работы",
        status: "active",
        statusText: "В работе",
        date: "Обновлено: 28 июня",
        comment: "остались плинтусы и проверка цвета гостиной.",
      },
    ],
  },
];

const storageKey = "repair-progress-panel-data-v2";

loadSavedProjectData();

let mockData = projectObjects[0];

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

function loadSavedProjectData() {
  try {
    const savedData = JSON.parse(localStorage.getItem(storageKey) || "[]");

    savedData.forEach((savedObject) => {
      const targetObject = projectObjects.find((object) => object.id === savedObject.id);

      if (!targetObject) {
        return;
      }

      if (Array.isArray(savedObject.photos)) {
        targetObject.photos = savedObject.photos;
      }

      if (Array.isArray(savedObject.issues)) {
        targetObject.issues = savedObject.issues;
      }

      if (Array.isArray(savedObject.updates)) {
        targetObject.updates = savedObject.updates;
      }
    });
  } catch {
    localStorage.removeItem(storageKey);
  }
}

function saveProjectData() {
  try {
    const dataToSave = projectObjects.map((object) => ({
      id: object.id,
      issues: object.issues,
      photos: object.photos,
      updates: object.updates,
    }));

    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
    return true;
  } catch {
    return false;
  }
}

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

function setActiveButton(buttons, activeButton, dataName) {
  buttons.forEach((button) => {
    const isActive = button === activeButton;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));

    if (isActive && dataName) {
      return button.dataset[dataName];
    }

    return undefined;
  });
}

function updatePageHeader() {
  if (pageTitle) {
    pageTitle.textContent = `Панель прораба ${mockData.address}`;
  }

  if (heroText) {
    heroText.textContent = mockData.heroText;
  }

  if (objectLabel) {
    objectLabel.textContent = mockData.objectName;
  }

  if (progressValue) {
    progressValue.textContent = `${mockData.progress}% готово`;
  }

  if (progressBar) {
    progressBar.style.width = `${mockData.progress}%`;
  }

  if (progressFocus) {
    progressFocus.textContent = `Сейчас в фокусе: ${mockData.focus}.`;
  }

  if (clientNoteText) {
    clientNoteText.textContent = `“${mockData.clientNote}”`;
  }

  if (clientNoteResponse) {
    clientNoteResponse.textContent = mockData.clientResponse;
  }
}

function renderObjectMenu() {
  if (!objectList) {
    return;
  }

  objectList.innerHTML = "";

  projectObjects.forEach((object) => {
    const item = document.createElement("li");

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.objectId = object.id;
    button.className = object.id === mockData.id ? "is-active" : "";
    button.setAttribute("aria-pressed", String(object.id === mockData.id));

    const title = document.createElement("strong");
    title.textContent = `Панель прораба ${object.address}`;

    const meta = document.createElement("span");
    meta.textContent = `${object.progress}% готово · ${object.focus}`;

    button.append(title, meta);
    button.addEventListener("click", () => setActiveObject(object.id));

    item.append(button);
    objectList.append(item);
  });
}

function resetFilters() {
  activeStageFilter = "all";
  activeIssueFilter = "all";

  stageFilterButtons.forEach((button) => {
    const isActive = button.dataset.stageFilter === "all";
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  issueFilterButtons.forEach((button) => {
    const isActive = button.dataset.issueFilter === "all";
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderPanel() {
  updatePageHeader();
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
}

function setActiveObject(objectId) {
  const nextObject = projectObjects.find((object) => object.id === objectId);

  if (!nextObject) {
    return;
  }

  mockData = nextObject;
  resetFilters();
  renderObjectMenu();
  renderPanel();
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

function getIssueStatusText(status) {
  const labels = {
    closed: "Закрыто",
    new: "Новое",
    progress: "В работе",
  };

  return labels[status] || labels.new;
}

function setIssueFilter(nextFilter) {
  activeIssueFilter = nextFilter;

  issueFilterButtons.forEach((filterButton) => {
    const isActive = filterButton.dataset.issueFilter === nextFilter;
    filterButton.classList.toggle("is-active", isActive);
    filterButton.setAttribute("aria-pressed", String(isActive));
  });
}

function addObjectUpdate(title, text) {
  if (!mockData.updates) {
    mockData.updates = [];
  }

  mockData.updates.unshift({
    time: "Сейчас",
    title,
    text,
  });

  renderUpdates();
}

function readPhotoAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

function getPhotoTheme(text) {
  const normalizedText = text.toLowerCase();

  if (normalizedText.includes("кух") || normalizedText.includes("гостин")) {
    return "interior";
  }
  if (normalizedText.includes("сантех") || normalizedText.includes("сануз")) {
    return "plumbing";
  }
  if (normalizedText.includes("электр") || normalizedText.includes("розет")) {
    return "electric";
  }
  if (normalizedText.includes("демонтаж") || normalizedText.includes("мусор")) {
    return "demolition";
  }
  if (normalizedText.includes("чернов") || normalizedText.includes("стен")) {
    return "rough";
  }
  if (normalizedText.includes("отдел") || normalizedText.includes("плинтус") || normalizedText.includes("краск")) {
    return "finish";
  }

  return "site";
}

function getPhotoLabel(text) {
  const theme = getPhotoTheme(text);
  const labels = {
    demolition: "Демонтаж",
    electric: "Электрика",
    finish: "Отделка",
    interior: "Интерьер",
    plumbing: "Сантехника",
    rough: "Черновые",
    site: "Объект",
  };

  return labels[theme];
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
    photo.className = `photo-placeholder is-${getPhotoTheme(stage.title)}`;

    const photoSpan = document.createElement("span");
    photoSpan.textContent = getPhotoLabel(stage.title);
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
    preview.className = `photo-preview is-${getPhotoTheme(`${photo.title} ${photo.stage}`)}`;
    preview.setAttribute("aria-hidden", "true");

    if (photo.imageUrl) {
      const previewImage = document.createElement("img");
      previewImage.src = photo.imageUrl;
      previewImage.alt = "";
      preview.append(previewImage);
    } else {
      const previewLabel = document.createElement("span");
      previewLabel.textContent = getPhotoLabel(`${photo.title} ${photo.stage}`);
      preview.append(previewLabel);
    }

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

async function handlePhotoUpload(event) {
  event.preventDefault();

  const file = photoFileInput?.files?.[0];
  const title = photoTitleInput?.value.trim();
  const stage = photoStageInput?.value || "Объект";
  const comment = photoCommentInput?.value.trim();

  if (!file || !title) {
    if (photoUploadStatus) {
      photoUploadStatus.textContent = "Выберите фото и добавьте подпись.";
    }
    return;
  }

  let imageUrl = "";

  try {
    imageUrl = await readPhotoAsDataUrl(file);
  } catch {
    if (photoUploadStatus) {
      photoUploadStatus.textContent = "Не удалось прочитать выбранное фото.";
    }
    return;
  }

  mockData.photos.unshift({
    imageUrl,
    stage,
    status: "Добавлено прорабом",
    text: comment || "Фото добавлено в отчет по текущему объекту.",
    title,
    tone: "progress",
  });

  addObjectUpdate("Добавлено новое фото", `${stage}: ${title}`);
  const isSaved = saveProjectData();
  renderPhotoReport();
  photoUploadForm.reset();

  if (photoUploadStatus) {
    photoUploadStatus.textContent = isSaved
      ? "Фото добавлено и сохранено в панели этого объекта."
      : "Фото добавлено на экран, но браузер не смог сохранить его после перезагрузки.";
  }
}

function handleIssueSubmit(event) {
  event.preventDefault();

  const title = issueTitleInput?.value.trim();
  const text = issueTextInput?.value.trim();
  const status = issueStatusInput?.value || "new";

  if (!title || !text) {
    if (issueFormStatus) {
      issueFormStatus.textContent = "Заполните тему и описание правки.";
    }
    return;
  }

  mockData.issues.unshift({
    status,
    statusText: getIssueStatusText(status),
    text,
    title,
  });

  setIssueFilter("all");
  addObjectUpdate("Добавлена правка", title);
  const isSaved = saveProjectData();
  renderIssues();
  issueForm.reset();

  if (issueFormStatus) {
    issueFormStatus.textContent = isSaved
      ? "Правка добавлена и сохранена в панели."
      : "Правка добавлена на экран, но браузер не смог сохранить ее после перезагрузки.";
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
    setIssueFilter(button.dataset.issueFilter || "all");
    renderIssues();
  });
});

photoUploadForm?.addEventListener("submit", handlePhotoUpload);
issueForm?.addEventListener("submit", handleIssueSubmit);

renderObjectMenu();
renderPanel();
