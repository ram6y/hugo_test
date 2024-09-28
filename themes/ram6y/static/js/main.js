var addrOK = false;
// functions to deal with cookies
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function setCookie(cname, cvalue, exdays=365) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/* $(document).ready(function(){
    $(".flip").on("click", function(e) {
	var s = $(this).hasClass("selected");
	$(".flip").removeClass("selected");
	if(!s) $(this).addClass("selected");
        var target = $(this).attr("href");
        $(target).slideToggle("fast");
        $(".panel").not(target).hide();
        e.preventDefault();
    });
    $("#navigation a").each(function(number){$(this).attr("href","#panel"+(number+1))})
    $("#themeButton").css("display","none");
    var fixAddr = function(){
	if(addrOK) return;
        $(".rev").each(function(i){$(this).attr("href",$(this).attr("href")+$(this).attr("data-user"))});
    	addrOK = true;
    }
    $("#themePicker").on("change", function(){
	console.log(document.cookie);
	$("#themeTarget").attr("href","/css/themes/"+$(this).val());
    });
    $(".rev").each(function(i){$(this).click(fixAddr)});
    $(".rev").each(function(i){$(this).contextmenu(fixAddr)});
});*/

// BING wrote this

function disable_all(){
    document.querySelectorAll(".theme").forEach( function(link){
        link.disabled=true;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Get the theme picker element
    var themePicker = document.querySelector("#themePicker");
    if (getCookie("theme")){
      disable_all();
      document.getElementById(getCookie("theme")).disabled = false;
    }
    // Add a change event listener to the theme picker element
    themePicker.addEventListener("change", function() {
        theme = themePicker.value;
        // Set a cookie with the name "theme" and the value of the selected option
	    setCookie("theme",theme);
        // Set the href attribute of the theme target element to "/css/themes/" + the selected option
        disable_all();
        document.getElementById(theme).disabled = false;
    });
});
