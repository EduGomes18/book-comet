const normalize = (field, fieldType, value, options) => {
  if (fieldType === "enum") {
    if (!options.includes(value))
      throw new Error(`Invalid option ${value} for field ${field}`);
  } else if (fieldType === "array") {
    if (!Array.isArray(value))
      throw new Error(`Invalid array field for ${field}`);
  } else if (fieldType === "number") {
    if (isNaN(Number(value)))
      throw new Error(
        `Invalid number ${
          field === "identifier" ? "param" : "field"
        } for ${field}`
      );
  } else {
    if (typeof value !== fieldType)
      throw new Error(`Invalid string field for ${field}`);
  }
};

export default normalize;
