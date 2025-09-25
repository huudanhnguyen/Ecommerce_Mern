import React, { useState } from "react";

const VariantsInput = ({ value = [], onChange }) => {
  const [variants, setVariants] = useState(value);

  const handleAddGroup = () => {
    const updated = [...variants, { label: "", variants: [""] }];
    setVariants(updated);
    onChange(updated);
  };

  const handleRemoveGroup = (groupIndex) => {
    const updated = variants.filter((_, i) => i !== groupIndex);
    setVariants(updated);
    onChange(updated);
  };

  const handleLabelChange = (groupIndex, newLabel) => {
    const updated = [...variants];
    updated[groupIndex].label = newLabel;
    setVariants(updated);
    onChange(updated);
  };

  const handleVariantChange = (groupIndex, variantIndex, newValue) => {
    const updated = [...variants];
    updated[groupIndex].variants[variantIndex] = newValue;
    setVariants(updated);
    onChange(updated);
  };

  const handleAddVariant = (groupIndex) => {
    const updated = [...variants];
    updated[groupIndex].variants.push("");
    setVariants(updated);
    onChange(updated);
  };

  const handleRemoveVariant = (groupIndex, variantIndex) => {
    const updated = [...variants];
    updated[groupIndex].variants.splice(variantIndex, 1);
    setVariants(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Variants</h3>
      {variants.map((group, gIndex) => (
        <div
          key={gIndex}
          className="border p-3 rounded-md space-y-2 bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={group.label}
              onChange={(e) => handleLabelChange(gIndex, e.target.value)}
              placeholder="Label (e.g. Color, Size)"
              className="border p-2 flex-1 rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveGroup(gIndex)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              X
            </button>
          </div>

          <div className="space-y-2">
            {group.variants.map((variant, vIndex) => (
              <div key={vIndex} className="flex gap-2">
                <input
                  type="text"
                  value={variant}
                  onChange={(e) =>
                    handleVariantChange(gIndex, vIndex, e.target.value)
                  }
                  placeholder="Variant (e.g. Red)"
                  className="border p-2 flex-1 rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveVariant(gIndex, vIndex)}
                  className="px-2 py-1 bg-red-400 text-white rounded"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddVariant(gIndex)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              + Add Variant
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddGroup}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        + Add Variant Group
      </button>
    </div>
  );
};

export default VariantsInput;
