import React from 'react'
import './allItem.css'
import { products } from '../../constants/data';
import { Link } from 'react-router-dom';



const AllItems = () => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    return (
        <section className="card-container">
            {
                products.map((item, index) => (
                    <section className="card">

                        <Link to="/product/:id" state={{ id: index }} style={{ textDecoration: 'none' }}>
                            <img src={item.image} alt={item.title} className="card-img" />
                        </Link>

                        <div className="card-details">
                            <h3 className="card-title">{item.title}</h3>
                            <section className="card-reviews">
                                <span>{item.rating.rate} Rating</span>
                                <span className="total-reviews">{item.rating.count} Reviews</span>
                            </section>
                            <section className="card-price">
                                <div className="price">
                                    ${item.price}
                                </div>
                                <div class="cart">
                                    <img src={fassured} alt='img' />
                                </div>
                            </section>
                        </div>
                    </section>
                ))
            }
        </section>
    )
}

export default AllItems