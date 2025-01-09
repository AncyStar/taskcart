
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [products,setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState([0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  let fetchProducts = async () =>{
    const productsData = await fetch(
      'https://fakestoreapi.com/products');
    const productResponse = await productsData.json();
    setProducts(productResponse);
  };

  let addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)){
      alert("Product already in the Cart")
    }
    else{
      setCart([...cart, product]);
    } 
  }

  let removeFromCart = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  useEffect(() => {
    fetchProducts();
  },[]);

  
  
  return (
    <>
    <div className='relative'>
    <nav className="w-full flex bg-gray-100 items-center p-6 py-2 justify-between shadow-sm fixed top-0">
        <img
          src="https://img.icons8.com/?size=48&id=BBhHIwJINbBl&format=png"
          alt="Logo"
          className="h-10"
        />
        <button onClick={() => setIsCartOpen(true)}
          className="text-blue-600 font-bold"
        >
          Cart({cart.length})
        </button>
        
        <span className="font-bold text-blue-500">Total: Rs. {calculateTotal().toFixed(2)}</span>
        
           
    </nav>
    
    <div className='flex h-screen overflow-y-auto bg-white pt-12'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {products.map((product, index) => {
          return(
            <div key={index} className="border p-4 rounded shadow">
              <img src={product.image} alt="" className="w-full h-48 object-contain" />
            <div className='mt-4'>
              <h4 className="text-lg font-bold">{product.title}</h4>
              <p className="text-sm text-gray-600">Rs.{product.price}</p>
              <button onClick={()=>{addToCart(product)}}
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div> 
          </div>
          );    
        })}
     </div>

    </div>

    </div>
    

    {isCartOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Cart Items</h2>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b py-4">
                  <span className="text-sm">{item.title}</span>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-500">
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>

  )
}

export default App
