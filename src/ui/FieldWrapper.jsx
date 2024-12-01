export function FieldWrapper({ label, id, children, isDarkMode, error }) {
  return (
    <div className="flex gap-4 items-center pb-5">
      <label
        htmlFor={id}
        className={`transition-colors duration-500 basis-40 ${
          isDarkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        {label}
      </label>
      <div className="flex flex-col gap-2 grow">
        {children}
        {error && (
          <p className="text-red-700 bg-red-200 px-2 rounded-md">{error}</p>
        )}
      </div>
    </div>
  );
}
