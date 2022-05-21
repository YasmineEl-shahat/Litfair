import $ from "jquery";

var Days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // index => month [0-11]

export const birth = () => {
  var option = '<option value="day">day</option>';
  var selectedDay = "day";
  for (var i = 1; i <= Days[0]; i++) {
    //add option days
    option += '<option value="' + i + '">' + i + "</option>";
  }
  $("#day").append(option);
  $("#day").val(selectedDay);

  var option = '<option value="month">month</option>';
  var selectedMon = "month";
  for (var i = 1; i <= 12; i++) {
    option += '<option value="' + i + '">' + i + "</option>";
  }
  $("#month").append(option);
  $("#month").val(selectedMon);

  var option = '<option value="month">month</option>';
  var selectedMon = "month";
  for (var i = 1; i <= 12; i++) {
    option += '<option value="' + i + '">' + i + "</option>";
  }
  $("#month2").append(option);
  $("#month2").val(selectedMon);

  var d = new Date();
  var option = '<option value="year">year</option>';
  var selectedYear = "year";
  for (var i = d.getFullYear() - 10; i >= 1930; i--) {
    // years start i
    option += '<option value="' + i + '">' + i + "</option>";
  }
  $("#year").append(option);
  $("#year").val(selectedYear);
};

function isLeapYear(year) {
  year = parseInt(year);
  if (year % 4 != 0) {
    return false;
  } else if (year % 400 == 0) {
    return true;
  } else if (year % 100 == 0) {
    return false;
  } else {
    return true;
  }
}
export const change_year = (select) => {
  if (typeof window !== "undefined") {
    if (isLeapYear($(select).val())) {
      Days[1] = 29;
    } else {
      Days[1] = 28;
    }
    if ($("#month").val() == 2) {
      var day = $("#day");
      var val = $(day).val();
      $(day).empty();
      var option = '<option value="day">day</option>';
      for (var i = 1; i <= Days[1]; i++) {
        //add option days
        option += '<option value="' + i + '">' + i + "</option>";
      }
      $(day).append(option);
      if (val > Days[month]) {
        val = 1;
      }
      $(day).val(val);
    }
  }
};

export const change_month = (select) => {
  if (typeof window !== "undefined") {
    var day = $("#day");
    var val = $(day).val();
    $(day).empty();
    var option = '<option value="day">day</option>';
    var month = parseInt($(select).val()) - 1;
    for (var i = 1; i <= Days[month]; i++) {
      //add option days
      option += '<option value="' + i + '">' + i + "</option>";
    }
    $(day).append(option);
    if (val > Days[month]) {
      val = 1;
    }
    $(day).val(val);
  }
};
