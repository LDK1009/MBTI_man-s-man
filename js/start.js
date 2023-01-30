const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");

const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//결과 계산 함수
function calResult(){
  console.log(select);
  var result = select.indexOf(Math.max(...select)); //select배열에서 가장 큰 값을 result에 대입
  return result;
}

function setResult(){ //결과 페이지로 넘어가기
  let point = calResult(); //point 변수에 계산된 결과값 대입
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name; //data.js 참고

  var resultImg = document.createElement('img'); 
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + '.png'; //결과 페이지 이미지 url 설정
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc'); //결과 페이지 내용 설정
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){ //결과 페이지 모션 작업
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";
      result.style.display = "block"
    }, 450)})
    setResult();
}

function addAnswer(answerText, qIdx, idx){ //질문 
  var a = document.querySelector('.answerBox'); // class="answerBox" 를 모두 a로 지정
  var answer = document.createElement('button'); //답변 박스는 버튼으로 지정
  answer.classList.add('answerList'); //answer에 따움표 안에 있는 내용을 class로 추가 
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');
  answer.classList.add('fadeIn');

  a.appendChild(answer); //answer 박스에 문자열 삽입
  answer.innerHTML = answerText; //answer 버튼 내에 인수로 받은 answerText 내용 추가

  answer.addEventListener("click", function(){ //답변 클릭 시 발생하는 함수
    var children = document.querySelectorAll('.answerList');
    for(let i = 0; i < children.length; i++){ //답변 클릭 시에 모든 답변 삭제
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout(() => {
      var target = qnaList[qIdx].a[idx].type;
      for(let i = 0; i < target.length; i++){
        select[target[i]] += 1;
      }

      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none';
      }
      goNext(++qIdx); //답변 클릭 시에 다음 질문 페이지로 이동
    },450)
  }, false);
}

//다음 페이지로 넘어가기 및 결과 페이지로 넘어가기
function goNext(qIdx){
  if(qIdx+1 === endPoint){ //결과 페이지로 넘어가기
    goResult();
    return;
  }

  var q = document.querySelector('.qBox'); //질문 박스
  q.innerHTML = qnaList[qIdx].q;
  for(let i in qnaList[qIdx].a){ //해당 질문에 대응하는 답변 박스 리스트 생성
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);//질문에 해당하는 답변 리스트 순서대로 대입
  } //qnaList[qIdx].a[i].answer를 answerText 인수에 전달하는 것을 유의해야한다.
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%'; //상태 진행도 스테이터스
}

function begin(){ //페이지 넘김 스타일
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";
      qna.style.display = "block"
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}
