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
            },
            onRender : function() {
                self = this;
                var contestantOneSelectElement = this.$el.find('#contestantOneSelect');
                var contestantTwoSelectElement = this.$el.find('#contestantTwoSelect');
                contestantOneSelectElement.empty();
                contestantTwoSelectElement.empty();
                this.options.allWillContenstants.forEach(function(myContestant, key, list) {
                    var contestantOneOption = "<option value='" + myContestant.id +  "'";
                    if ((key == 0 && ! self.chosenContestantOneID) || (self.chosenContestantOneID && self.chosenContestantOneID == myContestant.id)) {
                        contestantOneOption = contestantOneOption + " selected='selected'";
                        if (! self.chosenContestantOneID) {
                            self.chosenContestantOneID = myContestant.id;
                        }
                    };
                    contestantOneOption = contestantOneOption + ">" + myContestant.name + "</option>"
                    contestantOneSelectElement.append(contestantOneOption);

                    var contestantTwoOption = "<option value='" + myContestant.id +  "'";
                    if ((key == 0 && ! self.chosenContestantTwoID) || (self.chosenContestantTwoID && self.chosenContestantTwoID == myContestant.id)) {
                        contestantTwoOption = contestantTwoOption + " selected='selected'";
                        if (! self.chosenContestantTwoID) {
                            self.chosenContestantTwoID = myContestant.id;
                        }
                    };
                    contestantTwoOption = contestantTwoOption + ">" + myContestant.name + "</option>"
                    contestantTwoSelectElement.append(contestantTwoOption);
                });
            },
            contestantOneSelected : function() {
                self = this;
                self.chosenContestantOneID = $('#contestantOneSelect option:selected').val();
                self.model.set('contestantOneID', self.chosenContestantOneID);
                RealmApplication.vent.trigger('willContestContestantOne:selected', self.chosenContestantOneID);
            },
            contestantTwoSelected : function() {
                self = this;
                self.chosenContestantTwoID = $('#contestantTwoSelect option:selected').val();
                self.model.set('contestantTwoID', self.chosenContestantTwoID);
                RealmApplication.vent.trigger('willContestContestantTwo:selected', self.chosenContestantTwoID);
            },
        });

        return WillContestContestantsView;

    });
