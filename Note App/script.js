const DOMS = {
  addModal: document.querySelector(".add-modal"),
  editModal: document.querySelector(".edit-modal"),
  deleteModal: document.querySelector(".delete-modal"),
  addTitleInput: document.getElementById("text-add-title"),
  addContentInput: document.getElementById("text-add-content"),
  editTitleInput: document.getElementById("text-edit-title"),
  editContentInput: document.getElementById("text-edit-content"),
  addNotesButtonClick: document.querySelector(".addnotesbutton"),
  themeButton: document.querySelector(".thememode"),
  cancelButton: document.querySelector(".cancel-button"),
  submitButton: document.querySelector(".submit-button"),
  editCancelButton: document.querySelector(".cancel-button-edit"),
  editSubmitButton: document.querySelector(".submit-button-edit"),
  exclamationIcon: document.querySelector(".fa-circle-exclamation"),
  triangleExclamationIcon: document.querySelector(".fa-triangle-exclamation"),
  validationMessageTitle: document.getElementById("validationTitle"),
  validationMessageContent: document.getElementById("validationContent"),
  validationIcon: document.getElementById("contenticon"),
  textContent: document.querySelector(".text-content"),
  cardNotes: document.querySelector(".cards-notes"),
  searchInput: document.querySelector(".search"),
  buttonSearch: document.getElementById("buttonsearch"),
  searchTitle: document.querySelector(".search-title"),
  searchIdInput: document.getElementById("searchId"),
};
const CLASSES = {
  activeClass: "activeValidation",
  activeClassIconContent: "activeIcon",
  activeClassIconTitle: "activeIcons",
  focusClass: "removeFocus",
  classDuplicate: "activeValidationduplicate",
  focusClassDuplicate: "removeFocusduplicate",
  activeClassIconDuplicate: "activeIconsduplicate",
  textValidationDuplicate: "duplicatetext",
  textContentClass: "active-text-content",
  classActiveModal: "activedeletemodal",
};
const DISPLAY_MESSAGE_VALIDATION = {
  validationTextForEmptyField: `<i class="fa-regular fa-circle-exclamation"></i> Required input field`,
  validationTextForDuplicatedTitle: `<i class="fa-regular fa-triangle-exclamation"></i> Title is already exist, can't be duplicate`,
};
const ADD_MODAL_TITLE_CONFIG = {
  textField: DOMS.addTitleInput,
  clearInputValue: DOMS.validationMessageTitle,
  clearInputValidation: CLASSES.activeClass,
  clearFocusValidation: CLASSES.focusClass,
  icon: DOMS.exclamationIcon,
  iconClass: CLASSES.activeClassIconTitle,
};
const ADD_MODAL_CONTENT_CONFIG = {
  textField: DOMS.addContentInput,
  clearInputValue: DOMS.validationMessageContent,
  clearInputValidation: CLASSES.activeClass,
  clearFocusValidation: CLASSES.focusClass,
  icon: DOMS.validationIcon,
  iconClass: CLASSES.activeClassIconContent,
};
const ADD_MODAL_DUPLICATE_CONFIG = {
  textField: DOMS.addTitleInput,
  clearInputValue: DOMS.validationMessageTitle,
  clearInputValidation: CLASSES.classDuplicate,
  clearFocusValidation: CLASSES.focusClassDuplicate,
  icon: DOMS.triangleExclamationIcon,
  iconClass: CLASSES.activeClassIconDuplicate,
};
const ADD_MODAL_SUBMIT_DUPLICATE_CONFIG = {
  textField: DOMS.addTitleInput,
  clearInputValue: DOMS.validationMessageTitle,
  clearInputValidation: CLASSES.classDuplicate,
  clearFocusValidation: CLASSES.focusClassDuplicate,
  icon: DOMS.triangleExclamationIcon,
  iconClass: CLASSES.activeClassIconDuplicate,
  classDuplicateText: CLASSES.textValidationDuplicate,
};
const ADD_MODAL_INPUT_TYPE_TITLE_CONFIG = {
  textField: DOMS.addTitleInput,
  textMessageValidation: DISPLAY_MESSAGE_VALIDATION.validationTextForEmptyField,
  textValidation: DOMS.validationMessageTitle,
  setInputValidation: CLASSES.activeClass,
  setFocusValidation: CLASSES.focusClass,
  icon: DOMS.exclamationIcon,
  iconClass: CLASSES.activeClassIconTitle,
  classDuplicateText: CLASSES.textValidationDuplicate,
};
const ADD_MODAL_INPUT_TYPE_CONTENT_CONFIG = {
  textField: DOMS.addContentInput,
  textMessageValidation: DISPLAY_MESSAGE_VALIDATION.validationTextForEmptyField,
  textValidation: DOMS.validationMessageContent,
  setInputValidation: CLASSES.activeClass,
  setFocusValidation: CLASSES.focusClass,
  icon: DOMS.validationIcon,
  iconClass: CLASSES.activeClassIconContent,
};

