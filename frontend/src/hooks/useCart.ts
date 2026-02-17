"use client";

import { useState, useEffect } from 'react';

export interface CartItem {
    id: string;
    title: string;
    price: number;
    seller: string;
    imageUrl: string;
    quantity: number;
    category?: string;
    conditionLabel?: string;
}

const CART_STORAGE_KEY = 'kosh_marketplace_cart';

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            if (stored) {
                setCart(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
            } catch (error) {
                console.error('Error saving cart:', error);
            }
        }
    }, [cart, isLoaded]);

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(i => i.id === item.id);

            if (existingItem) {
                // Increase quantity if item already in cart
                return prevCart.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            } else {
                // Add new item with quantity 1
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(itemId);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.id === itemId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (itemId: string): boolean => {
        return cart.some(item => item.id === itemId);
    };

    const getCartCount = (): number => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getCartTotal = (): number => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getCartCount,
        getCartTotal,
        isLoaded
    };
}
