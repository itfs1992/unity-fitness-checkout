import React from 'react';

interface FormInputProps {
  dataField: string;
  name: string;
  type: string;
  placeholder: string;
  formData: { [key: string]: string };
  updateFormData: (dataField: string, name: string, value: string) => void;
  validateField: (dataField: string, name: string, value: string) => void;
  errors: { [key: string]: string };
}

const FormInput: React.FC<FormInputProps> = ({
  dataField = '',
  name,
  type,
  placeholder,
  formData,
  updateFormData,
  validateField,
  errors
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData(dataField, name, e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField(dataField, name, e.target.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2">{placeholder}</label>
      <input
        data-field={dataField}
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={`VD : ${placeholder}`}
        className={`block w-full p-3 border ${errors[name] ? 'border-red-500' : 'border-gray-300'} rounded-md bg-gray-100 text-gray-600`}
      />
      {errors[name] && <p className="text-red-500">{errors[name]}</p>}
    </div>
  );
};

export default FormInput;
