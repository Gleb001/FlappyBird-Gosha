
// import //
import { collector_pattern_html_elements } from '../../abstractions/game patterns/collector_pattern_html_elements.js';
import { collector_animations } from '../../abstractions/game animations/collector_animations.js';

// play field class //
class PlayField extends collector_pattern_html_elements.GameComponent {

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

        this.status = {

            introduction: {

                class: 'js-play_field__introduction',
                html:
                `
                    <span id="game_author" class="main_under_title">
                        © Lichagin Gleb
                    </span>
                `

            },

            expection: {

                class: 'js-play_field__introduction js-play_field__expection',
                html: null

            },

            prepare_game: {

                class: 'js-play_field__prepare',
                html: null

            },

            expection_process_game: {

                class: 'js-play_field__expection_process_game',
                html: null

            },

            process_game: {

                class: 'js-play_field__process_game',
                html: null

            },

            game_over: {

                class: 'js-play_field__game_over',
                html:
                `
                    <span id="game_author" class="main_under_title">
                        © Lichagin Gleb
                    </span>
                `

            }

        }

    }

    // initialisation
    initialisation() {

        this.create();
        this.endExecutionCurrentFunction();

    }

    // show 
    showFramework() {

        let play_field__wrapper = document.querySelector(`.${this.ID_NAME}__wrapper`);

        collector_animations.transform.start({

            execution_command: collector_animations.transform.COLLECTOR_COMMANDS.narrow.name,
            involved_elements: [play_field__wrapper],
            start_position: 100,
            final_position: PlayField.FinalValue,
            duration_animation: 400,
            next_function: this.endExecutionCurrentFunction

        });

    }




    // private properties for the internal mechanism (class) //
    // with default values //


    // private methods for the internal mechanism (class) //

    // get
    static get FinalValue() {

        if (window.screen.availWidth > 1600) {
            return 80;
        }

        if (window.screen.availWidth < 1600 && window.screen.availWidth > 1000) {
            return 75;
        }

        if (window.screen.availWidth < 1000) {
            return 100;
        }

    }

};

// play field object //
const play_field = new PlayField({

    teg_value: 'section',
    id_name: 'play_field',
    class_name: 'js-play_field__introduction',
    html_value:
        `
        <span id="game_author" class="main_under_title">
            © Lichagin Gleb
        </span>
    `,

    presence_wrapper: true,
    involved_element: document.body,
    insert_command: 'prepend'

});

// export //
export { play_field };



// Note //

// n.1
// game_expectation_start: {
//     class: 'js-play_field__expectation',
//     html:
//         `
//             <h1 id="game_name" class="main_title">Flappy Gosha</h1>
//             <button class="button__start_game">
//                 Start game
//             </button>
//             <span id="game_author" class="main_under_title">© Lichagin Gleb</span>
//         `
// },

// n.2
// <span id="introduction_message" class="main_title" style="opacity: 0;"></span>
// <h1 id="game_name" class="main_title"></h1>
// <span id="suggestion_start_game" style="opacity: 0;">
//     <span class="arrow_to_right"></span>
//     click or press "space"
// </span>

// n.3
// <input id='countdown' disabled>