let displayTheme = localStorage.getItem("theme");
let currentId = null;
let originalTitle = null;
let idOnly = null;
let idInForeach = null;
let getValueTitle = null;
let validationArray = renderingvalidationArr();
const showNote = renderingNote();
let noteArr = new Map(showNote);
createElementNotes(noteArr);

//add notes button
function openAddModal({ addModal }) {
  addModal.classList.add("active");
}
function setFocusOnNoteTitleInput({ addTitleInput }) {
  addTitleInput.focus();
}
function handleAddNoteButtonClick() {
  openAddModal(DOMS);
  setFocusOnNoteTitleInput(DOMS);
}
DOMS.addNotesButtonClick.addEventListener("click", handleAddNoteButtonClick);
//cancel button add modal
function textFieldTitle({
  textField,
  clearInputValue,
  clearInputValidation,
  clearFocusValidation,
  icon,
  iconClass,
}) {
  clearInputValue.innerHTML = ``;
  textField.classList.remove(clearInputValidation, clearFocusValidation);
  icon.classList.remove(iconClass);
}
function storeSameLogicForValidation() {
  textFieldTitle(ADD_MODAL_TITLE_CONFIG);
  textFieldTitle(ADD_MODAL_DUPLICATE_CONFIG);
  textFieldTitle(ADD_MODAL_CONTENT_CONFIG);
}
function closeAddNoteModal({ addModal }) {
  addModal.classList.remove("active");
}
function clearTitleValueAndContentValue({ addTitleInput, addContentInput }) {
  addTitleInput.value = "";
  addContentInput.value = "";
}
function resetAddNoteForm() {
  storeSameLogicForValidation();
  clearTitleValueAndContentValue(DOMS);
}
function handleCancelNoteButtonClick() {
  resetAddNoteForm();
  closeAddNoteModal(DOMS);
}
DOMS.cancelButton.addEventListener("click", handleCancelNoteButtonClick);
//click out from add modal
function clearTextFieldValue() {
  clearTitleValueAndContentValue(DOMS);
}
function conditionalRemoveValidation(e, addModal) {
  if (e.target === addModal) {
    storeSameLogicForValidation();
    clearTextFieldValue();
  }
}
function closeAddModal(e) {
  e.target.classList.remove("active");
}
function handleAddModalBackgroundClick(e, { addModal }) {
  conditionalRemoveValidation(e, addModal);
  closeAddModal(e);
}
DOMS.addModal.addEventListener("click", (e) => {
  handleAddModalBackgroundClick(e, DOMS);
});
//input type validation title
function storeInputTypeSameLogic() {
  textFieldTitle(ADD_MODAL_TITLE_CONFIG);
  textFieldTitle(ADD_MODAL_DUPLICATE_CONFIG);
}
function validationTypeIfNotEmpty({ addTitleInput }) {
  if (addTitleInput.value.length > 0) {
    storeInputTypeSameLogic();
    return true;
  }
  return false;
}
function messageTitleValidation(textValidation, textMessageValidation) {
  textValidation.innerHTML = textMessageValidation;
}
function validationTypeTitleIfEmpty({
  textField,
  textMessageValidation,
  textValidation,
  setInputValidation,
  setFocusValidation,
  icon,
  iconClass,
  classDuplicateText,
}) {
  if (!validationTypeIfNotEmpty(DOMS)) {
    messageTitleValidation(textValidation, textMessageValidation);
    textValidation.classList.remove(classDuplicateText);
    textField.classList.add(setInputValidation, setFocusValidation);
    icon.classList.add(iconClass);
  }
}

