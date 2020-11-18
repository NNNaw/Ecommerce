import React, { Component } from 'react'

import ShowList from './../../Components/ShowList/ShowList'
import Carousel from '../../Components/Carousel/Carousel'
import Filter from '../../Components/Filter/Filter'

import smartwatch from './../../Assets/Images/smartwatch.jpg'
import simso from './../../Assets/Images/simso.jpg'
import theocao from './../../Assets/Images/thecao.jpg'
import friends from './../../Assets/Images/friends.jpg'
import vsmartbanner from './../../Assets/Images/vsmartbanner.jpg'
import galaxybanner from './../../Assets/Images/galaxybanner.jpg'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Carousel></Carousel>
                <Filter></Filter>
                <div className='container p-0 my-5'>
                    <img className='w-100 ' src={smartwatch} alt="error" />
                </div>



                <ShowList></ShowList>


                <div className='container img-the-cao'>
                    <div className="row class-row">
                        <div className="col-6 class-col">
                            <img className='' src={vsmartbanner} alt="error" />
                        </div>
                        <div className="col-6  class-col">
                            <img className='' src={galaxybanner} alt="error" />
                        </div>
                    </div>

                    <div className="row class-row">

                        <div className="col-4 class-col ">
                            <img src={simso} alt="error" />

                        </div>
                        <div className="col-4 class-col">

                            <img src={theocao} alt="error" />

                        </div>
                        <div className="col-4 class-col">

                            <img src={friends} alt="error" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


