
// main ======================================================== //

// obstacle settings ------------------------------------------- //
const obstacle_settings = {

    // width --------------------------------------------------- //
    get width() {
        let width_player = document.getElementById("player").offsetWidth;
        return width_player + 30;
    },

    // interval create obstacles ------------------------------- //
    get interval_create() {

        let width_player = document.getElementById("player").offsetWidth;
        let width_play_field = document.getElementById("play_field").offsetWidth;

        let distance = 4 * width_player;
        let speed_obstacle = (width_play_field + (2 * this.width)) / this.duration_moving;
        let time_interval = distance + (2 * this.width + 30) / speed_obstacle;

        return time_interval;

    },

    // duration moving obstacles ------------------------------- //
    get duration_moving() {

        let window_width = window.screen.width;

        if(window_width > 1600) return 3200;
        if(window_width > 1000) return 3300;
        return 3500;

    },

    // setter
    get inner_html() {

        let max_height = 65;
        let min_height = 28;
        let height_player = document.getElementById("player").offsetHeight;

        let pass_height = (height_player * 3.5) / (window.screen.height * 0.01);
        let obstacle_top__height = (Math.random() * (max_height - min_height)) + min_height;

        if (obstacle_top__height < 15) {
            obstacle_top__height += 9;
        } else if (obstacle_top__height > 15) {
            obstacle_top__height -= 7;
        }

        return `
            <div
                class="obstacle_top"
                style="height: ${obstacle_top__height}%"
            ></div>
            <div
                class="obstacle_bottom"
                style="height: ${(100 - (obstacle_top__height + pass_height))}%"
            ></div>
        `;

    },

};


// export ====================================================== //
export default obstacle_settings;