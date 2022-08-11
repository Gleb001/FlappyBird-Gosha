
// asyncGameEngine //
const asyncGameEngine = {

    start(ordered_functions) {

        this._ordered_functions = ordered_functions;
        this._number_functions = this._ordered_functions.length - 1;

        this._interval_lauch_functions = setInterval(
            
            function() {
                asyncGameEngine._launchWorkFunctions();
            }, 10
            
        );

    },

    end() {
        clearInterval(this._interval_lauch_functions);
    },

    // private object properties for the internal mechanism //
    // with default values //
    _interval_lauch_functions: null,

    _number_functions: null,
    _ordered_functions: null,

    // private object methods for the internal mechanism //

    // launch
    _launchWorkFunctions() {

        for (
            let number_current_function = 0;
            number_current_function <= this._number_functions;
            number_current_function++
        ) {

            let current_function = this._ordered_functions[
                number_current_function
            ];

            current_function();

        }

    },
}

// export //
export { asyncGameEngine };