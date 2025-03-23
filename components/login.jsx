"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Input = ({ label, type, placeholder, value, onChange, error }) => (
    <div className="w-full">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            className={`w-full px-3 sm:px-4 py-2 rounded border ${
                error ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
);

// components/Button.js
const Button = ({ children, variant = "primary", onClick, type = "button", disabled = false }) => {
    const baseStyles = "w-full px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded transition-colors duration-200 flex items-center justify-center";
    const variants = {
        primary: "bg-black text-white hover:bg-gray-800 disabled:bg-gray-400",
        google: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
    };
    
    return (
        <button 
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]}`}
        >
            {children}
        </button>
    );
};
export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(true);

    useEffect(() => {
        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = initializeGoogleSignIn;
            document.body.appendChild(script);
        };

        loadGoogleScript();
    }, []);

    const initializeGoogleSignIn = () => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
                callback: handleGoogleSignIn,
            });
            window.google.accounts.id.renderButton(
                document.getElementById('googleSignInDiv'),
                { theme: 'outline', size: 'large', width: '100%' }
            );
            setIsGoogleLoading(false);
        }
    };

    const handleGoogleSignIn = async (response) => {
        try {
            const credential = response.credential;
            const payload = JSON.parse(atob(credential.split('.')[1]));
            
            // Ensure we get a valid picture URL
            const pictureUrl = payload.picture?.replace('=s96-c', '=s100-c');
            
            localStorage.setItem('googleCredential', JSON.stringify({
                email: payload.email,
                name: payload.name,
                picture: pictureUrl
            }));
            const result = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: credential,
                }),
            });
    
            if (result.ok) {
                router.push('/main');
            } else {
                throw new Error('Failed to sign in with Google');
            }
        } catch (error) {
            setErrors({ google: 'Failed to sign in with Google' });
            localStorage.removeItem('googleCredential'); // Clean up if auth fails
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            router.push('/main');
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                submit: error.message || 'Login failed. Please try again.'
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen overflow-hidden py-44 sm:py-12">
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/i.webp"
                    alt="Background"
                    className="w-full h-full object-cover opacity-5"
                />
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg border-2 border-black">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Welcome Back</h2>
                    
                    <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            error={errors.email}
                        />
                        
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            error={errors.password}
                        />

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>

                        <div className="relative my-4 sm:my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div id="googleSignInDiv" className="w-full"></div>
                        {errors.google && (
                            <p className="mt-1 text-sm text-red-500 text-center">{errors.google}</p>
                        )}

                        {errors.submit && (
                            <p className="text-sm text-red-600 text-center">{errors.submit}</p>
                        )}
                    </form>
                    
                    <p className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href="/register" className="font-medium text-black hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
