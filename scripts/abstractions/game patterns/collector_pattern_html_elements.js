
// import //
import { GameEngine } from "../game mechanism/game_engine.js";

// class //
class GameElement {

    // public methods for the internal mechanism //

    // constructor //
    constructor({
        teg_value,
        id_name,
        class_name,
        attribute_value,
        html_value,

        presence_wrapper,
        involved_element,
        insert_command
    }) {

        this.TEG_VALUE = teg_value;
        this.ID_NAME = id_name;
        this.CLASS_NAME = class_name;
        this.ATTRIBUTE_VALUE = attribute_value;
        this.HTML_VALUE = html_value;

        this.PRESENCE_WRAPPER = presence_wrapper;
        this.INVOLVED_ELEMENT = involved_element;
        this.INSERT_COMMAND = insert_command;

    }

    // create
    create() {

        let html_element = document.createElement(this.TEG_VALUE);

        this._setIdName(html_element);
        this._setClassName(html_element);
        this._setAttributeValue(html_element);
        this._setHTML_VALUE(html_element);

        this._insertHTMLElement(html_element);
        this._setHTML_LINK();

    }

    // set
    setHTML_VALUE(html_value) {

        if (html_value !== null) {
            this.HTML_VALUE = html_value;
            this.HTML_LINK.innerHTML = this.HTML_VALUE;
        }

    }

    setCLASS_NAME(class_name) {

        if (class_name !== null) {
            this.CLASS_NAME = class_name;
            this.HTML_LINK.className = this.CLASS_NAME;
        }

    }


    // end
    endExecutionCurrentFunction() {
        GameEngine.endCurrentFunction();
    }

    // delete
    delete() {
        this.HTML_LINK.remove();
    }



    // private methods for the internal mechanism //

    // check
    _checkInvolvedElement() {

        if (this.INVOLVED_ELEMENT.nodeName) { return };

        if (document.querySelector(this.INVOLVED_ELEMENT)) {
            this.INVOLVED_ELEMENT = document.querySelector(this.INVOLVED_ELEMENT);
            return;
        }

        this.INVOLVED_ELEMENT =
            'Check your input of the involved element' +
            '\n' + 'Error!';

    }

    // set
    _setHTML_LINK() {

        if (this.ID_NAME) {
            this.HTML_LINK = document.querySelector(`#${this.ID_NAME}`);
        } else {
            this.HTML_LINK = document.querySelector(`.${this.CLASS_NAME}`);
        }

    }

    _setIdName(html_element) {

        if(this.ID_NAME) {
            html_element.id = this.ID_NAME;
        }

    }

    _setClassName(html_element) {

        if(this.CLASS_NAME) {
            html_element.className = this.CLASS_NAME;
        }

    }

    _setAttributeValue(html_element) {

        if(this.ATTRIBUTE_VALUE) {
            html_element.setAttribute(this.ATTRIBUTE_VALUE.name, this.ATTRIBUTE_VALUE.value);
        }

    }

    _setHTML_VALUE(html_element) {

        if(this.CLASS_NAME) {
            html_element.innerHTML = this.HTML_VALUE;
        }

    }

    // insert
    _insertHTMLElement(html_element) {

        this._checkInvolvedElement();

        if (this.PRESENCE_WRAPPER) {
            this._insertHTMLElementWithWrapper(html_element);
        } else {
            this._insertHTMLElementWithoutWrapper(html_element);
        }

    }

    _insertHTMLElementWithWrapper(html_element) {

        let wrapper_html = document.createElement('div');
        wrapper_html.classList.add(`${this.ID_NAME}__wrapper`);

        this.INVOLVED_ELEMENT[this.INSERT_COMMAND](wrapper_html);
        wrapper_html.prepend(html_element);

    }

    _insertHTMLElementWithoutWrapper(html_element) {
        this.INVOLVED_ELEMENT[this.INSERT_COMMAND](html_element);
    }

}

class GameComponent extends GameElement {

    // public methods for the internal mechanism //

    // constructor //
    constructor({
        teg_value,
        id_name,
        class_name,
        attribute_value,
        html_value,

        presence_wrapper,
        involved_element,
        insert_command
    }) {

        super({
            teg_value,
            id_name,
            class_name,
            attribute_value,
            html_value,

            presence_wrapper,
            involved_element,
            insert_command
        });

    }

    // set
    setSizesAndPositions() {

        this.setSizes();
        this.setPosition();

    }

    setSizes() {

        this.height = this.HTML_LINK.offsetHeight;
        this.width = this.HTML_LINK.offsetWidth;

    }

    setPosition() {

        this.position_top = this.HTML_LINK.offsetTop;
        // this.position_bottom = window.screen.availHeight - (this.position_top + this.height);

        this.position_left = this.HTML_LINK.offsetLeft;
        this.position_right = (this.position__offset_left + this.width);

    }

}

// collector pattern html elements //
const collector_pattern_html_elements = {
    GameElement,
    GameComponent
}

// export //
export { collector_pattern_html_elements };



// Note //

// n.1
//
// addingNewMethods(...array__methods) {
//     array__methods.forEach(object__method => {
//         for (let name__method in object__method) {
//             this[name__method] = object__method[name__method];
//         }
//     });
// }
//
// addingDefaultProperties(...array__properties) {
//     array__properties.forEach(object__property => {
//         for (let name__property in object__property) {
//             this[name__property] = object__property[name__property];
//         }
//     });
// }