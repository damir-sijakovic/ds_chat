/*
ds_chat_showLoader() 
ds_chat_hideLoader() 
ds_chat_toggleLoader()    
ds_chat_showWelcome() 
ds_chat_hideWelcome() 
ds_chat_toggleWelcome()    
ds_chat_showHelp() 
ds_chat_hideHelp() 
ds_chat_toggleHelp()    
ds_chat_showGroups() 
ds_chat_hideGroups() 
ds_chat_toggleGroups() 
ds_chat_showUsers() 
ds_chat_hideUsers() 
ds_chat_toggleUsers() 
ds_chat_showTextInput() 
ds_chat_hideTextInput() 
ds_chat_clearTextInput() 
ds_chat_focusTextInput() 
ds_chat_getValueTextInput() 
ds_chat_toggleTextInput() 
ds_chat_useTextInput() 
ds_chat_allowTextInput() 
ds_chat_denyTextInput() 
ds_chat_setTitlebarString(arg_str) 
ds_chat_getTitlebarString() 
ds_chat_refreshTitlebar() 
ds_chat_showTitlebar() 
ds_chat_hideTitlebar() 
ds_chat_toggleTitlebar()   
ds_chat_refreshTitlebar() 
ds_chat_showScrollbar() 
ds_chat_hideScrollbar() 
ds_chat_toggleScrollbar() 
ds_chat_makeChatWallId(arg_str) 
ds_chat_ChatWallIdToString(arg_str) 
ds_chat_getChatWallById(arg_name) 
ds_chat_addChatWall(arg_str) 
ds_chat_setDefaultChatWall(arg_str) 
ds_chat_getDefaultChatWall() 
ds_chat_setCurrentChatWall(arg_str) 
ds_chat_getCurrentChatWall() 
ds_chat_getCurrentChatWallNode() 
ds_chat_addTextToChatWall(arg_str, arg_style, arg_size, arg_wall) 
ds_chat_addTextToChatWallRegular(arg_str) 
ds_chat_sysMsgChatWall(arg_str) 
ds_chat_specialMsgChatWall(arg_str) 
ds_chat_printHelpChatWall() 
ds_chat_setChatWallBg(arg_csshex) 
ds_chat_getChatWallBg() 
ds_chat_clsChatWall()  
*/

//loader
function ds_chat_showLoader(){
    var id = document.getElementById("loader_container");
    id.style.display = "block";
    dspf_set(DS_CHAT_PREFS, "loader_visible", true);
} 

function ds_chat_hideLoader(){
    var id = document.getElementById("loader_container");
    id.style.display = "none";
    dspf_set(DS_CHAT_PREFS, "loader_visible", false);
} 

function ds_chat_toggleLoader(){   
    if (dspf_get(DS_CHAT_PREFS, "loader_visible")){
       ds_chat_hideLoader();
    }
    else{
        ds_chat_showLoader();
    }
} 

//welcome
function ds_chat_showWelcome(){
    ds_chat_setTitlebarString("Welcome"); 
    var id = document.getElementById("welcome");
    id.style.display = "block";
    dspf_set(DS_CHAT_PREFS, "welcome_visible", true);
} 

function ds_chat_hideWelcome(){
    var id = document.getElementById("welcome");
    id.style.display = "none";
    dspf_set(DS_CHAT_PREFS, "welcome_visible", false);
} 

function ds_chat_toggleWelcome(){   
    if (dspf_get(DS_CHAT_PREFS, "welcome_visible")){
       ds_chat_hideWelcome();
    }
    else{
        ds_chat_showWelcome();
    }
} 

//help
function ds_chat_showHelp(){
    ds_chat_hideTitlebar();
    var id = document.getElementById("help");
    var inner = document.getElementById("help_inside");
    id.style.display = "block";
    
    inner.innerHTML = DS_CHAT_HELP_STRING;
    
    dspf_set(DS_CHAT_PREFS, "help_visible", true);
    ds_chat_refreshTitlebar();
} 

