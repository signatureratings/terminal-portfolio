"use-strict"

//Elements selections
const timeh3 = document.getElementById("time")
const directory = document.getElementById("prompt")
const cmdline = document.getElementById("cmdline")
const output = document.querySelector(".output")
const sameline = document.querySelector(".sameline")
const newline = document.querySelector(".new-line")
const content = document.getElementById("content")

//constants
var configdetails = {
user: "guest",
host: "sairambalu",
is_root: "true",
path: "/",
platform:window.navigator.platform,
language:window.navigator.language,
general_help:"For documentation enter 'help' in the terminal",
ls_help: "List information about the files and folders (the current directory by default).",
cat_help: "Read FILE(s) content and print it to the standard output (screen).",
whoami_help: "Print the user name associated with the current effective user ID and more info.",
date_help: "Print the system date and time.",
help_help: "help command tells you allthe commands executable in this terminal to know about a precise command use <br/>help --command",
clear_help: "Clear the terminal screen.",
reboot_help: "Reboot the system.",
cd_help: "Change the current working directory.",
mv_help: "Move (rename) files.",
rm_help: "Remove files or directories.",
rmdir_help: "Remove directory, this command will only work if the folders are empty.",
touch_help: "Change file timestamps. If the file doesn't exist, it's created an empty one.",
sudo_help: "Execute a command as the superuser.",
usage: "Usage",
file: "file",
linkedin : "https://www.linkedin.com/in/sairam-balu/",
pnumber:"+916302119899",
github:"https://github.com/signatureratings",
email:"balusairam26@gmail.com"
}

const cmds = {
        LS: { value: "ls", help: configdetails.ls_help },
        CAT: { value: "cat", help: configdetails.cat_help },
        WHOAMI: { value: "whoami", help: configdetails.whoami_help },
        DATE: { value: "date", help: configdetails.date_help },
        HELP: { value: "help", help: configdetails.help_help },
        CLEAR: { value: "clear", help: configdetails.clear_help },
        REBOOT: { value: "reboot", help: configdetails.reboot_help },
        CD: { value: "cd", help: configdetails.cd_help },
        MV: { value: "mv", help: configdetails.mv_help },
        RM: { value: "rm", help: configdetails.rm_help },
        RMDIR: { value: "rmdir", help: configdetails.rmdir_help },
        TOUCH: { value: "touch", help: configdetails.touch_help },
        SUDO: { value: "sudo", help: configdetails.sudo_help }
}

var files = {
    "about.txt":{
    type:"text_file",
    content:"my name is sairam",
    path:"/",
},
    "contact.txt":{
    type:"text_file",
    content:`Contact me using below details... <br/> Phone Number: <a href='tel:${configdetails.pnumber}' target="_blank">${configdetails.pnumber}</a><br/>Linkedin : <a href='${configdetails.linkedin}' target="_blank">${configdetails.linkedin}</a><br/>GITHUB:<a href='${configdetails.github} target="_blank">${configdetails.github}</a><br/>Email:<a href="mailto:${configdetails.email}" target="_blank">${configdetails.email}</a>`,
    path:"/",
},
}

function getTime(){
    var t = new Date();
    timeh3.innerHTML = `${t.getDate()}/${t.getMonth()+1}/${t.getFullYear()}, ${t.getHours()}:${t.getMinutes()}`
    setTimeout('getTime()', 10000)
}
getTime()

directory.innerHTML=`${configdetails.user}@${configdetails.host}:~${configdetails.path}$`


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

const scrollToBottom = (function () {
    return function () {
        window.scrollTo(0, document.body.scrollHeight);
    }
})();

const isPhone = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);


//TERMINAL commands

function cat(cmdComponents) {
    var result;
    if (cmdComponents.length <= 1) {
        result = `${configdetails.usage}: ${cmds.CAT.value} <file_name>`;
    } else if (!cmdComponents[1] || (!cmdComponents[1] === configdetails.welcome_file_name && !files.hasOwnProperty(cmdComponents[1]))) {
        result = `File ${cmdComponents[1]} not found in this directory`;
        
    } else {
        if(configdetails.path === files[cmdComponents[1]].path){
        result = cmdComponents[1] === configdetails.welcome_file_name ? configdetails.welcome : files[cmdComponents[1]].content;
        }
        else{
            result = "There is no such file in this directory"
        }
    }
    return result
};

function ls() {
    var result = "The files or folders in this directory are" + "<br/>";
    for (var file in files) {
        result += file + "<br>";
    }
    return result
};

function help(cmdvalues){
    var result
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

//handling all commands

function handlecommand(output,cmdline){
    var cmdvalues = cmdline.value.trim().split(" ");
    var result 
    switch(cmdvalues[0]){
        case cmds.CAT.value:
            result = cat(cmdvalues);
            break;
        case cmds.LS.value:
            result = ls();
            break;
        case cmds.WHOAMI.value:
            result = whoami(output);
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
        case cmds.REBOOT.value:
            result = reboot();
            break;
        case cmds.CD.value:
        case cmds.MV.value:
        case cmds.RMDIR.value:
        case cmds.RM.value:
        case cmds.TOUCH.value:
            result = permissionDenied(cmdComponents);
            break;
        case cmds.SUDO.value:
            result = sudo();
            break;
        default:
            result = invalidCommand(cmdComponents);
            break;
    };
    executecommand(output,cmdline,result)
    }

function executecommand(output,cmdline,result){
output.innerHTML+= `<span class="sameline"><span class="prompt-color" id="prompt">${configdetails.user}@${configdetails.host}:~${configdetails.path}$  </span><span>${cmdline.value}</span></sapn>`
output.innerHTML+=`<span class="new-line">${result}</span>`
cmdline.value=""
}


cmdline.addEventListener("keydown",(e)=>{
if(e.key === "Enter"){
console.log("command executed",e,cmdline.value)
handlecommand(output,cmdline)
}
})