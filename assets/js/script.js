var DateTime = luxon.DateTime;

var timeblocks = [
  {
    id: "_9",
    text: "",
  },
  {
    id: "_10",
    text: "",
  },
  {
    id: "_11",
    text: "",
  },
  {
    id: "_12",
    text: "",
  },
  {
    id: "_13",
    text: "",
  },
  {
    id: "_14",
    text: "",
  },
  {
    id: "_15",
    text: "",
  },
  {
    id: "_16",
    text: "",
  },
  {
    id: "_17",
    text: "",
  },
];

$(".save-btn").click(function (event) {
  var timeblockText = $(this).prev().children().val();
  var timeblockId = $(this).prev().attr("id");
  var timeblockObj = {
    id: timeblockId,
    text: timeblockText,
  };

  timeblocks.forEach((tb) => {
    if (tb.id === timeblockObj.id) {
      tb.text = timeblockObj.text;
    }
  });
  saveData();
});

var saveData = function () {
  localStorage.setItem("timeblocks", JSON.stringify(timeblocks));
};

var loadData = function () {
  var savedData = JSON.parse(localStorage.getItem("timeblocks"));
  if (savedData === null) {
    return false;
  }
  timeblocks = savedData;
  savedData.forEach((tb) => {
    $(`#${tb.id}`).children().val(tb.text);
  });
};

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

$("#today").text(
  DateTime.now().toLocaleString({
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  })
);

loadData();
setInterval(auditTimeblocks(), 1800000);
