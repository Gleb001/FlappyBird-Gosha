
// import elements //

// figures
import { circle } from './figures/circle/circle.js';

// counters
import { counter_obstacles } from './counters/counter obstacles/counter_obstacles.js';

// texts
import { game_name } from './texts/game name/game_name.js';
import { game_over_text } from './texts/game over text/game_over_text.js';
import { result_gamer } from './texts/result gamer/result_gamer.js';
import { introduction_message } from './texts/introduction message/introduction_message.js';
import { suggestion_make_action } from './texts/suggestion make action/suggestion_make_action.js';

// element collector //
const collector_elements = {

    // figures //
    figures: {
        circle,
    },

    // counters //
    counters: {
        counter_obstacles
    },


    // texts //
    texts: {
        game_name,
        game_over_text,
        result_gamer,
        suggestion_make_action,
        introduction_message
    }

};

// export //
export { collector_elements };
