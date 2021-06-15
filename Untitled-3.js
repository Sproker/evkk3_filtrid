
// global variables
let selectedKorpus = []; // every selected korpus
let selectedValues = []; // every selected value (väärtus)
let knames = []; // every selected korpus name
let filter;
const helpToggle = document.getElementById('help-toggle');
let availableValues = [];
let isHelpOn = true;
let filterhans = "elukoht";
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
            button.setAttribute('checked', '');

            docFrag.appendChild(button);

            var button2 = document.createElement('label');
            button2.setAttribute('class', 'checkbox');
            button2.setAttribute('for', ("btn-check"+y+x));
            var button3 = document.createElement('i');
            button3.setAttribute('class', 'fas fa-check');

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
    console.log(selectedKorpus.join())
    console.log("KORPUS " + selectedKorpus)
    let result;
    let lcValues = [];
    console.log("available v" + availableValues)
    console.log("DO I EXIST " + selectedValues)
    selectedValues.forEach((e) => {
        if (e == "tundmatu" && selectedValues.length != 0) {
            lcValues.splice(0, 0, "");
        } else {
            lcValues.push(e.toLowerCase());
        }
    });
    console.log("sv " + selectedValues.length)

    try {
        if (selectedKorpus.join().length == 0) {
            document.querySelector('#alamkorpused').style.display = 'none'
        } else {
            result = await $.ajax({
                url: "/api/texts/getDetailedValues?",
                type: "GET",
                data: { corpus: selectedKorpus.join(), pName: filter, pValue: lcValues.join() },
                // dataType: 'JSON'
            });
            console.log("AAAAAAA " + lcValues.join());
            loadStats(JSON.parse(result));
            console.log("ajax successful, parsed data: " + result)
            console.log(lcValues)
            // document.querySelector('#alamkorpused').style.display = 'block'
        }

    } catch (error) {
        console.error(error);
        console.log("error data: " + selectedKorpus.join());
    }
    console.log("TEST " + lcValues.join())
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
