ds_utl_include("resources/strings.js");
ds_utl_include("resources/prefs.js");
ds_utl_include("resources/resolve.js");
ds_utl_include("resources/ui.js");
ds_utl_include("resources/demo.js");


function demoInit() {
    setTimeout(function () {  
        ds_chat_hideLoader();
        ds_chat_showWelcome(); 
        ds_chat_showHelp(); 
    }, 3000);
}


function main(){     
    console.log( "main() loaded!");
    ds_chat_setTitlebarString("Loading...");   
    demoInit();   
    
    
    ds_chat_addChatWall(ds_chat_getDefaultChatWall());
    ds_chat_allowTextInput();
    

    
    ds_chat_sysMsgChatWall("Welcome to DSChat! For more info, type /help");




}