function handleInputTypeTitleValidation() {
  validationTypeTitleIfEmpty(ADD_MODAL_INPUT_TYPE_TITLE_CONFIG);
}
DOMS.addTitleInput.addEventListener("input", handleInputTypeTitleValidation);
//input type validation content
function validationTypeContentIfNotEmpty({ addContentInput }) {
  if (addContentInput.value.length > 0) {
    textFieldTitle(ADD_MODAL_CONTENT_CONFIG);
    return true;
  }
  return false;
}
function messageContentValidation(textValidation, textMessageValidation) {
  textValidation.innerHTML = textMessageValidation;
}
function validationTypeContentIfEmpty({
  textField,
  textMessageValidation,
  textValidation,
  setInputValidation,
  setFocusValidation,
  icon,
  iconClass,
}) {
  if (!validationTypeContentIfNotEmpty(DOMS)) {
    messageContentValidation(textValidation, textMessageValidation);
    textField.classList.add(setInputValidation, setFocusValidation);
    icon.classList.add(iconClass);
  }
}
function handleInputTypeContentValidation() {
  validationTypeContentIfEmpty(ADD_MODAL_INPUT_TYPE_CONTENT_CONFIG);
}
DOMS.addContentInput.addEventListener(
  "input",
  handleInputTypeContentValidation
);
// add modal side/submit note button
function storeMaps({ addTitleInput, addContentInput }, countId) {
  const titleinput = addTitleInput.value;
  const contentinput = addContentInput.value;
  return noteArr.set(countId, { titleinput, contentinput });
}
function getMaps(display, countId) {
  return display.get(countId);
}
function displayMessageDuplicate({ DISPLAY_MESSAGE_VALIDATION, DOMS }) {
  DOMS.validationMessageTitle.innerHTML =
    DISPLAY_MESSAGE_VALIDATION.validationTextForDuplicatedTitle;
}
function clearDuplicateRender() {
  const CARD_NOTES = document.querySelector(".cards-notes");
  CARD_NOTES.innerHTML = "";
  return CARD_NOTES;
}
function validationIfEmptyTitle(addTitleInput) {
  if (addTitleInput.value === "") {
    validationTypeTitleIfEmpty(ADD_MODAL_INPUT_TYPE_TITLE_CONFIG);
    DOMS.addTitleInput.focus();
    return false;
  }
  return true;
}
function validationIfEmptyContent(addContentInput) {
  if (addContentInput.value === "") {
    validationTypeContentIfEmpty(ADD_MODAL_INPUT_TYPE_CONTENT_CONFIG);
    DOMS.addContentInput.focus();
    return false;
  }
  return true;
}
function validationForDuplicated({ addTitleInput }) {
  const isTrue = validationArray.some((validate) => {
    return validate.topush.titleinput === addTitleInput.value;
  });
  if (isTrue) {
    submitValidateForDuplicate(ADD_MODAL_SUBMIT_DUPLICATE_CONFIG);
    DOMS.addTitleInput.focus();
    storeLocalStorage();
    return false;
  }
  return true;
}
function submitValidateForDuplicate({
  textField,
  clearInputValue,
  clearInputValidation,
  clearFocusValidation,
  icon,
  iconClass,
  classDuplicateText,
}) {
  displayMessageDuplicate({ DISPLAY_MESSAGE_VALIDATION, DOMS });
  clearInputValue.classList.add(classDuplicateText);
  textField.classList.add(clearInputValidation, clearFocusValidation);
  icon.classList.add(iconClass);
}
function displayHomeTextContent({ CLASSES, DOMS }) {
  DOMS.textContent.classList.add(CLASSES.textContentClass);
}
function clearHomeTextContent({ DOMS, CLASSES }) {
  if (DOMS.cardNotes.innerHTML !== "") {
    DOMS.textContent.classList.remove(CLASSES.textContentClass);
    DOMS.searchTitle.classList.remove("search-title-active");
    return false;
  }
  return true;
}
function storeShowDeleteModal({ DOMS, CLASSES }) {
  DOMS.deleteModal.classList.add(CLASSES.classActiveModal);
}
function openDeleteModal(id) {
  idInForeach = id;
  storeShowDeleteModal({ DOMS, CLASSES });
}
function handleOpenDeleteModal(id) {
  openDeleteModal(id);
}
function getTitleAndCotentFromAddModal(
  { editTitleInput, editContentInput },
  currentId
) {
  editTitleInput.value = currentId.titleinput;
  editContentInput.value = currentId.contentinput;
}
function showEditModal(editModal, editTitleInput) {
  editModal.classList.add("active");
  editTitleInput.focus();
}
function handleOpenEditModal(id, { editModal, editTitleInput }) {
  idOnly = id;
  currentId = noteArr.get(id);
  const findNotes = validationArray.find((items) => {
    return items.keyid === id;
  });
  originalTitle = findNotes.topush.titleinput;
  getTitleAndCotentFromAddModal(DOMS, currentId);
  showEditModal(editModal, editTitleInput);
  storeLocalStorage();
}
function createElementNotes(noteArr) {
  const GET_CARD_NOTES = clearDuplicateRender();
  noteArr.forEach((noteCont, id) => {
    idInForeach = id;
    getValueTitle = noteCont;
    const ARTICLE = document.createElement("article");
    ARTICLE.classList = "cards";
    ARTICLE.innerHTML = `<div class="headtitle">
            <h1 class="note-title">${noteCont.titleinput}</h1>
            <div class="head-icons">
              <button type="button" data-title="Edit Note" class="editModal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.8995 6.85453L17.1421 11.0972L7.24264 20.9967H3V16.754L12.8995 6.85453ZM14.3137 5.44032L16.435 3.319C16.8256 2.92848 17.4587 2.92848 17.8492 3.319L20.6777 6.14743C21.0682 6.53795 21.0682 7.17112 20.6777 7.56164L18.5563 9.68296L14.3137 5.44032Z"></path></svg>
              </button>
              <button type="button" data-title="Delete Note" class="deleteModal">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
          <p>
            ${noteCont.contentinput}
          </p>`;
    GET_CARD_NOTES.prepend(ARTICLE);
    ARTICLE.querySelector(".editModal").addEventListener("click", () => {
      handleOpenEditModal(id, DOMS);
    });
    ARTICLE.querySelector(".deleteModal").addEventListener("click", () => {
      handleOpenDeleteModal(id);
    });
    displayHomeTextContent({ CLASSES, DOMS });

    if (!clearHomeTextContent({ DOMS, CLASSES })) return;
    storeLocalStorage();
  });
}
function handleSubmitButtonClick({ addTitleInput, addContentInput }) {
  if (!validationIfEmptyTitle(addTitleInput)) return;
  if (!validationIfEmptyContent(addContentInput)) return;
  if (!validationForDuplicated(DOMS)) return;

  if (addTitleInput.value.length > 0 && addContentInput.value.length > 0) {
    const countId = Date.now();
    const display = storeMaps(DOMS, countId);
    const topush = getMaps(display, countId);
    validationArray.push({ keyid: countId, topush });
    clearTitleValueAndContentValue(DOMS);
    closeAddNoteModal(DOMS);
    createElementNotes(noteArr);
    storeLocalStorage();
  }
}
DOMS.submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  handleSubmitButtonClick(DOMS);
});
// submit edit button click
function handleEditSubmitButtonClick() {
  const titleInputEdit = DOMS.editTitleInput.value.trim();
  const ContentInputEdit = DOMS.editContentInput.value.trim();

  if (
    titleInputEdit === currentId.titleinput &&
    ContentInputEdit === currentId.contentinput
  ) {
    document.querySelector(".edit-modal").classList.remove("active");
    return;
  }
  if (titleInputEdit !== originalTitle) {
    let displayValidate = validationArray.some((validate) => {
      return validate.topush.titleinput === titleInputEdit;
    });
    if (displayValidate) {
      document.getElementById(
        "validationeditTitlesedit"
      ).innerHTML = `<i class="fa-regular fa-triangle-exclamation"></i> Title is already exist, can't be duplicate`;

      document
        .getElementById("validationeditTitlesedit")
        .classList.add("duplicatetexts");
      DOMS.editTitleInput.classList.add("activeValidationduplicates");

      document
        .getElementById("editIconsduplicate")
        .classList.add("activeIconsduplicateEdit");
      DOMS.editTitleInput.classList.add("removeFocusduplicates");
      return;
    } else {
      document.getElementById("validationeditTitlesedit").innerHTML = ``;
      document
        .getElementById("validationeditTitlesedit")
        .classList.remove("duplicatetexts");
      DOMS.addTitleInput.classList.remove("activeValidationduplicates");
      document
        .getElementById("editIconsduplicate")
        .classList.remove("activeIconsduplicateEdit");
      DOMS.addTitleInput.classList.remove("removeFocusduplicates");
    }
  }

  if (titleInputEdit === "") {
    document.getElementById(
      "validationeditTitlesedit"
    ).innerHTML = `<i class="fa-regular fa-circle-exclamation"></i> Required input field`;
    DOMS.addTitleInput.classList.add("activeValidation");
    document.getElementById("editIcons").classList.add("activeIconsEdit");
    DOMS.addTitleInput.classList.add("removeFocus");
    return;
  } else {
    DOMS.addTitleInput.classList.remove("activeValidation");
    document.getElementById("editIcons").classList.remove("activeIconsEdit");
    DOMS.addTitleInput.classList.remove("removeFocus");
  }

  if (ContentInputEdit === "") {
    document.getElementById(
      "validationeditContent"
    ).innerHTML = `<i class="fa-regular fa-circle-exclamation"></i> Required input field`;
    DOMS.editContentInput.classList.add("activeValidation");
    document.getElementById("contenticonedit").classList.add("activeIconEdit");
    DOMS.editContentInput.classList.add("removeFocus");
    return;
  } else {
    document.getElementById("validationeditContent").innerHTML = ``;
    DOMS.editContentInput.classList.remove("activeValidation");
    document
      .getElementById("contenticonedit")
      .classList.remove("activeIconEdit");
    DOMS.editContentInput.classList.remove("removeFocus");
  }

  currentId.titleinput = titleInputEdit;
  currentId.contentinput = ContentInputEdit;
  validationArray = validationArray.map((notes) => {
    return notes.keyid === idOnly
      ? {
          ...notes,
          topush: {
            titleinput: titleInputEdit,
            contentinput: ContentInputEdit,
          },
        }
      : notes;
  });
  document.querySelector(".edit-modal").classList.remove("active");
  createElementNotes(noteArr);
  storeLocalStorage();
}
document.querySelector(".submit-button-edit").addEventListener("click", (e) => {
  e.preventDefault();
  handleEditSubmitButtonClick();
});
// confirm delete modal side
function removeHomeText({ DOMS, CLASSES }) {
  DOMS.deleteModal.classList.remove(CLASSES.classActiveModal);
}
function handleConfirmDeleteModal() {
  if (idInForeach !== null) {
    validationArray = validationArray.filter((element) => {
      return element.keyid !== idInForeach;
    });
    noteArr.delete(idInForeach);
    removeHomeText({ DOMS, CLASSES });
    displayHomeTextContent({ CLASSES, DOMS });
    createElementNotes(noteArr);
    storeLocalStorage();
  }
}
document
  .querySelector(".yesDelete")
  .addEventListener("click", handleConfirmDeleteModal);
