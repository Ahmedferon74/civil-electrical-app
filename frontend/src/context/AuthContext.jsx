import React, { createContext, useState, useContext } from 'react';

// إنشاء السياق
const AuthContext = createContext();

// موفر السياق
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = غير مسجل الدخول

  const login = (username, password) => {
    // ✅ تحقق بسيط: اسم مستخدم وكلمة مرور ثابتة
    if (username === 'admin' && password === '123456') {
      setUser({ username: 'admin', role: 'admin' });
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// هوك مخصص للوصول للسياق
export const useAuth = () => useContext(AuthContext);
