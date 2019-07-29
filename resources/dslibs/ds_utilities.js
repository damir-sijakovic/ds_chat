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
    * Neither the name of "ds_utilities" nor the names of its contributors 
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

ds_utilities - various JS functions
 
*/


// HTMLNODES
//////////////////////////////////////////////////////////////////////////////

function ds_nod_new(arg_type, arg_objGrp, arg_inner){                         
    var r = null;
    if (arg_type){
        r = document.createElement(arg_type);
    }
    if (arg_objGrp){
        for (var key in arg_objGrp) {
            r.setAttribute(key, arg_objGrp[key]);
        }
    }        
    if (arg_inner){
        r.innerHTML = arg_inner;
    }    
    
    return r;
}
   
function ds_nod_delete(arg_node){    
    if (arg_node.parentNode){
        arg_node.parentNode.removeChild(arg_node);
        delete arg_node;
    }
    else {
        delete arg_node;
    }
}  
        
function ds_nod_add(arg_obj, arg_child){
    arg_obj.appendChild(arg_child);
    return arg_child;
}
        
function ds_nod_addClone(arg_to, arg_from, arg_id){
    var tmp = arg_from.cloneNode(true);            
    if ( arg_id === undefined){ if (tmp.id) tmp.id="" }
    else{ tmp.id = arg_id };
    arg_to.appendChild(tmp);
    return tmp;
}
        
function ds_nod_isChildOfBody(arg){
    var return_bool = false;       
    function _loopthrough(a){ 
        if (a.nodeName === "BODY"){
            return_bool = true;
            return;
        }
        if (a.parentNode) _loopthrough(a.parentNode);
    }
    _loopthrough(arg);
    
    return return_bool;
}             
        
function ds_nod_haveParent(arg_obj){
    if (arg_obj.parentNode){
        return true;
    }
    return false;
}
        
function ds_nod_getParentChildIndex(arg_objNode){
    if (!arg_objNode.parentNode) return -1;
    
    for (var i=0; arg_objNode.parentNode.length; i++){
        if (childNodes[i] === arg_objNode){
            return i;
        }
    }
    return -1;
}
        
function ds_nod_toggleClass(arg_elem, arg_class){
    
    var class_string = " "+arg_class;
    (arg_elem.className.indexOf(arg_class) == -1) ? 
        arg_elem.className += class_string : 
        arg_elem.className = arg_elem.className.replace(arg_class, "");
        arg_elem.className = arg_elem.className.replace(/\s+/g,' ').trim();
}


  
function ds_nod_addClass(arg_elem, arg_class){  
    var class_string = " "+arg_class;
    if (arg_elem.className.indexOf(arg_class) == -1) {
        arg_elem.className += class_string;  
        arg_elem.className = arg_elem.className.replace(/\s+/g,' ').trim();
    }
    else {
        return null;
    }
}      
     
function ds_nod_hasClass(arg_elem, arg_class){
    if (arg_elem.className.indexOf(arg_class) == -1) 
        return false;
    else
        return true;
}
   
function ds_nod_removeClass(arg_elem, arg_class){    
    if (arg_elem.className.indexOf(arg_class) == -1) {
        return null;        
    }
    else {                
        arg_elem.classList.remove(arg_class);
    }
}  
        
function ds_nod_replace(arg_old, arg_new){
    var parent = arg_old.parentNode;
    return parent.replaceChild(arg_new, arg_old);
}    
  
function ds_nod_insertInto(arg_obj, arg_new){
    return arg_obj.appendChild(arg_new);
}
  
function ds_nod_insertAfter(arg_obj, arg_new){
    arg_obj.parentNode.insertBefore(arg_new, arg_obj.nextSibling);
}

function ds_nod_insertBefore(arg_obj, arg_new){
    //return arg_obj.parentNode.insertBefore(arg_new, arg_obj);
    return arg_obj.insertBefore(arg_new, arg_obj.childNodes[0]);
}
  
