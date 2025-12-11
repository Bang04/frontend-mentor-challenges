# 💰 PersonalFinance App

📅 2025.01.23 ~ 2025.02.10  
👥 Team Project  
🔍 개인 금융 관리(예산·거래 내역·정기 청구서) 웹 앱

---

## 🚀 주요 기능
- 예산(Pot) 생성 · 수정 · 삭제 CRUD
- 정기 청구서 리스트 무한 스크롤(Infinite Scroll)
- 정기 청구서 검색 · 정렬 기능
- Firebase 연동 기반 공통 모듈 통합
- 반응형 UI 구현 (Mobile · Tablet · Desktop)

---

## 🔍 기술 포인트
- `Intersection Observer` 기반 무한 스크롤 구현
- `Custom Hook` 기반 Toast 알림 모듈화
- Redux 상태 기반 CRUD 구조화
- Firebase 연동 후 팀 공통 모듈로 통합 설계
- 예산/거래 데이터 UI 갱신 성능 최적화

---

## 🛠 기술 스택
<img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white"/>
<img src="https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black"/>

---

## 📱 Responsive Preview (Web / Tablet / Mobile)

| Web | Tablet | Mobile |
|-----|--------|--------|
| ![web](./public/images/web.png) | ![tablet](./public/images/tablet.png) | ![mobile](./public/images/app.png) |

---

## 📝 회고
- 상태 관리 로직과 UI 제어가 분리될 때 유지 보수가 훨씬 쉬워짐을 체감
- Infinite Scroll 최적화 과정에서 Intersection Observer의 필요성을 명확히 이해
- 팀 공통 모듈 구축 경험 → 프로젝트 확장 및 유지 측면에서 큰 도움
