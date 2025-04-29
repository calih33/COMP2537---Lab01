console.log("client.js loaded.");

// a function declaration inside of a callback ... which takes a callback function :O
function ajaxGET(url, callback) {

    const xhr = new XMLHttpRequest();

    //console.log("xhr", xhr);
    xhr.onload = function() {
        //value = this.responseText;
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            //console.log('responseText:' + xhr.responseText);

            // callback function
            //value = this.responseText;
            callback(this.responseText);

        } else {
            console.log(this.status);
        }
    }
    xhr.open("GET", url); // localhost:8000/weekdays?format=html
    xhr.send();

}

document.querySelectorAll(".clear").forEach(function (currentElement, currentIndex, listObj) {

    //console.log(currentElement, currentIndex, listObj);
    currentElement.addEventListener("click", function (e) {
        //console.log(e);
        for (let i = 0; i < this.parentNode.childNodes.length; i++) {
            if (this.parentNode.childNodes[i].nodeType == Node.ELEMENT_NODE) {
                if (this.parentNode.childNodes[i].getAttribute("class") == "coffee_stuff") {
                    this.parentNode.childNodes[i].innerHTML = "";
                    break;
                }
            }
        }
    });
});

document.querySelector("#coffeeJSON").addEventListener("click", function (e) {

    ajaxGET("/coffee?format=json", function (data) {
        console.log("Before parsing", data);
        
        let parsedData = JSON.parse(data);
        console.log("After parsing", parsedData);
        
        let str = '<ol class="coffee-list1">';
        
        for (let i = 0; i < parsedData.length; i++) {
            let coffee = parsedData[i];
    
            // Create an item with 5 attributes 
            str += `<li class="coffee-item">
                        <strong>${coffee.name}</strong>
                        <ul class="coffee-attributes">
                            <li>Rating: ${coffee.rating}</li>
                            <li>Location: ${coffee.location}</li>
                            <li>Specialty: ${coffee.specialty}</li>
                            <li>Study-Friendly: ${coffee.study_friendly}</li>
                            <li>Price: ${coffee.price}</li>
                        </ul>
                    </li>`;
        }
    
        str += "</ol>";
        
        document.getElementById("coffee-json").innerHTML = str;
    });
    

});

document.querySelector("#coffeeHTML").addEventListener("click", function() {
    const contentDiv = document.getElementById("coffee-html");
    const isVisible = contentDiv.style.display !== "none";
    
    contentDiv.style.display = isVisible ? "none" : "block";
    
    if (!isVisible) {
        ajaxGET("/coffee?format=html", function(data) {
            contentDiv.innerHTML = data;
        });
    }
});

document.querySelector("#coffeeJSON").addEventListener("click", function() {
    const contentDiv = document.getElementById("coffee-json"); 
    const isVisible = contentDiv.style.display !== "none";
    contentDiv.style.display = isVisible ? "none" : "block";
});