function ds_chat_hideHelp(){
    var id = document.getElementById("help");
    id.style.display = "none";    
    dspf_set(DS_CHAT_PREFS, "help_visible", false);
    ds_chat_showTitlebar();

} 

function ds_chat_toggleHelp(){   
    if (dspf_get(DS_CHAT_PREFS, "help_visible")){
       ds_chat_hideHelp();
    }
    else{
        ds_chat_showHelp();
    }
} 

//groups
function ds_chat_showGroups(){
    var id = document.getElementById("groups");
    id.style.display = "block";
    dspf_set(DS_CHAT_PREFS, "groups_visible", true);
} 

function ds_chat_hideGroups(){
    var id = document.getElementById("groups");
    id.style.display = "none";
    dspf_set(DS_CHAT_PREFS, "groups_visible", false);
} 

function ds_chat_toggleGroups(){
    if (dspf_get(DS_CHAT_PREFS, "groups_visible")){
       ds_chat_hideGroups();
    }
    else{
        ds_chat_showGroups();
    }
} 

//users
function ds_chat_showUsers(){
    var id = document.getElementById("users");
    id.style.display = "block";
    dspf_set(DS_CHAT_PREFS, "users_visible", true);
} 

function ds_chat_hideUsers(){
    var id = document.getElementById("users");
    id.style.display = "none";
    dspf_set(DS_CHAT_PREFS, "users_visible", false);
} 

function ds_chat_toggleUsers(){
    if (dspf_get(DS_CHAT_PREFS, "users_visible")){
       ds_chat_hideUsers();
    }
    else{
        ds_chat_showUsers();
    }
} 

// text input
function ds_chat_showTextInput(){
    var input_bar = document.getElementById("chat_input");
    
    if (ds_nod_hasClass(input_bar, "chat_input_hide")){
        ds_nod_removeClass(input_bar, "chat_input_hide"); 
        dspf_set(DS_CHAT_PREFS, "text_input_visible", true);
    }
}

function ds_chat_hideTextInput(){
    var input_bar = document.getElementById("chat_input");
    var input_box = document.getElementById("chat_input_input");  
    
    if (ds_nod_hasClass(input_bar, "chat_input_hide")){
        dspf_set(DS_CHAT_PREFS, "text_input_visible", false);
        return;
    }
    else {
        ds_nod_addClass(input_bar, "chat_input_hide");
        dspf_set(DS_CHAT_PREFS, "text_input_visible", false);
    }
    
}

function ds_chat_clearTextInput(){
    var input_box = document.getElementById("chat_input_input");   
    input_box.value = "";
}

function ds_chat_focusTextInput(){
   var input_box = document.getElementById("chat_input_input"); 
   if (dspf_get(DS_CHAT_PREFS, "text_input_visible")){ 
        input_box.focus();  
    }
}

function ds_chat_getValueTextInput(){
    var input_box = document.getElementById("chat_input_input"); 
    if (dspf_get(DS_CHAT_PREFS, "text_input_visible")){ 
        return input_box.value;  
    }
    else return null;
}

function ds_chat_toggleTextInput(){
    if (dspf_get(DS_CHAT_PREFS, "text_input_visible")){
        ds_chat_hideTextInput();
    }
    else {
        ds_chat_showTextInput();
    }
}

function ds_chat_useTextInput(){
    if (dspf_get(DS_CHAT_PREFS, "text_input_allowed")){   
        var input_box = document.getElementById("chat_input_input"); 
        var input_bar = document.getElementById("chat_input");
        
        
        if (dspf_get(DS_CHAT_PREFS, "text_input_visible")){
            ds_chat_resolveChatInput(ds_chat_getValueTextInput()); //resolve.js            
            ds_chat_hideTextInput();
            return false;
        }
        else {
            ds_chat_showTextInput();
            ds_evn_transitionCallback(input_bar, ds_chat_focusTextInput);  
            ds_chat_clearTextInput(); 
            return true;  
        }
    }
}

