let form = document.querySelector(".form-panel");
let inputs = document.querySelectorAll("input");
let skillInput = document.querySelector("#skillinp div")
let langInput = document.querySelector("#langinp div")
let hobbyInput = document.querySelector("#hobbyinp div")
let textArea = document.querySelectorAll("textarea");
let submit = document.querySelector(".submit");


let fileInp = document.querySelector("#fileinp");
let uploadBtn = document.querySelector("#upload");

uploadBtn.addEventListener("click", function () {
    fileInp.click();
});
fileInp.addEventListener("change", function (dets) {
    const file = dets.target.files[0];
    if (file) {
        uploadBtn.textContent = file.name;
    }
});

function addInput(buttonId, containerSelector, placeholderText, remove) {
    document.querySelector(buttonId).addEventListener("click", function () {
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = placeholderText;
        document.querySelector(containerSelector).appendChild(input);
        document.querySelector(remove).style.display = "block";
    });
}
addInput("#addskill", "#skillinp div", "Enter Skill", "#removeskill");
addInput("#addlang", "#langinp div", "Enter Language", "#removelang");
addInput("#addhobby", "#hobbyinp div", "Enter Hobby", "#removehobby");

function removeInput(btnid) {
    document.querySelector(btnid).addEventListener("click", function (dets) {
        let lastElement = dets.target.parentElement.childNodes[3].lastElementChild;
        let firstElement = dets.target.parentElement.childNodes[3].firstElementChild.nextElementSibling;
        if (lastElement === firstElement) {
            let btn = document.querySelector(btnid);
            lastElement.remove();
            btn.style.display = "none";
        } else {
            lastElement.remove();
        }
    });
}
removeInput("#removeskill");
removeInput("#removelang");
removeInput("#removehobby");

//add experience and education section

document.querySelector("#addExp").addEventListener("click", function () {

    const expHTML = `
        <div class="experience-items">

            <input type="text" placeholder="Job Role">

            <input type="text" placeholder="Company Name">

            <div class="date-group">
                <input type="month">
                <input type="month">
            </div>

            <textarea placeholder="Job Description"></textarea>

            <button type="button" class="remove-btn">
                - Remove
            </button>

        </div>
    `;

    document.querySelector("#addExp").insertAdjacentHTML("beforebegin", expHTML);

});

document.querySelector("#experienceInp").addEventListener("click", function (dets) {
    if (dets.target.classList.contains("remove-btn")) {
        dets.target.closest(".experience-items").remove();
    }
});

document.querySelector("#addEdu").addEventListener("click", function () {

    const expHTML = `
        <div class="education-items">

          <input type="text" placeholder="Degree">

          <input type="text" placeholder="University">

          <div class="date-group">

            <input type="month">

            <input type="month">

            <button type="button" class="remove-btn">
                - Remove
            </button>

        </div>
    `;

    document.querySelector("#addEdu").insertAdjacentHTML("beforebegin", expHTML);

});

document.querySelector("#educationInp").addEventListener("click", function (dets) {
    if (dets.target.classList.contains("remove-btn")) {
        dets.target.closest(".education-items").remove();
    }
});

//upperCase function
function upperCase(text) {
    text = text
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    return text;
}

//Resume preview


submit.disabled = true;

function validateForm() {

    let valid = true;

    document.querySelectorAll("input, textarea").forEach(element => {

        if (element.type === "file") {
            if (element.files.length === 0) valid = false;
        } else if (element.value.trim() === "") {
            valid = false;
        }

    });

    submit.disabled = !valid;

}

document.querySelectorAll("input, textarea").forEach(element => {

    element.addEventListener("input", validateForm);
    element.addEventListener("change", validateForm);

});

submit.addEventListener("click", function () {
    //profile
    const file = inputs[0].files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector(".profile img").src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    //name role
    let name = inputs[1].value;
    let jobRole = inputs[2].value;
    document.querySelector(".top h1").textContent = upperCase(name);
    document.querySelector(".top h3").textContent = upperCase(jobRole);

    // Contact
    let contacts = document.querySelector(".left-section")
    let email = inputs[3].value;
    let phone = inputs[4].value;
    let address = inputs[5].value;

    contacts.childNodes[3].lastChild.textContent = upperCase(address);
    contacts.childNodes[5].lastChild.textContent = phone;
    contacts.childNodes[7].lastChild.textContent = email;

    //profile summary
    let summaryInp = document.querySelector("#summaryInp textarea");
    let summary = document.querySelector("#summary");
    summary.textContent = summaryInp.value;

    //skils
    let skills = document.querySelector("#skills ul");
    skills.innerHTML = "";
    for (let i = 0; i < skillInput.children.length; i++) {
        let list = document.createElement("li");
        list.textContent = upperCase(skillInput.children[i].value);
        skills.appendChild(list);
    }

    //langs
    let langs = document.querySelector("#langs ul");
    langs.innerHTML = "";
    for (let i = 0; i < langInput.children.length; i++) {
        let list = document.createElement("li");
        list.textContent = upperCase(langInput.children[i].value);
        langs.appendChild(list);
    }

    //hobbies
    let hobbies = document.querySelector("#hobbies ul");
    hobbies.innerHTML = "";
    for (let i = 0; i < hobbyInput.children.length; i++) {
        let list = document.createElement("li");
        list.textContent = upperCase(hobbyInput.children[i].value);
        hobbies.appendChild(list);
    }

    //experience
    let experienceInp = document.querySelectorAll("#experienceInp .experience-items");
    let experience = document.querySelector("#experience div")

    experience.innerHTML = "";

    experienceInp.forEach(exp => {
        let item = document.createElement("div");
        item.classList.add("item");

        let h4 = document.createElement("h4");
        let span = document.createElement("span");
        let small = document.createElement("small")
        let para = document.createElement("p");

        h4.textContent = upperCase(exp.children[0].value);
        span.textContent = upperCase(exp.children[1].value);

        small.textContent = exp.children[2].children[0].value + "  -  " + exp.children[2].children[1].value;

        para.textContent = exp.children[3].value;

        item.append(h4, span, small, para);
        experience.appendChild(item);
    });

    //education
    let educationInp = document.querySelectorAll("#educationInp .education-items");
    let education = document.querySelector("#education div");

    education.innerHTML = "";

    educationInp.forEach(edu => {
        let item = document.createElement("div");
        item.classList.add("item");

        let h4 = document.createElement("h4");
        let span = document.createElement("span");
        let small = document.createElement("small");

        h4.textContent = upperCase(edu.children[0].value);
        span.textContent = upperCase(edu.children[1].value);

        small.textContent = edu.children[2].children[0].value + "  -  " + edu.children[2].children[1].value;

        item.append(h4, span, small);
        education.appendChild(item);
    })

});

document.querySelector("#downloadBtn")
    .addEventListener("click", function () {

       window.print();

    });

window.document.addEventListener("mousemove", function (dets) {
    let cursor = document.querySelector(".cursor");

    cursor.style.top = dets.clientY + "px";
    cursor.style.left = dets.clientX + "px";
});