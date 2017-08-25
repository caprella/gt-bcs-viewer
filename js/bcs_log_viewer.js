$(document).ready(function() {
    // Switching between basic and advanced filters
    var advancedFilters = $("#filter-advanced"),
        moreFilters =  $("#more-filters"),
        lessFilters =  $("#less-filters");

    moreFilters.click(function() {
        advancedFilters.show();
        moreFilters.hide();
        lessFilters.show();
        return false;
    });
    lessFilters.click(function() {
        advancedFilters.hide();
        moreFilters.show();
        lessFilters.hide();
        return false;
    });

    // Range slider
    $("#range_input").slider({
        range: true,
        min: 0,
        max: 100,
        values: [ 7, 75 ],
        slide: function( event, ui ) {
            $(".form-range__min").text(ui.values[0]);
            $(".form-range__max").text(ui.values[1]);
        },
        classes: {
            "ui-slider": "form-range__track",
            "ui-slider-handle": "form-range__thumb",
            "ui-slider-range": "form-range__value"
        }
    });

    $(".form-range__min").text($("#range_input").slider("values", 0));
    $(".form-range__max").text($("#range_input").slider("values", 1));

    // Datepicker(s)
    doDatepicker();

    // Time fields
    $(".js-time-mask").mask("H0:t0:t0", {
        translation: {
            H: {
                pattern: /[0-2]/
            },
            t: {
                pattern: /[0-5]/
            }
        },
        placeholder: "00:00:00",
        fallback: ":"
    });

});

function doDatepicker() {

    var dateFormat = "d M yy",
        options = {
            dateFormat: "d M yy",
            defaultDate: "+1w",
            changeMonth: false,
            numberOfMonths: 1,
            showButtonPanel: true,
            dayNamesMin: ["S", "M", "T", "W", "T", "F", "S"]
        },
        from = $( "#datepicker__from" )
            .datepicker(options)
            .on( "change", function() {
                to.datepicker( "option", "minDate", getDate( this ) );
            }),
        to = $( "#datepicker__to" ).datepicker(options)
            .on( "change", function() {
                from.datepicker( "option", "maxDate", getDate( this ) );
            });

    function getDate( element ) {
        var date;
        try {
            date = $.datepicker.parseDate( dateFormat, element.value );
        } catch( error ) {
            date = null;
        }

        return date;
    }
}