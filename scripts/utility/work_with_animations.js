
// import ============================================= //

// sync game engine ----------------------------------- //
import syncGameEngine from "../game_engines/game_engine.js";
import { setPropsWithDefaultValues } from "./work_with_objects.js";


// main =============================================== //

// class animation js --------------------------------- //
class AnimationJS {

    // public properties and methods =================== //

    // constructor ------------------------------------- //
    constructor(animation_settings = {
        changing_elements,
        timing_settings: {
            synchronous,
            timing_function,
            duration,
            delay,
        },
        changing_properties: [

            // pattern property description 
            {
                name,
                unit_of_measurement,
                function_value,
                start_value,
                end_value
            },

        ],
        next_function
    }) {

        // default props
        let default_settings = {
            timing_settings: { synchronous: false, delay: 0 },
            changing_properties: { unit_of_measurement: "" },
        };

        // set props for the animation object
        setPropsWithDefaultValues(
            this,
            animation_settings,
            default_settings
        );

    }

    // start ------------------------------------------- //
    start() {

        // 1. getting variables
        let synchronous = this.timing_settings.synchronous;
        let duration = this.timing_settings.duration;
        let delay = this.timing_settings.delay;

        // 2. checking on synchronous
        if (synchronous) syncGameEngine.pause();

        // 3. play an animation with a delay
        setTimeout(
            () => {

                let current_animation = this;
                let start_animation = performance.now();

                this.ID_ANIMATION = window.requestAnimationFrame(

                    function animate(timestamp) {

                        let time_fraction = (timestamp - start_animation) / duration;
                        if (time_fraction > 1) time_fraction = 1;

                        current_animation._changeEachPropertyInOrder(time_fraction);

                        if (time_fraction < 1) {
                            window.requestAnimationFrame(animate);
                        } else current_animation.end();

                    }

                );

            }, delay
        );

    }

    // end --------------------------------------------- //
    end() {

        // 1. cancel animation frame and start next func
        window.cancelAnimationFrame(this.ID_ANIMATION);
        this._startNextFunction();

        // 2. checking on synchronous
        if (this.timing_settings.synchronous) {
            syncGameEngine.startAfterPause();
        }

    }



    // private properties and methods ================= //

    // timing functions ------------------------------- //
    static TIMING_FUNCTIONS = {
        ease: (time_fraction) => {
            // y = sin (x * π/4)
            return Math.sin(time_fraction * Math.PI / 4);
        },
        ease_in: (time_fraction) => {
            // y = x^2
            return Math.pow(time_fraction, 2);
        },
        ease_out: (time_fraction) => {
            // y = √x
            return Math.sqrt(time_fraction);
        },
        linear: (time_fraction) => {
            // y = x
            return time_fraction;
        },
        bounce_start: (time_fraction) => {
            // y = 4 * x^3 - 3 * x^2
            return (4 * Math.pow(time_fraction, 3)) - (3 * Math.pow(time_fraction, 2));
        },
        bounce_end: (time_fraction) => {
            // y = -4 * x^3 + 5 * x^2
            return (-4 * Math.pow(time_fraction, 3)) + (5 * Math.pow(time_fraction, 2));
        },
    }

    // change each prop in order ---------------------- //
    _changeEachPropertyInOrder(time_fraction) {

        this.changing_properties.forEach(property => {
            let replacement_value = this._calculate(time_fraction, property);
            this._draw(replacement_value, property);
        });

    }

    // calculate new value ---------------------------- //
    _calculate(time_fraction, property) {

        let distance = property.end_value - property.start_value;
        let y_coordinate = this.timing_settings.timing_function(
            time_fraction
        );

        return y_coordinate * distance;

    }

    // draw ------------------------------------------- //
    _draw(replacement_value, property) {

        let function_value = property.function_value;
        let unit_of_measurement = property.unit_of_measurement;

        let new_value = property.start_value + replacement_value;
        let value_prop = new_value + unit_of_measurement;
        if (function_value) value_prop = `${function_value}(${value_prop})`;

        this.changing_elements.forEach(element => {
            element.style[property.name] = value_prop;
        });

    }

    // start next function ---------------------------- //
    _startNextFunction() {
        if (typeof this.next_function == "function") this.next_function();
    }

};

// class animation css -------------------------------- //
class AnimationCSS {

    // public properties and methods ================== //

