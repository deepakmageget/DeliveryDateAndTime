define([
    'jquery',
    'ko',
    'uiComponent',
    'Magento_Ui/js/form/element/abstract',
    'mage/calendar'
], function ($, ko, Component) {
    'use strict';
   
    var active = window.checkoutConfig.shipping.delivery_date.active;
       if(active == 1){
    return Component.extend({
        
        defaults: {
            template: 'SR_DeliveryDate/delivery-date-block'
        },

        initialize: function () {
            this._super();
            var disabled = window.checkoutConfig.shipping.delivery_date.disabled;
            var noday = window.checkoutConfig.shipping.delivery_date.noday;
            var hourMin = parseInt(window.checkoutConfig.shipping.delivery_date.hourMin);
            var hourMax = parseInt(window.checkoutConfig.shipping.delivery_date.hourMax);
            var format = window.checkoutConfig.shipping.delivery_date.format;
            var date = new Date();
            if(!format) {
                format = 'yy-mm-dd';
            }
            var disabledDay = disabled.split(",").map(function(item) {
                return parseInt(item, 10);
            });

            ko.bindingHandlers.datepicker = {
                init: function (element, valueAccessor, allBindingsAccessor) {
                  
                        var $el = $(element);
                  
                //    console.log($el);
                    //initialize datepicker
                    if(noday) {
                        var options = {
                            showsTime: false,
                            dateFormat:format,
                            hourMin: hourMin,
                            hourMax: hourMax,
                            minDate: '+1d',
                            maxDate: '+7d'
                           
                        };
                    } else {
                        var options = {
                            showsTime: false,
                            dateFormat:format,
                            hourMin: hourMin,
                            hourMax: hourMax,
                            minDate: '+1d',
                            maxDate: '+7d',
                            beforeShowDay: function(date) {
                                var day = date.getDay();
                                alert(day);
                                if(disabledDay.indexOf(day) > -1) {
                                    return [false];
                                } else {
                                    return [true];
                                }
                            }
                        };
                    }

                    $el.datepicker(options);

                    var writable = valueAccessor();
                    if (!ko.isObservable(writable)) {
                        var propWriters = allBindingsAccessor()._ko_property_writers;
                        if (propWriters && propWriters.datepicker) {
                            writable = propWriters.datepicker;
                        } else {
                            return;
                        }
                    }
                    writable($(element).datepicker("getDate"));
                },
                // update: function (element, valueAccessor) {
                //     var widget = $(element).data("datepicker");
               
                //     if (widget) {
                //         var date = ko.utils.unwrapObservable(valueAccessor());
                //         widget.date(date);
                //     }
                // }
                
            };

            return this;
        }

        
    });

}else{
    return Component.extend({
      
    });
}
    
});
