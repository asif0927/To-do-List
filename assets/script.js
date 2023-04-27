let toDoForm = document.querySelector(".to-do-form");
let todoInp = document.querySelector("#to-do");
let list = document.querySelector(".todos");
let errortext = document.querySelector(".error-msg");
let searchBtn=document.querySelector(".search-btn");
let searchInput=document.querySelector("#searchInput");
let todos=[];
let todossearch=document.querySelector(".todos-search");
let selectsearch=document.querySelector(".select-search");
let select=document.querySelector("#doneFilter");
console.log(select);

toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (todoInp.value.trim() == "") {
    errortext.classList.replace("d-none", "d-block");
  } else {
    errortext.classList.replace("d-block", "d-none");
  }
  list.innerHTML +=
    todoInp.value ?
    `<li style="display: flex; justify-content: space-between; align-items: center;" class="list-group-item">
    <span>${todoInp.value}</span>
    <div>
        <button class="btn btn-warning done"><i class="fa-solid fa-check"></i></button>
        <button class="btn btn-danger remove"><i class="fa-solid fa-trash"></i></button>
    </div>
    </li>` :
    "";
    todos.push({
      toDoName: todoInp.value,
      isDone: false
    });
    console.log(todos);
    searchBtn.addEventListener("click",(event)=>{
      event.preventDefault();
      let searchitem = searchInput.value.toLowerCase();
      let filteredTodos = todos.filter(todo => todo.toDoName.toLowerCase().includes(searchitem));
    
      todossearch.innerHTML = "";
    
      if (filteredTodos.length > 0) {
        filteredTodos.forEach(todo => {
          todossearch.innerHTML += `
            <li style="display: flex; justify-content: space-between; align-items: center;" class="list-group-item">
              <span>${todo.toDoName}</span>
              <div>
              <button class="btn btn-warning done"><i class="fa-solid fa-check"></i></button>
              <button class="btn btn-danger remove"><i class="fa-solid fa-trash"></i></button>
             </div>
         </li>`;
        });
      } 
      else {
        todossearch.innerHTML = '<p>No matching todos found.</p>';
      }
    });   
    searchInput.value="";

    select.addEventListener("change", (event) => {
      let selectvalue=event.target.value;
      let filteTodos = todos;
      if(selectvalue=="yes"){
        filteTodos = todos.filter((todo) => todo.isDone === true);
        filteTodos.forEach(todo=>{
          selectsearch.innerHTML+=`
          <li style="display: flex; justify-content: space-between; align-items: center;" class="list-group-item">
            <span>${todo.toDoName}</span>
            <div>
            <button class="btn btn-warning done"><i class="fa-solid fa-check"></i></button>
            <button class="btn btn-danger remove"><i class="fa-solid fa-trash"></i></button>
           </div>
       </li>`;
        })
      }
      else{
        filteTodos = todos.filter((todo) => todo.isDone === false);
        filteTodos.forEach(todo=>{
          selectsearch.innerHTML+=`
          <li style="display: flex; justify-content: space-between; align-items: center;" class="list-group-item">
            <span>${todo.toDoName}</span>
            <div>
            <button class="btn btn-warning done"><i class="fa-solid fa-check"></i></button>
            <button class="btn btn-danger remove"><i class="fa-solid fa-trash"></i></button>
           </div>
       </li>`;
        })
      }
    });
  todoInp.value = "";


  //done
  let dones = document.querySelectorAll(".done");
  dones.forEach((item) => {
    item.addEventListener("click", function () {
      this.parentElement.previousElementSibling.style.textDecoration =
        "line-through";
    });
  });

  //remove
  let confirmModal = document.querySelector("#confirm-modal");
  let deleteConfirmYes = document.querySelector("#delete-confirm-yes");
  let deleteConfirmNo = document.querySelector("#delete-confirm-no");
  let removes = document.querySelectorAll(".remove");
  removes.forEach((item) => {
    item.addEventListener("click", function () {
      let listItem=this.parentElement.parentElement;
      document.body.classList.add("modal-body");
      confirmModal.style.visibility = "visible";
      confirmModal.style.opacity = "1";
      confirmModal.style.transform = "translate(-50%,-50%) scale(1)";

      deleteConfirmYes.addEventListener("click", function () {
        listItem.remove();
        document.body.classList.remove("modal-body");
        confirmModal.style.visibility = "hidden";
        confirmModal.style.opacity = "0";
        confirmModal.style.transform = "translate(-50%,-50%) scale(0)";
      });

      deleteConfirmNo.addEventListener("click", function () {
        document.body.classList.remove("modal-body");
        confirmModal.style.visibility = "hidden";
        confirmModal.style.opacity = "0";
        confirmModal.style.transform = "translate(-50%,-50%) scale(0)";
      });
      document.addEventListener("keydown", function (event) {
        if (event.keyCode === 27) {
          document.body.classList.remove("modal-body");
          confirmModal.style.visibility = "hidden";
          confirmModal.style.opacity = "0";
          confirmModal.style.transform = "translate(-50%,-50%) scale(0)";
        }
      });
    });
  });
});