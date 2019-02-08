let data = JSON.parse(window.localStorage.getItem('BMIKey')) || []
const btncountId = document.getElementById('btn-count')
const indexList = document.querySelector('.bmiResultList')

btncountId.addEventListener('click', bmiFu)
indexList.addEventListener('click', deleteData)

updataLiet(data)

function bmiFu (e) {
  e.preventDefault()
  const cmId = document.getElementById('cm').value
  const kgId = document.getElementById('kg').value
  const genderId = document.getElementById('gender').value
  const meter = cmId / 100
  const bmiCountResult = (kgId / (meter * meter)).toFixed(2)
  const BMIdata = {
    cm: cmId,
    kg: kgId,
    gender: genderId,
    bmiResult: bmiCountResult
  }

  if (analysisBMI(bmiCountResult) !== 'ERROR') {
    data.push(BMIdata)
    btnColor(analysisBMI(bmiCountResult), bmiCountResult)
    window.localStorage.setItem('BMIKey', JSON.stringify(data))
    updataLiet(data)
  }
}
function btnColor (item, bmi) {
  let str = ''
  switch (item) {
    case '體重過輕':
      str += `<a class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-primary-border" href="#">
                        <h5 class="m-0">${item}</h5>
                        <small>BMI-${bmi}</small>
                        <div class="rounded-circle btn-redo d-flex justify-content-center align-items-center bg-primary text-white"><i class="fas fa-redo rounded-circle"></i></div>
                    </a>`
      btncountId.innerHTML = str
      break
    case '正常範圍':
      str += `<a class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-success-border" href="#">
                        <h5 class="m-0">${item}</h5>
                        <small>BMI-${bmi}</small>
                        <div class="rounded-circle btn-redo d-flex justify-content-center align-items-center bg-success text-white"><i class="fas fa-redo rounded-circle"></i></div>
                    </a>`
      btncountId.innerHTML = str
      break
    case '過重':
      str += `<a class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-warning-border" href="#">
                        <h5 class="m-0">${item}</h5>
                        <small>BMI-${bmi}</small>
                        <div class="rounded-circle btn-redo d-flex justify-content-center align-items-center bg-warning text-white"><i class="fas fa-redo rounded-circle"></i></div>
                    </a>`
      btncountId.innerHTML = str
      break
    case '輕度肥胖':
      str += `<a class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-warning-border" href="#">
                        <h5 class="m-0">${item}</h5>
                        <small>BMI-${bmi}</small>
                        <div class="rounded-circle btn-redo d-flex justify-content-center align-items-center bg-warning text-white"><i class="fas fa-redo rounded-circle"></i></div>
                    </a>`
      btncountId.innerHTML = str
      break
    case '中度肥胖':
      str += `<a class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-danger-border" href="#">
                        <h5 class="m-0">${item}</h5>
                        <small>BMI-${bmi}</small>
                        <div class="rounded-circle btn-redo d-flex justify-content-center align-items-center bg-danger text-white"><i class="fas fa-redo rounded-circle"></i></div>
                    </a>`
      btncountId.innerHTML = str
      break
    case '重度肥胖':
      str += `<a class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-danger-border" href="#">
                        <h5 class="m-0">${item}</h5>
                        <small>BMI-${bmi}</small>
                    <div class="rounded-circle btn-redo d-flex justify-content-center align-items-center bg-danger text-white"><i class="fas fa-redo rounded-circle"></i></div>
                    </a>`
      btncountId.innerHTML = str
      break
    default:
      console.log('生成按鈕錯誤')
      break
  }
}

function analysisBMI (item) {
  switch (true) {
    case item < 18.5:
      return '體重過輕'
    case item >= 18.5 && item < 24:
      return '正常範圍'
    case item >= 24 && item < 27:
      return '過重'
    case item >= 27 && item < 30:
      return '輕度肥胖'
    case item >= 30 && item < 35:
      return '中度肥胖'
    case item >= 35:
      return '重度肥胖'
    default:
      return 'ERROR'
  }
}

function deleteData (e) {
  e.preventDefault()
  if (e.target.tagName !== 'A') { return }
  let str = e.target.dataset.index
  data.splice(str, 1)
  window.localStorage.setItem('BMIKey', JSON.stringify(data))
  updataLiet(data)
}

