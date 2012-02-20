_.mixin({
    // like groupBy, but assumes there is a unique key for each element.
    indexBy: function(sequence, keyExtractor) {
        var keyExtractorFn = null;
        if (typeof keyExtractor == "string")
            keyExtractorFn = function(el) {return el[keyExtractor];};
        else
            keyExtractorFn = keyExtractor;

        return _.reduce(sequence, function(m, el) {
            m[keyExtractorFn(el)] = el;
            return m;
        }, {});
    }
});
