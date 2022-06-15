
// import //
import { collector_animations } from '../../abstractions/game animations/collector_animations.js';
import { collector_pattern_html_elements } from '../../abstractions/game patterns/collector_pattern_html_elements.js';

// circle class //
class Circle extends collector_pattern_html_elements.GameElement {

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

        this.show_command = {

            start_game: 'start_game',
            end_game: 'end_game',

        }

    }

    // initialisation
    initialisation() {
        this.create();
    }

    // show
    show(command) {

        let play_field = document.getElementById('play_field');
        let play_field__background_color;
        let timeout;

        switch (command) {

            case 'start_game':
                play_field__background_color = 'white';
                this.HTML_LINK.style.backgroundColor = 'white';
                timeout = 0;
                break;

            case 'end_game':
                this.HTML_LINK.style.bottom = -20 + 'px';
                this.HTML_LINK.style.backgroundColor = '#78C4D1';
                play_field__background_color = '#78C4D1';
                timeout = 50;
                break;

        }

        collector_animations.transform.start({

            execution_command: collector_animations.transform.COLLECTOR_COMMANDS.scale.name,
            involved_elements: [circle.HTML_LINK],
            start_position: 0,
            final_position: play_field.offsetWidth * 1.15,
            duration_animation: 1750,
            next_function: function () {

                play_field.style.backgroundColor = play_field__background_color;

                circle.endExecutionCurrentFunction();

                setTimeout(

                    function () {
                        circle.delete();
                    },
                    timeout

                );

            }

        });

    }

}

// circle object //
const circle = new Circle({

    teg_value: 'div',
    id_name: null,
    class_name: 'circle',
    html_value: null,

    presence_wrapper: false,
    involved_element: '#play_field',
    insert_command: 'prepend'

});

// export //
export { circle };