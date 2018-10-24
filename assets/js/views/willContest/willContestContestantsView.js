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
            chosenContestantOneID : null,
            chosenContestantTwoID : null,
            allWillContenstants : null,
            initialize : function() {
                self = this;
                if (this.options.allWillContenstants) {
                    self.allWillContenstants = this.options.allWillContenstants;
                };
                if (self.model) {
                    self.chosenContestantOneID = self.model.get('contestantOneID');
                    self.chosenContestantTwoID = self.model.get('contestantTwoID');
                }
            },
            onRender : function() {
                self = this;
                var contestantOneSelectDivElement = this.$el.find('#contestantOneSelectDiv');
                var contestantOneSelectString = self.model.get('currentRoundNumber') === 0 ?
                    "<select id='contestantOneSelect' class='form-control'>" :
                    "<select id='contestantOneSelect' class='form-control' disabled>";
                var contestantTwoSelectDivElement = this.$el.find('#contestantTwoSelectDiv');
                var contestantTwoSelectString = self.model.get('currentRoundNumber') === 0 ?
                    "<select id='contestantTwoSelect' class='form-control'>" :
                    "<select id='contestantTwoSelect' class='form-control' disabled>";
                this.options.allWillContenstants.forEach(function(myContestant, key, list) {
                    var contestantOneOption = "<option value='" + myContestant.id +  "'";
                    if ((key == 0 && ! self.chosenContestantOneID) || (self.chosenContestantOneID && self.chosenContestantOneID == myContestant.id)) {
                        contestantOneOption = contestantOneOption + " selected='selected'";
                        if (! self.chosenContestantOneID) {
                            self.chosenContestantOneID = myContestant.id;
                        }
                    };
                    contestantOneOption = contestantOneOption + ">" + myContestant.name + "</option>"
                    contestantOneSelectString = contestantOneSelectString + contestantOneOption;

                    var contestantTwoOption = "<option value='" + myContestant.id +  "'";
                    if ((key == 0 && ! self.chosenContestantTwoID) || (self.chosenContestantTwoID && self.chosenContestantTwoID == myContestant.id)) {
                        contestantTwoOption = contestantTwoOption + " selected='selected'";
                        if (! self.chosenContestantTwoID) {
                            self.chosenContestantTwoID = myContestant.id;
                        }
                    };
                    contestantTwoOption = contestantTwoOption + ">" + myContestant.name + "</option>"
                    contestantTwoSelectString = contestantTwoSelectString + contestantTwoOption;
                });
                contestantOneSelectString = contestantOneSelectString + "</select>";
                contestantOneSelectDivElement.append(contestantOneSelectString);
                contestantTwoSelectString = contestantTwoSelectString + "</select>";
                contestantTwoSelectDivElement.append(contestantTwoSelectString);

            },
            contestantOneSelected : function() {
                self = this;
                self.chosenContestantOneID = $('#contestantOneSelect option:selected').val();
                self.model.set('contestantOneID', self.chosenContestantOneID);
                self.model.set('contestantOneName', $('#contestantOneSelect option:selected').text());
                RealmApplication.vent.trigger('willContestContestantOne:selected', self.chosenContestantOneID);
            },
            contestantTwoSelected : function() {
                self = this;
                self.chosenContestantTwoID = $('#contestantTwoSelect option:selected').val();
                self.model.set('contestantTwoID', self.chosenContestantTwoID);
                self.model.set('contestantTwoName', $('#contestantTwoSelect option:selected').text());
                RealmApplication.vent.trigger('willContestContestantTwo:selected', self.chosenContestantTwoID);
            },
        });

        return WillContestContestantsView;

    });