// decline delete modal side
function handleDeclineDeleteModal() {
  removeHomeText({ DOMS, CLASSES });
  storeLocalStorage();
}
document
  .querySelector(".noDelete")
  .addEventListener("click", handleDeclineDeleteModal);

//render text content
function searchTitleRender() {
  DOMS.searchTitle.classList.add("search-title-active");
}
if (document.querySelector(".cards-notes").innerHTML == "") {
  displayHomeTextContent({ CLASSES, DOMS });
}
//edit section
function handleCancelEditModal() {
  document.querySelector(".edit-modal").classList.remove("active");

  document.getElementById("validationeditTitlesedit").innerHTML = ``;
  DOMS.editTitleInput.classList.remove(
    "activeValidation",
    "removeFocus",
    "activeValidationduplicates",
    "removeFocusduplicates"
  );
  document.getElementById("editIcons").classList.remove("activeIconsEdit");
  document.getElementById("validationeditContent").innerHTML = ``;
  DOMS.editContentInput.classList.remove("activeValidation", "removeFocus");
  document.getElementById("contenticonedit").classList.remove("activeIconEdit");

  document.getElementById("validationeditTitlesedit").innerHTML = ``;
  document
    .getElementById("validationeditTitlesedit")
    .classList.remove("duplicatetexts");
  document
    .getElementById("editIconsduplicate")
    .classList.remove("activeIconsduplicateEdit");
}
document
  .querySelector(".cancel-button-edit")
  .addEventListener("click", handleCancelEditModal);

