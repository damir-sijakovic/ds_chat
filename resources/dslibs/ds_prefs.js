/*
BSD LICENCE

Copyright (c) 2019, Damir Šijaković
All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of "ds_tag" nor the names of its contributors 
      may be used to endorse or promote products derived from this software 
      without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY
EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


/*
//DS_PREFS - set/get keys+values with option to load/save from localStorage  
function dspf_init(arg_project);
function dspf_setSaveMode(arg_handle, arg_mode);
function dspf_packData(arg_handle);
function dspf_unpackdata(arg_str);
function dspf_set(arg_handle, arg_key, arg_value);
function dspf_get(arg_handle, arg_key);
function dspf_savePrefs(arg_handle);
function dspf_loadPrefs(arg_handle);
function dspf_clearPrefsStorage(arg_handle);

//USAGE:

//init
var prf = dspf_init("websevice"); //make handle and set project id 

//add keys:
dspf_set(prf, "menu_visible", false);
dspf_set(prf, "current_page", "about");
dspf_set(prf, "menu_visible", true);
 
//get value
var menu_visible = dspf_get(prf, "menu_visible");

//save prefs
dspf_savePrefs(prf);

//load prefs
dspf_loadPrefs(prf);

*/
 
function dspf_init(arg_project){
    if (arg_project === undefined) console.log("dspf_init error: You must provide project name as argument!" );    
    var t = {};
    t.projectName= arg_project;
    t.data = [];
    t.saveMode = 'localStorage'; // 'localStorage', 'server', 'none'
    
    return t;
}

function dspf_setSaveMode(arg_handle, arg_mode){
    var arg_ok = false;
    if ( 'localStorage' ===  arg_mode || 'server' ===  arg_mode || 'none' === arg_mode){
        arg_ok = true;
    }
    if (!arg_ok){
        console.log("dspf_setSaveMode: Wrong arguments.");
        return false;
    }
    
    arg_handle.saveMode = arg_mode;
    return true;
}

function dspf_packData(arg_handle){ //send/recieve prefs data    
    if (arg_handle.data.length === 0) return null;

    var json_obj = JSON.stringify(arg_handle.data); 
    var encuri = encodeURIComponent(json_obj);
    return btoa(encuri);
    
}

function dspf_unpackdata(arg_str){ 
    var encuri = atob(arg_str);    
    var json_obj = decodeURIComponent(encuri);
    return JSON.parse(json_obj);
}


function dspf_set(arg_handle, arg_key, arg_value){

    if (arg_handle.data.length === 0){
        var obj = {};
        obj[arg_key] = arg_value;       
        arg_handle.data.push(obj);
        return false;
    }
    else {     
        var key_found= false; 
        var i = 0;
        for (; i<arg_handle.data.length; i++){
            if (Object.keys(arg_handle.data[i])[0] === arg_key){  
                 key_found = true;
                 arg_handle.data[i][arg_key] = arg_value;    
                 return true;            
            }
        }  
        
        if (!key_found){
            var obj = {};
            obj[arg_key] = arg_value;       
            arg_handle.data.push(obj);
            return false
        }      
    }        
}

function dspf_get(arg_handle, arg_key){
    if (arg_handle.data.length === 0){
        return null;
    }
    else{
        var i = 0;
        for (; i<arg_handle.data.length; i++){
            if (Object.keys(arg_handle.data[i])[0] === arg_key){  
                  return Object.values(arg_handle.data[i])[0]; 
            }
        }    
    }    
}

function dspf_savePrefs(arg_handle){
    if (arg_handle.saveMode === 'localStorage'){
        var json_obj = dspf_packData(arg_handle);
        localStorage.setItem(arg_handle.projectName, json_obj);
        
        var check = localStorage.getItem(arg_handle.projectName);
        if (check === undefined) {
            console.log("dspf_savePrefs error: Cannot save preferences to localStorage.");
        }   
        
        return true;     
    }    
}

function dspf_loadPrefs(arg_handle){    
    if (arg_handle.saveMode === 'localStorage'){
        var passback = localStorage.getItem(arg_handle.projectName);
        if (passback) arg_handle.data = dspf_unpackdata(passback);
    }
    
    return null;
}


function dspf_clearPrefsStorage(arg_handle){
    if (arg_handle.saveMode === 'localStorage'){
        return localStorage.removeItem(arg_handle.projectName);
    }
    return null;
}

