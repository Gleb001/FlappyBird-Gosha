
// main ======================================================== //

// asyncGameEngine --------------------------------------------- //
const asyncGameEngine = {

    // public APIs ============================================= //

    // start --------------------------------------------------- //
    start(async_functions) {

        this._async_functions_settings._setList(async_functions);

        this._id_interval = setInterval(
            function () {
                asyncGameEngine._launchWorkFunctions();
            }, 10
        );

    },

    // end ----------------------------------------------------- //
    stop() {
        clearInterval(this._id_interval);
    },


    // private properties and methods ========================== //
    // for the internal mechanism ============================== //

    // work with functions ------------------------------------- //
    _async_functions_settings: {
        _setList(async_functions) {
            this.list = async_functions;
        },
        _getList() {
            return this.list;
        },
    },

    // running the funcctions ---------------------------------- //
    _launchWorkFunctions() {
        let list = this._async_functions_settings._getList();
        list.forEach(async_function => async_function());
    },

}


// export ====================================================== //
export default asyncGameEngine;