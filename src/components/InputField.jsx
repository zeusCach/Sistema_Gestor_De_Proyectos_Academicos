export const InputField = ({ label, type = "text", name, placeholder, required = false }) => {
    return (
        <>
            <div className="mb-4">
                <label htmlFor={name} className="block text-gray-700 text-sm font-medium mb-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                    id={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
        </>
    );
};


