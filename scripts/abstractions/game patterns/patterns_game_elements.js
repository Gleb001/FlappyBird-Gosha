
// import //
import { syncGameEngine } from "../game mechanism/engines/sync_game_engine.js";
import { Animation } from "./pattern_animation.js";

// class game element //
class GameElement {

    // public object properies //
    // with default values //
    HTML_SETTINGS = {

        ID_NAME: null,

        tag_name: null,
        class_name: null,
        start_styles: null,
        html_value: null,

        // pattern attributes
        attributes: [

            {
                name: null,
                value: null
            }

        ],

    };

    DOM_TREE_SETTINGS = {

        presence_wrapper: false,
        involved_element: null,
        insert_command: null

    };

    ANIMATIONS_SETTINGS = {

        TIMING_FUNCTIONS: Animation.TIMING_FUNCTIONS,
        ANIMATIONS: null,

    };

    // public object methods //

    // constructor
    constructor(group_objects_with_settings) {

        // replacing default settings with the specified settings
        for (let object in group_objects_with_settings) {

            if (typeof group_objects_with_settings[object] != 'object') {

                this[object] = group_objects_with_settings[object];
                continue;

            }

            for (let setting in group_objects_with_settings[object]) {

                this[object][setting] = group_objects_with_settings[object][setting];

            }

        }

    }

    // create
    createHTML() {

        let html_element = document.createElement(
            this.HTML_SETTINGS.tag_name
        );

        GameElement.addContentInHTML(html_element, this);
        GameElement.insertInDomTree(html_element, this);

    }

    createAnimation({ ...animation_settings }) {
        return new Animation(animation_settings);
    }

    // delete
    deleteHTML() {

        if (this.HTML_LINK) {
            this.HTML_LINK.remove();
        }

    }

    // setter
    setHtmlValue(new_value) {

        this.HTML_SETTINGS.html_value = new_value;
        this.HTML_LINK.innerHTML = new_value;

    }

    setClassName(new_value) {

        this.HTML_LINK.className = new_value;
        this.HTML_SETTINGS.class_name = this.HTML_LINK.className;

    }

    // getter
    get HTML_LINK() {
        return document.getElementById(this.HTML_SETTINGS.ID_NAME);
    };

    // work sync game engine
    stopWorkSyncGameEngine() {
        syncGameEngine.stop(true);
    }

    continueWorkSyncGameEngine() {
        syncGameEngine.stop(false);
    }



    // public class methods //

    // add
    static addContentInHTML(html_element, js_element) {

        this._addID_NAME(html_element, js_element.HTML_SETTINGS.ID_NAME);
        this._addClassName(html_element, js_element.HTML_SETTINGS.class_name);
        this._addStartStyles(html_element, js_element.HTML_SETTINGS.start_styles);
        this._addHtmlValue(html_element, js_element.HTML_SETTINGS.html_value);
        this._addAttributes(html_element, js_element.HTML_SETTINGS.attributes);

    }

    // insert
    static insertInDomTree(html_element, js_element) {

        let presence_wrapper = js_element.DOM_TREE_SETTINGS.presence_wrapper;
        let involved_element = document.querySelector(js_element.DOM_TREE_SETTINGS.involved_element);
        let insert_command = js_element.DOM_TREE_SETTINGS.insert_command;

        if (presence_wrapper) {

            let wrapper_html = document.createElement('div');
            wrapper_html.classList.add(`${js_element.HTML_SETTINGS.ID_NAME}__wrapper`);

            involved_element[insert_command](wrapper_html);
            wrapper_html.prepend(html_element);

        } else {
            involved_element[insert_command](html_element);
        }

    }

    // private class methods //

    // add
    static _addID_NAME(html_element, ID_NAME) {

        if (ID_NAME) {
            html_element.id = ID_NAME;
        }

    }

    static _addClassName(html_element, class_name) {

        if (class_name) {
            html_element.className = class_name;
        }

    }

    static _addStartStyles(html_element, start_styles) {

        if (start_styles) {
            html_element.style.cssText = start_styles;
        }

    }

    static _addHtmlValue(html_element, html_value) {

        if (html_value) {
            html_element.innerHTML = html_value;
        }
    }

    static _addAttributes(html_element, attributes) {

        for (
            let index = 0;
            index < attributes.length;
            index++
        ) {

            let attribute = attributes[index];

            if (!attribute.name) return;

            html_element.setAttribute(
                attribute.name,
                attribute.value
            );

        }

    }

}

// class game component //
class GameComponent extends GameElement {

    // public object methods //

    // constructor
    constructor(group_objects_with_settings) {
        super(group_objects_with_settings);
    }

    // getter
    get height() {
        return this.HTML_LINK.offsetHeight;
    };

    get width() {
        return this.HTML_LINK.offsetWidth;
    };

    get top() {
        return this.HTML_LINK.offsetTop;
    };

    get bottom() {
        return window.screen.availHeight - (this.top + this.height);
    };

    get left() {
        return this.HTML_LINK.offsetLeft;
    };

    get right() {
        return window.screen.availWidth - (this.left + this.width);
    };

}

// collector pattern html elements //
const patterns_game_elements = {
    GameElement,
    GameComponent
}

// export //
export { patterns_game_elements };