function ds_chat_allowTextInput(){
    dspf_set(DS_CHAT_PREFS, "text_input_allowed", true); 
}

function ds_chat_denyTextInput(){
    dspf_set(DS_CHAT_PREFS, "text_input_allowed", false); 
}

//titlebar

function ds_chat_setTitlebarString(arg_str){
    var tbar = document.getElementById("screenbar_title");
    tbar.innerHTML = arg_str;
}

function ds_chat_getTitlebarString(){
    var tbar = document.getElementById("screenbar_title");
    return tbar.innerHTML;
}

function ds_chat_refreshTitlebar(){
        var node = document.getElementById("screenbar_title");
        node.innerHTML = dspf_get(DS_CHAT_PREFS, "user_name") + "@" + dspf_get(DS_CHAT_PREFS, "main_group") + " [21 user in group]";
}

function ds_chat_showTitlebar(){
    var tbar = document.getElementById("screenbar");
    
    if (dspf_get(DS_CHAT_PREFS, "titlebar_visible")){
        return;
    }
    
    document.body.style["padding-top"] = "40px";  
    tbar.style.display = "block"; 
    dspf_set(DS_CHAT_PREFS, "titlebar_visible", true); 
}
    
function ds_chat_hideTitlebar(){
    var tbar = document.getElementById("screenbar");
    
    if (!dspf_get(DS_CHAT_PREFS, "titlebar_visible")){
        return;
    }
        
    document.body.style["padding-top"] = "0px";
    tbar.style.display = "none";
    dspf_set(DS_CHAT_PREFS, "titlebar_visible", false); 
}
    
function ds_chat_toggleTitlebar(){  
    if (dspf_get(DS_CHAT_PREFS, "titlebar_visible")){
         ds_chat_hideTitlebar();
    }
    else {
        ds_chat_showTitlebar();
    }    
}

function ds_chat_refreshTitlebar(){
    var send_string = dspf_get(DS_CHAT_PREFS, "user_name") +"@"+ dspf_get(DS_CHAT_PREFS, "current_wall");    
    ds_chat_setTitlebarString(send_string);
    
}

//scrollbars

function ds_chat_showScrollbar(){
    var group_box =  document.getElementById("groups");
    var users_box =  document.getElementById("users");
    var wall_box =   document.body;
    
    if (dspf_get(DS_CHAT_PREFS, "scrollbar_visible")){        
        return;
    }
    else {
        group_box.style.overflow = "visible";
        users_box.style.overflow = "visible";
        wall_box.style.overflow = "visible";
        dspf_set(DS_CHAT_PREFS, "scrollbar_visible", true);     
    }   
}

function ds_chat_hideScrollbar(){
    var group_box =  document.getElementById("groups");
    var users_box =  document.getElementById("users");
    var wall_box =   document.body;
    
    if (!dspf_get(DS_CHAT_PREFS, "scrollbar_visible")){        
        return;
    }
    else {
        group_box.style.overflow = "hidden";
        users_box.style.overflow = "hidden";
        wall_box.style.overflow = "hidden";
        dspf_set(DS_CHAT_PREFS, "scrollbar_visible", false);   
    }   
}

function ds_chat_toggleScrollbar(){
    if (dspf_get(DS_CHAT_PREFS, "scrollbar_visible")){        
        ds_chat_hideScrollbar();
    }
    else {
        ds_chat_showScrollbar();
    }
}


    
//wall 
//note: chat wall/group... fix terminology

// ChatWallId - starting that starts with $group_wall_
function ds_chat_makeChatWallId(arg_str){
    return "$group_wall_"+ arg_str;
}

