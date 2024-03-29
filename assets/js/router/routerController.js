define(['jquery', 'realmApplication', 'utility/viewUtilities'
],
    function ($, RealmApplication, ViewUtilities) {

        RouterController = {

            login: function () {
                require(['views/login/loginBackgroundView'], function (LoginBackgroundView) {
                    var view = new LoginBackgroundView();
                    RealmApplication.regions.mainRegion.show(view);
                    ViewUtilities.showLoginModalView();
                });
            },
            about: function () {
                require(['models/about/aboutModel', 'views/about/aboutView'], function (AboutModel, AboutView) {
                    var aboutModel = new AboutModel();
                    var view = new AboutView({ model: aboutModel });
                    RealmApplication.regions.mainRegion.show(view);
                    ViewUtilities.currentNavSelection = 'about';
                    ViewUtilities.resetActiveNavSelection();
                });
            },
            displayLoggedInUser: function (playerModel) {
                require(['views/authentication/authenticationSignedInView', 'services/playerWarehouse'],
                    function (AuthenticationSignedInView, PlayerWarehouse) {
                        $.when(PlayerWarehouse.setPlayerLoggedIn(playerModel)).then(
                            function (playerLoggedIn) {
                                var view = new AuthenticationSignedInView({ model: playerLoggedIn });
                                RealmApplication.regions.authRegion.show(view);
                            }
                        )
                    });
            },
            hideSigninRegionAndDisplayLoginModal: function () {
                RealmApplication.regions.authRegion.reset();
                this.login();
            },
            hideSigninRegionAndDisplaySignedOutView: function () {
                require(['views/authentication/authenticationSignedOutBackgroundView',
                    'services/playerWarehouse'],
                    function (AuthenticationSignedOutBackgroundView, PlayerWarehouse) {
                        RealmApplication.regions.authRegion.reset();
                        ViewUtilities.disableAllNavSelections();
                        var view = new AuthenticationSignedOutBackgroundView({ model: PlayerWarehouse.getPlayerLoggedIn() });
                        RealmApplication.regions.mainRegion.show(view);
                    });
            },
            workInProgress: function () {
                require(['views/workInProgressView'], function (WorkInProgressView) {
                    var view = new WorkInProgressView();
                    RealmApplication.regions.mainRegion.show(view);
                });
            },
            dieRoller: function () {
                require(['models/dieRoller/dieModel', 'views/dieRoller/dieRollerView'], function (DieModel, DieRollerView) {
                    var dieModel = new DieModel();
                    var view = new DieRollerView({ model: dieModel });
                    RealmApplication.regions.mainRegion.show(view);
                    ViewUtilities.currentNavSelection = 'dieRoller';
                });
            },
            willContestList: function () {
                require(['views/willContest/willContestListView',
                    'views/willContest/willContestListLayoutView', 'views/willContest/willContestListButtonView',
                    'utility/viewUtilities',
                    'services/willContestWarehouse', 'services/characterWarehouse', 'services/playerWarehouse'],
                    function (WillContestListView, WillContestListLayoutView,
                        WillContestListButtonView, ViewUtilities, WillContestWarehouse, CharacterWarehouse,
                        PlayerWarehouse) {
                        if (PlayerWarehouse.getPlayerLoggedIn().get('administrator')) {
                            var willContestListLayoutView = new WillContestListLayoutView();
                            RealmApplication.regions.mainRegion.show(willContestListLayoutView);
                            $.when(CharacterWarehouse.getAllCharacters()).then(
                                function (myCharacterList) {
                                    // need to prepopulate the character list for contests.  Now do the contest stuff.
                                    $.when(WillContestWarehouse.getAllWillContests()).then(
                                        function (myWillContestCollection) {
                                            if (myWillContestCollection && myWillContestCollection.length > 0) {
                                                var willContestListView = new WillContestListView({ collection: myWillContestCollection });
                                                willContestListLayoutView.getRegion('willContestListRegion').show(willContestListView);
                                            }
                                            var willContestListButtonView = new WillContestListButtonView();
                                            willContestListLayoutView.getRegion('willContestListButtonsRegion').show(willContestListButtonView);
                                            ViewUtilities.currentNavSelection = 'willContestList';
                                        }
                                    ),
                                        function () {
                                            console.log('some kind of error getting will contests');
                                        }
                                }
                            )
                        } else {
                            ViewUtilities.showModalView('Error', 'Must be an administrator to view will contests');
                        }
                    });
            },
            willContest: function (willContestModel) {
                require(['services/willContestWarehouse', 'views/willContest/willContestLayoutView'],
                    function (WillContestWarehouse, WillContestLayoutView) {
                        $.when(WillContestWarehouse.getAllWillContestants(), WillContestWarehouse.getRoundsForWillContest(willContestModel.id)).then(
                            function (allWillContestantsArray, willContestRounds) {
                                var willContestLayoutView = new WillContestLayoutView({ model: willContestModel, allWillContenstants: allWillContestantsArray, willContestRounds: willContestRounds });
                                RealmApplication.regions.mainRegion.show(willContestLayoutView);
                            }
                        )
                    });
            },
            combatEncounterList: function () {
                require(['views/combat/combatEncounterListView',
                    'views/combat/combatEncounterListLayoutView', 'views/combat/combatEncounterListButtonView',
                    'services/combatEncounterWarehouse', 'services/characterWarehouse'],
                    function (CombatEncounterListView, CombatEncounterListLayoutView,
                        CombatEncounterListButtonView, CombatEncounterWarehouse, CharacterWarehouse) {
                        var combatEncounterListLayoutView = new CombatEncounterListLayoutView();
                        RealmApplication.regions.mainRegion.show(combatEncounterListLayoutView);
                        $.when(CharacterWarehouse.getAllCharacters()).then(
                            function (myCharacterList) {
                                // need to prepopulate the character list for combat.  Now do the combat stuff.
                                $.when(CombatEncounterWarehouse.getAllCombatEncounters()).then(
                                    function (myCombatEncounterCollection) {
                                        var combatEncounterListView = new CombatEncounterListView({ collection: myCombatEncounterCollection });
                                        var combatEncounterListButtonView = new CombatEncounterListButtonView({ listView: combatEncounterListView });
                                        combatEncounterListLayoutView.getRegion('combatEncountersTableRegion').show(combatEncounterListView);
                                        combatEncounterListLayoutView.getRegion('buttonsRegion').show(combatEncounterListButtonView);
                                        ViewUtilities.currentNavSelection = 'combatEncounterList';
                                    }
                                ),
                                    function () {
                                        console.log('some kind of error getting combat encounters');
                                    }
                            }
                        )

                    });
            },
            addChangeCombatEncounter: function (combatEncounterModel) {
                require(['views/combat/addChangeCombatEncounterLayoutView', 'services/combatEncounterCharacterWarehouse'],
                    function (AddChangeCombatEncounterLayoutView, CombatEncounterCharacterWarehouse) {
                        $.when(CombatEncounterCharacterWarehouse.getCombatEncounterCharactersForEncounter(combatEncounterModel)).then(
                            function (combatEncounterCharacterCollection) {
                                var addChangeCombatEncounterLayoutView = new AddChangeCombatEncounterLayoutView(
                                    { model: combatEncounterModel, combatEncounterCharacterCollection: combatEncounterCharacterCollection });
                                RealmApplication.regions.mainRegion.show(addChangeCombatEncounterLayoutView);
                            }
                        )
                    });
            },
            openCombatEncounter: function (combatEncounterModel) {
                require(['views/combat/combatEncounterLayoutView'],
                    function (CombatEncounterLayoutView) {
                        var combatEncounterLayoutView = new CombatEncounterLayoutView({ encounter: combatEncounterModel });
                        $.when(combatEncounterLayoutView.prepareToShowRound('open')).then(
                            function () {
                                RealmApplication.regions.mainRegion.show(combatEncounterLayoutView);
                            }
                        )
                    });
            },
            playerList: function () {
                require(['views/player/playerListView', 'views/player/playerView',
                    'views/player/playerListLayoutView', 'views/player/playerListButtonView',
                    'services/playerWarehouse'],
                    function (PlayerListView, PlayerView, PlayerListLayoutView,
                        PlayerListButtonView, PlayerWarehouse) {
                        var playerListLayoutView = new PlayerListLayoutView();
                        RealmApplication.regions.mainRegion.show(playerListLayoutView);
                        $.when(PlayerWarehouse.getAllPlayers()).then(
                            function (myPlayerCollection) {
                                var playerListView = new PlayerListView({ collection: myPlayerCollection });
                                var playerListButtonView = new PlayerListButtonView();
                                playerListLayoutView.getRegion('playerTableRegion').show(playerListView);
                                // TODO: you can delete all the button here - since you moved to using authenticate users
                                // as players.  You did this in mid-April 2017.  Dump the buttons region and views
                                // in a bit as soon as you're sure you don't want them.
                                // playerListLayoutView.getRegion('buttonsRegion').show(playerListButtonView);
                                ViewUtilities.currentNavSelection = 'players';
                            }
                        ),
                            function () {
                                console.log('some kind of error getting players');
                            }
                    });
            },
            viewPlayer: function (playerModel) {
                require(['views/player/playerView'], function (PlayerView) {
                    var playerView = new PlayerView({ model: playerModel });
                    RealmApplication.regions.mainRegion.show(playerView);
                });
            },
            resistanceCalculator: function () {
                require(['views/resistanceCalculator/resistanceCalculatorLayoutView',
                    'views/resistanceCalculator/resistanceCalculatorView',
                    'views/resistanceCalculator/resistanceCalculatorResultsListView',
                    'collections/resistanceCalculator/resistanceCalculatorResultCollection'],
                    function (ResistanceCalculatorLayoutView, ResistanceCalculatorView, ResistanceCalculatorResultsListView,
                        ResistanceCalculatorResultCollection) {
                        var calculatorView = new ResistanceCalculatorView();
                        var layoutView = new ResistanceCalculatorLayoutView();
                        RealmApplication.regions.mainRegion.show(layoutView);
                        layoutView.getRegion('resistanceCalculatorRegion').show(calculatorView);
                        var resultsCollection = new ResistanceCalculatorResultCollection();
                        var listView = new ResistanceCalculatorResultsListView({ collection: resultsCollection });
                        layoutView.getRegion('resistanceResultsRegion').show(listView);
                        ViewUtilities.currentNavSelection = 'resistanceCalculator';
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
                            function (criticalHitTypeCollection) {
                                $.when(CriticalHitWarehouse.getCriticalHitsForType(criticalHitTypeCollection.at(0).get('id'))).then(
                                    function (criticalHitCollection) {
                                        $.when(CombatEncounterWarehouse.getAllCombatEncounters()).then(
                                            function (combatEncounterCollection) {
                                                var viewParms = { criticalHitTypes: criticalHitTypeCollection, criticalHits: criticalHitCollection, combatEncounters: combatEncounterCollection };
                                                if (combatEncounterID) {
                                                    viewParms.combatEncounterID = combatEncounterID;
                                                };
                                                if (characterID) {
                                                    viewParms.characterID = characterID;
                                                };
                                                var criticalHitFilterView = new CriticalHitFilterView(viewParms);
                                                var displayedHitsCollection = new CriticalHitDisplayCollection();
                                                var criticalHitListView = new CriticalHitListView({ collection: displayedHitsCollection });
                                                criticalHitLayoutView.getRegion('criticalHitFilterRegion').show(criticalHitFilterView);
                                                criticalHitLayoutView.getRegion('criticalHitDisplayRegion').show(criticalHitListView);
                                                RealmApplication.vent.trigger('navigationEvent', 'criticalHits');
                                                ViewUtilities.currentNavSelection = 'criticalHits';
                                            },
                                            function (errorString) {
                                                console.log(errorString);
                                            }
                                        )
                                    },
                                    function (errorString) {
                                        console.log(errorString);
                                    }
                                )
                            },
                            function (errorString) {
                                console.log(errorString);
                            }
                        )
                    });
            },
            criticalHitMaintenance: function () {
                require(['views/criticalHitsMaintenance/criticalHitMaintenanceLayoutView',
                    'views/criticalHitsMaintenance/criticalHitMaintenanceTypeView',
                    'views/criticalHitsMaintenance/criticalHitMaintenanceListView',
                    'services/criticalHitWarehouse'],
                    function (CriticalHitMaintenanceLayoutView, CriticalHitMaintenanceTypeView,
                        CriticalHitMaintenanceListView, CriticalHitWarehouse) {
                        $.when(CriticalHitWarehouse.getAllTypes()).then(
                            function (criticalHitTypeCollection) {
                                var selectedType = criticalHitTypeCollection.at(0).get('id');
                                $.when(CriticalHitWarehouse.getCriticalHitsForTypeWithDefaultForAdd(selectedType)).then(
                                    function (criticalHitsForSelectedTypeCollection) {
                                        var viewParms = {
                                            criticalHitTypes: criticalHitTypeCollection,
                                            selectedType: selectedType,
                                            criticalHitsForSelectedType: criticalHitsForSelectedTypeCollection
                                        };
                                        var layoutView = new CriticalHitMaintenanceLayoutView(viewParms);
                                        RealmApplication.regions.mainRegion.show(layoutView);
                                    }
                                )
                            }
                        )

                    })
            },
            characterList: function () {
                require(['views/character/characterListView', 'views/character/characterView',
                    'views/character/characterListLayoutView', 'views/character/characterListButtonView',
                    'views/character/characterListSortView',
                    'services/characterWarehouse', 'services/playerWarehouse', 'utility/firebaseAuthUIUtilities',
                ],
                    function (CharacterListView, CharacterView, CharacterListLayoutView,
                        CharacterListButtonView, CharacterListSortView, CharacterrWarehouse, PlayerWarehouse, 
                        AuthUIUtilities) {
                        if (AuthUIUtilities.isUserLoggedIn()) {
                            var characterListLayoutView = new CharacterListLayoutView();
                            RealmApplication.regions.mainRegion.show(characterListLayoutView);
                            $.when(CharacterrWarehouse.getAllCharacters(), PlayerWarehouse.getAllPlayers()).then(
                                function (myCharacterCollection, myPlayerCollection) {
                                    // getting the players so the character list model can get them without waiting
                                    var characterListView = new CharacterListView({ collection: myCharacterCollection });
                                    var characterListSortView = new CharacterListSortView();
                                    var characterListButtonView = new CharacterListButtonView();
                                    characterListLayoutView.getRegion('characterTableSortRegion').show(characterListSortView);
                                    characterListLayoutView.getRegion('characterTableRegion').show(characterListView);
                                    characterListLayoutView.getRegion('buttonsRegion').show(characterListButtonView);
                                    ViewUtilities.currentNavSelection = 'characterList';
                                }
                            ),
                                function () {
                                    console.log('some kind of error getting characters');
                                }
                        } else {
                            ViewUtilities.resetActiveNavSelection();
                            ViewUtilities.showModalView('Required', 'You must login before you can view the list of characters');

                        }

                    });
            },
            viewCharacter: function (characterModel) {
                require(['views/character/characterView'], function (CharacterView) {
                    var characterView = new CharacterView({ model: characterModel });
                    RealmApplication.regions.mainRegion.show(characterView);
                });
            },
            itemList: function () {
                require(['views/item/itemListView', 'views/item/itemView',
                    'views/item/itemListLayoutView', 'views/item/itemListButtonView',
                    'services/itemWarehouse'],
                    function (ItemListView, ItemView, ItemListLayoutView,
                        ItemListButtonView, ItemWarehouse) {
                        var itemListLayoutView = new ItemListLayoutView();
                        RealmApplication.regions.mainRegion.show(itemListLayoutView);
                        $.when(ItemWarehouse.getAllItems()).then(
                            function (myItemCollection) {
                                var itemListView = new ItemListView({ collection: myItemCollection });
                                var itemListButtonView = new ItemListButtonView();
                                itemListLayoutView.getRegion('itemTableRegion').show(itemListView);
                                itemListLayoutView.getRegion('buttonsRegion').show(itemListButtonView);
                                ViewUtilities.currentNavSelection = 'items';
                            }
                        ),
                            function () {
                                console.log('some kind of error getting items');
                            }
                    });
            },
            viewItem: function (itemModel) {
                require(['views/item/itemView'], function (ItemView) {
                    var itemView = new ItemView({ model: itemModel });
                    RealmApplication.regions.mainRegion.show(itemView);
                });
            },
            willContestConsequenceMaintenance: function () {
                require(['views/willContestConsequenceMaintenance/willContestConsequenceMaintenanceLayoutView',
                    'services/willContestConsequenceWarehouse'],
                    function (WillContestConsequenceMaintenanceLayoutView, WillContestConsequenceWarehouse) {
                        $.when(WillContestConsequenceWarehouse.getAllWillContestConsequencesWithDefaultForAdd()).then(
                            function (willContestConsequenceCollection) {
                                var viewParms = { consequenceCollection: willContestConsequenceCollection };
                                var layoutView = new WillContestConsequenceMaintenanceLayoutView(viewParms);
                                RealmApplication.regions.mainRegion.show(layoutView);
                            }
                        )
                    })
            },
            movementManeuverMaintenance: function () {
                require([
                    'views/movementManeuverMaintenance/movementManeuverMaintenanceLayoutView',
                    'services/movementManeuverWarehouse',
                    'services/movementManeuverDifficultyWarehouse'
                ],
                    function (MovementManeuverMaintenanceLayoutView,
                        MovementManeuverWarehouse, MovementManeuverDifficultyWarehouse) {
                        $.when(MovementManeuverDifficultyWarehouse.getOrderedMovementManeuverDifficulties()).then(
                            function (orderedCollectionOfDifficulties) {
                                var selectedDifficulty = orderedCollectionOfDifficulties.at(0);
                                $.when(MovementManeuverWarehouse.getMovementManeuversForDifficultyWithDefaultForAdd(selectedDifficulty)).then(
                                    function (collectionOfManeuversWithAddForDifficult) {
                                        var layoutView = new MovementManeuverMaintenanceLayoutView(
                                            {
                                                movementManeuverDifficulties: orderedCollectionOfDifficulties,
                                                selectedDifficulty: selectedDifficulty,
                                                movementManeuversForSelectedDifficulty: collectionOfManeuversWithAddForDifficult
                                            });
                                        RealmApplication.regions.mainRegion.show(layoutView);
                                    }
                                )
                            }
                        ),
                            function () {
                                console.log('some kind of error getting movement maneuver difficulties');
                            }
                    });
            },
            movementManeuvers: function () {
                require(['views/movementManeuver/movementManeuverLayoutView',
                    'collections/movementManeuver/movementManeuverDisplayCollection',
                    'views/movementManeuver/movementManeuverListView', 'views/movementManeuver/movementManeuverFilterView',
                    'services/movementManeuverDifficultyWarehouse'
                ],
                    function (MovementManeuverLayoutView, MovementManeuverDisplayCollection, MovementManeuverListView,
                        MovementManeuverFilterView, MovementManeuverDifficultyWarehouse) {

                        var movementManeuverLayoutView = new MovementManeuverLayoutView();
                        RealmApplication.regions.mainRegion.show(movementManeuverLayoutView);
                        $.when(MovementManeuverDifficultyWarehouse.getOrderedMovementManeuverDifficulties()).then(
                            function (myMovementManeuverDifficultiesCollection) {
                                if (myMovementManeuverDifficultiesCollection && myMovementManeuverDifficultiesCollection.length > 0) {
                                    var selectedDifficulty = myMovementManeuverDifficultiesCollection.at(0);
                                    var retrievedManeuvers = new MovementManeuverDisplayCollection();
                                    var filterParms = { movementManeuverDifficulties: myMovementManeuverDifficultiesCollection, selectedDifficulty: selectedDifficulty };
                                    var movementManeuverFilterView = new MovementManeuverFilterView(filterParms);
                                    var movementManeuverListView = new MovementManeuverListView({ collection: retrievedManeuvers });
                                    movementManeuverLayoutView.getRegion('movementManeuverDisplayRegion').show(movementManeuverListView);
                                    movementManeuverLayoutView.getRegion('movementManeuverFilterRegion').show(movementManeuverFilterView);
                                    ViewUtilities.currentNavSelection = 'movementManeuvers';

                                } else {
                                    var filterParms = { movementManeuverDifficulties: myMovementManeuverDifficultiesCollection, selectedDifficulty: null };
                                    var movementManeuverFilterView = new MovementManeuverFilterView(filterParms);
                                    var movementManeuverListView = new MovementManeuverListView();
                                    movementManeuverLayoutView.getRegion('movementManeuverDisplayRegion').show(movementManeuverListView);
                                    movementManeuverLayoutView.getRegion('movementManeuverFilterRegion').show(movementManeuverFilterView);
                                    ViewUtilities.currentNavSelection = 'movementManeuvers';
                                }
                            }
                        ),
                            function () {
                                console.log('some kind of error getting movement maneuvers');
                            }

                    });
            },


        };

        return RouterController;

    });
