function generatePDF() {
    const element = document.querySelector('#printInfo');

    const options = {
        margin: 2,
        filename: "гидрогель.pdf",
        jsPDF:{ orientation: 'portrait' }
    }

    html2pdf()
    .set(options)
    .from(element)
    .save();
}

function select(obj) {
    const element = document.querySelector('.mb-3')
    container.removeChild(element);
    container.innerHTML += `
    <div class="mb-3">
        <h2 for="" class="form-label">${obj.stringName}</h2>
        <select class="form-select mb-4" id="${obj.property}">
            <option selected>Выберите ${obj.stringName}</option>
        </select>
        <button class="btn btn-success" id="backToPolimer">Назад</button>
    </div>`;

    hydrogel[obj.property] = hydrogels[obj.index][obj.property];

    const options = document.querySelector('#' + obj.property);
    hydrogels[obj.index][obj.property].forEach(function(item, index) {
        if (typeof(item) == 'object') {
            options.innerHTML += `<option value="${index}">${item.solvent}</option>`;
        } else {
            options.innerHTML += `<option value="${index}">${item}</option>`;   
        }
    });
}; 

function secondaryblock() {
    container.innerHTML += `
    <div class="mb-2 bg-success px-3 pt-3 pb-1 rounded">
        <p class="text-light">Выбран полимер ${hydrogel.polimer}</p>
    </div>
    `;
};

// Клик по полимеру
function clickPolimer () {
    const selectPolimer = document.querySelector('#polimer');
    selectPolimer.addEventListener('change', function (e) { 
        hydrogel.polimer = hydrogels[e.target.value].polimer;
        hydrogel.indexPolimer = +e.target.value;
        secondaryblock();
        select({
            stringName : 'Раствоитель',
            index: e.target.value,
            property: 'solvents'
        });

        document.querySelector('#backToPolimer').addEventListener('click', backToPolimer);
        clickSolvent();
    });
};

function clickSolvent() {
    document.querySelector('#solvents').addEventListener('change', function (e) {
        hydrogel.indexSlovent = +e.target.value;
        hydrogel.solvents = hydrogels[hydrogel.indexPolimer].solvents[hydrogel.indexSlovent];

        modal.style.display = "block";

        const printInfo = document.querySelector('#printInfo');

        printInfo.innerHTML = `
            <h1 class="mb-5">БАЗОВЫЕ КОМПОНЕНТЫ И УСЛОВИЯ</h1>
            <h2>Компоненты </h2>
            <p>Полимер: <strong>${hydrogel.polimer}</strong></p>
            <p class="mb-5">Растворитель: <strong>${hydrogel.solvents.solvent}</strong> </p>

            <h2>Условия</h2>
            <p>Соотношение полимер / растворитель: <strong>${hydrogel.solvents.solvent}</strong></p>
            <p>Температура, ºС: <strong>${hydrogel.solvents.temp}</strong></p>
            <p class="mb-5">рН: <strong>${hydrogel.solvents.ph}</strong></p>

            <h1>ДОПОЛНИТЕЛЬНЫЕ КОМПОНЕНТЫ И УСЛОВИЯ</h1>
            <h2 class="mb-3">Загуститель </h2>
            <p><strong>${hydrogel.solvents.thickener}</strong></p>
        `;

        document.querySelector("#pdfSave").addEventListener('click', generatePDF);
    })
}
// Назад к выбору полимеру 
function backToPolimer (e) {
    
    const removeElement1 = document.querySelector('.mb-3')
    container.removeChild(removeElement1);
    const removeElement2 = document.querySelector('.mb-2');
    container.removeChild(removeElement2);
    container.innerHTML += `
    <div class="mb-3">
        <h2 for="" class="form-label">Выбор Полимер</h2>
        <select class="form-select mb-4" id="polimer">
            <option selected>Выберите Полимер</option>
        </select>
    </div>`;
    const selectPolimer = document.querySelector('#polimer');
    hydrogels.forEach(function (hydrogel, index, hydrogels) {
        selectPolimer.innerHTML += `<option value="${index}">${hydrogel.polimer}</option>`;
    })

    clickPolimer();
    delete hydrogel.polimer;
};

const hydrogel = {};

// Запуск и заполнения полимеров
const container = document.querySelector(".container");

const selectPolimer = document.querySelector('#polimer');

hydrogels.forEach(function (hydrogel, index, hydrogels) {
    selectPolimer.innerHTML += `<option value="${index}">${hydrogel.polimer}</option>`;
})

clickPolimer();
