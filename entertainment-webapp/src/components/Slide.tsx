import { useEffect, useState, useRef } from "react"

export const Slide = (props : any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0); 
  const [isOverflow , setIsOverflow ] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const totalCount =  props.children.length; //슬라이스 갯수
  
    /***************************  scroll ***********************/
    useEffect(()=> {  
      const columnsWidth = (ref.current as HTMLElement);
      const offsetWidth = (columnsWidth.offsetWidth);
      const scrollWidth = (columnsWidth.scrollWidth); //스크롤 가능 전체영역
      
      //console.log("offsetWidth : "+offsetWidth);
      //console.log("scrollWidth : "+columnsWidth.scrollWidth);
      if(columnsWidth){
        const hasOverFlow = scrollWidth > offsetWidth ;
        setIsOverflow(hasOverFlow);
      }
    }, []);
    
    const scrollToElement = () => {
      //console.log("isOverflow : "+isOverflow);
      if(isOverflow){
        //console.log("scrollToElement offsetWidth : "+ref.current?.offsetWidth);
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    /***************************  scroll ***********************/





  /***************************  slide ***********************/
  useEffect(()=> {
    const intervalId = setInterval(() => {
     
        const index = (currentIndex + 1) % totalCount;
        console.log("currentIndex : "+ index);
        setCurrentIndex(index);
      
    }, 1000);

    return () => clearInterval(intervalId);
  },[totalCount]);

  useEffect(()=> {
    const columnWidth = (ref.current?.querySelector('.column')as HTMLElement);
    if(columnWidth){
      const offsetWidth = columnWidth.offsetWidth; //슬라이드 너비
     // console.log("offsetWidth : "+offsetWidth);
      if(ref.current){
        setSlideWidth(offsetWidth);
      }
    }
  }, []);


  /***************************  slide ***********************/



  return (
    <div className="is-max-widescreen is-clipped m-0 p-0" onClick={scrollToElement}>
      <div  className="columns is-mobile" 
            ref={ref}
            style={ {
              display: 'flex',
              overflowX: 'scroll', 
              transition: 'transform 3s ease-in-out', // 슬라이드 전환 애니메이션
              transform: `translateX(-${currentIndex * slideWidth}px)`
            }}  
      >
        {props.children}
      </div>
    
    </div>
  )

  
}