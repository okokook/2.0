define(function  (require,exports,module) {
    var jQuery = require('jquery');

    (function($){
    $.extend({
    ms_DatePicker: function (options) {
                var defaults = {
                    YearSelector: "#sel_year",
                    MonthSelector: "#sel_month",
                    DaySelector: "#sel_day",
                    FirstText: "--",
                };
                var opts = $.extend({}, defaults, options);
                var $YearSelector = $(opts.YearSelector);
                var $MonthSelector = $(opts.MonthSelector);
                var $DaySelector = $(opts.DaySelector);
                var FirstText = opts.FirstText;
                var year =  $YearSelector.data('num')||FirstText;
                var month = $MonthSelector.data('num')||FirstText ;
                var day =  $DaySelector.data('num')||FirstText ;
                var FirstValue = opts.FirstValue;

                // 初始化
                var str1 = "<option value=\"" +year + "\">" + year + "</option>";
                var str2 = "<option value=\"" +month+ "\">" +month+ "</option>";
                var str3 = "<option value=\"" +day+ "\">" + day + "</option>";
                $YearSelector.html(str1);
                $MonthSelector.html(str2);
                $DaySelector.html(str3);

                // 年份列表
                var yearNow = new Date().getFullYear();
                for (var i = yearNow; i >= 1900; i--) {
                    var yearStr = "<option value=\"" + i + "\">" + i + "</option>";
                    $YearSelector.append(yearStr);
                }

                // 月份列表
                for (var i = 1; i <= 12; i++) {
                    var monthStr = "<option value=\"" + i + "\">" + i + "</option>";
                    $MonthSelector.append(monthStr);
                }

                // 日列表(仅当选择了年月)
                function BuildDay() {
                    if ($YearSelector.val() == 0 || $MonthSelector.val() == 0) {
                        // 未选择年份或者月份
                        $DaySelector.html(str3);
                    } else {
                        $DaySelector.html(str3);
                        var year = parseInt($YearSelector.val());
                        var month = parseInt($MonthSelector.val());
                        var dayCount = 0;
                        switch (month) {
                            case 1:
                            case 3:
                            case 5:
                            case 7:
                            case 8:
                            case 10:
                            case 12:
                                dayCount = 31;
                                break;
                            case 4:
                            case 6:
                            case 9:
                            case 11:
                                dayCount = 30;
                                break;
                            case 2:
                                dayCount = 28;
                                if ((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) {
                                    dayCount = 29;
                                }
                                break;
                            default:
                                break;
                        }

                        for (var i = 1; i <= dayCount; i++) {
                            var dayStr = "<option value=\"" + i + "\">" + i + "</option>";
                            $DaySelector.append(dayStr);
                        }
                    }
                }
                $MonthSelector.change(function () {
                    BuildDay();
                });
                $YearSelector.change(function () {
                    BuildDay();
                });
            } 
    });
    })(jQuery);
})














