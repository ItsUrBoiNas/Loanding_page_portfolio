"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function AskMeetySubscription() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Check if paypal is loaded and the container is empty to prevent double rendering
    const container = document.getElementById('paypal-button-container-P-3EG220676E2176931NIJJXHQ');
    
    if (isScriptLoaded && window.paypal && container && container.children.length === 0) {
      window.paypal.Buttons({
          style: {
              shape: 'rect',
              color: 'gold',
              layout: 'vertical',
              label: 'paypal'
          },
          createSubscription: function(data: any, actions: any) {
            return actions.subscription.create({
              /* Creates the subscription */
              plan_id: 'P-3EG220676E2176931NIJJXHQ'
            });
          },
          onApprove: function(data: any, actions: any) {
            alert("Subscription successful! ID: " + data.subscriptionID); 
          }
      }).render('#paypal-button-container-P-3EG220676E2176931NIJJXHQ'); 
    }
  }, [isScriptLoaded]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white font-sans selection:bg-blue-500/30">
      <Script 
        src="https://www.paypal.com/sdk/js?client-id=Aejwo1SCLifR_oPg6a-FBMIzpxBE6yUaELiMu7-k8hpw3VTNi7dDOJGhBNgB_DtLE8FbJMVL6nK2PrLh&vault=true&intent=subscription" 
        data-sdk-integration-source="button-factory"
        onLoad={() => setIsScriptLoaded(true)}
      />
      
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 sm:p-10 space-y-8 relative overflow-hidden transition-all hover:border-slate-700/50">
        {/* Glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-gradient-to-b from-blue-600/20 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-600/10 blur-3xl pointer-events-none rounded-full" />
        
        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-5 ring-1 ring-blue-500/20">
            <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-br from-white via-slate-100 to-slate-400 bg-clip-text text-transparent mb-3">
            AskMeety Premium
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-[90%] mx-auto">
            Upgrade your experience and get exclusive access to our most powerful features.
          </p>
        </div>

        <div className="bg-slate-950/50 rounded-2xl p-6 sm:p-7 border border-slate-800/60 relative z-10 backdrop-blur-sm">
          <div className="flex justify-between items-end mb-6 pb-6 border-b border-slate-800/60">
            <div>
              <span className="text-4xl font-black text-white">$15</span>
              <span className="text-slate-400 font-medium ml-1">/mo</span>
            </div>
            <div className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full ring-1 ring-emerald-500/20">
              Most Popular
            </div>
          </div>
          
          <ul className="space-y-4 mb-8 text-sm text-slate-300 font-medium">
            <li className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-blue-500/20 p-1">
                <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Full access to AskMeety tools
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-blue-500/20 p-1">
                <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Priority 24/7 customer support
            </li>
            <li className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-blue-500/20 p-1">
                <svg className="w-3 h-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Early access to future updates
            </li>
          </ul>

          <div className="relative">
            {!isScriptLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 rounded-xl z-20">
                <div className="w-8 h-8 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
            <div id="paypal-button-container-P-3EG220676E2176931NIJJXHQ" className="min-h-[55px] w-full rounded-xl overflow-hidden relative z-10"></div>
          </div>
          
          <p className="text-center text-xs text-slate-500 mt-4 font-medium">
            Secure payment powered by PayPal
          </p>
        </div>
      </div>
    </div>
  );
}
