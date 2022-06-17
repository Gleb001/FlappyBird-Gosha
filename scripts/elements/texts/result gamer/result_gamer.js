
// import //
import { collector_animations } from '../../../abstractions/game animations/collector_animations.js';
import { collector_pattern_html_elements } from '../../../abstractions/game patterns/collector_pattern_html_elements.js';

// game name class //
class ResultGamer extends collector_pattern_html_elements.GameElement {

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
        
        this.INVOLVED_ELEMENT = '#game_over';
        this.HTML_LINK.style.opacity = 0;
        
        this.HTML_LINK.setAttribute('disabled', '');

    }

    // show
    show(number_passed_obstacles) {

        this.HTML_LINK.setAttribute('value', number_passed_obstacles);

        collector_animations.transparency.start({

            execution_command: collector_animations.transparency.COLLECTOR_COMMANDS.appear.name,
            involved_elements: [result_gamer.HTML_LINK],
            duration_animation: 1000,
            next_function: this.endExecutionCurrentFunction

        });

    }

    // hide
    hide() {

        collector_animations.transparency.start({

            execution_command: collector_animations.transparency.COLLECTOR_COMMANDS.disappear.name,
            involved_elements: [result_gamer.HTML_LINK],
            duration_animation: 1000,
            next_function: function () {
                result_gamer.delete();
                result_gamer.endExecutionCurrentFunction();
            },

        });

    }

}

// play field object //
const result_gamer = new ResultGamer({

    teg_value: 'input',
    id_name: 'result_gamer',
    class_name: 'main_text',
    html_value: null,

    presence_wrapper: false,
    involved_element: '#game_over',
    insert_command: 'append'

});

// export
export { result_gamer };



// Note //

// n.1
// // move up //
// moveUp() {
//     this._preparingToMoveUp();
//     this._moveUpInPlayField();
// },
// // internal mechanism of the move up game name //
// // prepare
// _preparingToMoveUp() {
//     this.HTML_LINK = document.getElementById('result_gamer');
// },
// // move up on the play field
// _moveUpInPlayField() {
//     collector_animations.movement.start({
//         execution_command: collector_animations.movement.execution_command.move_up,
//         duration_animation: result_gamer._duration_move_up,
//         involved_element: result_gamer.HTML_LINK,
//         distance_movement: 25,
//         next_function: null
//     });
// },F