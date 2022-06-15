
// import //
import { collector_animations } from '../../abstractions/game animations/collector_animations.js';
import { collector_pattern_html_elements } from "../../abstractions/game patterns/collector_pattern_html_elements.js";

// result window class //
class ResultWindow extends collector_pattern_html_elements.GameElement {

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
        this.HTML_LINK.style.opacity = 0;
        this.endExecutionCurrentFunction();

    }

    // show
    show() {

        collector_animations.transparency.start({

            execution_command: collector_animations.transparency.COLLECTOR_COMMANDS.appear.name,
            involved_elements: [result_window.HTML_LINK],
            duration_animation: 1000,
            next_function: result_window.endExecutionCurrentFunction

        });

    }




    // private properties for the internal mechanism (class) //
    // with default values //


    // private methods for the internal mechanism (class) //


}

// result window object //
const result_window = new ResultWindow({

    teg_value: 'div',
    id_name: 'result_window',
    class_name: null,
    html_value:
    `
    `,

    presence_wrapper: false,
    involved_element: '#play_field',
    insert_command: 'prepend'

});


// export //
export { result_window };