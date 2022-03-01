// Whwenever the page loads we have to display the notes available in localStorage
showNotes();

let addBtn = document.getElementById('addBtn');

// Adding eventListner for 'Add note' button 
addBtn.addEventListener('click', function () {
    let inputTitle = document.getElementById('title');
    let noteTitles = localStorage.getItem('noteTitles');

    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    
    if (addTxt.value == "" || inputTitle.value == "") {
        window.alert("Make sure to enter both title and note");
    }
    else {
        if (noteTitles == null) {
            titlesObj = [];
        }
        else {
            titlesObj = JSON.parse(noteTitles);
        }
        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }
        //for title
        titlesObj.push(inputTitle.value);
        localStorage.setItem('noteTitles', JSON.stringify(titlesObj));
        inputTitle.value = "";
        //for note
        notesObj.push(addTxt.value);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = '';
        showNotes();
    }
})

function showNotes() {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('noteTitles')
    if (titles == null) {
        titlesObj = [];
    }
    else {
        titlesObj = JSON.parse(titles);
    }
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2" style="border:2px solid #0352fc; background-color:azure;">
                    <div class="card-body">
                        <h5 class="card-title">${titlesObj[index]}</h5>
                        <p class='card-text'>${element}</p>
                        <button id='${index}' onclick='deleteNode(this.id)' class="btn btn-primary">Delete note</button>
                    </div>
                 </div>`;
    });
    let noteElement = document.getElementById('notes');
    if (notesObj.length != 0) {
        noteElement.innerHTML = html;
    }
    else {
        noteElement.innerHTML = `<b>Nothing to show... Use 'Add note' button above to add a note</b>`
    }
}

function deleteNode(index) {
    let notes = localStorage.getItem('notes');
    let titles= localStorage.getItem('noteTitles')
    if (notes == null) {
        notesObj = [];
    }
    if(titles==null)
    {
        titlesObj=[];
    }
    else {
        notesObj = JSON.parse(notes);
        titlesObj = JSON.parse(titles);
    }
    notesObj.splice(index, 1); // delete one item from notesObj at given index
    titlesObj.splice(index,1); // delete one item from notesObj at given index
    localStorage.setItem('notes', JSON.stringify(notesObj))
    localStorage.setItem('noteTitles', JSON.stringify(titlesObj))

    // After deleting, display all the available notes
    showNotes();
}

let searchNote = document.getElementById('search');

// Adding eventListner for 'Search' box 
searchNote.addEventListener('input', function () {
    let inputVal = search.value;
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTexts = element.getElementsByTagName('p')[0].innerText;
        let titleTexts = element.getElementsByTagName('h5')[0].innerText
        
        cardTexts=cardTexts.toLowerCase()
        titleTexts=titleTexts.toLowerCase()
        inputVal=inputVal.toLowerCase()
        
        if (cardTexts.includes(inputVal) || titleTexts.includes(inputVal)) {
            // show those notes which contains the substring
            element.style.display = "block"
            
        }
        else {
            // hide those notes which contains the substring
            element.style.display = 'none'

        }
    })
})

// Updating current year as copyright year
let ti=new Date()
document.querySelector('#copyright-year').innerText=ti.getFullYear()
