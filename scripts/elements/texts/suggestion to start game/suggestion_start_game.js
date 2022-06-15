
// import //
import { collector_animations } from '../../../abstractions/game animations/collector_animations.js';
import { collector_pattern_html_elements } from '../../../abstractions/game patterns/collector_pattern_html_elements.js';

// suggestion to start the game class //
class SuggestionStartGame extends collector_pattern_html_elements.GameElement {

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
            involved_elements: [suggestion_start_game.HTML_LINK],
            duration_animation: 1000,
            next_function: function () {

                setTimeout(
                    function () {
                        suggestion_start_game.hide();
                    }, 100
                );

            }

        });

    }

    // hide
    hide() {

        collector_animations.transparency.start({

            execution_command: collector_animations.transparency.COLLECTOR_COMMANDS.disappear.name,
            involved_elements: [suggestion_start_game.HTML_LINK],
            duration_animation: 1000,
            next_function: function () {

                if(suggestion_start_game.endAnimation) { return };

                suggestion_start_game.show();

            }

        });

    }

    // stop show
    stopShow() {
        this.delete();
        this.endAnimation = true;
        this.endExecutionCurrentFunction();
    }

};

// suggestion to start the game object //
const suggestion_start_game = new SuggestionStartGame({

    teg_value: 'span',
    id_name: 'suggestion_start_game',
    class_name: 'main_text',
    html_value:
    `
        <span class="arrow_to_right"></span>
        Click or press "Space"
    `,

    presence_wrapper: false,
    involved_element: '#game_name',
    insert_command: 'after'

});

// export //
export { suggestion_start_game };



// Note //

// n.1

// create
// create() {
//     this._createHTMLSuggestion();
// },

// create html
// _createHTMLSuggestion() {
// let suggestion_start_game_html = document.createElement('span');
// suggestion_start_game_html.id = 'suggestion_start_game';
// suggestion_start_game_html.innerHTML = 'click or press "space"';

// let arrow_for_suggestion_html = document.createElement('span');
// arrow_for_suggestion_html.className = 'arrow_to_right';

// suggestion_start_game_html.prepend(arrow_for_suggestion_html);
// game_name.HTML_LINK.after(suggestion_start_game_html);

// suggestion_start_game_html.style.top =
//     (game_name.HTML_LINK.offsetTop + game_name.HTML_LINK.offsetHeight)
//      + 5 + 'px';
// suggestion_start_game_html.style.left =
//     game_name.HTML_LINK.offsetLeft +
//     ((game_name.HTML_LINK.offsetWidth - suggestion_start_game_html.offsetWidth) / 2)
//      + 'px';

// },