
// import //
import { GameEngine } from "../../game mechanism/game_engine/game_engine.js";
import { GameComponent } from '../../game patterns/game_component.js';
import { animations_collector } from "../../abstractions/game animations/animations collector/animations_collector.js";
import { play_field } from "../../../scripts/components/play field/play_field.js";

// choose language class //
class ChooseLanguage extends GameComponent {

    // public properties for external interaction (object) //
    // with default values //
    HTML_LINK = null;

    // public methods for external interaction (object) //

    // constructor
    constructor({
        teg_value,
        id_name,
        class_name,
        presence_wrapper,
        involved_element,
        insert_command
    }) {

        super({
            teg_value,
            id_name,
            class_name,
            presence_wrapper,
            involved_element,
            insert_command
        });

    }

    // initialisation
    initialisation() {

        this.create();
        this.show();

    }

    // show
    show() {

        let duration_appear = 500;

        ChooseLanguage._preparingToAnimation(
            duration_appear
        );
        ChooseLanguage._appearMessage();

    }

    hide() {

        let duration_disappear = 500;

        ChooseLanguage._preparingToAnimation(
            duration_disappear
        );
        ChooseLanguage._disappearMessage()

    }




    // private properties for the internal mechanism (class) //
    // with default values //
    static _duration_appear = 1000;
    static _duration_disappear = 1000;
    static _waiting_language_select = 10;


    // private methods for the internal mechanism (class) //

    // prepare
    static _preparingToAnimation( parametr ) {
        this._[parametr] = parametr;
    }

    // appear and disappear
    static _appearMessage() {

        choose_language.HTML_LINK.innerText =
            `
         <span>Сhoose the language of the game</span>
         <button class="button_choose_language">I speak English</button>
         <button class="button_choose_language">Я русский</button>
        `

        animations_collector.transparency.start({

            execution_command: animations_collector.transparency.execution_command.appear,
            duration_animation: ChooseLanguage._duration_appear,
            array_involved_elements: [choose_language.HTML_LINK],
            next_function: null,

        });

    }

    static _disappearMessage() {

        animations_collector.transparency.start({

            execution_command: animations_collector.transparency.execution_command.disappear,
            duration_animation: ChooseLanguage._duration_disappear,
            array_involved_elements: [choose_language.HTML_LINK],
            next_function: function() {
                GameEngine.endCurrentFunction();
            }

        });

    }

};

// choose language object //
const player_settings = new ChooseLanguage({

    teg_value: 'div',
    id_name: 'player_settings',
    class_name: 'main_title',
    html_value: 
    `
    
    `,
    presence_wrapper: false,
    involved_element: play_field,
    insert_command: 'prepend'

});

// export
export { player_settings };