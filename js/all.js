"use strict";

var data = JSON.parse(localStorage.getItem('BMIKey')) || [];
var btncountId = document.getElementById('btn-count');
var indexList = document.querySelector('.bmiResultList');
btncountId.addEventListener('click', bmiFu);
indexList.addEventListener('click', deleteData);
updataLiet(data);

function bmiFu(e) {
  e.preventDefault();
  var cmId = document.getElementById('cm').value;
  var kgId = document.getElementById('kg').value;
  var genderId = document.getElementById('gender').value;
  var meter = cmId / 100;
  var bmiCountResult = (kgId / (meter * meter)).toFixed(2);
  var BMIdata = {
    cm: cmId,
    kg: kgId,
    gender: genderId,
    bmiResult: bmiCountResult
  };

  if (analysisBMI(bmiCountResult) != 'ERROR') {
    data.push(BMIdata);
    btnColor(analysisBMI(bmiCountResult), bmiCountResult);
    localStorage.setItem("BMIKey", JSON.stringify(data));
    updataLiet(data);
  }
}

function btnColor(item, bmi) {
  var str = '';

  switch (item) {
    case '體重過輕':
      str += "<a class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-primary-border\" href=\"#\">\n                        <h4 class=\"m-0\">".concat(bmi, "</h4>\n                        <small>BMI</small>\n                        <div class=\"rounded-circle btn-redo d-flex justify-content-center align-items-center bg-primary text-white\"><i class=\"fas fa-redo rounded-circle\"></i></div>\n                    </a>");
      btncountId.innerHTML = str;
      break;

    case '正常範圍':
      str += "<a class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-success-border\" href=\"#\">\n                        <h4 class=\"m-0\">".concat(bmi, "</h4>\n                        <small>BMI</small>\n                        <div class=\"rounded-circle btn-redo d-flex justify-content-center align-items-center bg-success text-white\"><i class=\"fas fa-redo rounded-circle\"></i></div>\n                    </a>");
      btncountId.innerHTML = str;
      break;

    case '過重':
      str += "<a class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-warning-border\" href=\"#\">\n                        <h4 class=\"m-0\">".concat(bmi, "</h4>\n                        <small>BMI</small>\n                        <div class=\"rounded-circle btn-redo d-flex justify-content-center align-items-center bg-warning text-white\"><i class=\"fas fa-redo rounded-circle\"></i></div>\n                    </a>");
      btncountId.innerHTML = str;
      break;

    case '輕度肥胖':
      str += "<a class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-warning-border\" href=\"#\">\n                        <h4 class=\"m-0\">".concat(bmi, "</h4>\n                        <small>BMI</small>\n                        <div class=\"rounded-circle btn-redo d-flex justify-content-center align-items-center bg-warning text-white\"><i class=\"fas fa-redo rounded-circle\"></i></div>\n                    </a>");
      btncountId.innerHTML = str;
      break;

    case '中度肥胖':
      str += "<a class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-danger-border\" href=\"#\">\n                        <h4 class=\"m-0\">".concat(bmi, "</h4>\n                        <small>BMI</small>\n                        <div class=\"rounded-circle btn-redo d-flex justify-content-center align-items-center bg-danger text-white\"><i class=\"fas fa-redo rounded-circle\"></i></div>\n                    </a>");
      btncountId.innerHTML = str;
      break;

    case '重度肥胖':
      str += "<a class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-danger-border\" href=\"#\">\n                        <h4 class=\"m-0\">".concat(bmi, "</h4>\n                        <small>BMI</small>\n                    <div class=\"rounded-circle btn-redo d-flex justify-content-center align-items-center bg-danger text-white\"><i class=\"fas fa-redo rounded-circle\"></i></div>\n                    </a>");
      btncountId.innerHTML = str;
      break;

    default:
      '生成按鈕錯誤';
      break;
  }
}

function analysisBMI(item) {
  switch (true) {
    case item < 18.5:
      return '體重過輕';

    case 18.5 <= item && item < 24:
      return '正常範圍';

    case 24 <= item && item < 27:
      return '過重';

    case 27 <= item && item < 30:
      return '輕度肥胖';

    case 30 <= item && item < 35:
      return '中度肥胖';

    case item >= 35:
      return '重度肥胖';

    default:
      return 'ERROR';
  }
}

function deleteData(e) {
  e.preventDefault();

  if (e.target.tagName !== "A") {
    return;
  }

  console.log(e.target.dataset.index);
  var str = e.target.dataset.index;
  data.splice(str, 1);
  localStorage.setItem("BMIKey", JSON.stringify(data));
  updataLiet(data);
}

