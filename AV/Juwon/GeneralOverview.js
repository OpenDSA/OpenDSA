$(document).ready(function() {
    var av_name = "GeneralOverview";
    var av = new JSAV(av_name);

    var GeneralOverview = av.ds.tree({nodegap: 10});
    GeneralOverview.root("1");
    GeneralOverview.layout();
    av.displayInit();
    av.recorded();
});