import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

const UserDataModal = ({
  isOpen,
  onClose,
  onSubmit,
  userData = { status: false },
  initialData = null,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Billing Address
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
    },
    // Step 2: User Data
    userData: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form with initial data when modal opens
  useEffect(() => {
    if (initialData && isOpen) {
      setFormData(initialData);
    }
  }, [initialData, isOpen]);

  // Open modal when userData.status is false
  useEffect(() => {
    if (!userData.status) {
      // Modal will be open based on isOpen prop
    }
  }, [userData.status]);

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    // Clear error when user starts typing
    if (errors[`${section}.${field}`]) {
      setErrors((prev) => ({
        ...prev,
        [`${section}.${field}`]: "",
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    const { billingAddress } = formData;

    if (!billingAddress.street.trim()) {
      newErrors["billingAddress.street"] = "Street address is required";
    }
    if (!billingAddress.city.trim()) {
      newErrors["billingAddress.city"] = "City is required";
    }
    if (!billingAddress.state.trim()) {
      newErrors["billingAddress.state"] = "State is required";
    }
    if (!billingAddress.zipCode.trim()) {
      newErrors["billingAddress.zipCode"] = "ZIP code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    const { userData } = formData;

    if (!userData.firstName.trim()) {
      newErrors["userData.firstName"] = "First name is required";
    }
    if (!userData.lastName.trim()) {
      newErrors["userData.lastName"] = "Last name is required";
    }
    if (!userData.email.trim()) {
      newErrors["userData.email"] = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors["userData.email"] = "Please enter a valid email";
    }
    if (!userData.phone.trim()) {
      newErrors["userData.phone"] = "Phone number is required";
    } else if (!/^\d{10}$/.test(userData.phone.replace(/\D/g, ""))) {
      newErrors["userData.phone"] =
        "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep === 2 && validateStep2()) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        // Reset form after successful submission
        setCurrentStep(1);
        setErrors({});
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error (show toast, etc.)
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Billing Address
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Address *
        </label>
        <input
          type="text"
          value={formData.billingAddress.street}
          onChange={(e) =>
            handleInputChange("billingAddress", "street", e.target.value)
          }
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors["billingAddress.street"]
              ? "border-red-500"
              : "border-gray-300"
          }`}
          placeholder="Enter your street address"
        />
        {errors["billingAddress.street"] && (
          <p className="text-red-500 text-sm mt-1">
            {errors["billingAddress.street"]}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <input
            type="text"
            value={formData.billingAddress.city}
            onChange={(e) =>
              handleInputChange("billingAddress", "city", e.target.value)
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors["billingAddress.city"]
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="City"
          />
          {errors["billingAddress.city"] && (
            <p className="text-red-500 text-sm mt-1">
              {errors["billingAddress.city"]}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <input
            type="text"
            value={formData.billingAddress.state}
            onChange={(e) =>
              handleInputChange("billingAddress", "state", e.target.value)
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors["billingAddress.state"]
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="State"
          />
          {errors["billingAddress.state"] && (
            <p className="text-red-500 text-sm mt-1">
              {errors["billingAddress.state"]}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code *
          </label>
          <input
            type="text"
            value={formData.billingAddress.zipCode}
            onChange={(e) =>
              handleInputChange("billingAddress", "zipCode", e.target.value)
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors["billingAddress.zipCode"]
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="ZIP Code"
          />
          {errors["billingAddress.zipCode"] && (
            <p className="text-red-500 text-sm mt-1">
              {errors["billingAddress.zipCode"]}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <select
            value={formData.billingAddress.country}
            onChange={(e) =>
              handleInputChange("billingAddress", "country", e.target.value)
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="India">India</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Canada">Canada</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Personal Information
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            value={formData.userData.firstName}
            onChange={(e) =>
              handleInputChange("userData", "firstName", e.target.value)
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors["userData.firstName"]
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="First Name"
          />
          {errors["userData.firstName"] && (
            <p className="text-red-500 text-sm mt-1">
              {errors["userData.firstName"]}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            value={formData.userData.lastName}
            onChange={(e) =>
              handleInputChange("userData", "lastName", e.target.value)
            }
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors["userData.lastName"] ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Last Name"
          />
          {errors["userData.lastName"] && (
            <p className="text-red-500 text-sm mt-1">
              {errors["userData.lastName"]}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          value={formData.userData.email}
          onChange={(e) =>
            handleInputChange("userData", "email", e.target.value)
          }
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors["userData.email"] ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="email@example.com"
        />
        {errors["userData.email"] && (
          <p className="text-red-500 text-sm mt-1">
            {errors["userData.email"]}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number *
        </label>
        <input
          type="tel"
          value={formData.userData.phone}
          onChange={(e) =>
            handleInputChange("userData", "phone", e.target.value)
          }
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors["userData.phone"] ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="10-digit phone number"
        />
        {errors["userData.phone"] && (
          <p className="text-red-500 text-sm mt-1">
            {errors["userData.phone"]}
          </p>
        )}
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Complete Your Profile
            </h2>
            <p className="text-sm text-gray-600">Step {currentStep} of 2</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center">
            <div
              className={`w-1/2 h-2 rounded-l-full ${
                currentStep >= 1 ? "bg-blue-500" : "bg-gray-200"
              }`}
            />
            <div
              className={`w-1/2 h-2 rounded-r-full ${
                currentStep >= 2 ? "bg-blue-500" : "bg-gray-200"
              }`}
            />
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4">
            {currentStep === 1 ? renderStep1() : renderStep2()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                currentStep === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </button>

            {currentStep === 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Next
                <ArrowRight size={16} className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Complete Profile"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDataModal;
