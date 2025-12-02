export const InputField = (
    { label, 
      type = "text", 
      name, 
      placeholder, 
      required = false, 
      value, 
      onChange, 
      error 

    }) => {

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
                    value={value}
                    onChange={onChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                      ${error 
                        ? "border-red-500 focus:ring-red-400" 
                        : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                      }`}
                />

                {/* Mensaje de error */}
                {error && (
                    <p className="mt-1 text-sm text-red-600">
                        {error}
                    </p>
                )}
            </div>
        </>
    );
};


