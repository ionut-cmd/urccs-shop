import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component.jsx";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component.jsx";
import {ReactComponent as CrwLogo} from '../../assets/crown.svg'
import { UserContext } from "../../contexts/user.contex";
import { CartContext } from "../../contexts/cart.context.jsx";
import './navigation.styles.scss';
import { signOutUser } from "../../utils/firebase/firebase.utils";



const Navigation = () => {

  const { currentUser } = useContext(UserContext)
  const {isCartOpen} = useContext(CartContext)

 
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
           <CrwLogo className="logo" />
        </Link>
       <div className="nav-links-container">
        <Link className = "nav-link" to="/shop">
            Shop
        </Link>
        {
          currentUser ? (
            <span className="nav-link" onClick={signOutUser}>Sign Out</span>
            ) : (
               <Link className = "nav-link" to="/auth">
                Sign In
              </Link>
            )
        }
        <CartIcon />
       </div>
       {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
    )
}


export default Navigation;