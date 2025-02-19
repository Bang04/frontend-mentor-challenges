import { Slide } from './Slide';

import bookMarKOff from '/assets/icon-bookmark-empty.svg';
import bookMarkOn from '/assets/icon-bookmark-full.svg';
import play from '/assets/icon-play.svg';

import movie from '/assets/icon-category-movie.svg'
import tv from '/assets/icon-category-tv.svg'
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../store/index';
import { useEffect, useState } from 'react';


// 데이터 타입 정의
interface Thumbnail {
  trending: {
    small: string;
    large: string;
  };
  regular: {
    small: string;
    medium: string;
    large: string;
  };
}

interface MovieSeries {
  id :  string;
  title: string;
  thumbnail: Thumbnail;
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

export const Trending = () => {
    const data = useSelector((state:any) => state.itemsReducer);
    const dispatch = useDispatch();

    const [filteredData,setData] = useState<MovieSeries[]>(data);

    useEffect(()=> {
      setData(data);
    }, [data]);

    return (
        <>
          <h1 className="has-text-white outfit-h-l my-2">Trending</h1>
          <Slide>
            {filteredData.filter((item:any) => item.isTrending == true).map((item:any, index:number) => {
              return (
                  <div key={index} className="column is-6-mobile is-4-tablet is-4-desktop">
                    <div className="image-container is-relative">
                      <figure className="image">
                        <img src={item.thumbnail.regular.medium} /> 
                      </figure>
                      <div className="is-overlay is-playable is-flex is-flex-direction-column is-justify-content-space-between">
                        <div className="is-align-self-flex-end">
                          <button className="button is-dark is-rounded px-2 mx-2 my-2" onClick={() =>  dispatch(toggle(item))}>
                            <img src={item.isBookmarked ? bookMarkOn : bookMarKOff } />
                          </button>
                        </div>
                        <div className="is-align-self-center has-text-centered">
                          <button className="button button-play is-clickable is-rounded px-3" onClick={() => console.log("==play==")}>
                            <img src={play} className=""></img>
                            <span className="has-text-white mx-3">Play</span>
                          </button>
                        </div>
                        <div className="is-align-self-flex-start">
                          <div className="has-text-white mt-auto mb-3 ml-2">
                            <span className="mr-1 outfit-b-s">{item.year} ·</span>
                            <span className="mr-1">
                              <span className="mr-1 outfit-b-s">
                                <img src={item.category.toLowerCase() == "movie" ? movie : tv}></img>
                              </span>
                              <span className="outfit-b-s">{item.category} ·</span>  
                            </span> 
                            <span className="mr-1 outfit-b-s">{item.rating}</span> 
                            <div className="outfit-h-m">{item.title}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> 
                )
            })}
          </Slide>
        </>
   
    );
}