function ds_chat_ChatWallIdToString(arg_str){
    var bool = str.startsWith("$group_wall_");
    if (!bool){ 
        console.log("ds_chat_ChatWallIdToString error: Not an 'ChatWallId' string.");
        return null;
    }
    
    return str.substring("$group_wall_".length);
}


function ds_chat_getChatWallById(arg_name){
            var t = document.getElementById(ds_chat_makeChatWallId(arg_name));
            return t; 
}

function ds_chat_addChatWall(arg_str){
    var group_wall = ds_nod_new("DIV", {"id": ds_chat_makeChatWallId(arg_str), "class":"groupwall"});
    ds_nod_insertInto(document.getElementById("wall"), group_wall);
}

function ds_chat_setDefaultChatWall(arg_str){
    dspf_set(DS_CHAT_PREFS, "default_wall", arg_str);
}

function ds_chat_getDefaultChatWall(){
    return dspf_get(DS_CHAT_PREFS, "default_wall");
}

function ds_chat_setCurrentChatWall(arg_str){
    dspf_set(DS_CHAT_PREFS, "current_wall", arg_str);
}

function ds_chat_getCurrentChatWall(){
    return dspf_get(DS_CHAT_PREFS, "current_wall");
}

function ds_chat_getCurrentChatWallNode(){
    return ds_chat_getChatWallById(dspf_get(DS_CHAT_PREFS, "current_wall"));
}
//style: 'shadowed', 'engraved', 'white',  'black',  'admin', 'yellow', 'gray', 'system', 'text3d'  
function ds_chat_addTextToChatWall(arg_str, arg_style, arg_size, arg_wall){
       
    if (arg_str.length === 0) return false;
    
    var text = arg_str; 
    var chat_wall = ds_chat_getChatWallById(arg_wall);
    if (!chat_wall) return false;
    
    if (arg_style === 'system'){
        var t = ds_nod_new("p", {"style": "font-size:"+arg_size+"px", "class": arg_style+" animate-drop"}, text);
        ds_nod_insertBefore(chat_wall, t);
        return true;
    }            
    
    var date = new Date;
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    
    var username = dspf_get(DS_CHAT_PREFS, "user_name");
    var curtime =  ("0" + hour).slice(-2) + ":" +  ("0" + min).slice(-2) + ":" +  ("0" + sec).slice(-2);
    var t = ds_nod_new("p", {"style": "font-size:"+arg_size+"px", "class": arg_style+" animate-drop"}, curtime + " [" + username + "] " + text);
    ds_nod_insertBefore(chat_wall, t);
    
    return true;
}

function ds_chat_addTextToChatWallRegular(arg_str){
    return ds_chat_addTextToChatWall(arg_str, 'shadowed', dspf_get(DS_CHAT_PREFS, "font_size"), ds_chat_getCurrentChatWall());
}

function ds_chat_sysMsgChatWall(arg_str){
    return ds_chat_addTextToChatWall("System: " + arg_str, 'system', dspf_get(DS_CHAT_PREFS, "font_size") , ds_chat_getCurrentChatWall());
}

function ds_chat_specialMsgChatWall(arg_str){
    return ds_chat_addTextToChatWall("System: " + arg_str, 'text3d', dspf_get(DS_CHAT_PREFS, "font_size") , ds_chat_getCurrentChatWall());
}

function ds_chat_printHelpChatWall(){
    return ds_chat_sysMsgChatWall(DS_CHAT_HELP_STRING);
}

function ds_chat_setChatWallBg(arg_csshex){
    dspf_set(DS_CHAT_PREFS, "bg", arg_csshex);
    document.body.style["background"] = arg_csshex;   
}

function ds_chat_getChatWallBg(){
    return dspf_get(DS_CHAT_PREFS, "bg");
}
function ds_chat_clsChatWall(){    
    var chat_wall = ds_chat_getChatWallById(ds_chat_getCurrentChatWall());
    chat_wall.innerHTML = "";
}

