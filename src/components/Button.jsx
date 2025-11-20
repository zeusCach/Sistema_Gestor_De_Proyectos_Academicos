export const Button = ({ children, variant = "primary" }) => {
    const baseStyles = "w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-600 text-white hover:bg-gray-700"
    };

    return (
        <button className={`${baseStyles} ${variants[variant]}`}>
            {children}
        </button>
    );
};