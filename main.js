const form = document.querySelector(".grocery-form");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const alert= document.querySelector(".alert");
const submitBtn= document.querySelector(".submit-btn");
const clearBtn= document.querySelector(".clear-btn");
const grocery = document.getElementById("grocery")

let editFlag = false
let editElement;
let editID=""
let control=0

form.addEventListener("submit", addItem)
clearBtn.addEventListener("click", clearItems)

function displayAlert(text, action){
alert.textContent=text
alert.classList.add(`alert-${action}`)
setTimeout(()=>{
    alert.textContent=""
    alert.classList.remove(`alert-${action}`)
},1000)
}

function addItem(e) {
    e.preventDefault()
    const value = grocery.value
    const id = new Date().getTime().toString();

    if (value !== "" && !editFlag) {
        const element = document.createElement("article")
        let attr = document.createAttribute("data-id")
        attr.value = id
        element.setAttributeNode(attr)
        element.classList.add("grocery-item")
        element.innerHTML = `
        <p class="title">${value}</p>
                    <div class="btn-container">
                        <button type="button" class="edit-btn">
                            <i class="fa-solid fa-pen-to-square"></i>
                          </button>
                          <button type="button" class="delete-btn">
                            <i class="fa-solid fa-trash"></i>
                          </button>
                    </div>
        `
        control=control+1
       const deleteBtn = element.querySelector(".delete-btn")
       deleteBtn.addEventListener("click", deleteItem)
       const editBtn = element.querySelector(".edit-btn")
       editBtn.addEventListener("click", editItem)
       clearBtn.addEventListener("click",listeyiTemizle)
        list.appendChild(element)
        displayAlert("başarıyla eklendi", "success")
        container.classList.add("show-container")
        clearBtn.classList.add("clear-show")
        grocery.value=""
    }else if (value !== "" && editFlag) {
        editElement.innerHTML=value
        displayAlert("değer değiştirildi", "success")
        editFlag=false
        grocery.value=""
        submitBtn.textContent="ekle"
    } 
    else{
        displayAlert("lütfen bir ürün ekleyiniz", "danger")
    }

}
function deleteItem(e){
    const element=e.currentTarget.parentElement.parentElement
    const id=element.dataset.id
    list.removeChild(element)
    control=control-1
    if (control==0) {
        clearBtn.classList.remove("clear-show")
    }
    displayAlert("öğe kaldırıldı", "danger")
   
}

function clearItems(e){
    const items= document.querySelectorAll(".grocery-item")
    if (items.length>0) {
        items.forEach((item)=>list.removeChild(item))
    }
    container.classList.remove("show-container")
    displayAlert("liste boş", "danger")
    grocery.value=""
}

function editItem(e){
   const element=e.currentTarget.parentElement.parentElement
    editElement=e.currentTarget.parentElement.previousElementSibling
   grocery.value= editElement.innerHTML

   editFlag=true
   editID=element.dataset.id
   submitBtn.textContent="edit"
  
}

function listeyiTemizle(e){
    list.innerHTML="";
    control=0;
    clearBtn.classList.remove("clear-show");
    displayAlert("Öğeler Kaldırıldı", "danger");
  console.log(listeyiTemizle)
  }