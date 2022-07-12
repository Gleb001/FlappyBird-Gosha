
// import elements //

// figures
import { circle } from './figures/circle/circle.js';

// counters
import { counter_obstacles } from './counters/counter obstacles/counter_obstacles.js';

// texts
import { game_name } from './texts/game name/game_name.js';
import { game_over } from './texts/game over/game_over.js';
import { result_gamer } from './texts/result gamer/result_gamer.js';
import { introduction_message } from './texts/introduction message/introduction_message.js';
import { suggestion_start_game } from './texts/suggestion to start game/suggestion_start_game.js';

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
        game_over,
        result_gamer,
        suggestion_start_game,
        introduction_message
    }

};

// export //
export { collector_elements };
