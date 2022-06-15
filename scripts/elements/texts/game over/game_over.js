
// import //
import { collector_animations } from '../../../abstractions/game animations/collector_animations.js';
import { collector_pattern_html_elements } from '../../../abstractions/game patterns/collector_pattern_html_elements.js';

// game name class //
class GameOver extends collector_pattern_html_elements.GameElement {

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

    }

    // show
    show() {

        collector_animations.transparency.start({

            execution_command: collector_animations.transparency.COLLECTOR_COMMANDS.appear.name,
            involved_elements: [game_over.HTML_LINK],
            duration_animation: 700,
            next_function: this.endExecutionCurrentFunction

        });

    }

    // hide
    hide() {

        let game_over__wrapper = document.querySelector('.game_over__wrapper');

        collector_animations.transparency.start({

            execution_command: collector_animations.transparency.COLLECTOR_COMMANDS.disappear.name,
            involved_elements: [this.HTML_LINK],
            duration_animation: 1000,
            next_function: function () {
                game_over__wrapper.remove();
                game_over.endExecutionCurrentFunction();
            },

        });

    }

}

// play field object //
const game_over = new GameOver({

    teg_value: 'div',
    id_name: 'game_over',
    class_name: 'main_title',
    html_value: 'Game over',

    presence_wrapper: true,
    involved_element: '#play_field',
    insert_command: 'prepend'

});

// export
export { game_over };



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
//     this.HTML_LINK = document.getElementById('game_over');
// },
// // move up on the play field
// _moveUpInPlayField() {
//     collector_animations.movement.start({
//         execution_command: collector_animations.movement.execution_command.move_up,
//         duration_animation: game_over._duration_move_up,
//         involved_element: game_over.HTML_LINK,
//         distance_movement: 25,
//         next_function: null
//     });
// },F