function ds_nod_clearInsertInto(arg_target, arg_node){
    arg_target.innerHTML = "";
    arg_target.appendChild(arg_node);
}
    
/* test more
function ds_nod_insertIntoInner(arg_target, arg_obj){
    return arg_target.insertAdjacentHTML('beforeend', arg_obj);            
}

function ds_nod_appendIntoInner(arg_target, arg_obj){
    return arg_target.insertAdjacentHTML('afterbegin', arg_obj);            
} 
*/
     
function ds_nod_duplicate(arg_nodeObj, arg_id){ 
    var tmp = arg_nodeObj.cloneNode(true);            
    if (arg_id === undefined){if (tmp.id) tmp.id=""} else {tmp.id = arg_id};
    
    arg_nodeObj.parentNode.insertBefore(tmp, arg_nodeObj.nextSibling);    
    return tmp;
}

function ds_nod_copy(arg_obj){  
    var arg_snapshot = arg_obj.cloneNode(true);
    return arg_snapshot;
}
                        
function ds_nod_findExact(arg_obj, arg_pattern){  
    var node = arg_obj.firstElementChild;    
    var return_node = null;
    function _loopthrough(a){ 
        if (arg_pattern === a.innerHTML){
            return_node = a;
        }
        
        if (a.firstElementChild) _loopthrough(a.firstElementChild);
        if (a.nextSibling) _loopthrough(a.nextSibling);
    }
    _loopthrough(node);
    
    return return_node;
} 

function ds_nod_findString(arg_obj, arg_pattern){
    var pattern = new RegExp(arg_pattern);
    
    var node = arg_obj.firstElementChild;    
    var return_node = null;
    function _loopthrough(a){ 
        if (pattern.test(a.outerHTML)){
            return_node = a;
        }
        
        if (a.firstElementChild) _loopthrough(a.firstElementChild);
        if (a.nextSibling) _loopthrough(a.nextSibling);
    }
    _loopthrough(node);
    
    return return_node;
} 
         
function ds_nod_findId(arg_obj, arg_id){ 
    var node = arg_obj.firstElementChild;    
    var return_node = null;
    function _loopthrough(a){        
        if (a.id){ if (a.id === arg_id) return_node = a };
        if (a.firstElementChild) _loopthrough(a.firstElementChild);
        if (a.nextSibling) _loopthrough(a.nextSibling);
    }
    _loopthrough(node);
    
    return return_node;
}
        
function ds_nod_stripIds(arg_root){
    var node = arg_root;    
    var return_node = null;
    function _loopthrough(a){ 
        a.removeAttribute("id");                
        if (a.firstElementChild) _loopthrough(a.firstElementChild);
        if (a.nextSibling) _loopthrough(a.nextSibling);
    }
    _loopthrough(node);
    
    return return_node;
}  

        
function ds_nod_classExist(arg_obj, arg_class){
    var node = arg_obj.firstElementChild;    
    var return_bool = false;
    function _loopthrough(a){        
        if (a.className){ 
            if (a.className === arg_class){
                return_bool = true;
            } 
        };                
        
        if (a.firstElementChild) _loopthrough(a.firstElementChild);
        if (a.nextSibling) _loopthrough(a.nextSibling);
    }
    _loopthrough(node);
    
    return return_bool;
}  
        
function ds_nod_removeClassString(arg_obj, arg_class){
    var node = arg_obj.firstElementChild;    
    var return_bool = false;
    function _loopthrough(a){        
        if (a.className){ 
            if (a.className === arg_class){               
                a.className = a.className.replace(arg_class, " ");
                a.className = a.className.replace(/\s+/g,' ').trim();
                
                return_bool = true;
            } 
        };                
        
        if (a.firstElementChild) _loopthrough(a.firstElementChild);
        if (a.nextSibling) _loopthrough(a.nextSibling);
    }
    _loopthrough(node);
    
    return return_bool;
}

