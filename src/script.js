"use-strict"

//storage
localStorage.setItem("path","/")
localStorage.setItem("user","guest")

//Elements selections
const timeh3 = document.getElementById("time")
const directory = document.getElementById("prompt")
const cmdline = document.getElementById("cmdline")
const output = document.querySelector(".output")
const sameline = document.querySelector(".sameline")
const newline = document.querySelector(".new-line")
const content = document.getElementById("content")
  
//fetch data
async function run(name){
const data = await fetch(`data/${name}.json`)
const realdata = await data.json()
return realdata
}

//constants
var configdetails = {
user: "guest",
host: "sairambalu",
is_root: "true",
path: localStorage.getItem("path"),
platform:window.navigator.platform,
language:window.navigator.language,
general_help:"For documentation enter 'help' in the terminal",
dir_help:"find the directory",
ls_help: "List information about the files and folders (the current directory by default).",
cat_help: "Read FILE(s) content and print it to the standard output (screen).<br>usage: cat file_name",
whoami_help: "Print the user name associated with the current effective user ID and more info.",
date_help: "Print the system date and time.",
help_help: "help command tells you all the commands executable in this terminal to know about a precise command use <br/>help --command",
clear_help: "Clear the terminal screen.",
cd_help: "Change the current working directory.",
sudo_help: "Execute a command as the superuser.",
usage: "Usage",
file: "file",
linkedin : "https://www.linkedin.com/in/sairam-balu/",
pnumber:"+916302119899",
github:"https://github.com/signatureratings",
email:"balusairam26@gmail.com"
}

var path = ["/","/projects"]
var projects = []
var files

run("files").then(x=>{
    files = x
})

run("files").then(x=>{
    for(temp in x){
        if(x[temp].path === "/projects"){
        projects.push({
            name:`${x[temp].name}.txt`,
            description:x[temp].description,
            language:x[temp].language,
            createdat:x[temp].created_at,
            forkscount:x[temp].forks_count,
            stars:x[temp].stargazers_count,
            lastpush:x[temp].pushed_at,
            lastupdate:x[temp].updated_at,
            type:"file",
            path:"/projects",
            cloneurl:x[temp].clone_url,
            content:[
                " <div>",
               " <h2>`${x[temp].name}`</h2>",
                "<h4>`${x[temp].description}`</h4>",
                "<h4>Most popular language used: `${x[temp].language}`</h4>",
                "<h4>Check out the source code: <a href='`${x[temp].html_url}`'></a></h4>",
            "</div>"
            ]
        })
    }
    }
}) 

var direc = {
    "/":[{name:"about.txt",type:"file"},{name:"contact.txt",type:"file"},{name:"projects",type:"folder"}],
    "/projects":projects
}


const cmds = {
        LS: { value: "ls", help: configdetails.ls_help },
        CAT: { value: "cat", help: configdetails.cat_help },
        WHOAMI: { value: "whoami", help: configdetails.whoami_help },
        DATE: { value: "date", help: configdetails.date_help },
        HELP: { value: "help", help: configdetails.help_help },
        CLEAR: { value: "clear", help: configdetails.clear_help },
        CD: { value: "cd", help: configdetails.cd_help },
        SUDO: { value: "sudo", help: configdetails.sudo_help },
        DIR:{value:"dir",help:configdetails.dir_help}
}
const aboutdata = run("about")


function getTime(){
    var t = new Date();
    timeh3.innerHTML = `${t.getDate()}/${t.getMonth()+1}/${t.getFullYear()}, ${t.getHours()}:${t.getMinutes()}`
    setTimeout('getTime()', 10000)
}
getTime()

directory.innerHTML=`${localStorage.getItem("user")}@${configdetails.host}:~${localStorage.getItem("path")} $`


const isUsingIE = (function () {
    return function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        return (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./));
    }
})();

const ignoreEvent = (function () {
    return function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
})();

function scrollToBottom(){
     return window.scrollTo(0,document.body.scrollHeight)
}

const isPhone = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);


//TERMINAL commands

