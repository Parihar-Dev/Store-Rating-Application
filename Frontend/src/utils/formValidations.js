export const validateName = (name) => {
    if (!name || name.length < 20 || name.length > 60) return "Name must be between 20 and 60 characters.";
    return null;
};

export const validateAddress = (address) => {
    if (!address) return "Address is required.";
    if (address.length > 400) return "Address must be up to 400 characters.";
    return null;
};

export const validatePassword = (password) => {
    if (!password) return "Password is required.";
    if (password.length < 8 || password.length > 16) return "Password must be 8-16 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return "Password must contain at least one special character.";
    return null;
};

export const validateEmail = (email) => {
    if (!email) return "Email is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    return null;
};