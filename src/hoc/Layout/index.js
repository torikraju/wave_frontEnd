import React, {Component} from 'react';

import Header from "../../component/Header";
import Footer from "../../component/Footer";

class Layout extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className='page_container'>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

export default Layout;
