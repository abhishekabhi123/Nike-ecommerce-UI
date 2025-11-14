import { useState } from "react";
import { Input, Button } from "@/components/common";

export interface AddressFormData {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

interface AddressFormProps {
  onSubmit: (data: AddressFormData) => void;
  isLoading?: boolean;
}

export const AddressForm = ({ onSubmit, isLoading }: AddressFormProps) => {
  const [formData, setFormData] = useState<AddressFormData>({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof AddressFormData, string>>
  >({});

  const handleChange =
    (field: keyof AddressFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));

      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AddressFormData, string>> = {};

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold text-dark-900 mb-4">
        Shipping Address
      </h3>
      <Input
        label="Address Line 1"
        value={formData.addressLine1}
        onChange={handleChange("addressLine1")}
        error={errors.addressLine1}
        placeholder="123 Main St"
        required
      />

      <Input
        label="Address Line 2 (Optional)"
        value={formData.addressLine2}
        onChange={handleChange("addressLine2")}
        placeholder="Apartment, suite, etc."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="City"
          value={formData.city}
          onChange={handleChange("city")}
          error={errors.city}
          placeholder="New York"
          required
        />

        <Input
          label="State / Province"
          value={formData.state}
          onChange={handleChange("state")}
          error={errors.state}
          placeholder="NY"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Postal Code"
          value={formData.postalCode}
          onChange={handleChange("postalCode")}
          error={errors.postalCode}
          placeholder="10001"
          required
        />

        <Input
          label="Country"
          value={formData.country}
          onChange={handleChange("country")}
          error={errors.country}
          placeholder="United States"
          required
        />
      </div>
      <Input
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={handleChange("phone")}
        error={errors.phone}
        placeholder="+1 (555) 123-4567"
        required
      />
      <Button type="submit" isLoading={isLoading} className="w-full">
        Continue to Payment
      </Button>
    </form>
  );
};
