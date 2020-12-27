const alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "W", "X", "Y", "Z"];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

let all_datepicker_selector = [];

const reloadScript = () => {
  let allDatePickerDom = all_datepicker_selector.map((id) => {
    return document.getElementById(id)
  });

  allDatePickerDom.map((dom) => {
    dom.removeEventListener('focus', () => {
      console.log();
      openPickerContainer(dom);
    });
    dom.addEventListener('focus', () => {
      openPickerContainer(dom);
    });
  })
}

const getDomId = (dom) => dom.id;

const getDomIntId = (dom) => {
  return getDomId(dom).match(/\d+/g)[0];
}

const totalPickerAvailable = () => Array.from(document.getElementsByClassName("datePickerInput")).length;

const addNewPicker = () => {

  const newPickerContainer = document.createElement("div");
  newPickerContainer.className = "col-lg-3 mt-4";

  const newPickerInput = document.createElement("input");
  newPickerInput.type = "text";
  newPickerInput.className = "datePickerInput w-100";
  newPickerInput.id = "datePicker" + (totalPickerAvailable() + 1);
  all_datepicker_selector = [...all_datepicker_selector, "datePicker" + (totalPickerAvailable() + 1)];
  newPickerContainer.appendChild(newPickerInput);

  document.getElementById("mainDynamicContainer").appendChild(newPickerContainer);
  reloadScript();

}

document.getElementById("addNewButton").addEventListener("click", () => {
  addNewPicker();
});

const openPickerContainer = (dom) => {

  const domIntId = getDomIntId(dom);
  //  Check if Picker is already opened & created
  if (!document.getElementById("datePickerContainer" + domIntId)) {


    //  Create Main Container
    const datePickerContainer = document.createElement('div');
    datePickerContainer.className = "w-100 bg-lightGray pt-2 pb-2"
    datePickerContainer.id = "datePickerContainer" + domIntId;

    //  Create a TextBox Container
    const textBoxContainer = document.createElement("div");
    textBoxContainer.className = "m-2";

    //  create TextBox which will be inside TextBox Container
    const textBox = document.createElement("input");
    textBox.type = "text";
    textBox.id = "inputText" + domIntId;
    textBox.className = "w-100";
    textBox.placeholder = "Enter Your Text";
    textBox.value = getCurrentTextValue(domIntId, true)
    textBoxContainer.appendChild(textBox);

    datePickerContainer.appendChild(textBoxContainer);


    //  Create Picker Main Container
    const pickerMainContainer = document.createElement("div");
    pickerMainContainer.className = "w-100 d-flex justify-content-around";


    //  Create Alphabet Selector
    const alphabetContainer = document.createElement("div");
    alphabetContainer.className = "alphabetContainer" + domIntId;

    //  Create Alphabet Picker Up Arrow
    const upAlphabetArrowDiv = document.createElement("div");
    upAlphabetArrowDiv.className = "cursorPointer";
    upAlphabetArrowDiv.id = "up-alphabet" + domIntId;
    const upAlphabetArrowIcon = document.createElement("i");
    upAlphabetArrowIcon.className = "fa fa-angle-up";
    upAlphabetArrowDiv.appendChild(upAlphabetArrowIcon);
    alphabetContainer.appendChild(upAlphabetArrowDiv);

    //  Create Alphabet Picker Value
    const alphabetValue = document.createElement("div");
    alphabetValue.id = "alphabetValue" + domIntId;
    alphabetValue.innerHTML = getCurrentAlphabetValue(domIntId, true);
    alphabetContainer.appendChild(alphabetValue);

    //  Create Alphabet Picker Down Arrow
    const downAlphabetArrowDiv = document.createElement("div");
    downAlphabetArrowDiv.className = "cursorPointer";
    downAlphabetArrowDiv.id = "down-alphabet" + domIntId;
    const downAlphabetArrowIcon = document.createElement("i");
    downAlphabetArrowIcon.className = "fa fa-angle-down";
    downAlphabetArrowDiv.appendChild(downAlphabetArrowIcon);
    alphabetContainer.appendChild(downAlphabetArrowDiv);

    pickerMainContainer.appendChild(alphabetContainer);


    //  Create Number Selector
    const numberContainer = document.createElement("div");
    numberContainer.className = "numberContainer" + domIntId;

    //  Create Number Picker Up Arrow
    const upNumberArrowDiv = document.createElement("div");
    upNumberArrowDiv.className = "cursorPointer";
    upNumberArrowDiv.id = "up-number" + domIntId;
    const upNumberArrowIcon = document.createElement("i");
    upNumberArrowIcon.className = "fa fa-angle-up";
    upNumberArrowDiv.appendChild(upNumberArrowIcon);
    numberContainer.appendChild(upNumberArrowDiv);

    //  Create Number Picker Value
    const numberValue = document.createElement("div");
    numberValue.id = "numberValue" + domIntId;
    numberValue.innerHTML = getCurrentNumberValue(domIntId, true);
    numberContainer.appendChild(numberValue);

    //  Create Number Picker Down Arrow
    const downNumberArrowDiv = document.createElement("div");
    downNumberArrowDiv.className = "cursorPointer";
    downNumberArrowDiv.id = "down-number" + domIntId;
    const downNumberArrowIcon = document.createElement("i");
    downNumberArrowIcon.className = "fa fa-angle-down";
    downNumberArrowDiv.appendChild(downNumberArrowIcon);
    numberContainer.appendChild(downNumberArrowDiv);

    pickerMainContainer.appendChild(numberContainer);

    datePickerContainer.appendChild(pickerMainContainer);

    //  Create Done Button Container
    const doneBtnContainer = document.createElement("div");
    doneBtnContainer.className = "w-100 d-flex justify-content-center";

    //  Create Done Button
    const doneBtn = document.createElement("button");
    doneBtn.id = "doneBtn" + domIntId;
    doneBtn.innerHTML = "DONE";
    doneBtnContainer.appendChild(doneBtn);

    datePickerContainer.appendChild(doneBtnContainer);

    dom.parentElement.appendChild(datePickerContainer);


    setController(dom);

  }
}

