"use strict"; // execute in strict mode
window.Game = window.Game || {};

// Core Variables
$.extend(Game, {
    GAME_NAME: "The Dragons' Guardian",
    // Version information
    CURRENT_VERSION: "0.1.01",
    ORIGINAL_VERSION: "0.1",
    VERSION_NAME: "The Beginning",
    // Number handling
    EPSILON: 1e-6,  // accuracy for floating-point equality comparisons
    MAX_SAFE_NUMBER: Math.pow(2, 36) - 1,  // for 5 decimal place precision
    // Game loop settings
    GAME_INTERVAL: 50,
});

Game.Main = {

    init() {

        $("#game-name").empty();
        $("#game-name").append(Game.GAME_NAME)
        $("#game-version").empty();
        $("#game-version").append("version " + Game.CURRENT_VERSION)

        main.restartGame();
        main.restoreGameFromSave();
        main.setupGame();

    },

    restartGame() {

        // reset all variables to their default values.

        // UI
        log.init();
        roster.init();
        tooltip.init();

        // Resources
        Game.Elements.init();
        Game.Resources.init();

        //// Areas
        explore.init();
        field.init();
        hatchery.init();
        reserve.init();

        //// Area Handler
        Game.AreaHandler.init();

    },

    restoreGameFromSave() {
        // Check if save data exists; if so, load it.
        if (Game.Save.savedGameExists()) {
            try {
                Game.Save.loadGame();
                log.addMessage("Loaded game.");
            } catch (err) {
                log.addError(err);
            }
        }
    },

    setupGame () {
        // Use currently loaded data to set-up the game.
        //// Resources
        Game.Resources.setup();
        Game.Advancements.setup();
        Game.ActionHandler.setup();

        //// Areas
        field.setup();
        hatchery.setup();
        reserve.setup();
        explore.setup();

        // Start game ticks.
        setInterval(main.gameTick, Game.GAME_INTERVAL);

        // Load area
        Game.AreaHandler.loadCurrentArea();
    },

    prestigeGame() {
        // Game prestige placeholder.
    },

    gameTick() {

        // Process things that should happen every game tick.
        Game.Advancements.checkAdvancements();
        resources.update();

        // Check for new unlocked areas.
        Game.AreaHandler.updateUnlockedAreas();

        // Check Area Progress.
        
        field.update();
        hatchery.update();
        reserve.update();
        explore.update();
    },

    autosave() {
        // Autosave handler placeholder.
    }

};

$(() => {

    $("#game").show();
    main.init();
    
});














