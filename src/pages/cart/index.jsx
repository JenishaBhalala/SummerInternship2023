import React, { useEffect, useState } from 'react'
import { colors } from "../../constant/constant";
import Typography from '@mui/material/Typography';
import { Button, CardMedia } from '@mui/material';
import cartService from "../../service/cart.service";
import { useAuthContext } from "../../context/auth";
import { toast } from "react-toastify";
import orderService from "../../service/order.service";
import Shared from "../../utils/shared";
import { useCartContext } from "../../context/cart";
import { cartStyle } from "./style";
import { Link, useNavigate } from "react-router-dom";
const Scart=() =>{
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  const navigate = useNavigate();
  const classes = cartStyle();
  const [cartList, setCartList] = useState([]);
  const [itemsInCart, setItemsInCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const getTotalPrice = (itemList) => {
    let totalPrice = 0;
    itemList.forEach((item) => {
      const itemPrice = item.quantity * parseInt(item.book.price);
      totalPrice = totalPrice + itemPrice;
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    setCartList(cartContext.cartData);
    setItemsInCart(cartContext.cartData.length);
    getTotalPrice(cartContext.cartData);
  }, [cartContext.cartData]);

  const removeItem = async (id) => {
    try {
      const res = await cartService.removeItem(id);
      if (res) {
        cartContext.updateCart();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const updateQuantity = async (cartItem, inc) => {
    const currentCount = cartItem.quantity;
    const quantity = inc ? currentCount + 1 : currentCount - 1;
    if (quantity === 0) {
      toast.error("Item quantity should not be zero");
      return;
    }try {
      const res = await cartService.updateItem({
        id: cartItem.id,
        userId: cartItem.userId,
        bookId: cartItem.book.id,
        quantity,
      });
      if (res) {
        const updatedCartList = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, quantity } : item
        );
        cartContext.updateCart(updatedCartList);
        const updatedPrice =
          totalPrice +
          (inc
            ? parseInt(cartItem.book.price)
            : -parseInt(cartItem.book.price));
        setTotalPrice(updatedPrice);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const placeOrder = async () => {
    if (authContext.user.id) {
      const userCart = await cartService.getList(authContext.user.id);
      if (userCart.length) {
        try {
          let cartIds = userCart.map((element) => element.id);
          const newOrder = {
            userId: authContext.user.id,
            cartIds,
          };
          const res = await orderService.placeOrder(newOrder);
          if (res) {
            cartContext.updateCart();
            navigate("/");
            toast.success(Shared.messages.ORDER_SUCCESS);
          }
        } catch (error) {
          toast.error(`Order cannot be placed ${error}`);
        }
      } else {
        toast.error("Your cart is empty");
      }
    }
  };

  return (
  <div className='classes.cartWrapper'>
    <div>
    <Typography style={{marginTop:25,marginBottom:75,textAlign:"center",fontSize:20,textDecoration:"underline red 2px",textUnderlinePosition:"under"}}>Cart Page</Typography>
    <div 
    style={{ display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:10,
    fontWeight:500}}>
          <Typography variant="h2" style={{
            paddingBottom:0,
            marginBottom:0,
            fontSize:18,
          }}>
            My Shopping Bag ({itemsInCart} Items)
          </Typography>
          <div>Total price: {totalPrice}</div>
        </div>
        <div>
        <div  style={{marginBottom:35,marginTop:0,marginRight:0}}>
          {cartList.map((cartItem) => {
            return(
    <div style={{display:"flex" ,justifyContent:"space-between",

    margin:"auto",
     width: 900,
     height: 309,
    flexDirection:"column",
  border:1,borderStyle:"solid",borderColor:"rgba(0,0,0,0.2)",marginTop:30,
   padding:50,borderRadius:5}} key={cartItem.id}>
    <CardMedia
        component="img"
        sx={{ maxWidth:100,minHeight:100,marginBottom:10,flexBasis:100,flexShrink:0 }}
        image={cartItem.book.base64image}
        alt="Live from space album cover"
      />
   <div style={{marginTop:-26,paddingLeft:2}}>
                  <div  style={{display:"flex",justifyContent:"space-between"
                ,marginBottom:10,paddingTop:0}}>
                    <div style={{marginRight:10}}>
                      <p className="brand">{cartItem.book.name}</p>
                      <Link style={{ color:colors.primary,
                 textDecoration:"none",
                 cursor:"pointer"}}>Cart item name</Link>
                    </div>
                    <div style={{marginTop:10}}>
                      <span style={{textAlign:"right"}}>
                        MRP &#8377; {cartItem.book.price}
                      </span>
                    </div>
                  </div>
                  <div  style={{display:"flex",
            justifyContent: "space-between"}}>
                    <div className="qty-group" style={{display:"flex"}}>
                      <Button 
                        className="btn pink-btn"
                        onClick={() => updateQuantity(cartItem, true)}
                      >
                        +
                      </Button>
                      <span style={{
                          border:1,
                          borderStyle:"solid",
                          display:"inline",
                          minWidth:20,
                          textAlign:"center",
                          padding:2,
                          height:48,
                          marginRight:10,
                          marginLeft:10,
                          marginTop:0
                      }}>{cartItem.quantity}</span>
                      <Button
                        className="btn pink-btn"
                        onClick={() => updateQuantity(cartItem, false)}
                      >
                        -
                      </Button>
                    </div>
                    <Link onClick={() => removeItem(cartItem.id)}>Remove</Link>
                  </div>
           </div>
            </div>
            );})} 
         </div>
           <div className='btn-wrapper' 
           style={{
            display:"flex",
            
           marginLeft:307,
            minWidth:20,
            padding:0,
            height:80,
            
           }}>
             <Button className='btn pink-btn'
             onClick={placeOrder}>
               Place order
             </Button>
           </div>
</div>
   </div>
   </div>
      );
      };
    export default Scart;