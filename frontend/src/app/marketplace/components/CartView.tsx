"use client";

import React from 'react';
import { useCart } from '../../../hooks/useCart';

export function CartView({ onBack }: { onBack: () => void }) {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="mk-container animate-fade-in" style={{ maxWidth: 800, margin: '0 auto', paddingTop: 60 }}>
                <div className="text-center py-20">
                    <div className="text-8xl mb-6">🛒</div>
                    <h2 className="text-3xl font-extrabold text-[#6b4423] mb-4">Your Cart is Empty</h2>
                    <p className="text-lg text-[#8b6f47] mb-8">Add some items to get started!</p>
                    <button
                        onClick={onBack}
                        className="bg-[#6b4423] text-white font-extrabold px-8 py-4 rounded-2xl hover:bg-[#573217] transition-all shadow-lg"
                    >
                        Browse Marketplace
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="mk-container animate-fade-in" style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-extrabold text-[#6b4423] mb-2">My Cart</h1>
                    <p className="text-lg text-[#8b6f47] font-medium">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
                </div>
                <button
                    onClick={onBack}
                    className="text-[#8b6f47] hover:text-[#6b4423] font-bold hover:underline"
                >
                    ← Back to Marketplace
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-2xl border-2 border-[#e8ddd4] shadow-md hover:shadow-lg transition-all">
                            <div className="flex gap-6">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-32 h-32 object-cover rounded-xl border-2 border-[#e8ddd4]"
                                />
                                <div className="flex-1">
                                    <h3 className="text-xl font-extrabold text-[#6b4423] mb-2">{item.title}</h3>
                                    <p className="text-sm text-[#8b6f47] font-medium mb-1">Seller: {item.seller}</p>
                                    {item.conditionLabel && (
                                        <span className="inline-block bg-[#5a9e6f] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                                            {item.conditionLabel}
                                        </span>
                                    )}
                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="flex items-center gap-3 bg-[#f5f0eb] rounded-xl p-2 border border-[#e8ddd4]">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 rounded-lg bg-white border border-[#e8ddd4] hover:bg-[#6b4423] hover:text-white font-extrabold transition-all"
                                            >
                                                −
                                            </button>
                                            <span className="w-12 text-center font-extrabold text-[#6b4423]">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-lg bg-white border border-[#e8ddd4] hover:bg-[#6b4423] hover:text-white font-extrabold transition-all"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-[#d32f2f] hover:text-[#b71c1c] font-bold text-sm hover:underline"
                                        >
                                            🗑️ Remove
                                        </button>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-extrabold text-[#6b4423]">Rs. {item.price * item.quantity}</div>
                                    {item.quantity > 1 && (
                                        <div className="text-sm text-[#8b6f47] font-medium mt-1">Rs. {item.price} each</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-white to-[#f9f6f3] p-6 rounded-2xl border-2 border-[#e8ddd4] shadow-lg sticky top-24">
                        <h2 className="text-2xl font-extrabold text-[#6b4423] mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-base font-medium text-[#8b6f47]">
                                <span>Subtotal</span>
                                <span>Rs. {getCartTotal()}</span>
                            </div>
                            <div className="flex justify-between text-base font-medium text-[#8b6f47]">
                                <span>Delivery</span>
                                <span className="text-[#5a9e6f] font-bold">FREE</span>
                            </div>
                            <div className="border-t-2 border-[#e8ddd4] pt-4">
                                <div className="flex justify-between text-2xl font-extrabold text-[#6b4423]">
                                    <span>Total</span>
                                    <span>Rs. {getCartTotal()}</span>
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-[#6b4423] text-white font-extrabold text-lg py-4 rounded-2xl hover:bg-[#573217] transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 mb-3">
                            Request All Items
                        </button>

                        <button
                            onClick={clearCart}
                            className="w-full bg-[#f5f0eb] text-[#6b4423] font-bold text-sm py-3 rounded-xl hover:bg-[#e8ddd4] transition-all border-2 border-[#e8ddd4]"
                        >
                            Clear Cart
                        </button>

                        <div className="mt-6 p-4 bg-[#fff9c4] border-2 border-[#fbc02d] rounded-xl">
                            <div className="flex gap-3">
                                <div className="text-2xl">🚚</div>
                                <div>
                                    <div className="font-extrabold text-[#f57f17] text-sm">Campus Handover</div>
                                    <div className="text-xs text-[#f9a825] mt-1 font-medium">Free pickup available</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
