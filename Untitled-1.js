
// global variables
let selectedKorpus = []; // every selected korpus
let selectedValues = []; // every selected value (väärtus)
let knames = []; // every selected korpus name
let filter;
const helpToggle = document.getElementById('help-toggle');
let availableValues = [];
let isHelpOn = true;
let filterhans = "elukoht";
let selectedSugu = [];
let selectedElukoht = [];
let selectedHaridus=[];
let selectedVanus = [];
let selectedEmakeel = [];
let selectedKeeletase = [];
let selectedSotsiaalnetaust = [];
let selectedkodunekeel = [];
let selectedtekstikeel = [];
let selectedtekstityyp = [];
let selectedabivahendid = [];

//updateFilter();

// On page load
$(document).ready(async function () {
    filter = document.querySelector("#filterBy").value; // current filter
    // initial fetchers on page load, to display stats
    // main stats
    // readfilter2fromDB(filter);
    await updateFilter();
    await updateKorpusCheckboxes();
    // show()
    // await fetchAll();
    // await fetchMiniStats();

    showDefault();
    // event listeners
    document.querySelectorAll('input[name=korpus]')
        .forEach(el => el
            .addEventListener('click', updateKorpusCheckboxes));
    document.querySelectorAll('input[name=sugu]')
        .forEach(el => el
            .addEventListener('click', updateSuguCheckboxes));
    document.querySelectorAll('input[name=elukoht]')
        .forEach(el => el
            .addEventListener('click', updateElukohtCheckboxes));
    document.querySelectorAll('input[name=haridus]')
        .forEach(el => el
        .addEventListener('click', updateHaridusCheckboxes));
    document.querySelectorAll('input[name=vanus]')
        .forEach(el => el
        .addEventListener('click', updateVanusCheckboxes));
    document.querySelectorAll('input[name=emakeel]')
        .forEach(el => el
        .addEventListener('click', updateEmakeelCheckboxes));
    document.querySelectorAll('input[name=tekstikeel]')
        .forEach(el => el
        .addEventListener('click', updatetekstikeelCheckboxes));
    document.querySelectorAll('input[name=taust]')
        .forEach(el => el
        .addEventListener('click', updateSotsiaalnetaustCheckboxes));
    document.querySelectorAll('input[name=kodukeel]')
        .forEach(el => el
        .addEventListener('click', updateKodunekeelCheckboxes));
    document.querySelectorAll('input[name=tekstityyp]')
        .forEach(el => el
        .addEventListener('click', updateTekstityypCheckboxes));
    document.querySelectorAll('input[name=abivahendid]')
        .forEach(el => el
        .addEventListener('click', updateAbivahendidCheckboxes));
document.querySelectorAll('input[name=keeletase]')
        .forEach(el => el
        .addEventListener('click', updateKeeletaseCheckboxes));
        
   

document.querySelector("#selectAllKorpus").addEventListener("click", selectKorpus);
    document.querySelector("#unselectAllKorpus").addEventListener("click", deselectKorpus);
    document.querySelector("#filterBy").addEventListener("change", updateFilter);
    helpToggle.addEventListener('click', show); 
});

function showDefault() {
   
    $("#selectAllKorpus").attr({"aria-label":"Valib kõik korpused", "data-balloon-pos":"up", "class":"tooltip-green"})
    $("#unselectAllKorpus").attr({"aria-label":"Eemaldab kõik korpused", "data-balloon-pos":"up", "class":"tooltip-green"})
    $("#documents2").attr({"aria-label":"Dokumentide koguarv", "data-balloon-pos":"up", "class":"tooltip-green"})
    $("#korpusSelection").attr({"aria-label":"Korpused on töödeldud tekstide kogumid, mis on grupeeritud mingite kindlate kategooriate järgi.", "data-balloon-pos":"right", "class":"tooltip-green"})
    $("#words2").attr({"aria-label":"Sõnade kogu arv", "data-balloon-pos":"up", "class":"tooltip-green"})
    $("#sentences2").attr({"aria-label":"Lausete kogu arv", "data-balloon-pos":"up", "class":"tooltip-green"})
    $("#pede").attr({"aria-label":"Siin saab täpsustada otsingut", "data-balloon-pos":"right", "class":"tooltip-green"})
    $("#SecondFilterSelection").attr({"aria-label":"Siin saab täpsustada otsingut", "data-balloon-pos":"right", "class":"tooltip-green"})
    $("#selectAllChoices").attr({"aria-label":"Valib kõik kitsendused", "data-balloon-pos":"up", "class":"tooltip-green"}) 
    $("#unselectAllChoices").attr({"aria-label":"Eemaldab kõik kitsendused", "data-balloon-pos":"up", "class":"tooltip-green"})   
}

