// Basic test script to verify API
// Run with: node src/scripts/test-api.js

const API_URL = 'http://localhost:5000';

const testAPI = async () => {
    try {
        console.log('--- Testing API ---');

        // 1. Health Check
        const health = await fetch(`${API_URL}/`);
        console.log('Health Check:', await health.text());

        // 2. Register User
        const email = `test${Date.now()}@example.com`;
        const registerRes = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test User',
                email: email,
                password: 'password123',
                phone: '1234567890'
            })
        });
        const registerData = await registerRes.json();
        console.log('Register:', registerRes.status, registerData.message);

        if (!registerData.token) {
            console.error('Registration failed, stopping tests.');
            return;
        }
        const token = registerData.token;

        // 3. Get Me
        const meRes = await fetch(`${API_URL}/auth/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Get Me:', await meRes.json());

        // 4. Register Admin (For Product Tests - manually set role in logic or seed db, 
        // but for now let's just try to login as the user we just made)

        // 5. Get Products
        const productsRes = await fetch(`${API_URL}/products`);
        console.log('Get Products:', (await productsRes.json()).length || 0, 'items found');

    } catch (error) {
        console.error('Test failed:', error.message);
        console.log('Ensure server is running on port 5000');
    }
};

testAPI();
