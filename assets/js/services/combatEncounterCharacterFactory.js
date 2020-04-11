define(['jquery',
    'logger',
    'models/combat/combatEncounterCharacterModel',
    'collections/combat/combatEncounterCharacterCollection',
    'services/characterWarehouse'],
    function ($, Logger, CombatEncounterCharacterModel, CombatEncounterCharacterCollection, CharacterWarehouse) {

        CombatEncounterCharacterFactory = function () {
            // all variables are private
            var self = this;
            var allEncounterCharactersCollection = null;

            // public functions

            // Retrieve the characters for the encounter.  If there are no characters in the encounter,
            // add all the characters in.  The user can then remove the ones they don't want.
            // Requires a 'live' encounter and collection - 
            // meaning they have to be objects that have been retrived from Firebase
            this.getCharactersForEncounter = function (combatEncounter) {
                var deferred = $.Deferred();
                $.when(getEncounterCharacterCollection(combatEncounter)).then(
                    function (combatEncounterCharacterCollection) {
                        if (combatEncounterCharacterCollection.length > 0) {
                            deferred.resolve(combatEncounterCharacterCollection);
                        } else {
                            $.when(populateEncounterWithInitialCharacters(combatEncounter)).then(
                                function () {
                                    $.when(getEncounterCharacterCollection(combatEncounter)).then(
                                        function (newCombatEncounterCharacterCollection) {
                                            deferred.resolve(newCombatEncounterCharacterCollection);
                                        }
                                    )
                                }
                            )
                        }
                    }
                )
                return deferred.promise();
            };

            // deletes the character from the encounter.  Removing from the 'all' collection - 
            // should also appear in any encounter specific collections that the character belongs to.
            this.removeCharacterFromEncounter = function (combatEncounterCharacterToBeRemoved) {
                var deferred = $.Deferred();
                if (combatEncounterCharacterToBeRemoved.get('id')) {
                    $.when(getAllEncounterCharacters()).then(
                        function (myAllCombatCharacterCollection) {
                            myAllCombatCharacterCollection.remove(combatEncounterCharacterToBeRemoved);
                            deferred.resolve();
                        }
                    )
                } else {
                    deferred.resolve();
                }

                return deferred.promise();
            };

            // private functions

            getAllEncounterCharacters = function () {
                var deferred = $.Deferred();
                $.when(getAllEncounterCharacterCollection()).then(
                    function (myEncounterCharacterCollection) {
                        deferred.resolve(myEncounterCharacterCollection);
                    }
                )
                return deferred.promise();
            };

            getAllEncounterCharacterCollection = function () {
                var deferred = $.Deferred();
                if (allEncounterCharactersCollection) {
                    deferred.resolve(allEncounterCharactersCollection);
                } else {
                    allEncounterCharactersCollection = new CombatEncounterCharacterCollection();
                    allEncounterCharactersCollection.on('sync', function (collection) {
                        deferred.resolve(collection);
                    })
                }
                return deferred.promise();
            };

            getEncounterCharacterCollection = function (encounterModel) {
                var deferred = $.Deferred();
                var encounterCharactersCollection = new CombatEncounterCharacterCollection(encounterModel.get('id'));
                encounterCharactersCollection.on('sync', function (collection) {
                    deferred.resolve(collection);
                })
                return deferred.promise();
            };

            populateEncounterWithInitialCharacters = function (encounterModel) {
                var deferred = $.Deferred();

                $.when(CharacterWarehouse.getAllCharacters()).then (
                    function (allCharactersCollection) {
                        var arrayOfCharacterAddedDeferreds = [];
                        allCharactersCollection.each(function(character, index) {
                            arrayOfCharacterAddedDeferreds.push(addCharacterToEncounter(encounterModel, character));
                        });
                        $.when.apply($, arrayOfCharacterAddedDeferreds).then(function() {
                            deferred.resolve();
                        });
                    }
                )

                return deferred.promise();
            };

            addCharacterToEncounter = function (encounterModel, character) {
                var deferred = $.Deferred();
                $.when(getAllEncounterCharacters()).then(
                    function (myAllEncounterCharactersCollection) {
                        var newModel = new CombatEncounterCharacterModel();
                        newModel.set('encounterID', encounterModel.get('id'));
                        newModel.set('characterID', character.get('id'));
                        newModel.set('name', character.get('name'));
                        myAllEncounterCharactersCollection.on('add', function (addedModel) {
                            deferred.resolve(addedModel);
                        });
                        myAllRoundsCollection.add(newModel);
                    }
                )
                return deferred.promise();
            };

        };

        var myCombatEncounterCharacterFactory = new CombatEncounterCharacterFactory();

        return myCombatEncounterCharacterFactory;

    });