function show(){
    if(isHelpOn){

        $("#selectAllKorpus").removeAttr('aria-label data-balloon-pos class')
        $("#unselectAllKorpus").removeAttr('aria-label data-balloon-pos class')
        $("#documents2").removeAttr('aria-label data-balloon-pos class')
        $("#korpusSelection").removeAttr('aria-label data-balloon-pos class')
        $("#words2").removeAttr('aria-label data-balloon-pos class')
        $("#sentences2").removeAttr('aria-label data-balloon-pos class')
        $("#pede").removeAttr('aria-label data-balloon-pos class')
        $("#SecondFilterSelection").removeAttr('aria-label data-balloon-pos class')
        $("#selectAllChoices").removeAttr('aria-label data-balloon-pos class')
        $("#SecondFilterSelection").removeAttr('aria-label data-balloon-pos class')
     
        helpToggle.style.color = 'rgb(213, 237, 219)';
        isHelpOn = false;

    } else {
        helpToggle.style.color = 'rgb(37, 63, 47)';
        
        $("#selectAllKorpus").attr({"aria-label":"Valib kõik korpused", "data-balloon-pos":"up", "class":"tooltip-green"})
        $("#unselectAllKorpus").attr({"aria-label":"Eemaldab kõik korpused", "data-balloon-pos":"up", "class":"tooltip-green"})
        $("#documents2").attr({"aria-label":"Dokumentide koguarv", "data-balloon-pos":"up", "class":"tooltip-green"})
        $("#korpusSelection").attr({"aria-label":"Korpused on töödeldud tekstide kogumid, mis on grupeeritud mingite kindlate kategooriate järgi.", "data-balloon-pos":"right", "class":"tooltip-green"})
        $("#words2").attr({"aria-label":"Sõnade kogu arv", "data-balloon-pos":"up", "class":"tooltip-green"})
        $("#sentences2").attr({"aria-label":"Lausete kogu arv", "data-balloon-pos":"up", "class":"tooltip-green"})
        $("#pede").attr({"aria-label":"Siin saab täpsustada otsingut", "data-balloon-pos":"right", "class":"tooltip-green"})
        $("#SecondFilterSelection").attr({"aria-label":"Siin saab täpsustada otsingut", "data-balloon-pos":"right", "class":"tooltip-green"})
        $("#selectAllChoices").attr({"aria-label":"Valib kõik kitsendused", "data-balloon-pos":"up", "class":"tooltip-green"}) 
        $("#unselectAllChoices").attr({"aria-label":"Eemaldab kõik kitsendused", "data-balloon-pos":"up", "class":"tooltip-green"})       
        isHelpOn = true;

    }
}

function clearAll{
    
}