function updataLiet (item) {
  let str = ''
  item.forEach((element, index) => {
    switch (true) {
      case element.bmiResult < 18.5:
        str += `<div class="form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-primary my-4 border-5">
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <img class="img-fluid" src="./images/BMICLogo.png" alt="" srcset="" />
                            </div>
                            <div class="col-md-4 form-group">
                                <p>身高(CM)：${element.cm}</p>
                                <p>體重(KG)：${element.kg}</p>
                                <p>性別：${element.gender}</p>
                            </div>
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <div class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-primary-border" href="#" id="btn-count">
                                    <h4 class="m-0">${element.bmiResult}</h4>
                                    <small>BMI</small>
                                </div>
                                <br/>
                                <a class="btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center" id="btn-dele" data-index="${index}" href="#"/>刪除</a>
                            </div>
                        </div>`
        indexList.innerHTML = str
        break
      case element.bmiResult >= 18.5 && element.bmiResult < 24:
        str += `<div class="form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-success my-4 border-5">
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <img class="img-fluid" src="./images/BMICLogo.png" alt="" srcset="" />
                            </div>
                            <div class="col-md-4 form-group">
                                <p>身高(CM)：${element.cm}</p>
                                <p>體重(KG)：${element.kg}</p>
                                <p>性別：${element.gender}</p>
                            </div>
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <div class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-success-border" href="#" id="btn-count">
                                    <h4 class="m-0">${element.bmiResult}</h4>
                                    <small>BMI</small>
                                </div>
                                <br/>
                                <a class="btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center" id="btn-dele" data-index="${index}"/>刪除</a>
                            </div>
                        </div>`
        indexList.innerHTML = str
        break
      case element.bmiResult >= 24 && element.bmiResult < 27:
        str += `<div class="form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-warning my-4 border-5">
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <img class="img-fluid" src="./images/BMICLogo.png" alt="" srcset="" />
                            </div>
                            <div class="col-md-4 form-group">
                                <p>身高(CM)：${element.cm}</p>
                                <p>體重(KG)：${element.kg}</p>
                                <p>性別：${element.gender}</p>
                            </div>
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <div class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-warning-border" href="#" id="btn-count">
                                    <h4 class="m-0">${element.bmiResult}</h4>
                                    <small>BMI</small>
                                </div>
                                <br/>
                                <a class="btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center" id="btn-dele" data-index="${index}"/>刪除</a>
                            </div>
                        </div>`
        indexList.innerHTML = str
        break
      case element.bmiResult >= 27 && element.bmiResult < 30:
        str += `<div class="form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-warning my-4 border-5">
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <img class="img-fluid" src="./images/BMICLogo.png" alt="" srcset="" />
                            </div>
                            <div class="col-md-4 form-group">
                                <p>身高(CM)：${element.cm}</p>
                                <p>體重(KG)：${element.kg}</p>
                                <p>性別：${element.gender}</p>
                            </div>
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <div class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-warning-border" href="#" id="btn-count">
                                    <h4 class="m-0">${element.bmiResult}</h4>
                                    <small>BMI</small>
                                </div>
                                <br/>
                                <a class="btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center" id="btn-dele" data-index="${index}"/>刪除</a>
                            </div>
                        </div>`
        indexList.innerHTML = str
        break
      case element.bmiResult >= 30 && element.bmiResult < 35:
        str += `<div class="form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-danger my-4 border-5">
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <img class="img-fluid" src="./images/BMICLogo.png" alt="" srcset="" />
                            </div>
                            <div class="col-md-4 form-group">
                                <p>身高(CM)：${element.cm}</p>
                                <p>體重(KG)：${element.kg}</p>
                                <p>性別：${element.gender}</p>
                            </div>
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <div class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-danger-border" href="#" id="btn-count">
                                    <h4 class="m-0">${element.bmiResult}</h4>
                                    <small>BMI</small>
                                </div>
                                <br/>
                                <a class="btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center" id="btn-dele" data-index="${index}"/>刪除</a>
                            </div>
                        </div>`
        indexList.innerHTML = str
        break
      case element.bmiResult >= 35:
        str += `<div class="form-row w-100 d-flex justify-content-center align-items-center border-left border-bottom border-danger my-4 border-5">
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <img class="img-fluid" src="./images/BMICLogo.png" alt="" srcset="" />
                            </div>
                            <div class="col-md-4 form-group">
                                <p>身高(CM)：${element.cm}</p>
                                <p>體重(KG)：${element.kg}</p>
                                <p>性別：${element.gender}</p>
                            </div>
                            <div class="col-md-4 form-group d-flex justify-content-center align-items-center">
                                <div class="result-btn rounded-circle d-flex justify-content-center align-items-center flex-column btn-danger-border" href="#" id="btn-count">
                                    <h4 class="m-0">${element.bmiResult}</h4>
                                    <small>BMI</small>
                                </div>
                                <br/>
                                <a class="btn btn-danger rounded-circle mx-2 d-flex justify-content-center align-items-center" id="btn-dele" data-index="${index}"/>刪除</a>
                            </div>
                        </div>`
        indexList.innerHTML = str
        break
      default:
        console.log('ERROR')
        break
    }
  })
}
