
// engine
const GameEngine = {

    // public methods for external interaction //

    // start
    start(ordered_functions) {

        this._preparingToLaunchWork(ordered_functions);
        this._launchWork();

    },

    // end current function
    endCurrentFunction() {
        this._endCurrentFunction = true;
    },



    
    // private properties for the internal mechanism //
    // with default values //
    _endCurrentFunction: false,
    _duration_interval_check: 10,

    _current_function: null,
    _number_current_function: null,
    _number_functions: null,
    _ordered_functions: null,

    // private methods for the internal mechanism //
    
    // prepare
    _preparingToLaunchWork(ordered_functions) {

        this._number_functions = ordered_functions.length;
        this._ordered_functions = ordered_functions;

        this._number_current_function = 0;
        this._endCurrentFunction = false;

    },

    // launch
    _launchWork() {

        GameEngine._setCurrentFucntion();
        GameEngine._current_function();
        GameEngine._check_EndCurrentFunction();

    },

    // set
    _setCurrentFucntion() {

        if (this._number_current_function > this._number_functions) { return }

        this._current_function = this._ordered_functions[this._number_current_function];

    },

    // check
    _check_EndCurrentFunction() {

        let interval_check = setInterval(

            function () {

                if (GameEngine._endCurrentFunction == true) {

                    clearInterval(interval_check);
                    GameEngine._switchingToNextFunction();

                }

            },
            this._duration_interval_check

        );

    },

    // switch
    _switchingToNextFunction() {

        GameEngine._endCurrentFunction = false;

        if (GameEngine._number_current_function == GameEngine._number_functions) { return }

        GameEngine._number_current_function++;
        GameEngine._launchWork();

    },

}

// export
export { GameEngine };


// Note //

// n.1
// engine
// это игровой движок
// его задача: приведение игры в действие,
// т.е это своего рода обёртка алгоритма игры