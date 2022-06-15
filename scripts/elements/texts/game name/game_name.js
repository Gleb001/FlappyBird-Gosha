
// import //
import { collector_animations } from '../../../abstractions/game animations/collector_animations.js';
import { collector_pattern_html_elements } from '../../../abstractions/game patterns/collector_pattern_html_elements.js';

// game name class //
class GameName extends collector_pattern_html_elements.GameElement {

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
            involved_elements: [game_name.HTML_LINK],
            duration_animation: 1000,
            next_function: this.endExecutionCurrentFunction

        });

    }

    // hide
    hide() {

        let game_name__wrapper = document.querySelector('.game_name__wrapper');

        collector_animations.transparency.start({

            execution_command: collector_animations.transparency.COLLECTOR_COMMANDS.disappear.name,
            involved_elements: [game_name__wrapper],
            duration_animation: 1000,
            next_function: function () {
                game_name__wrapper.remove();
                game_name.endExecutionCurrentFunction();
            },

        });

    }

}

// play field object //
const game_name = new GameName({

    teg_value: 'div',
    id_name: 'game_name',
    class_name: 'main_title',
    html_value: 'Flappy Gosha',

    presence_wrapper: true,
    involved_element: '#play_field',
    insert_command: 'prepend'

});

// export
export { game_name };



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
//     this.HTML_LINK = document.getElementById('game_name');
// },
// // move up on the play field
// _moveUpInPlayField() {
//     collector_animations.movement.start({
//         execution_command: collector_animations.movement.execution_command.move_up,
//         duration_animation: game_name._duration_move_up,
//         involved_element: game_name.HTML_LINK,
//         distance_movement: 25,
//         next_function: null
//     });
// },F