async function updateSuguCheckboxes() {
    filter = document.querySelector("#filterBy").value;
    selectedSugu = [];
    let Sugucheckboxes = document.querySelectorAll('input[name=sugu]:checked');
    let allSuguCheckboxes = document.querySelectorAll('input[name=sugu]');
    for (let i = 0; i < allSuguCheckboxes.length; i++) {
        let next = allSuguCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (Sugucheckboxes.length == 0) {
        //Sugu_names = [];
        for (i = 0; i < Sugucheckboxes.length; i++) {
            Sugucheckboxes[i].checked = true;
            let next = Sugucheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'none'
        }
    } else {
        for (let i = 0; i < Sugucheckboxes.length; i++) {
            selectedSugu.push(Sugucheckboxes[i].defaultValue);
            let next = Sugucheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'block'
        }
    }
    console.log(selectedSugu);

}

async function updateElukohtCheckboxes() {
    selectedElukoht = [];
    let Elukohtcheckboxes = document.querySelectorAll('input[name=elukoht]:checked');
    let allelukohtCheckboxes = document.querySelectorAll('input[name=elukoht]');
    for (let i = 0; i < allelukohtCheckboxes.length; i++) {
        let next = allelukohtCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (Elukohtcheckboxes.length == 0) {
        //Sugu_names = [];
        for (i = 0; i < Elukohtcheckboxes.length; i++) {
            Elukohtcheckboxes[i].checked = true;
            let next = Elukohtcheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'none'
        }
    } else {
        for (let i = 0; i < Elukohtcheckboxes.length; i++) {
            selectedElukoht.push(Elukohtcheckboxes[i].defaultValue);
            let next = Elukohtcheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'block'
        }
    }
    console.log(selectedElukoht);

}

async function updateHaridusCheckboxes() {
    selectedHaridus = [];
    let Hariduscheckboxes = document.querySelectorAll('input[name=haridus]:checked');
    let allSHaridusCheckboxes = document.querySelectorAll('input[name=haridus]');
    for (let i = 0; i < allSHaridusCheckboxes.length; i++) {
        let next = allSHaridusCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (Hariduscheckboxes.length == 0) {
        //Sugu_names = [];
        for (i = 0; i < Hariduscheckboxes.length; i++) {
            Hariduscheckboxes[i].checked = true;
            let next = Hariduscheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'none'
        }
    } else {
        for (let i = 0; i < Hariduscheckboxes.length; i++) {
            selectedHaridus.push(Hariduscheckboxes[i].defaultValue);
            let next = Hariduscheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'block'
        }
    }
    console.log(selectedHaridus);

}

async function updateVanusCheckboxes() {
    selectedVanus = [];
    let vanuscheckboxes = document.querySelectorAll('input[name=vanus]:checked');
    let allvanusCheckboxes = document.querySelectorAll('input[name=vanus]');
    for (let i = 0; i < allvanusCheckboxes.length; i++) {
        let next = allvanusCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (vanuscheckboxes.length == 0) {
        //Sugu_names = [];
        for (i = 0; i < vanuscheckboxes.length; i++) {
            vanuscheckboxes[i].checked = true;
            let next = vanuscheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'none'
        }
    } else {
        for (let i = 0; i < vanuscheckboxes.length; i++) {
            selectedVanus.push(vanuscheckboxes[i].defaultValue);
            let next = vanuscheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'block'
        }
    }
    console.log(selectedVanus);

}

async function updateEmakeelCheckboxes() {
    filter = document.querySelector("#filterBy").value;
    selectedEmakeel = [];
    let emakeelcheckboxes = document.querySelectorAll('input[name=emakeel]:checked');
    let allemakeelCheckboxes = document.querySelectorAll('input[name=emakeel]');
    for (let i = 0; i < allemakeelCheckboxes.length; i++) {
        let next = allemakeelCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (emakeelcheckboxes.length == 0) {
        //Sugu_names = [];
        for (i = 0; i < emakeelcheckboxes.length; i++) {
            emakeelcheckboxes[i].checked = true;
            let next = emakeelcheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'none'
        }
    } else {
        for (let i = 0; i < emakeelcheckboxes.length; i++) {
            selectedEmakeel.push(emakeelcheckboxes[i].defaultValue);
            let next = emakeelcheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'block'
        }
    }
    console.log(selectedEmakeel);

}

async function updateKeeletaseCheckboxes() {
    selectedKeeletase = [];
    let keeletasecheckboxes = document.querySelectorAll('input[name=keeletase]:checked');
    let allkeeletaseCheckboxes = document.querySelectorAll('input[name=keeletase]');
    for (let i = 0; i < allkeeletaseCheckboxes.length; i++) {
        let next = allkeeletaseCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (keeletasecheckboxes.length == 0) {
        //Sugu_names = [];
        for (i = 0; i < keeletasecheckboxes.length; i++) {
            keeletasecheckboxes[i].checked = true;
            let next = keeletasecheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'none'
        }
    } else {
        for (let i = 0; i < keeletasecheckboxes.length; i++) {
            selectedKeeletase.push(keeletasecheckboxes[i].defaultValue);
            let next = keeletasecheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'block'
        }
    }
    console.log(selectedKeeletase);

}

async function updateSotsiaalnetaustCheckboxes() {
    selectedSotsiaalnetaust = [];
    let Sotsiaalnetaustcheckboxes = document.querySelectorAll('input[name=taust]:checked');
    let allSotsiaalnetaustCheckboxes = document.querySelectorAll('input[name=taust]');
    for (let i = 0; i < allSotsiaalnetaustCheckboxes.length; i++) {
        let next = allSotsiaalnetaustCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (Sotsiaalnetaustcheckboxes.length == 0) {
        //Sugu_names = [];
        for (i = 0; i < Sotsiaalnetaustcheckboxes.length; i++) {
            Sotsiaalnetaustcheckboxes[i].checked = true;
            let next = Sotsiaalnetaustcheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'none'
        }
    } else {
        for (let i = 0; i < Sotsiaalnetaustcheckboxes.length; i++) {
            selectedSotsiaalnetaust.push(Sotsiaalnetaustcheckboxes[i].defaultValue);
            let next = Sotsiaalnetaustcheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'block'
        }
    }
    console.log(selectedSotsiaalnetaust);

}

async function updateKodunekeelCheckboxes() {
    selectedkodunekeel = [];
    let kodunekeelcheckboxes = document.querySelectorAll('input[name=kodukeel]:checked');
    let allkodunekeelCheckboxes = document.querySelectorAll('input[name=kodukeel]');
    for (let i = 0; i < allkodunekeelCheckboxes.length; i++) {
        let next = allkodunekeelCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (kodunekeelcheckboxes.length == 0) {
        //Sugu_names = [];
        for (i = 0; i < kodunekeelcheckboxes.length; i++) {
            kodunekeelcheckboxes[i].checked = true;
            let next = kodunekeelcheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'none'
        }
    } else {
        for (let i = 0; i < kodunekeelcheckboxes.length; i++) {
            selectedkodunekeel.push(kodunekeelcheckboxes[i].defaultValue);
            let next = kodunekeelcheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'block'
        }
    }
    console.log(selectedkodunekeel);

}

async function updatetekstikeelCheckboxes() {
    selectedtekstikeel = [];
    let tekstikeelcheckboxes = document.querySelectorAll('input[name=tekstikeel]:checked');
    let alltekstikeelCheckboxes = document.querySelectorAll('input[name=tekstikeel]');
    for (let i = 0; i < alltekstikeelCheckboxes.length; i++) {
        let next = alltekstikeelCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (tekstikeelcheckboxes.length == 0) {
        //Sugu_names = [];
        for (i = 0; i < tekstikeelcheckboxes.length; i++) {
            tekstikeelcheckboxes[i].checked = true;
            let next = tekstikeelcheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'none'
        }
    } else {
        for (let i = 0; i < tekstikeelcheckboxes.length; i++) {
            selectedtekstikeel.push(tekstikeelcheckboxes[i].defaultValue);
            let next = tekstikeelcheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'block'
        }
    }
    console.log(selectedtekstikeel);

}

async function updateTekstityypCheckboxes() {
    selectedtekstityyp = [];
    let tekstityypcheckboxes = document.querySelectorAll('input[name=tekstityyp]:checked');
    let alltekstityypCheckboxes = document.querySelectorAll('input[name=tekstityyp]');
    for (let i = 0; i < alltekstityypCheckboxes.length; i++) {
        let next = alltekstityypCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (tekstityypcheckboxes.length == 0) {
        //Sugu_names = [];
        for (i = 0; i < tekstityypcheckboxes.length; i++) {
            tekstityypcheckboxes[i].checked = true;
            let next = tekstityypcheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'none'
        }
    } else {
        for (let i = 0; i < tekstityypcheckboxes.length; i++) {
            selectedtekstityyp.push(tekstityypcheckboxes[i].defaultValue);
            let next = tekstityypcheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'block'
        }
    }
    console.log(selectedtekstityyp);

}

async function updateAbivahendidCheckboxes() {
    selectedabivahendid = [];
    let abivahendidcheckboxes = document.querySelectorAll('input[name=abivahendid]:checked');
    let allabivahendidCheckboxes = document.querySelectorAll('input[name=abivahendid]');
    for (let i = 0; i < allabivahendidCheckboxes.length; i++) {
        let next = allabivahendidCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (abivahendidcheckboxes.length == 0) {
        //Sugu_names = [];
        for (i = 0; i < abivahendidcheckboxes.length; i++) {
            abivahendidcheckboxes[i].checked = true;
            let next = abivahendidcheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'none'
        }
    } else {
        for (let i = 0; i < abivahendidcheckboxes.length; i++) {
            selectedabivahendid.push(abivahendidcheckboxes[i].defaultValue);
            let next = abivahendidcheckboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'block'
        }
    }
    console.log(selectedabivahendid);

}


async function readfilter2fromDB() { // LOOME FILTER 2 LOetelu
    let LISTIKE = ["sugu", "vanus", "haridus", "kodukeel", "emakeel", "tekstikeel", "abivahendid", "taust", "keeletase", "tekstityyp","elukoht"];
    for(var y = 0; y < LISTIKE.length; y++){
        var x = document.getElementById(LISTIKE[y]);

        // availableValues = [];
        //await fetchAvailableValues();
        await fetchAvailableValues_hans(LISTIKE[y]);
        var docFrag = document.createDocumentFragment();

        for(var x = 0; x < availableValues.length; x++){
            var button = document.createElement('input');
            button.setAttribute('type', 'checkbox');
            button.setAttribute('name', LISTIKE[y]);
            button.setAttribute('value', availableValues[x].toLowerCase());
            button.setAttribute('class', 'btn-check');
            button.setAttribute('id', ("btn-check"+y+x));
            button.setAttribute('autocomplete', 'off');
            //button.setAttribute('checked', '');

            docFrag.appendChild(button);

            var button2 = document.createElement('label');
            button2.setAttribute('class', 'checkbox');
            button2.setAttribute('for', ("btn-check"+y+x));
            var button3 = document.createElement('i');
            button3.setAttribute('class', 'fas fa-check hidden');

            button2.appendChild(button3);

            var button4 = document.createElement('span');
            button4.innerHTML = availableValues[x]; // clear existing
            button2.appendChild(button4);

            docFrag.appendChild(button2);

            //docFrag.appendChild(button3);
        }

        if(LISTIKE[y] == "sugu"){
            document.getElementById("Sugu_Filter_Nupud").appendChild(docFrag);
        }else if(LISTIKE[y] == "elukoht"){
            document.getElementById("Elukoht_Filter_Nupud").appendChild(docFrag);
        }else if(LISTIKE[y] == "vanus"){
            document.getElementById("Vanus_Filter_Nupud").appendChild(docFrag);
        }else if(LISTIKE[y] == "haridus"){
            document.getElementById("Haridus_Filter_Nupud").appendChild(docFrag);
        }else if(LISTIKE[y] == "kodukeel"){
            document.getElementById("Kodunekeel_Filter_Nupud").appendChild(docFrag);
        }else if(LISTIKE[y] == "emakeel"){
            document.getElementById("Emakeel_Filter_Nupud").appendChild(docFrag);
        }else if(LISTIKE[y] == "tekstikeel"){
            document.getElementById("Tekstikeel_Filter_Nupud").appendChild(docFrag);
        }else if(LISTIKE[y] == "abivahendid"){
            document.getElementById("abivahendid_Filter_Nupud").appendChild(docFrag);
        }else if(LISTIKE[y] == "taust"){
            document.getElementById("sotsiaalnetaust_Filter_Nupud").appendChild(docFrag);
        }else if(LISTIKE[y] == "keeletase"){
            document.getElementById("Keelevaldamisetase_Filter_Nupud").appendChild(docFrag);
        }else if(LISTIKE[y] == "tekstityyp"){
            document.getElementById("tekstityyp_Filter_Nupud").appendChild(docFrag);
        }
    }

    

}


async function updateFilter2Checkboxes() {
    filter = document.querySelector("#filterBy").value;
    selectedValues = [];
    let checkboxes = document.querySelectorAll('input[name='+filter+']:checked');
    let allCheckboxes = document.querySelectorAll('input[name='+filter+']');
    for (let i = 0; i < allCheckboxes.length; i++) {
        let next = allCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (checkboxes.length == 0 || selectedKorpus.length == 0) {
        for (i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            let next = checkboxes[i].nextElementSibling.firstChild;
        }
        document.querySelector('#alamkorpused').style.display = 'none'
        
    } else {
        for (let i = 0; i < checkboxes.length; i++) {
            selectedValues.push(checkboxes[i].defaultValue);
            let next = checkboxes[i].nextElementSibling.firstChild;
        }
        document.querySelector('.echarts').style.display = 'block'
        
    }
    
}

// Checkbox style manipulation (checks everything), then fetches all stats
async function selectFilter2Checkboxes() {
    filter = document.querySelector("#filterBy").value;
    let checkboxes = document.querySelectorAll('input[name='+filter+']');
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
        let next = checkboxes[i].nextElementSibling.firstChild;
        next.classList.remove("hidden");
        next.classList.remove("add");
        
    }
    updateKorpusCheckboxes();
}

// Checkbox style manipulation (unchecks everything)
function deselectFilter2Checkboxes() {
    let checkboxes = document.querySelectorAll('input[name='+filter+']');
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        let next = checkboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
        
    }
    document.querySelector("#alamkorpused").style.display = 'none';
}



// AJAX for fetching mini stats
async function fetchMiniStats() {
    filter = document.querySelector("#filterBy").value;
    let result;
    try {
        result = await $.ajax({
            url: "/api/texts/getMiniStats",
            type: "GET",
            data: { corpus: selectedKorpus.join() },
        });
        
        
        loadMiniStats(JSON.parse(result));
        
    } catch (error) {
        console.error(error);
        
    }
}

// Loading the mini stats
function loadMiniStats(results) {
    if(results == null){
        document.querySelector("#documents").innerHTML = "0";
        document.querySelector("#sentences").innerHTML = "0";
        document.querySelector("#words").innerHTML = "0";
    }
    else if(results[0].sum != 0) {
        document.querySelector("#documents").innerHTML = numberWithCommas(results[0].sum);
        document.querySelector("#sentences").innerHTML = numberWithCommas(results[0].lauseid);
        document.querySelector("#words").innerHTML = numberWithCommas(results[0].sonu);

    }else{
        document.querySelector("#documents").innerHTML = "0";
        document.querySelector("#sentences").innerHTML = "0";
        document.querySelector("#words").innerHTML = "0";
    }
}

// Number beautifier. For example: '123456789' into '123 456 789'
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// updates the stats title, beautifies them, then executes checkbox updater
async function updateFilter() {
    filter = document.querySelector("#filterBy").value;
    let beautify;
    switch (filter) {
        case "vanus":
            beautify = "vanuse";
            break;
        case "haridus":
            beautify = "hariduse";
            break;
        case "sugu":
            beautify = "soo";
            break;
        case "elukoht":
            beautify = "elukoha";
            break;
        case "kodukeel":
            beautify = "kodukeele";
            break;
        case "emakeel":
            beautify = "emakeele";
            break;
        case "tekstikeel":
            beautify = "tekstikeele";
            break;
        case "abivahendid":
            beautify = "abivahendite";
            break;
        case "taust":
            beautify = "sotsiaalse tausta";
            break;
        case "keeletase":
            beautify = "keeletaseme";
            break;
        case "tekstikeel":
            beautify = "tekstikeele";
            break;
        case "tekstityyp":
            beautify = "tekstitüübi";
            break;
    }
    document.querySelector(".stats h2").innerHTML = `Tekstid ${beautify} järgi`;
    await readfilter2fromDB();
    await updateKorpusCheckboxes();
}

// Checkbox style manipulation (checks everything), then fetches all stats
async function selectKorpus() {
    let checkboxes = document.querySelectorAll('input[name=korpus]');
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = true;
        let next = checkboxes[i].nextElementSibling.firstChild;
        next.classList.remove("hidden");
        next.classList.remove("add");
        console.log("added " + next);
    }
    await updateKorpusCheckboxes();
    await fetchMiniStats();
    console.log("selected")
}

// Checkbox style manipulation (unchecks everything)
function deselectKorpus() {
    let checkboxes = document.querySelectorAll('input[name=korpus]');
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
        let next = checkboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
        console.log("removed " + next);
    }
    console.log("deselected")
    loadMiniStats(null);
    document.querySelector("#alamkorpused").style.display = 'none';
}

// Collects every selected korpus checkbox, styles them and then fetches appropriate stats
async function updateKorpusCheckboxes() {
    filter = document.querySelector("#filterBy").value;
    // await readfilter2fromDB(filter);
    selectedKorpus = [];
    let checkboxes = document.querySelectorAll('input[name=korpus]:checked');
    let allCheckboxes = document.querySelectorAll('input[name=korpus]');
    for (let i = 0; i < allCheckboxes.length; i++) {
        let next = allCheckboxes[i].nextElementSibling.firstChild;
        next.classList.add("hidden");
    }
    if (checkboxes.length == 0) {
        knames = [];
        for (i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
            let next = checkboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'none'
        }
    } else {
        for (let i = 0; i < checkboxes.length; i++) {
            selectedKorpus.push(checkboxes[i].defaultValue);
            let next = checkboxes[i].nextElementSibling.firstChild;
            next.classList.remove("hidden");
            document.querySelector('#alamkorpused').style.display = 'block'
        }
    }
    await updateFilter2Checkboxes()
    await fetchSome();
    await fetchMiniStats();
}

// fetches Korpus names, used in updateKorpusCheckboxes()
// async function fetchKorpusNames(korpusCodes) {
//     let result;
//     try {
//         result = await $.ajax({
//             url: "db/server.php",
//             type: "POST",
//             data: { fetchKorpusName: true, selectedKorpus: korpusCodes },
//             dataType: 'JSON',
//         });
//         console.log("AJAX: Fetching names...: " + result);
//         return result;
//     } catch (error) {
//         console.error(error);
//     }
// }

// AJAX for fetching data from ALL korpuses
// async function fetchAll() {
//     console.log(selectedKorpus.join())
//     console.log(selectedKorpus)
//     let result;
//     try {
//         result = await $.ajax({
//             url: "/api/texts/getDetailedValues",
//             type: "GET",
//             data: { corpus: 'cFqPphvYi', pName: "vanus"},
//             // dataType: 'JSON',
//         });
//         // loadStats(result);
//         console.log("WORKING" + JSON.stringify(result));
//     } catch (error) {
//         console.error(error);
//         console.log("NOT WORKING" + JSON.stringify(result));
//     }
// }

// AJAX for fetching data from SELECTED korpuses
async function fetchSome() {
    filter = document.querySelector("#filterBy").value; // current filter
    console.log(filter);

    console.log(selectedKorpus.join())
    console.log(selectedKorpus)
    let result;
    try {
        result = await $.ajax({
            url: "/api/texts/getDetailedValues",
            type: "GET",
            data: { corpus: selectedKorpus.join(), pName: filter},
            // dataType: 'JSON'
        });
        loadStats(JSON.parse(result));
        console.log("ajax successful, parsed data: " + result)
    } catch (error) {
        console.error(error);
    }
}

async function fetchAvailableValues() {
    let result;
    document.getElementById('SecondFilterSelection').innerHTML="";
    availableValues = [];
    try {
        result = await $.ajax({
            url: "/api/texts/getAvailableValues",
            type: "GET",
            data: { pName: filter},
        });

        // turn available value data to list
        JSON.parse(result).forEach((e) => {
            if (e.value == "") {
                availableValues.push("TUNDMATU");
            } else {
                availableValues.push(e.value
                    .replace(/y/g, "ü").charAt(0).toUpperCase() + e.value.slice(1));
            }
        });
        console.log("available values: " + availableValues);
    } catch (error) {
        console.error(error);
    }
}

async function fetchAvailableValues_hans(filterloomiseks) {
    let result;
    document.getElementById('Elukoht_Filter_Nupud').innerHTML="";
    availableValues = [];
    try {
        result = await $.ajax({
            url: "/api/texts/getAvailableValues",
            type: "GET",
            data: { pName: filterloomiseks},
        });

        // turn available value data to list
        JSON.parse(result).forEach((e) => {
            if (e.value == "") {
                availableValues.push("TUNDMATU");
            } else {
                availableValues.push(e.value
                    .replace(/y/g, "ü").charAt(0).toUpperCase() + e.value.slice(1));
            }
        });
        //console.log("available values: " + availableValues);
    } catch (error) {
        console.error(error);
    }
}

// Echarts code
function loadStats(data) {
    let ages = []
    let filterData = data;

    // filter gained data
    filterData.forEach((e) => {
        if (e.value == "") {
            ages.push("TUNDMATU");
        } else {
            ages.push(e.value
                .replace(/y/g, "ü")
                .toUpperCase());
        }
    });

    // set categories for chart
    let percent = [];
    let texts = [];
    let words = [];
    let sentences = [];
    let errors = [];
    let errorTypes = [];
    filterData.forEach((e) => {
        percent.push(parseFloat(e.protsent).toFixed(2));
        texts.push(e.tekste);
        words.push(e.sonu);
        sentences.push(e.lauseid);
        errors.push(e.vigu);
        errorTypes.push(e.veatyype);
    });

    // initialize chart
    let chartDom = document.getElementById('alamkorpused');
    let myChart = echarts.init(chartDom);
    let option;

    // colors
    let colors = ['#5470C6', '#0e6e21', '#EE6666', '#411561',
        '#61154a', '#8a3c0c'];

    // responsive width
    $(window).on('resize', function () {
        myChart.resize();
    });

    // chart settings
    option = {
        color: colors,

        title: {
            text: "Keelekorpus",
            show: false
        },
        calculatable: true,

        tooltip: {
            trigger: 'axis',
            // axisPointer: {
            //     type: 'cross'
            // }
        },

        grid: {
            containLabel: true,
            width: "auto",
        },
        toolbox: {
            show: true,
            left: "center",
            bottom: "bottom",
            color: '#333',
            itemSize: 30,
            itemGap: 35,
            feature: {
                dataView: { show: true, readOnly: true, title: "Andmed" },
                saveAsImage: { show: true, title: "Laadi alla", color: "red" },
                magicType: {
                    show: true,
                    type: ['line', 'bar'],
                },
            }
        },
        legend: {
            data: ['Protsent', 'Tekste', 'Sõnu', 'Lauseid', 'Vigu'],
            selected: {
                'Protsent': true, 'Tekste': false, 'Sõnu': false,
                'Lauseid': false, 'Vigu': false, 'Veatüüpe': false
            },
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: ages,
                axisLabel: {
                    color: '#333',
                    interval: 0,
                    rotate: 45,
                },
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                //show: false,
                type: 'value',
                name: '',
                
                position: 'right',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[1],
                        fontSize: 18
                    }
                },
                axisLabel: {
                    show: false,
                    //containLabel: true,
                    formatter: ''
                }
            },
            {
                //show: false,
                type: 'value',
                name: '',
                
                position: 'right',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[1],
                        fontSize: 18
                    }
                },
                axisLabel: {
                    show: false,
                    //containLabel: true,
                    formatter: ''
                }
            },
            {
                //show: false,
                type: 'value',
                name: '',
                
                position: 'right',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[1],
                        fontSize: 18
                    }
                },
                axisLabel: {
                    show: false,
                    //containLabel: true,
                    formatter: ''
                }
            },
            {
                //show: false,
                type: 'value',
                name: '',
                
                position: 'right',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[1],
                        fontSize: 18
                    }
                },
                axisLabel: {
                    show: false,
                    //containLabel: true,
                    formatter: ''
                }
            },
            {
                //show: false,
                type: 'value',
                name: '',
                
                position: 'right',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[1],
                        fontSize: 18
                    }
                },
                axisLabel: {
                    show: false,
                    //containLabel: true,
                    formatter: ''
                }
            },
            {
                //show: false,
                type: 'value',
                name: '',
                
                position: 'right',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[1],
                        fontSize: 18
                    }
                },
                axisLabel: {
                    show: false,
                    //containLabel: true,
                    formatter: ''
                }
            }
        ],
        series: [
            {
                name: 'Protsent',
                type: 'bar',
                data: percent,
            },
            {
                name: 'Tekste',
                type: 'bar',
                yAxisIndex: 1,
                data: texts
            },
            {
                name: 'Sõnu',
                type: 'bar',
                yAxisIndex: 2,
                data: words
            },
            {
                name: 'Lauseid',
                type: 'bar',
                yAxisIndex: 3,
                data: sentences
            },
            {
                name: 'Vigu',
                type: 'bar',
                yAxisIndex: 4,
                data: errors
            },
            {
                name: 'Veatüüpe',
                type: 'bar',
                yAxisIndex: 5,
                data: errorTypes
            }
        ]
    };
    option && myChart.setOption(option);
}
