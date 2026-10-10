import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true); 
    const [step, setStep] = useState(1); 

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [role, setRole] = useState('consumer'); 

    const navigate = useNavigate();

    // 1. Registration
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', { name, phone, role });
            if (response.data.status === "Success") {
                alert("வெற்றிகரமாகப் பதிவு செய்யப்பட்டது! இப்போது உள்நுழையலாம்.");
                setIsLogin(true);
                setStep(1); 
            } else {
                alert("பதிவு செய்ய முடியவில்லை! எண் ஏற்கனவே பயன்பாட்டில் இருக்கலாம்.");
            }
        } catch (error) {
            console.error(error);
            alert("Backend சர்வர் இயங்கவில்லை அல்லது பிழை உள்ளது!");
        }
    };

    // 2. Login - Send OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/send-otp', { phone });
            if (response.data.status === "Success") {
                alert("OTP உங்கள் எண்ணிற்கு அனுப்பப்பட்டுள்ளது!");
                setStep(2); 
            } else {
                alert("இந்த மொபைல் எண் பதிவு செய்யப்படவில்லை!");
            }
        } catch (error) {
            console.error(error);
            alert("Backend சர்வர் இயங்கவில்லை!");
        }
    };

    // 3. Login - Verify OTP & Redirect
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/verify-otp', { phone, otp });
            if (response.data.status === "Success") {
                const userRole = response.data.role; 
                
                // Role அடிப்படையில் சரியான பக்கத்திற்கு அனுப்புதல்
                if (userRole === 'farmer') {
                    navigate('/farmer-dashboard');
                } else {
                    navigate('/consumer-dashboard');
                }
            } else {
                alert("தவறான OTP!");
            }
        } catch (error) {
            console.error(error);
            alert("சர்வர் பிழை!");
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', fontFamily: 'Arial' }}>
            <h2 style={{ color: '#27ae60', textAlign: 'center' }}>
                {isLogin ? 'உழவன் - உள்நுழைக' : 'உழவன் - புதிய பதிவு'}
            </h2>
            
            {!isLogin && (
                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
                        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>நீங்கள் யார்?</p>
                        <label style={{ marginRight: '20px', cursor: 'pointer' }}>
                            <input type="radio" value="farmer" checked={role === 'farmer'} onChange={(e) => setRole(e.target.value)} /> 🌾 விவசாயி 
                        </label>
                        <label style={{ cursor: 'pointer' }}>
                            <input type="radio" value="consumer" checked={role === 'consumer'} onChange={(e) => setRole(e.target.value)} /> 🛒 வாடிக்கையாளர் 
                        </label>
                    </div>
                    <input type="text" placeholder="உங்கள் பெயர்" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <input type="tel" placeholder="மொபைல் எண் (10 இலக்கம்)" value={phone} onChange={(e) => setPhone(e.target.value)} pattern="[0-9]{10}" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <button type="submit" style={{ padding: '12px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>பதிவு செய்</button>
                </form>
            )}

            {isLogin && step === 1 && (
                <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input type="tel" placeholder="உங்கள் மொபைல் எண்" value={phone} onChange={(e) => setPhone(e.target.value)} pattern="[0-9]{10}" required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <button type="submit" style={{ padding: '12px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>OTP அனுப்பு</button>
                </form>
            )}

            {isLogin && step === 2 && (
                <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <p style={{ color: '#555', fontSize: '14px', textAlign: 'center' }}>{phone} என்ற எண்ணிற்கு OTP அனுப்பப்பட்டுள்ளது.</p>
                    <input type="text" placeholder="OTP ஐ உள்ளிடுக" value={otp} onChange={(e) => setOtp(e.target.value)} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    <button type="submit" style={{ padding: '12px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>உள்நுழைக</button>
                </form>
            )}

            <p style={{ textAlign: 'center', marginTop: '20px', cursor: 'pointer', color: '#2980b9', fontWeight: 'bold' }} onClick={() => { setIsLogin(!isLogin); setStep(1); setPhone(''); setOtp(''); }}>
                {isLogin ? "கணக்கு இல்லையா? புதிதாகப் பதிவு செய்க" : "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக"}
            </p>
        </div>
    );
};

export default Auth;