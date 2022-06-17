
// import //
import { collector_animations } from '../../scripts/abstractions/game animations/collector_animations.js';
import { collector_pattern_html_elements } from '../../scripts/abstractions/game patterns/collector_pattern_html_elements.js';

// countdown class //
class Countdown extends collector_pattern_html_elements.GameElement {

    // public methods for external interaction (object) //

    // constructor
    constructor({
        teg_value,
        id_name,
        class_name,
        html_value,

        presence_wrapper,
        involved_element,
        insert_command
    }) {

        super({
            teg_value,
            id_name,
            class_name,
            html_value,

            presence_wrapper,
            involved_element,
            insert_command
        });

    }

    // initialisation 
    initialisation() {

        this.create();
        this.HTML_LINK.setAttribute('disabled', '');
        this.HTML_LINK.style.opacity = 0;

        this.endExecutionCurrentFunction();

    }

    // prepare
    prepare({
        number_of_countdown,
        value_final_phrase
    }) {

        this._countdown_values = [];
        this._number_current_coundown = 0;

        while(number_of_countdown > 0) {
            this._countdown_values.push(number_of_countdown--);
        }

        if(value_final_phrase) {
            this._countdown_values.push(value_final_phrase);
        }

    }

    // show
    show() {

        countdown.HTML_LINK.setAttribute('value', `${
            this._countdown_values[this._number_current_coundown++]
        }`);

        collector_animations.transparency.start({

            execution_command: collector_animations.transparency.COLLECTOR_COMMANDS.appear.name,
            involved_elements: [countdown.HTML_LINK],
            duration_animation: 500,
            next_function: countdown.hide

        });

    }

    // hide
    hide() {

        collector_animations.transparency.start({

            execution_command: collector_animations.transparency.COLLECTOR_COMMANDS.disappear.name,
            involved_elements: [countdown.HTML_LINK],
            duration_animation: 500,
            next_function: function () {

                if(countdown._countdown_values.length - 1 < countdown._number_current_coundown) {
                    countdown.delete();
                    countdown.endExecutionCurrentFunction();
                    return;
                }

                countdown.show();

            }

        });

    }




    // private properties for the internal mechanism (class) //
    // with default values //

}

// countdown object //
const countdown = new Countdown({

    teg_value: 'input',
    id_name: 'countdown',
    class_name: 'countdown_text',
    html_value: null,

    presence_wrapper: false,
    involved_element: '#play_field',
    insert_command: 'prepend'

});

// export //
export { countdown };