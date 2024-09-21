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
document.addEventListener("DOMContentLoaded", function() {
    // Get all the elements with the class "flip"
    var flips = document.querySelectorAll(".flip");
    // Loop through each element and add a click event listener
    flips.forEach(function(flip) {
        flip.addEventListener("click", function(e) {
	    // remove existing nojs-js
            var noJS =  document.getElementById('nojs_css');
	    if (typeof(noJS) != 'undefined' && noJS != null) {
		    noJS.remove();
	    	
	    }

            // Prevent the default action of the link
            e.preventDefault();
            // Check if the element has the class "selected"
            var s = flip.classList.contains("selected");
            // Remove the class "selected" from all the elements
            flips.forEach(function(f) {
                f.classList.remove("selected");
            });
            // If the element did not have the class "selected", add it
            if (!s) flip.classList.add("selected");
            // Get the target element from the href attribute
            var target = document.querySelector(flip.getAttribute("href"));
            // Toggle the visibility of the target element
            if(target.classList.contains("visible")) {
		target.classList.remove("visible");
	    } else {
	    	target.classList.add("visible");
	    }
            // Hide all the other elements with the class "panel"
            var panels = document.querySelectorAll(".panel");
            panels.forEach(function(panel) {
                if (panel !== target) panel.classList.remove("visible");
            });
        });
    });
    // Get all the links in the navigation element
    var navLinks = document.querySelectorAll("#navigation a");
    // Loop through each link and set its href attribute to "#panel" + (number + 1)
    navLinks.forEach(function(link, number) {
        link.setAttribute("href", "#panel" + (number + 1));
    });
    // Hide the theme button element
    document.querySelector("#themeButton").style.display = "none";
    // Define a variable to store the address status
    var addrOK = false;
    // Define a function to fix the address
    var fixAddr = function() {
        // If the address is OK, return
        if (addrOK) return;
        // Get all the elements with the class "rev"
        var revs = document.querySelectorAll(".rev");
        // Loop through each element and set its href attribute to its href + its data-user attribute
        revs.forEach(function(rev) {
            rev.setAttribute("href", rev.getAttribute("href") + rev.getAttribute("data-user"));
        });
        // Set the address status to true
        addrOK = true;
    };
    // Get the theme picker element
    var themePicker = document.querySelector("#themePicker");
    // Add a change event listener to the theme picker element
    themePicker.addEventListener("change", function() {
        // Set a cookie with the name "theme" and the value of the selected option
	setCookie("theme",themePicker.value);
        console.log(document.cookie);
        // Set the href attribute of the theme target element to "/css/themes/" + the selected option
        document.querySelector("#themeTarget").setAttribute("href", "css/" + themePicker.value);
    });
    // Loop through each element with the class "rev" and add a click and a contextmenu event listener that calls fixAddr
    document.querySelectorAll(".rev").forEach(function(rev) {
        rev.addEventListener("click", fixAddr);
        rev.addEventListener("contextmenu", fixAddr);
    });
});
