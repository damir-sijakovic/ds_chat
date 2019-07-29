//KEYMAPS
function ds_chat_resolveKeymaps(e){
    if (e.keyCode === 13) { //ENTER
        ds_chat_useTextInput();
    }
    //if (e.altKey && e.ctrlKey && e.keyCode == 71) {  //ctrl+alt+g - groups
    //} 
    
    if (e.altKey && e.ctrlKey && e.keyCode == 85) {  //ctrl+alt+u
        ds_chat_toggleUsers();
    }
    
    if (e.altKey && e.ctrlKey && e.keyCode == 67) {  //ctrl+alt+c
        ds_chat_clsChatWall();
    }
    
    if (e.altKey && e.ctrlKey && e.keyCode == 72) {  //ctrl+alt+h
        ds_chat_printHelpChatWall();   
    }
    
    if (e.altKey && e.ctrlKey && e.keyCode == 83) {  //ctrl+alt+s 
        ds_chat_toggleScrollbar();
    }
    if (e.altKey && e.ctrlKey && e.keyCode == 74) {  //ctrl+alt+j
        ds_chat_toggleTitlebar();
    }    
}
document.onkeyup = ds_chat_resolveKeymaps;





//CHAT COMMANDS
function ds_chat_resolveChatInput(arg_str){
    if (arg_str[0] === '/'){
        console.log("command");   
        if (arg_str.startsWith("/help")){
            ds_chat_printHelpChatWall();
        } 
        
        else if (arg_str.startsWith("/prefs_save")){
            ds_chat_sysMsgChatWall("Prefs saved...");
        }
        
        else if (arg_str.startsWith("/prefs_erase")){
            ds_chat_sysMsgChatWall("Prefs erased...");
        }
                
        else if (arg_str.startsWith("/nick ")){  
            var arr = arg_str.split(' ');  
            if (arr.length !== 2){
                ds_chat_sysMsgChatWall("Error: Wrong command format.");
                return false; 
            }    
            
            var sant_string = ds_utl_cleanHtml(arr[1]);
            dspf_set(DS_CHAT_PREFS, "user_name", sant_string);
            ds_chat_refreshTitlebar();
            ds_chat_sysMsgChatWall("Hello " + sant_string + "!") ;
            return true; 
         }
         
         else if (arg_str[0] === '/' && arg_str[1] === 'b' && arg_str[2] === 'g' && arg_str[3] === ' '){   
            if (arg_str.length === 11){
                var arr = arg_str.split(' ');
                if (ds_utl_isHexColor(arr[1])){  
                    ds_chat_setChatWallBg(arr[1]);
                } 
                else {
                    ds_chat_sysMsgChatWall("Error: Command must be in this format: /bg #333333");
                    return false; 
                }      
            }
            else{
                ds_chat_sysMsgChatWall("Error: Command must be in this format: /bg #333333");
                return false; 
            }
            
            return true; 
        }
              
        else if (arg_str.startsWith("/fontdemo")){
            ds_chat_demo_showFontStyles();
        }  
                
        else if (arg_str === "/tu"){
            ds_chat_toggleUsers();
        }

        else if (arg_str === "/ts"){
            ds_chat_toggleTitlebar();
        }

        else if (arg_str === "/sl"){
            ds_chat_toggleScrollbar();
        }
        
        else if (arg_str === "/cls"){
            ds_chat_clsChatWall();
        }
        
        else {
            ds_chat_sysMsgChatWall("Error: Unknown command!")
        }        
    }    
    else {
        //this is the string that goes to the chat wall...
        //sanitize string, add to wall in demo, send 'arg_str' to php               
        var cleanstr = ds_utl_cleanHtml(arg_str);
        ds_chat_addTextToChatWallRegular(cleanstr);
    }
    
} 






//CLICKS
function ds_chat_resolveClicks(e){
  
    //help screen
    if (e.target.tagName == "UL" || e.target.tagName == "LI") {        
        if (e.type == "click") {
            if (e.target.id === "help_inside_ul" || e.target.id === "help_inside" ){
                ds_chat_hideHelp();
            }  
        } 
    } 
    
    //welcome screen
    if (e.target.tagName == "UL" || e.target.tagName == "LI" || e.target.tagName == "IMG") {        
        if (e.type == "click") {
            if (e.target.id === "welcome_inside_ul" || e.target.id === "welcome_inside_id" || e.target.id === "welcome_inside_icon" || e.target.id === "welcome_inside_click"){
                ds_chat_hideWelcome();
                ds_chat_allowTextInput();
            }  
        } 
    } 
    
    //titlebar   
    if (e.target.tagName == "IMG") {
        if (e.type == "click") {     
            if (e.target.id === "screenbar_icon_help"){
                ds_chat_toggleHelp();  
              
            }                   
            if (e.target.id === "screenbar_icon_scroll"){
                ds_chat_toggleScrollbar();
            }   
            if (e.target.id === "screenbar_icon_user"){
                ds_chat_toggleUsers();
            } 
            if (e.target.id === "screenbar_icon_cls"){
                ds_chat_clsChatWall();
            }   
            if (e.target.id === "screenbar_icon_write"){                
                ds_chat_useTextInput();
            }   
                                 
            if (e.target.id === "users_close"){
                ds_chat_toggleUsers();
            }                    
            if (e.target.id === "users_add"){
                ds_chat_sysMsgChatWall("Unknown command!")
            } 
                            
        }
    }
    
}
document.onclick = ds_chat_resolveClicks;
