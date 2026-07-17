import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("./index.html", import.meta.url), "utf8");
const app = readFileSync(new URL("./app.js", import.meta.url), "utf8");
const css = readFileSync(new URL("./styles.css", import.meta.url), "utf8");

const requiredHtml = [
  'data-page="repair-progress-panel"',
  "<title>Панель прораба: ремонт квартиры</title>",
  "Панель прораба",
  "Выберите объект",
  'id="objectList"',
  "Ремонт квартиры",
  "62% готово",
  "Паспорт ремонта",
  'id="objectPassport"',
  'id="passportList"',
  "Готовность к показу заказчику",
  'id="acceptancePanel"',
  'id="acceptanceList"',
  "Что изменилось на объекте",
  'id="updatesPanel"',
  'id="updatesList"',
  "Кратко для заказчика",
  'id="clientSummary"',
  'id="clientSummaryGrid"',
  "Фотоотчет",
  "Фото по объекту",
  'id="photoReport"',
  'id="photoReportGrid"',
  'id="photoUploadForm"',
  'id="photoFileInput"',
  'id="photoStageInput"',
  'id="photoTitleInput"',
  'id="photoCommentInput"',
  'id="photoUploadStatus"',
  "Ближайшие действия",
  'id="nextActions"',
  'id="actionsList"',
  "Замечание заказчика",
  "Замечания",
  "Что требует внимания",
  'id="issuesPanel"',
  'id="issuesList"',
  'data-issue-filter="all"',
  'data-issue-filter="new"',
  'data-issue-filter="progress"',
  'data-issue-filter="closed"',
  'id="issueForm"',
  'id="issueTitleInput"',
  'id="issueTextInput"',
  'id="issueStatusInput"',
  'id="issueFormStatus"',
  "Чат по объекту",
  "История сообщений",
  'id="objectChat"',
  "Как это работает",
  "Учебная проверка экрана",
  'data-state-button="filled"',
  'data-state-button="empty"',
  'data-state-button="error"',
  'data-state-button="success"',
  'data-stage-filter="all"',
  'data-stage-filter="done"',
  'data-stage-filter="active"',
  'data-stage-filter="waiting"',
  'id="stagesGrid"',
  'id="stateMessage"',
  'data-summary="done"',
  'data-summary="active"',
  'data-summary="waiting"',
];

for (const marker of requiredHtml) {
  assert.ok(html.includes(marker), `Missing page marker: ${marker}`);
}

assert.ok(app.includes("stage-card"));
assert.ok(app.includes("Этапы ремонта пока не добавлены"));
assert.ok(app.includes("Не удалось показать данные этапа"));
assert.ok(app.includes("Этап завершён"));
assert.ok(app.includes("projectObjects"));
assert.ok(app.includes("let mockData"));
assert.ok(app.includes("setActiveObject"));
assert.ok(app.includes("renderObjectMenu"));
assert.ok(app.includes("Панель прораба ${object.address}"));
assert.ok(app.includes("ул. Лесная, 14"));
assert.ok(app.includes("пр. Мира, 8"));
assert.ok(app.includes("ул. Садовая, 3"));
assert.ok(app.includes("passport"));
assert.ok(app.includes("Учебный адрес: ул. Лесная, 14"));
assert.ok(app.includes("Сантехника и фото кухни"));
assert.ok(app.includes("renderPassport"));
assert.ok(app.includes("acceptance"));
assert.ok(app.includes("Черновые работы можно показывать"));
assert.ok(app.includes("Фото кухни нужно добавить"));
assert.ok(app.includes("Отделку пока не начинать"));
assert.ok(app.includes("renderAcceptance"));
assert.ok(app.includes("photos"));
assert.ok(app.includes("Кухня перед закрытием стен"));
assert.ok(app.includes("Сантехнические выводы"));
assert.ok(app.includes("Демонтаж после вывоза мусора"));
assert.ok(app.includes("getPhotoTheme"));
assert.ok(app.includes("getPhotoLabel"));
assert.ok(app.includes("is-${getPhotoTheme"));
assert.ok(app.includes("handlePhotoUpload"));
assert.ok(app.includes("readPhotoAsDataUrl"));
assert.ok(app.includes("FileReader"));
assert.ok(app.includes("saveProjectData"));
assert.ok(app.includes("photoUploadForm?.addEventListener"));
assert.ok(app.includes("renderPhotoReport"));
assert.ok(app.includes("actions"));
assert.ok(app.includes("Сделать фото кухни перед закрытием стен"));
assert.ok(app.includes("Проверить сантехнические соединения"));
assert.ok(app.includes("Согласовать старт отделочных работ"));
assert.ok(app.includes("renderActions"));
assert.ok(app.includes("updates"));
assert.ok(app.includes("Добавлен запрос на фото кухни"));
assert.ok(app.includes("Сантехника перешла в работу"));
assert.ok(app.includes("Черновые работы закрыты"));
assert.ok(app.includes("renderUpdates"));
assert.ok(app.includes("clientSummary"));
assert.ok(app.includes("Ремонт идет по плану"));
assert.ok(app.includes("Нужно показать кухню"));
assert.ok(app.includes("Проверка коммуникаций"));
assert.ok(app.includes("renderClientSummary"));
assert.ok(app.includes("issues"));
assert.ok(app.includes("Розетка у рабочего стола"));
assert.ok(app.includes("Фото кухни перед приемкой"));
assert.ok(app.includes("Вывоз мусора после демонтажа"));
assert.ok(app.includes("renderIssues"));
assert.ok(app.includes("handleIssueSubmit"));
assert.ok(app.includes("getIssueStatusText"));
assert.ok(app.includes("issueForm?.addEventListener"));
assert.ok(app.includes("activeIssueFilter"));
assert.ok(app.includes("issueFilterButtons"));
assert.ok(app.includes("Замечаний с таким статусом нет."));
assert.ok(app.includes("messages"));
assert.ok(app.includes("stages"));
assert.ok(app.includes("activeStageFilter"));
assert.ok(app.includes("stageFilterButtons"));
assert.ok(app.includes("Этапов с таким статусом нет."));
assert.ok(app.includes("Покажите фото зоны кухни"));
assert.ok(app.includes("Фото добавим в следующий отчет"));
assert.ok(app.includes("Демонтаж"));
assert.ok(app.includes("Черновые работы"));
assert.ok(app.includes("Электрика"));
assert.ok(app.includes("Сантехника"));
assert.ok(app.includes("Отделочные работы"));
assert.ok(app.includes("renderStages"));
assert.ok(app.includes("updateSummary"));
assert.equal(html.includes("регистрация"), false);
assert.equal(html.includes("оплата"), false);
assert.equal(html.includes("API-ключ"), false);

const commonMojibakeMarkers = ["Рљ", "Р°", "СЊ", "С‚", "Рґ", "Рё", "Рј"];
const requiredPhotoAssets = [
  "./assets/photos/demolition.jpg",
  "./assets/photos/electric.jpg",
  "./assets/photos/finish.jpg",
  "./assets/photos/interior.jpg",
  "./assets/photos/plumbing.jpg",
  "./assets/photos/rough.jpg",
  "./assets/photos/site.jpg",
];

for (const asset of requiredPhotoAssets) {
  assert.ok(css.includes(asset), `Missing contextual photo asset in CSS: ${asset}`);
}

for (const marker of commonMojibakeMarkers) {
  assert.equal(html.includes(marker), false, `Page contains mojibake: ${marker}`);
  assert.equal(app.includes(marker), false, `App contains mojibake: ${marker}`);
}
