describe("The slide deck class", function() {

    beforeEach(function() {
        var test_dom = document.createElement('div');
        test_dom.setAttribute('id', 'test_slides');
        test_dom.innerHTML = '<slide></slide><slide></slide>';
        document.body.appendChild(test_dom);
    });

    it("should find all matching slides in the container.", function() {
        deck = new SlideDeck(document.querySelector('#test_slides'));
        expect(deck.slides.length).toBe(2);
    });

    describe("with hidden slides", function() {

        beforeEach(function() {
            var test_dom = document.createElement('div');
            test_dom.setAttribute('id', 'test_slides_with_hidden');
            test_dom.innerHTML = '<slide></slide><slide></slide><slide class="hidden"></slide>';
            document.body.appendChild(test_dom);
        });

        it("should exclude hidden slides", function() {
            deck = new SlideDeck(document.querySelector('#test_slides_with_hidden'));
            expect(document.querySelectorAll("#test_slides_with_hidden > slide").length)
                .toBe(3);
            expect(deck.slides.length).toBe(2);
        });
    });

});

describe("build-item classes", function() {

    var deck;

    beforeEach(function() {

        var test_dom = document.createElement('div');
        test_dom.setAttribute('id', 'test_build_item');
        test_dom.innerHTML = [
            '<slide>',
            '  <h1 class="build-item-1">H1</h1>',
            '  <p class="build-item-2">First paragraph</p>',
            '  <p class="build-item-2">Second paragraph</p>',
            '  <p class="build-item-3">Third paragraph</p>',
            '</slide>',
        ].join('\n');
        document.body.appendChild(test_dom);

        deck = new SlideDeck(document.querySelector("#test_build_item"));
    });

    it("should mark build-item-* as to-build", function() {

        var build_items = deck.container.querySelectorAll("[class*='build-item']");

        // sanity check
        expect(build_items.length).toBe(4);

        // expect that to-build was added to each
        for (var j = 0, item; item = build_items[j]; ++j) {
            expect(item.classList.contains('to-build')).toBe(true);
        }

    });

    it("should add the build class to the item's parent node", function() {

        var build_items = deck.container.querySelectorAll("[class*='build-item']");

        // sanity check
        expect(build_items.length).toBe(4);

        // expect that to-build was added to each
        for (var j = 0, item; item = build_items[j]; ++j) {
            expect(item.parentNode.classList.contains('build')).toBe(true);
        }

    });

    it("should show the first build-item on buildNext", function() {

        var build_item_1 = deck.container.querySelector('.build-item-1');

        expect(build_item_1.classList.contains('to-build')).toBeTruthy();
        deck.buildNextItem_();
        expect(build_item_1.classList.contains('to-build')).toBeFalsy();

    });

    it("should show items with the same index at the same time", function() {

        var build_item_2 = deck.container.querySelectorAll('.build-item-2');

        deck.buildNextItem_();
        deck.buildNextItem_();

        for (var j=0, item; item = build_item_2[j]; ++j) {
            expect(item.classList.contains('to-build')).toBeFalsy();
        }
    });

});

describe("mixed build-item classes and 'classic' build", function() {

    var deck;

    beforeEach(function() {

       var test_dom = document.createElement('div');
        test_dom.setAttribute('id', 'test_mixed_build_item_and_build');
        test_dom.innerHTML = [
            '<slide>',
            '<ul class="build">',
            '  <li>Uno</li>',
            '  <li>Dos</li>',
            '</ul>',
            '  <p class="build-item-2">First paragraph</p>',
            '  <p class="build-item-2">Second paragraph</p>',
            '  <p class="build-item-3">Third paragraph</p>',
            '</slide>',
        ].join('\n');
        document.body.appendChild(test_dom);


        deck = new SlideDeck(
            document.querySelector("#test_mixed_build_item_and_build")
        );
    });

    it("should build build-items first", function() {

        list = deck.container.querySelector('ul');
        items = list.querySelectorAll('li');
        for (var j=0, item; item = items[j]; ++j) {
            expect(item.classList.contains('to-build')).toBeTruthy();
        }

        deck.buildNextItem_();
        deck.buildNextItem_();

        for (var j=0, item; item = items[j]; ++j) {
            expect(item.classList.contains('to-build')).toBeTruthy();
        }

    });

});

describe("build-item-*-only classes", function() {

    var deck;

    beforeEach(function() {

       var test_dom = document.createElement('div');
        test_dom.setAttribute('id', 'test_build_item_only');
        test_dom.innerHTML = [
            '<slide>',
            '  <p class="build-item-1-only">First paragraph</p>',
            '  <p class="build-item-2">Second paragraph</p>',
            '  <p class="build-item-3">Third paragraph</p>',
            '</slide>',
        ].join('\n');
        document.body.appendChild(test_dom);


        deck = new SlideDeck(
            document.querySelector("#test_build_item_only")
        );
    });

    it("should hide build-item-onlies after their index passes.", function() {

        var build_item_1 = deck.container.querySelector('.build-item-1-only');

        // build-item-1 starts out as to-build
        expect(build_item_1.classList.contains('to-build')).toBeTruthy();

        // and then is built
        deck.buildNextItem_();
        expect(build_item_1.classList.contains('build-current')).toBeTruthy();

        // and then is hidden again
        deck.buildNextItem_();
        expect(build_item_1.classList.contains('build-hide')).toBeTruthy();

    });

});

describe("build-item-*-class-* classes", function() {

    var deck;

    beforeEach(function() {

       var test_dom = document.createElement('div');
        test_dom.setAttribute('id', 'test_build_item_class');
        test_dom.innerHTML = [
            '<slide>',
            '  <p class="build-item-1-class-hll">First paragraph</p>',
            '  <p class="build-item-2-class-hll-only">Second paragraph</p>',
            '  <p class="build-item-3">Third paragraph</p>',
            '</slide>',
        ].join('\n');
        document.body.appendChild(test_dom);


        deck = new SlideDeck(
            document.querySelector("#test_build_item_class")
        );
    });

    it("should add the specified class when showing an item.", function() {

        var build_item_1 = deck.container.querySelector('.to-build');

        // build-item-1 starts out as to-build, without hll
        expect(build_item_1.classList.contains('to-build')).toBeTruthy();
        expect(build_item_1.classList.contains('hll')).toBeFalsy();

        // and then is built
        deck.buildNextItem_();
        expect(build_item_1.classList.contains('to-build')).toBeFalsy();
        expect(build_item_1.classList.contains('hll')).toBeTruthy();

    });

    it("should remove the specified class when only is specified.", function() {

        var build_item_2 = deck.container.querySelectorAll('.to-build')[1];
        deck.buildNextItem_();

        // build-item-2 starts out as to-build, without hll
        expect(build_item_2.classList.contains('to-build')).toBeTruthy();
        expect(build_item_2.classList.contains('hll')).toBeFalsy();

        // and then is built
        deck.buildNextItem_();
        expect(build_item_2.classList.contains('to-build')).toBeFalsy();
        expect(build_item_2.classList.contains('hll')).toBeTruthy();

        // and then the class is removed
        deck.buildNextItem_();
        expect(build_item_2.classList.contains('to-build')).toBeFalsy();
        expect(build_item_2.classList.contains('hll')).toBeFalsy();

    });


});
