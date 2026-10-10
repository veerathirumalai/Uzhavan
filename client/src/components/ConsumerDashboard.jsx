import React, { useState, useEffect } from 'react';

const ConsumerDashboard = () => {
    const [vegetables, setVegetables] = useState([]);

    useEffect(() => {
        // உங்கள் வரைபடத்தில் உள்ள அதே தரவுகள்
        setVegetables([
            { id: 1, name: 'தக்காளி', price: 30, farmer: 'கந்தசாமி', village: 'மதுரை', stock: 40 },
            { id: 2, name: 'சின்ன வெங்காயம்', price: 25, farmer: 'முத்து', village: 'திண்டுக்கல்', stock: 55 }
        ]);
    }, []);

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
            
            {/* --- மேல்பகுதி (Header) --- */}
            <header style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '15px 30px', 
                backgroundColor: '#27ae60', 
                color: 'white' 
            }}>
                <div>
                    <h2 style={{ margin: 0 }}>உழவன்</h2>
                    <small style={{ fontSize: '12px' }}>Address...</small>
                </div>

                {/* தேடல் (Search) */}
                <div>
                    <input 
                        type="text" 
                        placeholder="🔍 தேடு..." 
                        style={{ padding: '8px 15px', borderRadius: '20px', border: 'none', width: '300px', outline: 'none' }}
                    />
                </div>

                {/* பயனாளர் (Profile) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '35px', height: '35px', backgroundColor: 'white', borderRadius: '50%', color: '#27ae60', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>👤</div>
                    <span>வணக்கம் பயனாளர்</span>
                </div>
            </header>

            {/* --- முதன்மைப் பகுதி (Main Content) --- */}
            <div style={{ padding: '20px 30px' }}>
                <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #ddd', paddingBottom: '10px' }}>HOME</h2>

                {/* காய்கறிகள் பிரிவு */}
                <div style={{ marginTop: '20px' }}>
                    <h3 style={{ color: '#d35400' }}>காய்கறிகள்</h3>
                    
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {vegetables.map((item) => (
                            <div key={item.id} style={{ 
                                backgroundColor: 'white', 
                                border: '1px solid #ddd', 
                                borderRadius: '10px', 
                                padding: '15px', 
                                width: '220px',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                                <h3 style={{ margin: '0 0 15px 0', color: '#27ae60', textAlign: 'center' }}>{item.name}</h3>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><b>விவசாயி:</b> {item.farmer}</p>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><b>ஊர்:</b> {item.village}</p>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><b>விலை:</b> ₹{item.price} / கிலோ</p>
                                <p style={{ margin: '5px 0', fontSize: '14px' }}><b>இருப்பு:</b> {item.stock} கிலோ</p>
                                
                                <button style={{ 
                                    width: '100%', 
                                    marginTop: '15px', 
                                    padding: '10px', 
                                    backgroundColor: '#f39c12', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '5px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}>
                                    வாங்க
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* பழங்கள் மற்றும் பிற பிரிவுகள் (Categories) */}
                <div style={{ marginTop: '40px' }}>
                    <h3 style={{ color: '#d35400' }}>பழங்கள்</h3>
                    {/* இங்கு பழங்களுக்கான டேட்டா வரும் */}
                </div>

            </div>
        </div>
    );
};

export default ConsumerDashboard;