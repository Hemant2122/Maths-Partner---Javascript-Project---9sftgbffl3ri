// ------- Selecter id --------

const savaDataButton = document.getElementById("savaData");
const problemInput = document.getElementById("problem");
const selectCategory = document.getElementById("select");
const searchButton = document.getElementById("search");
const showAndHide = document.getElementById("textAnswer");
const textInputQuestion = document.getElementById("textInput");
const showAnswer = document.getElementById("answer");
const deleteButton = document.getElementById("deleteButton");
const history = document.getElementById("history").hidden = true;
const savaData = document.getElementById("savaData");

// -------- solved Problem --------

// async function find(){
//     history.hidden = true;
//     let inputElement = problemInput.value;
//     console.log(inputElement, "input");
//     let selectElement = selectCategory.value;
//     let uri = encodeURIComponent(inputElement);
//     console.log(uri, "uri");
//     let respones = await fetch(`https://newton.vercel.app/api/v2/${selectElement}/${uri}`);
//     let data = await respones.json();
//     console.log(data);

// }



searchButton.addEventListener("click", () => {
    const inputElement = problemInput.value;
    const selectElement = selectCategory.value;

    if (inputElement !== "" && selectElement !== "") {
        showAndHide.style.display = "block";
    }

    textInputQuestion.innerHTML = `${selectCategory.value}:${inputElement}`;

    // history.hidden = true;

    // ----------- API -------
    let uri = encodeURIComponent(inputElement);

    async function find() {
        let respones = await fetch(`https://newton.vercel.app/api/v2/${selectElement}/${uri}`);
        let data = await respones.json();
        console.log(data);

        showAnswer.innerHTML = data.result;

        localStorage.setItem("data", JSON.stringify(data))

        const historyTable = document.getElementById("his");

        // Clear existing content in the history table
        historyTable.innerHTML = "";

        // Populate the history table with new rows
        const len = localStorage.length;
        console.log(len);

        for (let i = 0; i < len; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);

            let list = document.createElement("tr");
            list.innerHTML = `<td>${key}</td><td>${value}</td>`;
            historyTable.appendChild(list);
        }


    }

    find();
});

problemInput.addEventListener("click", () => {
    const historySection = document.getElementById("history");
    historySection.hidden = true;
})

savaData.addEventListener("click", () => {
    const historySection = document.getElementById("history");
    historySection.hidden = false;
    showAndHide.style.display = "none";
})


deleteButton.addEventListener("click", () => {
    problemInput.value = "";
    showAndHide.style.display = "none";

    localStorage.clear();
});