function updataLiet(item) {
  var str = '';
  item.forEach(function (element, index) {
    switch (true) {
      case element.bmiResult < 18.5:
        str += "<div class=\"form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-primary my-4 border-5\">\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <img class=\"img-fluid\" src=\"./images/BMICLogo.png\" alt=\"\" srcset=\"\" />\n                            </div>\n                            <div class=\"col-md-4 form-group\">\n                                <p>\u8EAB\u9AD8(CM)\uFF1A".concat(element.cm, "</p>\n                                <p>\u9AD4\u91CD(KG)\uFF1A").concat(element.kg, "</p>\n                                <p>\u6027\u5225\uFF1A").concat(element.gender, "</p>\n                            </div>\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <div class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-primary-border\" href=\"#\" id=\"btn-count\">\n                                    <h4 class=\"m-0\">").concat(element.bmiResult, "</h4>\n                                    <small>BMI</small>\n                                </div>\n                                <br/>\n                                <a class=\"btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center\" id=\"btn-dele\" data-index=\"").concat(index, "\" href=\"#\"/>\u522A\u9664</a>\n                            </div>\n                        </div>");
        indexList.innerHTML = str;
        break;

      case 18.5 <= element.bmiResult && element.bmiResult < 24:
        str += "<div class=\"form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-success my-4 border-5\">\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <img class=\"img-fluid\" src=\"./images/BMICLogo.png\" alt=\"\" srcset=\"\" />\n                            </div>\n                            <div class=\"col-md-4 form-group\">\n                                <p>\u8EAB\u9AD8(CM)\uFF1A".concat(element.cm, "</p>\n                                <p>\u9AD4\u91CD(KG)\uFF1A").concat(element.kg, "</p>\n                                <p>\u6027\u5225\uFF1A").concat(element.gender, "</p>\n                            </div>\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <div class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-success-border\" href=\"#\" id=\"btn-count\">\n                                    <h4 class=\"m-0\">").concat(element.bmiResult, "</h4>\n                                    <small>BMI</small>\n                                </div>\n                                <br/>\n                                <a class=\"btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center\" id=\"btn-dele\" data-index=\"").concat(index, "\"/>\u522A\u9664</a>\n                            </div>\n                        </div>");
        indexList.innerHTML = str;
        break;

      case 24 <= element.bmiResult && element.bmiResult < 27:
        str += "<div class=\"form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-warning my-4 border-5\">\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <img class=\"img-fluid\" src=\"./images/BMICLogo.png\" alt=\"\" srcset=\"\" />\n                            </div>\n                            <div class=\"col-md-4 form-group\">\n                                <p>\u8EAB\u9AD8(CM)\uFF1A".concat(element.cm, "</p>\n                                <p>\u9AD4\u91CD(KG)\uFF1A").concat(element.kg, "</p>\n                                <p>\u6027\u5225\uFF1A").concat(element.gender, "</p>\n                            </div>\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <div class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-warning-border\" href=\"#\" id=\"btn-count\">\n                                    <h4 class=\"m-0\">").concat(element.bmiResult, "</h4>\n                                    <small>BMI</small>\n                                </div>\n                                <br/>\n                                <a class=\"btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center\" id=\"btn-dele\" data-index=\"").concat(index, "\"/>\u522A\u9664</a>\n                            </div>\n                        </div>");
        indexList.innerHTML = str;
        break;

      case 27 <= element.bmiResult && element.bmiResult < 30:
        str += "<div class=\"form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-warning my-4 border-5\">\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <img class=\"img-fluid\" src=\"./images/BMICLogo.png\" alt=\"\" srcset=\"\" />\n                            </div>\n                            <div class=\"col-md-4 form-group\">\n                                <p>\u8EAB\u9AD8(CM)\uFF1A".concat(element.cm, "</p>\n                                <p>\u9AD4\u91CD(KG)\uFF1A").concat(element.kg, "</p>\n                                <p>\u6027\u5225\uFF1A").concat(element.gender, "</p>\n                            </div>\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <div class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-warning-border\" href=\"#\" id=\"btn-count\">\n                                    <h4 class=\"m-0\">").concat(element.bmiResult, "</h4>\n                                    <small>BMI</small>\n                                </div>\n                                <br/>\n                                <a class=\"btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center\" id=\"btn-dele\" data-index=\"").concat(index, "\"/>\u522A\u9664</a>\n                            </div>\n                        </div>");
        indexList.innerHTML = str;
        break;

      case 30 <= element.bmiResult && element.bmiResult < 35:
        str += "<div class=\"form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-danger my-4 border-5\">\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <img class=\"img-fluid\" src=\"./images/BMICLogo.png\" alt=\"\" srcset=\"\" />\n                            </div>\n                            <div class=\"col-md-4 form-group\">\n                                <p>\u8EAB\u9AD8(CM)\uFF1A".concat(element.cm, "</p>\n                                <p>\u9AD4\u91CD(KG)\uFF1A").concat(element.kg, "</p>\n                                <p>\u6027\u5225\uFF1A").concat(element.gender, "</p>\n                            </div>\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <div class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-danger-border\" href=\"#\" id=\"btn-count\">\n                                    <h4 class=\"m-0\">").concat(element.bmiResult, "</h4>\n                                    <small>BMI</small>\n                                </div>\n                                <br/>\n                                <a class=\"btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center\" id=\"btn-dele\" data-index=\"").concat(index, "\"/>\u522A\u9664</a>\n                            </div>\n                        </div>");
        indexList.innerHTML = str;
        break;

      case element.bmiResult >= 35:
        str += "<div class=\"form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-danger my-4 border-5\">\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <img class=\"img-fluid\" src=\"./images/BMICLogo.png\" alt=\"\" srcset=\"\" />\n                            </div>\n                            <div class=\"col-md-4 form-group\">\n                                <p>\u8EAB\u9AD8(CM)\uFF1A".concat(element.cm, "</p>\n                                <p>\u9AD4\u91CD(KG)\uFF1A").concat(element.kg, "</p>\n                                <p>\u6027\u5225\uFF1A").concat(element.gender, "</p>\n                            </div>\n                            <div class=\"col-md-4 form-group d-flex justify-content-center align-items-center\">\n                                <div class=\"result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-danger-border\" href=\"#\" id=\"btn-count\">\n                                    <h4 class=\"m-0\">").concat(element.bmiResult, "</h4>\n                                    <small>BMI</small>\n                                </div>\n                                <br/>\n                                <a class=\"btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center\" id=\"btn-dele\" data-index=\"").concat(index, "\"/>\u522A\u9664</a>\n                            </div>\n                        </div>");
        indexList.innerHTML = str;
        break;

      default:
        console.log('ERROR');
        break;
    }
  });
}
//# sourceMappingURL=all.js.map
