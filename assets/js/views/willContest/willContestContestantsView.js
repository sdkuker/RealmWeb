define(['marionette',
        'backbone',
        'realmApplication',
        'models/willContest/willContestModel',
        'tpl!templates/willContest/willContestContestantsTemplate.tpl'],
    function (Marionette, Backbone, RealmApplication, WillContestModel,
              WillContestContestantTemplate) {

        var WillContestContestantsView = Marionette.ItemView.extend({
            template: WillContestContestantTemplate,
            events : {
                'change #contestantOneSelect' : 'contestantOneSelected',
                'change #contestantTwoSelect' : 'contestantTwoSelected'
            },
            model: WillContestModel,
            chosenContestantOne : null,
            chosenContestantTwo : null,
            allWillContenstants : null,
            initialize : function() {
                self = this;
                if (this.options.allWillContenstants) {
                    self.allWillContenstants = this.options.allWillContenstants;
                };
            },
            onRender : function() {
                self = this;
                var contestantOneSelectElement = this.$el.find('#contestantOneSelect');
                var contestantTwoSelectElement = this.$el.find('#contestantTwoSelect');
                contestantOneSelectElement.empty();
                contestantTwoSelectElement.empty();
                this.options.allWillContenstants.forEach(function(myContestant, key, list) {
                    var contestantOneOption = "<option value='" + myContestant.id +  "'";
                    if ((key == 0 && ! self.chosenContestantOne) || (self.chosenContestantOne && self.chosenContestantOne == myContestant.id)) {
                        contestantOneOption = contestantOneOption + " selected='selected'";
                        if (! self.chosenContestantOne) {
                            self.chosenContestantOne = myContestant.id;
                        }
                    };
                    contestantOneOption = contestantOneOption + ">" + myContestant.name + "</option>"
                    contestantOneSelectElement.append(contestantOneOption);

                    var contestantTwoOption = "<option value='" + myContestant.id +  "'";
                    if ((key == 0 && ! self.chosenContestantTwo) || (self.chosenContestantTwo && self.chosenContestantTwo == myContestant.id)) {
                        contestantTwoOption = contestantTwoOption + " selected='selected'";
                        if (! self.chosenContestantTwo) {
                            self.chosenContestantTwo = myContestant.id;
                        }
                    };
                    contestantTwoOption = contestantTwoOption + ">" + myContestant.name + "</option>"
                    contestantTwoSelectElement.append(contestantTwoOption);
                });
            },
            contestantOneSelected : function() {
                self = this;
                self.chosenContestantOne = $('#contestantOneSelect option:selected').val();
            },
            contestantTwoSelected : function() {
                self = this;
                self.chosenContestantTwo = $('#contestantTwoSelect option:selected').val();
            },
        });

        return WillContestContestantsView;

    });
