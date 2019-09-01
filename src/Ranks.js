import React from 'react';
import Media from './Media';
import {girls} from './Girls';
import * as firebase from 'firebase'



class Ranks extends React.Component {
    constructor(props){
        super(props);
        this.state = { all: [] }
    }
    
    render() { 
        const store = firebase.firestore();
        let op = []
        for (const girl of girls) {
             store.collection(girl.name).get().then((doc) => {
                 doc.forEach((e) => {
                    let sum = 0;
                    for(let n of e.data().ratings){
                        sum += n
                     }
                     op.push({name: e.data().name, img: e.data().img, rating: (sum/e.data().ratings.length)})
                 })
            })    
        }
         setTimeout(() => {
            function compare(a, b) {
                const genreA = a.rating
                const genreB = b.rating
              
                let comparison = 0;
                if (genreA < genreB) {
                  comparison = 1;
                } else if (genreA > genreB) {
                  comparison = -1;
                }
                return comparison;
              }
              
              op.sort(compare);
              console.log(op)
              console.log(op.sort(compare))
             this.setState({
                 all: op
             })
             console.log(this.state.all[0].rating)
         }, 3000)

        return ( 
            <div className='cont'>
              {
                  this.state.all.map((e, index) => {
                  const rate = Math.round(e.rating);
                     return <Media img={e.img} name={e.name} rating={rate} key={index} count={index+1} />
                  })
              }
            </div>
        );
    }
}
 
export default Ranks;