    // constructor ------------------------------------ //
    constructor(animation_settings = {
        name_animation,
        changing_elements,
        timing_settings: {
            synchronous,
            timing_function,
            duration,
            delay,
        },
        changing_properties: [

            // pattern property description 
            {
                name,
                unit_of_measurement,
                function_value,
                start_value,
                end_value
            },

        ],
        next_function
    }) {

        // default props
        let default_settings = {
            name_animation: "animation_number_" + AnimationCSS.INDEX_ANIMATION++,
            timing_settings: { synchronous: false, delay: 0 },
            changing_properties: { unit_of_measurement: "" },
        };
        // set props for the animation object
        setPropsWithDefaultValues(
            this,
            animation_settings,
            default_settings
        );

    }

    // start ------------------------------------------ //
    start() {

        // 1. checking synchronous
        if (this.timing_settings.synchronous) {
            syncGameEngine.pause();
        }

        // 2. add styles animation for changing element
        this._addSpecStylesForChangingElements(
            AnimationCSS.STATUSES_ANIMATION.start
        );

        // 3. create animation css file
        let animation_css_file = AnimationCSS.createAnimationCSSFile(
            this.changing_properties,
            this.name_animation
        );

        // 4. end animation
        setTimeout(
            () => {
                if (animation_css_file) {
                    this.end(animation_css_file);
                }
            },
            this.timing_settings.duration
        );

    }

    // end -------------------------------------------- //
    end(animation_css_file) {

        // 1. remove css file
        animation_css_file.remove();

        // 2. add spec styles for changing elements
        this._addSpecStylesForChangingElements(
            AnimationCSS.STATUSES_ANIMATION.end
        );

        // 3. check syncronous
        if (this.timing_settings.synchronous) {
            syncGameEngine.startAfterPause();
        }

        // 4. start next function
        if (typeof this.next_function == "function") {
            this.next_function();
        }

    }


    // private properties and methods ================= //

    // index animation -------------------------------- //
    static INDEX_ANIMATION = 1
    static STATUSES_ANIMATION = {
        start: "start_value",
        end: "end_value",
    }

    // get animation css file ------------------------- //
    static createAnimationCSSFile(
        changing_properties = [
            // pattern property description 
            {
                name,
                unit_of_measurement,
                function_value,
                start_value,
                end_value
            },
        ],
        name_animation = `animation_number_${this.INDEX_ANIMATION++}` 
    ) {

        // 1. get last animation file
        let last_animation_file = document.querySelector(
            "body .animation_pattern:last-child"
        );

        // 2. get number current animation
        let number_current_animation = 1;
        if (last_animation_file) {
            number_current_animation += last_animation_file.dataset.number
        }

        // 3. create animation css file
        let new_animation_css_file = document.createElement("style");
        new_animation_css_file.className = 'animation_pattern';
        new_animation_css_file.id = `animaiton_number_${number_current_animation}`;
        new_animation_css_file.innerText = _getKeyframesAnimation();
        document.body.append(new_animation_css_file);

        // 4. return animation css file
        return new_animation_css_file;

        // *. get keyframes animation
        function _getKeyframesAnimation() {

            let from_properties = "";
            let to_properties = "";

            changing_properties.forEach(prop => {

                let function_value = prop.function_value;
                let unit_of_measurement = prop.unit_of_measurement;
                let start_value_prop = prop.start_value + unit_of_measurement;
                let end_value_prop = prop.end_value + unit_of_measurement;

                if (typeof function_value == "string") {
                    start_value_prop = `${function_value}(${start_value_prop})`;
                    end_value_prop = `${function_value}(${end_value_prop})`;
                }

                from_properties += `${prop.name}: ${start_value_prop}; `;
                to_properties += `${prop.name}: ${end_value_prop}; `;

            })

            return `
                    @keyframes ${name_animation} {
                        from { ${from_properties} }
                        to { ${to_properties} }
                    }
                `;

        }

    }

    // add special styles for changing elements depend status
    // animation (start or stop) ---------------------- //
    _addSpecStylesForChangingElements(type_value) {

        // 1. set animation value
        let animation_value = "";
        if (type_value == "start_value") {
            animation_value =
                `
                ${this.name_animation}
                ${this.timing_settings.duration}ms
                ${this.timing_settings.timing_function}
                ${this.timing_settings.delay}ms
                forwards
            `;
        }

        // 2. change style changing elements
        this.changing_properties.forEach(prop => {

            this.changing_elements.forEach(element => {
                element.style.animation = animation_value;
                element.style[prop.name] = prop[type_value] + prop.unit_of_measurement;
            });

        });

    }

};


// export ============================================= //
export { AnimationCSS, AnimationJS };