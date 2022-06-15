
// import //
import { collector_animations } from '../../../abstractions/game animations/collector_animations.js';
import { collector_pattern_html_elements } from '../../../abstractions/game patterns/collector_pattern_html_elements.js';

import { Obstacle } from '../../../components/obstacle/obstacle.js';

// counter obstacles class //
class counterObstacles extends collector_pattern_html_elements.GameElement {

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

        this.number_current_obstacle = null;

    }

    // initialisation
    initialisation() {

        this.create();
        this.HTML_LINK.setAttribute('disabled', '');
        this.HTML_LINK.setAttribute('value', '0');
        this.HTML_LINK.style.top = -(this.HTML_LINK.offsetTop + this.HTML_LINK.offsetHeight + 20) + 'px';

        this.endExecutionCurrentFunction();

    }

    // show
    show() {

        collector_animations.move.start({

            execution_command: collector_animations.move.COLLECTOR_COMMANDS.move_down.name,
            involved_elements: [counter_obstacles.HTML_LINK],
            start_position: counterObstacles.StartValue,
            final_position: counterObstacles.FinalValue,
            duration_animation: 450,
            next_function: this.endExecutionCurrentFunction

        });

    }

    // start
    start() {

        counterObstacles._startCheckingPassObstacle();
        this.endExecutionCurrentFunction();

    }

    // end
    end() {
        clearInterval(counterObstacles._checking_pass_obstacle);
    }




    // private properties for the internal mechanism (class) //
    // with default values //
    static _checking_pass_obstacle = null;


    // private methods for the internal mechanism (class) //

    // get
    static get StartValue() {
        return counter_obstacles.HTML_LINK.offsetTop +
            counter_obstacles.HTML_LINK.offsetHeight + 20;
    }
    static get FinalValue() {

        if (window.screen.availWidth > 1600) {
            return 25;
        }

        if (window.screen.availWidth < 1600 && window.screen.availWidth > 1000) {
            return 10;
        }

        if (window.screen.availWidth < 1000 && window.screen.availWidth > 478) {
            return 8;
        }

        if (window.screen.availWidth < 478) {
            return 5;
        }

    }

    // check
    static _startCheckingPassObstacle() {

        this._checking_pass_obstacle = setInterval(

            function () {

                Obstacle.setNumberCurrentAndPassedObstacle();
                counter_obstacles.HTML_LINK.value = Obstacle.NumberPassedObstacle;
                
            }, 5

        );

    }

    // update
    static _updateValueCounterObstacles() {

        counter_obstacles.HTML_LINK.value = counter_obstacles.number_current_obstacle;
        counter_obstacles.number_current_obstacle++;

        counterObstacles._startCheckingPassObstacle();

    }

}

// counter ostacles object //
const counter_obstacles = new counterObstacles({

    teg_value: 'input',
    id_name: 'counter_obstacles',
    class_name: 'countdown_text',
    html_value: null,

    presence_wrapper: false,
    involved_element: '#play_field',
    insert_command: 'prepend'

});

// export //
export { counter_obstacles };