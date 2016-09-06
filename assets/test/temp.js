define(function(require) {
    var models = require('domain');

    describe('Domain', function() {

        describe('Die', function() {
            it('should default "urlRoot" property to "/api/samples"', function() {
                var sample = new domain/dieSample();
                sample.urlRoot.should.equal('/api/samples');
            });
        });

    });

});