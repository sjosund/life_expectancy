$(function (){
    var age = $("#age");
    var smoke = $("#smoke");
    var res = $("#res");
    var exercise = $('#exercise');
    var driving = $('#driving')
    var data;
    var p_table = JSON.parse('{"M":{"0":0.006569,"1":0.000444,"2":0.000291,"3":0.000226,"4":0.000173,"5":0.000158,"6":0.000147,"7":0.000136,"8":0.000121,"9":0.000104,"10":0.000092,"11":0.000097,"12":0.000134,"13":0.00021,"14":0.000317,"15":0.000433,"16":0.000547,"17":0.000672,"18":0.000805,"19":0.000941,"20":0.001084,"21":0.001219,"22":0.001314,"23":0.001357,"24":0.001362,"25":0.001353,"26":0.00135,"27":0.001353,"28":0.001371,"29":0.001399,"30":0.001432,"31":0.001464,"32":0.001497,"33":0.00153,"34":0.001568,"35":0.001617,"36":0.001682,"37":0.001759,"38":0.001852,"39":0.001963,"40":0.002092,"41":0.002246,"42":0.002436,"43":0.002669,"44":0.002942,"45":0.003244,"46":0.003571,"47":0.003926,"48":0.004309,"49":0.004719,"50":0.005156,"51":0.005622,"52":0.006121,"53":0.006656,"54":0.007222,"55":0.007844,"56":0.008493,"57":0.009116,"58":0.00969,"59":0.010253,"60":0.010872,"61":0.011591,"62":0.012403,"63":0.013325,"64":0.01437,"65":0.015553,"66":0.016878,"67":0.018348,"68":0.019969,"69":0.021766,"70":0.02384,"71":0.026162,"72":0.028625,"73":0.031204,"74":0.033997,"75":0.0372,"76":0.040898,"77":0.04504,"78":0.049664,"79":0.054844,"80":0.060801,"81":0.067509,"82":0.074779,"83":0.082589,"84":0.091135,"85":0.10068,"86":0.111444,"87":0.123571,"88":0.137126,"89":0.152092,"90":0.168426,"91":0.186063,"92":0.204925,"93":0.224931,"94":0.245995,"95":0.266884,"96":0.287218,"97":0.306593,"98":0.324599,"99":0.340829,"100":0.35787,"101":0.375764,"102":0.394552,"103":0.41428,"104":0.434993,"105":0.456743,"106":0.47958,"107":0.503559,"108":0.528737,"109":0.555174,"110":0.582933,"111":0.61208,"112":0.642683,"113":0.674818,"114":0.708559,"115":0.743986,"116":0.781186,"117":0.820245,"118":0.861257,"119":0.90432},"F":{"0":0.005513,"1":0.000382,"2":0.000218,"3":0.000166,"4":0.000143,"5":0.000127,"6":0.000116,"7":0.000106,"8":0.000098,"9":0.000091,"10":0.000086,"11":0.000089,"12":0.000102,"13":0.000128,"14":0.000164,"15":0.000205,"16":0.000246,"17":0.000285,"18":0.000319,"19":0.00035,"20":0.000383,"21":0.000417,"22":0.000446,"23":0.000469,"24":0.000487,"25":0.000505,"26":0.000525,"27":0.000551,"28":0.000585,"29":0.000626,"30":0.000672,"31":0.00072,"32":0.000766,"33":0.000806,"34":0.000846,"35":0.000891,"36":0.000946,"37":0.001013,"38":0.001094,"39":0.00119,"40":0.001296,"41":0.001413,"42":0.001549,"43":0.001706,"44":0.001881,"45":0.002069,"46":0.00227,"47":0.002486,"48":0.002716,"49":0.00296,"50":0.003226,"51":0.003505,"52":0.003779,"53":0.00404,"54":0.004301,"55":0.004592,"56":0.00492,"57":0.005266,"58":0.00563,"59":0.006028,"60":0.006479,"61":0.007001,"62":0.007602,"63":0.008294,"64":0.009082,"65":0.00999,"66":0.011005,"67":0.012097,"68":0.013261,"69":0.014529,"70":0.015991,"71":0.017662,"72":0.019486,"73":0.021467,"74":0.023658,"75":0.026223,"76":0.029159,"77":0.032331,"78":0.035725,"79":0.039469,"80":0.043828,"81":0.048896,"82":0.054577,"83":0.060909,"84":0.068019,"85":0.076054,"86":0.085148,"87":0.095395,"88":0.106857,"89":0.119557,"90":0.133502,"91":0.148685,"92":0.165088,"93":0.182685,"94":0.201442,"95":0.220406,"96":0.239273,"97":0.257714,"98":0.275376,"99":0.291899,"100":0.309413,"101":0.327978,"102":0.347656,"103":0.368516,"104":0.390627,"105":0.414064,"106":0.438908,"107":0.465243,"108":0.493157,"109":0.522747,"110":0.554111,"111":0.587358,"112":0.622599,"113":0.659955,"114":0.699553,"115":0.741526,"116":0.781186,"117":0.820245,"118":0.861257,"119":0.90432}}');

    $('.make-next-visible').click(function (){
        var next = $(this).closest('header').next()
        if(next)
            next.removeClass('not-visible');
    });

    $("#calculate").click(function () {
        var current_age = +age.val();
        var cigarettes_per_day = +smoke.val();
        var exercise_hours_per_week = +exercise.val();
        var kilometers_driving_per_week = +driving.val();


        if (isNaN(current_age) || isNaN(cigarettes_per_day) || isNaN(exercise_hours_per_week) || isNaN(kilometers_driving_per_week)) {
            res.html("Start over and fill everything in correctly.");
        } else {
            var non_personalized_expected_left_to_live = expectancy(current_age);
            var effect_due_to_smoking = cigarette_effect(cigarettes_per_day);
            var effect_due_to_exercise = exercise_effect(exercise_hours_per_week);
            var effect_due_to_driving = driving_effect(kilometers_driving_per_week);
            var expected_years_left_to_live = non_personalized_expected_left_to_live * (
                1 + effect_due_to_smoking + effect_due_to_exercise + effect_due_to_driving
            );
            expected_left_to_live = Math.max(
                expected_years_left_to_live, 0
            );
            res.html(
                "You have approximately " + parseInt(expected_left_to_live) + " years left to live. <br><br><a href='http://www.aldrandefonden.se/' id='af_link'> Want to change that?</a>"
            );
        }
        $('.footer').removeClass('not-visible');
    });

    function p_value(age_) {
        var gender = $('.gender_button.active').val()
        if (age_ in p_table[gender]) {
            return p_table[gender][age_];
        }
    }

    function expectancy(age_) {
        var l = [];
        var L = [];
        var T = 0;
        l.push(1);
        for (var i = age_ + 1; i <= 119; i++) {
            var qx_1 = p_value(i - 1);
            var qx = p_value(i);
            var lx = l[l.length - 1] * (1 - qx_1);
            var dx = lx * qx;
            l.push(lx);
            var Lx = lx - 0.5 * dx;
            L.push(Lx);
            T += Lx;
        }
        return T
    }

    function cigarette_effect(cigarettes_per_day) {
        decrease_per_year_in_days = - cigarettes_per_day * 12 * (1/60) * (1/24);
        return decrease_per_year_in_days;
    };

    function driving_effect(kilometers_driving_per_week) {
        return (0.62 * kilometers_driving_per_week) * 52 / 1000 * (-0.00365);
    }

    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    function exercise_effect(exercise_hours_per_week) {
        var cap = 2 * 7;
        var yearly_increase_per_year = Math.max(0, Math.min(exercise_hours_per_week, cap))   * 4 / 365;
        return yearly_increase_per_year
    }

    $('.gender_button').click(function () {
        $(this).siblings().removeClass('active');
    })
});
