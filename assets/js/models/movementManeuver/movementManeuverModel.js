define(['backbone'],
    function (Backbone) {

        var MovementManeuvereModel = Backbone.Model.extend({
            defaults: {
                minimumRollValue : 0,
                maximumRollValue : 0,
                trivialManeuverResult : '',
                routineManeuverResult : '',
                easyManeuverResult : '',
                lightManeuverResult : '',
                mediumManeuverResult : '',
                hardManeuverResult : '',
                veryHardManeuverResult : '',
                extremelyHardManeuverResult : '',
                sheerFollyManeuverResult : '',
                absurdManeuverResult : '',
                insaneManeuverResult : '',
                phenomenalManeuverResult : '',
                virtuallyImpossibleManeuverResult : ''
            },
            getTrivialManeuverResult: function() {
                return decodeURI(this.get('trivialManeuverResult'));
            },
            setTrivialManeuverResult: function(aValue) {
                return this.set('trivialManeuverResult', encodeURI(aValue));
            },
            getRoutineManeuverResult: function() {
                return decodeURI(this.get('routineManeuverResult'));
            },
            setRoutineManeuverResult: function(aValue) {
                return this.set('routineManeuverResult', encodeURI(aValue));
            },
            getEasyManeuverResult: function() {
                return decodeURI(this.get('easyManeuverResult'));
            },
            setEasyManeuverResult: function(aValue) {
                return this.set('easyManeuverResult', encodeURI(aValue));
            },
            getLightManeuverResult: function() {
                return decodeURI(this.get('lightManeuverResult'));
            },
            setLightManeuverResult: function(aValue) {
                return this.set('lightManeuverResult', encodeURI(aValue));
            },
            getMediumManeuverResult: function() {
                return decodeURI(this.get('mediumManeuverResult'));
            },
            setMediumManeuverResult: function(aValue) {
                return this.set('mediumManeuverResult', encodeURI(aValue));
            },
            getHardManeuverResult: function() {
                return decodeURI(this.get('hardManeuverResult'));
            },
            setHardManeuverResult: function(aValue) {
                return this.set('hardManeuverResult', encodeURI(aValue));
            },
            getVeryHardManeuverResult: function() {
                return decodeURI(this.get('veryHardManeuverResult'));
            },
            setVeryHardManeuverResult: function(aValue) {
                return this.set('veryHardManeuverResult', encodeURI(aValue));
            },
            getExtremelyHardManeuverResult: function() {
                return decodeURI(this.get('extremelyHardManeuverResult'));
            },
            setExtremelyHardManeuverResult: function(aValue) {
                return this.set('extremelyHardManeuverResult', encodeURI(aValue));
            },
            getSheerFollyManeuverResult: function() {
                return decodeURI(this.get('sheerFollyManeuverResult'));
            },
            setSheerFollyManeuverResult: function(aValue) {
                return this.set('sheerFollyManeuverResult', encodeURI(aValue));
            },
            getAbsurdManeuverResult: function() {
                return decodeURI(this.get('absurdManeuverResult'));
            },
            setAbsurdManeuverResult: function(aValue) {
                return this.set('absurdManeuverResult', encodeURI(aValue));
            },
            getInsaneManeuverResult: function() {
                return decodeURI(this.get('insaneManeuverResult'));
            },
            setInsaneManeuverResult: function(aValue) {
                return this.set('insaneManeuverResult', encodeURI(aValue));
            },
            getPhenomenalManeuverResult: function() {
                return decodeURI(this.get('phenomenalManeuverResult'));
            },
            setPhenomenalManeuverResult: function(aValue) {
                return this.set('phenomenalManeuverResult', encodeURI(aValue));
            },
            getVirtuallyImpossibleManeuverResult: function() {
                return decodeURI(this.get('virtuallyImpossibleManeuverResult'));
            },
            setVirtuallyImpossibleManeuverResult: function(aValue) {
                return this.set('virtuallyImpossibleManeuverResult', encodeURI(aValue));
            }
        });

        return MovementManeuvereModel;

    });
