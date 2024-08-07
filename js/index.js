import { loadCards } from "./movie.js";
import { loadUpcomingCards } from "./upcomMov.js";
import { changeDisplay } from "./search.js";

// 검색용 빈 array
const titleArr = [];
const idArr = [];

// 위치 정보 및 세팅값
const cardList1 = document.querySelector('.cardList1');
const cardList2 = document.querySelector('.cardList2');
const inputForm = document.querySelector('.inputForm');
const input = document.querySelector('#input');
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjI1Mzc5NDZmOGEwYjIxZjFiMWNjZGQwZjk0MDZkNSIsIm5iZiI6MTcyMTcyNDg4OC40ODcxNzcsInN1YiI6IjY2OWY2ZWZiNGI0OTYxOGI0OTJlN2I4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mYKz6yxy0yiHtcLr1pmMFR7VeNziqwLVgBTLM-SSdNA'
  }
};

// 화면이 준비되면 card 20개 로드
loadCards(cardList1, options, titleArr, idArr);
loadUpcomingCards(cardList2, options, titleArr, idArr);

// 영화 탭메뉴 클릭하면 해당 차트 보여줌
const tabList = document.querySelectorAll('.tabMenu .tab li');
const contents = document.querySelectorAll('.chartArea .cont')
let activeCont = ''; // 현재 활성화된 컨텐츠 (기본:#tab1 활성화)

for(let i = 0; i < tabList.length; i++){
  tabList[i].querySelector('.btn').addEventListener('click', function(e){
    e.preventDefault();
    for(let j = 0; j < tabList.length; j++){
      // 나머지 버튼 클래스 제거
      tabList[j].classList.remove('is_on');

      // 나머지 컨텐츠 display:none 처리
      contents[j].style.display = 'none';
    }

    // 버튼 관련 이벤트
    this.parentNode.classList.add('is_on');

    // 버튼 클릭시 컨텐츠 전환
    activeCont = this.getAttribute('href');
    document.querySelector(activeCont).style.display = 'flex';
  });
}

// 새로 고침 시 input에 cursor가 들어가게 세팅
input.focus();

// 검색어 처리 event
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  changeDisplay(input, titleArr, idArr);
})