const closePickerContainer = (dom) => {
  const domIntId = getDomIntId(dom);

  dom.setAttribute("hiddenTextElement", getCurrentTextValue(domIntId));
  dom.setAttribute("hiddenAlphabetElement", getCurrentAlphabetValue(domIntId));
  dom.setAttribute("hiddenNumberElement", getCurrentNumberValue(domIntId));

  const removeElement = document.getElementById("datePickerContainer" + domIntId);
  document.getElementById(getDomId(dom)).parentElement.removeChild(removeElement);
}

const getCurrentAlphabetValue = (domId, selected = false) => {
  if (!selected) {
    if (domId) {
      const alphabetDom = document.getElementById("alphabetValue" + domId);
      return alphabetDom ? alphabetDom.innerHTML : alphabets[0];
    } else {
      return alphabets[0];
    }
  } else {
    const alphabetDom = document.getElementById("datePicker" + domId);
    return alphabetDom && alphabetDom.getAttribute("hiddenAlphabetElement") ? alphabetDom.getAttribute("hiddenAlphabetElement") : alphabets[0];
  }
}

const setCurrentAlphabetValue = (domId, value) => {
  document.getElementById("alphabetValue" + domId).innerHTML = value;
}

const getCurrentNumberValue = (domId, selected = false) => {
  if (!selected) {
    if (domId) {
      const numberDom = document.getElementById("numberValue" + domId);
      return numberDom ? numberDom.innerHTML : numbers[0];
    } else {
      return numbers[0];
    }
  } else {
    const numberDom = document.getElementById("datePicker" + domId);
    return numberDom && numberDom.getAttribute("hiddenNumberElement") ? numberDom.getAttribute("hiddenNumberElement") : numbers[0];
  }
}

const getCurrentTextValue = (domId, selected = false) => {
  if (!selected) {
    return document.getElementById("inputText" + domId).value;
  } else {
    const textDom = document.getElementById("datePicker" + domId);
    return textDom && textDom.getAttribute("hiddenTextElement") ? textDom.getAttribute("hiddenTextElement") : "";
  }
}

const setCurrentNumberValue = (domId, value) => {
  return document.getElementById("numberValue" + domId).innerHTML = value;
}


const setController = (dom) => {

  const domIntId = getDomIntId(dom);
  const inputText = document.getElementById("inputText" + domIntId);
  const doneBtn = document.getElementById("doneBtn" + domIntId);

  const upAlphabetArrow = document.getElementById("up-alphabet" + domIntId);
  const downAlphabetArrow = document.getElementById("down-alphabet" + domIntId);

  const upNumberArrow = document.getElementById("up-number" + domIntId);
  const downNumberArrow = document.getElementById("down-number" + domIntId);

  upAlphabetArrow.addEventListener("click", () => {
    const alphabetIndex = alphabets.indexOf(getCurrentAlphabetValue(domIntId));
    //  Check in case current value is last value
    if (alphabetIndex === (alphabets.length - 1)) {
      setCurrentAlphabetValue(domIntId, alphabets[0])
    } else {
      setCurrentAlphabetValue(domIntId, alphabets[alphabetIndex + 1])
    }
  });

  downAlphabetArrow.addEventListener("click", () => {
    const alphabetIndex = alphabets.indexOf(getCurrentAlphabetValue(domIntId));
    //  Check in case current value is not first value
    if (alphabetIndex === 0) {
      setCurrentAlphabetValue(domIntId, alphabets[alphabets.length - 1])
    } else {
      setCurrentAlphabetValue(domIntId, alphabets[alphabetIndex - 1])
    }
  });


  upNumberArrow.addEventListener("click", () => {
    const numberIndex = numbers.indexOf(getCurrentNumberValue(domIntId));
    //  Check in case current value is last value
    if (numberIndex === (numbers.length - 1)) {
      setCurrentNumberValue(domIntId, numbers[0])
    } else {
      setCurrentNumberValue(domIntId, numbers[numberIndex + 1])
    }
  });


  downNumberArrow.addEventListener("click", () => {
    const numberIndex = numbers.indexOf(getCurrentNumberValue(domIntId));
    //  Check in case current value is not first value
    if (numberIndex === 0) {
      setCurrentNumberValue(domIntId, numbers[numbers.length - 1])
    } else {
      setCurrentNumberValue(domIntId, numbers[numberIndex - 1])
    }
  });

  doneBtn.addEventListener("click", () => {
    dom.value = inputText.value + " * " + getCurrentAlphabetValue(domIntId) + " * " + getCurrentNumberValue(domIntId);
    closePickerContainer(dom);
  });
    
}