// AJAX
//////////////////////////////////////////////////////////////////////////////

function ds_ajx_getXMLHttp(){
    var xmlHttp;
    try{xmlHttp = new XMLHttpRequest();}
    catch(e){
        try{
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e){
            try{
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e){
                alert("Old browser? Upgrade today so you can use AJAX!")
                return false;
            }
        }
    }  
    return xmlHttp;
}


function ds_ajx_sendPair(arg_request, arg_key, arg_value, arg_php, arg_func){      
    var xmlHttp = ds_ajx_getXMLHttp();
    xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState == 4){
            arg_func(xmlHttp.responseText);             
        }
    }
  
    value = encodeURIComponent(arg_value);
    xmlHttp.open(arg_request, arg_php+"?" + arg_key + "=" + value, true);  
    xmlHttp.send(null);
}

function ds_ajx_sendJSON(arg_request, arg_key, arg_obj_array, arg_php, arg_func){ 
    var xmlHttp = ds_ajx_getXMLHttp();
    xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState == 4){
            arg_func(xmlHttp.responseText); 
        }
    }
    
    value = encodeURIComponent(JSON.stringify(arg_obj_array));
    xmlHttp.open(arg_request, arg_php+"?" + arg_key + "=" + value, true);  
    xmlHttp.send(null);
}

// COOKIE
//////////////////////////////////////////////////////////////////////////////

function ds_cke_set(arg_key, arg_value, arg_expire){
    //if not passed in, expire in 7 day 
    if (typeof(arg_expire) === 'undefined'){
        arg_expire = new Date();
        arg_expire.setDate(arg_expire.getDate() + 7); // one week
    }
    
    var str = encodeURIComponent(arg_key) + '=' + encodeURIComponent(arg_value);
    str += ';expires=' + arg_expire.toGMTString();
    document.cookie = str;
}

function ds_cke_get(arg_key) {
    var key = encodeURIComponent(arg_key);
    var trimmed_str = document.cookie;
    trimmed_str = trimmed_str.split(' ').join('');
    var expl_array = trimmed_str.split(';');
    var assoc_array = new Array();
    for (var i=0; i<expl_array.length; i++){
        if (key === expl_array[i].split('=')[0]){
            return decodeURIComponent(expl_array[i].split('=')[1]);
        }
    }
     
    return null; 
}

