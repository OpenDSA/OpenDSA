
var Social = {

    init: function(jelContainer) {
        /*--We're using a custom Twitter button, this code enables a popup--*/
        $(".twitterShare", jelContainer).click(function(event) {
            var width = 550,
                height = 370,
                left = ($(window).width() - width) / 2,
                top = ($(window).height() - height) / 2,
                url = this.href,
                opts = "status=1" +
                    ",width=" + width +
                    ",height=" + height +
                    ",top=" + top +
                    ",left=" + left;
            window.open(url, "twitter", opts);
            return false;
        });

        $(".sharepop", jelContainer).hide();

        $(".notif-share", jelContainer).click(function() {
            $(this).next(".sharepop").toggle("drop", {direction: "up"},"fast");
            return false;
        });

    },

    facebookBadge: function(desc, icon, ext, activity) {

        FB.ui({
            method: "feed",
            name: "I just earned the " + desc + " badge" + (activity ? " in " + activity : "") + " at Khan Academy!",
            link: "http://www.khanacademy.org",
            picture: (icon.substring(0, 7) === "http://" ? icon : "http://www.khanacademy.org/" + icon),
            caption: "www.khanacademy.org",
            description: "You can earn this too if you " + ext
        });
        return false;

    },
    facebookVideo: function(name, desc, url) {

        FB.ui({
            method: "feed",
            name: name,
            link: "http://www.khanacademy.org/" + url,
            picture: "http://www.khanacademy.org/images/handtreehorizontal_facebook.png",
            caption: "www.khanacademy.org",
            description: desc,
            message: "I just learned about " + name + " on Khan Academy"
        });
        return false;

    },

    facebookExercise: function(amount, plural, prof, exer) {

        FB.ui({
            method: "feed",
            name: amount + " question" + plural + " answered!",
            link: "http://www.khanacademy.org/exercisedashboard",
            picture: "http://www.khanacademy.org/images/proficient-badge-complete.png",
            caption: "www.khanacademy.org",
            description: "I just answered " + amount + " question" + plural + " " + prof + " " + exer + " on www.khanacademy.org" ,
            message: "I\'ve been practicing " + exer + " on http://www.khanacademy.org"
        });
        return false;

    }
};

$(function() {Social.init();});
