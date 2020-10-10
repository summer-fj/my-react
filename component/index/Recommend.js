import React from 'react'
import AwesomeSwiper from 'react-awesome-swiper';
import '../../assets/iconfont/iconfont.css'
import axios from "axios";
import {Link } from 'react-router-dom'
const config = {
    loop: true,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
    // Disable preloading of all images
    preloadImages: false,
    // Enable lazy loading
    lazy: true,
    speed: 500,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        bulletElement: 'li',
        hideOnClick: true,
        clickable: true,
    },
    on: {
        slideChange: function () {
            // console.log(this.activeIndex);
        },
    },
};

class Recommed extends React.Component {
    swiperRef = null
    goNext = () => {//use `this.swiperRef.swiper` to get the instance of Swiper
        this.swiperRef.swiper.slideNext();
    }
    constructor() {
        super()
        this.state = {
            bannerarr: [],
            personList: [
                // {
                //     url: "../../assets/img/06.jpg",
                //     title: "你要跳舞吗"
                // },
            ],
            newSongarr: []
        }
    }
    getbanner() {
        return this.$axios.get(this.$api.banner)
    }
    getpersonalized(){
        return this.$axios.get(this.$api.personalized)
    }
    getnewSong(){
        return this.$axios.get(this.$api.newSong)
    }

    componentDidMount() {
        // this.$axios.get(this.$api.banner).then(res=>{
        //     console.log(res)
        //     this.setState({
        //         bannerarr:res.data.banners
        //     })
        // })
        axios.all([this.getbanner(),this.getpersonalized(), this.getnewSong()]).then(
            axios.spread((getbanner,getpersonalized, getnewSong) => {
                console.log(getnewSong.data.result)
                
                this.setState({
                    bannerarr: getbanner.data.banners,
                    personList: getpersonalized.data.result,
                    newSongarr:getnewSong.data.result

                })
            })
        )
    }
    render() {
        return (<div id="recom">
            <AwesomeSwiper ref={ref => (this.swiperRef = ref)} config={config} className="your-classname banner">
                <div className="swiper-wrapper">
                    {/* <div className="swiper-slide">slider1</div>
                    <div className="swiper-slide">slider2</div>
                    <div className="swiper-slide">slider3</div> */}

                    {
                        this.state.bannerarr.map((item, index) => {
                            return <div className="swiper-slide" key={index}>
                                <img src={item.imageUrl} />
                            </div>
                        })
                    }
                </div>
                {/* <!--左箭头--> */}
                <div className="swiper-button-prev"></div>
                {/* <!--右箭头--> */}
                <div className="swiper-button-next"></div>
                <div className="swiper-pagination"></div>
            </AwesomeSwiper>
            <div className="recommed">
                <h1>
                    <span></span>
                    <p>推荐歌单</p>
                </h1>
                <ul>
                    {this.state.personList.map((item, index) => {
                        return <li key={index}>
                            <Link to={'/songlist/' + item.id}>
                            <img src={item.picUrl} />
                            <p>{item.name}</p>
                            </Link>
                        </li>
                    })}
                </ul>
            </div>
            <div className="new">
                <h1>
                    <span></span>
                    <p>最新音乐</p>
                </h1>
                <ul>
                    {this.state.newSongarr.map((item, index) => {
                        return (<li key={index}>
                            <div>
                                <h3>{item.name}</h3>
                                <p>
                                    {
                                        item.song.artists.map((val,ind)=>{ 
                                            let sprit = item.song.artists.length > 1 && ind != item.song.artists.length - 1 ? <i>&nbsp;/&nbsp;</i>:"";
                                        return (<span key={ind}>{val.name}{sprit}</span>)
                                           
                                        })   
                                    }
                                    &nbsp;-&nbsp;{item.name}
                                </p>
                            </div>
                            <span className="iconfont icon-bofang"></span>
                        </li>)
                    })}
                </ul>
            </div>
        </div>)
    }
}
export default Recommed