document.querySelector(".edit-modal").addEventListener("click", (e) => {
  e.target.classList.remove("active");
  if (e.target === document.querySelector(".edit-modal")) {
    document.getElementById("validationeditTitlesedit").innerHTML = ``;
    DOMS.editTitleInput.classList.remove(
      "activeValidation",
      "removeFocusduplicates",
      "removeFocus",
      "activeValidationduplicates"
    );
    document.getElementById("editIcons").classList.remove("activeIconsEdit");
    document.getElementById("validationeditContent").innerHTML = ``;
    DOMS.editContentInput.classList.remove("activeValidation", "removeFocus");
    document
      .getElementById("contenticonedit")
      .classList.remove("activeIconEdit");
    document
      .getElementById("validationeditTitlesedit")
      .classList.remove("duplicatetexts");
    document
      .getElementById("editIconsduplicate")
      .classList.remove("activeIconsduplicateEdit");
  }
});
DOMS.editTitleInput.addEventListener("input", () => {
  if (DOMS.editTitleInput.value === "") {
    document.getElementById(
      "validationeditTitlesedit"
    ).innerHTML = `<i class="fa-regular fa-circle-exclamation"></i> Required input field`;
    DOMS.editTitleInput.classList.add("activeValidation", "removeFocus");
    document.getElementById("editIcons").classList.add("activeIconsEdit");

    document
      .getElementById("validationeditTitlesedit")
      .classList.remove("duplicatetexts");
    DOMS.editTitleInput.classList.remove(
      "activeValidationduplicates",
      "removeFocusduplicates"
    );
    document
      .getElementById("editIconsduplicate")
      .classList.remove("activeIconsduplicateEdit");
  }
  if (DOMS.editTitleInput.value !== "") {
    document.getElementById("validationeditTitlesedit").innerHTML = ``;
    DOMS.editTitleInput.classList.remove(
      "activeValidation",
      "removeFocus",
      "activeValidationduplicates",
      "removeFocusduplicates"
    );
    document.getElementById("editIcons").classList.remove("activeIconsEdit");
    document
      .getElementById("validationeditTitlesedit")
      .classList.remove("duplicatetexts");
    document
      .getElementById("editIconsduplicate")
      .classList.remove("activeIconsduplicateEdit");
  }
});
DOMS.editContentInput.addEventListener("input", () => {
  if (DOMS.editContentInput.value === "") {
    document.getElementById(
      "validationeditContent"
    ).innerHTML = `<i class="fa-regular fa-circle-exclamation"></i> Required input field`;
    DOMS.editContentInput.classList.add("activeValidation", "removeFocus");
    document.getElementById("contenticonedit").classList.add("activeIconEdit");
  }
  if (DOMS.editContentInput.value !== "") {
    document.getElementById("validationeditContent").innerHTML = ``;
    DOMS.editContentInput.classList.remove("activeValidation", "removeFocus");
    document
      .getElementById("contenticonedit")
      .classList.remove("activeIconEdit");
  }
});
// search side

