// Login.jsx கோப்பில் லாகின் பட்டனை அழுத்திய பிறகு...

const handleLogin = async (e) => {
    e.preventDefault();
    
    // பேக்கெண்டிற்கு தகவலை அனுப்பி விடையைப் பெறுதல்
    const response = await axios.post('http://localhost:5000/login', { email, password });

    if (response.data.status === "Success") {
        const userRole = response.data.role; // தரவுத்தளத்திலிருந்து வரும் role
        
        // role-ஐ வைத்து சரியான பக்கத்திற்கு அனுப்புதல்
        if (userRole === 'farmer') {
            navigate('/farmer-dashboard');
        } else if (userRole === 'consumer') {
            navigate('/consumer-dashboard');
        }
    } else {
        alert("தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்!");
    }
};