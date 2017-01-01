define(['jquery', 'realmApplication'
    ],
    function ($, RealmApplication) {

        RouterController = {
            workInProgress: function () {
                require(['views/workInProgressView'], function (WorkInProgressView) {
                    var view = new WorkInProgressView();
                    RealmApplication.regions.mainRegion.show(view);
                });
            },
            dieRoller: function () {
                require(['models/dieRoller/dieModel','views/dieRoller/dieRollerView'], function (DieModel, DieRollerView) {
                    var dieModel = new DieModel();
                    var view = new DieRollerView({model: dieModel});
                    RealmApplication.regions.mainRegion.show(view);
                });
            },
            combatEncounterList: function () {
                require(['views/combat/combatEncounterListView',
                        'views/combat/combatEncounterListLayoutView','views/combat/combatEncounterListButtonView',
                        'services/combatEncounterWarehouse'],
                    function (CombatEncounterListView, CombatEncounterListLayoutView,
                              CombatEncounterListButtonView, CombatEncounterWarehouse) {
                        var combatEncounterListLayoutView = new CombatEncounterListLayoutView();
                        RealmApplication.regions.mainRegion.show(combatEncounterListLayoutView);
                        $.when(CombatEncounterWarehouse.getAllCombatEncounters()).then(
                            function(myCombatEncounterCollection) {
                                var combatEncounterListView = new CombatEncounterListView({collection: myCombatEncounterCollection});
                                var combatEncounterListButtonView = new CombatEncounterListButtonView({listView: combatEncounterListView});
                                combatEncounterListLayoutView.getRegion('combatEncountersTableRegion').show(combatEncounterListView);
                                combatEncounterListLayoutView.getRegion('buttonsRegion').show(combatEncounterListButtonView);
                            }
                        ),
                            function() {
                                console.log('some kind of error getting combat encounters');
                            }
                    });
            },
            addChangeCombatEncounter: function(combatEncounterModel) {
                require(['views/combat/addChangeCombatEncounterView'],
                    function (AddChangeCombatEncounterView) {
                        var addChangeCombatEncounterView = new AddChangeCombatEncounterView({model: combatEncounterModel});
                        RealmApplication.regions.mainRegion.show(addChangeCombatEncounterView);
                });
            },
            openCombatEncounter: function(combatEncounterModel) {
                require(['views/combat/combatEncounterLayoutView'],
                    function (CombatEncounterLayoutView) {
                        var combatEncounterLayoutView = new CombatEncounterLayoutView({encounter : combatEncounterModel});
                        $.when(combatEncounterLayoutView.prepareToShowRound('open')).then(
                            function() {
                                RealmApplication.regions.mainRegion.show(combatEncounterLayoutView);
                             }
                        )
                });
            },
            playerList: function () {
                require(['views/player/playerListView', 'views/player/playerView',
                    'views/player/playerListLayoutView','views/player/playerListButtonView',
                    'services/playerWarehouse'],
                    function (PlayerListView, PlayerView, PlayerListLayoutView,
                              PlayerListButtonView, PlayerWarehouse) {
                    var playerListLayoutView = new PlayerListLayoutView();
                    RealmApplication.regions.mainRegion.show(playerListLayoutView);
                    $.when(PlayerWarehouse.getAllPlayers()).then(
                        function(myPlayerCollection) {
                            var playerListView = new PlayerListView({collection: myPlayerCollection});
                            var playerListButtonView = new PlayerListButtonView();
                            playerListLayoutView.getRegion('playerTableRegion').show(playerListView);
                            playerListLayoutView.getRegion('buttonsRegion').show(playerListButtonView);
                        }
                    ),
                        function() {
                            console.log('some kind of error getting players');
                        }
                });
            },
            viewPlayer: function(playerModel) {
                require(['views/player/playerView'], function (PlayerView) {
                    var playerView = new PlayerView({model : playerModel});
                    RealmApplication.regions.mainRegion.show(playerView);
                });
            },
            criticalHits: function (combatEncounterID, characterID) {
                require(['views/criticalHit/criticalHitLayoutView', 'views/criticalHit/criticalHitFilterView',
                         'services/criticalHitWarehouse', 'collections/criticalHit/criticalHitCollection',
                        'collections/criticalHit/criticalHitDisplayCollection', 'collections/criticalHit/criticalHitTypeCollection',
                        'views/criticalHit/criticalHitListView', 'services/serviceConstants', 'services/combatEncounterWarehouse'],
                    function (CriticalHitLayoutView, CriticalHitFilterView, CriticalHitWarehouse, CriticalHitCollection,
                              CriticalHitDisplayCollection, CriticalHitTypeCollection, CriticalHitListView, ServiceConstants,
                              CombatEncounterWarehouse) {
                        var criticalHitLayoutView = new CriticalHitLayoutView();
                        RealmApplication.regions.mainRegion.show(criticalHitLayoutView);
                        $.when(CriticalHitWarehouse.getAllTypes()).then(
                            function(criticalHitTypeCollection) {
                                $.when(CriticalHitWarehouse.getCriticalHitsForType(criticalHitTypeCollection.at(0).get('id'))).then (
                                    function(criticalHitCollection) {
                                        $.when(CombatEncounterWarehouse.getAllCombatEncounters()).then(
                                            function(combatEncounterCollection) {
                                                var viewParms = {criticalHitTypes : criticalHitTypeCollection, criticalHits: criticalHitCollection, combatEncounters: combatEncounterCollection};
                                                if (combatEncounterID && characterID) {
                                                    viewParms.combatEncounterID = combatEncounterID;
                                                    viewParms.characterID = characterID;
                                                }
                                                var criticalHitFilterView = new CriticalHitFilterView(viewParms);
                                                criticalHitLayoutView.getRegion('criticalHitFilterRegion').show(criticalHitFilterView);
                                                var displayedHitsCollection = new CriticalHitDisplayCollection();
                                                var criticalHitListView = new CriticalHitListView({collection : displayedHitsCollection});
                                                criticalHitLayoutView.getRegion('criticalHitDisplayRegion').show(criticalHitListView);
                                              //  if (combatEncounterID) {
                                             //       criticalHitFilterView.combatEncounterSelected();
                                           //     };
                                                RealmApplication.vent.trigger('navigationEvent', 'criticalHits');
                                            },
                                            function(errorString) {
                                                console.log(errorString);
                                            }
                                        )
                                    },
                                    function(errorString) {
                                        console.log(errorString);
                                    }
                                )
                            },
                            function(errorString) {
                                console.log(errorString);
                            }
                        )
                    });
            },
            characterList: function () {
                require(['views/character/characterListView', 'views/character/characterView',
                        'views/character/characterListLayoutView','views/character/characterListButtonView',
                        'services/characterWarehouse', 'services/playerWarehouse'],
                    function (CharacterListView, CharacterView, CharacterListLayoutView,
                              CharacterListButtonView, CharacterrWarehouse, PlayerWarehouse) {
                        var characterListLayoutView = new CharacterListLayoutView();
                        RealmApplication.regions.mainRegion.show(characterListLayoutView);
                        $.when(CharacterrWarehouse.getAllCharacters(), PlayerWarehouse.getAllPlayers()).then(
                            function(myCharacterCollection, myPlayerCollection) {
                                // getting the players so the character list model can get them without waiting
                                var characterListView = new CharacterListView({collection: myCharacterCollection});
                                var characterListButtonView = new CharacterListButtonView();
                                characterListLayoutView.getRegion('characterTableRegion').show(characterListView);
                                characterListLayoutView.getRegion('buttonsRegion').show(characterListButtonView);
                            }
                        ),
                            function() {
                                console.log('some kind of error getting characters');
                            }
                    });
            },
            viewCharacter: function(characterModel) {
                require(['views/character/characterView'], function (CharacterView) {
                    var characterView = new CharacterView({model : characterModel});
                    RealmApplication.regions.mainRegion.show(characterView);
                });
            },
        };

        return RouterController;

    });