function ds_cke_delete(arg_key) {   
    document.cookie = encodeURIComponent(arg_key) + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

// UTILS
//////////////////////////////////////////////////////////////////////////////

function ds_utl_include(arg_filename){
    var t = ds_nod_new("script", {src:arg_filename, type:"text/javascript"});
    return ds_nod_insertInto(document.body.parentNode, t);
}

function ds_utl_cleanString(arg_str){
    return arg_str.replace(/\s+/g,' ').trim();
}

function ds_utl_b64Encode(arg){
    return btoa(encodeURIComponent(arg));
}

function ds_utl_b64Decode(arg){
    return decodeURIComponent(atob(arg));
}

/* returns array of randomized numbers */
function ds_utl_randomNumbers(arg_length){
    var tmp = new Array(arg_length);    
    var random_integer;
    var counter = 0;
    var i;
    var bool_skipcycle = false;
    //
    while (counter < arg_length){
        random_integer = parseInt(Math.random() * arg_length);    
        if (counter === 0){
            tmp[0] = random_integer;
            counter++;
        }
        for (i=0; i < tmp.length; i++){
            if (tmp[i] === random_integer){               
                bool_skipcycle = true;
                break;
            }
        }
        if (bool_skipcycle){ 
            bool_skipcycle = false;
            continue;
        }
        tmp[counter] = random_integer;
        counter++;
    }
    return tmp;
}
 
 
// fix
///////// array with three additional methods 
// array.insert(index, value)
// array.delete(index) 
// array.swap(index, index)   

/*
function ds_utl_array() {   
    insert: function (arg_arr, arg_index, arg_value){
        arg_arr.splice(arg_index, 0, arg_value);                
    }, 
    remove: function (arg_arr, arg_index){
        arg_arr.splice(arg_index, 1) }; 
    },
    swap: function (arg_arr, arg_a, arg_b){                
        obj.swap = function(arg_a, arg_b){ 
            var tmp; 
            tmp = arg_arr[arg_a]; 
            arg_arr[arg_a] = arg_arr[arg_b]; 
            arg_arr[arg_b] = tmp; 
        }
    }            
}
*/

function ds_utl_isInRange(arg_number, arg_start, arg_end){   
    if ((arg_number >= arg_start) && (arg_number <= arg_end)) return true;
}

function ds_utl_toggle(arg){
    return (arg) ? false : true;
}

function ds_utl_cleanString(arg_str){
    var allowed = "_abcdefghijklmnoprstuvzxywABCDEFGHIJKLMNOPRSTUVZXYW0123456789";
    var allowed_char;
    
    for (var i=0; i<arg_str.length; i++){
        allowed_char = true;
        
        for (var j=0; j<allowed.length; j++){
            if (arg_str[i] === allowed[j]){
                allowed_char = true;
                break;
            }
            else {
                allowed_char = false;
            }
        }
        
        if (allowed_char === false){
            return false;
        }
    }
    
    return true;
}

function ds_utl_cleanHtml(arg_str){
    var ret = new Array(arg_str.length);
    var i = 0;
    for (; i<arg_str.length; i++){
        if (arg_str[i] === '<'){
            ret[i] = '＜';
            continue;
        } 
        else if (arg_str[i] === '>'){
            ret[i]= '＞';
            continue;
        }
        else if (arg_str[i] === '/'){
            ret[i] = '∕';
            continue;
        }
        else if (arg_str[i] === '&'){
            ret[i] = '＆';
            continue;
        }
        else if (arg_str[i] === '='){
            ret[i] = '＝';
            continue;
        }
        else if (arg_str[i] === '"'){
            ret[i] = '˝';
            continue;
        }
        else if (arg_str[i] === "'"){
            ret[i] = '´';
            continue;
        }
        
        ret[i] = arg_str[i];
    }
    
    return ret.join("");
} 

 

function ds_utl_isHexColor(arg_str){
    var allowed = "#1234567890abcdefABCDEF";
    var allowed_char;
    
    for (var i=0; i<arg_str.length; i++){
        allowed_char = true;
        
        for (var j=0; j<allowed.length; j++){
            if (arg_str[i] === allowed[j]){
                allowed_char = true;
                break;
            }
            else {
                allowed_char = false;
            }
        }
        
        if (allowed_char === false){
            return false;
        }
    }
    
    return true;
}

function ds_utl_hex2css(arg_number){
    return "#" + arg_number.toString(16);
}

function ds_utl_hexToString(arg_hex){
    var string = '';
    for (var i = 0; i < arg_hex.length; i += 2) {
      string += String.fromCharCode(parseInt(arg_hex.substr(i, 2), 16));
    }
    return string;
}

// EVENTS
//////////////////////////////////////////////////////////////////////////////

function ds_evn_throttle(method, context) {
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
    method.call(context);
    }, 200);
}

function ds_evn_transitionCallback(arg_elem, arg_fn){

    function whichTransitionEvent(){
        'use strict';
        var transitions = {
          'transition':'transitionend',
          'OTransition':'oTransitionEnd',
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
        }

        for (let t in transitions){   
            return (document.body.style[t] !== undefined) ? transitions[t] : null;
        }
    };
    var transitionEvent = whichTransitionEvent();
    transitionEvent && arg_elem.addEventListener(transitionEvent, function() {
        ds_evn_throttle(arg_fn);
    });    
}

