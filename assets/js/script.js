var DateTime = luxon.DateTime;

var auditTimeblocks = function () {
  $(".timeblock").each(function (tb) {
    var now = DateTime.now();
    var t = DateTime.fromObject({ hour: $(this).attr("id").replace("_", "") });
    if (now.hour < t.hour) {
      $(this).removeClass(["bg-past", "bg-current"]);
      $(this).addClass("bg-future");
    } else if (now.hour > t.hour) {
      $(this).removeClass(["bg-future", "bg-current"]);
      $(this).addClass("bg-past");
    } else {
      $(this).removeClass(["bg-past", "bg-future"]);
      $(this).addClass("bg-current");
    }
  });
};

setInterval(auditTimeblocks(), 1800000);
