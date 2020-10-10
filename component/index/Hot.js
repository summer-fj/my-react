import React from 'react'
import querystring from 'querystring'
class Hot extends React.Component {
    constructor() {
        super()
        this.state = {
            hotarr:[],
            imgUrl:'',
            bgimgUrl:'',
            updateTime: '',
            detailname:'',
        }
    }
    componentDidMount(){
        let url = this.props.match.params.id ? this.$api.songList+'?id='+this.props.match.params.id : this.$api.toplist
        this.$axios.get(url).then(res=>{
            console.log(res)
            // 根据时间戳得到月和日
            let date = new Date(res.data.playlist.updateTime);
            let month = date.getMonth()+1 > 9 ? (date.getMonth()+1) : '0'+(date.getMonth() + 1) ;
            let day = date.getDate()>9? date.getDate(): '0'+date.getDate();
            this.setState({
                hotarr: res.data.playlist.tracks,
                imgUrl: res.data.playlist.coverImgUrl,
                updateTime: `${month}月${day}日`,
                detailname: res.data.playlist.name,
                // bgimgUrl: res.data.playlist.backgroundCoverUrl
            })
        })
    }
    render() {
        // console.log(this.props)
        let picitem;
        let hotpage;
        if(this.props.match.params.id){
            picitem=(
                <div className="detailHead">
                    <img src={this.state.imgUrl} />
                    <b> &lt; </b>
                    {/* <span className="date">{this.state.detailname}</span> */}
                    {/* <img src='{require(../../assets/img/06.jpg)}'></img> */}
                </div>
            )
        }else{
            hotpage=(
                <div>
                    <img src={this.state.imgUrl} />
                    <span className="title">云音乐</span>
                    <span className="date">更新日期: {this.state.updateTime}</span>
                </div>
            )
        }
        return (<div id="hot">
            <div className="banner" style={{background:'url(' + this.state.bgimgUrl + ')'}}>
                {picitem}
                {hotpage}
            </div>
            <ul>
                {this.state.hotarr.map((item, index) => {
                    return <li key={index}>
                        <i>
                            {
                               index = index < 9 ? '0'+Number(index+1) : index+1
                            }
                        </i>
                        <div>
                            <h3>{item.name}</h3>
                            <p>
                                {
                                    // item.ar[0].name
                                    item.ar.map((val,ind)=>{
                                        let sprit = item.ar.length>1 && ind != item.ar.length-1? <em>&nbsp;/&nbsp;</em> : '';
                                        return <span key={ind}>{val.name}{sprit}</span>
                                    })
                                }
                                &nbsp;-&nbsp;{item.name}
                            </p>
                        </div>
                        <span className="iconfont icon-bofang"></span>
                    </li>
                })}
            </ul>
        </div>)
    }
    componentWillUnmount(){
        this.setState=(()=>{
            return
        })
    }
}
export default Hot