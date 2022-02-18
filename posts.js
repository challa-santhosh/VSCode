let posts = [];
var totalItems=false
const showData = () =>{
    console.log(posts)
}
//sessionStorage.setItem('currentUser',localStorage.getItem('currentUser'))
const currentUser=JSON.parse(sessionStorage.getItem('currentUser'));
const userName=currentUser.name.includes(' ')?currentUser.name.split(' ').join(','):currentUser.name;
document.getElementById('currentUser').innerHTML=`<h4 style="margin:0px">${userName}</h4>`
const buildPostsHtml = (bool) =>{
    let rendering_items;
    bool?totalItems=true:totalItems=false;
    bool?document.getElementById('less-cls').style.display='block':document.getElementById('less-cls').style.display='none'
    if(!totalItems)
        rendering_items=posts.slice(0,10)
    else
        rendering_items=posts;

    let html_data='<div id="posts">'+
                    '<ul class="ul-container">'
    const items_html=rendering_items.map(post=>{
        const {title,body}=post;
        return(
        '<li class="li-items">'+
            `<div class="post-title">${title}</div>`+
            `<div class="post-body">${body}</div>`+
        '</li>'
    )})
    html_data+=items_html;
    html_data+='</ul></div>';
    debugger;
    document.getElementById('postsId').innerHTML=html_data;
}
const getData = async (showData) =>{
    await fetch('https://jsonplaceholder.typicode.com/posts').
    then(res=> res.json()).
    then(data=>{posts=data})
    showData(false)
}
getData(buildPostsHtml)
