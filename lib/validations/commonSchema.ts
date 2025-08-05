import * as Yup from 'yup';

// Common field validations that can be reused across forms
export const commonValidations = {
  // Personal Information
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Must be at least 2 characters')
    .matches(/^[a-zA-Z\s]*$/, 'Name can only contain letters and spaces'),

  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    ),

  confirmPassword: (fieldName: string = 'password') => 
    Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref(fieldName)], 'Passwords must match'),

  // Contact Information
  mobileNumber: Yup.string()
    .required('Mobile Number is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits'),

  phoneNumber: Yup.string()
    .matches(/^[0-9]*$/, 'Must be only digits')
    .min(10, 'Must be at least 10 digits')
    .max(15, 'Must not exceed 15 digits'),

  // Address Information
  address: Yup.string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters'),

  city: Yup.string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters')
    .matches(/^[a-zA-Z\s]*$/, 'City can only contain letters and spaces'),

  postcode: Yup.string()
    .required('Postcode is required')
    .matches(/^[A-Za-z0-9\s]+$/, 'Invalid postcode format'),

  country: Yup.string()
    .required('Country is required'),

  // Common Form Elements
  checkbox: (message: string = 'This field is required') =>
    Yup.boolean()
      .oneOf([true], message),

  // Reference Numbers and IDs
  referenceNumber: Yup.string()
    .required('Reference number is required')
    .min(3, 'Must be at least 3 characters')
    .matches(/^[A-Za-z0-9-]+$/, 'Can only contain letters, numbers, and hyphens'),

  // Date validations
  date: Yup.date()
    .required('Date is required')
    .max(new Date(), 'Date cannot be in the future'),

  futureDate: Yup.date()
    .required('Date is required')
    .min(new Date(), 'Date must be in the future'),

  // Amount/Money validations
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .typeError('Must be a valid number'),

  // Custom file validation
  file: (maxSize: number = 5 * 1024 * 1024, allowedTypes: string[] = ['image/jpeg', 'image/png', 'application/pdf']) =>
    Yup.mixed()
      .required('File is required')
      .test('fileSize', 'File size is too large', (value: any) => {
        if (!value) return true;
        return value.size <= maxSize;
      })
      .test('fileType', 'Unsupported file type', (value: any) => {
        if (!value) return true;
        return allowedTypes.includes(value.type);
      }),
};

// Helper function to create a schema from selected validations
export const createSchema = (fields: Record<string, any>) => {
  return Yup.object().shape(fields);
};

// Example usage for reference:
export const exampleSchema = createSchema({
  name: commonValidations.name,
  email: commonValidations.email,
  phone: commonValidations.mobileNumber,
  agreeToTerms: commonValidations.checkbox('Please agree to terms and conditions'),
});
