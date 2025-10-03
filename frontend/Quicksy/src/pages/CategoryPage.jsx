import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

function CategoryPage() {
    const { id } = useParams();

    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get(`http://localhost:7777/api/v1/public/products?categoryId=${id}`);
                setProducts(res?.data?.data?.products || []);
                console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchProducts();
    }, [id]);

  return (
    <div>
        {products.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No products found in this category.</p>
        ) : (
            <div className="max-w-7xl mx-auto px-4 py-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Products in Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                       <Link key={product.id} to={`/product/${product._id}`} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"> <div key={product.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition">
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-t-lg mb-4"
                            />
                            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                            <p className="text-green-600 font-bold mt-2">₹{product.price.toFixed(2)}</p>
                            <p className="text-gray-600">{product?.attributes?.weight}</p>  
                        </div></Link>
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default CategoryPage