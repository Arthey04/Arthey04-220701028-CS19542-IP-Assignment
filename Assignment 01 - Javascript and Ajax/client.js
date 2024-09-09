
var allTasks
const baseUrl = 'http://localhost:3500'
var tasks=[]
function makeRequest(method,url,data=null)
{
    var xhr=new XMLHttpRequest();
    xhr.open(method,baseUrl+url,true);
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    xhr.onreadystatechange=function(){
        if (xhr.readyState === 4) {  
            if (xhr.status >= 200 && xhr.status < 300) { 
                tasks=JSON.parse(xhr.responseText);
                setItems(tasks)
            } else {
                console.error("Error:", xhr.status, xhr.statusText);
            }
        }
    }
    xhr.send(data?JSON.stringify(data) : null)
}
makeRequest("GET", "/allDocuments");

function setItems(items) {
   console.log(tasks)
   const container=document.getElementById('container');
   container.innerHTML = '';

   let itemDiv,checkbox,title,deleteButton,editButton;
    for (const key in items) {
        if (items.hasOwnProperty(key)) {
            // console.log(key); 
            // console.log(items[key]);
            itemDiv=document.createElement('div');
            itemDiv.className='item'

            checkbox=document.createElement('input');
            checkbox.type='checkbox';
            checkbox.id=key;
            console.log(key, items[key].completed);
            checkbox.checked= items[key].completed
            checkbox.addEventListener('change',(event)=>{
                var completed_val;
                console.log(event.target.checked)
                if(event.target.checked)
                    completed_val= true
                else
                     completed_val= false
                const patchData={
                    completed:completed_val,
                }
                makeRequest("PATCH", `/task/${key}`, patchData);
            })
            

            title=document.createElement('h2');
            title.value=items[key].title;
            title.innerHTML=items[key].title;
            title.className='title'
            // title.disabled=true

            deleteButton=document.createElement('button');
            deleteButton.textContent='delete';
            deleteButton.className='delete'
            deleteButton.addEventListener('click', () => {
                // container.removeChild(itemDiv);
                makeRequest("DELETE", `/task/${key}`);
            });
            editButton = document.createElement('button');
            editButton.textContent='edit';
            editButton.className='edit'
            editButton.addEventListener('click', (e) => {
            const title=document.getElementsByClassName('title');
            const input = document.createElement('input');
            input.className = 'title';
            input.value=title[key].value ?? title[key].innerHTML
            console.log(title[key], input);
            title[key].parentNode.replaceChild(input, title[key]);
            input.addEventListener("blur", ()=>{
                  edit_title=document.createElement('h2');
                  const title=document.getElementsByClassName('title');
                  edit_title.innerHTML=title[key].value;
                  title[key].parentNode.replaceChild(edit_title, title[key]);

                  const patchData = {
                    title:edit_title.innerHTML 
                };
                makeRequest("PATCH", `/task/${key}`, patchData);
            });
           
            
            });
        }
        itemDiv.appendChild(checkbox);
        itemDiv.appendChild(title);
        itemDiv.appendChild(deleteButton);
        itemDiv.appendChild(editButton);
        container.appendChild(itemDiv);
    }
}

function addTasks(e){
        // e.preventDefault()
        console.log("hii")
        const form=document.getElementById('form');
        const formData=new FormData(form);
        const newTask={};
        formData.forEach((value,key)=>{
            newTask[key]=value;
        })
    makeRequest("POST",`/task`, newTask);
    // alert('haii')
}
console.log(document.getElementById('pending'))
function getPendingTasks() {
    var pendingTasks=tasks.filter((task)=>task.completed===false)
    setItems(pendingTasks)
}


function getCompletedTasks() {
    var completedTasks=tasks.filter((task)=>task.completed===true)
    setItems(completedTasks)
}


function getAllTasks(){
    setItems(tasks)
}
