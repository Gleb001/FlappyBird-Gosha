
// main =============================================== //

// create html element --------------------------------- //
function createElementHTML({
    tag_name, attributes, inner_value
}) {

    // 1. check the types of arguments
    if (typeof tag_name != "string") tag_name = "div";
    if (typeof inner_value != "string") inner_value = "";
    if (typeof attributes != "object" &&
        !Array.isArray(attributes)) attributes = {};

    // 2. create html element

    // PS: it is made so that the code editor (under VS code) 
    // displays auxiliary hints when accessing the variable
    // (or object property) to which the created element
    // will be assigned
    let html_element = document.createElement("div");
    if (tag_name != "div") html_element = document.createElement(tag_name);

    html_element.innerHTML = inner_value;
    for (let name_attr in attributes) {
        html_element.setAttribute(name_attr, attributes[name_attr]);
    }

    // 3. return html element
    return html_element;

}


// export ============================================= //
export default createElementHTML;