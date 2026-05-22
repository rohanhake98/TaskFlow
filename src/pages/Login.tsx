import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[1000px] bg-white rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-in fade-in zoom-in-95 duration-500">
        
        {/* Left Side - Brand & Copy */}
        <div className="md:w-5/12 bg-orange-50 p-10 flex flex-col relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-orange-200/50 rounded-full blur-[80px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-amber-200/50 rounded-full blur-[80px]" />
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-2 mb-16">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-orange-200">
                <Sparkles size={16} fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Flowbase</span>
            </Link>

            <h2 className="text-3xl font-black text-slate-900 leading-tight mb-6">
              Your workflow, <br/>
              at the speed of <span className="text-primary italic">thought.</span>
            </h2>
            <p className="text-slate-600 font-medium leading-relaxed">
              Join thousands of solo creators who have traded context switching for deep work.
            </p>
          </div>
        </div>

        {/* Right Side - Auth */}
        <div className="flex-1 p-10 flex flex-col justify-center items-center relative bg-white">
          <div className="w-full flex justify-center mb-6">
            <div className="bg-slate-100 p-1 rounded-lg flex gap-1">
              <button 
                onClick={() => setIsLogin(true)}
                className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${isLogin ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${!isLogin ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Sign Up
              </button>
            </div>
          </div>
          
          <div className="w-full max-w-md flex justify-center">
            {isLogin ? (
              <SignIn path="/login" routing="path" forceRedirectUrl="/dashboard" signUpUrl="/login" />
            ) : (
              <SignUp path="/login" routing="path" forceRedirectUrl="/dashboard" signInUrl="/login" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
