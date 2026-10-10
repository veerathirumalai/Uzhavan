import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [products, setProducts] = useState([]); // டம்மி டேட்டாவை தூக்கிவிட்டோம்!

  // சர்வரில் இருந்து டேட்டாவை எடுக்கும் Function
  const fetchProducts = async () => {
    try {
      // விவசாயி எண் 1-க்கான பொருட்களை எடுக்கிறோம்
      const response = await fetch('http://localhost:5000/api/products/1'); 
      const data = await response.json();
      setProducts(data); // வந்த டேட்டாவை State-ல் சேமிக்கிறோம்
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // பக்கம் லோட் ஆனவுடன் டேட்டாவை எடுக்க `useEffect` பயன்படும்
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', padding: '20px' }}>
      <h1 style={{ color: '#16a34a', fontSize: '3rem' }}>அக்ரிதமிழ் 🌾</h1>
      <h2 style={{ color: '#4b5563', marginTop: '10px' }}>இன்றைய நேரடி விற்பனைப் பொருட்கள்</h2>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.product_id} style={{ 
              border: '2px solid #eab308', padding: '20px', borderRadius: '10px', 
              backgroundColor: '#ffffff', width: '250px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#374151' }}>{product.name_tamil}</h3>
              <p style={{ color: '#16a34a', fontWeight: 'bold', fontSize: '1.2rem' }}>
                ₹{product.price_per_kg} / கிலோ
              </p>
            </div>
          ))
        ) : (
          <p>பொருட்கள் ஏற்றப்படுகின்றன...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;