function handleSearchClick() {
  DOMS.searchInput.classList.add("activeHover");
}
DOMS.searchInput.addEventListener("click", handleSearchClick);
function handleClickOut(e) {
  if (e.target.id === "" || e.target.id === "main-section") {
    DOMS.searchInput.classList.remove("activeHover");
  }
}
document.addEventListener("click", (e) => {
  handleClickOut(e);
});
function handleSearchInput() {
  const display = DOMS.searchInput.value.toLowerCase();
  const result = [...noteArr].filter(([id, notes]) => {
    return display.length > 0 ? notes.titleinput === display : notes;
  });
  searchTitleRender();
  createElementNotes(new Map(result));
}
DOMS.searchInput.addEventListener("input", handleSearchInput);
// store at local storage
function storeLocalStorage() {
  storenotevalidation();
  storeNote();
}
function storeNote() {
  const convertToString = JSON.stringify([...noteArr]);
  localStorage.setItem("noteSave", convertToString);
}
function renderingNote() {
  const unconvertToString = localStorage.getItem("noteSave");
  return JSON.parse(unconvertToString) || [];
}

function storenotevalidation() {
  const convertToStringvalidation = JSON.stringify(validationArray);
  localStorage.setItem("notesavevalidation", convertToStringvalidation);
}
function renderingvalidationArr() {
  const unconvertToStringvalidation =
    localStorage.getItem("notesavevalidation");
  return JSON.parse(unconvertToStringvalidation) || [];
}
// dark mode theme

function activeDarkMode() {
  document.body.classList.add("darkmode");
  DOMS.themeButton.setAttribute("data-title-thememode", "Light mode");
  localStorage.setItem("theme", "darkmode");
}
function activeLightMode() {
  document.body.classList.remove("darkmode");
  DOMS.themeButton.setAttribute("data-title-thememode", "Dark mode");
  localStorage.setItem("theme", "offdarkmode");
}

if (displayTheme === "darkmode") activeDarkMode();
DOMS.themeButton.addEventListener("click", () => {
  displayTheme = localStorage.getItem("theme");
  displayTheme !== "darkmode" ? activeDarkMode() : activeLightMode();
});
