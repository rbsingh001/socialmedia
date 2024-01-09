function createPost(){

    console.log("create post function")
    let link = document.getElementById('post').value;
    let des = document.getElementById('des').value;

    const post = {
        link: link,
        des: des
    }


    axios.post("http://localhost:3000/post", 
        post
    )
    .then(res =>{
        const link = res.data.link;
        const des = res.data.des;
        console.log(link , des);
        console.log(res.data);
        displayPost(res.data);
    })
    .catch(err => console.log(err));



}

function displayPost(post){

    const link = post.link;
    const des = post.des;
    const id = post.id;
    const ul = document.getElementById("ul");

    const li = document.createElement("li");
    li.setAttribute('id', id);

    const div = document.createElement("div");
    div.setAttribute('class', "post-container");
    const img = document.createElement("img");
    img.setAttribute("src", link);

    const p = document.createElement("p");
    p.textContent = "User - " + des;

    const btn = document.createElement("button");
    btn.textContent = "Comments";
    btn.setAttribute('id', id);
    btn.addEventListener("click", function(){
        addComment(id);
    });

    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(btn)
    li.appendChild(div);
    // li.appendChild(btn);

    ul.appendChild(li);



}
function addComment(id){
    const li = document.getElementById(id);
    const input = document.createElement("input");

    input.setAttribute("id", `id${id}`)

    const btn = document.createElement("button");
    btn.textContent = "Send";

    btn.addEventListener("click", function(){
        saveComment(id);
    })

    li.appendChild(input);
    li.appendChild(btn);

    axios.get(`http://localhost:3000/comments/${id}`)
    .then((res)=>{
        // console.log(res.data);

        for(let i=0; i< res.data.length; i++){
            displayComment( id ,res.data[i]);
        }
    })
    .catch((err) =>{
        console.log(err);
    })


}

function saveComment(id){
    let des = document.getElementById(`id${id}`).value;
    
    const comment = {
        des: des
    }
    console.log(comment);
    axios.post(`http://localhost:3000/post/${id}`, 
        comment
    )
    .then(res =>{
        const c = res.data.des;
        console.log(res.data);
        displayComment(id, res.data);
    })
    .catch(err => console.log(err));

}

function displayComment(id, comment){
    let li = document.getElementById(`${id}`);
    console.log(li);
    
        let p = document.createElement('p');
        p.textContent = 'anonymous ' + comment.des;
        li.appendChild(p);
    

}

window.addEventListener("DOMContentLoaded", ()=>{
    axios.get("http://localhost:3000")
        .then((res)=>{
            console.log(res.data);

            for(let i=0; i< res.data.length; i++){
                displayPost(res.data[i]);
            }
        })
        .catch((err) =>{
            console.log(err);
        })
})