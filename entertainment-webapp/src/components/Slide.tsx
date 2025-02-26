import { useEffect, useState, useRef } from "react"
import "./Slide.css";

export const Slide = (props : any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0); 
  const [intervalId, setIntervalId] = useState<any>();
  const ref = useRef<HTMLDivElement>(null);
  const totalCount =  props.children.length;

  useEffect(()=> {
    // 슬라이드 index 순서 반복
    const id = setInterval(() => {
      setCurrentIndex((prevIndex) => (currentIndex + 1) % totalCount);
    }, 3000);

    setIntervalId(id);
    
    return () => clearInterval(id);
  },[]);

  useEffect(() => {
    // 슬라이드의 각 항목 너비 계산
    const columnWidth = ref.current?.querySelector('.column') as HTMLElement;
    if (columnWidth) {
      setSlideWidth(columnWidth.offsetWidth);
    }
  }, [props.children]); 


  useEffect(() => {
    // 스크롤 left 값 위치 이동
    const columnsWidth = (ref.current as HTMLElement);

    if (columnsWidth) {
      columnsWidth?.scrollTo({
        left: currentIndex * slideWidth, // 현재 index * 슬라이드 가로 너비
        behavior: "smooth", //부드럽게 스크롤
      });
    }
  }, [currentIndex, slideWidth]);


  const handlerMouseEnter = () => {
    clearInterval(intervalId);
  }

  const handlerMouseLeave = () => {
    if(intervalId){
      clearInterval(intervalId);
    }
    const id =  setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalCount);
    }, 3000);
    setIntervalId(id);
  }

   return (
  <div className="is-max-widescreen  m-0 p-0" >
      <div className="slide-container" ref={ref}  style={{ overflowX: 'scroll', overflowY: "hidden",}} >
        <div className="columns is-mobile" onMouseEnter={handlerMouseEnter} onMouseLeave={handlerMouseLeave}>
          {props.children}
        </div>
      </div>
    </div>
  )

  
}