function cd(cmdvalues,path){
    if(cmdvalues[1] && cmdvalues[1] === ".."){
        let path = localStorage.getItem("path")
        if(path === "/"){
            return "cannot go back"
        }
        else{
            let position = path.lastIndexOf("/")
            let newpath = path.substr(0,position+1)
            localStorage.setItem("path",newpath)
            directory.innerHTML=`${localStorage.getItem("user")}@${configdetails.host}:~${localStorage.getItem("path")} $`
            return "path changed"
        }
    }
else if(cmdvalues[1]){
    let change = false
    direc[path].forEach((x)=>{
        if((x.name === cmdvalues[1]) && (x.type === "folder")){
        configdetails.path = `${path}${x.name}`
        localStorage.setItem("path",`${path}${x.name}`)
        change = true
        }
    })
    if(change){
        directory.innerHTML=`${localStorage.getItem("user")}@${configdetails.host}:~${localStorage.getItem("path")} $`
        return "path changed"
    }
    return "We cannot find the folder in this directory"
}
else{
    return "No file name is given"
}
}

function cat(cmdComponents) {
    var result;
    if (cmdComponents.length <= 1) {
        result = `${configdetails.usage}: ${cmds.CAT.value} file_name`;
    } else if (!cmdComponents[1] || (!cmdComponents[1] === configdetails.welcome_file_name && !files.hasOwnProperty(cmdComponents[1]))) {
        result = `File ${cmdComponents[1]} not found in this directory`;
    } else {
        if(localStorage.getItem("path") === files[cmdComponents[1]]?.path){
            let content =""
            files[cmdComponents[1]]?.content.forEach((x)=>{
                content += x
            })
            

        result = cmdComponents[1] === configdetails.welcome_file_name ? configdetails.welcome : content;
        }
        else{
            result = "There is no such file in this directory"
        }
    }
    return result
};

function ls() {
    let path = localStorage.getItem("path")
    var result = "The files or folders in this directory are:<br/>"
    direc[path].forEach((x)=>{
        result += x.name +`<img src='static/${x.type}.svg' class='icon' alt='icon'/>`+ "<br>";
    })
    return result
};

function dir(){
let path = localStorage.getItem("path")
var result = "The files or folders in this directory are:<br/>"
direc[path].forEach((x)=>{
    result += x.name +`<img src='static/${x.type}.svg' class='icon' alt='icon'/>`+ "<br>";
})
return result
}

function help(cmdvalues){
    var result=""
    if(!cmdvalues[1]){   
    for (var cmd in cmds) {
            result += cmds[cmd].value + " - " + cmds[cmd].help + "<br/>";
        }
        return result
}
else{
    var command = cmdvalues[1].trim().substr(2)
    console.log(command)
    for(var cmd in cmds){
        if(cmds[cmd].value === command){
            result = cmds[cmd].value + " - " + cmds[cmd].help + "<br/>";
            return result
        }
    }
    return "We could not find the command try 'help' to what commands are executable"
}
    
}

function whoami(){
    return `${configdetails.user}`
}

function clear(){
while(content.firstChild){
    content.removeChild(content.childNodes[0])
}
return "terminal is cleared"
}


function invalidCommand(cmdvalues){
if(!cmdvalues[0]){
    return "You have not entered a command"
}
else{
    for(var cmd in cmds){
        if(cmds[cmd].value === cmdvalues[0]){
            result = cmds[cmd].value + " - " + cmds[cmd].help + "<br/>";
            return result
        }
    }
    return "we could not find the command"
}
}
//handling all commands

function handlecommand(output,cmdline){
    var cmdvalues = cmdline.value.trim().split(" ");
    var result 
    switch(cmdvalues[0]){
        case cmds.CAT.value:
            result = cat(cmdvalues);
            break;
        case cmds.LS.value:
            result = ls(configdetails.path);
            break;
        case cmds.WHOAMI.value:
            result = whoami();
            break;
        case cmds.DATE.value:
            result = date();
            break;
        case cmds.HELP.value:
            result = help(cmdvalues);
            break;
        case cmds.CLEAR.value:
            result = clear();
            break;
        case cmds.CD.value:
            result = cd(cmdvalues,configdetails.path);
            break;
        case cmds.SUDO.value:
            result = sudo();
            break;
        case cmds.DIR.value:
            result = dir();
            scrollToBottom()
            break;
        default:
            result = invalidCommand(cmdvalues);
            break;
    };
    executecommand(output,cmdline,result)
    }

function executecommand(output,cmdline,result){
output.innerHTML+= `<span class="sameline"><span class="prompt-color" id="prompt">${localStorage.getItem("user")}@${configdetails.host}:~${localStorage.getItem("path")}$  </span><span>${cmdline.value}</span></sapn>`
output.innerHTML+=`<span class="new-line">${result}</span>`
cmdline.value=""
}


cmdline.addEventListener("keydown",(e)=>{
if(e.key === "Enter"){
console.log("command executed",e,cmdline.value)
handlecommand(output,cmdline)
}
})