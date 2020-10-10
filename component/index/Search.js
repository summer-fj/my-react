import React from 'react'
class Search extends React.Component {
    constructor() {
        super()
        this.state = {
            inptxt: '',
            arrSearch: [],
            songarr: [],
        }
    }
    componentDidMount() {
        this.$axios.get(this.$api.searchhot).then(res => {
            this.setState({
                arrSearch: res.data.result.hots,
            })
        })
    }
    inpchange(e) {
        this.setState({
            inptxt: e.target.value,
        })
        if(e.target.value == ''){
            this.refs.list.style.display = 'block'
        }else{
            this.refs.list.style.display = "none"
        }
        
    }
    keychange(e) {
        // console.log(e.keyCode)
        if (e.keyCode == 13) {
            this.$axios.get(this.$api.search + '?keywords=' + this.state.inptxt).then(res => {
                this.setState({
                    songarr: res.data.result.songs,
                    flag: false
                })
            })
        }
    }
    render() {
        // 解析赋值
        let { inptxt, arrSearch, songarr} = this.state;
        return (<div id="search">
            <div className="top">
                <input type="text" placeholder="请输入关键字" value={inptxt} onKeyUp={this.keychange.bind(this)} onChange={this.inpchange.bind(this)} />
                <img src={require('../../assets/img/search.png') }/>
            </div>
            <div className="list" ref='list'> 
                {arrSearch.map((item, index) => {
                    return <span key={index}>{item.first}</span>
                })}
            </div>


            <ul>
                {songarr.map((item, index) => {
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
                                    item.artists.map((val,ind)=>{
                                        let sprit = item.artists.length>1 && ind != item.artists.length-1? <em>&nbsp;/&nbsp;</em> : '';
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
}
export default Search