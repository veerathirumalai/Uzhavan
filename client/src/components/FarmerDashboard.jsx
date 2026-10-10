import React, { useState, useEffect } from 'react';

function FarmerDashboard() {
  const [activeMenu, setActiveMenu] = useState('market');
  const [expandedCard, setExpandedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('காய்கறிகள்'); 
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);

  // 1. Auth-ல் லாகின் செய்த விவசாயியின் விவரத்தை இங்கே எடுக்கிறோம்
  const currentUser = JSON.parse(localStorage.getItem('agritamil_currentUser')) || { id: 1, name: 'விவசாயி' };

  // 2. குறிப்பிட்ட விவசாயியின் (currentUser.id) பொருட்களை மட்டும் எடுக்கிறோம்
  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${currentUser.id}`); 
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleDropdown = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    // 3. பொருளைச் சேர்க்கும்போது 1-க்கு பதிலாக லாகின் செய்த விவசாயியின் ID-ஐ அனுப்புகிறோம்
    const newProduct = {
      farmer_id: currentUser.id, 
      name_tamil: productName,
      category: category, 
      price_per_kg: price,
      stock_kg: quantity
    };

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        alert(`${productName} வெற்றிகரமாகச் சந்தையில் சேர்க்கப்பட்டது! 🌾`);
        setIsModalOpen(false);
        setProductName('');
        setQuantity('');
        setPrice('');
        setCategory('காய்கறிகள்');
        fetchProducts(); 
      } else {
        alert("பொருளைச் சேர்ப்பதில் பிழை ஏற்பட்டுள்ளது!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("சர்வர் இணைப்பு கிடைக்கவில்லை!");
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'Arial, sans-serif' }}>
      
      {/* LEFT SIDEBAR */}
      <div style={{ width: '250px', backgroundColor: '#ffffff', borderRight: '2px solid #e5e7eb', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: '#16a34a', border: '2px solid #16a34a', padding: '10px', textAlign: 'center', marginBottom: '20px' }}>
          AGRI தமிழ்
        </h2>
        
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #9ca3af', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', color: '#9ca3af' }}>
            👤
          </div>
          {/* 4. விவசாயியின் பெயர் காட்டும் இடம் (Hi Name) */}
          <h3 style={{ color: '#374151', marginTop: '15px' }}>Hi, {currentUser.name} 👋</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '1.1rem', color: '#374151' }}>
          <div style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #e5e7eb' }}>எனது விவரம்</div>
          <div style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #e5e7eb', fontWeight: 'bold', color: '#16a34a', display: 'flex', justifyContent: 'space-between' }}>
            எனது சந்தை <span>📌</span>
          </div>
          <div style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
            குறுஞ்செய்தி <span style={{ backgroundColor: '#eab308', padding: '2px 8px', borderRadius: '50%', fontSize: '0.9rem' }}>3</span>
          </div>
          <div style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #e5e7eb' }}>எனது Wallet</div>
          <div style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #e5e7eb', color: '#ef4444' }} onClick={() => { localStorage.removeItem('agritamil_currentUser'); window.location.reload(); }}>
            வெளியேறு (Logout)
          </div>
        </div>
      </div>

      {/* MAIN CONTENT (எனது சந்தை) */}
      <div style={{ flex: 1, padding: '30px', position: 'relative', overflowY: 'auto' }}>
        <h2 style={{ color: '#374151', borderBottom: '2px solid #d1d5db', paddingBottom: '10px', display: 'inline-block' }}>
          எனது சந்தை
        </h2>

        {/* Product Cards Grid */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
          {products.length === 0 ? (
            <p style={{ color: '#6b7280' }}>நீங்கள் இன்னும் எந்தப் பொருட்களையும் சந்தையில் சேர்க்கவில்லை.</p>
          ) : (
            products.map((product) => (
              <div key={product.product_id} style={{ 
                width: '220px', backgroundColor: '#ffffff', border: '1px solid #9ca3af', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
              }}>
                <div style={{ height: '100px', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', borderBottom: '1px solid #9ca3af', fontWeight: 'bold' }}>
                  {product.category}
                </div>
                
                <div style={{ padding: '15px' }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#1f2937' }}>{product.name_tamil}</h3>
                  <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>அளவு: <b>{product.stock_kg} kg</b></p>
                  <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>விலை: <b>₹{product.price_per_kg}</b></p>
                  <p style={{ margin: '5px 0', fontSize: '0.9rem' }}>தேதி: {new Date(product.harvest_date).toLocaleDateString()}</p>
                  
                  <div 
                    onClick={() => toggleDropdown(product.product_id)}
                    style={{ textAlign: 'right', cursor: 'pointer', color: '#16a34a', marginTop: '10px', fontWeight: 'bold' }}
                  >
                    {expandedCard === product.product_id ? 'ᐱ' : 'ᐯ'} 
                  </div>

                  {expandedCard === product.product_id && (
                    <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f9fafb', border: '1px solid #d1d5db', borderRadius: '5px', fontSize: '0.85rem' }}>
                      <p style={{ margin: '3px 0' }}>Total Qty: {product.stock_kg} kg</p>
                      <p style={{ margin: '3px 0', color: '#16a34a' }}>Remaining: {product.stock_kg} kg</p>
                      <p style={{ margin: '3px 0', color: '#ef4444' }}>Buyed: 0 kg</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* FLOATING ACTION BUTTON (+) */}
        <div style={{ position: 'fixed', bottom: '40px', right: '40px', textAlign: 'center' }}>
          <p style={{ marginBottom: '5px', fontWeight: 'bold', color: '#374151' }}>பொருட்களை சேர்</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ 
              width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#16a34a', color: '#ffffff', 
              fontSize: '30px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}>
            +
          </button>
        </div>

        {/* ADD PRODUCT MODAL (POPUP) */}
        {isModalOpen && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
          }}>
            <div style={{
              backgroundColor: '#ffffff', padding: '30px', borderRadius: '10px', width: '400px',
              border: '2px solid #16a34a', boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            }}>
              <h2 style={{ color: '#16a34a', marginTop: 0, textAlign: 'center' }}>புதிய பொருளைச் சேர்க்க</h2>
              
              <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                <div>
                  <label style={{ fontWeight: 'bold', color: '#374151' }}>பொருளின் பெயர் (ஆங்கிலத்தில்/தமிழில்):</label>
                  <input type="text" placeholder="உதா: Tomato / தக்காளி" required value={productName} onChange={(e) => setProductName(e.target.value)}
                         style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>

                <div>
                  <label style={{ fontWeight: 'bold', color: '#374151' }}>வகை (Category):</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}
                          style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}>
                    <option value="காய்கறிகள்">காய்கறிகள்</option>
                    <option value="பழங்கள்">பழங்கள்</option>
                    <option value="கீரைகள்">கீரைகள்</option>
                    <option value="தானியங்கள்">தானியங்கள்</option>
                  </select>
                </div>
                
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 'bold', color: '#374151' }}>அளவு (Kg):</label>
                    <input type="number" placeholder="உதா: 40" required value={quantity} onChange={(e) => setQuantity(e.target.value)}
                           style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontWeight: 'bold', color: '#374151' }}>ஒரு கிலோ விலை (₹):</label>
                    <input type="number" placeholder="உதா: 15" required value={price} onChange={(e) => setPrice(e.target.value)}
                           style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                  <button type="button" onClick={() => setIsModalOpen(false)} style={{ 
                    padding: '10px 20px', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' 
                  }}>ரத்து செய்</button>
                  
                  <button type="submit" style={{ 
                    padding: '10px 20px', backgroundColor: '#eab308', color: '#374151', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' 
                  }}>சமர்ப்பி</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default FarmerDashboard;