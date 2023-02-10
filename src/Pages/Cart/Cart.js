import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsLoggedIn } from "../../Redux/Slice/authSlice";
import { ADD_ITEM, cartItems, DELETE, REMOVE_ITEM, totalAmount } from "../../Redux/Slice/cartSlice";
import "./Cart.css";

function Cart() {
  let cart = useSelector(cartItems);

  let totalPrice = useSelector(totalAmount);
  
  let isLoggedIn = useSelector(selectIsLoggedIn);

  let dispatch = useDispatch();


  return (
    <section className="cart">
      <section>
        <div className="container">
          <h3 className="mb-5">Cart</h3>
          <div class="table-responsive-lg">
          {cart.length > 0 ? (
            <table class="table fs-4 text-center">
              <thead>
                <tr>
                  <th scope="col">Img</th>
                  <th scope="col">Title</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Delete</th>
                  
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr>
                    <td>
                      <div>
                        <img src={item.image} alt={item.title} />
                      </div>
                    </td>
                    <td>
                      <div>
                        <h4>{item.title}</h4>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-content-center justify-content-center gap-3">
                        <p
                          className="plus"
                          onClick={() =>
                            dispatch(
                              ADD_ITEM({
                                id: item.id,
                                title: item.title,
                                image: item.image,
                                price: item.price,
                              })
                            )
                          }
                        >
                          +
                        </p>
                        <p className="number">{item.quantity}</p>
                        <p className="minus" onClick={()=> dispatch(REMOVE_ITEM(item.id))}>-</p>
                      </div>
                    </td>
                    <td>
                      <div>
                        <p className="price">${item.totalPrice}</p>
                      </div>
                    </td>
                    
                    <td>
                      <div>
                        <p className="delete" onClick={()=> dispatch(DELETE(item.id))}><FontAwesomeIcon icon={faTrashCan}/></p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h4 className="text-center">Cart is Empty</h4>
          )}
        </div>
        </div>
      </section>

      <section className="checkout-part">
        <div className="container">
          <div className="cart__subtotal mt-5">
            <h6>
              Subtotal: $<span>{totalPrice}</span>
            </h6>
            <p>Taxes and shipping will calculate at checkout.</p>
            <div className="mt-3">
              <button className="btn me-3">
                <Link to="/products">Continue Shipping</Link>
              </button>

              <button className="btn">
                <Link to={isLoggedIn ? "/checkout" : "/login"}>Proceed to checkout</Link>
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Cart;
