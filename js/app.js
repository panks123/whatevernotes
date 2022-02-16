// console.log('Hello!!!!!');
showNotes();
let addBtn = document.getElementById('addBtn');
// console.log(addBtn)
addBtn.addEventListener('click', function () {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    let inputTitle = document.getElementById('title');
    // console.log(title.value);//*
    let noteTitles = localStorage.getItem('noteTitles');
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
        // console.log(notesObj);
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
    // console.log("xxx "+titlesObj[0])
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard my-2 mx-2" style="width: 18rem; border:1px solid black">
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
    // console.log(index+"  being deleted");
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
    notesObj.splice(index, 1);
    titlesObj.splice(index,1);
    localStorage.setItem('notes', JSON.stringify(notesObj))
    localStorage.setItem('noteTitles', JSON.stringify(titlesObj))
    // console.log(notesObj);
    
    showNotes();
}

let searchNote = document.getElementById('search');
// console.log(searchNote);
searchNote.addEventListener('input', function () {
    let inputVal = search.value;
    // console.log('input event fired',inputVal)
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTexts = element.getElementsByTagName('p')[0].innerText;
        let titleTexts = element.getElementsByTagName('h5')[0].innerText
        // console.log(titleTexts);
        if (cardTexts.includes(inputVal) || titleTexts.includes(inputVal)) {
            element.style.display = "block"
            
        }
        else {
            element.style.display = 'none'

        }
    })
})
